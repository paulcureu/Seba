// Meniul Pizza Seba — date preluate de pe pizzaseba.ro (ingrediente, gramaje, prețuri).
// Ca să schimbi un preț sau un ingredient, modifică doar acest fișier.

export type Category =
  | "pizza"
  | "paste"
  | "salate"
  | "calzone"
  | "pachete"
  | "bauturi"
  | "sosuri";

export type Tag = "specialitate" | "vegetariana" | "picanta" | "din-mare";

export type ImageKind = "photo" | "bottle" | "pack" | "none";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  /** Ingrediente / descriere scurtă, exact ca pe site-ul actual */
  description: string;
  /** Preț de bază (la pizza: mărimea mică) */
  price: number;
  /** Doar la pizza: prețul pentru 900 g */
  priceLarge?: number;
  /** Doar la pizza: gramajul mărimii mici (500 sau 550) */
  smallWeight?: number;
  weight: string;
  image?: string;
  imageKind: ImageKind;
  tags: Tag[];
  /** Pachete: preț vechi și conținut */
  oldPrice?: number;
  packCount?: number;
  packExtras?: string;
}

export const categories: { id: Category; label: string; kicker: string; title: string }[] = [
  { id: "pizza", label: "Pizza la cuptor", kicker: "Pizza la cuptor", title: "Toate pizzele noastre" },
  { id: "paste", label: "Paste", kicker: "Trattoria", title: "Paste & paste fresca" },
  { id: "salate", label: "Salate", kicker: "Proaspăt", title: "Salate" },
  { id: "calzone", label: "Calzone", kicker: "Din cuptor", title: "Calzone" },
  { id: "pachete", label: "Pachete", kicker: "Economisești", title: "Pachete promoționale" },
  { id: "bauturi", label: "Băuturi", kicker: "Răcoritoare & bere", title: "Băuturi" },
  { id: "sosuri", label: "Sosuri", kicker: "Pentru margini", title: "Sosuri" },
];

export const pizzaFilters: { id: "toate" | "clasice" | Tag; label: string }[] = [
  { id: "toate", label: "Toate" },
  { id: "specialitate", label: "Specialități Seba" },
  { id: "clasice", label: "Clasice" },
  { id: "vegetariana", label: "Vegetariene" },
  { id: "picanta", label: "Picante" },
  { id: "din-mare", label: "Din mare" },
];

export const tagLabels: Record<Tag, string> = {
  specialitate: "Specialitate",
  vegetariana: "Vegetariană",
  picanta: "Picantă",
  "din-mare": "Din mare",
};

const T = {
  s: "specialitate",
  v: "vegetariana",
  p: "picanta",
  m: "din-mare",
} as const;

type PizzaRow = [slug: string, name: string, desc: string, min: number, max: number, small: 500 | 550, photo: boolean, tags: string];

