import Image from "next/image";
import type { Product } from "@/lib/menu";
import { BottleIcon, PizzaIcon } from "@/components/ui/icons";

/** Imaginea unui produs: foto, sticlă (fundal crem), pachet sau placeholder elegant. */
export function ProductVisual({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  zoom = 1.1,
  large = false,
  preload = false,
  eager = false,
}: {
  product: Product;
  sizes?: string;
  zoom?: number;
  large?: boolean;
  preload?: boolean;
  /** Încarcă imediat (fără preload), pentru primele carduri din pagină */
  eager?: boolean;
}) {
  if (product.imageKind === "photo" && product.image) {
    return (
      <div className="relative size-full overflow-hidden bg-[#2a2a2c]">
        <Image
          src={product.image}
          alt={`${product.category === "pizza" ? "Pizza " : ""}${product.name}`}
          fill
          sizes={sizes}
          preload={preload}
          loading={eager && !preload ? "eager" : undefined}
          className="object-cover"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    );
  }
  if (product.imageKind === "bottle" && product.image) {
    return (
      <div className="relative flex size-full items-center justify-center overflow-hidden bg-[#f4efe6]">
        <Image src={product.image} alt={product.name} fill sizes={sizes} className="object-contain p-[6%] mix-blend-multiply" />
      </div>
    );
  }
  if (product.imageKind === "pack") {
    return (
      <div className="relative size-full overflow-hidden bg-brass">
        {product.image && (
          <Image src={product.image} alt="" fill sizes={sizes} className="object-cover opacity-55" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-3 text-ivory sm:p-5">
          <span className={`font-display leading-[0.8] ${large ? "text-[7rem] sm:text-[9rem]" : "text-6xl sm:text-8xl"}`}>{product.packCount}</span>
          <span className={`flex-col pb-2 text-xs font-extrabold uppercase tracking-[0.16em] ${large ? "flex" : "hidden sm:flex"}`}>
            Pizza
            <span className="text-[13px] font-semibold normal-case tracking-normal text-brass-light">+ {product.packExtras}</span>
          </span>
        </div>
      </div>
    );
  }
  const Icon = product.category === "bauturi" ? BottleIcon : PizzaIcon;
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-panel-2 p-3 text-center sm:gap-3 sm:p-5">
      <Icon className={large ? "size-16 text-brass" : "size-8 text-brass sm:size-10"} />
      <span className={`font-display italic leading-tight text-brass-light ${large ? "text-4xl" : "hidden text-[26px] sm:block"}`}>{product.name}</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-dim sm:text-[10px] sm:tracking-[0.2em]">Foto în curând</span>
    </div>
  );
}
