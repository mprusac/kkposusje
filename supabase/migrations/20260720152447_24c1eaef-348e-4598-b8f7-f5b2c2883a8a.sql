
DROP POLICY IF EXISTS "Deny public writes on news" ON public.news;
DROP POLICY IF EXISTS "Deny public writes on galleries" ON public.galleries;

-- Split into INSERT/UPDATE/DELETE so SELECT (public read) is unaffected.
CREATE POLICY "Deny anon+auth insert on news" ON public.news
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny anon+auth update on news" ON public.news
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny anon+auth delete on news" ON public.news
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "Deny anon+auth insert on galleries" ON public.galleries
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny anon+auth update on galleries" ON public.galleries
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny anon+auth delete on galleries" ON public.galleries
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);
