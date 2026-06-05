import type { Boat } from "./types";

export const BOATS: Boat[] = [
  { id: "catamaran-elite-i", name: "Catamarán Elite I", maxCapacity: 12 },
  { id: "velero-elite-iii", name: "Velero Elite III", maxCapacity: 10 },
  { id: "lancha-elite-ii", name: "Lancha Elite II", maxCapacity: 6 },
];

export function getBoatById(id: string): Boat | undefined {
  return BOATS.find((boat) => boat.id === id);
}
