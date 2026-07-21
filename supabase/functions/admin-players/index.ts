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
  const trim = (v: any) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  const toInt = (v: any) =>
    v === null || v === undefined || v === '' ? null : Number.isFinite(Number(v)) ? Math.trunc(Number(v)) : null;
  let stats = body.statistics;
  if (!Array.isArray(stats)) stats = [];
  stats = stats
    .filter((s: any) => s && typeof s.label === 'string' && s.label.trim())
    .map((s: any) => ({ label: String(s.label).trim(), value: String(s.value ?? '').trim() }));
  return {
    name: String(body.name ?? '').trim(),
    position: trim(body.position),
    description: trim(body.description),
    image_url: trim(body.image_url),
    jersey_number: toInt(body.jersey_number),
    statistics: stats,
    sort_order: toInt(body.sort_order) ?? 0,
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
        .from('players')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'create') {
      const insert = sanitize(await req.json());
      if (!insert.name) return json({ error: 'name required' }, 400);
      const { data, error } = await supabase.from('players').insert(insert).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'update') {
      const body = await req.json();
      const { id } = body;
      if (!id) return json({ error: 'id required' }, 400);
      const updates = sanitize(body);
      const { data, error } = await supabase.from('players').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'delete') {
      const { id } = await req.json();
      if (!id) return json({ error: 'id required' }, 400);
      const { error } = await supabase.from('players').delete().eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    if (endpoint === 'signed-upload') {
      const { path } = await req.json();
      const safePath = String(path ?? '').replace(/^\/+/, '');
      const { data, error } = await supabase.storage.from('player-images').createSignedUploadUrl(safePath);
      if (error) throw error;
      return json({ ...data, bucket: 'player-images', path: safePath });
    }

    return json({ error: 'Not found' }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
