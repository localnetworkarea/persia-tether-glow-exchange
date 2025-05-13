
-- This is for reference only. We need to create this storage bucket in Supabase.

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
