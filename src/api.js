// Appels à l'API Open-Meteo (gratuite, sans clé) : https://open-meteo.com

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

// Cherche des villes à partir d'un texte. Renvoie une liste de lieux.
export async function searchCities(query, signal) {
  const params = new URLSearchParams({ name: query, count: '6', language: 'fr', format: 'json' });
  const res = await fetch(`${GEO_URL}?${params}`, { signal });
  if (!res.ok) throw new Error('La recherche de ville a échoué.');
  const data = await res.json();
  return (data.results ?? []).map(r => ({
    id: r.id,
    name: r.name,
    region: [r.admin1, r.country].filter(Boolean).join(', '),
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

// Récupère la météo actuelle, les 24 prochaines heures et les 7 prochains jours.
export async function getForecast({ latitude, longitude }, signal) {
  const params = new URLSearchParams({
    latitude, longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '7',
  });
  const res = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!res.ok) throw new Error('Impossible de récupérer la météo.');
  const d = await res.json();

  // On garde les 24 heures à partir de l'heure actuelle
  const nowHour = d.current.time.slice(0, 13);
  const start = Math.max(0, d.hourly.time.findIndex(t => t.slice(0, 13) === nowHour));
  const hourly = d.hourly.time.slice(start, start + 24).map((time, i) => ({
    time,
    temp: d.hourly.temperature_2m[start + i],
    code: d.hourly.weather_code[start + i],
    rain: d.hourly.precipitation_probability[start + i],
    isDay: d.hourly.is_day[start + i] === 1,
  }));

  const daily = d.daily.time.map((date, i) => ({
    date,
    code: d.daily.weather_code[i],
    max: d.daily.temperature_2m_max[i],
    min: d.daily.temperature_2m_min[i],
    rain: d.daily.precipitation_probability_max[i],
    sunrise: d.daily.sunrise[i],
    sunset: d.daily.sunset[i],
  }));

  return {
    current: {
      temp: d.current.temperature_2m,
      feels: d.current.apparent_temperature,
      humidity: d.current.relative_humidity_2m,
      wind: d.current.wind_speed_10m,
      code: d.current.weather_code,
      isDay: d.current.is_day === 1,
      time: d.current.time,
    },
    hourly,
    daily,
  };
}
