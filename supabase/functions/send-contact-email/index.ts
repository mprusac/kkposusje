import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BRAND_GOLD = '#EAB308';
const BRAND_DARK = '#121212';
const BRAND_CARD = '#1A1A1A';
const BRAND_MUTED = '#2E2E2E';
const BRAND_TEXT = '#A6A6A6';
const BRAND_WHITE = '#FFFFFF';

function ownerEmailHtml(name: string, email: string, subject: string, message: string): string {
  const LOGO_URL = 'https://tchaaceoqtjwpqjztijh.supabase.co/storage/v1/object/public/email-assets/logo.png';
  const date = new Date().toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return `
<!DOCTYPE html>
<html lang="hr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${BRAND_DARK};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_DARK};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background-color:${BRAND_GOLD};padding:24px 32px;border-radius:12px 12px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;">
                <h1 style="margin:0;font-size:22px;font-weight:800;color:${BRAND_DARK};letter-spacing:1px;text-transform:uppercase;">NOVA PORUKA</h1>
                <p style="margin:4px 0 0;font-size:13px;color:${BRAND_DARK};opacity:0.7;">Kontakt forma · KK Posušje</p>
                <p style="margin:4px 0 0;font-size:11px;color:${BRAND_DARK};opacity:0.6;">${date}</p>
              </td>
              <td align="right" style="vertical-align:top;width:60px;">
                <img src="${LOGO_URL}" alt="KK Posušje" width="50" height="50" style="display:block;border:none;outline:none;" />
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:${BRAND_CARD};padding:32px;border-radius:0 0 12px 12px;">
          <!-- Info fields -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:12px 16px;background-color:${BRAND_MUTED};border-radius:8px 8px 0 0;border-bottom:1px solid ${BRAND_DARK};">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND_GOLD};font-weight:700;">Ime i prezime</span>
                <p style="margin:4px 0 0;font-size:15px;color:${BRAND_WHITE};font-weight:500;">${name}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:${BRAND_MUTED};border-bottom:1px solid ${BRAND_DARK};">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND_GOLD};font-weight:700;">Email</span>
                <p style="margin:4px 0 0;font-size:15px;color:${BRAND_WHITE};"><a href="mailto:${email}" style="color:${BRAND_GOLD};text-decoration:none;">${email}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:${BRAND_MUTED};border-radius:0 0 8px 8px;">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND_GOLD};font-weight:700;">Predmet</span>
                <p style="margin:4px 0 0;font-size:15px;color:${BRAND_WHITE};font-weight:500;">${subject}</p>
              </td>
            </tr>
          </table>
          <!-- Message -->
          <div style="background-color:${BRAND_MUTED};border-radius:8px;padding:20px;border-left:3px solid ${BRAND_GOLD};">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND_GOLD};font-weight:700;">Poruka</span>
            <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:${BRAND_WHITE};">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <!-- Reply button -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td align="center">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;padding:12px 32px;background-color:${BRAND_GOLD};color:${BRAND_DARK};font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;text-transform:uppercase;letter-spacing:1px;">↩ Odgovori</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:${BRAND_TEXT};">KK Posušje · Ulica Bartola Kašića 2, 88240 Posušje</p>
          <p style="margin:4px 0 0;font-size:11px;color:${BRAND_TEXT};">Ova poruka je automatski generirana putem kontakt forme na web stranici.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function userConfirmationHtml(name: string, subject: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="hr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${BRAND_DARK};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_DARK};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background-color:${BRAND_GOLD};padding:28px 32px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:800;color:${BRAND_DARK};letter-spacing:2px;text-transform:uppercase;">KK POSUŠJE</h1>
          <p style="margin:6px 0 0;font-size:13px;color:${BRAND_DARK};opacity:0.7;">Košarkaški klub Posušje</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:${BRAND_CARD};padding:32px;border-radius:0 0 12px 12px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:${BRAND_WHITE};font-weight:700;">Hvala vam, ${name}! 🏀</h2>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:${BRAND_TEXT};">
            Vaša poruka je uspješno zaprimljena. Odgovorit ćemo vam u najkraćem mogućem roku.
          </p>
          <!-- Summary -->
          <div style="background-color:${BRAND_MUTED};border-radius:8px;padding:20px;border-left:3px solid ${BRAND_GOLD};">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND_GOLD};font-weight:700;">Vaša poruka</span>
            <p style="margin:8px 0 4px;font-size:13px;color:${BRAND_TEXT};">
              <strong style="color:${BRAND_WHITE};">Predmet:</strong> ${subject}
            </p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:${BRAND_TEXT};">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td align="center">
              <a href="https://kkposusje.lovable.app" style="display:inline-block;padding:12px 32px;background-color:${BRAND_GOLD};color:${BRAND_DARK};font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;text-transform:uppercase;letter-spacing:1px;">🌐 Posjetite našu stranicu</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:${BRAND_TEXT};">KK Posušje · Ulica Bartola Kašića 2, 88240 Posušje</p>
          <p style="margin:4px 0 0;font-size:11px;color:${BRAND_TEXT};">Ovo je automatska potvrda. Molimo ne odgovarajte na ovaj email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Sva polja su obavezna' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send to owner
    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'KK Posušje <kontakt@kkposusje.ba>',
        to: ['mprusac23@student.foi.hr'],
        subject: `[Kontakt forma] ${subject}`,
        reply_to: email,
        html: ownerEmailHtml(name, email, subject, message),
      }),
    });

    const ownerData = await ownerRes.json();
    if (!ownerRes.ok) {
      console.error('Resend API error (owner):', JSON.stringify(ownerData));
      throw new Error(`Resend API error [${ownerRes.status}]: ${JSON.stringify(ownerData)}`);
    }

    // Send confirmation to user
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'KK Posušje <kontakt@kkposusje.ba>',
        to: [email],
        subject: `Potvrda poruke - KK Posušje`,
        html: userConfirmationHtml(name, subject, message),
      }),
    });

    const userData = await userRes.json();
    if (!userRes.ok) {
      // Log but don't fail - owner email was sent successfully
      console.error('Resend API error (user confirmation):', JSON.stringify(userData));
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
