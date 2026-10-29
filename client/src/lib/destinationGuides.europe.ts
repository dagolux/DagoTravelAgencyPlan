import type { DestinationGuideData } from "./destinationGuideTypes";

export const europeanDestinationGuides: DestinationGuideData[] = [
  {
    id: "albania",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Albania",
    city: "Tirana",
    italianCitizenDocuments:
      "Per turismo breve le fonti consultate indicano passaporto oppure CIE valida per l’espatrio e in buono stato. Verifica la validità residua richiesta prima di partire: la scheda Farnesina consultata non era più valida alla data di questa verifica.",
    entryRules:
      "Le fonti ufficiali indicano l’esenzione dal visto per turisti italiani fino a 90 giorni; la Farnesina conteggia un arco di 6 mesi, mentre l’autorità albanese usa 180 giorni. Verifica il conteggio applicabile prima di partire; per soggiorni più lunghi o altri scopi servono regole diverse.",
    travelAdvice: [
      "Guida con prudenza: la Farnesina segnala manto stradale irregolare e rispetto scarso delle regole; sconsiglia di guidare di notte fuori dai centri urbani.",
      "A Tirana la scheda consultata indica 112 per la polizia e 127 per l’ambulanza; verifica i numeri locali aggiornati quando arrivi.",
      "La stessa scheda segnala strutture sanitarie pubbliche carenti: porta con te i farmaci necessari e valuta una copertura sanitaria adeguata.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Albania (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/ALB.pdf",
        supports:
          "Documenti, soggiorno, sicurezza e salute; la scheda consultata indica un aggiornamento/validità precedente al 23 ottobre 2026.",
      },
      {
        title: "Ministero degli Esteri albanese — Regime dei visti",
        url: "https://punetejashtme.gov.al/en/regjimi-i-vizave-per-te-huajt/",
        supports:
          "Esenzione dal visto e condizioni albanesi per soggiorni brevi e documenti di viaggio.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata risultava valida fino al 31 luglio 2026: requisiti e validità residua vanno ricontrollati sulle autorità prima del viaggio.",
    confidence: "media",
  },
  {
    id: "north-macedonia",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Macedonia del Nord",
    city: "Skopje",
    italianCitizenDocuments:
      "Per turismo breve, passaporto oppure CIE valida per l’espatrio; la Farnesina consultata indica almeno tre mesi di validità residua dalla data di uscita. Il documento deve essere integro e leggibile.",
    entryRules:
      "Per soggiorni turistici inferiori a 90 giorni non è normalmente richiesto un visto. La presenza deve essere comunicata: verifica con la struttura ricettiva chi effettua la registrazione e entro quale termine.",
    travelAdvice: [
      "A Skopje possono esserci livelli elevati di inquinamento: chi ha problemi respiratori o cardiovascolari segua gli avvisi locali e limiti l’esposizione nei giorni critici.",
      "La Farnesina segnala borseggi e rapine sporadiche nelle aree turistiche e d’intrattenimento: custodisci gli effetti personali e conserva copie separate dei documenti.",
      "Nel periodo caldo e secco possono verificarsi incendi: rispetta i divieti di accensione fuochi e chiama il 112 in caso di emergenza.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Macedonia del Nord (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/MKD.pdf",
        supports:
          "Documento e validità, soggiorno turistico, registrazione, avvisi su salute e sicurezza.",
      },
      {
        title: "Ministero degli Esteri della Macedonia del Nord — Ingresso",
        url: "https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm",
        supports: "Condizioni di ingresso e documenti per cittadini UE.",
      },
      {
        title: "Ministero dell’Interno — Registrazione degli stranieri",
        url: "https://mvr.gov.mk/en-GB/prijavi-stranci",
        supports:
          "Termini e responsabilità per registrare il soggiorno presso la struttura o l’ospitante.",
      },
    ],
    caveat:
      "La validità residua applicata al tuo documento e la registrazione dipendono dal caso e dal tipo di alloggio: confermale con le autorità o la struttura.",
    confidence: "alta",
  },
  {
    id: "romania",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Romania",
    city: "Craiova",
    italianCitizenDocuments:
      "Per turismo breve, passaporto oppure carta d’identità valida per l’espatrio, entrambi in corso di validità. Per cittadini italiani non è richiesto un visto d’ingresso.",
    entryRules:
      "La Romania fa parte dell’UE e dello spazio Schengen. Anche se normalmente non ci sono controlli alle frontiere interne, è necessario viaggiare con un documento valido; oltre 90 giorni si applicano formalità di soggiorno distinte.",
    travelAdvice: [
      "Porta sempre con te il documento valido per l’espatrio: può essere richiesto anche in area Schengen e per il volo di ritorno.",
      "In emergenza chiama il 112, numero indicato dalle fonti ufficiali per polizia, ambulanza e soccorso.",
      "Se prosegui in auto verso Craiova, controlla traffico e condizioni stradali; la Farnesina indica un servizio ACR attivo 24 ore per assistenza agli automobilisti.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Romania (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/ROU.pdf",
        supports:
          "Documenti e ingresso, Schengen, sicurezza e contatti di emergenza.",
      },
      {
        title: "Your Europe — Documenti di viaggio per cittadini UE",
        url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_en.htm",
        supports:
          "Documenti validi e diritti di viaggio per i cittadini dell’Unione europea.",
      },
      {
        title: "Ambasciata d’Italia a Bucarest — Avviso ai viaggiatori",
        url: "https://ambbucarest.esteri.it/it/news/dall_ambasciata/2026/07/avviso-ai-connazionali-in-viaggio-verso-la-romania/",
        supports:
          "Richiamo ufficiale a viaggiare con documento valido anche all’interno di Schengen.",
      },
    ],
    caveat:
      "Le indicazioni riguardano turismo breve per cittadini italiani; per minori, doppia cittadinanza, soggiorni oltre 90 giorni o altri scopi ricontrolla la procedura specifica.",
    confidence: "alta",
  },
  {
    id: "bulgaria",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Bulgaria",
    city: "Sofia",
    italianCitizenDocuments:
      "Per turismo breve, passaporto valido oppure carta d’identità valida per l’espatrio e in buono stato. Per cittadini italiani non è richiesto un visto d’ingresso.",
    entryRules:
      "La Bulgaria è nell’UE e nello spazio Schengen. Per soggiorni oltre tre mesi sono previste formalità di registrazione e condizioni aggiuntive: verifica i requisiti applicabili al tuo viaggio.",
    travelAdvice: [
      "A Sofia sono segnalati furti e scippi ai danni dei turisti: custodisci con attenzione denaro e documenti, soprattutto nelle zone frequentate.",
      "Se guidi, parcheggia in luoghi visibili o custoditi e non lasciare documenti, chiavi o oggetti di valore nell’auto.",
      "Prima di partecipare a manifestazioni o eventi affollati consulta gli avvisi locali e segui le indicazioni delle autorità.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Bulgaria (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/BGR.pdf",
        supports:
          "Documenti, visti, soggiorno, sicurezza e avvisi pratici per i viaggiatori.",
      },
      {
        title: "Your Europe — Documenti di viaggio per cittadini UE",
        url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_en.htm",
        supports:
          "Carta d’identità o passaporto validi per i cittadini UE e possibili controlli alle frontiere.",
      },
    ],
    caveat:
      "La Farnesina segnala possibili problemi con carte d’identità rinnovate o deteriorate: controlla che il documento sia valido per l’espatrio e chiedi conferma se hai un formato prorogato.",
    confidence: "alta",
  },
  {
    id: "united-kingdom",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Regno Unito",
    city: "Londra",
    italianCitizenDocuments:
      "Per turismo serve normalmente un passaporto valido per l’intero soggiorno e un’autorizzazione elettronica ETA ottenuta prima del viaggio. La carta d’identità è accettata solo in specifiche eccezioni.",
    entryRules:
      "Per una visita turistica fino a sei mesi, i cittadini italiani normalmente non necessitano di un visto Standard Visitor, ma devono rispettare le condizioni d’ingresso. L’ETA non garantisce l’ammissione alla frontiera.",
    travelAdvice: [
      "Richiedi l’ETA tramite GOV.UK e associala al passaporto che userai: serve anche ai bambini e ai neonati, salvo specifiche esenzioni.",
      "Per i trasporti londinesi puoi usare contactless o Oyster. Per evitare addebiti errati entra ed esci usando sempre la stessa carta o dispositivo.",
      "Prima della partenza ricontrolla validità del passaporto, transito e attività consentite: lavoro, studio o permanenze più lunghe richiedono regole diverse.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Regno Unito (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/GBR.pdf",
        supports:
          "Documento accettato, ETA, esenzione dal visto turistico e condizioni d’ingresso.",
      },
      {
        title: "GOV.UK — Richiedere l’autorizzazione ETA",
        url: "https://www.gov.uk/eta",
        supports:
          "Chi deve richiederla, come farlo e condizioni dell’autorizzazione elettronica.",
      },
      {
        title: "GOV.UK — Visitare il Regno Unito come Standard Visitor",
        url: "https://www.gov.uk/standard-visitor",
        supports: "Durata e condizioni ufficiali di una visita turistica.",
      },
      {
        title: "Transport for London — Pagamenti per visitatori",
        url: "https://tfl.gov.uk/travel-information/visiting-london/getting-around-london/best-ways-for-visitors-to-pay",
        supports:
          "Uso di contactless e Oyster e regole di pagamento sui trasporti londinesi.",
      },
    ],
    caveat:
      "L’ETA e i requisiti possono dipendere da status o eccezioni individuali, passaporto e transito: verifica la tua posizione sul sito ufficiale prima di prenotare.",
    confidence: "alta",
  },
  {
    id: "belgium",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Belgio",
    city: "Bruxelles",
    italianCitizenDocuments:
      "Per turismo breve, passaporto oppure carta d’identità valida per l’espatrio e in corso di validità. Per cittadini italiani non è richiesto un visto d’ingresso.",
    entryRules:
      "Il Belgio è nell’UE e in Schengen. La fonte belga indica una comunicazione al comune entro 10 giorni per alcuni visitatori UE sotto i tre mesi, con eccezioni legate all’alloggio: chiedi alla struttura se la registrazione è già inclusa.",
    travelAdvice: [
      "Nelle zone centrali, affollate e vicino alle stazioni presta attenzione a borse e documenti: la Farnesina segnala furti e scippi.",
      "Segui gli avvisi locali durante manifestazioni o eventi affollati e chiama il 112 in caso di emergenza.",
      "Verifica con hotel o ospitante se si applica l’eccezione alla comunicazione di soggiorno entro 10 giorni; le condizioni dipendono dal tipo di alloggio.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Belgio (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/BEL.pdf",
        supports:
          "Documento, visto, sicurezza e contatti; scheda aggiornata ad agosto 2026.",
      },
      {
        title: "Your Europe — Documenti di viaggio per cittadini UE",
        url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_en.htm",
        supports:
          "Documenti validi per cittadini UE e possibili controlli temporanei.",
      },
      {
        title:
          "Servizio federale belga — Obbligo di comunicazione e registrazione",
        url: "https://ibz.be/en/single-digital-gateway/registration-and-reporting-obligation-general",
        supports:
          "Comunicazione al comune entro 10 giorni e relative eccezioni per soggiorni brevi.",
      },
    ],
    caveat:
      "La comunicazione locale ha eccezioni legate all’alloggio e alle circostanze: conferma con la struttura o il comune; le indicazioni non sostituiscono le regole applicate al tuo caso.",
    confidence: "alta",
  },
  {
    id: "netherlands",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Paesi Bassi",
    city: "Eindhoven",
    italianCitizenDocuments:
      "Per un soggiorno turistico breve, passaporto valido oppure carta d’identità nazionale valida per l’espatrio. Per cittadini italiani non è richiesto un visto d’ingresso.",
    entryRules:
      "I Paesi Bassi sono nell’UE e in Schengen. Secondo l’autorità olandese, i cittadini UE possono soggiornare fino a tre mesi senza permesso, con un documento valido; per periodi più lunghi cambiano le condizioni di registrazione.",
    travelAdvice: [
      "Nelle stazioni e sui mezzi pubblici sorveglia borse e documenti: la Farnesina segnala episodi di microcriminalità anche a Eindhoven.",
      "Le biciclette sono molto usate e possono essere sottratte: usa un lucchetto robusto e non lasciare oggetti visibili in auto.",
      "Rispetta le norme locali: la tolleranza limitata verso alcune droghe non equivale a una legalizzazione generale; in emergenza chiama il 112.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Paesi Bassi (Farnesina)",
        url: "https://www.viaggiaresicuri.it/find-country/country/NLD",
        supports:
          "Requisiti d’ingresso, sicurezza e avvisi per i viaggiatori; scheda indicata valida al 23 ottobre 2026.",
      },
      {
        title: "Your Europe — Documenti di viaggio per cittadini UE",
        url: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_en.htm",
        supports:
          "Passaporto o carta d’identità validi per gli spostamenti UE/Schengen.",
      },
      {
        title: "IND — Soggiorno nei Paesi Bassi come cittadino UE",
        url: "https://ind.nl/en/residence-permits/eu-eea-or-swiss-citizens/staying-in-the-netherlands-as-an-eu-eea-or-swiss-citizen",
        supports:
          "Condizioni fino a tre mesi e formalità per permanenze più lunghe.",
      },
    ],
    caveat:
      "La sintesi copre turismo breve e cittadinanza italiana; per permanenze oltre tre mesi, lavoro, studio o documenti cartacei verifica le indicazioni aggiornate delle autorità.",
    confidence: "alta",
  },
  {
    id: "switzerland",
    region: "Europa",
    verifiedAt: "2026-10-23",
    country: "Svizzera",
    city: "Basilea",
    italianCitizenDocuments:
      "Per turismo breve, passaporto oppure CIE in corso di validità. La scheda Farnesina consultata non considera valida per l’ingresso una CIE scaduta prorogata con un foglio separato.",
    entryRules:
      "I cittadini italiani non necessitano di visto per entrare in Svizzera. La Svizzera aderisce a Schengen ma non all’UE; soggiorni oltre 90 giorni e attività diverse dal turismo hanno requisiti distinti.",
    travelAdvice: [
      "Se pernotti nel Canton Basilea, chiedi alla struttura come applica la tassa di soggiorno e consegna la BaselCard, che può includere trasporto pubblico gratuito nella regione.",
      "Se guidi in autostrada serve la vignetta svizzera: verifica modalità e prezzo sul portale ufficiale prima di metterti in viaggio.",
      "Numeri d’emergenza indicati dalla Farnesina: 112 generale, 117 polizia, 144 ambulanza, 118 pompieri e 140 soccorso stradale.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Svizzera (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/CHE.pdf",
        supports:
          "Documenti d’ingresso, visto, contatti e numeri d’emergenza; la scheda consultata risulta aggiornata ad agosto 2026.",
      },
      {
        title: "Segreteria di Stato della migrazione — Entrare in Svizzera",
        url: "https://www.sem.admin.ch/sem/en/home/overview-einreise.html",
        supports:
          "Requisiti d’ingresso distinti per cittadinanza, durata e finalità del soggiorno.",
      },
      {
        title: "Cantone di Basilea Città — Tassa turistica e BaselCard",
        url: "https://www.bs.ch/wsu/awa/standort-und-tourismusfoerderung/tourismusfoerderung-gasttaxe",
        supports: "Tassa di soggiorno e servizi associati alla BaselCard.",
      },
      {
        title: "Ufficio federale della dogana — Vignetta autostradale",
        url: "https://www.bazg.admin.ch/en/faq-vignette-and-e-vignette-purchase",
        supports:
          "Obbligo e acquisto della vignetta per le autostrade svizzere.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata indicava validità fino al 19 agosto 2026: verifica eventuali aggiornamenti e la validità del documento concreto prima di partire.",
    confidence: "media",
  },
];
