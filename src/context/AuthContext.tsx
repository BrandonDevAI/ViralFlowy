'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Subscription, PlanName, PlanConfig } from '../types';
import { PLAN_CONFIGS } from '../types';

// ---- Types ----

interface UserProfile {
  id: string;
  email: string;
  name: string;
  coins: number;
  is_pro?: boolean;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  subscription: Subscription | null;
  activePlan: PlanConfig | null;
  coins: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  showLoginModal: boolean;
  coinAnimation: boolean;
  todayGenerations: number;
}

interface AuthContextValue extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  consumeCoin: () => Promise<boolean>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  hasActiveSubscription: boolean;
  canGenerate: boolean;
  remainingGenerations: number;
  refreshSubscription: () => Promise<void>;
  logGeneration: (inputType: string, inputText: string) => Promise<void>;
}

const GUEST_COINS_KEY = 'vce_guest_coins';
const GUEST_COINS_DEFAULT = 3;

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// ---- Guest coin helpers (module-level) ----
function getGuestCoins(): number {
  try {
    const stored = localStorage.getItem(GUEST_COINS_KEY);
    if (stored !== null) return parseInt(stored, 10);
    localStorage.setItem(GUEST_COINS_KEY, String(GUEST_COINS_DEFAULT));
    return GUEST_COINS_DEFAULT;
  } catch {
    return GUEST_COINS_DEFAULT;
  }
}

