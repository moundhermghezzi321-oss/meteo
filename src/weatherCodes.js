// Codes météo WMO utilisés par Open-Meteo → libellé français + type d'icône
const CODES = {
  0: ['Ciel dégagé', 'clear'],
  1: ['Plutôt dégagé', 'partly'],
  2: ['Partiellement nuageux', 'partly'],
  3: ['Couvert', 'cloud'],
  45: ['Brouillard', 'fog'], 48: ['Brouillard givrant', 'fog'],
  51: ['Bruine légère', 'drizzle'], 53: ['Bruine', 'drizzle'], 55: ['Bruine forte', 'drizzle'],
  56: ['Bruine verglaçante', 'drizzle'], 57: ['Bruine verglaçante', 'drizzle'],
  61: ['Pluie faible', 'rain'], 63: ['Pluie', 'rain'], 65: ['Pluie forte', 'rain'],
  66: ['Pluie verglaçante', 'rain'], 67: ['Pluie verglaçante', 'rain'],
  71: ['Neige faible', 'snow'], 73: ['Neige', 'snow'], 75: ['Neige forte', 'snow'], 77: ['Grains de neige', 'snow'],
  80: ['Averses', 'rain'], 81: ['Averses', 'rain'], 82: ['Averses violentes', 'rain'],
  85: ['Averses de neige', 'snow'], 86: ['Averses de neige', 'snow'],
  95: ['Orage', 'storm'], 96: ['Orage avec grêle', 'storm'], 99: ['Orage avec grêle', 'storm'],
};

export function describe(code) {
  const [label, icon] = CODES[code] ?? ['Inconnu', 'cloud'];
  return { label, icon };
}
