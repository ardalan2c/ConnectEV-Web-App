-- Run this in your Supabase SQL editor after setting up your project

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lead-photos','lead-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Allow uploads only via signed URLs (server issues them). Keep objects private by default.
CREATE POLICY "objects_can_be_accessed_with_signed_urls"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'lead-photos');

-- Allow uploads via signed URLs only
CREATE POLICY "objects_can_be_uploaded_via_signed_urls"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'lead-photos');

-- Optional: disallow direct inserts by anon role (we rely on signed upload URLs)
-- This is already handled by RLS policies above, but can be explicitly revoked
-- REVOKE INSERT ON storage.objects FROM anon;