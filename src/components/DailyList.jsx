import WeatherIcon from './WeatherIcon.jsx';
import { describe } from '../weatherCodes.js';

const dayFmt = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric' });

// Chaque jour affiche une barre min–max placée sur l'échelle de toute la semaine.
export default function DailyList({ days }) {
  const low = Math.min(...days.map(d => d.min));
  const high = Math.max(...days.map(d => d.max));
  const span = Math.max(1, high - low);

  return (
    <section className="panel">
      <h3>7 prochains jours</h3>
      <ul className="days">
        {days.map((d, i) => {
          const { label, icon } = describe(d.code);
          const left = ((d.min - low) / span) * 100;
          const width = ((d.max - d.min) / span) * 100;
          return (
            <li key={d.date}>
              <span className="d-name">{i === 0 ? "Aujourd'hui" : dayFmt.format(new Date(d.date + 'T12:00'))}</span>
              <span className="d-icon" title={label}><WeatherIcon type={icon} size={28} /></span>
              <span className="d-rain">{d.rain ?? 0} %</span>
              <span className="d-min">{Math.round(d.min)}°</span>
              <span className="range" aria-hidden="true"><span style={{ left: `${left}%`, width: `${Math.max(width, 4)}%` }} /></span>
              <span className="d-max">{Math.round(d.max)}°</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
