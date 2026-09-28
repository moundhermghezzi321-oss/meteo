// Petites icônes SVG dessinées à la main, colorées par les variables CSS.
export default function WeatherIcon({ type, isDay = true, size = 40 }) {
  const sun = (
    <g className="i-sun">
      <circle cx="24" cy="24" r="8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <line key={a} x1="24" y1="9" x2="24" y2="5" transform={`rotate(${a} 24 24)`} />
      ))}
    </g>
  );
  const moon = <path className="i-moon" d="M29 10a12 12 0 1 0 9 19 10 10 0 0 1-9-19z" />;
  const cloud = (dx = 0, dy = 0) => (
    <path className="i-cloud" transform={`translate(${dx} ${dy})`}
      d="M15 36h19a7 7 0 0 0 0-14 10 10 0 0 0-19 2 6 6 0 0 0 0 12z" />
  );
  const drops = n => [14, 22, 30].slice(0, n).map(x => (
    <line key={x} className="i-rain" x1={x + 2} y1="40" x2={x} y2="45" />
  ));
  const flakes = [15, 23, 31].map(x => <circle key={x} className="i-snow" cx={x} cy="43" r="1.6" />);

  let body;
  switch (type) {
    case 'clear': body = isDay ? sun : moon; break;
    case 'partly': body = <>{isDay ? <g transform="translate(-6 -6) scale(.8)">{sun}</g> : <g transform="translate(-5 -6) scale(.8)">{moon}</g>}{cloud(3, 2)}</>; break;
    case 'fog': body = <>{cloud(0, -4)}{[38, 43].map(y => <line key={y} className="i-fog" x1="10" y1={y} x2="38" y2={y} />)}</>; break;
    case 'drizzle': body = <>{cloud(0, -4)}{drops(2)}</>; break;
    case 'rain': body = <>{cloud(0, -4)}{drops(3)}</>; break;
    case 'snow': body = <>{cloud(0, -4)}{flakes}</>; break;
    case 'storm': body = <>{cloud(0, -4)}<path className="i-bolt" d="M24 33l-4 7h5l-3 7 8-9h-5l3-5z" /></>; break;
    default: body = cloud();
  }
  return <svg className="wicon" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">{body}</svg>;
}
