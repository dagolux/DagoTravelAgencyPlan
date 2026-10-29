import { useCallback, useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  CircleHelp,
  Clock3,
  ExternalLink,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  airportParkingAirports,
  parkingSourcesCheckedAt,
  type ParkingAirportId,
} from "@/lib/airportParking";
import AirportParkingMap, {
  type AirportParkingMapStatus,
} from "./AirportParkingMap";

type ParkingMapReport = {
  airportId: ParkingAirportId;
  status: AirportParkingMapStatus;
  lotIds: string[];
};

export default function AirportParking() {
  const [selectedAirport, setSelectedAirport] =
    useState<ParkingAirportId>("bari");
  const airport = airportParkingAirports.find(
    item => item.id === selectedAirport
  )!;
  const [mapReport, setMapReport] = useState<ParkingMapReport | null>(null);
  const onLocationsResolved = useCallback(
    (
      airportId: ParkingAirportId,
      status: AirportParkingMapStatus,
      lotIds: string[]
    ) => setMapReport({ airportId, status, lotIds }),
    []
  );
  const currentMapReport =
    mapReport?.airportId === airport.id ? mapReport : null;
  const mapStatus = currentMapReport?.status ?? "loading";
  const visibleLots =
    mapStatus === "resolved"
      ? airport.lots.filter(lot => currentMapReport?.lotIds.includes(lot.id))
      : mapStatus === "error"
        ? airport.lots
        : [];

  return (
    <div className="airport-parking-page">
      <section className="airport-parking-hero">
        <div className="airport-parking-hero-copy">
          <span className="section-label">
            <CarFront size={14} /> PARCHEGGI AEROPORTUALI
          </span>
          <h1>
            Lascia l’auto, parti sereno<span>.</span>
          </h1>
          <p>
            Confronta opzioni ufficiali e private vicino agli scali di Bari e
            Brindisi. La mappa evidenzia il raggio di 5 km dall’aeroporto.
          </p>
        </div>
        <div className="airport-parking-radius-badge">
          <MapPin size={18} />
          <span>
            <strong>5 km</strong>
            <small>raggio sulla mappa</small>
          </span>
        </div>
      </section>

      <div
        className="airport-parking-airport-tabs"
        role="group"
        aria-label="Scegli l’aeroporto"
      >
        {airportParkingAirports.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedAirport === item.id}
            aria-controls="airport-parking-options"
            className={selectedAirport === item.id ? "active" : ""}
            onClick={() => setSelectedAirport(item.id)}
          >
            <span>{item.city}</span>
            <small>
              {item.iata} · {item.name}
            </small>
          </button>
        ))}
      </div>

      <section className="airport-parking-selected" aria-live="polite">
        <div>
          <span className="section-label">AEROPORTO SELEZIONATO</span>
          <h2>{airport.name}</h2>
          <p>{airport.address}</p>
        </div>
        <div className="airport-parking-updated">
          <Clock3 size={15} />
          Fonti consultate il {parkingSourcesCheckedAt}
        </div>
      </section>

      <div className="airport-parking-layout">
        <section
          className="airport-parking-map-panel"
          aria-label="Mappa parcheggi"
        >
          <div className="airport-parking-panel-heading">
            <div>
              <span className="section-label">ESPLORA LA ZONA</span>
              <h2>
                {mapStatus === "error"
                  ? "Mappa non disponibile"
                  : "Parcheggi nel raggio di 5 km"}
              </h2>
              <p>
                {mapStatus === "error"
                  ? "Consulta le fonti per verificare posizione e distanza."
                  : "Il cerchio indica la distanza in linea d’aria dall’aeroporto."}
              </p>
            </div>
            <span className="airport-parking-radius-chip">5 km</span>
          </div>
          <AirportParkingMap
            airport={airport}
            onLocationsResolved={onLocationsResolved}
          />
          <div className="airport-parking-map-legend">
            <span>
              <i className="parking-marker airport" /> Aeroporto
            </span>
            <span>
              <i className="parking-marker official" /> Ufficiale
            </span>
            <span>
              <i className="parking-marker private" /> Privato
            </span>
            <small>Seleziona un indicatore per vedere il prezzo.</small>
          </div>
        </section>

        <section
          className="airport-parking-options"
          id="airport-parking-options"
          aria-label={`Parcheggi vicino all’aeroporto di ${airport.city}`}
          aria-live="polite"
        >
          <div className="airport-parking-options-heading">
            <div>
              <span className="section-label">OPZIONI DISPONIBILI</span>
              <h2>
                {mapStatus === "loading"
                  ? "Verifico le posizioni…"
                  : mapStatus === "error"
                    ? "Opzioni selezionate"
                    : `${visibleLots.length} parcheggi nel raggio`}
              </h2>
            </div>
            <span className="airport-parking-options-radius">
              {mapStatus === "error" ? "Da verificare" : "Entro 5 km"}
            </span>
          </div>

          {mapStatus === "loading" && (
            <div className="airport-parking-list-state" role="status">
              Verifico che gli indirizzi ricadano nel raggio di 5 km…
            </div>
          )}
          {mapStatus === "error" && (
            <div className="airport-parking-list-state" role="status">
              Mappa non disponibile: mostro le opzioni selezionate dalle fonti
              consultate; verifica l’indirizzo e il prezzo con il gestore.
            </div>
          )}
          {mapStatus === "resolved" && visibleLots.length === 0 && (
            <div className="airport-parking-list-state" role="status">
              Nessun parcheggio è stato localizzato entro 5 km. Riprova più
              tardi o consulta le fonti ufficiali.
            </div>
          )}
          {mapStatus === "resolved" &&
            visibleLots.length > 0 &&
            visibleLots.length < airport.lots.length && (
              <div className="airport-parking-list-state" role="status">
                Alcune opzioni non sono mostrate perché il loro indirizzo non è
                stato verificato sulla mappa entro il raggio di 5 km.
              </div>
            )}
          {visibleLots.map(lot => {
            const index = airport.lots.findIndex(item => item.id === lot.id);
            return (
              <article className="airport-parking-card" key={lot.id}>
                <div className="airport-parking-card-heading">
                  <span
                    className={`airport-parking-number ${lot.type === "Ufficiale" ? "official" : "private"}`}
                  >
                    {index + 1}
                  </span>
                  <div className="airport-parking-card-title">
                    <span
                      className={`airport-parking-type ${lot.type === "Ufficiale" ? "official" : "private"}`}
                    >
                      {lot.type === "Ufficiale" && <ShieldCheck size={12} />}
                      {lot.type}
                    </span>
                    <h3>{lot.name}</h3>
                  </div>
                </div>

                <div className="airport-parking-location">
                  <MapPin size={14} />
                  <span>{lot.address}</span>
                </div>
                <p className="airport-parking-distance">
                  {mapStatus === "error"
                    ? "Distanza non verificata sulla mappa; controlla la posizione col gestore."
                    : lot.distanceLabel}
                </p>

                <div className="airport-parking-price">
                  <span>Prezzo pubblicato / campione</span>
                  <strong>{lot.priceHeadline}</strong>
                  <p>{lot.priceDetails}</p>
                </div>

                <ul className="airport-parking-services">
                  {lot.services.map(service => (
                    <li key={service}>
                      <span className="parking-service-check">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="airport-parking-card-links">
                  <a
                    className="button primary"
                    href={lot.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verifica tariffe e disponibilità <ArrowUpRight size={15} />
                  </a>
                  <a
                    className="airport-parking-source-link"
                    href={lot.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lot.sourceLabel} <ExternalLink size={13} />
                  </a>
                  {lot.priceSourceUrl && lot.priceSourceLabel && (
                    <a
                      className="airport-parking-source-link"
                      href={lot.priceSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lot.priceSourceLabel} <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <aside className="airport-parking-disclaimer">
        <CircleHelp size={17} />
        <p>
          Le tariffe sono indicative e possono cambiare in base a date, durata,
          veicolo e disponibilità. Per i parcheggi privati alcuni importi sono
          esempi di confronto, non un preventivo per il tuo viaggio: controlla
          il prezzo finale e i servizi direttamente con il gestore prima di
          prenotare. Distanza del raggio mappa e percorso stradale possono
          essere diversi; questa sezione non effettua prenotazioni o pagamenti.
        </p>
      </aside>
    </div>
  );
}