const pizzaRows: PizzaRow[] = [
  ["della-casa", "Della Casa", "sos de roșii, mozzarella fior di latte, emmentaler, gorgonzola, parmigiano reggiano, hribi", 56, 82, 550, true, "sv"],
  ["fume", "Fumé", "sos de roșii, mozzarella fior di latte, cașcaval afumat, speck", 56, 80, 550, true, "s"],
  ["margherita-seba", "Margherita Seba", "sos de roșii, mozzarella fior di latte, busuioc, parmigiano reggiano", 48, 80, 500, true, "sv"],
  ["orto-mare", "Orto Mare", "mozzarella fior di latte, creveți, dovlecel", 56, 82, 550, true, "sm"],
  ["crudaiola", "Crudaiola", "mozzarella DOP, roșii, rucola, jamón serrano", 54, 82, 550, true, "s"],
  ["fructe-de-mare", "Fructe de Mare", "sos de roșii, mozzarella fior di latte, scoici, creveți, calamari", 58, 84, 550, true, "sm"],
  ["lardo-radicchio", "Lardo Radicchio", "sos de roșii, mozzarella fior di latte, lardo, radicchio", 54, 80, 550, true, "s"],
  ["monte-bianco", "Monte Bianco", "mozzarella fior di latte, smântână dulce, porumb, jamón serrano", 54, 82, 550, true, "s"],
  ["valtellina", "Valtellina", "sos de roșii, mozzarella fior di latte, bresaola, parmigiano, rucola", 56, 84, 550, true, "s"],
  ["primavera", "Primavera", "sos de roșii, mozzarella fior di latte, roșii cherry, radicchio, rucola, parmigiano reggiano", 54, 80, 550, true, "sv"],
  ["seba-diamond", "Seba Diamond", "mozzarella fior di latte, smântână dulce, somon, ceapă, rucola", 58, 84, 550, true, "sm"],
  ["carbonara", "Carbonara", "mozzarella fior di latte, ou, parmigiano reggiano, bacon", 52, 80, 550, false, "s"],
  ["crudo-rucola", "Crudo Rucola", "sos de roșii, mozzarella fior di latte, jamón serrano, parmezan", 58, 84, 550, false, "s"],
  ["quattro-formaggi-special", "Quattro Formaggi Special", "sos de roșii, mozzarella fior di latte, emmentaler, gorgonzola, parmigiano reggiano, salam chorizo", 56, 82, 550, false, "s"],
  ["sfiziosa", "Sfiziosa", "mozzarella fior di latte, pere, nuci, speck", 54, 82, 550, false, "s"],
  ["speck-e-ricotta", "Speck e Ricotta", "sos de roșii, mozzarella fior di latte, ricotta, speck", 54, 82, 550, false, "s"],
  ["piedone", "Piedone", "sos de roșii, mozzarella, șuncă, salam chorizo, ardei, porumb", 48, 80, 500, true, ""],
  ["canibale", "Canibale", "sos de roșii, mozzarella, șuncă, salam, cabanos", 44, 76, 500, true, ""],
  ["capriciosa", "Capriciosa", "sos de roșii, mozzarella, șuncă, ciuperci, măsline, porumb", 46, 78, 500, true, ""],
  ["crudo-gorgonzola", "Crudo Gorgonzola", "sos de roșii, mozzarella, gorgonzola, ciuperci, prosciutto crudo", 48, 80, 500, true, ""],
  ["diavola", "Diavola", "sos de roșii, mozzarella, salam chorizo, peperoncino", 46, 76, 500, true, "p"],
  ["napoletana", "Napoletana", "sos de roșii, mozzarella, anchoa, capere", 48, 76, 500, true, "m"],
  ["funghi-porcini", "Funghi Porcini", "sos de roșii, mozzarella, hribi, roșii", 48, 78, 500, true, "v"],
  ["hawaii", "Hawaii", "sos de roșii, mozzarella, șuncă, ananas", 44, 74, 500, true, ""],
  ["cotto-e-mais", "Cotto e Mais", "sos de roșii, mozzarella fior di latte, prosciutto cotto, porumb", 44, 72, 500, true, ""],
  ["prosciutto-funghi", "Prosciutto Funghi", "sos de roșii, mozzarella, șuncă, ciuperci", 46, 72, 500, true, ""],
  ["maialona", "Maialona", "sos de roșii, mozzarella, șuncă, salam, bacon", 46, 78, 500, true, ""],
  ["super-salamino", "Super Salamino", "sos de roșii, mozzarella fior di latte, chorizo, gorgonzola", 48, 78, 500, true, "p"],
  ["picante", "Picante", "sos de roșii, mozzarella, salam chorizo, ceapă, parmezan", 48, 76, 500, true, "p"],
  ["tonno-e-cipolla", "Tonno e Cipolla", "sos de roșii, mozzarella, ton, ceapă", 46, 76, 500, true, "m"],
  ["melanzane", "Melanzane", "sos de roșii, mozzarella, vinete, parmezan", 46, 76, 500, true, "v"],
  ["mille-gusti", "Mille Gusti", "sos de roșii, mozzarella, șuncă, salam chorizo, ciuperci, anghinare, măsline", 48, 80, 500, true, ""],
  ["margherita", "Margherita", "sos de roșii, mozzarella, busuioc", 40, 70, 500, true, "v"],
  ["rustica", "Rustica", "sos de roșii, mozzarella, salam, cabanos, ceapă, măsline", 44, 74, 500, true, ""],
  ["super-mario", "Super Mario", "sos de roșii, mozzarella fior di latte, spanac, roșii cherry, usturoi", 46, 72, 500, true, "v"],
  ["salami", "Salami", "sos de roșii, mozzarella, salam, ceapă, gorgonzola", 44, 74, 500, true, ""],
  ["quattro-formaggi", "Quattro Formaggi", "sos de roșii, mozzarella, gorgonzola, parmezan, emmentaler", 48, 80, 500, true, "v"],
  ["super-funghi", "Super Funghi", "sos de roșii, mozzarella fior di latte, hribi, gălbiori, champignon, pătrunjel, usturoi", 48, 78, 500, true, "v"],
  ["pollo-e-mais", "Pollo e Mais", "sos de roșii, mozzarella fior di latte, piept de pui, porumb", 44, 72, 500, true, ""],
  ["tremozine", "Tremozine", "sos de roșii, mozzarella, salam chorizo, șuncă, ciuperci, capere, oregano", 46, 78, 500, true, ""],
  ["quattro-stagioni", "Quattro Stagioni", "sos de roșii, mozzarella, șuncă, ciuperci, măsline, salam", 46, 78, 500, true, ""],
  ["contadina", "Contadina", "sos de roșii, mozzarella fior di latte, chorizo, anghinare, rucola", 48, 78, 500, true, ""],
  ["vegetariana", "Vegetariana", "sos de roșii, mozzarella, legume la cuptor", 44, 74, 500, true, "v"],
  ["peperoni", "Peperoni", "sos de roșii, mozzarella fior di latte, salam", 42, 76, 500, true, ""],
];

