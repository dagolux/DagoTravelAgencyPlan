import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  CalendarDays,
  Wallet,
  Users,
  Check,
  Loader2,
  Palmtree,
  Mountain,
  Landmark,
  Utensils,
  Gem,
  Leaf,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { defaultInput, destinations, euro, styleNames } from "@/lib/travelData";
import type { TripInput } from "@shared/travel";
import { italyDate } from "@shared/dates";

const styleIcons = [Palmtree, Mountain, Landmark, Utensils, Gem, Leaf];
interface Props {
  open: boolean;
  onClose: () => void;
  initial?: Partial<TripInput>;
  onGenerate: (input: TripInput) => void;
  loading: boolean;
  error: string | null;
}
export default function PlannerModal({
  open,
  onClose,
  initial,
  onGenerate,
  loading,
  error,
}: Props) {
  const [input, setInput] = useState<TripInput>(() => ({
    ...defaultInput(),
    ...initial,
  }));
  const [step, setStep] = useState(0);
  const [validation, setValidation] = useState("");
  const update = <K extends keyof TripInput>(key: K, value: TripInput[K]) =>
    setInput(old => ({ ...old, [key]: value }));
  const valid = () => {
    if (!input.destination.trim() || !input.departure.trim()) {
      setValidation("Inserisci destinazione e città di partenza.");
      return false;
    }
    if (!input.startDate || input.startDate < italyDate()) {
      setValidation("Scegli una data di partenza valida, non nel passato.");
      return false;
    }
    if (
      input.days < 1 ||
      input.days > 21 ||
      input.travelers < 1 ||
      input.travelers > 8 ||
      input.budget < 200 ||
      input.budget > 50000
    ) {
      setValidation(
        "Controlla durata (1–21 giorni), viaggiatori (1–8) e budget (€200–€50.000)."
      );
      return false;
    }
    if (!input.nationality.trim()) {
      setValidation(
        "Inserisci la cittadinanza per i suggerimenti sui documenti."
      );
      return false;
    }
    setValidation("");
    return true;
  };
  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        if (!value && !loading) onClose();
      }}
    >
      <DialogContent
        className="planner-modal"
        aria-describedby="planner-description"
      >
        <div className="modal-ai-icon">
          <Sparkles size={24} />
        </div>
        <DialogTitle className="modal-title">
          Il tuo prossimo viaggio, su misura.
        </DialogTitle>
        <DialogDescription id="planner-description">
          Tu scegli cosa ami. Dago Travel mette insieme il resto.
        </DialogDescription>
        <div className="step-indicator">
          {["Il viaggio", "Il tuo stile", "Pronti a partire"].map((name, i) => (
            <div className={i <= step ? "step active" : "step"} key={name}>
              <span>{i < step ? <Check size={13} /> : i + 1}</span>
              {name}
            </div>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (valid()) {
              if (step < 2) setStep(step + 1);
              else onGenerate(input);
            }
          }}
        >
          {step === 0 && (
            <div className="form-grid">
              <label className="field full">
                <span>
                  <MapPin size={14} /> Dove vorresti andare?
                </span>
                <input
                  autoFocus
                  required
                  maxLength={120}
                  list="destination-options"
                  placeholder="Una città, un’isola, un posto nel cuore…"
                  value={input.destination}
                  onChange={e => update("destination", e.target.value)}
                />
                <datalist id="destination-options">
                  {[
                    ...destinations.map(d => d.name),
                    "Kyoto",
                    "Parigi",
                    "Roma",
                    "New York",
                    "Barcellona",
                    "Marrakech",
                    "Islanda",
                  ].map(d => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </label>
              <label className="field">
                <span>Città di partenza</span>
                <input
                  required
                  maxLength={100}
                  value={input.departure}
                  onChange={e => update("departure", e.target.value)}
                />
              </label>
              <label className="field">
                <span>
                  <CalendarDays size={14} /> Partenza
                </span>
                <input
                  type="date"
                  required
                  min={italyDate()}
                  value={input.startDate}
                  onChange={e => update("startDate", e.target.value)}
                />
              </label>
              <label className="field">
                <span>Durata in giorni</span>
                <input
                  type="number"
                  min={1}
                  max={21}
                  required
                  value={input.days}
                  onChange={e => update("days", Number(e.target.value))}
                />
              </label>
              <label className="field">
                <span>
                  <Users size={14} /> Viaggiatori
                </span>
                <input
                  type="number"
                  min={1}
                  max={8}
                  required
                  value={input.travelers}
                  onChange={e => update("travelers", Number(e.target.value))}
                />
              </label>
              <label className="field full">
                <span>
                  <Wallet size={14} /> Budget totale del gruppo · EUR
                </span>
                <input
                  type="number"
                  min={200}
                  max={50000}
                  step={50}
                  required
                  value={input.budget}
                  onChange={e => update("budget", Number(e.target.value))}
                />
                <small>
                  Include voli, soggiorno, attività e spese quotidiane. Non è un
                  preventivo.
                </small>
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="style-step">
              <h3>Che viaggiatore sei?</h3>
              <p>Il ritmo giusto. Le esperienze che parlano di te.</p>
              <div className="style-options">
                {styleNames.map((style, i) => {
                  const Icon = styleIcons[i];
                  return (
                    <button
                      type="button"
                      key={style}
                      className={
                        input.style === style
                          ? "style-option selected"
                          : "style-option"
                      }
                      onClick={() => update("style", style)}
                    >
                      <Icon size={22} />
                      {style}
                      {input.style === style && (
                        <Check className="style-check" size={13} />
                      )}
                    </button>
                  );
                })}
              </div>
              <label className="field">
                <span>Qualcosa che non vuoi perderti?</span>
                <textarea
                  maxLength={1000}
                  rows={3}
                  placeholder="Ad esempio: cibo locale, musei, hotel tranquilli, esigenze di accessibilità…"
                  value={input.preferences}
                  onChange={e => update("preferences", e.target.value)}
                />
              </label>
              <label className="field nationality">
                <span>Cittadinanza dei viaggiatori</span>
                <input
                  required
                  maxLength={100}
                  value={input.nationality}
                  onChange={e => update("nationality", e.target.value)}
                />
                <small>
                  I requisiti vanno sempre confermati con le autorità
                  competenti.
                </small>
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="review-step">
              <div className="review-destination">
                <MapPin size={24} />
                <div>
                  <h3>{input.destination}</h3>
                  <p>Partenza da {input.departure}</p>
                </div>
              </div>
              <div className="review-grid">
                <div>
                  <span>Quando</span>
                  <strong>
                    {new Date(input.startDate + "T12:00:00").toLocaleDateString(
                      "it-IT",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </strong>
                </div>
                <div>
                  <span>Durata</span>
                  <strong>{input.days} giorni</strong>
                </div>
                <div>
                  <span>Compagnia</span>
                  <strong>
                    {input.travelers} viaggiator
                    {input.travelers === 1 ? "e" : "i"}
                  </strong>
                </div>
                <div>
                  <span>Budget totale</span>
                  <strong>{euro(input.budget)}</strong>
                </div>
              </div>
              <div className="ai-note">
                <Sparkles size={18} />
                <p>
                  L’AI creerà il tuo itinerario giorno per giorno, con idee per
                  hotel, voli, budget e documenti. Prezzi e requisiti sono
                  indicativi, non verificati in tempo reale.
                </p>
              </div>
            </div>
          )}
          {(validation || error) && (
            <p className="form-error" role="alert">
              {validation || error}
            </p>
          )}
          <div className="modal-actions">
            {step > 0 ? (
              <button
                type="button"
                className="button ghost"
                disabled={loading}
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={16} /> Indietro
              </button>
            ) : (
              <span />
            )}
            <button type="submit" className="button primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spin" size={17} /> Creo il tuo viaggio…
                </>
              ) : step === 2 ? (
                <>
                  <Sparkles size={16} /> Genera il mio itinerario
                </>
              ) : (
                <>
                  Continua <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
          {loading && (
            <p className="loading-hint" role="status">
              Sto scegliendo le tappe e trovando il ritmo giusto. Può richiedere
              circa un minuto.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
