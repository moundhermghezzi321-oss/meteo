import { useEffect, useState } from 'react';
import { searchCities } from '../api.js';

// Champ de recherche avec suggestions. On attend 350 ms après la frappe (debounce)
// et on annule la requête précédente avec AbortController.
export default function SearchBar({ onSelect, onLocate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | empty | error

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setResults([]); setStatus('idle'); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus('loading');
      try {
        const list = await searchCities(q, controller.signal);
        setResults(list);
        setStatus(list.length ? 'idle' : 'empty');
      } catch (e) {
        if (e.name !== 'AbortError') setStatus('error');
      }
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  function choose(city) {
    onSelect(city);
    setQuery('');
    setResults([]);
  }

  return (
    <div className="search">
      <div className="search-row">
        <label htmlFor="city" className="sr">Rechercher une ville</label>
        <input
          id="city"
          type="search"
          placeholder="Rechercher une ville…"
          value={query}
          autoComplete="off"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && results[0]) choose(results[0]); }}
        />
        <button type="button" className="btn-locate" onClick={onLocate}>Ma position</button>
      </div>
      {(results.length > 0 || status === 'empty' || status === 'error' || status === 'loading') && (
        <ul className="suggestions" role="listbox">
          {status === 'loading' && <li className="hint">Recherche…</li>}
          {status === 'empty' && <li className="hint">Aucune ville trouvée.</li>}
          {status === 'error' && <li className="hint">Recherche impossible. Vérifiez votre connexion.</li>}
          {results.map(c => (
            <li key={c.id}>
              <button type="button" onClick={() => choose(c)}>
                <strong>{c.name}</strong> <span>{c.region}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
