import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

const ADMIN_USERNAME = Deno.env.get('ADMIN_USERNAME') ?? '';
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') ?? '';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

function getExpectedToken(): string {
  const day = new Date().toISOString().slice(0, 10);
  const data = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${day}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash;
  }
  return `admin_${Math.abs(hash).toString(36)}_${day.replace(/-/g, '')}`;
}

function verifyAdminToken(req: Request): boolean {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer admin_')) return false;
  return auth.replace('Bearer ', '') === getExpectedToken();
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function sanitize(body: any) {
  const toInt = (v: any) =>
    v === null || v === undefined || v === '' ? null : Number.isFinite(Number(v)) ? Math.trunc(Number(v)) : null;
  const trim = (v: any) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  const competition = body.competition === 'kup' ? 'kup' : 'liga';
  return {
    match_date: body.match_date, // expected YYYY-MM-DD
    opponent: String(body.opponent ?? '').trim(),
    is_home: Boolean(body.is_home),
    posusje_score: toInt(body.posusje_score),
    opponent_score: toInt(body.opponent_score),
    competition,
    youtube_link: trim(body.youtube_link),
    sofascore_link: trim(body.sofascore_link),
    opponent_logo_url: trim(body.opponent_logo_url),
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const endpoint = segments[segments.length - 1];

  try {
    if (!verifyAdminToken(req)) return json({ error: 'Unauthorized' }, 401);

    if (endpoint === 'list') {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: false });
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'create') {
      const insert = sanitize(await req.json());
      if (!insert.opponent || !insert.match_date) return json({ error: 'match_date and opponent required' }, 400);
      const { data, error } = await supabase.from('matches').insert(insert).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'update') {
      const body = await req.json();
      const { id } = body;
      if (!id) return json({ error: 'id required' }, 400);
      const updates = sanitize(body);
      const { data, error } = await supabase.from('matches').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'delete') {
      const { id } = await req.json();
      if (!id) return json({ error: 'id required' }, 400);
      const { error } = await supabase.from('matches').delete().eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    return json({ error: 'Not found' }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
