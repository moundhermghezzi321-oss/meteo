import WeatherIcon from './WeatherIcon.jsx';
import { describe } from '../weatherCodes.js';

export default function HourlyStrip({ hours }) {
  return (
    <section className="panel">
      <h3>Prochaines 24 heures</h3>
      <ol className="hours">
        {hours.map((h, i) => (
          <li key={h.time}>
            <span className="h-time">{i === 0 ? 'Maint.' : `${h.time.slice(11, 13)} h`}</span>
            <WeatherIcon type={describe(h.code).icon} isDay={h.isDay} size={32} />
            <span className="h-temp">{Math.round(h.temp)}°</span>
            <span className="h-rain">{h.rain ?? 0} %</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
