import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-display text-[clamp(7rem,22vw,14rem)] italic leading-none text-brass/80">404</span>
      <h1 className="display text-5xl leading-[1.08]">Pagina asta s-a mâncat.</h1>
      <p className="max-w-md text-soft">Nu am găsit ce căutai, dar meniul e tot acolo.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/meniu" className="btn btn-primary">Vezi meniul</Link>
        <Link href="/" className="btn btn-ghost">Acasă</Link>
      </div>
    </section>
  );
}
