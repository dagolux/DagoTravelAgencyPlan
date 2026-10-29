import { describe, expect, it } from "vitest";
import {
  airportParkingAirports,
  airportParkingRadiusMeters,
} from "./airportParking";

const earthRadiusMeters = 6_371_000;

function distanceMeters(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(to.lat - from.lat);
  const longitudeDelta = radians(to.lng - from.lng);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(radians(from.lat)) *
      Math.cos(radians(to.lat)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return 2 * earthRadiusMeters * Math.asin(Math.sqrt(haversine));
}

describe("airport parking data", () => {
  it("includes Bari and Brindisi with airport codes and parking options", () => {
    expect(airportParkingAirports.map(airport => airport.id)).toEqual([
      "bari",
      "brindisi",
    ]);
    expect(airportParkingAirports.map(airport => airport.iata)).toEqual([
      "BRI",
      "BDS",
    ]);
    for (const airport of airportParkingAirports) {
      expect(airport.lots.length).toBeGreaterThanOrEqual(2);
      expect(airport.center.lat).toBeGreaterThan(0);
      expect(airport.center.lng).toBeGreaterThan(0);
    }
  });

  it("provides a price, services, map address and verifiable links for every option", () => {
    for (const airport of airportParkingAirports) {
      for (const lot of airport.lots) {
        expect(lot.address.trim()).not.toBe("");
        expect(lot.priceHeadline.trim()).not.toBe("");
        expect(lot.priceDetails.trim()).not.toBe("");
        expect(lot.services.length).toBeGreaterThan(0);
        expect(lot.sourceUrl).toMatch(/^https:\/\//);
        expect(lot.bookingUrl).toMatch(/^https:\/\//);
      }
    }
  });

  it("keeps every published coordinate inside the 5 km radius", () => {
    for (const airport of airportParkingAirports) {
      for (const lot of airport.lots) {
        if (!lot.coordinates) continue;
        expect(
          distanceMeters(airport.center, lot.coordinates)
        ).toBeLessThanOrEqual(airportParkingRadiusMeters);
      }
    }
  });
});
