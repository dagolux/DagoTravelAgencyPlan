import type { TripInput, TravelPlan } from "@shared/travel";
import { italyDate } from "@shared/dates";

export const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    image: "/manus-storage/bali_16b74246.webp",
    tag: "Un po’ di paradiso",
    style: "Relax",
    days: 10,
    budget: 3200,
    description: "Oceano, templi e piccoli momenti da ricordare.",
    color: "#dceafa",
  },
  {
    name: "Lisbona",
    country: "Portogallo",
    image: "/manus-storage/lisbon_df9a4cf4.jpg",
    tag: "Per anime curiose",
    style: "Cultura",
    days: 5,
    budget: 1800,
    description: "Vicoli colorati, tram e tramonti sull’Atlantico.",
    color: "#f2e4d2",
  },
  {
    name: "Dolomiti",
    country: "Italia",
    image: "/manus-storage/dolomites_337ed3a1.jpg",
    tag: "Respira, sei qui",
    style: "Avventura",
    days: 4,
    budget: 1200,
    description: "Laghi silenziosi e sentieri tra le montagne.",
    color: "#e2eaf5",
  },
];
export const styleNames = [
  "Relax",
  "Avventura",
  "Cultura",
  "Gastronomia",
  "Lusso",
  "Economico",
];
export const euro = (value: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
export const defaultInput = (): TripInput => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return {
    destination: "",
    departure: "Milano",
    startDate: italyDate(date),
    days: 5,
    travelers: 2,
    budget: 1800,
    style: "Cultura",
    nationality: "Italiana",
    preferences: "",
  };
};
export type SavedTrip = {
  id: string;
  /** Versione locale per rifiutare gli aggiornamenti basati su uno snapshot superato. */
  revision?: number;
  input: TripInput;
  plan: TravelPlan;
  chat?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    changes?: string[];
    createdAt: string;
  }>;
  checklist: string[];
  createdAt: string;
};
export const legacyDocumentAdvice = [
  "Questo viaggio è stato creato prima del dettaglio dedicato ai documenti. Verifica quale documento è accettato e la validità residua richiesta per la destinazione.",
];
export const legacyVisaAdvice = [
  "Questo viaggio è stato creato prima del dettaglio dedicato a visti e autorizzazioni. Verifica l’esenzione o l’eventuale visto/autorizzazione e la durata consentita per la tua cittadinanza.",
];
export const legacyVaccinationAdvice = [
  "Questo viaggio è stato creato prima delle indicazioni vaccinali dedicate. Non sono presenti raccomandazioni specifiche: verifica requisiti e consigli per destinazione, stagione e scali con il Ministero della Salute o un centro di medicina dei viaggi.",
];
export function normalizeSavedTrips(trips: SavedTrip[]): SavedTrip[] {
  return trips.map(trip => {
    const documentAdvice =
      Array.isArray(trip.plan?.documentAdvice) &&
      trip.plan.documentAdvice.length > 0
        ? trip.plan.documentAdvice
        : [...legacyDocumentAdvice];
    const visaAdvice =
      Array.isArray(trip.plan?.visaAdvice) && trip.plan.visaAdvice.length > 0
        ? trip.plan.visaAdvice
        : [...legacyVisaAdvice];
    const vaccinationAdvice =
      Array.isArray(trip.plan?.vaccinationAdvice) &&
      trip.plan.vaccinationAdvice.length > 0
        ? trip.plan.vaccinationAdvice
        : [...legacyVaccinationAdvice];
    if (
      documentAdvice === trip.plan.documentAdvice &&
      visaAdvice === trip.plan.visaAdvice &&
      vaccinationAdvice === trip.plan.vaccinationAdvice
    ) {
      return trip;
    }
    return {
      ...trip,
      plan: {
        ...trip.plan,
        documentAdvice,
        visaAdvice,
        vaccinationAdvice,
      },
    };
  });
}
export type TripUpdateResult = "saved" | "conflict" | "storage-error";
export function loadLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}
export function saveLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function tripImage(destination: string) {
  const match = destinations.find(d =>
    destination.toLowerCase().includes(d.name.toLowerCase())
  );
  return match?.image;
}
export const checklistItems = [
  {
    id: "identity",
    title: "Documento d’identità o passaporto",
    detail:
      "Controlla validità residua e documento accettato per la destinazione.",
  },
  {
    id: "visa",
    title: "Visti e requisiti d’ingresso",
    detail: "Verifica in base a cittadinanza, scali e durata del soggiorno.",
  },
  {
    id: "insurance",
    title: "Assicurazione di viaggio",
    detail: "Valuta copertura medica, assistenza e annullamento.",
  },
  {
    id: "bookings",
    title: "Prenotazioni e biglietti",
    detail: "Conserva conferme di hotel, trasporti e attività anche offline.",
  },
  {
    id: "health",
    title: "Salute e farmaci",
    detail: "Verifica le indicazioni sanitarie ufficiali prima di partire.",
  },
  {
    id: "copies",
    title: "Copie digitali e contatti",
    detail: "Salva documenti e recapiti in modo sicuro, accessibile offline.",
  },
];
