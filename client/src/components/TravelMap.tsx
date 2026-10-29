import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2, ExternalLink } from "lucide-react";

let mapScript: Promise<void> | null = null;
export function loadMaps(): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (mapScript) return mapScript;
  mapScript = new Promise<void>((resolve, reject) => {
    const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;
    if (!mapsKey) {
      reject(new Error("Configurazione mappe non disponibile."));
      return;
    }
    const script = document.createElement("script");
    const timer = setTimeout(
      () => reject(new Error("La mappa non ha risposto. Riprova tra poco.")),
      20000
    );
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(mapsKey)}&v=weekly&libraries=marker,geocoding`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      clearTimeout(timer);
      if (window.google?.maps) resolve();
      else reject(new Error("Servizio mappe non disponibile."));
    };
    script.onerror = () => {
      clearTimeout(timer);
      reject(
        new Error("Impossibile caricare la mappa. Controlla la connessione.")
      );
    };
    document.head.appendChild(script);
  }).catch(error => {
    mapScript = null;
    throw error;
  });
  return mapScript;
}
export default function TravelMap({
  destination,
  locations,
}: {
  destination: string;
  locations: string[];
}) {
  const element = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    setLoading(true);
    setError("");
    async function init() {
      try {
        await loadMaps();
        const center = await new google.maps.Geocoder().geocode({
          address: destination,
        });
        if (!active || !element.current) return;
        if (!center.results[0])
          throw new Error("Destinazione non trovata sulla mappa.");
        const map = new google.maps.Map(element.current, {
          center: center.results[0].geometry.location,
          zoom: 12,
          mapId: "DEMO_MAP_ID",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });
        const bounds = new google.maps.LatLngBounds();
        const places = [...new Set(locations.filter(Boolean))].slice(0, 12);
        for (const [i, place] of (places.length
          ? places
          : [destination]
        ).entries()) {
          if (!active) break;
          try {
            const result = await new google.maps.Geocoder().geocode({
              address: `${place}, ${destination}`,
            });
            if (!active) break;
            if (!result.results[0]) continue;
            const position = result.results[0].geometry.location;
            const pin = new google.maps.marker.PinElement({
              background: "#245da8",
              borderColor: "#ffffff",
              glyphColor: "#ffffff",
              glyph: String(i + 1),
            });
            const marker = new google.maps.marker.AdvancedMarkerElement({
              map,
              position,
              title: place,
              content: pin.element,
            });
            const content = document.createElement("strong");
            content.textContent = place;
            const info = new google.maps.InfoWindow({ content });
            marker.addListener("click", () =>
              info.open({ anchor: marker, map })
            );
            markers.push(marker);
            bounds.extend(position);
          } catch {
            /* A missing place does not make other markers unusable. */
          }
        }
        if (active && markers.length > 1) map.fitBounds(bounds, 55);
      } catch (e) {
        if (active)
          setError(e instanceof Error ? e.message : "Mappa non disponibile.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void init();
    return () => {
      active = false;
      markers.forEach(marker => {
        marker.map = null;
      });
    };
  }, [destination, locations.join("|"), retry]);
  return (
    <div className="travel-map">
      <div ref={element} className="map-canvas" />
      {loading && (
        <div className="map-message">
          <Loader2 className="spin" size={24} />
          <p>Metto il tuo viaggio sulla mappa…</p>
        </div>
      )}
      {error && (
        <div className="map-message">
          <MapPin size={26} />
          <p>{error}</p>
          <button
            className="button secondary"
            onClick={() => setRetry(v => v + 1)}
          >
            Riprova
          </button>
          <a
            className="text-link"
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`}
          >
            Apri Google Maps <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}
