import { site } from "@/lib/site";

/** Hartă stilizată (fără iframe/cookie-uri terțe) care deschide locația reală în Google Maps. */
export function MapCard({ className = "" }: { className?: string }) {
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Deschide locația Seba în Google Maps" className={`group relative block overflow-hidden rounded-[28px] bg-ink ${className}`}>
      <svg aria-hidden viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <rect width="600" height="320" fill="#141E19" />
        <path d="M-20 220 C 120 190, 220 250, 360 200 S 560 130, 640 160" stroke="#2A3A32" strokeWidth="24" fill="none" />
        <path d="M-20 220 C 120 190, 220 250, 360 200 S 560 130, 640 160" stroke="#1E2B25" strokeWidth="2" fill="none" strokeDasharray="8 10" />
        <path d="M90 -20 L 170 340" stroke="#22302A" strokeWidth="14" />
        <path d="M420 -20 L 360 340" stroke="#22302A" strokeWidth="10" />
        <path d="M-20 80 L 640 60" stroke="#1C2822" strokeWidth="8" />
        <rect x="210" y="74" width="90" height="60" rx="6" fill="#1A2620" />
        <rect x="460" y="200" width="110" height="70" rx="6" fill="#1A2620" />
        <rect x="30" y="104" width="60" height="60" rx="6" fill="#1A2620" />
      </svg>
      <span className="absolute left-1/2 top-[46%] flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5 transition-transform duration-500 group-hover:-translate-y-[110%]">
        <span className="whitespace-nowrap rounded-full bg-brass px-4 py-2.5 text-[13px] font-extrabold text-ink">Seba · Mureșului 14</span>
        <svg width="26" height="32" viewBox="0 0 24 30" aria-hidden>
          <path d="M12 30s-10-9-10-18a10 10 0 0 1 20 0c0 9-10 18-10 18z" fill="#C9A46A" />
          <circle cx="12" cy="12" r="4" fill="#0D1411" />
        </svg>
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-cream px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] text-ink">Deschide în Maps ↗</span>
    </a>
  );
}
