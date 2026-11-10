import type { ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import type { Dish } from "@/components/ui/dish-orbit-carousel";

// Demo menu for a sample restaurant. Swap names, prices, chefs and ratings for real ones.
export const LEGEND = { 1: "PKR 450", 2: "PKR 650", 3: "PKR 850", 4: "PKR 1,150", 5: "PKR 1,450" };

export const BELT: ConveyorDish[] = [
  { id: "salmon", name: "Salmon nigiri", price: "PKR 650", tier: 2, image: "/plates/salmon.png", description: "Fresh salmon over seasoned rice.", details: ["Raw fish"] },
  { id: "tamago", name: "Tamago", price: "PKR 450", tier: 1, image: "/plates/tamago.png", description: "Sweet layered omelette tied with nori.", details: ["2 pieces", "Contains egg", "Vegetarian"] },
  { id: "maguro", name: "Maguro nigiri", price: "PKR 850", tier: 3, image: "/plates/maguro.png", description: "Lean red tuna, brushed with a little soy.", details: ["2 pieces", "Raw fish"] },
  { id: "kappa", name: "Kappa maki", price: "PKR 450", tier: 1, image: "/plates/kappa.png", description: "Crisp cucumber rolled in rice and nori.", details: ["Vegan"] },
  { id: "california", name: "California roll", price: "PKR 850", tier: 3, image: "/plates/california.png", description: "Crab, avocado and cucumber, rolled inside out and coated in roe.", details: ["Contains fish roe"] },
  { id: "ebi", name: "Ebi nigiri", price: "PKR 650", tier: 2, image: "/plates/ebi.png", description: "Butterflied poached prawn on rice.", details: ["2 pieces", "Shellfish", "Cooked"] },
  { id: "ikura", name: "Ikura gunkan", price: "PKR 1,450", tier: 5, image: "/plates/ikura.png", description: "Salmon roe that pops, wrapped in a nori boat.", details: ["2 pieces", "Raw fish"] },
  { id: "tekka", name: "Tekka maki", price: "PKR 1,150", tier: 4, image: "/plates/tekka.png", description: "Tuna rolled thin, the classic counter snack.", details: ["6 pieces", "Raw fish"] },
  { id: "inari", name: "Inari", price: "PKR 450", tier: 1, image: "/plates/inari.png", description: "Sweet fried tofu pockets stuffed with sushi rice.", details: ["2 pieces", "Vegan"] },
];

export const SIGNATURE: Dish[] = [
  {
    title: "Tonkotsu", subtitle: "Ramen", image: "/dishes/ramen.png", eyebrow: "#1 Most loved dish",
    rating: 4.9, chef: "Chef Hana", kitchen: "Nami ramen counter", likes: 312, accent: "#f6c89f",
    description: "Creamy pork bone broth with chashu, nori, wood ear mushroom and lots of spring onion.",
    ingredients: ["Pork broth", "Wheat noodles", "Chashu", "Nori", "Wood ear", "Spring onion"],
  },
  {
    title: "Omakase", subtitle: "Platter", image: "/dishes/platter.png", eyebrow: "#2 Chef's choice",
    rating: 4.8, chef: "Chef Kenji", kitchen: "Nami sushi bar", likes: 268, accent: "#f4a6a0",
    description: "Today's best nigiri and rolls, picked by the chef and served on a lacquer tray.",
    ingredients: ["Salmon", "Tuna", "Prawn", "California roll", "Maki", "Wasabi", "Pickled ginger"],
  },
  {
    title: "Salmon", subtitle: "Poke bowl", image: "/dishes/poke.png", eyebrow: "#3 Light and fresh",
    rating: 4.7, chef: "Chef Aiko", kitchen: "Nami bowls", likes: 194, accent: "#bfe3b4",
    description: "Salmon, mango, edamame and crunchy toppings over warm sushi rice.",
    ingredients: ["Salmon", "Mango", "Edamame", "Crispy onion", "Sushi rice", "Nori"],
  },
  {
    title: "Pan fried", subtitle: "Gyoza", image: "/dishes/gyoza.png", eyebrow: "#4 Best to share",
    rating: 4.8, chef: "Chef Kenji", kitchen: "Nami hot kitchen", likes: 221, accent: "#f3d9a4",
    description: "Chicken and cabbage dumplings, crisp on the bottom, with a soy and vinegar dip.",
    ingredients: ["Chicken", "Cabbage", "Ginger", "Garlic", "Soy dip"],
  },
  {
    title: "Matcha", subtitle: "Cheesecake", image: "/dishes/matcha.png", eyebrow: "#5 Sweet finish",
    rating: 4.9, chef: "Chef Aiko", kitchen: "Nami pastry", likes: 247, accent: "#c9e4a5",
    description: "Baked matcha cheesecake with a caramelised top, served with a dessert fork.",
    ingredients: ["Cream cheese", "Matcha", "Eggs", "Sugar"],
  },
];
