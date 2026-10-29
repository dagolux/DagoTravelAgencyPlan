import { useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  FileCheck2,
  Globe2,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import {
  destinationGuideRegions,
  destinationGuides,
} from "@/lib/destinationGuides";

export default function DestinationGuide() {
  const [selectedId, setSelectedId] = useState(destinationGuides[0]?.id ?? "");
  const selected = destinationGuides.find(item => item.id === selectedId);
  const verifiedLabel = selected
    ? new Date(`${selected.verifiedAt}T12:00:00`).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="destination-guide-page">
      <section className="destination-guide-hero">
        <span className="section-label">
          <Globe2 size={13} /> LA DESTINAZIONE, CON PIÙ CHIAREZZA
        </span>
        <h1>
          Prima di partire<span>.</span>
        </h1>
        <p>
          Scegli una meta per consultare documenti, visti e consigli pratici. È
          una selezione di destinazioni turistiche popolari, non un elenco
          completo dei paesi del mondo.
        </p>
        <span className="destination-guide-verified">
          Verifica delle fonti: {verifiedLabel}
        </span>
      </section>

      <section className="destination-country-picker">
        <label htmlFor="destination-country-select">
          <span>PAESE DI DESTINAZIONE</span>
          <select
            id="destination-country-select"
            value={selected?.id ?? ""}
            onChange={event => setSelectedId(event.target.value)}
            aria-label="Scegli il paese di destinazione"
          >
            <option value="" disabled>
              Scegli una destinazione
            </option>
            {destinationGuideRegions.map(region => {
              const regionGuides = destinationGuides.filter(
                item => item.region === region
              );
              return regionGuides.length ? (
                <optgroup key={region} label={region}>
                  {regionGuides.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.country} · {item.city}
                    </option>
                  ))}
                </optgroup>
              ) : null;
            })}
          </select>
        </label>
        <p>
          Sintesi pensata per cittadini italiani in viaggio turistico di breve
          durata. I requisiti possono variare in base a cittadinanza, transito,
          durata e situazione personale.
        </p>
      </section>

      {selected ? (
        <div className="destination-guide-content" aria-live="polite">
          <section className="country-documents-panel">
            <div className="guide-section-heading">
              <span className="guide-icon">
                <FileCheck2 size={18} />
              </span>
              <div>
                <span className="section-label">DOCUMENTI E INGRESSO</span>
                <h2>{selected.country}</h2>
                <p>
                  {selected.region} · Meta: {selected.city}
                </p>
              </div>
            </div>
            <div className="country-document-details">
              <article>
                <h3>Documenti da verificare</h3>
                <p>{selected.italianCitizenDocuments}</p>
              </article>
              <article>
                <h3>Requisiti di soggiorno</h3>
                <p>{selected.entryRules}</p>
              </article>
            </div>
          </section>

          <section className="country-advice-panel">
            <div className="guide-section-heading">
              <span className="guide-icon">
                <Lightbulb size={18} />
              </span>
              <div>
                <span className="section-label">CONSIGLI DI VIAGGIO</span>
                <h2>Qualche accorgimento per {selected.city}</h2>
              </div>
            </div>
            <div className="country-advice-list">
              {selected.travelAdvice.map((advice, index) => (
                <article key={`${selected.id}-advice-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{advice}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="country-sources-panel">
            <div className="guide-section-heading">
              <span className="guide-icon">
                <ShieldCheck size={18} />
              </span>
              <div>
                <span className="section-label">FONTI ISTITUZIONALI</span>
                <h2>Controlla i dettagli aggiornati</h2>
                <p>Le pagine ufficiali prevalgono sempre su questa sintesi.</p>
              </div>
            </div>
            <div className="country-source-list">
              {selected.officialSources.map(source => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${source.title}: ${source.supports}. Si apre in una nuova scheda.`}
                >
                  <span>
                    <strong>{source.title}</strong>
                    <small>{source.supports}</small>
                  </span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <aside className="destination-guide-disclaimer">
            <ShieldCheck size={17} />
            <p>
              <strong>{selected.caveat}</strong> Questa è una guida informativa,
              non una conferma di ammissione alla frontiera. Prima di prenotare
              e partire ricontrolla i requisiti sulle fonti ufficiali. Se la tua
              cittadinanza non è italiana, viaggi per un periodo diverso o hai
              condizioni particolari, verifica le regole specifiche per il tuo
              caso.
            </p>
            <ArrowUpRight size={15} aria-hidden="true" />
          </aside>
        </div>
      ) : (
        <div className="destination-guide-empty">
          <Globe2 size={25} />
          <h2>Scegli un paese</h2>
          <p>La guida mostrerà documenti, consigli e fonti per quella meta.</p>
        </div>
      )}
    </div>
  );
}
