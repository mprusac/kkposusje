
CREATE POLICY "Public read news+gallery" ON storage.objects FOR SELECT
  USING (bucket_id IN ('news-images', 'gallery-images'));

CREATE POLICY "Public insert news+gallery" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('news-images', 'gallery-images'));

CREATE POLICY "Public update news+gallery" ON storage.objects FOR UPDATE
  USING (bucket_id IN ('news-images', 'gallery-images'));

CREATE POLICY "Public delete news+gallery" ON storage.objects FOR DELETE
  USING (bucket_id IN ('news-images', 'gallery-images'));
