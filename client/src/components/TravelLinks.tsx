import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  ExternalLink,
  FileCheck2,
  Hotel,
  Link2,
  Map,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  travelLinkCategories,
  type TravelLinkCategoryId,
} from "@/lib/travelLinks";

const categoryIcons: Record<TravelLinkCategoryId, LucideIcon> = {
  flights: Plane,
  stays: Hotel,
  insurance: ShieldCheck,
  documents: FileCheck2,
  safety: ShieldCheck,
  tools: Compass,
};

export default function TravelLinks({
  initialCategory = null,
  categoryRequest = 0,
}: {
  initialCategory?: TravelLinkCategoryId | null;
  categoryRequest?: number;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    TravelLinkCategoryId | "all"
  >(initialCategory ?? "all");
  useEffect(() => {
    setQuery("");
    setActiveCategory(initialCategory ?? "all");
  }, [initialCategory, categoryRequest]);
  useEffect(() => {
    if (!initialCategory || activeCategory !== initialCategory) return;
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(`links-${initialCategory}-title`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialCategory, activeCategory, categoryRequest]);
  const normalizedQuery = query.trim().toLocaleLowerCase("it-IT");
  const visibleCategories = useMemo(
    () =>
      travelLinkCategories
        .filter(
          category => activeCategory === "all" || category.id === activeCategory
        )
        .map(category => ({
          ...category,
          links: category.links.filter(link =>
            `${category.title} ${category.description} ${link.name} ${link.description} ${link.label}`
              .toLocaleLowerCase("it-IT")
              .includes(normalizedQuery)
          ),
        }))
        .filter(category => category.links.length > 0),
    [activeCategory, normalizedQuery]
  );
  const totalLinks = travelLinkCategories.reduce(
    (total, category) => total + category.links.length,
    0
  );
  const visibleLinks = visibleCategories.reduce(
    (total, category) => total + category.links.length,
    0
  );

  return (
    <div className="travel-links-page">
      <section className="links-hero">
        <div className="links-hero-copy">
          <span className="section-label">
            <Link2 size={13} /> IL TUO KIT DI PARTENZA
          </span>
          <h1>
            Link utili per il viaggio<span>.</span>
          </h1>
          <p>
            Dai primi confronti ai dettagli prima di partire: trovi qui risorse
            affidabili, raccolte in un solo posto.
          </p>
        </div>
        <div className="links-hero-count">
          <span>{totalLinks}</span>
          <small>risorse selezionate</small>
        </div>
      </section>

      <div className="links-tools-row">
        <label className="links-search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Cerca voli, hotel, documenti…"
            aria-label="Cerca tra i link di viaggio"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Cancella la ricerca"
            >
              <X size={15} />
            </button>
          )}
        </label>
        <span className="links-results-count">
          {visibleLinks} {visibleLinks === 1 ? "link" : "link"}
        </span>
      </div>

      <div className="links-category-filters" aria-label="Filtra per categoria">
        <button
          type="button"
          className={activeCategory === "all" ? "active" : ""}
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          Tutte le categorie
        </button>
        {travelLinkCategories.map(category => {
          const Icon = categoryIcons[category.id];
          return (
            <button
              type="button"
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon size={14} /> {category.title}
            </button>
          );
        })}
      </div>

      {visibleCategories.length ? (
        <div className="links-categories">
          {visibleCategories.map(category => {
            const Icon = categoryIcons[category.id];
            return (
              <section
                key={category.id}
                className="links-category-section"
                aria-labelledby={`links-${category.id}-title`}
              >
                <div className="links-section-heading">
                  <span className="links-section-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="section-label">{category.eyebrow}</span>
                    <h2 id={`links-${category.id}-title`}>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className="links-resource-grid">
                  {category.links.map(link => (
                    <a
                      className="links-resource-card"
                      href={link.url}
                      key={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.name}: ${link.description} Si apre in una nuova scheda.`}
                    >
                      <span className="resource-card-topline">
                        <span className="resource-mark">
                          <Link2 size={17} />
                        </span>
                        <ExternalLink size={15} aria-hidden="true" />
                      </span>
                      <span className="resource-kind">{link.label}</span>
                      <strong>{link.name}</strong>
                      <span className="resource-description">
                        {link.description}
                      </span>
                      <span className="resource-open">
                        Apri il sito <ArrowUpRight size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="links-empty-state">
          <Search size={25} />
          <h2>Nessun link trovato</h2>
          <p>Prova un’altra parola o mostra tutte le categorie.</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
            }}
          >
            Azzera filtri
          </button>
        </div>
      )}

      <section
        className="links-emergency-card"
        aria-label="Contatto di emergenza"
      >
        <span className="links-emergency-icon">
          <Phone size={18} />
        </span>
        <div>
          <span className="section-label">CONTATTO UFFICIALE</span>
          <h2>Gravi emergenze all’estero</h2>
          <p>
            Unità di Crisi della Farnesina. Verifica i recapiti aggiornati sul
            portale ufficiale prima della partenza.
          </p>
        </div>
        <a className="emergency-number" href="tel:+390636225">
          +39 06 36225 <ArrowUpRight size={15} />
        </a>
      </section>

      <aside className="links-disclaimer">
        <Map size={17} />
        <p>
          Tariffe, disponibilità, coperture e requisiti di ingresso possono
          cambiare: verifica sempre i dettagli presso il fornitore e le fonti
          ufficiali della destinazione. I link sono informativi e non indicano
          partnership o raccomandazioni commerciali. Per le assicurazioni,
          controlla massimali, esclusioni e condizioni prima di acquistare.
        </p>
      </aside>
    </div>
  );
}
