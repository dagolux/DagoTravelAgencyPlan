import { z } from "zod";
import {
  tripInputSchema,
  travelPlanSchema,
  validateTravelPlanForTrip,
  type TravelPlan,
  type TripInput,
} from "./travel";

const chatText = (label: string, max: number) =>
  z
    .string({ error: `${label} non è valido.` })
    .trim()
    .min(1, `${label} è obbligatorio.`)
    .max(max, `${label} è troppo lungo.`);

/** Un singolo messaggio della conversazione relativa al piano di viaggio. */
export const chatTurnSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: chatText("Il messaggio", 4_000),
  })
  .strict();

/** Dati necessari al backend per rispondere nel contesto del piano corrente. */
export const travelChatInputSchema = z
  .object({
    trip: tripInputSchema,
    plan: travelPlanSchema,
    history: z
      .array(chatTurnSchema, {
        error: "La cronologia della chat non è valida.",
      })
      .max(20, "La cronologia può contenere al massimo venti messaggi."),
    message: chatText("Il messaggio", 1_500),
  })
  .strict();

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
    .max(50_000, `${label} è troppo elevato.`);

const activitySchema = z
  .object({
    time: outputText("L'orario", 1, 40),
    title: outputText("Il titolo dell'attività", 2, 160),
    description: outputText("La descrizione dell'attività", 8, 600),
    location: outputText("Il luogo dell'attività", 2, 180),
    cost: euroAmount("Il costo dell'attività"),
  })
  .strict();

const dayPatchSchema = z
  .object({
    day: z.number().int().min(1).max(21),
    title: outputText("Il titolo della giornata", 2, 180),
    activities: z.array(activitySchema).min(1).max(6),
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

/** Modifica solo i campi esplicitamente richiesti; null/vuoti li lasciano intatti. */
export const travelPlanPatchSchema = z
  .object({
    summary: outputText("Il riepilogo", 20, 1_200).nullable(),
    days: z.array(dayPatchSchema).max(21),
    hotels: z.array(hotelSchema).min(1).max(5).nullable(),
    flightAdvice: outputText("Il consiglio sui voli", 20, 1_000).nullable(),
    documentAdvice: z
      .array(outputText("Il consiglio sui documenti", 12, 700))
      .min(1)
      .max(10)
      .nullable(),
    visaAdvice: z
      .array(outputText("Il consiglio su visti e autorizzazioni", 12, 700))
      .min(1)
      .max(10)
      .nullable(),
    vaccinationAdvice: z
      .array(outputText("Il consiglio su vaccinazioni e salute", 12, 700))
      .min(1)
      .max(10)
      .nullable(),
    usefulNumbers: z.array(usefulNumberSchema).max(10).nullable(),
    tips: z
      .array(outputText("Il suggerimento", 8, 500))
      .min(1)
      .max(12)
      .nullable(),
    budget: budgetSchema.nullable(),
  })
  .strict();

export type TravelPlanPatch = z.infer<typeof travelPlanPatchSchema>;
export type TravelChatInput = z.infer<typeof travelChatInputSchema>;
export type TravelChatOutput = {
  reply: string;
  plan: TravelPlan | null;
  changes: string[];
};

/** Output breve del modello, verificato prima di applicare la patch lato server. */
export const travelChatModelOutputSchema = z
  .object({
    reply: chatText("La risposta", 1_200),
    patch: travelPlanPatchSchema,
    changes: z.array(chatText("La modifica", 140)).max(6),
  })
  .strict();

/** Contratto finale inviato alla UI. */
export const travelChatOutputSchema = z
  .object({
    reply: chatText("La risposta", 1_200),
    plan: travelPlanSchema.nullable(),
    changes: z.array(chatText("La modifica", 140)).max(6),
  })
  .strict();

export type TravelChatModelOutput = z.infer<typeof travelChatModelOutputSchema>;

const budgetKeys = [
  "flights",
  "hotels",
  "activities",
  "transport",
  "food",
  "reserve",
] as const;

/** Applica le sole patch elencate, quindi verifica tutto il piano risultante. */
export function applyTravelChatPatch(
  current: TravelPlan,
  patch: TravelPlanPatch,
  trip: TripInput
): { success: true; changed: boolean; data: TravelPlan } | { success: false } {
  const dayMap = new Map<number, (typeof patch.days)[number]>();
  for (const item of patch.days) {
    if (
      dayMap.has(item.day) ||
      !current.days.some(day => day.day === item.day)
    ) {
      return { success: false };
    }
    dayMap.set(item.day, item);
  }

  const next: TravelPlan = {
    ...current,
    ...(patch.summary !== null ? { summary: patch.summary } : {}),
    days: current.days.map(day => {
      const changedDay = dayMap.get(day.day);
      return changedDay
        ? {
            day: changedDay.day,
            title: changedDay.title,
            activities: changedDay.activities,
          }
        : day;
    }),
    ...(patch.hotels !== null ? { hotels: patch.hotels } : {}),
    ...(patch.flightAdvice !== null
      ? { flightAdvice: patch.flightAdvice }
      : {}),
    ...(patch.documentAdvice !== null
      ? { documentAdvice: patch.documentAdvice }
      : {}),
    ...(patch.visaAdvice !== null ? { visaAdvice: patch.visaAdvice } : {}),
    ...(patch.vaccinationAdvice !== null
      ? { vaccinationAdvice: patch.vaccinationAdvice }
      : {}),
    ...(patch.usefulNumbers !== null
      ? { usefulNumbers: patch.usefulNumbers }
      : {}),
    ...(patch.tips !== null ? { tips: patch.tips } : {}),
    ...(patch.budget !== null ? { budget: patch.budget } : {}),
  };

  const changed = JSON.stringify(next) !== JSON.stringify(current);
  if (!changed) return { success: true, changed: false, data: current };

  const effectiveTripBudget = budgetKeys.reduce(
    (total, key) => total + current.budget[key],
    0
  );
  const validation = validateTravelPlanForTrip(next, {
    ...trip,
    budget: effectiveTripBudget,
  });
  if (!validation.success) return { success: false };
  return { success: true, changed: true, data: validation.data };
}

// Alias concisi per i consumatori che importano gli schemi come contratti di chat.
export const chatInputSchema = travelChatInputSchema;
export const chatOutputSchema = travelChatOutputSchema;
