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

function getExpectedTokenForDay(day: string): string {
  const data = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${day}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash;
  }
  return `admin_${Math.abs(hash).toString(36)}_${day.replace(/-/g, '')}`;
}

function getExpectedToken(): string {
  return getExpectedTokenForDay(new Date().toISOString().slice(0, 10));
}

function verifyAdminToken(req: Request): boolean {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer admin_')) return false;
  const provided = auth.replace('Bearer ', '');
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    if (provided === getExpectedTokenForDay(d.toISOString().slice(0, 10))) return true;
  }
  return false;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const endpoint = segments[segments.length - 1];

  try {
    if (endpoint === 'list-public') {
      const { data, error } = await supabase.from('galleries').select('*').order('date', { ascending: false });
      if (error) throw error;
      return json(data);
    }

    if (!verifyAdminToken(req)) return json({ error: 'Unauthorized' }, 401);

    if (endpoint === 'list') {
      const { data, error } = await supabase.from('galleries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'create') {
      const body = await req.json();
      const insert = {
        title: body.title,
        date: body.date,
        images: body.images ?? [],
        cover_image: body.cover_image ?? null,
      };
      const { data, error } = await supabase.from('galleries').insert(insert).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'update') {
      const { id, ...updates } = await req.json();
      const { data, error } = await supabase.from('galleries').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return json(data);
    }

    if (endpoint === 'delete') {
      const { id } = await req.json();
      const { error } = await supabase.from('galleries').delete().eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    if (endpoint === 'signed-upload') {
      const { path, bucket } = await req.json();
      const b = bucket === 'news-images' ? 'news-images' : 'gallery-images';
      const safePath = String(path).replace(/^\/+/, '');
      const { data, error } = await supabase.storage.from(b).createSignedUploadUrl(safePath);
      if (error) throw error;
      return json({ ...data, bucket: b, path: safePath });
    }

    return json({ error: 'Not found' }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
