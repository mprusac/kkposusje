
CREATE POLICY "Deny anon+auth insert player-images"
ON storage.objects AS RESTRICTIVE FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id <> 'player-images');

CREATE POLICY "Deny anon+auth update player-images"
ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon, authenticated
USING (bucket_id <> 'player-images') WITH CHECK (bucket_id <> 'player-images');

CREATE POLICY "Deny anon+auth delete player-images"
ON storage.objects AS RESTRICTIVE FOR DELETE TO anon, authenticated
USING (bucket_id <> 'player-images');
