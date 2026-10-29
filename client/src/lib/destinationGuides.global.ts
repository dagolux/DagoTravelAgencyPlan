import type { DestinationGuideData } from "./destinationGuideTypes";

export const globalDestinationGuides: DestinationGuideData[] = [
  {
    id: "united-states",
    country: "Stati Uniti",
    city: "New York",
    region: "Nord America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve: passaporto elettronico italiano valido per il viaggio e ESTA approvata prima dell’imbarco; richiedila con anticipo (la Farnesina consiglia almeno 72 ore). Tieni disponibile il biglietto di ritorno o uscita.",
    entryRules:
      "Il Visa Waiver Program permette visite turistiche fino a 90 giorni senza visto, ma richiede l’ESTA: non è un visto e non garantisce l’ammissione, decisa alla frontiera. Viaggi pregressi o doppia cittadinanza possono rendere necessario un visto: verifica la tua idoneità prima di prenotare.",
    travelAdvice: [
      "A New York e nelle grandi città, pianifica gli spostamenti serali e segui gli avvisi locali; la Farnesina segnala rischi di criminalità in alcune zone urbane.",
      "Controlla le allerte meteo ufficiali prima degli spostamenti e segui le istruzioni delle autorità in caso di fenomeni estremi.",
      "Registra il viaggio su DOVESIAMONELMONDO o nell’app Viaggiare Sicuri, con le notifiche attive.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Stati Uniti (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/USA.pdf",
        supports:
          "Passaporto, ESTA, durata del VWP, restrizioni d’idoneità e consigli; scheda aggiornata a maggio 2026 e dichiarata valida fino al 6 ottobre 2026.",
      },
      {
        title: "U.S. Department of State — Visa Waiver Program",
        url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html",
        supports:
          "Visite fino a 90 giorni senza visto, ESTA preventiva e condizioni del programma.",
      },
      {
        title: "U.S. Customs and Border Protection — ESTA e idoneità VWP",
        url: "https://www.cbp.gov/travel/international-visitors/visa-waiver-program/visa-waiver-program-improvement-and-terrorist-travel-prevention-act-faq",
        supports:
          "Validità tipica dell’ESTA e restrizioni individuali legate a cittadinanza e viaggi precedenti.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata è scaduta rispetto alla verifica del 24 ottobre 2026. Controlla l’aggiornamento ufficiale e la tua idoneità VWP: alcuni viaggi precedenti o status personali possono richiedere un visto.",
    confidence: "media",
  },
  {
    id: "canada",
    country: "Canada",
    city: "Toronto",
    region: "Nord America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Serve un passaporto valido per il soggiorno. Se arrivi in aereo o transiti in un aeroporto canadese, richiedi prima l’eTA sul portale ufficiale e viaggia con lo stesso passaporto; via terra o mare l’eTA non è normalmente richiesta agli italiani.",
    entryRules:
      "Per turismo breve non occorre il visto. L’eTA è richiesta per l’arrivo o il transito aereo, ma non è un visto né una garanzia d’ingresso. La permanenza è normalmente fino a 6 mesi; l’ufficiale di frontiera stabilisce il periodo effettivo.",
    travelAdvice: [
      "A Toronto usa le normali precauzioni contro furti e microcriminalità; in emergenza chiama il 911.",
      "Prima di guidare o spostarti in inverno consulta le allerte meteorologiche ufficiali: neve, ghiaccio e freddo possono rendere rischiose le strade.",
      "Valuta di registrare l’itinerario su DOVESIAMONELMONDO e tieni a portata i contatti consolari italiani locali.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Canada (Farnesina)",
        url: "https://www.viaggiaresicuri.it/find-country/country/CAN",
        supports:
          "Requisiti d’ingresso, passaporto, eTA, soggiorno, salute e avvisi; scheda indicata valida al 24 ottobre 2026.",
      },
      {
        title: "Government of Canada — Informazioni sull’eTA",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html",
        supports:
          "Chi deve ottenere l’eTA, validità collegata al passaporto e soggiorni normalmente fino a sei mesi.",
      },
      {
        title: "Government of Canada — Requisiti d’ingresso per paese",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html",
        supports:
          "Distinzione tra arrivo aereo e arrivo via terra o mare per i viaggiatori italiani.",
      },
    ],
    caveat:
      "La scheda Farnesina segnala misure temporanee di frontiera per chi ha soggiornato o transitato in RDC, Uganda o Sud Sudan nei 21 giorni precedenti: verifica l’avviso aggiornato se questa condizione ti riguarda.",
    confidence: "media",
  },
  {
    id: "mexico",
    country: "Messico",
    city: "Città del Messico",
    region: "Nord America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "La Farnesina raccomanda un passaporto con almeno 6 mesi di validità residua; una fonte consolare messicana richiede invece validità per tutta la permanenza. Per prudenza segui la soglia più cautelativa e porta prova di alloggio e del viaggio di uscita, che possono essere richieste.",
    entryRules:
      "I cittadini italiani possono viaggiare per turismo senza visto fino a un massimo di 180 giorni; non serve ESTA/eTA o un’autorizzazione elettronica preventiva. La durata effettiva viene stabilita dalla migrazione all’ingresso e può essere più breve.",
    travelAdvice: [
      "A Città del Messico custodisci documenti e mezzi di pagamento, soprattutto in metropolitana, mercati e terminal; la Farnesina segnala furti e rapine in aree turistiche.",
      "Per spostarti scegli taxi autorizzati o prenotati tramite hotel o ristorante; evita taxi non riconosciuti.",
      "La città è in quota e può avere inquinamento elevato: chi soffre di disturbi respiratori o cardiovascolari segua gli avvisi locali.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Messico (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/MEX.pdf",
        supports:
          "Esenzione dal visto, limite massimo, passaporto, condizioni alla frontiera, sicurezza e salute; scheda aggiornata a maggio 2026.",
      },
      {
        title: "Embajada de México en Canadá — Visite senza visto",
        url: "https://embamex.sre.gob.mx/canada/index.php/en/sconeng/11352-visitorsnovisarequired",
        supports:
          "Esenzione dei cittadini italiani e condizioni generali del soggiorno turistico breve.",
      },
      {
        title: "Instituto Nacional de Migración — Modulo migratorio FMM",
        url: "https://www.inm.gob.mx/fmme/publico/en/solicitud.html",
        supports:
          "Procedura FMM applicabile ai casi d’ingresso via terra e soggiorno visitatore.",
      },
    ],
    caveat:
      "Le fonti consultate discordano sulla validità minima del passaporto: la Farnesina raccomanda 6 mesi, mentre la fonte consolare messicana menziona la validità per l’intero soggiorno. La durata autorizzata non è automatica; confermala al controllo di frontiera.",
    confidence: "media",
  },
  {
    id: "brazil",
    country: "Brasile",
    city: "Rio de Janeiro",
    region: "Sud America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "La scheda Farnesina richiede per turismo un passaporto con almeno 6 mesi di validità residua e un biglietto di andata e ritorno. Non occorre un visto per il breve soggiorno turistico descritto.",
    entryRules:
      "Esenzione dal visto per cittadini italiani fino a 90 giorni per ciascun periodo di 180 giorni. La durata effettiva è stabilita dalla Polizia Federale alla frontiera. Non sono indicate vaccinazioni obbligatorie per l’ingresso; controlla le raccomandazioni sanitarie per il tuo itinerario.",
    travelAdvice: [
      "A Rio presta attenzione a furti e rapine, soprattutto sulle spiagge pubbliche: porta con te il minimo indispensabile e non opporre resistenza in caso di rapina.",
      "Le operazioni di polizia possono causare scontri, traffico o interruzioni dei trasporti: evita le aree coinvolte e segui gli aggiornamenti locali.",
      "Prima della partenza valuta una copertura sanitaria adeguata: le cure private possono essere costose.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Brasile (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/BRA.pdf",
        supports:
          "Passaporto, biglietto di ritorno, durata dell’esenzione, vaccinazioni e sicurezza; scheda consultata con validità dichiarata fino al 10 settembre 2026.",
      },
      {
        title:
          "Ministero degli Esteri brasiliano — Requisiti di visto per paese",
        url: "https://www.gov.br/mre/pt-br/embaixada-abu-dhabi/abu-dhabi-arquivos/english/consular-services/visa/visa-requirements-by-country/visa-requirements-by-country-list-of-countries",
        supports: "Esenzione dal visto per i titolari di passaporto italiano.",
      },
      {
        title: "Ministero degli Esteri brasiliano — Esenzione dal visto",
        url: "https://www.gov.br/mre/pt-br/embaixada-windhoek/english/consular-services/visas-1/Visa%20Exemption",
        supports:
          "Soggiorno italiano senza visto fino a 90 giorni per periodo di 180 giorni.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata è scaduta rispetto al 24 ottobre 2026; ricontrolla soprattutto passaporto, eventuali dichiarazioni sanitarie e avvisi locali prima di partire.",
    confidence: "media",
  },
  {
    id: "argentina",
    country: "Argentina",
    city: "Buenos Aires",
    region: "Sud America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve la Farnesina indica passaporto con almeno 6 mesi di validità residua. La fonte consolare argentina raccomanda anche biglietto di ritorno e assicurazione sanitaria internazionale.",
    entryRules:
      "I cittadini italiani sono esenti dal visto turistico fino a 90 giorni. La Farnesina indica che può essere chiesta una proroga, soggetta ad approvazione. Nessuna vaccinazione è obbligatoria in generale; la febbre gialla è consigliata per specifici soggiorni nell’area delle Cascate di Iguazú.",
    travelAdvice: [
      "A Buenos Aires la Farnesina segnala furti e rapine: non mostrare telefoni, tablet o gioielli in strada e non opporre resistenza in caso di rapina.",
      "Fai attenzione a inviti e bevande da persone appena conosciute nei locali notturni; la Farnesina segnala raggiri con sostanze somministrate ai turisti.",
      "Tieni a portata i numeri di emergenza indicati dalla Farnesina: 911 polizia, 107 ambulanza e 100 vigili del fuoco.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Argentina (Farnesina)",
        url: "https://www.viaggiaresicuri.it/find-country/country/ARG",
        supports:
          "Passaporto, esenzione dal visto, proroga, salute e avvisi per Buenos Aires; scheda indicata valida al 24 ottobre 2026.",
      },
      {
        title: "Consolato argentino a Roma — Tipi di visto",
        url: "https://croma.cancilleria.gob.ar/en/ii-types-visas",
        supports:
          "Esenzione per italiani fino a 90 giorni e documenti raccomandati per turismo.",
      },
    ],
    caveat:
      "La scheda Farnesina segnala modifiche normative non ancora attuate nella prassi, relative a una dichiarazione su motivo e assicurazione sanitaria. Verifica con il consolato prima della partenza; la pagina consolare consultata è del 2025.",
    confidence: "media",
  },
  {
    id: "peru",
    country: "Perù",
    city: "Lima",
    region: "Sud America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Passaporto ordinario con almeno 6 mesi di validità residua all’arrivo e biglietto di andata e ritorno. La Farnesina avverte che senza la validità richiesta l’ingresso non è consentito; conserva il documento e controlla la durata autorizzata nella TAM.",
    entryRules:
      "I cittadini italiani sono esenti dal visto turistico; la scheda Farnesina aggiornata a settembre 2026 indica fino a 90 giorni nell’arco di 183 giorni. Il periodo concreto viene registrato alla frontiera nella TAM. Non confondere questa regola con il limite generico di 183 giorni citato per altri profili.",
    travelAdvice: [
      "A Lima presta attenzione a furti e rapine; la Farnesina sconsiglia alcune zone periferiche, il centro storico e Callao, soprattutto di notte.",
      "Per i trasferimenti dall’aeroporto scegli taxi ufficiali o prenotati tramite una struttura ricettiva; evita taxi informali.",
      "Bevi acqua minerale o bollita e valuta un’assicurazione che copra cure e rimpatrio sanitario.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Perù (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/PER.pdf",
        supports:
          "Passaporto, permanenza massima per cittadini italiani, indicazioni sanitarie e avvisi; scheda aggiornata al 30 settembre 2026.",
      },
      {
        title:
          "Superintendencia Nacional de Migraciones — Informazioni ai turisti",
        url: "https://www.gob.pe/en/institucion/migraciones/campa%C3%B1as/64003-informacion-fundamental-para-turistas-en-peru",
        supports:
          "Validità del passaporto e verifica online del periodo autorizzato tramite TAM.",
      },
      {
        title: "Consolato del Perù a Londra — Visti turistici",
        url: "https://www.consulado.pe/es/londres/tramite/Paginas/Visas/Issuance-of-Tourist-Visa.aspx",
        supports: "L’Italia è inclusa fra i paesi esenti dal visto turistico.",
      },
    ],
    caveat:
      "Attieniti ai giorni autorizzati nella TAM; non presumere automaticamente il limite generico di 183 giorni riportato da altre pagine. Vaccinazioni consigliate o condizioni particolari dipendono dall’itinerario.",
    confidence: "media",
  },
  {
    id: "chile",
    country: "Cile",
    city: "Santiago",
    region: "Sud America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve serve un passaporto valido per tutta la durata del viaggio. All’ingresso conserva la carta turistica rilasciata dalla PDI e presentala all’uscita; la Farnesina segnala che può essere richiesta anche dalla compagnia aerea.",
    entryRules:
      "La permanenza turistica transitoria è normalmente fino a 90 giorni senza visto o autorizzazione elettronica preventiva. Alla frontiera compila la dichiarazione SAG per prodotti animali o vegetali: dichiarali anche in caso di dubbio. Rapa Nui prevede requisiti aggiuntivi rispetto al Cile continentale.",
    travelAdvice: [
      "A Santiago fai attenzione a furti e rapine nelle zone affollate indicate dalla Farnesina; evita di usare il telefono in strada e non camminare di notte in aree isolate.",
      "Il Cile è ad alto rischio sismico: segui gli avvisi delle autorità e, nelle località costiere, individua i percorsi ufficiali di evacuazione in caso di tsunami.",
      "Compila la dichiarazione SAG con attenzione: l’omissione di alimenti o prodotti agricoli può comportare sanzioni.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Cile (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/CHL.pdf",
        supports:
          "Passaporto, soggiorno breve, carta turistica, dichiarazione SAG e sicurezza; scheda aggiornata al 18 ottobre 2026.",
      },
      {
        title:
          "Servicio Nacional de Migraciones — Turisti e permanenza transitoria",
        url: "https://serviciomigraciones.cl/en/permanencia-transitoria-permit/subcategories/tourists/",
        supports:
          "Durata ordinaria fino a 90 giorni e condizioni di soggiorno turistico.",
      },
      {
        title: "Chile Travel — Requisiti di ingresso e visto",
        url: "https://chile.travel/en/good-to-know/entry-and-visa-requirements/",
        supports:
          "Informazioni di ingresso per visitatori e dichiarazioni doganali agricole.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata riporta validità fino al 19 ottobre 2026. Per Rapa Nui (Isola di Pasqua) controlla separatamente i requisiti di dichiarazione FUI, alloggio e durata del soggiorno.",
    confidence: "media",
  },
  {
    id: "colombia",
    country: "Colombia",
    city: "Bogotá",
    region: "Sud America",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve porta il passaporto valido per tutto il soggiorno e un biglietto di uscita o ritorno: la Farnesina segnala che può essere richiesto anche prima dell’imbarco. Check-Mig è gratuito e facoltativo, non è un visto.",
    entryRules:
      "I cittadini italiani sono esenti dal visto per la visita turistica iniziale fino a 90 giorni; una proroga va richiesta a Migración Colombia e può portare il soggiorno complessivo fino a 180 giorni. La frontiera stabilisce la durata autorizzata. Verifica con autorità e vettore le regole sanitarie se hai visitato o transitato in paesi a rischio febbre gialla.",
    travelAdvice: [
      "A Bogotá fai attenzione a truffe e furti, inclusi raggiri con sostanze somministrate ai turisti; evita incontri non verificati e non lasciare bevande incustodite.",
      "Non fermare taxi per strada, soprattutto di notte: usa operatori autorizzati o applicazioni affidabili e non usare il telefono in vista in aree isolate.",
      "Per spostamenti interni privilegia voli commerciali e controlla gli avvisi stradali prima di viaggiare via terra.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Colombia (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/COL.pdf",
        supports:
          "Passaporto, esenzione e durata, biglietto di uscita, febbre gialla e avvisi di sicurezza.",
      },
      {
        title: "Cancillería de Colombia — Requisiti di ingresso",
        url: "https://www.cancilleria.gov.co/sites/default/files/FOTOS2024/ENTRY%20TO%20COLOMBIA%20AND%20COURTESY%20VISA%20INFORMATION.pdf",
        supports:
          "Esenzione dal visto visitatore per cittadini italiani e informazioni sanitarie ufficiali.",
      },
      {
        title: "Migración Colombia — Check-Mig",
        url: "https://www.migracioncolombia.gov.co/tramites-y-servicios/aplicativos/checkmig",
        supports:
          "Procedura gratuita e facoltativa di pre-registrazione prima del viaggio.",
      },
    ],
    caveat:
      "Le fonti ufficiali consultate non concordano completamente su quando sia richiesta la prova di vaccinazione contro la febbre gialla, in particolare per chi transita o visita il Brasile. Se il tuo itinerario include un’area a rischio, verifica prima con le autorità sanitarie e la compagnia aerea.",
    confidence: "media",
  },
  {
    id: "japan",
    country: "Giappone",
    city: "Tokyo",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve serve il passaporto valido per l’intero soggiorno; le fonti consultate non indicano una validità residua minima. Porta anche il biglietto di ritorno e i dati dell’alloggio. Visit Japan Web può precompilare immigrazione e dogana, ma non è un visto né un’autorizzazione d’ingresso obbligatoria indicata dalle fonti consultate.",
    entryRules:
      "I cittadini italiani sono esenti dal visto per turismo fino a 90 giorni. L’esenzione non copre lavoro, studio o soggiorni più lunghi. Alla frontiera possono essere raccolti fotografia e impronte digitali, salvo le eccezioni previste.",
    travelAdvice: [
      "Prima degli spostamenti controlla le allerte per terremoti, tsunami e tifoni della Japan Meteorological Agency e segui le indicazioni delle autorità locali.",
      "Nelle aree della vita notturna fai attenzione a inviti, prezzi e bevande da sconosciuti; la Farnesina segnala raggiri e furti ai turisti.",
      "Tieni a portata i numeri locali d’emergenza indicati dalla Farnesina: 110 polizia e 119 ambulanza o vigili del fuoco.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Giappone (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/JPN.pdf",
        supports:
          "Passaporto, visto, Visit Japan Web, controlli biometrici, rischi naturali e contatti; la scheda consultata è scaduta rispetto al 24 ottobre 2026.",
      },
      {
        title:
          "Ministero degli Esteri giapponese — Esenzione dal visto per soggiorni brevi",
        url: "https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html",
        supports:
          "L’Italia è inclusa nell’esenzione e la durata ordinaria per i paesi elencati è 90 giorni.",
      },
      {
        title: "Digital Agency of Japan — Visit Japan Web",
        url: "https://services.digital.go.jp/en/visit-japan-web/",
        supports:
          "Descrizione del servizio online facoltativo per precompilare le procedure d’immigrazione e dogana.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata riporta una validità terminata a settembre 2026; la regola dei 90 giorni è corroborata dal MOFA giapponese. Verifica eventuali aggiornamenti per i tuoi documenti o precedenti migratori.",
    confidence: "media",
  },
  {
    id: "china",
    country: "Cina",
    city: "Pechino",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Serve il passaporto ordinario; per prudenza segui la raccomandazione Farnesina dei 6 mesi di validità residua. Dal 20 novembre 2025 la scheda italiana indica una Carta d’Ingresso per Stranieri da compilare online prima dell’arrivo. Se alloggi presso privati, la registrazione alla polizia locale è normalmente richiesta entro 24 ore.",
    entryRules:
      "Alla data della verifica, cittadini italiani con passaporto ordinario possono entrare senza visto per turismo fino a 30 giorni nell’ambito di una misura temporanea valida fino al 31 dicembre 2026. Per soggiorni più lunghi, lavoro o studio occorre il visto appropriato prima della partenza. L’ingresso resta soggetto al controllo di frontiera.",
    travelAdvice: [
      "A Pechino non portare né far transitare droni o componenti principali: la Farnesina segnala restrizioni e possibili sanzioni dal maggio 2026.",
      "Fai attenzione alle truffe ai turisti con inviti non richiesti a cerimonie del tè, locali o giri turistici.",
      "Durante i picchi di inquinamento controlla l’indice AQI e segui le indicazioni locali, limitando l’attività all’aperto quando necessario.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Cina (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/CHN.pdf",
        supports:
          "Passaporto, esenzione temporanea, carta d’ingresso, registrazione dell’alloggio, droni, inquinamento e sicurezza; scheda consultata a ottobre 2026.",
      },
      {
        title:
          "Ambasciata cinese in Italia — Prolungamento dell’esenzione dal visto",
        url: "https://it.china-embassy.gov.cn/ita/lstz/202512/t20251222_11780590.htm",
        supports:
          "Esenzione temporanea per italiani con passaporto ordinario, turismo e soggiorni fino a 30 giorni, con scadenza al 31 dicembre 2026.",
      },
      {
        title: "National Immigration Administration — Paesi esenti dal visto",
        url: "https://en.nia.gov.cn/n147418/n147463/c183390/content.html",
        supports:
          "Elenco delle politiche unilaterali e calcolo della permanenza massima di 30 giorni.",
      },
    ],
    caveat:
      "L’esenzione è temporanea e, secondo la fonte consultata, scade il 31 dicembre 2026: per viaggi successivi verifica subito eventuali proroghe. La Farnesina riporta una validità della scheda anteriore alla data di verifica; ricontrolla anche il requisito del passaporto e l’eventuale carta d’ingresso.",
    confidence: "media",
  },
  {
    id: "thailand",
    country: "Thailandia",
    city: "Bangkok",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Passaporto integro, con almeno 6 mesi di validità e due pagine libere. Per turismo breve usa l’esenzione dal visto vigente. Tutti i viaggiatori stranieri devono compilare gratuitamente la Thailand Digital Arrival Card (TDAC) entro le 72 ore prima dell’arrivo: è una carta d’arrivo, non un visto.",
    entryRules:
      "L’ultima scheda Farnesina reperita indica per gli italiani fino a 30 giorni senza visto; segnala inoltre possibile proroga una tantum di altri 30 giorni, su richiesta e a discrezione dell’Immigration Bureau. Possono essere richiesti un viaggio in uscita entro 60 giorni e prova di mezzi sufficienti. La scheda dichiara però validità solo fino al 23 settembre 2026: riconferma la regola prima di prenotare.",
    travelAdvice: [
      "La Farnesina segnala aree sconsigliate nel sud del Paese e vicino al confine cambogiano; controlla gli avvisi aggiornati prima di pianificare spostamenti terrestri.",
      "Compila la TDAC soltanto sul portale ufficiale tdac.immigration.go.th nei tre giorni precedenti l’arrivo; la Farnesina avverte di siti non ufficiali che possono sottrarre dati.",
      "Evita dimostrazioni e assembramenti politici e segui le indicazioni delle autorità locali.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Thailandia (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/THA.pdf",
        supports:
          "Documento, durata dell’esenzione, TDAC, biglietto in uscita e avvisi di sicurezza; scheda aggiornata al 22 settembre e valida fino al 23 settembre 2026.",
      },
      {
        title:
          "Royal Thai Consulate-General — Esenzione dal visto e Visa on Arrival",
        url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/visa-exemption-and-visa-on-arrival-to-thailand",
        supports:
          "Avviso consolare del settembre 2026 sullo schema d’esenzione dal visto.",
      },
      {
        title: "Thailand Immigration Bureau — Thailand Digital Arrival Card",
        url: "https://tdac.immigration.go.th/",
        supports:
          "Portale ufficiale per la carta d’arrivo digitale richiesta ai viaggiatori stranieri.",
      },
    ],
    caveat:
      "La scheda italiana più recente consultata è formalmente scaduta al 23 settembre 2026 e la tabella consolare thailandese non era leggibile per intero. Durata e proroga sono quindi da riconfermare direttamente con le autorità thailandesi prima della partenza.",
    confidence: "bassa",
  },
  {
    id: "india",
    country: "India",
    city: "Nuova Delhi",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo serve un visto: la e-Tourist Visa si richiede online sul portale governativo prima del viaggio. La scheda Farnesina indica passaporto con almeno 6 mesi di validità residua e due pagine libere, biglietto di ritorno o prosecuzione e prova di mezzi sufficienti. Compila anche la e-Arrival Card entro le 72 ore prima dell’arrivo.",
    entryRules:
      "Richiedi l’e-Tourist Visa almeno 4 giorni prima dell’arrivo (la domanda si può presentare fino a 120 giorni prima); scegli durata e ingressi tra le opzioni effettivamente concesse nell’ETA. L’e-Arrival Card non sostituisce il visto. Per l’e-Visa si entra via uno degli aeroporti autorizzati, incluso Delhi. La Farnesina segnala anche uno screening sanitario temporaneo: verifica se il modulo Air Suvidha sia ancora richiesto.",
    travelAdvice: [
      "A Nuova Delhi l’inquinamento può essere molto elevato in inverno: controlla le allerte e limita l’esposizione all’aperto nei giorni critici.",
      "La Farnesina segnala rischi di attentati in luoghi affollati, mercati, trasporti e luoghi di culto: segui gli avvisi locali.",
      "Non programmare escursioni nelle zone sconsigliate dalla Farnesina, incluse parti del Kashmir e aree di confine con il Pakistan.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — India (Farnesina)",
        url: "https://www.viaggiaresicuri.it/find-country/country/IND",
        supports:
          "Passaporto, e-Visa, carta d’arrivo, avvisi sanitari e sicurezza; scheda indicata valida al 24 ottobre 2026.",
      },
      {
        title: "Government of India — Portale e-Visa",
        url: "https://indianvisaonline.gov.in/evisa/",
        supports:
          "Domanda ufficiale, tempi, categorie, condizioni e requisiti per la e-Tourist Visa.",
      },
      {
        title: "Ambasciata d’India a Roma — Requisiti generali del visto",
        url: "https://www.indianembassyrome.gov.in/page/general-requirements-for-visas/",
        supports:
          "Disponibilità per cittadini italiani delle categorie e-Tourist da 30 giorni, 1 anno e 5 anni.",
      },
    ],
    caveat:
      "La Farnesina segnala una misura temporanea di screening sanitario introdotta nel luglio 2026. Verifica prima del viaggio se modulo e procedura sono ancora richiesti; l’ETA e le condizioni effettivamente rilasciate prevalgono su questa sintesi.",
    confidence: "media",
  },
  {
    id: "indonesia",
    country: "Indonesia",
    city: "Bali",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Passaporto integro, con almeno 6 mesi di validità residua e, secondo la Farnesina, almeno due pagine libere. Per turismo breve serve un Visitor Visa/VOA: puoi richiedere l’e-VOA prima del viaggio o il VOA all’arrivo nei punti autorizzati. Porta il biglietto di uscita e completa la Arrival Card All Indonesia entro i tre giorni prima dell’arrivo.",
    entryRules:
      "Il VOA/e-VOA è un visto a ingresso singolo per 30 giorni, prorogabile una volta per altri 30 secondo la scheda Farnesina; non è un’esenzione. A Bali è inoltre previsto il Bali Tourist Levy provinciale: non sostituisce il visto. Segui la decisione e le condizioni effettivamente rilasciate dall’immigrazione.",
    travelAdvice: [
      "A Bali la Farnesina segnala molti incidenti con ciclomotori: usa il casco e controlla che la patente copra la moto; valuta un’auto con autista se non hai esperienza locale.",
      "L’Indonesia è sismica e vulcanica: per il Monte Agung e altre aree segui le autorità locali e controlla lo stato dei voli in caso di cenere.",
      "Prima di salire su barche o traghetti controlla le dotazioni di sicurezza; evita traversate notturne se l’affidabilità dell’imbarcazione è incerta.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Indonesia (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/IDN.pdf",
        supports:
          "Passaporto, VOA, biglietto di uscita, rischi vulcanici, stradali e marittimi; scheda aggiornata al 15 ottobre 2026.",
      },
      {
        title:
          "Direzione Generale dell’Immigrazione indonesiana — Visitor Visa/e-VOA",
        url: "https://evisa.imigrasi.go.id/front/info/evoa",
        supports:
          "Paesi ammessi, durata e requisiti del visto visitatore/e-VOA.",
      },
      {
        title: "Immigrazione indonesiana — Portale e Arrival Card",
        url: "https://evisa.imigrasi.go.id/",
        supports:
          "Portale ufficiale per la carta d’arrivo All Indonesia e istruzioni pre-arrivo.",
      },
      {
        title: "Governo provinciale di Bali — Love Bali Tourist Levy",
        url: "https://lovebali.baliprov.go.id/",
        supports:
          "Imposta turistica provinciale e pagamento tramite il portale ufficiale.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata è del 15 ottobre 2026. Importo del Bali Tourist Levy, formalità d’arrivo e condizioni del VOA/e-VOA possono cambiare: verifica i portali ufficiali prima della partenza.",
    confidence: "media",
  },
  {
    id: "vietnam",
    country: "Vietnam",
    city: "Hanoi",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Passaporto ordinario integro, con almeno 6 mesi di validità residua e almeno una pagina libera. Per turismo breve a Hanoi non occorre visto fino a 45 giorni. La Farnesina indica una registrazione pre-arrivo entro le 72 ore prima del volo per alcuni aeroporti internazionali: conserva il QR code e verifica che l’aeroporto scelto sia incluso.",
    entryRules:
      "L’esenzione consente ai cittadini italiani un singolo soggiorno turistico fino a 45 giorni ed è stata indicata dal Ministero degli Esteri vietnamita fino al 14 marzo 2028. Per soggiorni più lunghi occorre richiedere prima l’eVisa, che può coprire fino a 90 giorni. L’ammissione e le condizioni restano soggette alla frontiera.",
    travelAdvice: [
      "A Hanoi fai attenzione al traffico e agli scippi da motorino: usa taxi o autisti affidabili e non tenere il telefono in vista sul bordo della strada.",
      "La Farnesina sconsiglia di guidare di notte senza patente adeguata e invita a non lasciare il passaporto come deposito per il noleggio di un motorino.",
      "Controlla gli avvisi su inquinamento, piogge e tifoni; chi è vulnerabile può aver bisogno di limitare l’esposizione all’aria inquinata.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Vietnam (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/VNM.pdf",
        supports:
          "Passaporto, esenzione da 45 giorni, eVisa, registrazione pre-arrivo, salute e sicurezza; scheda consultata a settembre 2026.",
      },
      {
        title: "Ministero degli Esteri vietnamita — Elenco esenzioni dal visto",
        url: "https://mofa.gov.vn/tin-chi-tiet/chi-tiet/viet-nam-39-s-visa-exemption-list-57163-596.html",
        supports:
          "Esenzione fino a 45 giorni per passaporti ordinari italiani, con termine indicato al 14 marzo 2028.",
      },
      {
        title: "Portale ufficiale dell’eVisa vietnamita",
        url: "https://evisa.gov.vn/",
        supports:
          "Richiesta online dell’eVisa per soggiorni che richiedono un visto.",
      },
      {
        title: "Immigrazione vietnamita — Registrazione pre-arrivo",
        url: "https://prearrival.immigration.gov.vn/",
        supports:
          "Portale ufficiale indicato per la procedura di registrazione e rilascio del QR code.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata riporta validità fino al 7 ottobre 2026; l’esenzione di 45 giorni è corroborata dal Ministero vietnamita. Verifica la registrazione pre-arrivo e gli aeroporti coinvolti con le istruzioni ufficiali più recenti.",
    confidence: "media",
  },
  {
    id: "south-korea",
    country: "Corea del Sud",
    city: "Seoul",
    region: "Asia",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Per turismo breve serve il passaporto ordinario con almeno 3 mesi di validità residua e un biglietto di ritorno. La scheda Farnesina indica esenzione dal visto e sospensione temporanea della K-ETA per italiani fino al 31 dicembre 2026.",
    entryRules:
      "I cittadini italiani sono esenti dal visto per soggiorni turistici inferiori a 90 giorni. La sospensione della K-ETA è temporanea: alla verifica vale fino al 31 dicembre 2026. Controlla l’eventuale avviso aggiornato prima dell’imbarco; l’ingresso resta soggetto alle autorità di frontiera.",
    travelAdvice: [
      "Evita di partecipare a manifestazioni politiche: la Farnesina avverte che possono comportare sanzioni, espulsione o divieto di rientro.",
      "Non avvicinarti alla DMZ o alla Civilian Control Line al di fuori dei percorsi autorizzati; in alcune aree sono presenti mine e l’accesso è limitato.",
      "Valuta una copertura sanitaria: le cure ospedaliere possono essere costose per i visitatori stranieri.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Corea del Sud (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/KOR.pdf",
        supports:
          "Passaporto, esenzione dal visto, sospensione temporanea K-ETA e avvisi; scheda aggiornata al 6 ottobre e valida al 7 ottobre 2026.",
      },
      {
        title: "Korea Electronic Travel Authorization — Portale ufficiale",
        url: "https://www.k-eta.go.kr/",
        supports:
          "Portale ufficiale K-ETA e avvisi generali sulle procedure di viaggio.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata è formalmente scaduta e la sospensione K-ETA è indicata fino al 31 dicembre 2026. Verifica sul portale ufficiale o con la compagnia aerea se la misura è stata prorogata e quale procedura si applica al tuo viaggio.",
    confidence: "media",
  },
  {
    id: "australia",
    country: "Australia",
    city: "Sydney",
    region: "Oceania",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Serve un passaporto italiano valido e il visto eVisitor (subclass 651) approvato prima del viaggio; richiedilo tramite il Department of Home Affairs. Le fonti consultate non specificano un periodo minimo residuo generale oltre alla validità del documento.",
    entryRules:
      "L’eVisitor è un visto, non un’esenzione, e permette visite turistiche fino a 3 mesi per ingresso nell’arco di 12 mesi, secondo le condizioni concesse. Non consente di lavorare. In dogana dichiara correttamente alimenti, piante e prodotti soggetti a biosicurezza; la scheda Farnesina segnala inoltre l’obbligo di dichiarare contanti oltre 10.000 AUD.",
    travelAdvice: [
      "Nel New South Wales controlla gli avvisi su incendi e fenomeni meteo prima degli spostamenti; la stagione calda può comportare rischio di roghi.",
      "Per fare il bagno scegli spiagge sorvegliate e segui le indicazioni di bagnini e autorità locali.",
      "Rispetta le regole di biosicurezza e dichiara gli articoli richiesti: le violazioni possono comportare sanzioni e conseguenze sul visto.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Australia (Farnesina)",
        url: "https://www.viaggiaresicuri.it/find-country/country/AUS",
        supports:
          "Passaporto, visto, biosicurezza, contanti, salute e sicurezza; la scheda consultata è indicata valida al 24 ottobre 2026.",
      },
      {
        title: "Australian Department of Home Affairs — eVisitor subclass 651",
        url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651",
        supports:
          "Condizioni ufficiali del visto, durata del soggiorno per ingresso e visite ripetute.",
      },
      {
        title:
          "Australian Government — Informazioni sulla biosicurezza all’arrivo",
        url: "https://www.agriculture.gov.au/biosecurity-trade/travelling/arriving-in-australia",
        supports:
          "Dichiarazione di prodotti e beni soggetti ai controlli di biosicurezza australiani.",
      },
    ],
    caveat:
      "L’eVisitor e i limiti effettivi dipendono dal visto concesso e dalle relative condizioni: controlla la decisione in VEVO prima del volo. La scheda Farnesina consultata è stata aggiornata a maggio 2026.",
    confidence: "media",
  },
  {
    id: "new-zealand",
    country: "Nuova Zelanda",
    city: "Auckland",
    region: "Oceania",
    verifiedAt: "2026-10-24",
    italianCitizenDocuments:
      "Passaporto italiano valido almeno 3 mesi oltre la data prevista di uscita e NZeTA approvata prima della partenza, associata allo stesso passaporto. Completa inoltre la New Zealand Traveller Declaration (NZTD) nel periodo previsto prima del viaggio.",
    entryRules:
      "L’Italia è un paese visa-waiver: non occorre un visto turistico preventivo, ma l’NZeTA è comunque obbligatoria. Per visita consente normalmente fino a 3 mesi per ingresso, con limiti complessivi; all’arrivo le autorità possono chiedere biglietto d’uscita già pagato e prova dei fondi. L’NZeTA non garantisce l’ammissione.",
    travelAdvice: [
      "Per trekking e attività in aree remote segui i percorsi segnalati, prepara acqua e abbigliamento adatto, condividi l’itinerario e controlla la copertura telefonica e il meteo.",
      "Prima delle attività in mare o all’aperto segui gli avvisi di sicurezza e le indicazioni delle autorità locali.",
      "Dichiara correttamente alimenti, attrezzature usate e altri beni soggetti a biosicurezza nella NZTD: regole e controlli all’arrivo sono rigorosi.",
    ],
    officialSources: [
      {
        title: "Viaggiare Sicuri — Nuova Zelanda (Farnesina)",
        url: "https://www.viaggiaresicuri.it/schede_paese/pdf/NZL.pdf",
        supports:
          "Passaporto, NZeTA, dichiarazione NZTD, salute e sicurezza; scheda italiana consultata con validità terminata nel maggio 2026.",
      },
      {
        title:
          "Immigration New Zealand — New Zealand Electronic Travel Authority",
        url: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/",
        supports:
          "NZeTA, durata, requisiti di passaporto, biglietto in uscita e prova dei fondi.",
      },
      {
        title: "Immigration New Zealand — Paesi visa-waiver",
        url: "https://www.immigration.govt.nz/visit/what-you-need-to-visit-new-zealand/visa-waiver-countries-and-territories/",
        supports:
          "Italia inclusa tra i paesi visa-waiver e condizioni generali di visita.",
      },
      {
        title: "New Zealand Traveller Declaration — Compilare la dichiarazione",
        url: "https://www.travellerdeclaration.govt.nz/completing-your-declaration/",
        supports:
          "Tempi e beni da dichiarare per immigrazione, dogana e biosicurezza.",
      },
    ],
    caveat:
      "La scheda Farnesina consultata non era più valida alla data del 24 ottobre 2026; i requisiti riportati sono corroborati da Immigration New Zealand ma vanno ricontrollati prima della partenza. Durata autorizzata e ammissione dipendono dal controllo di frontiera.",
    confidence: "media",
  },
];
