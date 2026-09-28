import { useEffect, useState } from 'react';
import { getForecast } from './api.js';
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import HourlyStrip from './components/HourlyStrip.jsx';
import DailyList from './components/DailyList.jsx';

const PARIS = { id: 2988507, name: 'Paris', region: 'Île-de-France, France', latitude: 48.8534, longitude: 2.3488 };
const FAV_KEY = 'meteo-favoris';

function loadFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) ?? []; } catch { return []; }
}

export default function App() {
  const [place, setPlace] = useState(PARIS);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(loadFavorites);

  // Recharge la météo à chaque changement de lieu
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    getForecast(place, controller.signal)
      .then(d => { setData(d); setStatus('ready'); })
      .catch(e => {
        if (e.name === 'AbortError') return;
        setError(e.message || 'Une erreur est survenue.');
        setStatus('error');
      });
    return () => controller.abort();
  }, [place]);

  // Sauvegarde des favoris dans le navigateur
  useEffect(() => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch { /* ignoré */ }
  }, [favorites]);

  const isFavorite = favorites.some(f => f.id === place.id);
  function toggleFavorite() {
    setFavorites(list => isFavorite ? list.filter(f => f.id !== place.id) : [...list, place]);
  }

  function locate() {
    if (!navigator.geolocation) { setError("Votre navigateur ne permet pas la géolocalisation."); setStatus('error'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => setPlace({ id: 'gps', name: 'Ma position', region: '', latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => { setError("Position refusée. Recherchez une ville à la place."); setStatus('error'); },
      { timeout: 10000 }
    );
  }

  return (
    <div className="app">
      <header className="top">
        <h1>Météo</h1>
        <SearchBar onSelect={setPlace} onLocate={locate} />
      </header>

      {favorites.length > 0 && (
        <nav className="favorites" aria-label="Villes favorites">
          {favorites.map(f => (
            <button key={f.id} type="button" className={f.id === place.id ? 'active' : ''} onClick={() => setPlace(f)}>
              {f.name}
            </button>
          ))}
        </nav>
      )}

      {status === 'error' && (
        <div className="notice error">
          <p>{error}</p>
          <button type="button" onClick={() => setPlace({ ...place })}>Réessayer</button>
        </div>
      )}

      {status === 'loading' && !data && <div className="notice">Chargement de la météo…</div>}

      {data && (
        <main className={`grid ${status === 'loading' ? 'is-loading' : ''}`}>
          <CurrentWeather place={place} data={data} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
          <HourlyStrip hours={data.hourly} />
          <DailyList days={data.daily} />
        </main>
      )}

      <footer className="foot">
        Données : <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · Réalisé avec React et Vite
      </footer>
    </div>
  );
}
