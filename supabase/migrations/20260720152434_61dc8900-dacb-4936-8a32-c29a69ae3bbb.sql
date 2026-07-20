
-- Explicit deny policies so RLS write protection is visible to auditors.
-- Service role bypasses RLS, so admin edge functions still work.

DROP POLICY IF EXISTS "Deny public writes on news" ON public.news;
CREATE POLICY "Deny public writes on news"
  ON public.news
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "Deny public writes on galleries" ON public.galleries;
CREATE POLICY "Deny public writes on galleries"
  ON public.galleries
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
