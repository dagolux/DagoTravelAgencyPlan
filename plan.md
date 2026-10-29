# Piano — estensione della guida paese globale

## Approccio

Ampliare la guida già presente senza cambiare rotta o servizi: mantenere le otto mete europee e aggiungere una selezione ragionata di destinazioni turistiche principali in Nord America, Sud America, Asia e Oceania. Il selettore raggruppa i paesi per area geografica. Per ogni scheda mostrare documenti, visto o autorizzazione elettronica per cittadini italiani in turismo breve, consigli pratici specifici, fonti istituzionali e data di verifica della singola scheda. Le regole temporanee, le fonti non aggiornate e le eccezioni personali vanno rese esplicite; la guida non sostituisce la verifica ufficiale.

Usare una data per ogni paese, così l’estensione non presenta come nuove le verifiche europee eseguite il 23 ottobre 2026. Nessun dato personale o numero di passaporto viene richiesto o salvato. Non aggiungere API, account o backend: le fonti sono collegamenti esterni ufficiali. Riutilizzare il layout mobile, i colori blu e gli elementi di accessibilità già presenti.

## Struttura coinvolta

- `client/src/lib/destinationGuideTypes.ts`: tipo condiviso, inclusa area geografica e data di verifica.
- `client/src/lib/destinationGuides.europe.ts`: le otto schede europee già verificate.
- `client/src/lib/destinationGuides.global.ts`: nuove schede ufficiali extraeuropee.
- `client/src/lib/destinationGuides.ts`: esportazione aggregata mantenendo l’import della UI.
- `client/src/components/DestinationGuide.tsx`: menu paese raggruppato per regione e data della scheda selezionata.
- `server/destination-guides.test.ts`: controlli dati esistenti adeguati alla nuova copertura.

La pagina resta sulla rotta `/guida-paese`, collegata dalla Home e dalla navigazione esistenti.

## Requisiti pre-partenza nel risultato del viaggio

Ogni nuovo piano deve contenere tre campi non vuoti e separati: `documentAdvice` per documento d’identità/passaporto e validità da controllare; `visaAdvice` per visto, esenzione, autorizzazione elettronica e durata; `vaccinationAdvice` per obblighi sanitari di ingresso/transito e raccomandazioni per itinerario e stagione. Adattare le indicazioni a nazionalità, destinazione e date disponibili. Il form non raccoglie gli scali: considerarli solo se esplicitamente scritti nelle preferenze, altrimenti segnalare che i requisiti di transito vanno verificati. Distinguere obblighi da raccomandazioni, dichiarare l’incertezza quando serve, non inventare requisiti né dare consigli medici personalizzati. Gli schemi strutturati di generazione e chat conservano i tre campi. L’itinerario mostra subito tre riquadri; la scheda Documenti espone tutti i dettagli e fonti ufficiali, e l’esportazione li include. I viaggi precedenti ricevono avvisi espliciti sui campi mancanti.

Moduli coinvolti: `shared/travel.ts` (contratto del piano), `shared/travel-chat.ts` (patch incrementali), `server/travel.ts` (schema JSON e prompt prudente), `client/src/components/TripWorkspace.tsx` (riepilogo, scheda e download), `client/src/lib/travelData.ts` e `client/src/pages/Home.tsx` (compatibilità dei viaggi salvati) e i test condivisi/server di generazione e chat.

## Nome pubblico del sito

Sostituire il brand visibile “Valentina” con “Dago Travel” in dashboard, titoli e metadati, manifest delle rotte, schermate e testi dell’assistente AI, riepiloghi ed esportazioni. Aggiornare anche i riferimenti descrittivi nella documentazione del progetto. Conservare chiavi di localStorage, dati e identificatori interni esistenti, così il cambio di brand non fa perdere preferiti, viaggi o profilo salvati.

## Collegamenti rapidi a hotel e voli

Le due voci “Hotel e soggiorni” e “Voli e trasporti” del menu laterale devono aprire la pagina “Links utili” filtrata sulla categoria corrispondente (“Hotel e soggiorni” e “Voli e comparatori”), posizionando la sezione all’inizio della vista. Le voci “Links utili”, “Voli offerte” e le altre rotte conservano il comportamento esistente.

## Parcheggi negli aeroporti di Bari e Brindisi

Aggiungere una pagina in italiano sulla rotta `/parcheggi-aeroporto`, collegata dalla navigazione laterale, con selettore per Bari (BRI) e Brindisi (BDS). Per ciascuno scalo mostrare una mappa Google interattiva con il perimetro di 5 km attorno all’aeroporto e i soli parcheggi che ricadono in tale raggio, più schede con prezzo e relativa base temporale, servizi, distanza/modalità di trasferimento e link del gestore o prenotazione. Le tariffe sono indicative e devono essere accompagnate da data/fonte e avviso che variano per date e disponibilità. Riusare la Google Maps proxy e il loader già presente; non introdurre chiavi o servizi esterni. Mantenere la UI blu esistente, responsiva e accessibile.

Struttura coinvolta: `client/src/lib/airportParking.ts` per aeroporti, parcheggi, prezzi e fonti; `client/src/components/AirportParkingMap.tsx` per cerchio, marker e fallback mappa; `client/src/pages/Home.tsx` e `client/src/App.tsx` per voce e rotta; `client/public/manus-routes.json` per il manifest; `client/src/index.css` per schede e layout responsive. Riutilizzare il caricamento Google Maps già implementato in `client/src/components/TravelMap.tsx`.
