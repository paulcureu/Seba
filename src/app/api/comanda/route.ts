import { NextResponse } from "next/server";
import { clean, notify } from "@/lib/server/notify";
import { getProduct } from "@/lib/menu";

type Line = { slug?: unknown; name?: unknown; qty?: unknown; unit?: unknown; details?: unknown };

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalid" }, { status: 400 });
  }

  const nume = clean(data.nume, 120);
  const telefon = clean(data.telefon, 40);
  const method = data.method === "ridicare" ? "ridicare" : "livrare";
  const strada = clean(data.strada, 200);
  const lines = Array.isArray(data.lines) ? (data.lines as Line[]).slice(0, 60) : [];

  if (!nume || !/^[+\d][\d\s]{8,}$/.test(telefon) || (method === "livrare" && !strada) || lines.length === 0) {
    return NextResponse.json({ ok: false, error: "Date incomplete" }, { status: 422 });
  }

  const items = lines.map((l) => ({
    produs: clean(l.name, 120),
    cunoscut: typeof l.slug === "string" ? Boolean(getProduct(l.slug)) || l.slug.startsWith("d-") : false,
    cantitate: Math.max(1, Math.min(99, Number(l.qty) || 1)),
    pretUnitar: Number(l.unit) || 0,
    detalii: Array.isArray(l.details) ? (l.details as unknown[]).map((d) => clean(d, 200)).join(" · ") : "",
  }));

  const id = `S${Date.now().toString(36).toUpperCase().slice(-6)}`;
  await notify(`Comandă nouă ${id} — ${nume} (${method})`, {
    id,
    nume,
    telefon,
    email: clean(data.email, 120),
    metoda: method,
    adresa: method === "livrare" ? [strada, clean(data.bloc, 60), clean(data.ap, 60), clean(data.oras, 60)].filter(Boolean).join(", ") : "ridicare din local",
    plata: clean(data.pay, 20),
    observatii: clean(data.obs, 600),
    produse: items,
    total: Number(data.total) || 0,
  });

  return NextResponse.json({ ok: true, id });
}
