import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Atom, Github, LoaderCircle, RefreshCcw, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import { getCharacters } from './services/api';
import { useDebounce } from './hooks/useDebounce';

const statusOptions = [{ value: '', label: 'Todos los estados' }, { value: 'alive', label: 'Vivos' }, { value: 'dead', label: 'Muertos' }, { value: 'unknown', label: 'Desconocidos' }];
const speciesOptions = [{ value: '', label: 'Todas las especies' }, { value: 'Human', label: 'Humanos' }, { value: 'Alien', label: 'Alienígenas' }, { value: 'Robot', label: 'Robots' }, { value: 'Humanoid', label: 'Humanoides' }, { value: 'Animal', label: 'Animales' }, { value: 'Mythological Creature', label: 'Criaturas mitológicas' }];

export default function App() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ info: { pages: 0, count: 0 }, results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const delayedName = useDebounce(name);
  const closeModal = useCallback(() => setSelectedId(null), []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    getCharacters({ name: delayedName, status, species, page }, controller.signal)
      .then(setData).catch(e => { if (e.name !== 'AbortError') setError(e.message || 'No se pudo conectar con la API.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [delayedName, status, species, page, reloadKey]);
  const updateName = value => { setName(value); setPage(1); };
  const updateStatus = value => { setStatus(value); setPage(1); };
  const updateSpecies = value => { setSpecies(value); setPage(1); };
  const clearFilters = () => { setName(''); setStatus(''); setSpecies(''); setPage(1); };
  const hasFilters = Boolean(name || status || species);
  const navigate = newPage => { setPage(newPage); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar"><div className="topbar-inner"><a className="brand" href="#inicio" aria-label="Volver al inicio"><span className="brand-symbol"><Atom size={23}/></span><span>PORTAL<span className="brand-highlight">VERSE</span><small>EXPLORADOR MULTIVERSAL</small></span></a><nav><a href="#catalogo">Personajes</a><a className="nav-api" href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">La API ↗</a></nav></div></header>
    <main id="inicio"><section className="hero"><div className="hero-content"><div className="hero-label"><Sparkles size={14}/> ARCHIVO INTERDIMENSIONAL 001</div><h1>El multiverso<br/>está <em>en tus manos.</em></h1><p>De la Tierra C-137 hasta los rincones más extraños del cosmos. Encuentra a cada personaje de Rick and Morty.</p><a className="hero-cta" href="#catalogo">Explorar personajes <ArrowRight size={18}/></a><div className="hero-note"><span className="signal-dot"/> Conectado a Rick and Morty API</div></div><div className="portal-art" aria-hidden="true"><div className="portal-ring ring-outer"/><div className="portal-ring ring-middle"/><div className="portal-ring ring-inner"/><div className="portal-core"><Atom size={100} strokeWidth={.65}/></div><span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="portal-caption">PORTAL / C-137</span></div></section>
    <section className="catalog" id="catalogo"><div className="section-top"><div><div className="section-kicker">BASE DE DATOS MULTIVERSAL</div><h2>Directorio de <span>personajes</span></h2><p>Busca, filtra y descubre quién es quién en el multiverso.</p></div><div className="count-box"><strong>{loading ? '—' : data.info.count.toLocaleString('es-CL')}</strong><small>RESULTADOS</small></div></div>
    <div className="filter-panel"><label className="search-field"><Search size={20}/><input value={name} onChange={e => updateName(e.target.value)} placeholder="Buscar personaje por nombre..." aria-label="Buscar personaje por nombre"/>{name && <button type="button" onClick={() => updateName('')} aria-label="Borrar búsqueda"><X size={17}/></button>}</label><div className="select-field"><SlidersHorizontal size={18}/><select value={status} onChange={e => updateStatus(e.target.value)} aria-label="Filtrar por estado">{statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div><div className="select-field"><select value={species} onChange={e => updateSpecies(e.target.value)} aria-label="Filtrar por especie">{speciesOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>{hasFilters && <button type="button" className="clear-filters" onClick={clearFilters}>Limpiar <X size={15}/></button>}</div>
    <div className="results-line"><span>{loading ? 'Buscando en las dimensiones...' : `${data.results.length} personajes en esta página`}</span><span>{!loading && data.info.pages > 0 ? `Página ${page} de ${data.info.pages}` : ''}</span></div>
    {error ? <div className="state-box" role="alert"><h3>Se perdió la conexión con el portal</h3><p>{error}</p><button type="button" className="action-button" onClick={() => setReloadKey(k => k + 1)}><RefreshCcw size={17}/> Reintentar</button></div> : loading ? <div className="state-box" role="status"><LoaderCircle className="spin" size={34}/><p>Buscando personajes entre dimensiones...</p></div> : data.results.length === 0 ? <div className="state-box"><Search size={34}/><h3>No encontramos personajes</h3><p>Prueba otro nombre o cambia los filtros.</p><button type="button" className="action-button" onClick={clearFilters}>Restablecer filtros</button></div> : <div className="character-grid">{data.results.map(character => <CharacterCard key={character.id} character={character} onClick={setSelectedId}/>)}</div>}
    {!loading && !error && data.info.pages > 1 && <div className="pagination"><button type="button" onClick={() => navigate(page - 1)} disabled={page === 1}><ArrowLeft size={17}/> Anterior</button><span>{page} / {data.info.pages}</span><button type="button" onClick={() => navigate(page + 1)} disabled={page === data.info.pages}>Siguiente <ArrowRight size={17}/></button></div>}</section></main>
    <footer><span><Atom size={16}/> PORTALVERSE</span><p>Proyecto académico en React · Datos de <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">Rick and Morty API</a></p><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a></footer>
    {selectedId !== null && <CharacterModal id={selectedId} onClose={closeModal}/>}
  </div>;
}
