export type ParkingAirportId = "bari" | "brindisi";

export const airportParkingRadiusMeters = 5000;

export type ParkingCoordinates = {
  lat: number;
  lng: number;
};

export type AirportParkingLot = {
  id: string;
  name: string;
  type: "Ufficiale" | "Privato";
  address: string;
  coordinates?: ParkingCoordinates;
  distanceLabel: string;
  priceHeadline: string;
  priceDetails: string;
  services: string[];
  sourceUrl: string;
  sourceLabel: string;
  priceSourceUrl?: string;
  priceSourceLabel?: string;
  bookingUrl: string;
};

export type AirportParkingAirport = {
  id: ParkingAirportId;
  city: string;
  iata: string;
  name: string;
  address: string;
  center: ParkingCoordinates;
  lots: AirportParkingLot[];
};

export const parkingSourcesCheckedAt = "25 ottobre 2026";

export const airportParkingAirports: AirportParkingAirport[] = [
  {
    id: "bari",
    city: "Bari",
    iata: "BRI",
    name: "Aeroporto di Bari Karol Wojtyła",
    address: "Viale Enzo Ferrari, 70128 Bari",
    center: { lat: 41.1389, lng: 16.7606 },
    lots: [
      {
        id: "bari-apcoa",
        name: "Parcheggi ufficiali APCOA — P1, P2 e P3",
        type: "Ufficiale",
        address: "Viale Enzo Ferrari, 70128 Bari — area terminal",
        distanceLabel:
          "Nel complesso aeroportuale, a pochi minuti dal terminal",
        priceHeadline: "Da 9 € al giorno",
        priceDetails:
          "Tariffe APCOA pubblicate: P3B 9 €/giorno, P3A/P3C 10 €, P2 20,50 €, PM 26 €, P1AB 28 € e P1 37 € al giorno. La pagina dell’aeroporto indica invece per P3 50 €/settimana e 8,50 € per ogni giorno successivo; controlla area, durata e importo finale sui portali ufficiali.",
        services: [
          "Aree scoperte e parcheggio multipiano",
          "Apertura 24 ore su 24",
          "Videosorveglianza e parcheggio presidiato",
          "Posti accessibili e opzioni Telepass",
        ],
        sourceUrl: "https://www.apcoa.it/sosta-breve/sedi/aeroporto-di-bari",
        sourceLabel: "APCOA — tariffe e servizi",
        priceSourceUrl:
          "https://bari.airports.aeroportidipuglia.it/en/da-e-per-gli-aeroporti/type/parcheggi/",
        priceSourceLabel: "Aeroporti di Puglia",
        bookingUrl: "https://booking.apcoa.it/",
      },
      {
        id: "bari-next-stop",
        name: "Next Stop Parking",
        type: "Privato",
        address: "Via Giuseppe Mirizzi, 3/3A, 70132 Bari",
        distanceLabel:
          "Circa 4,4 km secondo MyParking; navetta per il terminal in circa 6–8 minuti",
        priceHeadline: "33,49 € per 8 giorni",
        priceDetails:
          "Esempio pubblicato da ParkMundo il 10 settembre 2026 per 8 giorni di sosta; non è una tariffa garantita. Il preventivo dipende dalle date e dalla disponibilità.",
        services: [
          "Navetta per l’aeroporto",
          "Parcheggio scoperto e videosorvegliato",
          "Area illuminata e accesso recintato",
          "Autolavaggio disponibile come extra",
        ],
        sourceUrl:
          "https://www.myparking.eu/parcheggio_aeroporto_bari_palese.php",
        sourceLabel: "MyParking — distanza indicata",
        priceSourceUrl:
          "https://www.parkmundo.it/blog/top-5-parcheggio-low-cost-bari-aeroporto",
        priceSourceLabel: "ParkMundo — confronto prezzi, 10/09/2026",
        bookingUrl:
          "https://www.parkmundo.it/parcheggio-aeroporto-bari/next-stop-parking",
      },
      {
        id: "bari-flycar",
        name: "Flycar Parking — navetta scoperto",
        type: "Privato",
        address: "Via Napoli, 404, 70128 Bari",
        coordinates: { lat: 41.145944, lng: 16.792481 },
        distanceLabel:
          "Nel raggio di 5 km in linea d’aria; il gestore indica 6,3 km su strada",
        priceHeadline: "Preventivo in base alle date",
        priceDetails:
          "La tariffa viene calcolata selezionando date, orari e veicolo sul sito di prenotazione.",
        services: [
          "Navetta gratuita su richiesta, circa 10 minuti",
          "Parcheggio scoperto, recintato e custodito",
          "Aperto 24 ore su 24",
          "Puoi tenere le chiavi oppure consegnarle",
        ],
        sourceUrl:
          "https://www.looking4.com/it/parcheggio-aeroporto/bari-bri/flycar-parking-navetta-scoperto/13280",
        sourceLabel: "Looking4 — indirizzo, coordinate e servizi",
        bookingUrl:
          "https://www.looking4.com/it/parcheggio-aeroporto/bari-bri/flycar-parking-navetta-scoperto/13280",
      },
    ],
  },
  {
    id: "brindisi",
    city: "Brindisi",
    iata: "BDS",
    name: "Aeroporto del Salento",
    address: "Contrada Baroncino, 72100 Brindisi",
    center: { lat: 40.6576, lng: 17.9478 },
    lots: [
      {
        id: "brindisi-saba-p9",
        name: "SABA P9 Easy — Low Cost",
        type: "Ufficiale",
        address: "Contrada Baroncino 2, 72100 Brindisi",
        coordinates: { lat: 40.6562459, lng: 17.9358048 },
        distanceLabel: "A circa 3 minuti a piedi dal terminal",
        priceHeadline: "10–12 € per il primo giorno",
        priceDetails:
          "SABA pubblica 12 € dal 1° aprile al 30 novembre e 10 € dal 1° dicembre al 31 marzo per il primo giorno; i successivi costano 5 €/giorno. La pagina tariffaria dell’aeroporto indica 15 € per 24 ore: le fonti ufficiali differiscono, quindi verifica il totale prima della partenza.",
        services: [
          "Parcheggio scoperto, circa 266 posti",
          "Aperto 24 ore su 24",
          "Videosorvegliato e con posti accessibili",
          "Raggiungibile a piedi dal terminal",
        ],
        sourceUrl:
          "https://www.sabait.it/it/parking-saba-aeroporto-del-salento-easy-p9",
        sourceLabel: "SABA — tariffe e servizi P9",
        priceSourceUrl:
          "https://brindisi.airports.aeroportidipuglia.it/en/da-e-per-gli-aeroporti/type/parcheggi/",
        priceSourceLabel: "Aeroporti di Puglia",
        bookingUrl:
          "https://www.sabait.it/it/parking-saba-aeroporto-del-salento-easy-p9",
      },
      {
        id: "brindisi-saba-p1",
        name: "SABA P1 Top & Comfort",
        type: "Ufficiale",
        address: "Contrada Baroncino 1, 72011 Brindisi",
        coordinates: { lat: 40.6573356, lng: 17.9372973 },
        distanceLabel: "Di fronte all’ingresso del terminal",
        priceHeadline: "17–19 € al giorno",
        priceDetails:
          "Tariffa del primo giorno pubblicata da SABA: 19 € dal 1° aprile al 30 novembre e 17 € dal 1° dicembre al 31 marzo. Per la prenotazione online multigiornaliera SABA mostra 19 € + 3 € di diritti di prevendita per ogni giorno; verifica il totale prima di confermare.",
        services: [
          "Parcheggio scoperto con circa 405 posti",
          "Apertura 24 ore su 24",
          "Varco Telepass e sorveglianza",
          "Disponibile anche un’area coperta Top Car separata",
        ],
        sourceUrl:
          "https://www.sabait.it/it/parcheggio-brindisi/parcheggio-saba-aeroporto-del-salento-top-comfort-p1-",
        sourceLabel: "SABA — tariffe e servizi P1",
        priceSourceUrl:
          "https://brindisi.airports.aeroportidipuglia.it/en/da-e-per-gli-aeroporti/type/parcheggi/",
        priceSourceLabel: "Aeroporti di Puglia",
        bookingUrl:
          "https://www.sabait.it/it/parcheggio-brindisi/parcheggio-saba-aeroporto-del-salento-top-comfort-p1-",
      },
      {
        id: "brindisi-parkingo",
        name: "ParkinGO Brindisi Casale",
        type: "Privato",
        address: "Strada Provinciale per San Vito, 237/1, 72100 Brindisi",
        coordinates: { lat: 40.644607, lng: 17.917218 },
        distanceLabel:
          "Circa 3 km in linea d’aria; il gestore indica 3,5 km dal terminal",
        priceHeadline: "Da 3,49 € al giorno",
        priceDetails:
          "Prezzo pubblicato dal gestore per una prenotazione di 14 giorni; la tariffa effettiva dipende da date, orari, copertura e disponibilità.",
        services: [
          "Navetta gratuita 24 ore su 24, andata e ritorno",
          "Coperto o scoperto, secondo l’opzione prenotata",
          "Assicurazione furto e incendio inclusa",
          "Videosorveglianza; autolavaggio e car valet come extra",
        ],
        sourceUrl:
          "https://www.parkingo.com/it/parcheggio-aeroporto-brindisi-casale",
        sourceLabel: "ParkinGO — prezzi e servizi",
        bookingUrl:
          "https://www.parkingo.com/it/parcheggio-aeroporto-brindisi-casale",
      },
    ],
  },
];
