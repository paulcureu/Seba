"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";

const WD = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
const MO = ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "nov", "dec"];
const SLOTS = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "19:30", "20:00"];
const EVENTS = ["Aniversare", "Botez", "Petrecere de birou", "Altceva"];

export function ReservationForm() {
  const params = useSearchParams();
  const [kind, setKind] = useState<"masa" | "eveniment">(params.get("tip") === "eveniment" ? "eveniment" : "masa");
  const [ev, setEv] = useState(EVENTS[0]);
  const [people, setPeople] = useState(kind === "eveniment" ? 20 : 4);
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState("19:00");
  const [form, setForm] = useState({ nume: "", telefon: "", email: "", info: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const boxRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const t = new Date();
    return Array.from({ length: 10 }, (_, i) => {
      const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
      return { i, wd: i === 0 ? "Azi" : i === 1 ? "Mâine" : WD[d.getDay()], day: d.getDate(), mon: MO[d.getMonth()], iso: d.toISOString().slice(0, 10) };
    });
  }, []);

  const peopleOpts = kind === "eveniment" ? [10, 15, 20, 30, 40, 50] : [1, 2, 3, 4, 5, 6, 7, 8];
  const chosen = days[day];
  const summary = `${kind === "eveniment" ? ev : "Masă"} · ${people}${people === peopleOpts[peopleOpts.length - 1] ? "+" : ""} ${people === 1 ? "persoană" : "persoane"} · ${chosen.day} ${chosen.mon} · ${slot}`;

  useGSAP(
    () => {
      if (!boxRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(boxRef.current!.querySelectorAll("[data-step]"), { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" });
      });
      return () => mm.revert();
    },
    { dependencies: [kind, status], scope: boxRef, revertOnUpdate: true },
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.nume.trim()) err.nume = "Scrie-ne numele tău.";
    if (!/^[+\d][\d\s]{8,}$/.test(form.telefon.trim())) err.telefon = "Avem nevoie de un număr de telefon valid.";
    if (!agree) err.agree = "Bifează acordul pentru a continua.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/rezervare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: kind, eveniment: kind === "eveniment" ? ev : "", persoane: people, data: chosen.iso, ora: slot, ...form }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const pill = (on: boolean) =>
    `h-11 min-w-12 rounded-full border px-4 text-sm transition-colors ${on ? "border-brass bg-brass font-extrabold text-ink" : "border-cream/15 font-semibold text-cream hover:border-cream/40"}`;

  return (
    <div ref={boxRef} className="min-w-0 rounded-[30px] border border-cream/10 bg-panel p-5 sm:p-8 md:p-9">
      {status === "done" ? (
        <div className="flex flex-col items-center gap-5 px-2 py-14 text-center">
          <span data-step className="flex size-24 items-center justify-center rounded-full bg-brass text-ink">
            <CheckIcon className="size-10" />
          </span>
          <span data-step className="display text-5xl leading-[1.08]">Cerere trimisă!</span>
          <p data-step className="max-w-md text-base leading-relaxed text-soft">
            Am primit cererea ta ({summary}). Revenim cu confirmarea cât mai curând. Pentru ceva urgent, sună la {site.phone}.
          </p>
          <button data-step type="button" onClick={() => setStatus("idle")} className="btn btn-ghost">
            Altă rezervare
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="flex flex-col gap-7">
          <div data-step role="tablist" aria-label="Tip rezervare" className="grid grid-cols-2 rounded-full border border-cream/10 bg-ink p-1">
            {(
              [
                ["masa", "O masă"],
                ["eveniment", "Un eveniment"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={kind === k}
                onClick={() => {
                  setKind(k);
                  setPeople(k === "eveniment" ? 20 : 4);
                }}
                className={`h-12 rounded-full text-[13px] font-extrabold uppercase tracking-[0.12em] transition-colors ${kind === k ? "bg-cream text-ink" : "text-soft"}`}
              >
                {l}
              </button>
            ))}
          </div>

          {kind === "eveniment" && (
            <div data-step className="flex flex-col gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light">Tipul evenimentului</span>
              <div className="flex flex-wrap gap-2">
                {EVENTS.map((x) => (
                  <button key={x} type="button" aria-pressed={ev === x} onClick={() => setEv(x)} className={pill(ev === x)}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div data-step className="flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light">Număr de persoane</span>
            <div className="flex flex-wrap gap-2">
              {peopleOpts.map((n, i) => (
                <button key={n} type="button" aria-pressed={people === n} onClick={() => setPeople(n)} className={pill(people === n)}>
                  {n}
                  {i === peopleOpts.length - 1 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>

          <div data-step className="flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light">Ziua dorită</span>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0 md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7">
              {days.slice(0, 7).map((d) => {
                const on = day === d.i;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    aria-pressed={on}
                    aria-label={`${d.day} ${d.mon}`}
                    onClick={() => setDay(d.i)}
                    className={`flex h-[84px] w-[72px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border transition-colors sm:w-auto ${on ? "border-brass bg-brass text-ink" : "border-cream/15 bg-ink text-cream hover:border-cream/40"}`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-75">{d.wd}</span>
                    <span className="font-display text-[28px] font-semibold leading-none">{d.day}</span>
                    <span className="text-[11px] opacity-70">{d.mon}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div data-step className="flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light">Ora dorită</span>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={slot === s}
                  onClick={() => setSlot(s)}
                  className={`h-11 rounded-xl border text-sm transition-colors ${slot === s ? "border-brass bg-brass/20 font-extrabold text-ivory" : "border-cream/15 font-semibold text-mist hover:border-cream/40"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div data-step className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="r-nume" className="label">Nume și prenume</label>
              <input id="r-nume" autoComplete="name" value={form.nume} onChange={(e) => setForm({ ...form, nume: e.target.value })} placeholder="ex: Maria Pop" className="field" />
              {errors.nume && <span role="alert" className="text-[13px] font-semibold text-hot">{errors.nume}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-tel" className="label">Telefon</label>
              <input id="r-tel" type="tel" autoComplete="tel" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} placeholder="07xx xxx xxx" className="field" />
              {errors.telefon && <span role="alert" className="text-[13px] font-semibold text-hot">{errors.telefon}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="r-email" className="label">Email</label>
              <input id="r-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nume@email.ro" className="field" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="r-info" className="label">Alte informații</label>
              <textarea id="r-info" rows={3} value={form.info} onChange={(e) => setForm({ ...form, info: e.target.value })} placeholder="ex: avem nevoie de un scaun pentru copil" className="field resize-y" />
            </div>
          </div>

          <label data-step className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-soft">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-brass" />
            <span>
              Am citit și sunt de acord cu <a href="/politica-de-confidentialitate" className="underline underline-offset-2">Politica de confidențialitate</a> și{" "}
              <a href="/politica-de-utilizare-cookies" className="underline underline-offset-2">Politica de utilizare cookies</a>.
            </span>
          </label>
          {errors.agree && <span role="alert" className="-mt-4 text-[13px] font-semibold text-hot">{errors.agree}</span>}

          <div data-step className="flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[15px] text-mist">{summary}</span>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary min-h-14 disabled:opacity-60">
              {status === "sending" ? "Se trimite…" : "Solicită rezervarea"} <ArrowRight className="size-4" />
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="text-sm font-bold text-hot">
              Cererea nu a putut fi trimisă. Încearcă din nou sau sună la {site.phone}.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
