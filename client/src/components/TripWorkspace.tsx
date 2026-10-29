import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Users,
  Wallet,
  MapPin,
  Sparkles,
  Download,
  Check,
  Plane,
  Hotel,
  Route,
  FileCheck2,
  Map,
  Phone,
  ExternalLink,
  ShieldCheck,
  Pencil,
  Clock,
  WandSparkles,
} from "lucide-react";
import TravelMap from "./TravelMap";
import ValentinaChat, { type TripChatMessage } from "./ValentinaChat";
import {
  checklistItems,
  euro,
  legacyDocumentAdvice,
  legacyVisaAdvice,
  legacyVaccinationAdvice,
  tripImage,
  type SavedTrip,
  type TripUpdateResult,
} from "@/lib/travelData";

const tabs = [
  { id: "itinerary", title: "Itinerario", icon: Route },
  { id: "chat", title: "Dago Travel AI", icon: WandSparkles },
  { id: "budget", title: "Budget", icon: Wallet },
  { id: "hotels", title: "Hotel", icon: Hotel },
  { id: "flights", title: "Voli", icon: Plane },
  { id: "documents", title: "Documenti", icon: FileCheck2 },
  { id: "map", title: "Mappa", icon: Map },
];
const noChatMessages: TripChatMessage[] = [];
const budgetLabels = {
  flights: "Voli",
  hotels: "Hotel",
  activities: "Attività",
  transport: "Trasporti",
  food: "Pasti e spese quotidiane",
  reserve: "Imprevisti",
};
const budgetColors = [
  "#245da8",
  "#5b87c8",
  "#9dbbe4",
  "#d7ba86",
  "#e0d4b9",
  "#e2eaf5",
];
export default function TripWorkspace({
  trip,
  onBack,
  onUpdate,
  onEdit,
  initialTab = "itinerary",
}: {
  trip: SavedTrip;
  onBack: () => void;
  onUpdate: (trip: SavedTrip, expectedRevision?: number) => TripUpdateResult;
  onEdit: () => void;
  initialTab?: string;
}) {
  const [tab, setTab] = useState(initialTab);
  const [day, setDay] = useState(0);
  const budget = trip.plan.budget;
  const total = Object.values(budget).reduce((sum, value) => sum + value, 0);
  const documentAdvice =
    trip.plan.documentAdvice?.length > 0
      ? trip.plan.documentAdvice
      : legacyDocumentAdvice;
  const visaAdvice =
    trip.plan.visaAdvice?.length > 0 ? trip.plan.visaAdvice : legacyVisaAdvice;
  const vaccinationAdvice =
    trip.plan.vaccinationAdvice?.length > 0
      ? trip.plan.vaccinationAdvice
      : legacyVaccinationAdvice;
  const locations = [
    ...trip.plan.days.flatMap(d => d.activities.map(a => a.location)),
    ...trip.plan.hotels.map(h => `${h.name}, ${h.area}`),
  ];
  const image = tripImage(trip.input.destination);
  const updateChat = (
    update: {
      plan: SavedTrip["plan"];
      messages: TripChatMessage[];
    },
    expectedRevision: number
  ) =>
    onUpdate(
      { ...trip, plan: update.plan, chat: update.messages },
      expectedRevision
    );
  const exportTrip = () => {
    const text = `DAGO TRAVEL\n${trip.input.destination} — ${trip.input.days} giorni\n${trip.plan.summary}\n\n${trip.plan.days.map(d => `GIORNO ${d.day}: ${d.title}\n${d.activities.map(a => `${a.time} ${a.title}\n${a.description}\nLuogo: ${a.location}\nStima: ${euro(a.cost)}`).join("\n\n")}`).join("\n\n")}\n\nBUDGET DEL GRUPPO (stime)\n${Object.entries(
      budget
    )
      .map(
        ([key, value]) =>
          `${budgetLabels[key as keyof typeof budgetLabels]}: ${euro(value)}`
      )
      .join(
        "\n"
      )}\n\nVOLI\n${trip.plan.flightAdvice}\n\nDOCUMENTO D’IDENTITÀ E VALIDITÀ\n${documentAdvice.join("\n")}\n\nVISTI E AUTORIZZAZIONI — cittadinanza ${trip.input.nationality}\n${visaAdvice.join("\n")}\n\nVACCINAZIONI E SALUTE\n${vaccinationAdvice.join("\n")}\n\nFonti ufficiali da controllare: https://www.viaggiaresicuri.it/ e https://www.salute.gov.it/. Le indicazioni non sostituiscono il parere di un professionista sanitario.\n\nSuggerimenti generati con AI. Verificare prezzi, disponibilità, documenti e recapiti nelle fonti ufficiali. Nessuna prenotazione effettuata.`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `dago-travel-${trip.input.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="workspace fade-in">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> Tutti i miei viaggi
      </button>
      <div
        className={`trip-header ${image ? "with-image" : ""}`}
        style={
          image
            ? {
                backgroundImage: `linear-gradient(90deg,rgba(10,32,27,.65),rgba(10,32,27,.1)),url(${image})`,
              }
            : undefined
        }
      >
        <div>
          <span className="eyebrow">
            <Sparkles size={13} /> IL TUO ITINERARIO PERSONALIZZATO
          </span>
          <h1>{trip.input.destination}</h1>
          <p>{trip.input.days} giorni da vivere, a modo tuo.</p>
          <div className="trip-meta">
            <span>
              <CalendarDays size={14} />
              {new Date(trip.input.startDate + "T12:00:00").toLocaleDateString(
                "it-IT"
              )}
            </span>
            <span>
              <Users size={14} />
              {trip.input.travelers} persone
            </span>
            <span>
              <Wallet size={14} />
              {euro(trip.input.budget)}
            </span>
            <span>{trip.input.style}</span>
          </div>
        </div>
        <div className="trip-header-actions">
          <button className="button white" onClick={onEdit}>
            <Pencil size={15} /> Modifica
          </button>
          <button className="button glass" onClick={exportTrip}>
            <Download size={15} /> Esporta
          </button>
        </div>
      </div>
      <div
        className="trip-tabs"
        role="tablist"
        aria-label="Sezioni del viaggio"
      >
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            <t.icon size={17} />
            {t.title}
          </button>
        ))}
      </div>
      <p className="estimate-notice">
        <ShieldCheck size={14} /> Suggerimenti AI, non prenotazioni. Prezzi,
        disponibilità e requisiti da verificare prima di partire.
      </p>
      {tab === "itinerary" && (
        <div className="itinerary-result">
          <div className="itinerary-layout">
            <section className="panel itinerary-main">
              <div className="section-label">
                <Sparkles size={15} /> PENSATO PER TE
              </div>
              <div className="itinerary-chat-heading">
                <h2>Il ritmo del tuo viaggio</h2>
                <button
                  className="button chat-ask-button"
                  onClick={() => setTab("chat")}
                >
                  <WandSparkles size={15} /> Chiedi a Dago Travel
                </button>
              </div>
              <p className="summary-text">{trip.plan.summary}</p>
              <div className="day-tabs">
                {trip.plan.days.map((d, index) => (
                  <button
                    key={d.day}
                    className={day === index ? "active" : ""}
                    onClick={() => setDay(index)}
                  >
                    Giorno {d.day}
                  </button>
                ))}
              </div>
              {trip.plan.days[day] && (
                <>
                  <h3 className="day-title">{trip.plan.days[day].title}</h3>
                  <div className="timeline">
                    {trip.plan.days[day].activities.map((activity, i) => (
                      <article className="timeline-item" key={i}>
                        <div className="timeline-time">
                          <span>{activity.time}</span>
                          <div className="timeline-dot" />
                        </div>
                        <div className="activity">
                          <h4>{activity.title}</h4>
                          <p>{activity.description}</p>
                          <div className="activity-footer">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location + ", " + trip.input.destination)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <MapPin size={13} />
                              {activity.location}
                              <ArrowUpRight size={12} />
                            </a>
                            <span>
                              {euro(activity.cost)} <small>stima gruppo</small>
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
            <aside className="itinerary-aside">
              <div className="panel mini-budget">
                <Wallet size={21} />
                <h3>Un viaggio in equilibrio</h3>
                <p>Budget totale del gruppo</p>
                <strong>{euro(trip.input.budget)}</strong>
                <div className="budget-bar">
                  {Object.values(budget).map((value, i) => (
                    <span
                      key={i}
                      style={{
                        width: `${total ? (value / total) * 100 : 0}%`,
                        background: budgetColors[i],
                      }}
                    />
                  ))}
                </div>
                <button className="text-link" onClick={() => setTab("budget")}>
                  Gestisci il budget <ArrowRightIcon />
                </button>
              </div>
              <div className="panel trip-tips">
                <div className="tip-symbol">
                  <Sparkles size={20} />
                </div>
                <h3>Un piccolo consiglio, un grande viaggio.</h3>
                {trip.plan.tips.slice(0, 3).map((tip, i) => (
                  <p key={i}>{tip}</p>
                ))}
              </div>
              <button className="map-shortcut" onClick={() => setTab("map")}>
                <Map size={22} />
                <div>
                  <strong>Guarda il viaggio sulla mappa</strong>
                  <span>Le tue tappe, tutte insieme</span>
                </div>
                <ArrowUpRight size={20} />
              </button>
            </aside>
          </div>
          <section className="panel predeparture-panel">
            <div className="section-heading predeparture-heading">
              <div>
                <span className="section-label">PRIMA DI PARTIRE</span>
                <h2>Documenti, visti e vaccinazioni</h2>
                <p>
                  Indicazioni orientative per cittadinanza{" "}
                  {trip.input.nationality}; verifica le regole aggiornate prima
                  della partenza.
                </p>
              </div>
              <button
                className="button secondary"
                onClick={() => setTab("documents")}
              >
                Apri documenti e checklist <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="predeparture-grid">
              <article className="predeparture-item">
                <h3>
                  <FileCheck2 size={17} /> Documento e validità
                </h3>
                {documentAdvice.slice(0, 2).map((advice, i) => (
                  <p key={i}>{advice}</p>
                ))}
              </article>
              <article className="predeparture-item">
                <h3>
                  <ExternalLink size={17} /> Visti e autorizzazioni
                </h3>
                {visaAdvice.slice(0, 2).map((advice, i) => (
                  <p key={i}>{advice}</p>
                ))}
              </article>
              <article className="predeparture-item">
                <h3>
                  <ShieldCheck size={17} /> Vaccinazioni e salute
                </h3>
                {vaccinationAdvice.slice(0, 2).map((advice, i) => (
                  <p key={i}>{advice}</p>
                ))}
              </article>
            </div>
            <p className="predeparture-note">
              Le indicazioni sanitarie non sono una valutazione medica
              personale: controlla obblighi e raccomandazioni con fonti
              ufficiali e un centro di medicina dei viaggi.
            </p>
          </section>
        </div>
      )}
      {tab === "chat" && (
        <div className="chat-workspace">
          <div className="section-heading">
            <div>
              <span className="section-label">
                IL TUO VIAGGIO, LE TUE REGOLE
              </span>
              <h2>Facciamo un piano che ti somiglia.</h2>
              <p>
                Chiedi a Dago Travel un cambiamento: aggiornerà itinerario,
                tappe o budget insieme a te.
              </p>
            </div>
          </div>
          <ValentinaChat
            trip={trip.input}
            plan={trip.plan}
            revision={trip.revision ?? 0}
            messages={trip.chat ?? noChatMessages}
            onUpdate={updateChat}
          />
        </div>
      )}
      {tab === "budget" && (
        <section className="panel budget-panel">
          <div className="section-heading">
            <div>
              <span className="section-label">TUTTO SOTTO CONTROLLO</span>
              <h2>Spazio ai ricordi. Non agli imprevisti.</h2>
              <p>
                Modifica le stime per adattarle alle tue scelte. Tutti gli
                importi sono per {trip.input.travelers} persone.
              </p>
            </div>
            <div className="budget-total">
              <span>Totale stimato</span>
              <strong>{euro(total)}</strong>
              <small
                className={
                  total > trip.input.budget ? "over-budget" : "within-budget"
                }
              >
                {total > trip.input.budget
                  ? `${euro(total - trip.input.budget)} oltre il budget`
                  : `${euro(trip.input.budget - total)} ancora disponibili`}
              </small>
            </div>
          </div>
          <div className="budget-bar large">
            {Object.values(budget).map((value, i) => (
              <span
                key={i}
                style={{
                  width: `${total ? (value / total) * 100 : 0}%`,
                  background: budgetColors[i],
                }}
              />
            ))}
          </div>
          <div className="budget-rows">
            {Object.entries(budget).map(([key, value], i) => (
              <label key={key} className="budget-row">
                <span>
                  <i style={{ background: budgetColors[i] }} />
                  {budgetLabels[key as keyof typeof budgetLabels]}
                </span>
                <div>
                  <input
                    aria-label={`Budget ${budgetLabels[key as keyof typeof budgetLabels]}`}
                    type="number"
                    min={0}
                    max={100000}
                    value={value}
                    onChange={e => {
                      const value = Math.max(
                        0,
                        Math.min(100000, Number(e.target.value) || 0)
                      );
                      onUpdate({
                        ...trip,
                        plan: {
                          ...trip.plan,
                          budget: { ...budget, [key]: value },
                        },
                      });
                    }}
                  />
                  <span>€</span>
                </div>
              </label>
            ))}
          </div>
          <div className="ai-note">
            <Wallet size={18} />
            <p>
              Questa è una ripartizione orientativa, non un preventivo di
              viaggio. L’hotel è stimato per l’intero soggiorno; le tariffe
              effettive possono cambiare.
            </p>
          </div>
        </section>
      )}
      {tab === "hotels" && (
        <section>
          <div className="section-heading">
            <div>
              <span className="section-label">IL TUO POSTO NEL MONDO</span>
              <h2>Dove sentirti a casa</h2>
              <p>
                Idee di soggiorno coerenti con il tuo viaggio. Tariffe
                indicative, non verificate in tempo reale.
              </p>
            </div>
          </div>
          <div className="hotel-list">
            {trip.plan.hotels.map((hotel, i) => (
              <article className="panel hotel-card" key={i}>
                <div className="hotel-icon">
                  <Hotel size={28} />
                </div>
                <div className="hotel-content">
                  <span className="pill">Suggerimento AI</span>
                  <h3>{hotel.name}</h3>
                  <span className="hotel-area">
                    <MapPin size={13} />
                    {hotel.area}
                  </span>
                  <p>{hotel.description}</p>
                </div>
                <div className="hotel-price">
                  <small>Stima gruppo / notte</small>
                  <strong>{euro(hotel.nightlyEstimate)}</strong>
                  <a
                    className="button secondary"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/travel/hotels?q=${encodeURIComponent(hotel.name + " " + trip.input.destination)}`}
                  >
                    Verifica disponibilità <ExternalLink size={14} />
                  </a>
                  <button
                    className="text-link"
                    onClick={() => {
                      setTab("map");
                    }}
                  >
                    Vedi sulla mappa
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {tab === "flights" && (
        <section className="panel flight-panel">
          <div className="section-label">
            <Plane size={15} /> IL VIAGGIO INIZIA QUI
          </div>
          <h2>Andata. Ritorno. Zero pensieri.</h2>
          <div className="flight-route">
            <div>
              <span>Partenza</span>
              <h3>{trip.input.departure}</h3>
            </div>
            <div className="flight-route-line">
              <span />
              <Plane size={25} />
              <span />
            </div>
            <div>
              <span>Destinazione</span>
              <h3>{trip.input.destination}</h3>
            </div>
          </div>
          <div className="flight-facts">
            <span>
              <CalendarDays size={16} />{" "}
              {new Date(trip.input.startDate + "T12:00:00").toLocaleDateString(
                "it-IT"
              )}
            </span>
            <span>
              <Users size={16} />
              {trip.input.travelers} viaggiatori
            </span>
            <span>
              <Wallet size={16} />
              {euro(budget.flights)} budget voli del gruppo
            </span>
          </div>
          <p className="summary-text">{trip.plan.flightAdvice}</p>
          <div className="ai-note">
            <Clock size={18} />
            <p>
              Controlla bagaglio, scali, aeroporti e condizioni di modifica. Non
              mostriamo orari, prezzi o posti confermati.
            </p>
          </div>
          <a
            className="button primary"
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/travel/flights?q=${encodeURIComponent(`Voli da ${trip.input.departure} a ${trip.input.destination} ${trip.input.startDate} ritorno dopo ${trip.input.days} giorni`)}`}
          >
            Cerca voli aggiornati <ExternalLink size={16} />
          </a>
        </section>
      )}
      {tab === "documents" && (
        <div className="documents-layout">
          <section className="panel">
            <div className="section-heading">
              <div>
                <span className="section-label">PARTI CON SERENITÀ</span>
                <h2>Prima di chiudere la valigia</h2>
                <p>
                  La tua checklist personale, salvata su questo dispositivo.
                </p>
              </div>
              <span className="completion-pill">
                {trip.checklist.length}/{checklistItems.length} completati
              </span>
            </div>
            <div className="checklist">
              {checklistItems.map(item => (
                <label
                  key={item.id}
                  className={`checklist-item ${trip.checklist.includes(item.id) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={trip.checklist.includes(item.id)}
                    onChange={() =>
                      onUpdate({
                        ...trip,
                        checklist: trip.checklist.includes(item.id)
                          ? trip.checklist.filter(id => id !== item.id)
                          : [...trip.checklist, item.id],
                      })
                    }
                  />
                  <span className="custom-check">
                    {trip.checklist.includes(item.id) && <Check size={14} />}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </label>
              ))}
            </div>
            <h3 className="document-advice-title">
              Documento d’identità e validità
            </h3>
            {documentAdvice.map((advice, i) => (
              <p className="document-advice" key={i}>
                {advice}
              </p>
            ))}
            <h3 className="document-advice-title">
              Visti e autorizzazioni · cittadinanza {trip.input.nationality}
            </h3>
            {visaAdvice.map((advice, i) => (
              <p className="document-advice" key={i}>
                {advice}
              </p>
            ))}
            <h3 className="document-advice-title">
              Vaccinazioni e salute per il tuo itinerario
            </h3>
            {vaccinationAdvice.map((advice, i) => (
              <p className="document-advice" key={i}>
                {advice}
              </p>
            ))}
            <div className="ai-note">
              <ShieldCheck size={18} />
              <p>
                I requisiti possono dipendere da scali, periodo e condizioni
                personali. Verifica con le autorità sanitarie o un
                professionista; questa sintesi non è una diagnosi né una
                prescrizione.
              </p>
            </div>
            <a
              href="https://www.viaggiaresicuri.it/"
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              Verifica su Viaggiare Sicuri <ExternalLink size={15} />
            </a>
            <a
              href="https://www.salute.gov.it/"
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              Ministero della Salute <ExternalLink size={15} />
            </a>
          </section>
          <aside className="panel useful-numbers">
            <Phone size={25} />
            <h3>Contatti da tenere vicino</h3>
            <p>
              Recapiti suggeriti dall’AI: verifica nelle fonti ufficiali e
              salvali prima di partire.
            </p>
            {trip.plan.usefulNumbers.length ? (
              trip.plan.usefulNumbers.map((n, i) => (
                <div className="phone-card" key={i}>
                  <strong>{n.label}</strong>
                  <span>{n.number}</span>
                  <small>{n.note}</small>
                </div>
              ))
            ) : (
              <div className="empty-numbers">
                Nessun numero verificato disponibile. Consulta i recapiti
                ufficiali della destinazione.
              </div>
            )}
            <a
              className="text-link"
              href="https://www.esteri.it/it/ministero/struttura/laretediplomatica/"
              target="_blank"
              rel="noreferrer"
            >
              Ambasciate e consolati <ExternalLink size={14} />
            </a>
          </aside>
        </div>
      )}
      {tab === "map" && (
        <section className="panel map-panel">
          <div className="section-heading">
            <div>
              <span className="section-label">
                IL TUO VIAGGIO, A COLPO D’OCCHIO
              </span>
              <h2>Ogni tappa ha una storia.</h2>
              <p>
                Esplora le tappe e gli hotel. Tocca un indicatore per vedere il
                luogo; le posizioni vanno verificate.
              </p>
            </div>
            <MapPin size={25} />
          </div>
          <TravelMap
            destination={trip.input.destination}
            locations={locations}
          />
          <div className="map-locations">
            {[...new Set(locations)].map((location, i) => (
              <a
                key={i}
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", " + trip.input.destination)}`}
              >
                <span>{i + 1}</span>
                {location}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
function ArrowRightIcon() {
  return <ArrowUpRight size={15} />;
}
