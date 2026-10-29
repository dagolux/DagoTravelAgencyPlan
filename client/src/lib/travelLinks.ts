export type TravelLinkCategoryId =
  | "flights"
  | "stays"
  | "insurance"
  | "documents"
  | "safety"
  | "tools";

export type TravelResource = {
  name: string;
  description: string;
  url: string;
  label: string;
};

export type TravelLinkCategory = {
  id: TravelLinkCategoryId;
  title: string;
  eyebrow: string;
  description: string;
  links: TravelResource[];
};

// Link verificati sulle pagine ufficiali o istituzionali consultate il 22 ottobre 2026.
export const travelLinkCategories: TravelLinkCategory[] = [
  {
    id: "flights",
    title: "Voli e comparatori",
    eyebrow: "Trova la rotta giusta",
    description: "Confronta date, tariffe e opzioni prima di prenotare.",
    links: [
      {
        name: "Skyscanner",
        description: "Confronta voli e cerca anche alloggi e auto a noleggio.",
        url: "https://www.skyscanner.it/",
        label: "Comparatore",
      },
      {
        name: "KAYAK",
        description:
          "Cerca voli, soggiorni e auto confrontando più siti di viaggio.",
        url: "https://www.kayak.it/flights",
        label: "Comparatore",
      },
      {
        name: "Google Voli",
        description:
          "Esplora date flessibili, confronta tariffe e monitora i prezzi.",
        url: "https://www.google.com/travel/flights?gl=IT&hl=it",
        label: "Ricerca voli",
      },
    ],
  },
  {
    id: "stays",
    title: "Hotel e soggiorni",
    eyebrow: "Un posto dove sentirti bene",
    description: "Esplora strutture e confronta le condizioni di soggiorno.",
    links: [
      {
        name: "Booking.com",
        description: "Cerca hotel, appartamenti e altre tipologie di alloggio.",
        url: "https://www.booking.com/index.it.html",
        label: "Prenotazioni",
      },
      {
        name: "trivago",
        description: "Confronta i prezzi degli hotel proposti da diversi siti.",
        url: "https://www.trivago.it/",
        label: "Comparatore hotel",
      },
      {
        name: "KAYAK Soggiorni",
        description:
          "Cerca hotel e soggiorni con filtri per località e preferenze.",
        url: "https://www.kayak.it/stays",
        label: "Ricerca soggiorni",
      },
    ],
  },
  {
    id: "insurance",
    title: "Assicurazioni viaggio",
    eyebrow: "Parti con più consapevolezza",
    description:
      "Consulta le coperture direttamente con gli operatori e leggi tutte le condizioni.",
    links: [
      {
        name: "Allianz Partners",
        description:
          "Informazioni su assistenza sanitaria, annullamento e bagagli.",
        url: "https://www.allianz-assicurazioneviaggio.it/assicurazione-viaggi.html",
        label: "Assicurazione",
      },
      {
        name: "Redion",
        description:
          "Sito ufficiale del nuovo nome di Europ Assistance; consulta le soluzioni viaggio.",
        url: "https://www.redion.it/prodotti-per-te/viaggi",
        label: "Assicurazione e assistenza",
      },
    ],
  },
  {
    id: "documents",
    title: "Documenti e requisiti",
    eyebrow: "Controlla prima di partire",
    description:
      "Le regole dipendono dalla destinazione, dalla cittadinanza e dal tipo di viaggio.",
    links: [
      {
        name: "Farnesina — Viaggiare all’estero",
        description:
          "Indicazioni su passaporti, visti, minori, assistenza e documenti smarriti.",
        url: "https://www.esteri.it/it/ministero/sportello_info/domandefrequenti/sezione_viaggiare/",
        label: "Fonte istituzionale",
      },
      {
        name: "Your Europe — Documenti UE",
        description:
          "Informazioni ufficiali sui documenti di viaggio per cittadini dell’Unione europea.",
        url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_it.htm",
        label: "Unione europea",
      },
    ],
  },
  {
    id: "safety",
    title: "Sicurezza in viaggio",
    eyebrow: "Informati sulle fonti ufficiali",
    description:
      "Consulta gli avvisi aggiornati e i servizi dell’Unità di Crisi della Farnesina.",
    links: [
      {
        name: "Viaggiare Sicuri",
        description:
          "Schede Paese e avvisi ufficiali su sicurezza, salute e condizioni di viaggio.",
        url: "https://www.viaggiaresicuri.it/",
        label: "Farnesina · Unità di Crisi",
      },
      {
        name: "Dove Siamo nel Mondo",
        description:
          "Servizio Farnesina per segnalare il viaggio e facilitare i contatti in caso di grave emergenza.",
        url: "https://www.dovesiamonelmondo.it/",
        label: "Servizio istituzionale",
      },
    ],
  },
  {
    id: "tools",
    title: "Strumenti utili",
    eyebrow: "Piccoli aiuti, ovunque",
    description:
      "Pianifica gli spostamenti, orientati e controlla i cambi valutari.",
    links: [
      {
        name: "Rome2Rio",
        description:
          "Confronta percorsi e combinazioni di trasporto tra due località.",
        url: "https://www.rome2rio.com/map",
        label: "Itinerari e trasporti",
      },
      {
        name: "Google Maps",
        description: "Consulta mappe, luoghi e indicazioni stradali.",
        url: "https://maps.google.com/",
        label: "Mappe e indicazioni",
      },
      {
        name: "Xe Currency Converter",
        description:
          "Converti valute e consulta il tasso medio indicativo di mercato.",
        url: "https://www.xe.com/currencyconverter/",
        label: "Cambio valuta",
      },
    ],
  },
];
