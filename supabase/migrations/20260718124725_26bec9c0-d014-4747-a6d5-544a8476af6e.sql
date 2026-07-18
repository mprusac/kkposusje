
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  date text NOT NULL,
  category text NOT NULL DEFAULT '2026',
  image_url text,
  image_position text DEFAULT 'center',
  pinned boolean DEFAULT false,
  gallery_images text[] DEFAULT '{}'::text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.news TO anon;
GRANT SELECT ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read news" ON public.news FOR SELECT USING (true);

CREATE TABLE public.galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date text NOT NULL,
  images text[] NOT NULL DEFAULT '{}'::text[],
  cover_image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.galleries TO anon;
GRANT SELECT ON public.galleries TO authenticated;
GRANT ALL ON public.galleries TO service_role;

ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read galleries" ON public.galleries FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER news_set_updated_at BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER galleries_set_updated_at BEFORE UPDATE ON public.galleries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
