import Image from "next/image";
import type { CartLine } from "./CartProvider";
import { PizzaIcon } from "@/components/ui/icons";

export function CartThumb({ line, size = "md" }: { line: CartLine; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-[92px]" : "size-[76px]";
  const bottle = line.imageKind === "bottle";
  return (
    <span className={`${box} relative block shrink-0 overflow-hidden rounded-2xl ${bottle ? "bg-[#f4efe6]" : "bg-panel-2"}`}>
      {line.image ? (
        <Image
          src={line.image}
          alt=""
          fill
          sizes="96px"
          className={bottle ? "object-contain p-1.5 mix-blend-multiply" : "scale-125 object-cover"}
        />
      ) : (
        <span className="flex size-full items-center justify-center text-brass">
          <PizzaIcon className="size-8" />
        </span>
      )}
    </span>
  );
}
