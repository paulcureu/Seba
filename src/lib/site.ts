export const site = {
  name: "Seba — Pizzeria e Trattoria",
  shortName: "Pizza Seba",
  url: "https://pizzaseba.ro",
  description:
    "Pizzeria e Trattoria Seba din Cluj-Napoca: pizza la cuptor, paste și salate cu ingrediente italienești. Livrare 6,99 lei sau rezervă o masă pe Str. Mureșului nr. 14.",
  phone: "+40 744 320 701",
  phoneHref: "tel:+40744320701",
  whatsappHref: "https://wa.me/40744320701",
  email: "contact@pizzaseba.ro",
  address: "Str. Mureșului nr. 14",
  city: "Cluj-Napoca",
  mapsUrl: "https://maps.app.goo.gl/6VGy9Av42A3gFFzN9",
  hours: "Luni – Sâmbătă · 10:00 – 21:00",
  hoursNote: "Duminică nu se livrează comenzi.",
  deliveryFee: 6.99,
  facebook: "https://www.facebook.com/pizzaclujseba/",
  instagram: "https://www.instagram.com/pizzaseba/",
  company: "SAR HAUS SRL",
  cui: "39205265",
  regCom: "J2018001469128",
  anpcSal: "https://reclamatiisal.anpc.ro/",
  sol: "https://ec.europa.eu/consumers/odr",
} as const;

export const nav = [
  { href: "/", label: "Acasă" },
  { href: "/meniu", label: "Meniu" },
  { href: "/despre", label: "Despre noi" },
  { href: "/rezervari", label: "Rezervări" },
  { href: "/contact", label: "Contact" },
] as const;

export const legal = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-livrare", label: "Politica de livrare" },
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/politica-de-utilizare-cookies", label: "Politica cookies" },
] as const;
