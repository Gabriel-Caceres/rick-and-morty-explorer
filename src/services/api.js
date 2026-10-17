const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters({ name = '', status = '', species = '', page = 1 }, signal) {
  const params = new URLSearchParams({ page: String(page) });
  if (name.trim()) params.set('name', name.trim());
  if (status) params.set('status', status);
  if (species.trim()) params.set('species', species.trim());
  const response = await fetch(`${BASE_URL}/character/?${params}`, { signal });
  if (response.status === 404) return { info: { pages: 0, count: 0 }, results: [] };
  if (!response.ok) throw new Error(`Error al cargar personajes (${response.status}).`);
  return response.json();
}

export async function getCharacter(id, signal) {
  const response = await fetch(`${BASE_URL}/character/${id}`, { signal });
  if (!response.ok) throw new Error('No se pudo cargar el detalle del personaje.');
  return response.json();
}
