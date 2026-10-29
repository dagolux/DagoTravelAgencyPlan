import { describe, expect, it } from "vitest";
import { italyDate } from "../shared/dates";
import { buildPrompt } from "./travel";
import {
  tripInputSchema,
  travelPlanSchema,
  validateTravelPlanForTrip,
  type TravelPlan,
  type TripInput,
} from "../shared/travel";

const input: TripInput = {
  destination: "Lisbona, Portogallo",
  departure: "Milano",
  startDate: "2099-05-10",
  days: 2,
  travelers: 2,
  budget: 2_000,
  style: "culturale e gastronomico",
  nationality: "italiana",
  preferences: "Musei, quartieri storici e cucina locale",
};

function validPlan(): TravelPlan {
  return {
    summary:
      "Due giornate equilibrate tra quartieri storici, musei e cucina locale a Lisbona.",
    days: [
      {
        day: 1,
        title: "Baixa, Alfama e tramonto sul Tejo",
        activities: [
          {
            time: "09:30",
            title: "Passeggiata nella Baixa",
            description:
              "Esplora a piedi piazze, vie storiche e punti panoramici del centro.",
            location: "Baixa, Lisbona",
            cost: 25,
          },
        ],
      },
      {
        day: 2,
        title: "Belém e i musei sul fiume",
        activities: [
          {
            time: "10:00",
            title: "Visita culturale a Belém",
            description:
              "Dedica la mattina ai monumenti e ai musei della zona fluviale.",
            location: "Belém, Lisbona",
            cost: 75,
          },
        ],
      },
    ],
    hotels: [
      {
        name: "Soggiorno consigliato in Baixa",
        area: "Baixa o Chiado",
        description:
          "Zona centrale, ben collegata e adatta a muoversi a piedi e in metro.",
        nightlyEstimate: 250,
      },
    ],
    flightAdvice:
      "Confronta orari, bagagli, scali e condizioni tariffarie prima di acquistare i biglietti.",
    documentAdvice: [
      "Controlla il documento accettato e la validità residua richiesta per la destinazione.",
    ],
    visaAdvice: [
      "Verifica visto o autorizzazione, durata consentita e requisiti aggiornati su Viaggiare Sicuri.",
    ],
    vaccinationAdvice: [
      "Verifica con fonti sanitarie ufficiali eventuali obblighi per ingresso o transito e le raccomandazioni per il tuo itinerario.",
    ],
    usefulNumbers: [],
    tips: [
      "Prenota le attrazioni più richieste con anticipo e verifica gli orari stagionali.",
    ],
    budget: {
      flights: 800,
      hotels: 500,
      activities: 200,
      transport: 150,
      food: 250,
      reserve: 100,
    },
  };
}

describe("travel shared schemas", () => {
  it("chiede tre sezioni pre-partenza distinte e non deduce transiti sconosciuti", () => {
    const prompt = buildPrompt(input);
    expect(prompt).toContain('"documentAdvice"');
    expect(prompt).toContain('"visaAdvice"');
    expect(prompt).toContain('"vaccinationAdvice"');
    expect(prompt).toContain(
      "Usa scali/transiti solo se esplicitamente indicati nelle preferenze"
    );
    expect(prompt).toContain("Non dare diagnosi né prescrizioni individuali");
  });

  it("accetta un input valido e rifiuta date, limiti e proprietà non previste", () => {
    expect(tripInputSchema.safeParse(input).success).toBe(true);
    expect(
      tripInputSchema.safeParse({ ...input, startDate: "2027-02-29" }).success
    ).toBe(false);
    expect(tripInputSchema.safeParse({ ...input, days: 22 }).success).toBe(
      false
    );
    expect(tripInputSchema.safeParse({ ...input, travelers: 0 }).success).toBe(
      false
    );
    expect(tripInputSchema.safeParse({ ...input, budget: 199 }).success).toBe(
      false
    );
    expect(
      tripInputSchema.safeParse({ ...input, injected: true }).success
    ).toBe(false);
  });

  it("usa il calendario italiano e rifiuta le partenze nel passato", () => {
    expect(italyDate(new Date("2026-10-22T23:30:00Z"))).toBe("2026-10-23");
    expect(
      tripInputSchema.safeParse({ ...input, startDate: "2000-01-01" }).success
    ).toBe(false);
    expect(
      tripInputSchema.safeParse({ ...input, startDate: italyDate() }).success
    ).toBe(true);
  });

  it("protegge il formato del piano da campi e costi non validi", () => {
    const plan = validPlan();
    expect(travelPlanSchema.safeParse(plan).success).toBe(true);
    expect(
      travelPlanSchema.safeParse({ ...plan, unexpected: "no" }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({ ...plan, documentAdvice: [] }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({ ...plan, visaAdvice: [] }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({ ...plan, visaAdvice: undefined }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({ ...plan, vaccinationAdvice: [] }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({
        ...plan,
        vaccinationAdvice: undefined,
      }).success
    ).toBe(false);
    expect(
      travelPlanSchema.safeParse({
        ...plan,
        days: [
          {
            ...plan.days[0],
            activities: [{ ...plan.days[0].activities[0], cost: -1 }],
          },
          plan.days[1],
        ],
      }).success
    ).toBe(false);
  });

  it("richiede giorni sequenziali, budget totale coerente e attività nel relativo budget", () => {
    const plan = validPlan();
    expect(validateTravelPlanForTrip(plan, input)).toMatchObject({
      success: true,
    });

    expect(
      validateTravelPlanForTrip(
        { ...plan, days: [{ ...plan.days[0], day: 2 }, plan.days[1]] },
        input
      )
    ).toMatchObject({ success: false });

    expect(
      validateTravelPlanForTrip(
        { ...plan, budget: { ...plan.budget, reserve: 99 } },
        input
      )
    ).toMatchObject({ success: false });

    expect(
      validateTravelPlanForTrip(
        {
          ...plan,
          days: [
            {
              ...plan.days[0],
              activities: [{ ...plan.days[0].activities[0], cost: 201 }],
            },
            plan.days[1],
          ],
        },
        input
      )
    ).toMatchObject({ success: false });
  });
});
