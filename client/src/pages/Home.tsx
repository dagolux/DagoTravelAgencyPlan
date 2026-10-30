import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CarFront,
  ChevronDown,
  Compass,
  Heart,
  LayoutDashboard,
  MapPin,
  Menu,
  Plane,
  Plus,
  Search,
  Sparkles,
  Wallet,
  X,
  Users,
  Hotel,
  FileCheck2,
  Map,
  HelpCircle,
  ChevronRight,
  Leaf,
  Check,
  Settings2,
  Trash2,
  Globe2,
  ShieldCheck,
  Mountain,
  Palmtree,
  Landmark,
  Utensils,
  Gem,
  Link2,
  PlaneTakeoff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PlannerModal from "@/components/PlannerModal";
import TripWorkspace from "@/components/TripWorkspace";
import TravelLinks from "@/components/TravelLinks";
import DestinationGuide from "@/components/DestinationGuide";
import FlightDeals from "@/components/FlightDeals";
import AirportParking from "@/components/AirportParking";
import { trpc } from "@/lib/trpc";
import {
  destinations,
  defaultInput,
  euro,
  loadLocal,
  normalizeSavedTrips,
  saveLocal,
  tripImage,
  styleNames,
  type SavedTrip,
  type TripUpdateResult,
} from "@/lib/travelData";
import type { TripInput } from "@shared/travel";
import type { TravelLinkCategoryId } from "@/lib/travelLinks";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/viaggi", label: "I miei viaggi", icon: Plane },
  { path: "/esplora", label: "Esplora destinazioni", icon: Compass },
  { path: "/preferiti", label: "Preferiti", icon: Heart },
];
const styleIcons = [Palmtree, Mountain, Landmark, Utensils, Gem, Leaf];
export default function Home() {
  const [location, navigate] = useLocation();
  const [trips, setTrips] = useState<SavedTrip[]>(() =>
    normalizeSavedTrips(loadLocal<SavedTrip[]>("valentina-trips", []))
  );
  const tripsRef = useRef(trips);
  const [favorites, setFavorites] = useState<string[]>(() =>
    loadLocal("valentina-favorites", [])
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [initialTab, setInitialTab] = useState("itinerary");
  const [planner, setPlanner] = useState(false);
  const [plannerInitial, setPlannerInitial] = useState<Partial<TripInput>>({});
  const [plannerKey, setPlannerKey] = useState(0);
  const [aiError, setAiError] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [linksCategory, setLinksCategory] =
    useState<TravelLinkCategoryId | null>(null);
  const [linksCategoryRequest, setLinksCategoryRequest] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tutte");
  const [info, setInfo] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>(() =>
    loadLocal("valentina-name", "Esploratore")
  );
  const [quick, setQuick] = useState(() => defaultInput());
  const [removeId, setRemoveId] = useState<string | null>(null);
  const selected = trips.find(t => t.id === selectedId);
  const persistTrips = (next: SavedTrip[], keepTemporary = false) => {
    const saved = saveLocal("valentina-trips", next);
    if (saved || keepTemporary) {
      tripsRef.current = next;
      setTrips(next);
    }
    if (!saved)
      toast.error(
        keepTemporary
          ? "Viaggio creato solo per questa sessione: il salvataggio non è disponibile. Esportalo per conservarlo."
          : "Salvataggio non disponibile: la modifica non è stata applicata. Riprova o esporta il viaggio."
      );
    return saved;
  };
  const updateTrip = (
    updated: SavedTrip,
    expectedRevision: number
  ): TripUpdateResult => {
    const current = tripsRef.current;
    const latest = current.find(trip => trip.id === updated.id);
    if (!latest || (latest.revision ?? 0) !== expectedRevision) {
      toast.error(
        "Il viaggio è cambiato mentre Dago Travel preparava la risposta. Nessuna modifica è stata sovrascritta: invia di nuovo la richiesta."
      );
      return "conflict";
    }
    const nextTrip = { ...updated, revision: expectedRevision + 1 };
    const next = current.map(trip =>
      trip.id === updated.id ? nextTrip : trip
    );
    if (!saveLocal("valentina-trips", next)) {
      toast.error(
        "Impossibile salvare la modifica sul dispositivo. Libera spazio o esporta il viaggio."
      );
      return "storage-error";
    }
    tripsRef.current = next;
    setTrips(next);
    return "saved";
  };
  const generate = trpc.travel.generate.useMutation({
    onSuccess: (plan, input) => {
      const trip: SavedTrip = {
        id: crypto.randomUUID(),
        revision: 0,
        input,
        plan,
        checklist: [],
        createdAt: new Date().toISOString(),
      };
      const saved = persistTrips([trip, ...tripsRef.current], true);
      setSelectedId(trip.id);
      setInitialTab("itinerary");
      setPlanner(false);
      navigate("/viaggi");
      if (saved) toast.success("Il tuo prossimo viaggio è pronto.");
    },
    onError: error =>
      setAiError(
        error.message ||
          "L’AI non è disponibile in questo momento. Riprova: le tue scelte sono ancora qui."
      ),
  });
  function openPlanner(initial: Partial<TripInput> = {}) {
    setPlannerInitial(initial);
    setPlannerKey(v => v + 1);
    setAiError(null);
    setPlanner(true);
    setMobileMenu(false);
  }
  const navigateTo = (
    path: string,
    category: TravelLinkCategoryId | null = null
  ) => {
    setLinksCategory(category);
    if (category) setLinksCategoryRequest(request => request + 1);
    navigate(path);
    setSelectedId(null);
    setMobileMenu(false);
    setQuery("");
    setFilter("Tutte");
  };
  function toggleFavorite(name: string) {
    const next = favorites.includes(name)
      ? favorites.filter(f => f !== name)
      : [...favorites, name];
    setFavorites(next);
    if (!saveLocal("valentina-favorites", next))
      toast.error("Non è stato possibile salvare i preferiti sul dispositivo.");
  }
  function openSection(tab: string) {
    if (!trips.length) {
      toast("Prima creiamo il tuo viaggio.", {
        description: "Poi troverai qui hotel, voli, documenti e mappa.",
      });
      openPlanner();
      return;
    }
    setInitialTab(tab);
    setSelectedId(trips[0].id);
    navigate("/viaggi");
    setMobileMenu(false);
  }
  const visibleDestinations = destinations.filter(
    d =>
      (location !== "/preferiti" || favorites.includes(d.name)) &&
      (filter === "Tutte" || d.style === filter) &&
      `${d.name} ${d.country}`.toLowerCase().includes(query.toLowerCase())
  );
  const visibleTrips = trips.filter(t =>
    `${t.input.destination} ${t.input.style}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  const isDashboard = location === "/";
  const titles: Record<string, string> = {
    "/": "Il tuo spazio di viaggio",
    "/viaggi": "I miei viaggi",
    "/esplora": "Esplora destinazioni",
    "/preferiti": "I tuoi luoghi del cuore",
    "/links": "Links utili",
    "/offerte-voli": "Voli offerte",
    "/guida-paese": "Documenti e consigli per Paese",
    "/parcheggi-aeroporto": "Parcheggi aeroporti",
  };
  const destinationCards = (
    <div className="destination-grid">
      {visibleDestinations.map(d => (
        <article className="destination-card" key={d.name}>
          <div className="destination-photo">
            <img
              src={d.image}
              alt={`Paesaggio di ${d.name}, ${d.country}`}
              loading="lazy"
            />
            <span className="destination-tag">{d.tag}</span>
            <button
              className={`favorite-button ${favorites.includes(d.name) ? "is-favorite" : ""}`}
              aria-label={
                favorites.includes(d.name)
                  ? `Rimuovi ${d.name} dai preferiti`
                  : `Salva ${d.name} nei preferiti`
              }
              onClick={() => toggleFavorite(d.name)}
            >
              <Heart
                size={17}
                fill={favorites.includes(d.name) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="destination-content">
            <div className="destination-title">
              <div>
                <span>{d.country}</span>
                <h3>{d.name}</h3>
              </div>
              <button
                aria-label={`Pianifica un viaggio a ${d.name}`}
                className="round-arrow"
                onClick={() =>
                  openPlanner({
                    destination: d.name,
                    days: d.days,
                    budget: d.budget,
                    style: d.style,
                  })
                }
              >
                <ArrowUpRight size={20} />
              </button>
            </div>
            <p>{d.description}</p>
            <div className="destination-bottom">
              <span>
                <CalendarDays size={13} />
                {d.days} giorni di ispirazione
              </span>
              <span className="style-tag">{d.style}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
  const tripCards = (
    <div className="saved-trip-grid">
      {visibleTrips.map(trip => (
        <article className="saved-trip-card panel" key={trip.id}>
          <button
            className="trip-card-main"
            onClick={() => {
              setSelectedId(trip.id);
              setInitialTab("itinerary");
              navigate("/viaggi");
            }}
          >
            {tripImage(trip.input.destination) ? (
              <img
                src={tripImage(trip.input.destination)}
                alt={trip.input.destination}
              />
            ) : (
              <div className="trip-card-illustration">
                <Globe2 size={44} />
              </div>
            )}
            <div className="saved-trip-details">
              <span className="pill">
                <Sparkles size={11} /> Creato con AI
              </span>
              <h3>{trip.input.destination}</h3>
              <p>
                {trip.input.days} giorni · {trip.input.travelers} persone ·{" "}
                {trip.input.style}
              </p>
              <div>
                <span>
                  {new Date(
                    trip.input.startDate + "T12:00:00"
                  ).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <strong>{euro(trip.input.budget)}</strong>
              </div>
            </div>
          </button>
          <button
            className="delete-trip"
            aria-label={`Elimina il viaggio a ${trip.input.destination}`}
            onClick={() => setRemoveId(trip.id)}
          >
            <Trash2 size={14} />
          </button>
        </article>
      ))}
    </div>
  );
  return (
    <div className="app-shell">
      {mobileMenu && (
        <button
          className="sidebar-overlay"
          aria-label="Chiudi menu"
          onClick={() => setMobileMenu(false)}
        />
      )}
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <a
          href="/"
          className="brand"
          onClick={e => {
            e.preventDefault();
            navigateTo("/");
          }}
        >
          <img src="/taranto-dolphin.jpg" alt="" />
          <div>
            <span>
              Dago Travel<span className="brand-dot">.</span>
            </span>
            <small>PLANNING</small>
          </div>
        </a>
        <button
          className="button primary new-trip-sidebar"
          onClick={() => openPlanner()}
        >
          <Plus size={18} /> Nuovo viaggio
        </button>
        <div className="nav-group">
          <span className="nav-caption">IL TUO MONDO</span>
          <nav>
            {navItems.map(item => (
              <button
                key={item.path}
                className={`nav-item ${location === item.path ? "active" : ""}`}
                onClick={() => navigateTo(item.path)}
              >
                <item.icon size={19} />
                {item.label}
                {item.path === "/viaggi" && trips.length > 0 && (
                  <span className="nav-count">{trips.length}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="nav-group tools-nav">
          <span className="nav-caption">TUTTO PER PARTIRE</span>
          <nav>
            {[
              { id: "hotels", label: "Hotel e soggiorni", icon: Hotel },
              { id: "flights", label: "Voli e trasporti", icon: Plane },
              {
                id: "airport-parking",
                label: "Parcheggi aeroporti",
                icon: CarFront,
              },
              { id: "flight-deals", label: "Voli offerte", icon: PlaneTakeoff },
              {
                id: "documents",
                label: "Documenti e checklist",
                icon: FileCheck2,
              },
              { id: "map", label: "Mappe e luoghi", icon: Map },
              { id: "links", label: "Links utili", icon: Link2 },
              {
                id: "destination-guide",
                label: "Guida per Paese",
                icon: Globe2,
              },
            ].map(item => (
              <button
                className={`nav-item ${(item.id === "links" && location === "/links" && !linksCategory) || (item.id === "hotels" && location === "/links" && linksCategory === "stays") || (item.id === "flights" && location === "/links" && linksCategory === "flights") || (item.id === "airport-parking" && location === "/parcheggi-aeroporto") || (item.id === "flight-deals" && location === "/offerte-voli") || (item.id === "destination-guide" && location === "/guida-paese") ? "active" : ""}`}
                key={item.id}
                onClick={() =>
                  item.id === "hotels"
                    ? navigateTo("/links", "stays")
                    : item.id === "flights"
                      ? navigateTo("/links", "flights")
                      : item.id === "airport-parking"
                        ? navigateTo("/parcheggi-aeroporto")
                        : item.id === "links"
                          ? navigateTo("/links")
                          : item.id === "flight-deals"
                            ? navigateTo("/offerte-voli")
                            : item.id === "destination-guide"
                              ? navigateTo("/guida-paese")
                              : openSection(item.id)
                }
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="ai-sidebar-card">
            <div className="ai-card-label">
              <span>
                <Sparkles size={16} />
              </span>
              IL TUO TRAVEL ASSISTANT
            </div>
            <h3>Un’idea. Mille possibilità.</h3>
            <p>
              Lascia che Dago Travel trasformi i tuoi desideri in un viaggio.
            </p>
            <button onClick={() => openPlanner()}>
              Pianifica con l’AI <ArrowUpRight size={16} />
            </button>
          </div>
          <button className="support-link" onClick={() => setInfo("help")}>
            <HelpCircle size={17} /> Una mano per partire{" "}
            <ArrowUpRight size={14} />
          </button>
          <div className="sidebar-footnote">
            <ShieldCheck size={12} /> I tuoi piani, su questo dispositivo.
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button icon-button"
              aria-label="Apri menu"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={22} />
            </button>
            <span>{titles[location] || titles["/"]}</span>
          </div>
          <div className="topbar-right">
            <span className="ai-status">
              <i /> AI, al tuo fianco
            </span>
            <span className="topbar-divider" />
            <button
              className="icon-button notification-button"
              aria-label="Promemoria di viaggio"
              onClick={() => setInfo("notifications")}
            >
              <Bell size={19} />
              {trips.some(t => t.checklist.length < 6) && <i />}
            </button>
            <button
              className="profile-button"
              onClick={() => setInfo("profile")}
            >
              <span className="avatar">
                <img src="/taranto-dolphin.jpg" alt="" aria-hidden="true" />
              </span>
              <span className="profile-name">
                {profileName}
                <small>Il tuo spazio personale</small>
              </span>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>
        <main className="main-content">
          {selected ? (
            <TripWorkspace
              key={`${selected.id}-${initialTab}`}
              trip={selected}
              initialTab={initialTab}
              onBack={() => {
                setSelectedId(null);
                navigate("/viaggi");
              }}
              onUpdate={(updated, expectedRevision) =>
                updateTrip(updated, expectedRevision ?? selected.revision ?? 0)
              }
              onEdit={() => openPlanner(selected.input)}
            />
          ) : location === "/links" ? (
            <TravelLinks
              initialCategory={linksCategory}
              categoryRequest={linksCategoryRequest}
            />
          ) : location === "/offerte-voli" ? (
            <FlightDeals />
          ) : location === "/parcheggi-aeroporto" ? (
            <AirportParking />
          ) : location === "/guida-paese" ? (
            <DestinationGuide />
          ) : (
            <>
              {isDashboard ? (
                <>
                  <div className="welcome-row">
                    <div>
                      <div className="greeting">
                        LA TUA PROSSIMA STORIA INIZIA QUI
                      </div>
                      <h1>
                        Il mondo ti aspetta
                        <span className="heading-dot">.</span>
                      </h1>
                      <p>
                        Tu porta la voglia di partire. Al resto pensiamo
                        insieme.
                      </p>
                    </div>
                    <button
                      className="button secondary top-explore"
                      onClick={() => navigateTo("/esplora")}
                    >
                      <Compass size={16} /> Lasciati ispirare{" "}
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <section className="hero">
                    <img
                      src="/images/bali.webp"
                      alt="Scogliere verdi e mare turchese a Nusa Penida, Bali"
                      className="hero-image"
                      fetchPriority="high"
                    />
                    <div className="hero-shade" />
                    <div className="hero-content">
                      <span className="hero-badge">
                        <Sparkles size={13} /> UN VIAGGIO CHE TI SOMIGLIA
                      </span>
                      <h2>
                        Meno piani.
                        <br />
                        Più momenti.
                      </h2>
                      <p>
                        Il tuo itinerario perfetto, creato dall’AI.
                        <br />
                        Destinazioni, esperienze e dettagli. Tutto in un unico
                        posto.
                      </p>
                      <button
                        className="button white"
                        onClick={() => openPlanner()}
                      >
                        <Sparkles size={17} /> Crea il tuo viaggio{" "}
                        <ArrowRight size={17} />
                      </button>
                    </div>
                    <div className="hero-location">
                      <MapPin size={14} />
                      <div>
                        Nusa Penida<small>Bali, Indonesia</small>
                      </div>
                    </div>
                  </section>
                  <form
                    className="quick-planner"
                    onSubmit={e => {
                      e.preventDefault();
                      openPlanner(quick);
                    }}
                  >
                    <label className="quick-field destination-quick">
                      <MapPin size={19} />
                      <div>
                        <span>DESTINAZIONE</span>
                        <input
                          aria-label="Destinazione del nuovo viaggio"
                          maxLength={120}
                          placeholder="Dove vuoi andare?"
                          value={quick.destination}
                          onChange={e =>
                            setQuick({ ...quick, destination: e.target.value })
                          }
                        />
                      </div>
                    </label>
                    <label className="quick-field">
                      <CalendarDays size={19} />
                      <div>
                        <span>DURATA</span>
                        <select
                          aria-label="Durata del viaggio"
                          value={quick.days}
                          onChange={e =>
                            setQuick({ ...quick, days: Number(e.target.value) })
                          }
                        >
                          {[3, 4, 5, 7, 10, 14, 21].map(d => (
                            <option value={d} key={d}>
                              {d} giorni
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                    <label className="quick-field budget-quick">
                      <Wallet size={19} />
                      <div>
                        <span>BUDGET DEL GRUPPO</span>
                        <select
                          aria-label="Budget totale"
                          value={quick.budget}
                          onChange={e =>
                            setQuick({
                              ...quick,
                              budget: Number(e.target.value),
                            })
                          }
                        >
                          {[600, 1200, 1800, 2500, 4000, 6000].map(b => (
                            <option value={b} key={b}>
                              {euro(b)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                    <button className="button primary" type="submit">
                      Inizia a pianificare <ArrowRight size={16} />
                    </button>
                  </form>
                  <div className="reassurance-row">
                    <span>
                      <Sparkles size={13} /> Fatto per te, non per tutti
                    </span>
                    <span>
                      <Wallet size={13} /> Il tuo budget, rispettato
                    </span>
                    <span>
                      <Leaf size={13} /> Più viaggio, meno stress
                    </span>
                  </div>
                  <section
                    className="dashboard-shortcuts"
                    aria-label="Risorse di viaggio"
                  >
                    <button
                      type="button"
                      className="dashboard-shortcut"
                      onClick={() => navigateTo("/links")}
                    >
                      <span className="dashboard-shortcut-icon">
                        <Link2 size={18} />
                      </span>
                      <span className="dashboard-shortcut-copy">
                        <strong>Links utili</strong>
                        <small>
                          Voli, hotel, assicurazioni e risorse ufficiali
                        </small>
                      </span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="dashboard-shortcut"
                      onClick={() => navigateTo("/guida-paese")}
                    >
                      <span className="dashboard-shortcut-icon">
                        <FileCheck2 size={18} />
                      </span>
                      <span className="dashboard-shortcut-copy">
                        <strong>Documenti e consigli per Paese</strong>
                        <small>Scegli una meta e prepara la partenza</small>
                      </span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                  </section>
                  <section className="inspiration-section">
                    <div className="section-heading">
                      <div>
                        <span className="section-label">
                          DA UN’IDEA A UN BIGLIETTO
                        </span>
                        <h2>Da dove cominciamo?</h2>
                        <p>
                          Piccole ispirazioni per la tua prossima grande
                          avventura.
                        </p>
                      </div>
                      <button
                        className="text-link"
                        onClick={() => navigateTo("/esplora")}
                      >
                        Esplora destinazioni <ArrowRight size={15} />
                      </button>
                    </div>
                    {destinationCards}
                  </section>
                  <section className="dashboard-bottom">
                    <div className="panel journey-summary">
                      <div className="section-heading">
                        <div>
                          <span className="section-label">
                            IL TUO TRAVEL JOURNAL
                          </span>
                          <h2>Le prossime partenze</h2>
                        </div>
                        <button
                          className="text-link"
                          onClick={() => navigateTo("/viaggi")}
                        >
                          Tutti i viaggi <ArrowRight size={14} />
                        </button>
                      </div>
                      {trips.length ? (
                        <button
                          className="recent-trip"
                          onClick={() => {
                            setSelectedId(trips[0].id);
                            setInitialTab("itinerary");
                            navigate("/viaggi");
                          }}
                        >
                          <div className="recent-trip-icon">
                            <Plane size={22} />
                          </div>
                          <div>
                            <h3>{trips[0].input.destination}</h3>
                            <p>
                              {trips[0].input.days} giorni ·{" "}
                              {trips[0].input.style} ·{" "}
                              {euro(trips[0].input.budget)}
                            </p>
                          </div>
                          <ArrowUpRight size={21} />
                        </button>
                      ) : (
                        <div className="inline-empty">
                          <div className="empty-icon">
                            <Plane size={24} />
                          </div>
                          <div>
                            <h3>La prossima partenza è tutta da scrivere.</h3>
                            <p>
                              Crea il tuo primo viaggio e ritrovalo sempre qui.
                            </p>
                            <button
                              className="text-link"
                              onClick={() => openPlanner()}
                            >
                              Pianifica un viaggio <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="travel-tip">
                      <span>
                        <Sparkles size={15} /> IL CONSIGLIO DI DAGO TRAVEL
                      </span>
                      <h3>
                        Il viaggio migliore?
                        <br />
                        Quello al tuo ritmo.
                      </h3>
                      <p>
                        Lascia spazio anche a una strada non prevista, un caffè
                        lento, un tramonto in più.
                      </p>
                      <div className="tip-decoration">
                        <Compass size={74} strokeWidth={0.7} />
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <div className="welcome-row">
                    <div>
                      <span className="greeting">
                        {location === "/viaggi"
                          ? "LE STORIE CHE STAI PER VIVERE"
                          : location === "/preferiti"
                            ? "UN GIORNO, QUI"
                            : "SEGUI LA TUA CURIOSITÀ"}
                      </span>
                      <h1>
                        {location === "/viaggi"
                          ? "La tua prossima partenza."
                          : location === "/preferiti"
                            ? "I tuoi luoghi del cuore."
                            : "C’è un mondo da scoprire."}
                      </h1>
                      <p>
                        {location === "/viaggi"
                          ? "I tuoi itinerari, budget e dettagli. Tutto nello stesso posto."
                          : "Salva ciò che ti ispira. Trasformalo nel tuo prossimo viaggio."}
                      </p>
                    </div>
                    <button
                      className="button primary"
                      onClick={() => openPlanner()}
                    >
                      <Plus size={16} /> Nuovo viaggio
                    </button>
                  </div>
                  <div className="explore-toolbar">
                    <label className="search-field">
                      <Search size={18} />
                      <input
                        aria-label={
                          location === "/viaggi"
                            ? "Cerca nei tuoi viaggi"
                            : "Cerca destinazioni"
                        }
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={
                          location === "/viaggi"
                            ? "Cerca un viaggio…"
                            : "Cerca una destinazione…"
                        }
                      />
                      {query && (
                        <button
                          aria-label="Cancella ricerca"
                          onClick={() => setQuery("")}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </label>
                    {location !== "/viaggi" && (
                      <div className="filter-chips">
                        {["Tutte", "Relax", "Cultura", "Avventura"].map(f => (
                          <button
                            key={f}
                            className={f === filter ? "active" : ""}
                            onClick={() => setFilter(f)}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {location === "/viaggi" ? (
                    visibleTrips.length ? (
                      tripCards
                    ) : (
                      <div className="empty-state panel">
                        <div className="empty-state-icon">
                          <Plane size={35} />
                        </div>
                        <h2>
                          {trips.length
                            ? "Non ho trovato questo viaggio."
                            : "Ogni viaggio inizia con un’idea."}
                        </h2>
                        <p>
                          {trips.length
                            ? "Prova un’altra destinazione nella ricerca."
                            : "Scegli una destinazione e lascia che Dago Travel crei il tuo primo itinerario."}
                        </p>
                        <button
                          className="button primary"
                          onClick={() =>
                            trips.length ? setQuery("") : openPlanner()
                          }
                        >
                          {trips.length
                            ? "Mostra tutti i viaggi"
                            : "Crea il primo viaggio"}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )
                  ) : visibleDestinations.length ? (
                    destinationCards
                  ) : (
                    <div className="empty-state panel">
                      <div className="empty-state-icon">
                        <Heart size={35} />
                      </div>
                      <h2>
                        {location === "/preferiti" && !favorites.length
                          ? "Un posto nel mondo. Un posto nel cuore."
                          : "Nessuna destinazione trovata."}
                      </h2>
                      <p>
                        {location === "/preferiti" && !favorites.length
                          ? "Tocca il cuore su una destinazione per ritrovarla qui."
                          : "Cambia la ricerca o crea un viaggio per qualsiasi destinazione."}
                      </p>
                      <button
                        className="button primary"
                        onClick={() =>
                          location === "/preferiti"
                            ? navigateTo("/esplora")
                            : openPlanner()
                        }
                      >
                        Esplora nuove possibilità <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                  {location === "/esplora" && (
                    <section className="style-discovery panel">
                      <span className="section-label">
                        NON SOLO UN LUOGO. UN MODO DI VIAGGIARE.
                      </span>
                      <h2>Trova il tuo ritmo.</h2>
                      <div className="style-discovery-options">
                        {styleNames.map((style, i) => {
                          const Icon = styleIcons[i];
                          return (
                            <button
                              key={style}
                              onClick={() => openPlanner({ style })}
                            >
                              <Icon size={23} />
                              <strong>{style}</strong>
                              <ArrowUpRight size={14} />
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </>
              )}
            </>
          )}
          <footer className="page-footer">
            <span>
              Dago Travel <i>·</i> Il tuo viaggio, senza pensieri.
            </span>
            <button onClick={() => setInfo("privacy")}>
              Privacy e salvataggi
            </button>
          </footer>
        </main>
      </div>
      {planner && (
        <PlannerModal
          key={plannerKey}
          open={planner}
          initial={plannerInitial}
          loading={generate.isPending}
          error={aiError}
          onClose={() => setPlanner(false)}
          onGenerate={input => {
            setAiError(null);
            generate.mutate(input);
          }}
        />
      )}
      <Dialog
        open={!!info}
        onOpenChange={open => {
          if (!open) setInfo(null);
        }}
      >
        <DialogContent className="info-modal">
          <div className="modal-ai-icon">
            {info === "profile" ? (
              <Settings2 size={24} />
            ) : info === "notifications" ? (
              <Bell size={24} />
            ) : (
              <ShieldCheck size={24} />
            )}
          </div>
          <DialogTitle className="modal-title">
            {info === "profile"
              ? "Il tuo spazio, il tuo nome."
              : info === "notifications"
                ? "Un promemoria per partire sereni."
                : info === "privacy"
                  ? "I tuoi viaggi restano tuoi."
                  : "Un po’ di chiarezza, prima di partire."}
          </DialogTitle>
          <DialogDescription>
            {info === "profile"
              ? "Personalizza il dashboard su questo dispositivo."
              : info === "notifications"
                ? "Le piccole cose da non dimenticare."
                : "Come funziona Dago Travel."}
          </DialogDescription>
          {info === "profile" ? (
            <div>
              <label className="field">
                <span>Come ti chiami?</span>
                <input
                  maxLength={30}
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                />
              </label>
              <button
                className="button primary profile-save"
                onClick={() => {
                  const name = profileName.trim() || "Esploratore";
                  setProfileName(name);
                  if (saveLocal("valentina-name", name)) {
                    setInfo(null);
                    toast.success("Il tuo spazio è aggiornato.");
                  } else toast.error("Impossibile salvare sul dispositivo.");
                }}
              >
                <Check size={16} /> Salva preferenze
              </button>
            </div>
          ) : info === "notifications" ? (
            <div className="info-body">
              {trips.length ? (
                trips.map(trip => (
                  <button
                    className="notification-item"
                    key={trip.id}
                    onClick={() => {
                      setInfo(null);
                      setInitialTab("documents");
                      setSelectedId(trip.id);
                      navigate("/viaggi");
                    }}
                  >
                    <FileCheck2 size={22} />
                    <div>
                      <strong>{trip.input.destination}</strong>
                      <p>
                        {trip.checklist.length === 6
                          ? "Checklist completata. Verifica gli ultimi aggiornamenti prima di partire."
                          : `${6 - trip.checklist.length} elementi della checklist ancora da controllare.`}
                      </p>
                    </div>
                    <ChevronRight size={17} />
                  </button>
                ))
              ) : (
                <p>
                  Non hai ancora viaggi da controllare. Quando crei un
                  itinerario, qui trovi i promemoria della checklist.
                </p>
              )}
            </div>
          ) : (
            <div className="info-body">
              {info === "privacy" ? (
                <>
                  <h3>Salvataggi locali, senza account</h3>
                  <p>
                    Viaggi, budget, checklist, preferiti e nome sono conservati
                    nel browser di questo dispositivo. Non vengono sincronizzati
                    tra dispositivi. Cancellare i dati del browser rimuove i
                    piani salvati.
                  </p>
                  <h3>Pianificazione con AI</h3>
                  <p>
                    Quando generi un itinerario, i dettagli inseriti vengono
                    inviati al servizio AI per creare suggerimenti. Non inserire
                    numeri di passaporto, dati di pagamento o altre informazioni
                    sensibili. Puoi esportare ogni itinerario per conservarne
                    una copia.
                  </p>
                </>
              ) : (
                <>
                  <h3>Come creo un viaggio?</h3>
                  <p>
                    Seleziona “Nuovo viaggio”, scegli destinazione, date, budget
                    e stile. L’AI preparerà un itinerario che puoi consultare,
                    esportare e adattare.
                  </p>
                  <h3>Posso prenotare qui?</h3>
                  <p>
                    Dago Travel aiuta a pianificare. Hotel e voli includono link
                    per verificare offerte e disponibilità; nessuna prenotazione
                    o pagamento avviene su questa piattaforma.
                  </p>
                  <h3>I documenti sono confermati?</h3>
                  <p>
                    No. I suggerimenti AI vanno verificati su Viaggiare Sicuri e
                    presso le autorità della destinazione, in base alla
                    cittadinanza e al viaggio.
                  </p>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!removeId}
        onOpenChange={open => {
          if (!open) setRemoveId(null);
        }}
      >
        <DialogContent className="info-modal">
          <DialogTitle>Eliminare questo viaggio?</DialogTitle>
          <DialogDescription>
            Il piano e la checklist verranno rimossi da questo dispositivo.
            Prima puoi conservarli usando “Esporta”.
          </DialogDescription>
          <div className="modal-actions">
            <button
              className="button secondary"
              onClick={() => setRemoveId(null)}
            >
              Annulla
            </button>
            <button
              className="button danger"
              onClick={() => {
                if (
                  persistTrips(tripsRef.current.filter(t => t.id !== removeId))
                ) {
                  setRemoveId(null);
                  toast.success("Viaggio eliminato.");
                }
              }}
            >
              Elimina viaggio
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
