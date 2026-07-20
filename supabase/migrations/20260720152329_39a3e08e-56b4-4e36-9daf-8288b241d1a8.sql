
-- Remove public write policies on storage.objects for admin buckets
DROP POLICY IF EXISTS "Public insert news+gallery" ON storage.objects;
DROP POLICY IF EXISTS "Public update news+gallery" ON storage.objects;
DROP POLICY IF EXISTS "Public delete news+gallery" ON storage.objects;

-- Uploads/updates/deletes for news-images and gallery-images now go through
-- admin edge functions using the service role, which bypasses RLS.
-- Public SELECT policy remains so signed URLs work.
