import { describe, expect, it } from "vitest";
import { destinationGuides } from "../client/src/lib/destinationGuides";
import { europeanDestinationGuides } from "../client/src/lib/destinationGuides.europe";
import { globalDestinationGuides } from "../client/src/lib/destinationGuides.global";
import { flightDeals } from "../client/src/lib/flightDeals";

const expectedGlobalCountries = new Set([
  "Stati Uniti",
  "Canada",
  "Messico",
  "Brasile",
  "Argentina",
  "Perù",
  "Cile",
  "Colombia",
  "Giappone",
  "Cina",
  "Thailandia",
  "India",
  "Indonesia",
  "Vietnam",
  "Corea del Sud",
  "Australia",
  "Nuova Zelanda",
]);

describe("destination guide data", () => {
  it("covers every direct-flight country in Europe exactly once", () => {
    const offerCountries = new Set(flightDeals.map(deal => deal.country));
    const guideCountries = europeanDestinationGuides.map(
      guide => guide.country
    );

    expect(new Set(guideCountries)).toEqual(offerCountries);
    expect(guideCountries).toHaveLength(offerCountries.size);
  });

  it("covers the selected global destinations in the correct regions", () => {
    expect(
      new Set(globalDestinationGuides.map(guide => guide.country))
    ).toEqual(expectedGlobalCountries);
    expect(globalDestinationGuides).toHaveLength(expectedGlobalCountries.size);
    const countriesByRegion: Record<string, Set<string>> = {
      "Nord America": new Set(["Stati Uniti", "Canada", "Messico"]),
      "Sud America": new Set([
        "Argentina",
        "Brasile",
        "Cile",
        "Colombia",
        "Perù",
      ]),
      Asia: new Set([
        "Giappone",
        "Cina",
        "Thailandia",
        "India",
        "Indonesia",
        "Vietnam",
        "Corea del Sud",
      ]),
      Oceania: new Set(["Australia", "Nuova Zelanda"]),
    };
    for (const [region, expectedCountries] of Object.entries(
      countriesByRegion
    )) {
      const actualCountries = globalDestinationGuides
        .filter(guide => guide.region === region)
        .map(guide => guide.country);
      expect(new Set(actualCountries)).toEqual(expectedCountries);
      expect(actualCountries).toHaveLength(expectedCountries.size);
    }
  });

  it("aggregates all destination guides without duplicate ids", () => {
    const ids = destinationGuides.map(guide => guide.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(destinationGuides).toHaveLength(
      europeanDestinationGuides.length + globalDestinationGuides.length
    );
  });

  it("includes documents, entry requirements, advice, dates and official links", () => {
    for (const guide of destinationGuides) {
      expect(guide.italianCitizenDocuments.trim()).not.toBe("");
      expect(guide.entryRules.trim()).not.toBe("");
      expect(guide.travelAdvice.length).toBeGreaterThanOrEqual(2);
      expect(guide.officialSources.length).toBeGreaterThanOrEqual(2);
      expect(guide.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(
        guide.officialSources.every(source => source.url.startsWith("https://"))
      ).toBe(true);
    }
  });
});
