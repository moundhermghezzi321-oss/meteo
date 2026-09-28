import WeatherIcon from './WeatherIcon.jsx';
import { describe } from '../weatherCodes.js';

const r = n => Math.round(n);
const hourFmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

export default function CurrentWeather({ place, data, isFavorite, onToggleFavorite }) {
  const { current, daily } = data;
  const { label, icon } = describe(current.code);
  const today = daily[0];

  return (
    <section className="current">
      <div className="current-head">
        <div>
          <h2>{place.name}</h2>
          {place.region && <p className="region">{place.region}</p>}
        </div>
        <button type="button" className={`fav ${isFavorite ? 'on' : ''}`} onClick={onToggleFavorite} aria-pressed={isFavorite}>
          {isFavorite ? '★ Favori' : '☆ Ajouter aux favoris'}
        </button>
      </div>

      <div className="current-main">
        <WeatherIcon type={icon} isDay={current.isDay} size={96} />
        <div>
          <div className="temp">{r(current.temp)}<sup>°C</sup></div>
          <p className="cond">{label} · max {r(today.max)}° / min {r(today.min)}°</p>
        </div>
      </div>

      <dl className="stats">
        <div><dt>Ressenti</dt><dd>{r(current.feels)}°C</dd></div>
        <div><dt>Humidité</dt><dd>{current.humidity} %</dd></div>
        <div><dt>Vent</dt><dd>{r(current.wind)} km/h</dd></div>
        <div><dt>Pluie</dt><dd>{today.rain ?? 0} %</dd></div>
        <div><dt>Lever</dt><dd>{hourFmt.format(new Date(today.sunrise))}</dd></div>
        <div><dt>Coucher</dt><dd>{hourFmt.format(new Date(today.sunset))}</dd></div>
      </dl>
    </section>
  );
}
