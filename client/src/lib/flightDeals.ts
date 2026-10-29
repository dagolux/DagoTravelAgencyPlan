export type FlightDeal = {
  id: string;
  airport: "Bari" | "Brindisi";
  airportCode: "BRI" | "BDS";
  destination: string;
  country: string;
  destinationCode: string;
  departDate: string;
  returnDate: string;
  price: number;
  airline: string;
  source: "Skyscanner";
  url: string;
  verifiedAt: string;
  tripType: "Andata e ritorno";
  direct: true;
};

// Snapshot delle offerte mostrate da Skyscanner Italia il 23 ottobre 2026.
// Tariffe e posti possono cambiare: ogni card apre i risultati della ricerca originale.
export const flightDealsVerifiedAt = "2026-10-23";

export const flightDeals: FlightDeal[] = [
  {
    id: "bri-skopje-jan",
    airport: "Bari",
    airportCode: "BRI",
    destination: "Skopje",
    country: "Macedonia del Nord",
    destinationCode: "SKP",
    departDate: "2027-01-15",
    returnDate: "2027-01-25",
    price: 25,
    airline: "Wizz Air",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BRI/SKP/20270115/20270125?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610210449%2AD%2ABRI%2ASKP%2A20270115%2Abcit%2AW6%7C202610210449%2AD%2ASKP%2ABRI%2A20270125%2Abcit%2AW6&pq_prevCurrency=EUR&pq_prevPrice=25",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bri-tirana-may",
    airport: "Bari",
    airportCode: "BRI",
    destination: "Tirana",
    country: "Albania",
    destinationCode: "TIA",
    departDate: "2027-05-13",
    returnDate: "2027-05-16",
    price: 25,
    airline: "Wizz Air Malta",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BRI/TIA/20270513/20270516?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610200533%2AD%2ABRI%2ATIA%2A20270513%2Abcit%2AW4%7C202610200533%2AD%2ATIA%2ABRI%2A20270516%2Abcit%2AW4&pq_prevCurrency=EUR&pq_prevPrice=25",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bri-craiova-jan",
    airport: "Bari",
    airportCode: "BRI",
    destination: "Craiova",
    country: "Romania",
    destinationCode: "CRA",
    departDate: "2027-01-17",
    returnDate: "2027-02-07",
    price: 25,
    airline: "Wizz Air Malta",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BRI/CRA/20270117/20270207?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610211325%2AD%2ABRI%2ACRA%2A20270117%2Askyp%2AW4%7C202610211325%2AD%2ACRA%2ABRI%2A20270207%2Askyp%2AW4&pq_prevCurrency=EUR&pq_prevPrice=25",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bri-sofia-jan",
    airport: "Bari",
    airportCode: "BRI",
    destination: "Sofia",
    country: "Bulgaria",
    destinationCode: "SOF",
    departDate: "2027-01-17",
    returnDate: "2027-01-18",
    price: 27,
    airline: "Wizz Air",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BRI/SOF/20270117/20270118?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610230349%2AD%2ABRI%2ASOF%2A20270117%2Abcit%2AW6%7C202610230349%2AD%2ASOF%2ABRI%2A20270118%2Abcit%2AW6&pq_prevCurrency=EUR&pq_prevPrice=27",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bds-london-dec",
    airport: "Brindisi",
    airportCode: "BDS",
    destination: "Londra Stansted",
    country: "Regno Unito",
    destinationCode: "STN",
    departDate: "2026-12-14",
    returnDate: "2027-01-01",
    price: 45,
    airline: "Ryanair",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BDS/STN/20261214/20270101?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610222221%2AD%2ABDS%2ASTN%2A20261214%2Aryan%2AFR%7C202610222322%2AD%2ASTN%2ABDS%2A20270101%2Aryan%2AFR&pq_prevCurrency=EUR&pq_prevPrice=45",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bds-brussels-jan",
    airport: "Brindisi",
    airportCode: "BDS",
    destination: "Bruxelles Charleroi",
    country: "Belgio",
    destinationCode: "CRL",
    departDate: "2027-01-22",
    returnDate: "2027-01-29",
    price: 46,
    airline: "Ryanair",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BDS/CRL/20270122/20270129?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610222245%2AD%2ABDS%2ACRL%2A20270122%2Aryan%2AFR%7C202610221737%2AD%2ACRL%2ABDS%2A20270129%2Aryan%2AFR&pq_prevCurrency=EUR&pq_prevPrice=46",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bds-eindhoven-dec",
    airport: "Brindisi",
    airportCode: "BDS",
    destination: "Eindhoven",
    country: "Paesi Bassi",
    destinationCode: "EIN",
    departDate: "2026-12-16",
    returnDate: "2027-01-06",
    price: 47,
    airline: "Ryanair",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BDS/EIN/20261216/20270106?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610221846%2AD%2ABDS%2AEIN%2A20261216%2Aryan%2AFR%7C202610221846%2AD%2AEIN%2ABDS%2A20270106%2Aryan%2AFR&pq_prevCurrency=EUR&pq_prevPrice=47",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
  {
    id: "bds-basel-feb",
    airport: "Brindisi",
    airportCode: "BDS",
    destination: "Basilea",
    country: "Svizzera",
    destinationCode: "BSL",
    departDate: "2027-02-23",
    returnDate: "2027-03-02",
    price: 50,
    airline: "easyJet",
    source: "Skyscanner",
    url: "https://www.skyscanner.it/transport/flights/BDS/BSL/20270223/20270302?locale=it-IT&market=IT&currency=EUR&priceSourceId=taps-taps&priceTrace=%7Bbl%7D%3A202610202040%2AD%2ABDS%2ABSL%2A20270223%2Abgit%2AEZY%7C202610202040%2AD%2ABSL%2ABDS%2A20270302%2Abgit%2AEZY&pq_prevCurrency=EUR&pq_prevPrice=50",
    verifiedAt: flightDealsVerifiedAt,
    tripType: "Andata e ritorno",
    direct: true,
  },
];

export const skyscannerAirportUrls = {
  BRI: "https://www.skyscanner.it/voli-da/bri/voli-economici-da-bari-aeroporto.html",
  BDS: "https://www.skyscanner.it/voli-da/bds/voli-economici-da-brindisi-aeroporto.html",
};
