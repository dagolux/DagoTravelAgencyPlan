import { describe, expect, it } from "vitest";
import {
  legacyDocumentAdvice,
  legacyVaccinationAdvice,
  legacyVisaAdvice,
  normalizeSavedTrips,
  type SavedTrip,
} from "./travelData";

describe("normalizeSavedTrips", () => {
  it("adds explicit fallbacks to legacy trips without the three pre-departure fields", () => {
    const legacyTrip = {
      id: "legacy-trip",
      plan: {
        documentAdvice: [],
        visaAdvice: undefined,
        vaccinationAdvice: [],
      },
    } as unknown as SavedTrip;

    const [normalized] = normalizeSavedTrips([legacyTrip]);

    expect(normalized.plan.documentAdvice).toEqual(legacyDocumentAdvice);
    expect(normalized.plan.visaAdvice).toEqual(legacyVisaAdvice);
    expect(normalized.plan.vaccinationAdvice).toEqual(legacyVaccinationAdvice);
  });
});