function setGuestCoins(n: number) {
  try {
    localStorage.setItem(GUEST_COINS_KEY, String(n));
  } catch {
    // localStorage not available
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    subscription: null,
    activePlan: null,
    coins: getGuestCoins(),
    isLoading: true,
    isLoggedIn: false,
    showLoginModal: false,
    coinAnimation: false,
    todayGenerations: 0,
  });

  // ---- Fetch active subscription ----
  const fetchActiveSubscription = useCallback(async (userId: string): Promise<Subscription | null> => {
    if (!isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .gte('expires_at', new Date().toISOString())
        .order('expires_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;
      return data as Subscription;
    } catch {
      return null;
    }
  }, []);

  // ---- Fetch today's generation count ----
  const fetchTodayGenerations = useCallback(async (userId: string): Promise<number> => {
    if (!isSupabaseConfigured) return 0;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count, error } = await supabase
        .from('generation_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', today.toISOString());

      if (error) return 0;
      return count || 0;
    } catch {
      return 0;
    }
  }, []);

  // ---- Refresh subscription (callable from outside) ----
  const refreshSubscription = useCallback(async () => {
    if (!state.profile?.id) return;

    const subscription = await fetchActiveSubscription(state.profile.id);
    const todayGens = await fetchTodayGenerations(state.profile.id);
    const activePlan = subscription ? PLAN_CONFIGS[subscription.plan_name as PlanName] || null : null;

    setState(prev => ({
      ...prev,
      subscription,
      activePlan,
      todayGenerations: todayGens,
    }));
  }, [state.profile?.id, fetchActiveSubscription, fetchTodayGenerations]);

  // ---- Log a generation ----
  const logGeneration = useCallback(async (inputType: string, inputText: string) => {
    if (!isSupabaseConfigured || !state.profile?.id) return;

    try {
      await supabase.from('generation_logs').insert({
        user_id: state.profile.id,
        input_type: inputType,
        input_text: inputText,
      });

      setState(prev => ({
        ...prev,
        todayGenerations: prev.todayGenerations + 1,
      }));
    } catch (err) {
      console.error('Error logging generation:', err);
    }
  }, [state.profile?.id]);

  // ---- Fetch or create profile ----
  const fetchOrCreateProfile = useCallback(async (user: User): Promise<UserProfile | null> => {
    if (!isSupabaseConfigured) return null;

    try {
      // Try to fetch existing profile
      const { data: existing, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (existing && !fetchError) {
        return existing as UserProfile;
      }

      // Create new profile
      const newProfile: UserProfile = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario',
        coins: getGuestCoins(),
        is_pro: false,
      };

      const { data: created, error: createError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
        return newProfile;
      }

      return created as UserProfile;
    } catch (err) {
      console.error('Profile fetch/create error:', err);
      return null;
    }
  }, []);

  // ---- Initialize auth state ----
  useEffect(() => {
    let mounted = true;

    async function init() {
      // If Supabase is not configured, skip auth and use guest mode
      if (!isSupabaseConfigured) {
        if (mounted) {
          setState(prev => ({ ...prev, isLoading: false, coins: getGuestCoins() }));
        }
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
        }

        if (session?.user && mounted) {
          // Clear URL hash if it contains access_token to clean up the URL
          if (window.location.hash.includes('access_token')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }

          const profile = await fetchOrCreateProfile(session.user);
          const subscription = profile ? await fetchActiveSubscription(profile.id) : null;
          const todayGens = profile ? await fetchTodayGenerations(profile.id) : 0;
          const activePlan = subscription ? PLAN_CONFIGS[subscription.plan_name as PlanName] || null : null;

          if (mounted) {
            setState(prev => ({
              ...prev,
              user: session.user,
              session,
              profile,
              subscription,
              activePlan,
              coins: profile?.coins ?? getGuestCoins(),
              isLoggedIn: true,
              isLoading: false,
              todayGenerations: todayGens,
            }));
          }
        } else if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            coins: getGuestCoins(),
          }));
        }
      } catch (err) {
        console.error('Auth init error:', err);
        if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            coins: getGuestCoins(),
          }));
        }
      }
    }

    init();

    // Failsafe: if init hangs for any reason, force stop loading after 5 seconds
    const timeoutId = setTimeout(() => {
      if (mounted) {
        setState(prev => prev.isLoading ? { ...prev, isLoading: false } : prev);
      }
    }, 5000);

    // Listen for auth changes (only if configured)
    if (!isSupabaseConfigured) {
      return () => {
        mounted = false;
        clearTimeout(timeoutId);
      };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Clear hash on sign in event as well
          if (window.location.hash.includes('access_token')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          
          const profile = await fetchOrCreateProfile(session.user);
          const sub = profile ? await fetchActiveSubscription(profile.id) : null;
          const todayGens = profile ? await fetchTodayGenerations(profile.id) : 0;
          const activePlan = sub ? PLAN_CONFIGS[sub.plan_name as PlanName] || null : null;

          if (mounted) {
            setState(prev => ({
              ...prev,
              user: session.user,
              session,
              profile,
              subscription: sub,
              activePlan,
              coins: profile?.coins ?? getGuestCoins(),
              isLoggedIn: true,
              isLoading: false,
              showLoginModal: false,
              todayGenerations: todayGens,
            }));
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setState(prev => ({
              ...prev,
              user: null,
              session: null,
              profile: null,
              subscription: null,
              activePlan: null,
              coins: getGuestCoins(),
              isLoggedIn: false,
              isLoading: false,
              todayGenerations: 0,
            }));
          }
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [fetchOrCreateProfile, fetchActiveSubscription, fetchTodayGenerations]);

  // ---- Sign in with Google ----
  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
      return;
    }
    try {
      // Redirect back to the current page (landing or app) so pricing flow works
      const redirectUrl = window.location.origin + window.location.pathname;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) console.error('Google sign-in error:', error);
    } catch (err) {
      console.error('Sign in error:', err);
    }
  }, []);

  // ---- Sign out ----
  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setState(prev => ({
      ...prev,
      user: null,
      session: null,
      profile: null,
      subscription: null,
      activePlan: null,
      coins: getGuestCoins(),
      isLoggedIn: false,
      todayGenerations: 0,
    }));
  }, []);

  // ---- Consume a coin (returns true if success, false if no coins) ----
  const consumeCoin = useCallback(async (): Promise<boolean> => {
    const { isLoggedIn, coins, profile, subscription, activePlan, todayGenerations } = state;

    // If user has active subscription, check daily limit
    if (isLoggedIn && subscription && activePlan) {
      if (activePlan.dailyLimit !== Infinity && todayGenerations >= activePlan.dailyLimit) {
        // Reached daily limit
        return false;
      }
      return true;
    }

    // Legacy coin system for users without subscription
    if (coins <= 0) {
      if (!isLoggedIn) {
        // Show login modal for guests
        setState(prev => ({ ...prev, showLoginModal: true }));
      }
      return false;
    }

    // Trigger coin animation
    setState(prev => ({ ...prev, coinAnimation: true }));
    setTimeout(() => {
      setState(prev => ({ ...prev, coinAnimation: false }));
    }, 600);

    if (isLoggedIn && profile && isSupabaseConfigured) {
      // Deduct from database
      const newCoins = coins - 1;
      try {
        await supabase
          .from('profiles')
          .update({ coins: newCoins })
          .eq('id', profile.id);

        setState(prev => ({
          ...prev,
          coins: newCoins,
          profile: prev.profile ? { ...prev.profile, coins: newCoins } : null,
        }));
      } catch (err) {
        console.error('Error updating coins:', err);
      }
    } else {
      // Deduct from local storage (guest)
      const newCoins = coins - 1;
      setGuestCoins(newCoins);
      setState(prev => ({ ...prev, coins: newCoins }));
    }

    return true;
  }, [state]);

  // ---- Modal controls ----
  const openLoginModal = useCallback(() => {
    setState(prev => ({ ...prev, showLoginModal: true }));
  }, []);

  const closeLoginModal = useCallback(() => {
    setState(prev => ({ ...prev, showLoginModal: false }));
  }, []);

  // ---- Computed values ----
  const hasActiveSubscription = !!(state.subscription && state.activePlan);
  const canGenerate = hasActiveSubscription
    ? state.activePlan!.dailyLimit === Infinity || state.todayGenerations < state.activePlan!.dailyLimit
    : state.coins > 0;
  const remainingGenerations = hasActiveSubscription
    ? state.activePlan!.dailyLimit === Infinity
      ? Infinity
      : Math.max(0, state.activePlan!.dailyLimit - state.todayGenerations)
    : state.coins;

  const value: AuthContextValue = {
    ...state,
    signInWithGoogle,
    signOut,
    consumeCoin,
    openLoginModal,
    closeLoginModal,
    hasActiveSubscription,
    canGenerate,
    remainingGenerations,
    refreshSubscription,
    logGeneration,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
