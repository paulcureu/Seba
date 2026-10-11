import "server-only";

/**
 * Aici ajung comenzile, rezervările și mesajele trimise din site.
 *
 * Implicit doar le scrie în log-urile serverului (le vezi în Vercel → Logs).
 * Ca să le primești pe email, completează RESEND_API_KEY și ORDER_EMAIL_TO în
 * variabilele de mediu din Vercel (vezi README). Fără cheie, site-ul merge oricum.
 */
export async function notify(subject: string, body: Record<string, unknown>) {
  const text = `${subject}\n\n${JSON.stringify(body, null, 2)}`;
  console.log(`[pizza-seba] ${text}`);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  if (!key || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ORDER_EMAIL_FROM ?? "Pizza Seba <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject,
      text,
    }),
  });
  if (!res.ok) console.error("[pizza-seba] email eșuat", res.status, await res.text());
}

export function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
