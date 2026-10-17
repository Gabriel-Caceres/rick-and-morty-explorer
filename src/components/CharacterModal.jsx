import { useEffect, useState } from 'react';
import { X, MapPin, Globe2, Dna, UserRound, Tv, LoaderCircle } from 'lucide-react';
import { getCharacter } from '../services/api';
const statuses = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };
export default function CharacterModal({ id, onClose }) {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    getCharacter(id, controller.signal).then(setCharacter).catch(e => { if (e.name !== 'AbortError') setError(e.message); });
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { controller.abort(); document.removeEventListener('keydown', onKey); document.body.style.overflow = oldOverflow; };
  }, [id, onClose]);
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-label={character ? `Detalles de ${character.name}` : 'Cargando personaje'}>
      <button className="close-modal" type="button" onClick={onClose} aria-label="Cerrar detalle"><X size={23}/></button>
      {error && <div className="modal-state" role="alert">{error}</div>}
      {!error && !character && <div className="modal-state"><LoaderCircle className="spin"/> Cargando expediente...</div>}
      {character && <><img className="detail-image" src={character.image} alt={character.name}/><div className="detail-content"><div className="detail-kicker">EXPEDIENTE INTERDIMENSIONAL · #{character.id}</div><h2>{character.name}</h2><span className={`status-pill inline-status status-${character.status.toLowerCase()}`}><i/>{statuses[character.status]}</span><div className="detail-facts"><div><Dna size={19}/><span><small>Especie y tipo</small><strong>{character.species}{character.type ? ` · ${character.type}` : ''}</strong></span></div><div><UserRound size={19}/><span><small>Género</small><strong>{character.gender}</strong></span></div><div><Globe2 size={19}/><span><small>Origen</small><strong>{character.origin.name}</strong></span></div><div><MapPin size={19}/><span><small>Última ubicación</small><strong>{character.location.name}</strong></span></div><div><Tv size={19}/><span><small>Apariciones</small><strong>{character.episode.length} episodios</strong></span></div></div><a className="api-link" href={character.url} target="_blank" rel="noreferrer">Ver JSON original ↗</a></div></>}
    </section>
  </div>;
}