const pizza: Product[] = pizzaRows.map(([slug, name, description, min, max, small, photo, tags]) => ({
  slug,
  name,
  category: "pizza",
  description,
  price: min,
  priceLarge: max,
  smallWeight: small,
  weight: `${small} / 900 g`,
  image: photo ? `/images/menu/${slug}.jpg` : undefined,
  imageKind: photo ? "photo" : "none",
  tags: tags.split("").map((t) => T[t as keyof typeof T]),
}));

type SimpleRow = [slug: string, name: string, desc: string, weight: string, price: number, image?: string];

function simple(category: Category, rows: SimpleRow[], kind: ImageKind = "photo"): Product[] {
  return rows.map(([slug, name, description, weight, price, image]) => ({
    slug,
    name,
    category,
    description,
    weight,
    price,
    image,
    imageKind: image ? kind : "none",
    tags: [],
  }));
}

const paste = simple("paste", [
  ["tagliatelle-creveti-zucchini", "Tagliatelle cu creveți și zucchini", "tagliatelle, creveți, zucchini, unt, usturoi, parmezan", "350 g", 52, "/images/menu/tagliatelle-creveti-zucchini.jpg"],
  ["tagliatelle-funghi-porcini", "Tagliatelle funghi porcini", "tagliatelle, hribi, ulei de măsline, parmezan, usturoi", "350 g", 52],
  ["orecchiette-alla-pescatora", "Orecchiette alla pescatora", "orecchiette, fructe de mare, sos de roșii, condiment, usturoi", "350 g", 52],
  ["lasagne", "Lasagne", "sos ragù (carne tocată vită-porc, sos de roșii, ceapă, țelină), parmezan, ulei de măsline, foi de lasagna", "350 g", 48],
  ["speck-si-hribi", "Speck și hribi", "penne, cașcaval afumat, smântână lichidă, speck, hribi", "350 g", 48, "/images/menu/speck-si-hribi.jpg"],
  ["penne-la-cuptor", "Penne la cuptor", "penne, bacon, ciuperci, emmentaler, sos de salvie, smântână lichidă", "350 g", 46, "/images/menu/penne-la-cuptor.jpg"],
  ["melanzane-alla-parmigiana", "Melanzane alla parmigiana", "vinete la grătar, mozzarella, parmezan, sos pomodoro", "300 g", 46, "/images/menu/melanzane-alla-parmigiana.jpg"],
  ["spaghetti-alla-carbonara", "Spaghetti alla carbonara", "spaghetti, parmezan, pecorino, pancetta, gălbenuș de ou, ulei de măsline", "350 g", 44],
  ["penne-chicken-alfredo", "Penne Chicken Alfredo", "penne, parmezan, smântână lichidă, piept de pui, usturoi, unt, piper", "350 g", 44],
  ["spaghetti-al-ragu", "Spaghetti al ragù", "spaghetti, ragù (carne tocată vită-porc, sos de roșii, morcovi, ceapă, țelină), parmezan, ulei de măsline", "350 g", 44],
]);

