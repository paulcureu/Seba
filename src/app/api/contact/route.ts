import { NextResponse } from "next/server";
import { clean, notify } from "@/lib/server/notify";

export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const nume = clean(d.nume, 120);
  const mesaj = clean(d.mesaj, 2000);
  if (!nume || !mesaj) return NextResponse.json({ ok: false, error: "Date incomplete" }, { status: 422 });
  await notify(`Mesaj nou de pe site — ${nume}`, { nume, email: clean(d.email, 120), telefon: clean(d.telefon, 40), mesaj });
  return NextResponse.json({ ok: true });
}
