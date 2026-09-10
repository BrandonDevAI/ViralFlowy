'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { env } from '../lib/env';

const paypalOptions = {
  clientId: env.PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture',
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PayPalScriptProvider options={paypalOptions}>
        {children}
      </PayPalScriptProvider>
    </AuthProvider>
  );
}
