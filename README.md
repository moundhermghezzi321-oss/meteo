# Météo

Application météo en **React** : on cherche une ville et on obtient la météo actuelle, les prévisions heure par heure sur 24 heures et les prévisions sur 7 jours.

Les données viennent de l'API gratuite [Open-Meteo](https://open-meteo.com/) (aucune clé nécessaire).

## Fonctionnalités

- Recherche de ville avec suggestions (debounce de 350 ms)
- Météo actuelle : température, ressenti, humidité, vent, lever et coucher du soleil
- Prévisions heure par heure (24 h) et sur 7 jours avec barres min / max
- Géolocalisation (« Ma position »)
- Villes favorites sauvegardées dans le navigateur
- Gestion des états de chargement et des erreurs
- Icônes SVG faites à la main, design responsive, mode sombre automatique

## Technologies

- React 18 (hooks : `useState`, `useEffect`)
- Vite
- API REST avec `fetch` et `AbortController`
- Déploiement automatique sur GitHub Pages avec GitHub Actions

## Ce que j'ai appris

- Découper une interface en composants réutilisables
- Appeler une API, transformer ses données et gérer les erreurs
- Annuler une requête devenue inutile avec `AbortController`
- Éviter trop d'appels pendant la frappe (debounce)
- Configurer un déploiement continu

## Lancer le projet

```bash
npm install
npm run dev
```

## Structure

```
src/
  App.jsx                  état principal, chargement des données, favoris
  api.js                   appels à Open-Meteo
  weatherCodes.js          codes météo → libellés en français
  components/
    SearchBar.jsx          recherche avec suggestions
    CurrentWeather.jsx     météo actuelle
    HourlyStrip.jsx        prochaines 24 heures
    DailyList.jsx          7 prochains jours
    WeatherIcon.jsx        icônes SVG
```
