import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarDays,
  Check,
  ExternalLink,
  Plane,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  flightDeals,
  flightDealsVerifiedAt,
  skyscannerAirportUrls,
} from "@/lib/flightDeals";
import DestinationWeather from "@/components/DestinationWeather";

type AirportFilter = "Tutti" | "Bari" | "Brindisi";

function dateRange(departure: string, returning: string) {
  const depart = new Date(`${departure}T12:00:00`);
  const back = new Date(`${returning}T12:00:00`);
  const sameYear = depart.getFullYear() === back.getFullYear();
  return `${depart.toLocaleDateString("it-IT", { day: "numeric", month: "short" })} – ${back.toLocaleDateString("it-IT", { day: "numeric", month: "short" })}${sameYear ? ` ${back.getFullYear()}` : ` ${depart.getFullYear()} – ${back.getFullYear()}`}`;
}

export default function FlightDeals() {
  const [airport, setAirport] = useState<AirportFilter>("Tutti");
  const visibleDeals = useMemo(
    () =>
      flightDeals
        .filter(deal => airport === "Tutti" || deal.airport === airport)
        .sort((a, b) => a.price - b.price),
    [airport]
  );
  const verifiedLabel = new Date(
    `${flightDealsVerifiedAt}T12:00:00`
  ).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flight-deals-page">
      <section className="flight-deals-hero">
        <div>
          <span className="section-label">
            <Plane size={13} /> OFFERTE DA CASA TUA
          </span>
          <h1>
            Si parte da qui<span>.</span>
          </h1>
          <p>
            Voli diretti dall’aeroporto di Bari o Brindisi verso l’Europa. Date
            flessibili, piccoli prezzi e nuove idee per il prossimo viaggio.
          </p>
          <div className="flight-deals-verified">
            <RefreshCw size={13} /> Prezzi rilevati il {verifiedLabel} su
            Skyscanner
          </div>
        </div>
        <div className="flight-deals-hero-mark" aria-hidden="true">
          <Plane size={36} />
          <span>
            BRI <i /> BDS
          </span>
        </div>
      </section>

      <section
        className="flight-deals-content"
        aria-label="Offerte voli diretti"
      >
        <div className="flight-deals-toolbar">
          <div>
            <span className="section-label">SCELTE PER TE</span>
            <h2>Le offerte più leggere</h2>
          </div>
          <div className="airport-filter" aria-label="Filtra per aeroporto">
            {(["Tutti", "Bari", "Brindisi"] as const).map(option => (
              <button
                type="button"
                key={option}
                className={airport === option ? "active" : ""}
                aria-pressed={airport === option}
                onClick={() => setAirport(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flight-deals-grid">
          {visibleDeals.map(deal => (
            <article className="flight-deal-card" key={deal.id}>
              <div className="flight-deal-card-top">
                <span className="flight-deal-tag">
                  <Check size={12} /> Diretto
                </span>
                <span className="flight-deal-airport">
                  {deal.airport} <small>{deal.airportCode}</small>
                </span>
              </div>
              <div className="flight-deal-route">
                <div>
                  <span>PARTENZA</span>
                  <strong>{deal.airportCode}</strong>
                  <small>{deal.airport}</small>
                </div>
                <div className="flight-deal-route-line">
                  <i />
                  <Plane size={15} />
                  <i />
                </div>
                <div className="flight-deal-arrival">
                  <span>DESTINAZIONE</span>
                  <strong>{deal.destinationCode}</strong>
                  <small>{deal.destination}</small>
                </div>
              </div>
              <div className="flight-deal-destination">
                <div>
                  <h3>{deal.destination}</h3>
                  <p>{deal.country}</p>
                </div>
                <div className="flight-deal-price">
                  <strong>€{deal.price}</strong>
                  <small>a persona A/R</small>
                </div>
              </div>
              <div className="flight-deal-meta">
                <span>
                  <CalendarDays size={14} />
                  {dateRange(deal.departDate, deal.returnDate)}
                </span>
                <span>{deal.airline}</span>
              </div>
              <a
                className="flight-deal-cta"
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Apri la ricerca per ${deal.destination} da ${deal.airport} e imposta un avviso di prezzo su Skyscanner`}
              >
                Apri la ricerca e imposta l’alert <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <DestinationWeather airport={airport} />

      <section
        className="external-alert-guide"
        aria-labelledby="alert-guide-title"
      >
        <div className="external-alert-icon">
          <BellRing size={18} />
        </div>
        <div className="external-alert-copy">
          <h2 id="alert-guide-title">Vuoi sapere se il prezzo cambia?</h2>
          <p>
            Apri una delle ricerche qui sopra e accedi al tuo account
            Skyscanner. Da desktop scegli “Monitora i prezzi” o “Ricevi avvisi
            di prezzo”; dal sito mobile salva il volo con il cuore. Skyscanner
            invierà e gestirà gli avvisi email: Dago Travel non raccoglie il tuo
            indirizzo e non invia notifiche.
          </p>
        </div>
        <a
          href="https://help.skyscanner.net/hc/it/articles/115002499829-Come-posso-impostare-o-annullare-gli-avvisi-di-prezzo-via-e-mail"
          target="_blank"
          rel="noopener noreferrer"
          className="external-alert-help"
        >
          Guida ufficiale <ArrowUpRight size={14} />
        </a>
      </section>

      <div className="airport-search-cards">
        <a
          href={skyscannerAirportUrls.BRI}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <Plane size={17} /> Tutte le partenze da Bari
          </span>
          <small>Apri la ricerca aggiornata su Skyscanner</small>
          <ArrowRight size={17} />
        </a>
        <a
          href={skyscannerAirportUrls.BDS}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <Plane size={17} /> Tutte le partenze da Brindisi
          </span>
          <small>Apri la ricerca aggiornata su Skyscanner</small>
          <ArrowRight size={17} />
        </a>
      </div>

      <aside className="flight-deals-note">
        <ShieldCheck size={18} />
        <p>
          <strong>Tariffe indicative, non in tempo reale.</strong> Sono prezzi
          A/R per persona, rilevati nella ricerca Skyscanner alla data indicata
          e riferiti alle date mostrate. Posti e prezzi possono cambiare o
          esaurirsi. Apri la fonte per ricontrollare il totale, i bagagli,
          l’aeroporto preciso e le condizioni prima di prenotare.
        </p>
        <a
          href={skyscannerAirportUrls.BRI}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apri la fonte Skyscanner"
        >
          <ExternalLink size={15} />
        </a>
      </aside>

      <p className="flight-deals-source-line">
        Fonte: pagine e risultati di ricerca Skyscanner Italia. Le offerte
        selezionate indicano voli diretti sia all’andata sia al ritorno; le
        tariffe non includono necessariamente bagagli o servizi extra.
      </p>
    </div>
  );
}