const salate = simple("salate", [
  ["insalata-camembert-smochine", "Insalata cu Camembert și smochine", "baby spanac, camembert, smochine, muguri de pin, emulsie de rodie", "350 g", 44, "/images/menu/insalata-camembert-smochine.jpg"],
  ["insalata-pollo-rucola", "Insalata pollo rucola", "mix salată, piept de pui, rucola, castraveți, roșii cherry, cașcaval afumat, sos gorgonzola", "350 g", 42, "/images/menu/insalata-pollo-rucola.jpg"],
  ["insalata-capra-avocado", "Insalata cu brânză de capră și avocado", "brânză de capră, avocado, baby spanac, valeriană, roșii cherry, rodie, vinegretă soia", "350 g", 46],
]);

const calzone = simple("calzone", [
  ["calzone-seba", "Calzone Seba", "sos de roșii, mozzarella fior di latte, sos pesto", "450 g", 42, "/images/menu/calzone-seba.jpg"],
  ["calzone-gourmet", "Calzone Gourmet", "sos de roșii, mozzarella fior di latte, sos bolognese, sos pesto calabrese", "450 g", 42],
]);

const pachete: Product[] = [
  { n: 2, extras: "1 suc + 1 sos", price: 108, old: 126, image: "/images/pachet-doua.jpg" },
  { n: 4, extras: "2 sucuri + 2 sosuri", price: 215, old: 252, image: "/images/pachete-sase.jpg" },
  { n: 6, extras: "3 sucuri + 3 sosuri", price: 322, old: 378, image: "/images/pachete-sase.jpg" },
  { n: 10, extras: "5 sucuri + 5 sosuri", price: 530, old: 618, image: "/images/pachete-toate.jpg" },
].map((k) => ({
  slug: `pachet-${k.n}-pizza`,
  name: `Pachet ${k.n} pizza`,
  category: "pachete" as const,
  description: `${k.n} pizza la alegere + ${k.extras}, la preț redus față de ${k.old} lei.`,
  weight: `${k.n} × pizza`,
  price: k.price,
  oldPrice: k.old,
  packCount: k.n,
  packExtras: k.extras,
  image: k.image,
  imageKind: "pack" as const,
  tags: [],
}));

const bauturi = simple(
  "bauturi",
  [
    ["pepsi-250", "Pepsi", "250 ml", "250 ml", 12, "/images/drinks/pepsi.jpg"],
    ["pepsi-max-330", "Pepsi Max", "330 ml", "330 ml", 14, "/images/drinks/pepsi-max.jpg"],
    ["7up-250", "7up", "250 ml", "250 ml", 12, "/images/drinks/7up.jpg"],
    ["mirinda-250", "Mirinda", "250 ml", "250 ml", 14, "/images/drinks/mirinda.jpg"],
    ["evervess-250", "Evervess", "250 ml", "250 ml", 12, "/images/drinks/evervess.jpg"],
    ["lipton-500", "Lipton Ice Tea", "500 ml", "500 ml", 16, "/images/drinks/lipton.jpg"],
    ["prigat-persica-250", "Prigat persică", "250 ml", "250 ml", 14, "/images/drinks/prigat-persica.jpg"],
    ["prigat-portocala-250", "Prigat portocală", "250 ml", "250 ml", 14, "/images/drinks/prigat-portocala.jpg"],
    ["prigat-capsuni-banane-250", "Prigat căpșuni și banane", "250 ml", "250 ml", 16],
    ["apa-500", "Apă minerală plată / carbogazoasă", "500 ml", "500 ml", 10],
    ["apa-750", "Apă minerală plată / carbogazoasă", "750 ml", "750 ml", 18],
    ["carlsberg-pils", "Carlsberg Pils", "5,2% vol. alcool · 330 ml", "330 ml", 16, "/images/drinks/carlsberg.jpg"],
    ["carlsberg-na", "Carlsberg Non Alcoolic", "0% alcool · 330 ml", "330 ml", 16, "/images/drinks/carlsberg-na.jpg"],
    ["tuborg-pils", "Tuborg Pils", "5% vol. alcool · 330 ml", "330 ml", 14, "/images/drinks/tuborg.jpg"],
    ["bucur-pils", "Bucur Pils", "5% vol. alcool · 350 ml", "350 ml", 16, "/images/drinks/bucur.jpg"],
    ["angelo-poretti", "Angelo Poretti 4 Pils", "5% vol. alcool · 330 ml", "330 ml", 16],
    ["paulaner", "Paulaner", "5,5% vol. alcool · 500 ml", "500 ml", 22, "/images/drinks/paulaner.jpg"],
    ["paulaner-weissbier", "Paulaner Weissbier", "5,5% vol. alcool · 500 ml", "500 ml", 22],
    ["weihenstephan", "Weihenstephan", "5,4% vol. alcool · 500 ml", "500 ml", 22, "/images/drinks/weihenstephan.jpg"],
  ],
  "bottle",
);

