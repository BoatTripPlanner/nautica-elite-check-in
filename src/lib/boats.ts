import type { Boat } from "./types";

export const BOATS: Boat[] = [
  { id: "saxdor-400-gts-cabin", name: "Saxdor 400 GTS Cabin", maxCapacity: 12 },
  { id: "saver-750", name: "Saver 750", maxCapacity: 10 },
  { id: "saver-330wa", name: "Saver 330WA", maxCapacity: 6 },
];

export function getBoatById(id: string): Boat | undefined {
  return BOATS.find((boat) => boat.id === id);
}
