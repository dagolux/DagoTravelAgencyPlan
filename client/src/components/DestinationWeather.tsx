import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  RefreshCw,
  Sun,
  Wind,
  Snowflake,
} from "lucide-react";

type AirportFilter = "Tutti" | "Bari" | "Brindisi";
type AirportName = Exclude<AirportFilter, "Tutti">;

type WeatherDestination = {
  id: string;
  name: string;
  country: string;
  airport: AirportName;
  airportCode: "BRI" | "BDS";
  latitude: number;
  longitude: number;
};

type Observation = {
  destinationId: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  localTime: string;
};

type CacheData = {
  fetchedAt: number;
  observations: Observation[];
};

type ApiWeatherPoint = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    time?: string;
  };
};

const destinations: WeatherDestination[] = [
  {
    id: "skopje",
    name: "Skopje",
    country: "Macedonia del Nord",
    airport: "Bari",
    airportCode: "BRI",
    latitude: 41.9981,
    longitude: 21.4254,
  },
  {
    id: "tirana",
    name: "Tirana",
    country: "Albania",
    airport: "Bari",
    airportCode: "BRI",
    latitude: 41.3275,
    longitude: 19.8187,
  },
  {
    id: "craiova",
    name: "Craiova",
    country: "Romania",
    airport: "Bari",
    airportCode: "BRI",
    latitude: 44.3302,
    longitude: 23.7949,
  },
  {
    id: "sofia",
    name: "Sofia",
    country: "Bulgaria",
    airport: "Bari",
    airportCode: "BRI",
    latitude: 42.6977,
    longitude: 23.3219,
  },
  {
    id: "london",
    name: "Londra",
    country: "Regno Unito",
    airport: "Brindisi",
    airportCode: "BDS",
    latitude: 51.5072,
    longitude: -0.1276,
  },
  {
    id: "brussels",
    name: "Bruxelles",
    country: "Belgio",
    airport: "Brindisi",
    airportCode: "BDS",
    latitude: 50.8503,
    longitude: 4.3517,
  },
  {
    id: "eindhoven",
    name: "Eindhoven",
    country: "Paesi Bassi",
    airport: "Brindisi",
    airportCode: "BDS",
    latitude: 51.4416,
    longitude: 5.4697,
  },
  {
    id: "basel",
    name: "Basilea",
    country: "Svizzera",
    airport: "Brindisi",
    airportCode: "BDS",
    latitude: 47.5596,
    longitude: 7.5886,
  },
];

const CACHE_KEY = "valentina.weather.destinations.v1";
const CACHE_TTL_MS = 15 * 60 * 1000;
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

function readCache(): CacheData | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (
      typeof value !== "object" ||
      value === null ||
      !("fetchedAt" in value) ||
      !("observations" in value) ||
      typeof value.fetchedAt !== "number" ||
      !Array.isArray(value.observations)
    ) {
      return null;
    }
    return value as CacheData;
  } catch {
    return null;
  }
}

function conditionFor(code: number) {
  if (code === 0) return { label: "Sereno", Icon: Sun };
  if (code === 1) return { label: "Prevalentemente sereno", Icon: CloudSun };
  if (code === 2) return { label: "Parzialmente nuvoloso", Icon: CloudSun };
  if (code === 3) return { label: "Coperto", Icon: Cloud };
  if (code === 45 || code === 48) return { label: "Nebbia", Icon: CloudFog };
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { label: "Pioviggine", Icon: CloudDrizzle };
  }
  if ([61, 63, 65, 66, 67].includes(code)) {
    return { label: "Pioggia", Icon: CloudRain };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { label: "Neve", Icon: Snowflake };
  }
  if ([80, 81, 82].includes(code)) {
    return { label: "Rovesci", Icon: CloudRain };
  }
  if ([95, 96, 99].includes(code)) {
    return { label: "Temporale", Icon: CloudLightning };
  }
  return { label: "Condizioni variabili", Icon: CloudSun };
}

function localTimeLabel(value: string) {
  const match = value.match(/T(\d{2}:\d{2})/);
  return match?.[1] ?? "—";
}

