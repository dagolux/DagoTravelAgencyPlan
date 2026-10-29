import { useEffect, useRef, useState } from "react";
import { ExternalLink, Loader2, MapPin } from "lucide-react";
import type {
  AirportParkingAirport,
  AirportParkingLot,
  ParkingAirportId,
  ParkingCoordinates,
} from "@/lib/airportParking";
import { airportParkingRadiusMeters } from "@/lib/airportParking";
import { loadMaps } from "./TravelMap";

const EARTH_RADIUS_METERS = 6_371_000;

export type AirportParkingMapStatus = "loading" | "resolved" | "error";

function distanceMeters(a: ParkingCoordinates, b: ParkingCoordinates) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(b.lat - a.lat);
  const longitudeDelta = radians(b.lng - a.lng);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(radians(a.lat)) *
      Math.cos(radians(b.lat)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
}

function getPoint(
  lot: AirportParkingLot,
  airport: AirportParkingAirport,
  geocoder: google.maps.Geocoder
) {
  if (lot.coordinates) return Promise.resolve(lot.coordinates);
  return geocoder
    .geocode({ address: `${lot.address}, ${airport.city}, Italia` })
    .then(result => {
      const point = result.results[0]?.geometry.location;
      return point ? { lat: point.lat(), lng: point.lng() } : null;
    });
}

export default function AirportParkingMap({
  airport,
  onLocationsResolved,
}: {
  airport: AirportParkingAirport;
  onLocationsResolved: (
    airportId: ParkingAirportId,
    status: AirportParkingMapStatus,
    lotIds: string[]
  ) => void;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    let radiusCircle: google.maps.Circle | null = null;
    let infoWindow: google.maps.InfoWindow | null = null;
    setLoading(true);
    setError("");
    onLocationsResolved(airport.id, "loading", []);

    async function initialize() {
      try {
        await loadMaps();
        if (!active) return;
        if (!element.current || !window.google?.maps)
          throw new Error("Servizio mappe non disponibile.");
        const geocoder = new google.maps.Geocoder();
        const airportCenterResult = await geocoder
          .geocode({ address: `${airport.name}, ${airport.city}, Italia` })
          .catch(() => null);
        const airportLocation =
          airportCenterResult?.results[0]?.geometry.location;
        if (!airportLocation)
          throw new Error(
            "Non riesco a verificare la posizione dell’aeroporto sulla mappa."
          );
        const airportCenter = {
          lat: airportLocation.lat(),
          lng: airportLocation.lng(),
        };
        if (!active) return;

        const map = new google.maps.Map(element.current, {
          center: airportCenter,
          zoom: 12,
          mapId: "DEMO_MAP_ID",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          clickableIcons: false,
        });
        radiusCircle = new google.maps.Circle({
          map,
          center: airportCenter,
          radius: airportParkingRadiusMeters,
          fillColor: "#245da8",
          fillOpacity: 0.08,
          strokeColor: "#245da8",
          strokeOpacity: 0.7,
          strokeWeight: 2,
          clickable: false,
        });
        infoWindow = new google.maps.InfoWindow();
        const airportPin = new google.maps.marker.PinElement({
          background: "#1b2a3f",
          borderColor: "#ffffff",
          glyphColor: "#ffffff",
          glyph: "A",
        });
        const airportMarker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: airportCenter,
          title: `${airport.iata} — ${airport.name}`,
          content: airportPin.element,
        });
        airportMarker.addListener("click", () => {
          if (!infoWindow) return;
          infoWindow.setContent(`${airport.iata} — ${airport.name}`);
          infoWindow.open({ anchor: airportMarker, map });
        });
        markers.push(airportMarker);

        const points = await Promise.all(
          airport.lots.map(async lot => {
            try {
              return { lot, point: await getPoint(lot, airport, geocoder) };
            } catch {
              return { lot, point: null };
            }
          })
        );
        if (!active) return;

        const visibleLotIds: string[] = [];
        for (const [index, { lot, point }] of points.entries()) {
          if (
            !point ||
            distanceMeters(airportCenter, point) > airportParkingRadiusMeters
          )
            continue;
          visibleLotIds.push(lot.id);
          const pin = new google.maps.marker.PinElement({
            background: lot.type === "Ufficiale" ? "#245da8" : "#52657f",
            borderColor: "#ffffff",
            glyphColor: "#ffffff",
            glyph: String(index + 1),
          });
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: point,
            title: `${index + 1}. ${lot.name}`,
            content: pin.element,
          });
          marker.addListener("click", () => {
            if (!infoWindow) return;
            const content = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = lot.name;
            const price = document.createElement("p");
            price.textContent = lot.priceHeadline;
            content.append(name, price);
            infoWindow.setContent(content);
            infoWindow.open({ anchor: marker, map });
          });
          markers.push(marker);
        }

        onLocationsResolved(airport.id, "resolved", visibleLotIds);
        const bounds = radiusCircle.getBounds();
        if (bounds) map.fitBounds(bounds, 24);
      } catch (cause) {
        if (active) {
          onLocationsResolved(airport.id, "error", []);
          setError(
            cause instanceof Error
              ? cause.message
              : "La mappa non è disponibile in questo momento."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void initialize();
    return () => {
      active = false;
      markers.forEach(marker => {
        marker.map = null;
      });
      radiusCircle?.setMap(null);
      infoWindow?.close();
    };
  }, [airport, onLocationsResolved, retry]);

  return (
    <div className="airport-parking-map">
      <div
        ref={element}
        className="airport-parking-map-canvas"
        aria-label={`Mappa dei parcheggi entro 5 km dall’aeroporto ${airport.city}`}
      />
      {loading && (
        <div className="airport-parking-map-message">
          <Loader2 className="spin" size={24} />
          <p>Carico i parcheggi sulla mappa…</p>
        </div>
      )}
      {error && (
        <div className="airport-parking-map-message">
          <MapPin size={26} />
          <p>{error}</p>
          <button
            className="button secondary"
            onClick={() => setRetry(value => value + 1)}
          >
            Riprova
          </button>
          <a
            className="text-link"
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(airport.name)}`}
          >
            Apri Google Maps <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}
