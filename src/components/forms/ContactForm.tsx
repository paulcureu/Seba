"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { CheckIcon } from "@/components/ui/icons";

export function ContactForm() {
  const [form, setForm] = useState({ nume: "", email: "", telefon: "", mesaj: "" });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nume.trim() || !form.mesaj.trim()) return setError("Completează numele și mesajul.");
    if (!agree) return setError("Bifează acordul pentru a trimite mesajul.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ nume: "", email: "", telefon: "", mesaj: "" });
      setAgree(false);
    } catch {
      setStatus("idle");
      setError(`Mesajul nu a putut fi trimis. Scrie-ne la ${site.email}.`);
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-[28px] bg-ink p-6 text-cream sm:p-8">
      <span className="display text-4xl">Trimite-ne un mesaj</span>
      {status === "done" && (
        <p role="status" className="flex items-center gap-3 rounded-2xl bg-brass/15 px-4 py-3 text-sm font-bold text-brass-light">
          <CheckIcon className="size-5" /> Mulțumim! Am primit mesajul tău.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="c-nume" className="label">Nume</label>
          <input id="c-nume" autoComplete="name" value={form.nume} onChange={set("nume")} className="field bg-panel" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="label">Email</label>
          <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className="field bg-panel" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-tel" className="label">Telefon</label>
          <input id="c-tel" type="tel" autoComplete="tel" value={form.telefon} onChange={set("telefon")} className="field bg-panel" />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="c-msg" className="label">Mesajul tău</label>
          <textarea id="c-msg" rows={5} value={form.mesaj} onChange={set("mesaj")} className="field resize-y bg-panel" />
        </div>
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-soft">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-brass" />
        <span>
          Am citit și sunt de acord cu <a href="/politica-de-confidentialitate" className="underline underline-offset-2">Politica de confidențialitate</a> și{" "}
          <a href="/politica-de-utilizare-cookies" className="underline underline-offset-2">Politica de utilizare cookies</a>.
        </span>
      </label>
      {error && <p role="alert" className="text-sm font-bold text-hot">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary self-start disabled:opacity-60">
        {status === "sending" ? "Se trimite…" : "Trimite mesajul"}
      </button>
    </form>
  );
}
