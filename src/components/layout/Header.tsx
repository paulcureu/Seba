"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { BagIcon, PhoneIcon } from "@/components/ui/icons";

export function Header() {
  const pathname = usePathname();
  const { count, ready, subtotal, openDrawer } = useCart();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Header: devine opac după scroll și se ascunde la scroll în jos.
  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          el.dataset.scrolled = y > 24 ? "true" : "false";
          const hide = self.direction === 1 && y > 320;
          document.documentElement.dataset.header = hide ? "hidden" : "shown";
          gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        },
      });
    },
    { scope: headerRef },
  );

  // Meniul mobil (timeline GSAP)
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 })
        .fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" }, 0)
        .from(menu.querySelectorAll("[data-menu-item]"), { yPercent: 110, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power4.out" }, "-=0.25")
        .from(menu.querySelectorAll("[data-menu-foot]"), { opacity: 0, y: 16, duration: 0.5 }, "-=0.4");
    },
    { scope: menuRef },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      lockScroll();
      tl.current.timeScale(1).play();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        unlockScroll();
      };
    }
    tl.current.timeScale(1.6).reverse();
  }, [open]);

  // Închide meniul la schimbarea paginii
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacționează la navigare
    setOpen(false);
  }, [pathname]);

  // Mic „bump” al insignei când se schimbă numărul de produse
  useEffect(() => {
    if (!ready || !badgeRef.current) return;
    if (!window.matchMedia(MOTION_OK).matches) return;
    gsap.fromTo(badgeRef.current, { scale: 1.5 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, [count, ready]);

  const shownCount = ready ? count : 0;

  return (
    <>
      <div className="hidden border-b border-cream/10 bg-ink-deep md:block">
        <div className="container-x flex flex-wrap justify-between gap-x-6 gap-y-1 py-2.5 text-xs tracking-wide text-muted">
          <span>{site.hours} · Duminică nu livrăm comenzi</span>
          <span>
            Comenzi telefonice &amp; WhatsApp:{" "}
            <a href={site.phoneHref} className="font-semibold text-brass-light hover:text-white">
              {site.phone}
            </a>
          </span>
        </div>
      </div>

      <header
        ref={headerRef}
        data-scrolled="false"
        className="group/header sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500 data-[scrolled=true]:border-cream/10 data-[scrolled=true]:bg-ink/85 data-[scrolled=true]:backdrop-blur-xl"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Link href="/" aria-label="Seba — acasă" className="relative z-[60] flex shrink-0">
            <Image src="/images/logo-seba.png" alt="Seba pizzeria e trattoria" width={197} height={100} className="h-11 w-auto md:h-[52px]" preload />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:text-brass-light aria-[current=page]:text-brass"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="relative z-[60] flex items-center gap-2.5 md:gap-3">
            <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-cream hover:text-brass-light xl:flex">
              <PhoneIcon className="size-4 text-brass" />
              0744 320 701
            </a>
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Deschide coșul (${shownCount} produse)`}
              className="flex h-12 items-center gap-3 rounded-full border border-cream/20 pl-4 pr-1.5 transition-colors hover:border-brass"
            >
              <BagIcon className="size-5" />
              <span className="hidden text-sm font-bold sm:inline">{ready ? subtotal.toFixed(2).replace(".", ",") : "0,00"} lei</span>
              <span ref={badgeRef} className="flex h-9 min-w-9 items-center justify-center rounded-full bg-brass px-2 text-[13px] font-extrabold text-ink">
                {shownCount}
              </span>
            </button>
            <Link href="/meniu" className="btn btn-primary hidden md:inline-flex">
              Comandă online
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="meniu-mobil"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              className="flex size-12 flex-col items-center justify-center gap-[6px] rounded-full border border-cream/20 lg:hidden"
            >
              <span className={`block h-[1.5px] w-5 bg-cream transition-transform duration-500 ${open ? "translate-y-[3.75px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-5 bg-cream transition-transform duration-500 ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Meniu mobil */}
      <div
        ref={menuRef}
        id="meniu-mobil"
        className="invisible fixed inset-0 z-[45] flex flex-col justify-between gap-10 overflow-y-auto overscroll-contain bg-ink px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 lg:hidden"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <nav aria-label="Mobil" className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <div key={item.href} className="overflow-hidden">
              <Link
                data-menu-item
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline gap-4 py-1 font-display text-[44px] leading-tight text-ivory aria-[current=page]:text-brass sm:text-6xl"
              >
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-dim">0{i + 1}</span>
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <div data-menu-foot className="flex flex-col gap-5 border-t border-cream/10 pt-6">
          <Link href="/meniu" tabIndex={open ? 0 : -1} className="btn btn-primary w-full">
            Comandă online
          </Link>
          <div className="flex flex-col gap-1 text-sm text-muted">
            <a href={site.phoneHref} tabIndex={open ? 0 : -1} className="text-lg font-bold text-brass-light">
              {site.phone}
            </a>
            <span>{site.address}, {site.city}</span>
            <span>{site.hours}</span>
          </div>
        </div>
      </div>
    </>
  );
}
