import { ArrowUpRight, MapPin } from 'lucide-react';
const statusNames = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };
export default function CharacterCard({ character, onClick }) {
  const status = character.status.toLowerCase();
  return <button className="character-card" type="button" onClick={() => onClick(character.id)} aria-label={`Ver detalles de ${character.name}`}>
    <div className="card-image-wrap"><img src={character.image} alt={`Retrato de ${character.name}`} loading="lazy"/><span className={`status-pill status-${status}`}><i/>{statusNames[character.status] || character.status}</span></div>
    <div className="card-body"><div className="card-eyebrow">#{String(character.id).padStart(3, '0')} <ArrowUpRight size={17}/></div><h3>{character.name}</h3><p className="species">{character.species} · {character.gender === 'Male' ? 'Masculino' : character.gender === 'Female' ? 'Femenino' : character.gender}</p><div className="card-location"><MapPin size={15}/><span title={character.location.name}>{character.location.name}</span></div></div>
  </button>;
}
