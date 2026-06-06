import type { Boat } from "./types";

export const BOATS: Boat[] = [
  { id: "saxdor-400-gts-cabin", name: "Saxdor 400 GTS Cabin", maxCapacity: 11 },
  { id: "saver-330wa", name: "Saver 330 WA", maxCapacity: 11 },
  { id: "saver-870wa", name: "Saver 870 WA", maxCapacity: 9 },
  { id: "saver-750wa", name: "Saver 750 WA", maxCapacity: 8 },
];

export function getBoatById(id: string): Boat | undefined {
  return BOATS.find((boat) => boat.id === id);
}
