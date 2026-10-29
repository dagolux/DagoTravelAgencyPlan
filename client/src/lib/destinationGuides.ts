import { europeanDestinationGuides } from "./destinationGuides.europe";
import { globalDestinationGuides } from "./destinationGuides.global";
import type { DestinationRegion } from "./destinationGuideTypes";

export type {
  DestinationGuideData,
  DestinationGuideSource,
  DestinationRegion,
} from "./destinationGuideTypes";

export const destinationGuideRegions: DestinationRegion[] = [
  "Europa",
  "Nord America",
  "Sud America",
  "Asia",
  "Oceania",
];

export const destinationGuides = [
  ...europeanDestinationGuides,
  ...globalDestinationGuides,
];
