export type DestinationRegion =
  | "Europa"
  | "Nord America"
  | "Sud America"
  | "Asia"
  | "Oceania";

export type DestinationGuideSource = {
  title: string;
  url: string;
  supports: string;
};

export type DestinationGuideData = {
  id: string;
  country: string;
  city: string;
  region: DestinationRegion;
  verifiedAt: string;
  italianCitizenDocuments: string;
  entryRules: string;
  travelAdvice: string[];
  officialSources: DestinationGuideSource[];
  caveat: string;
  confidence: "alta" | "media" | "bassa";
};
