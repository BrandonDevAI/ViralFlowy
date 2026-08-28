import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App.tsx';
import './index.css';

const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PayPalScriptProvider options={paypalOptions}>
          <App />
        </PayPalScriptProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
