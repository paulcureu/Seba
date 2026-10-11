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
  const telefon = clean(d.telefon, 40);
  if (!nume || !/^[+\d][\d\s]{8,}$/.test(telefon)) {
    return NextResponse.json({ ok: false, error: "Date incomplete" }, { status: 422 });
  }
  await notify(`Rezervare nouă — ${nume}`, {
    tip: clean(d.tip, 30),
    eveniment: clean(d.eveniment, 60),
    persoane: clean(String(d.persoane ?? ""), 10),
    data: clean(d.data, 40),
    ora: clean(d.ora, 10),
    nume,
    telefon,
    email: clean(d.email, 120),
    info: clean(d.info, 800),
  });
  return NextResponse.json({ ok: true });
}
