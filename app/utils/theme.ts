import { PokemonType } from "@prisma/client";

export const getPokemonCardTheme = (type: PokemonType) => {
  return {
    accentCol: getAccent(type),
    bgCol: getBackground(type),
    borderCol: getBorder(type),
    textCol: getText(type),
  };
};

const getText = (type: PokemonType) => {
  switch (type) {
    case "FIGHTING": return "text-white";
    case "DRAGON": return "text-white";
    case "DARK": return "text-white";
    default: return "text-black";
  }
};

const getBackground = (type: PokemonType) => {
  switch (type) {
    case "NORMAL": return "bg-gray-200";
    case "FIRE": return "bg-red-500";
    case "WATER": return "bg-blue-500";
    case "ELECTRIC": return "bg-yellow-400";
    case "GRASS": return "bg-green-500";
    case "ICE": return "bg-teal-200";
    case "FIGHTING": return "bg-red-700";
    case "POISON": return "bg-purple-500";
    case "GROUND": return "bg-yellow-600";
    case "FLYING": return "bg-blue-300";
    case "PSYCHIC": return "bg-pink-500";
    case "BUG": return "bg-green-400";
    case "ROCK": return "bg-gray-600";
    case "GHOST": return "bg-purple-700";
    case "DRAGON": return "bg-indigo-600";
    case "DARK": return "bg-gray-800";
    case "STEEL": return "bg-gray-400";
    case "FAIRY": return "bg-rose-300";
    default: return "bg-gray-200";
  }
};

const getAccent = (type: PokemonType) => {
  switch (type) {
    case "NORMAL": return "bg-gray-400";
    case "FIRE": return "bg-red-700";
    case "WATER": return "bg-blue-600";
    case "ELECTRIC": return "bg-yellow-600";
    case "GRASS": return "bg-green-700";
    case "ICE": return "bg-teal-500"; // Slightly darker teal
    case "FIGHTING": return "bg-red-800";
    case "POISON": return "bg-purple-700";
    case "GROUND": return "bg-yellow-800";
    case "FLYING": return "bg-blue-600"; // Slightly darker blue
    case "PSYCHIC": return "bg-pink-600";
    case "BUG": return "bg-green-600";
    case "ROCK": return "bg-gray-700";
    case "GHOST": return "bg-purple-800";
    case "DRAGON": return "bg-indigo-700";
    case "DARK": return "bg-white";
    case "STEEL": return "bg-gray-600"; // Slightly darker gray
    case "FAIRY": return "bg-rose-400";
    default: return "bg-gray-300";
  }
};

const getBorder = (type: PokemonType) => {
  switch (type) {
    case "NORMAL": return "border-gray-300";
    case "FIRE": return "border-red-700";
    case "WATER": return "border-blue-700";
    case "ELECTRIC": return "border-yellow-600";
    case "GRASS": return "border-green-700";
    case "ICE": return "border-teal-400"; // Slightly darker teal
    case "FIGHTING": return "border-red-800";
    case "POISON": return "border-purple-700";
    case "GROUND": return "border-yellow-800";
    case "FLYING": return "border-blue-500"; // Slightly darker blue
    case "PSYCHIC": return "border-pink-600";
    case "BUG": return "border-green-600";
    case "ROCK": return "border-gray-700";
    case "GHOST": return "border-purple-800";
    case "DRAGON": return "border-indigo-700";
    case "DARK": return "border-gray-900";
    case "STEEL": return "border-gray-500"; // Slightly darker gray
    case "FAIRY": return "border-rose-400";
    default: return "border-gray-300";
  }
};
