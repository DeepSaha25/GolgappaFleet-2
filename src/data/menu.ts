import type { MenuItem } from "@/types";
import productClassic from "@/assets/product-classic.jpg";
import productSpicy from "@/assets/product-spicy.jpg";
import productSweet from "@/assets/product-sweet.jpg";
import productDahi from "@/assets/product-dahi.jpg";
import productSev from "@/assets/product-sev.jpg";
import productRagda from "@/assets/product-ragda.jpg";
import productCombo from "@/assets/product-combo.jpg";
import productMeetha from "@/assets/product-meetha.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Golgappa",
    slug: "classic-golgappa",
    description: "Crispy puris filled with spiced potato, chickpeas, and tangy tamarind water. The timeless street food favorite.",
    basePrice: 60,
    imageUrl: productClassic,
    isActive: true,
    tags: ["bestseller", "veg"],
    spiceLevelDefault: "medium",
    addOns: [
      { id: "a1", name: "Extra Pani", price: 10 },
      { id: "a2", name: "Extra Puris (4 pcs)", price: 20 },
      { id: "a3", name: "Masala Sprinkle", price: 5 },
    ],
  },
  {
    id: "2",
    name: "Fiery Red Puri",
    slug: "fiery-red-puri",
    description: "For the brave! Intensely spiced red chili water with a kick that builds. Not for the faint-hearted.",
    basePrice: 70,
    imageUrl: productSpicy,
    isActive: true,
    tags: ["spicy", "veg"],
    spiceLevelDefault: "extra-hot",
    addOns: [
      { id: "a4", name: "Cooling Raita", price: 15 },
      { id: "a5", name: "Extra Chili Flakes", price: 5 },
    ],
  },
  {
    id: "3",
    name: "Sweet Imli Puri",
    slug: "sweet-imli-puri",
    description: "Sweet and tangy tamarind pani with a hint of jaggery. Topped with pomegranate seeds for extra freshness.",
    basePrice: 65,
    imageUrl: productSweet,
    isActive: true,
    tags: ["sweet", "veg"],
    spiceLevelDefault: "mild",
    addOns: [
      { id: "a6", name: "Extra Pomegranate", price: 15 },
      { id: "a7", name: "Chaat Masala", price: 5 },
    ],
  },
  {
    id: "4",
    name: "Dahi Puri",
    slug: "dahi-puri",
    description: "Creamy yogurt layered over crispy puris with sweet and spicy chutneys. A cool, refreshing treat.",
    basePrice: 75,
    imageUrl: productDahi,
    isActive: true,
    tags: ["bestseller", "veg"],
    spiceLevelDefault: "mild",
    addOns: [
      { id: "a8", name: "Extra Yogurt", price: 15 },
      { id: "a9", name: "Sev Topping", price: 10 },
    ],
  },
  {
    id: "5",
    name: "Sev Puri Platter",
    slug: "sev-puri-platter",
    description: "Flat puris loaded with potatoes, onions, chutneys, and a generous helping of crispy sev. Crunchy perfection.",
    basePrice: 80,
    imageUrl: productSev,
    isActive: true,
    tags: ["veg"],
    spiceLevelDefault: "medium",
    addOns: [
      { id: "a10", name: "Extra Sev", price: 10 },
      { id: "a11", name: "Cheese Topping", price: 25 },
    ],
  },
  {
    id: "6",
    name: "Ragda Puri",
    slug: "ragda-puri",
    description: "Hearty white pea curry spooned over crispy puris. Garnished with onions, coriander, and zesty chutneys.",
    basePrice: 85,
    imageUrl: productRagda,
    isActive: true,
    tags: ["veg", "filling"],
    spiceLevelDefault: "medium",
    addOns: [
      { id: "a12", name: "Extra Ragda", price: 20 },
      { id: "a13", name: "Papad Crumble", price: 10 },
    ],
  },
  {
    id: "7",
    name: "Meetha Pani Special",
    slug: "meetha-pani-special",
    description: "A sweeter take on the classic. Flavored with fennel, mint, and a touch of rose water. Absolutely refreshing.",
    basePrice: 70,
    imageUrl: productMeetha,
    isActive: true,
    tags: ["sweet", "veg", "new"],
    spiceLevelDefault: "mild",
    addOns: [
      { id: "a14", name: "Rose Petals", price: 10 },
      { id: "a15", name: "Extra Mint Pani", price: 10 },
    ],
  },
  {
    id: "8",
    name: "Pani Puri Combo",
    slug: "pani-puri-combo",
    description: "Can't decide? Get all three waters - sweet, tangy, and spicy. The ultimate Golgappa experience.",
    basePrice: 120,
    imageUrl: productCombo,
    isActive: true,
    tags: ["bestseller", "veg", "combo"],
    spiceLevelDefault: "medium",
    addOns: [
      { id: "a16", name: "Extra Puris (8 pcs)", price: 35 },
      { id: "a17", name: "Premium Filling", price: 25 },
    ],
  },
];
