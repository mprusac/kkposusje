
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_date DATE NOT NULL,
  opponent TEXT NOT NULL,
  is_home BOOLEAN NOT NULL DEFAULT true,
  posusje_score INTEGER,
  opponent_score INTEGER,
  competition TEXT NOT NULL DEFAULT 'liga' CHECK (competition IN ('liga','kup')),
  youtube_link TEXT,
  sofascore_link TEXT,
  opponent_logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.matches TO anon, authenticated;
GRANT ALL ON public.matches TO service_role;

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read matches" ON public.matches FOR SELECT TO public USING (true);
CREATE POLICY "Deny anon+auth insert on matches" ON public.matches AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny anon+auth update on matches" ON public.matches AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny anon+auth delete on matches" ON public.matches AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE TRIGGER matches_set_updated_at BEFORE UPDATE ON public.matches
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed existing matches
INSERT INTO public.matches (match_date, opponent, is_home, posusje_score, opponent_score, competition, youtube_link, sofascore_link) VALUES
('2026-03-20','HKK Ljubuški',true,88,78,'liga','https://www.youtube.com/watch?v=1jks9zzXLDw','https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014542'),
('2026-03-17','HKK Čapljina',false,83,61,'liga','https://www.youtube.com/watch?v=fYoOtDkPZJ0','https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15717259'),
('2026-03-08','HKK Grude',true,80,67,'liga','https://www.youtube.com/watch?v=xKw2LGbjTXo','https://www.sofascore.com/hr/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014517'),
('2026-03-01','HKK Rama',false,94,60,'liga','https://www.youtube.com/watch?v=TCng7GXf2uU','https://www.sofascore.com/hr/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014515'),
('2026-02-22','HKK Široki II',false,62,70,'liga','https://www.youtube.com/watch?v=xdO6qF1POOc','https://www.sofascore.com/hr/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014507'),
('2026-02-15','HKK Mostar',true,90,84,'liga','https://www.youtube.com/watch?v=ncFUEOKNpCo','https://www.sofascore.com/hr/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014506'),
('2026-02-08','HKK Tomislav',false,55,60,'liga',NULL,'https://www.sofascore.com/hr/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:15014499'),
('2026-01-20','HKK Široki II',true,54,69,'kup',NULL,'https://www.sofascore.com/hr/basketball/match/kk-posusje-hkk-siroki/lIcsTEid#id:15400673'),
('2025-12-14','HKK Ljubuški',false,81,85,'liga','https://www.youtube.com/live/X2TcwA2sgH0?si=qE7iKg4f61kOe0Ap','https://www.sofascore.com/basketball/match/hkk-ljubuski-kk-posusje/TEidsOiOi#id:15014496'),
('2025-12-07','HKK Čapljina',false,107,33,'liga',NULL,'https://www.sofascore.com/basketball/match/kk-posusje-hkk-capljina/nOHcsTEid#id:15185580'),
('2025-11-30','HKK Grude',false,56,60,'liga','https://www.youtube.com/live/1PvUKvtkBkQ?si=he8SIzhogLNQcjw3','https://www.sofascore.com/basketball/match/hkk-grude-kk-posusje/TEidsMiOi#id:15014486'),
('2025-11-23','HKK Rama',true,90,77,'liga','https://www.youtube.com/live/7k5R_SHgrEE?si=GGB5YTpvDl_TG0Bt','https://www.sofascore.com/basketball/match/hkk-rama-kk-posusje/TEidsNiOi#id:15014481'),
('2025-11-15','HKK Široki II',true,79,72,'liga','https://www.youtube.com/live/M4P4ciZs5Cw?si=jP7sKatpeSwoIt46','https://www.sofascore.com/basketball/match/hkk-siroki-ii-kk-posusje/TEidsJiOi#id:15014461'),
('2025-11-09','HKK Mostar',false,78,92,'liga',NULL,'https://www.sofascore.com/basketball/match/hkk-mostar-kk-posusje/TEidsMbxh#id:15014458'),
('2025-11-02','HKK Tomislav',true,81,85,'liga',NULL,'https://www.sofascore.com/basketball/match/hkk-tomislav-tomislavgrad-kk-posusje/TEidsLiOi#id:14973017');
