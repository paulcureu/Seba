"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ImageKind } from "@/lib/menu";

export interface CartLine {
  id: string;
  slug: string;
  name: string;
  image?: string;
  imageKind: ImageKind;
  unit: number;
  qty: number;
  details: string[];
}

interface Toast {
  key: number;
  text: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (line: Omit<CartLine, "id">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  quickView: string | null;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
  toast: Toast | null;
  notify: (text: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "seba-cart-v1";

function lineId(l: Omit<CartLine, "id">) {
  return `${l.slug}|${l.details.join("|")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Coșul se păstrează în browser (localStorage) între vizite.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- citire unică din localStorage după hidratare
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* stocare indisponibilă */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* stocare indisponibilă */
    }
  }, [lines, ready]);

  const notify = useCallback((text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ key: Date.now(), text });
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const add = useCallback(
    (line: Omit<CartLine, "id">) => {
      const id = lineId(line);
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + line.qty } : l));
        return [...prev, { ...line, id }];
      });
      notify(`${line.name} a fost adăugat în coș`);
    },
    [notify],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)));
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
    return {
      lines,
      count,
      subtotal,
      ready,
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      openDrawer: () => {
        setQuickView(null);
        setDrawerOpen(true);
      },
      closeDrawer: () => setDrawerOpen(false),
      quickView,
      openQuickView: (slug: string) => {
        setDrawerOpen(false);
        setQuickView(slug);
      },
      closeQuickView: () => setQuickView(null),
      toast,
      notify,
    };
  }, [lines, ready, add, setQty, remove, clear, drawerOpen, quickView, toast, notify]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart trebuie folosit în interiorul <CartProvider>");
  return ctx;
}
