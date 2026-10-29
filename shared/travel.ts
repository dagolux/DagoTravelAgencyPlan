import { z } from "zod";
import { italyDate } from "./dates";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_EUR = 50_000;

function isCalendarDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const daysInMonth = [
    31,
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day <= daysInMonth[month - 1];
}

const requiredInputText = (label: string, max: number) =>
  z
    .string({ error: `${label} non è valido.` })
    .trim()
    .min(2, `${label} è obbligatorio.`)
    .max(max, `${label} è troppo lungo.`);

/** Input pubblico per la generazione di un itinerario. */
export const tripInputSchema = z
  .object({
    destination: requiredInputText("La destinazione", 120),
    departure: requiredInputText("La città di partenza", 120),
    startDate: z
      .string({ error: "La data di inizio non è valida." })
      .regex(ISO_DATE, "Usa la data nel formato AAAA-MM-GG.")
      .refine(isCalendarDate, "Inserisci una data di calendario valida.")
      .refine(
        value => value >= italyDate(),
        "La partenza non può essere nel passato (calendario italiano)."
      ),
    days: z
      .number({ error: "Il numero di giorni non è valido." })
      .int("Il numero di giorni deve essere intero.")
      .min(1, "Il viaggio deve durare almeno un giorno.")
      .max(21, "Il viaggio può durare al massimo 21 giorni."),
    travelers: z
      .number({ error: "Il numero di viaggiatori non è valido." })
      .int("Il numero di viaggiatori deve essere intero.")
      .min(1, "Indica almeno un viaggiatore.")
      .max(8, "Sono ammessi al massimo otto viaggiatori."),
    budget: z
      .number({ error: "Il budget non è valido." })
      .finite("Il budget deve essere un numero finito.")
      .min(200, "Il budget totale deve essere almeno 200 EUR.")
      .max(MAX_EUR, "Il budget totale non può superare 50.000 EUR."),
    style: requiredInputText("Lo stile di viaggio", 120),
    nationality: requiredInputText("La nazionalità", 120),
    preferences: z
      .string({ error: "Le preferenze non sono valide." })
      .trim()
      .max(1_000, "Le preferenze sono troppo lunghe."),
  })
  .strict();

export type TripInput = z.infer<typeof tripInputSchema>;

const outputText = (label: string, min: number, max: number) =>
  z
    .string({ error: `${label} non è valido.` })
    .trim()
    .min(min, `${label} è troppo breve.`)
    .max(max, `${label} è troppo lungo.`);

const euroAmount = (label: string) =>
  z
    .number({ error: `${label} non è valido.` })
    .finite(`${label} deve essere un numero finito.`)
    .min(0, `${label} non può essere negativo.`)
    .max(MAX_EUR, `${label} è troppo elevato.`);

const activitySchema = z
  .object({
    time: outputText("L'orario", 1, 40),
    title: outputText("Il titolo dell'attività", 2, 160),
    description: outputText("La descrizione dell'attività", 8, 600),
    location: outputText("Il luogo dell'attività", 2, 180),
    cost: euroAmount("Il costo dell'attività"),
  })
  .strict();

const daySchema = z
  .object({
    day: z
      .number({ error: "Il giorno dell'itinerario non è valido." })
      .int("Il giorno dell'itinerario deve essere intero.")
      .min(1, "Il giorno dell'itinerario deve essere positivo.")
      .max(21, "Il giorno dell'itinerario non può superare 21."),
    title: outputText("Il titolo della giornata", 2, 180),
    activities: z
      .array(activitySchema, { error: "Le attività non sono valide." })
      .min(1, "Ogni giornata deve includere almeno un'attività.")
      .max(6, "Ogni giornata può includere al massimo sei attività."),
  })
  .strict();

const hotelSchema = z
  .object({
    name: outputText("Il nome della struttura", 2, 180),
    area: outputText("La zona della struttura", 2, 180),
    description: outputText("La descrizione della struttura", 8, 600),
    nightlyEstimate: euroAmount("La stima notturna della struttura"),
  })
  .strict();

const usefulNumberSchema = z
  .object({
    label: outputText("L'etichetta del numero utile", 2, 120),
    number: outputText("Il numero utile", 2, 60),
    note: outputText("La nota del numero utile", 2, 300),
  })
  .strict();

