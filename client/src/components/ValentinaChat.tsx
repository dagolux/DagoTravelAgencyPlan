import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUp,
  Check,
  Loader2,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import type { TripInput, TravelPlan } from "@shared/travel";
import { trpc } from "@/lib/trpc";
import type { TripUpdateResult } from "@/lib/travelData";

export type TripChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  changes?: string[];
  createdAt: string;
};
type PersistedChatTurn = Pick<TripChatMessage, "role" | "content">;
const ideas = [
  "Rendi il giorno 2 più rilassante",
  "Proponi un hotel più economico",
  "Aggiungi più esperienze locali",
];
function newMessage(
  role: TripChatMessage["role"],
  content: string,
  changes?: string[]
): TripChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    ...(changes?.length ? { changes } : {}),
    createdAt: new Date().toISOString(),
  };
}

export default function ValentinaChat({
  trip,
  plan,
  revision,
  messages: savedMessages,
  onUpdate,
}: {
  trip: TripInput;
  plan: TravelPlan;
  revision: number;
  messages: TripChatMessage[];
  onUpdate: (
    next: {
      plan: TravelPlan;
      messages: TripChatMessage[];
    },
    expectedRevision: number
  ) => TripUpdateResult;
}) {
  const savedPlan = plan;
  const [messages, setMessages] = useState<TripChatMessage[]>(savedMessages);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [saveWarning, setSaveWarning] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const requestToken = useRef(0);
  const mutation = trpc.travel.chat.useMutation();
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, mutation.isPending]);
  useEffect(() => {
    setMessages(savedMessages);
  }, [savedMessages]);

  async function sendMessage(value: string) {
    const message = value.trim();
    if (!message || mutation.isPending) return;
    setDraft("");
    setError("");
    setSaveWarning(false);
    const thisRequestToken = ++requestToken.current;
    const expectedRevision = revision;
    const startingPlan = savedPlan;
    const userTurn = newMessage("user", message);
    const pendingMessages = [...messages, userTurn];
    setMessages(pendingMessages);
    try {
      const precedingHistory: PersistedChatTurn[] = messages
        .slice(-12)
        .map(({ role, content }) => ({ role, content }));
      const result = await mutation.mutateAsync({
        trip,
        plan: startingPlan,
        history: precedingHistory,
        message,
      });
      if (requestToken.current !== thisRequestToken) return;
      const assistantTurn = newMessage(
        "assistant",
        result.reply,
        result.changes
      );
      const nextMessages = [...pendingMessages, assistantTurn];
      const nextPlan = result.plan ?? startingPlan;
      const saveResult = onUpdate(
        { plan: nextPlan, messages: nextMessages },
        expectedRevision
      );
      if (saveResult !== "saved") {
        setSaveWarning(true);
        if (result.plan) {
          const notApplied = newMessage(
            "assistant",
            saveResult === "conflict"
              ? "Il viaggio è cambiato mentre preparavo le modifiche. Non le ho applicate per non sovrascrivere il piano più recente: riapri la chat e riprova."
              : "Ho preparato le modifiche, ma il dispositivo non è riuscito a salvarle. Per sicurezza non ho aggiornato l’itinerario: libera spazio o esporta il viaggio, poi riprova."
          );
          setMessages([...pendingMessages, notApplied]);
          return;
        }
      }
      setMessages(nextMessages);
    } catch (cause) {
      if (requestToken.current !== thisRequestToken) return;
      setMessages(savedMessages);
      setDraft(message);
      setError(
        cause instanceof Error
          ? `Messaggio non inviato: ${cause.message} Puoi riprovare. Il testo resta nel campo qui sotto.`
          : "Messaggio non inviato. Il testo resta nel campo qui sotto; puoi riprovare."
      );
    }
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(draft);
  }
  function keyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(draft);
    }
  }
  function resetChat() {
    if (mutation.isPending) return;
    requestToken.current++;
    if (
      messages.length > 0 &&
      !window.confirm(
        "Iniziare una nuova conversazione? I messaggi precedenti verranno rimossi."
      )
    )
      return;
    const next = [
      newMessage(
        "assistant",
        `Ciao! Sono Dago Travel. Ho il tuo viaggio a ${trip.destination} sott’occhio. Possiamo ripensare insieme itinerario, ritmo e budget: cosa vorresti cambiare?`
      ),
    ];
    setMessages(next);
    setDraft("");
    setError("");
    if (onUpdate({ plan: savedPlan, messages: next }, revision) !== "saved") {
      setMessages(savedMessages);
      setSaveWarning(true);
    }
  }

  return (
    <section className="panel valentina-chat" aria-label="Chat con Dago Travel">
      <div className="chat-heading">
        <div className="chat-avatar">
          <WandSparkles size={20} />
          <i />
        </div>
        <div className="chat-heading-copy">
          <span>IL TUO TRAVEL ASSISTANT</span>
          <h2>Parla con Dago Travel</h2>
          <p>Conosce il tuo viaggio. Insieme lo facciamo tuo.</p>
        </div>
        <button
          type="button"
          className="chat-reset"
          onClick={resetChat}
          title="Nuova conversazione"
          aria-label="Inizia una nuova conversazione"
          disabled={mutation.isPending}
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="chat-context">
        <Sparkles size={15} />
        <span>
          Dago Travel sta usando le informazioni del tuo viaggio a{" "}
          <strong>{trip.destination}</strong>, il budget e l’itinerario attuale.
        </span>
      </div>
      <div
        className="chat-messages"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {!messages.length && (
          <>
            <div className="chat-welcome">
              <div className="chat-welcome-icon">
                <WandSparkles size={29} />
              </div>
              <h3>Ciao, sono Dago Travel.</h3>
              <p>
                Qual è la prima cosa che vorresti cambiare del viaggio a{" "}
                {trip.destination}?
              </p>
            </div>
            <div className="chat-suggestions">
              {ideas.map(idea => (
                <button
                  type="button"
                  key={idea}
                  disabled={mutation.isPending}
                  onClick={() => void sendMessage(idea)}
                >
                  {idea}
                  <span>↗</span>
                </button>
              ))}
            </div>
          </>
        )}
        {messages.map(msg => (
          <article className={`chat-message ${msg.role}`} key={msg.id}>
            <span className="chat-message-avatar">
              {msg.role === "assistant" ? <Sparkles size={13} /> : "T"}
            </span>
            <div className="chat-message-body">
              <span className="chat-sender">
                {msg.role === "assistant" ? "Dago Travel" : "Tu"}
              </span>
              <div className="chat-bubble">{msg.content}</div>
              {msg.changes?.length ? (
                <div className="chat-changes">
                  <span className="chat-changes-title">
                    <Check size={12} /> Modifiche applicate al tuo viaggio
                  </span>
                  {msg.changes.map((change, i) => (
                    <span key={i}>
                      <Check size={11} />
                      {change}
                    </span>
                  ))}
                </div>
              ) : null}
              <time>
                {new Date(msg.createdAt).toLocaleTimeString("it-IT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </article>
        ))}
        {mutation.isPending && (
          <article className="chat-message assistant">
            <span className="chat-message-avatar">
              <Sparkles size={13} />
            </span>
            <div className="chat-message-body">
              <span className="chat-sender">Dago Travel</span>
              <div className="chat-typing">
                <i />
                <i />
                <i /> Sto pensando a una soluzione per il tuo viaggio…
              </div>
            </div>
          </article>
        )}
        <div ref={bottom} />
      </div>
      {saveWarning && (
        <div className="chat-warning" role="status">
          Le modifiche sono visibili in questa sessione ma non è stato possibile
          salvarle sul dispositivo. Esporta il viaggio per conservarle.
        </div>
      )}
      {error && (
        <p className="chat-error" role="alert">
          {error}
        </p>
      )}
      <form className="chat-composer" onSubmit={submit}>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={keyDown}
          maxLength={1500}
          rows={2}
          disabled={mutation.isPending}
          placeholder={`Prova: “Rendi il viaggio a ${trip.destination} più rilassante…”`}
          aria-label="Scrivi un messaggio a Dago Travel"
        />
        <div className="chat-composer-footer">
          <span>Invio per mandare · Maiusc + Invio per andare a capo</span>
          <button
            type="submit"
            className="chat-send"
            aria-label="Invia messaggio"
            disabled={mutation.isPending || !draft.trim()}
          >
            {mutation.isPending ? (
              <Loader2 className="spin" size={17} />
            ) : (
              <ArrowUp size={19} />
            )}
          </button>
        </div>
      </form>
      <p className="chat-disclaimer">
        <Check size={12} /> Dago Travel applica le modifiche confermate
        all’itinerario e al budget, e le salva nel viaggio. I suggerimenti AI e
        i prezzi sono stime da verificare.
      </p>
    </section>
  );
}
