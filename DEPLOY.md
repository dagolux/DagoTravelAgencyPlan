# Pubblicare Dago Travel gratis su Render

1. Crea un repository GitHub e carica tutto il contenuto di questa cartella.
2. Ottieni una chiave gratuita su https://aistudio.google.com/apikey (Gemini).
3. Su https://render.com: New > Blueprint > scegli il repository (legge render.yaml).
4. Quando richiesto inserisci LLM_API_KEY. VITE_GOOGLE_MAPS_KEY e' opzionale (lascia vuoto).
5. Deploy. L'URL sara' tipo https://dago-travel.onrender.com

Note: il piano gratuito di Render va in sleep dopo ~15 min di inattivita' (primo caricamento lento).
Provider alternativi (Groq, OpenRouter...): cambia LLM_API_URL, LLM_MODEL e LLM_API_KEY.
Test in locale: copia .env.example in .env, poi `pnpm install && pnpm dev`.