const sosuri = simple("sosuri", [
  ["sos-usturoi-smantana", "Sos usturoi cu smântână", "sos cremos de usturoi cu smântână", "porție", 8],
  ["sos-picant", "Sos picant", "sos picant pentru margini", "porție", 6],
  ["sos-extra-hot", "Sos extra hot", "pentru cei care o vor foarte iute", "porție", 10],
  ["sos-gorgonzola", "Sos gorgonzola", "sos cremos de gorgonzola", "porție", 12],
  ["ulei-picant", "Ulei picant", "ulei cu ardei iute", "porție", 6],
]);

export const productsByCategory: Record<Category, Product[]> = {
  pizza,
  paste,
  salate,
  calzone,
  pachete,
  bauturi,
  sosuri,
};

export const allProducts: Product[] = Object.values(productsByCategory).flat();

export function getProduct(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export type AddOn = { id: string; label: string; price: number; note?: string };

export const extras: AddOn[] = [
  ["Ardei", 6], ["Ardei iute", 6], ["Ceapă", 6], ["Ciuperci", 6], ["Măsline", 8], ["Porumb", 6],
  ["Dovlecel", 6], ["Usturoi", 6], ["Vinete", 8], ["Mozzarella", 10], ["Emmentaler", 10],
  ["Gorgonzola", 10], ["Parmigiano Reggiano", 10], ["Hribi", 10], ["Cabanos", 8],
  ["Prosciutto Cotto", 8], ["Chorizo", 10], ["Bacon", 10], ["Jamón Serrano", 10], ["Speck", 10],
].map(([label, price]) => ({ id: `x-${label}`, label: label as string, price: price as number }));

export const sauces: AddOn[] = [
  ["Sos dulce", 6], ["Sos picant", 6], ["Ulei picant", 8], ["Sos usturoi cu smântână", 8],
  ["Sos extra hot", 10], ["Sos gorgonzola", 12],
].map(([label, price]) => ({ id: `s-${label}`, label: label as string, price: price as number }));

export const desserts: AddOn[] = [
  { id: "d-tarta", label: "Tartă de mere cu sos caramel", price: 24, note: "160 g" },
  { id: "d-tiramisu", label: "Tiramisu clasic", price: 26, note: "160 g" },
  { id: "d-tiramisu-fistic", label: "Tiramisu cu fistic", price: 26, note: "160 g" },
  { id: "d-panna-cotta", label: "Panna Cotta", price: 20, note: "120 g" },
];

export const signatureSlugs = ["della-casa", "valtellina", "fructe-de-mare", "crudaiola", "lardo-radicchio", "primavera", "seba-diamond", "diavola"];

export function formatPrice(n: number): string {
  return `${n.toFixed(2).replace(".", ",")} lei`;
}

export function shortPrice(n: number): string {
  return Number.isInteger(n) ? `${n} lei` : formatPrice(n);
}

export function priceLabel(p: Product): string {
  return p.category === "pizza" ? `de la ${p.price} lei` : shortPrice(p.price);
}

/** Împarte descrierea în ingrediente, fără să rupă parantezele */
export function ingredientsOf(p: Product): string[] {
  if (p.category === "bauturi" || p.category === "pachete") return [p.description];
  return p.description.split(/,\s*(?![^()]*\))/).map((s) => s.trim()).filter(Boolean);
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function hasAddOns(p: Product): boolean {
  return p.category === "pizza" || p.category === "calzone" || p.category === "paste";
}
