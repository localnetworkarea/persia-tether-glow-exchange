
-- Create the exchange function for buying/selling tether
CREATE OR REPLACE FUNCTION public.execute_exchange(
  p_user_id UUID,
  p_amount DECIMAL,
  p_is_buy BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_record RECORD;
  v_exchange_rate RECORD;
  v_price DECIMAL;
  v_rial_amount DECIMAL;
  v_transaction_type TEXT;
BEGIN
  -- Get user data
  SELECT * INTO v_user_record 
  FROM public.users 
  WHERE id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Get current exchange rate
  SELECT * INTO v_exchange_rate 
  FROM public.exchange_rates 
  ORDER BY created_at DESC 
  LIMIT 1;
  
  -- Determine price and calculate rial amount
  IF p_is_buy THEN
    v_price := v_exchange_rate.buy_price;
    v_transaction_type := 'exchange';
    v_rial_amount := p_amount * v_price;
    
    -- Check user has enough rial balance
    IF v_user_record.rial_balance < v_rial_amount THEN
      RAISE EXCEPTION 'Insufficient rial balance';
    END IF;
    
    -- Update balances
    UPDATE public.users
    SET 
      tether_balance = tether_balance + p_amount,
      rial_balance = rial_balance - v_rial_amount
    WHERE id = p_user_id;
    
  ELSE -- Sell
    v_price := v_exchange_rate.sell_price;
    v_transaction_type := 'exchange';
    v_rial_amount := p_amount * v_price;
    
    -- Check user has enough tether balance
    IF v_user_record.tether_balance < p_amount THEN
      RAISE EXCEPTION 'Insufficient tether balance';
    END IF;
    
    -- Update balances
    UPDATE public.users
    SET 
      tether_balance = tether_balance - p_amount,
      rial_balance = rial_balance + v_rial_amount
    WHERE id = p_user_id;
  END IF;
  
  -- Insert tether transaction
  INSERT INTO public.transactions (
    user_id, 
    type, 
    currency, 
    amount, 
    fee, 
    status
  ) VALUES (
    p_user_id,
    v_transaction_type,
    'tether',
    p_amount,
    0,
    'completed'
  );
  
  -- Insert rial transaction
  INSERT INTO public.transactions (
    user_id, 
    type, 
    currency, 
    amount, 
    fee, 
    status
  ) VALUES (
    p_user_id,
    v_transaction_type,
    'rial',
    v_rial_amount,
    0,
    'completed'
  );
  
END;
$$;

-- Create storage bucket for KYC images
INSERT INTO storage.buckets (id, name, public)
VALUES ('kyc-images', 'KYC Images', false);

-- Set up policy to allow authenticated users to upload their own KYC images
CREATE POLICY "Users can upload their KYC images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'kyc-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Set up policy to allow users to view their own KYC images
CREATE POLICY "Users can view their KYC images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'kyc-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
