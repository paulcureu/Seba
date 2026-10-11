import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** Antet de pagină: breadcrumb, titlu animat și descriere, cu imagine opțională în fundal. */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  children,
  image,
  aside,
}: {
  crumbs: { href?: string; label: string }[];
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  image?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-cream/[0.08]">
      {image && (
        <>
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      )}
      <div className="container-x relative flex flex-col justify-between gap-8 pb-10 pt-8 md:gap-10 md:pb-20 md:pt-16 lg:flex-row lg:items-end">
        <div className="flex max-w-3xl flex-col gap-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-[#5e6960]">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-cream">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-brass-light">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <SplitHeading as="h1" trigger="load" className="display text-[clamp(2.6rem,10.5vw,6.75rem)] leading-[1.06] text-balance">
            {title}
          </SplitHeading>
          {children && <div data-reveal className="max-w-xl text-base leading-[1.7] text-soft sm:text-[17px] sm:leading-[1.75]">{children}</div>}
        </div>
        {aside && <div data-reveal>{aside}</div>}
      </div>
    </section>
  );
}
