-- ============================================
-- VIRALFLOWY — Dar acceso Pro a cuenta de prueba
-- Ejecuta esto en Supabase > SQL Editor
-- ============================================

-- Paso 1: Buscar el ID del usuario por su email
-- (Esto te muestra el ID para verificar)
SELECT id, email, name, is_pro FROM profiles 
WHERE email = 'brandondevnunez@gmail.com';

-- Paso 2: Marcar como Pro en la tabla profiles
UPDATE profiles 
SET is_pro = true 
WHERE email = 'brandondevnunez@gmail.com';

-- Paso 3: Crear una suscripción Pro que expire en 10 años (cuenta de prueba)
INSERT INTO subscriptions (user_id, plan_name, price_paid, currency, paypal_order_id, starts_at, expires_at, is_active)
SELECT 
  id,                                           -- user_id
  'pro',                                        -- plan_name
  0.00,                                         -- price_paid (gratis, es cuenta de prueba)
  'USD',                                        -- currency
  'ADMIN_TEST_ACCOUNT',                         -- paypal_order_id
  NOW(),                                        -- starts_at
  NOW() + INTERVAL '10 years',                  -- expires_at (10 años)
  true                                          -- is_active
FROM profiles 
WHERE email = 'brandondevnunez@gmail.com';

-- Verificar que se creó bien:
SELECT s.*, p.email 
FROM subscriptions s 
JOIN profiles p ON p.id = s.user_id 
WHERE p.email = 'brandondevnunez@gmail.com';