const budgetSchema = z
  .object({
    flights: euroAmount("Il budget voli"),
    hotels: euroAmount("Il budget hotel"),
    activities: euroAmount("Il budget attività"),
    transport: euroAmount("Il budget trasporti"),
    food: euroAmount("Il budget pasti"),
    reserve: euroAmount("Il budget di riserva"),
  })
  .strict();

/** Schema del risultato AI. Tutti gli importi sono stime in EUR per l'intero gruppo. */
export const travelPlanSchema = z
  .object({
    summary: outputText("Il riepilogo", 20, 1_200),
    days: z
      .array(daySchema, { error: "Le giornate non sono valide." })
      .min(1, "L'itinerario deve avere almeno una giornata.")
      .max(21, "L'itinerario può avere al massimo 21 giornate."),
    hotels: z
      .array(hotelSchema, { error: "Le strutture non sono valide." })
      .min(1, "Indica almeno una struttura o una zona dove soggiornare.")
      .max(5, "Indica al massimo cinque strutture o zone."),
    flightAdvice: outputText("Il consiglio sui voli", 20, 1_000),
    documentAdvice: z
      .array(outputText("Il consiglio sui documenti", 12, 700), {
        error: "I consigli sui documenti non sono validi.",
      })
      .min(1, "Indica almeno un consiglio su documenti e visti.")
      .max(10, "Indica al massimo dieci consigli sui documenti."),
    visaAdvice: z
      .array(outputText("Il consiglio su visti e autorizzazioni", 12, 700), {
        error: "I consigli su visti e autorizzazioni non sono validi.",
      })
      .min(1, "Indica almeno un consiglio su visti e autorizzazioni.")
      .max(10, "Indica al massimo dieci consigli su visti e autorizzazioni."),
    vaccinationAdvice: z
      .array(outputText("Il consiglio su vaccinazioni e salute", 12, 700), {
        error: "I consigli su vaccinazioni e salute non sono validi.",
      })
      .min(1, "Indica almeno un consiglio su vaccinazioni e salute.")
      .max(10, "Indica al massimo dieci consigli su vaccinazioni e salute."),
    usefulNumbers: z
      .array(usefulNumberSchema, { error: "I numeri utili non sono validi." })
      .max(10, "Indica al massimo dieci numeri utili."),
    tips: z
      .array(outputText("Il suggerimento", 8, 500), {
        error: "I suggerimenti non sono validi.",
      })
      .min(1, "Indica almeno un suggerimento.")
      .max(12, "Indica al massimo dodici suggerimenti."),
    budget: budgetSchema,
  })
  .strict();

export type TravelPlan = z.infer<typeof travelPlanSchema>;

export type TravelPlanValidationResult =
  | { success: true; data: TravelPlan }
  | { success: false; message: string };

const budgetKeys = [
  "flights",
  "hotels",
  "activities",
  "transport",
  "food",
  "reserve",
] as const;

/**
 * Verifica i vincoli che dipendono dalla richiesta originale, oltre allo schema
 * statico del piano restituito dal modello.
 */
export function validateTravelPlanForTrip(
  value: unknown,
  trip: TripInput
): TravelPlanValidationResult {
  const parsed = travelPlanSchema.safeParse(value);
  if (!parsed.success) {
    return {
      success: false,
      message: "Il formato del piano generato non è valido.",
    };
  }

  const plan = parsed.data;
  if (plan.days.length !== trip.days) {
    return {
      success: false,
      message: "Il piano non contiene il numero di giorni richiesto.",
    };
  }

  if (plan.days.some((item, index) => item.day !== index + 1)) {
    return {
      success: false,
      message: "I giorni del piano non sono in sequenza.",
    };
  }

  const totalBudget = budgetKeys.reduce(
    (total, key) => total + plan.budget[key],
    0
  );
  if (Math.abs(totalBudget - trip.budget) > 0.01) {
    return {
      success: false,
      message: "La ripartizione del budget non coincide con il budget totale.",
    };
  }

  const listedActivityCost = plan.days.reduce(
    (total, item) =>
      total +
      item.activities.reduce(
        (dayTotal, activity) => dayTotal + activity.cost,
        0
      ),
    0
  );
  if (listedActivityCost - plan.budget.activities > 0.01) {
    return {
      success: false,
      message: "Il costo delle attività supera il budget attività.",
    };
  }

  return { success: true, data: plan };
}
