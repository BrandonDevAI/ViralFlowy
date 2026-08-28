-- ============================================
-- VIRALFLOWY — TABLAS DE SUSCRIPCIONES
-- Ejecuta esto en Supabase > SQL Editor
-- ============================================

-- 1. Tabla de suscripciones
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL,                -- 'starter', 'creador', 'pro'
  price_paid DECIMAL(10,2) NOT NULL,      -- 5.00, 10.00, 69.00
  currency TEXT DEFAULT 'USD',
  paypal_order_id TEXT,                   -- ID del pago de PayPal
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,        -- Cuándo expira
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de registro de generaciones (para limitar por día)
CREATE TABLE IF NOT EXISTS generation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  input_type TEXT DEFAULT 'idea',         -- 'idea' o 'url'
  input_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at ON subscriptions(expires_at);
CREATE INDEX IF NOT EXISTS idx_generation_logs_user_id ON generation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_generation_logs_created_at ON generation_logs(created_at);

-- 4. Habilitar Row Level Security (RLS) — IMPORTANTE para seguridad
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;

-- 5. Políticas: cada usuario solo puede ver/crear sus propios datos
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own generation logs"
  ON generation_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation logs"
  ON generation_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
