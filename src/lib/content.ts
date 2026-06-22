/**
 * Single source of truth for the Noir template's copy and imagery.
 * Real photography now lives in /public/photos and is referenced by path.
 * Swap a photo by dropping a new file in and updating the path here.
 */

export const img = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

export const site = {
  brand: "MERIDIAN",
  tagline: "Supper Club & Cocktail Bar",
  established: "Est. 1936",

  nav: [
    { label: "Home", href: "#top" },
    { label: "Food & Drink", href: "#menu" },
    { label: "About", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reservations", href: "#reserve" },
  ],

  hero: {
    eyebrow: "Est. 1936  ·  Midtown, New York",
    title: "Where Midnight Keeps Good Company",
    sub: "A landmark supper club and cocktail bar in the heart of Midtown - low light, long pours, and live jazz since 1936.",
    image: "/photos/pass.jpg",
  },

  marquee: [
    "Born in 1936",
    "Cocktails after dark",
    "Midtown, New York",
    "Live jazz nightly",
    "A New York landmark",
  ],

  story: {
    eyebrow: "Our Story",
    heading: "Born in 1936",
    image: "/photos/atrium.jpg",
    body: [
      "Meridian opened its doors the winter Prohibition was still a fresh memory, tucked behind an unmarked bronze door on a side street most people walked right past.",
      "Nine decades later the room has barely changed - the same brass rail, the same low amber light, the same idea that a good night should feel a little bit secret.",
    ],
    stats: [
      { value: "1936", label: "First pour" },
      { value: "90+", label: "Years on the block" },
      { value: "7", label: "Nights of live jazz" },
    ],
  },

  menu: {
    eyebrow: "Food & Drink",
    heading: "An Evening, Composed",
    tabs: [
      {
        id: "dinner",
        label: "Dinner",
        items: [
          { name: "Oysters on the Half Shell", desc: "Mignonette, lemon, sea salt", price: "24" },
          { name: "Steak Tartare", desc: "Hand cut, quail egg, grilled sourdough", price: "26" },
          { name: "Dry-Aged Ribeye", desc: "Bone marrow butter, pommes frites", price: "62" },
          { name: "Roasted Branzino", desc: "Fennel, blood orange, salsa verde", price: "44" },
          { name: "Truffle Tagliatelle", desc: "Hand rolled, parmesan, winter truffle", price: "38" },
        ],
      },
      {
        id: "cocktails",
        label: "Cocktails",
        items: [
          { name: "The Meridian", desc: "Rye, amaro, smoked bitters, orange oil", price: "21" },
          { name: "Midnight Martini", desc: "Gin or vodka, dry vermouth, twist", price: "20" },
          { name: "Bronze Door", desc: "Mezcal, Aperol, grapefruit, agave", price: "19" },
          { name: "1936 Old Fashioned", desc: "Bonded bourbon, demerara, Angostura", price: "22" },
          { name: "Velvet Negroni", desc: "Gin, Campari, barrel-aged vermouth", price: "20" },
        ],
      },
      {
        id: "wine",
        label: "Wine & Spirits",
        items: [
          { name: "Champagne, by the glass", desc: "Grower brut, Côte des Blancs", price: "26" },
          { name: "Burgundy, Pinot Noir", desc: "Côte de Beaune, 2019", price: "34" },
          { name: "Barolo", desc: "Nebbiolo, Piedmont, 2017", price: "42" },
          { name: "Reserve Whisky Flight", desc: "Three pours, chosen by the bar", price: "48" },
          { name: "Vintage Cognac", desc: "Grande Champagne, XO", price: "55" },
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "From the Pass",
    slides: [
      { src: "/photos/plate.jpg", name: "Cured Loch Duart Salmon", desc: "Sourdough, watercress, aged balsamic" },
      { src: "/photos/spread.jpg", name: "The Table d'Hote", desc: "A spread laid for the whole party" },
      { src: "/photos/burger.jpg", name: "The Meridian Burger", desc: "Dry-aged beef, raclette, shoestring onions" },
      { src: "/photos/toast.jpg", name: "Soft Egg & Avocado", desc: "Cultured butter, seeded rye, espelette" },
    ],
  },

  gallery: {
    eyebrow: "The Room",
    heading: "Step Inside",
    images: [
      { src: "/photos/pass.jpg", caption: "The pass" },
      { src: "/photos/terrace.jpg", caption: "The terrace, after dark" },
      { src: "/photos/atrium.jpg", caption: "The main room" },
      { src: "/photos/plate.jpg", caption: "Service" },
      { src: "/photos/burger.jpg", caption: "The grill" },
      { src: "/photos/toast.jpg", caption: "Morning service" },
    ],
  },

  reserve: {
    eyebrow: "Reservations",
    heading: "Hold a Table",
    body: "Dinner is served nightly from five. The bar pours until two. For parties of six or more, or to book the private room, drop us a line.",
    hours: [
      { day: "Mon - Thu", time: "5:00pm - 1:00am" },
      { day: "Fri - Sat", time: "5:00pm - 2:00am" },
      { day: "Sunday", time: "5:00pm - 12:00am" },
    ],
    address: ["155 East 56th Street", "New York, NY 10022"],
    phone: "(212) 555-1936",
    email: "tables@meridian.nyc",
  },

  footer: {
    note: "A New York landmark since 1936.",
    columns: [
      {
        title: "Visit",
        links: [
          { label: "155 East 56th Street", href: "#reserve" },
          { label: "New York, NY 10022", href: "#reserve" },
          { label: "(212) 555-1936", href: "#reserve" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Food & Drink", href: "#menu" },
          { label: "Private Dining", href: "#reserve" },
          { label: "Gift Cards", href: "#reserve" },
        ],
      },
      {
        title: "Follow",
        links: [
          { label: "Instagram", href: "#" },
          { label: "Newsletter", href: "#reserve" },
          { label: "Careers", href: "#" },
        ],
      },
    ],
  },
} as const;

export type Site = typeof site;