function buildWeatherUrl() {
  const params = new URLSearchParams({
    latitude: destinations.map(item => item.latitude).join(","),
    longitude: destinations.map(item => item.longitude).join(","),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export default function DestinationWeather({
  airport,
}: {
  airport: AirportFilter;
}) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const cached = readCache();
    const cacheIsFresh =
      Boolean(cached) &&
      refreshCount === 0 &&
      Date.now() - (cached?.fetchedAt ?? 0) < CACHE_TTL_MS;

    if (cached) {
      setObservations(cached.observations);
      setFetchedAt(cached.fetchedAt);
      if (cacheIsFresh) setStatus("ready");
    }

    const loadWeather = async () => {
      setStatus("loading");
      try {
        const response = await fetch(buildWeatherUrl(), {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Servizio meteo non disponibile");
        const body: unknown = await response.json();
        if (!Array.isArray(body) || body.length !== destinations.length) {
          throw new Error("Risposta meteo incompleta");
        }

        const next = (body as ApiWeatherPoint[]).map((point, index) => {
          const current = point.current;
          if (
            !current ||
            !Number.isFinite(current.temperature_2m) ||
            !Number.isFinite(current.apparent_temperature) ||
            !Number.isFinite(current.relative_humidity_2m) ||
            !Number.isFinite(current.weather_code) ||
            !Number.isFinite(current.wind_speed_10m) ||
            typeof current.time !== "string"
          ) {
            throw new Error("Osservazione meteo incompleta");
          }
          return {
            destinationId: destinations[index]!.id,
            temperature: current.temperature_2m!,
            apparentTemperature: current.apparent_temperature!,
            humidity: current.relative_humidity_2m!,
            weatherCode: current.weather_code!,
            windSpeed: current.wind_speed_10m!,
            localTime: current.time,
          };
        });

        const cacheData: CacheData = {
          fetchedAt: Date.now(),
          observations: next,
        };
        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch {
          // The live response remains usable when browser storage is unavailable.
        }
        if (!mounted) return;
        setObservations(next);
        setFetchedAt(cacheData.fetchedAt);
        setStatus("ready");
      } catch {
        if (!mounted || controller.signal.aborted) return;
        setStatus("error");
      }
    };

    if (!cacheIsFresh) void loadWeather();
    const timer = window.setInterval(
      () => void loadWeather(),
      REFRESH_INTERVAL_MS
    );
    return () => {
      mounted = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, [refreshCount]);

  const visibleDestinations = useMemo(
    () =>
      destinations.filter(
        destination => airport === "Tutti" || destination.airport === airport
      ),
    [airport]
  );
  const observationById = useMemo(
    () => new Map(observations.map(item => [item.destinationId, item])),
    [observations]
  );
  const refreshedLabel = fetchedAt
    ? new Date(fetchedAt).toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <section
      className="destination-weather"
      aria-labelledby="destination-weather-title"
    >
      <div className="destination-weather-header">
        <div>
          <span className="section-label">COM’È IL TEMPO LÀ?</span>
          <h2 id="destination-weather-title">Meteo adesso</h2>
          <p>Condizioni correnti nelle destinazioni delle offerte dirette.</p>
        </div>
        <div className="destination-weather-actions">
          {refreshedLabel && (
            <span className="weather-refresh-label">
              {status === "error" ? "Ultimi dati" : "Aggiornato"} ·{" "}
              {refreshedLabel}
            </span>
          )}
          <button
            className="weather-refresh-button"
            type="button"
            onClick={() => setRefreshCount(value => value + 1)}
            disabled={status === "loading" && observations.length === 0}
            aria-label="Aggiorna meteo"
          >
            <RefreshCw
              size={15}
              className={status === "loading" ? "weather-spinning" : ""}
            />
            Aggiorna
          </button>
        </div>
      </div>

      {status === "error" && observations.length === 0 && (
        <div className="weather-error" role="status">
          <Cloud size={18} />
          <span>Non riesco a caricare il meteo adesso.</span>
          <button
            type="button"
            onClick={() => setRefreshCount(value => value + 1)}
          >
            Riprova
          </button>
        </div>
      )}
      {status === "error" && observations.length > 0 && (
        <p className="weather-stale-message" role="status">
          Aggiornamento non riuscito: mostro gli ultimi dati caricati.
        </p>
      )}

      <div className="destination-weather-grid">
        {visibleDestinations.map(destination => {
          const observation = observationById.get(destination.id);
          const condition = observation
            ? conditionFor(observation.weatherCode)
            : null;
          const Icon = condition?.Icon ?? CloudSun;
          return (
            <article className="destination-weather-card" key={destination.id}>
              <div className="weather-city-top">
                <div>
                  <h3>{destination.name}</h3>
                  <p>{destination.country}</p>
                </div>
                <span className="weather-origin-tag">
                  {destination.airportCode} · {destination.airport}
                </span>
              </div>
              {observation ? (
                <>
                  <div className="weather-now">
                    <span className="weather-condition-icon">
                      <Icon size={25} />
                    </span>
                    <strong>{Math.round(observation.temperature)}°</strong>
                    <span>{condition?.label}</span>
                  </div>
                  <div className="weather-card-meta">
                    <span>
                      <Droplets size={13} /> {Math.round(observation.humidity)}%
                    </span>
                    <span>
                      <Wind size={13} /> {Math.round(observation.windSpeed)}{" "}
                      km/h
                    </span>
                    <span>
                      Percepiti {Math.round(observation.apparentTemperature)}°
                    </span>
                  </div>
                  <div className="weather-card-time">
                    Ora locale {localTimeLabel(observation.localTime)}
                  </div>
                </>
              ) : (
                <div
                  className="weather-card-loading"
                  aria-label="Caricamento meteo"
                >
                  {status === "error"
                    ? "Dato non disponibile"
                    : "Carico il meteo…"}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <a
        className="weather-attribution"
        href="https://open-meteo.com/en/licence"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dati meteo: Open-Meteo.com · licenza CC BY 4.0
      </a>
    </section>
  );
}
