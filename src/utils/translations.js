// Los datos que usa la API permanecen en inglés; solo cambiamos lo que ve el usuario.
export const statusNames = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
};

export const genderNames = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

export const speciesNames = {
  Human: 'Humano',
  Alien: 'Extraterrestre',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  'Mythological Creature': 'Criatura mitológica',
  Poopybutthole: 'Poopybutthole',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  unknown: 'Desconocida',
};

export function translateStatus(status) {
  return statusNames[status] ?? status;
}

export function translateGender(gender) {
  return genderNames[gender] ?? gender;
}

export function translateSpecies(species) {
  return speciesNames[species] ?? species;
}

// Los values deben coincidir con los términos originales de la API.
export const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'alive', label: 'Vivos' },
  { value: 'dead', label: 'Muertos' },
  { value: 'unknown', label: 'Desconocidos' },
];

export const speciesOptions = [
  { value: '', label: 'Todas las especies' },
  { value: 'Human', label: 'Humanos' },
  { value: 'Alien', label: 'Extraterrestres' },
  { value: 'Robot', label: 'Robots' },
  { value: 'Humanoid', label: 'Humanoides' },
  { value: 'Animal', label: 'Animales' },
  { value: 'Mythological Creature', label: 'Criaturas mitológicas' },
  { value: 'Poopybutthole', label: 'Poopybutthole' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Enfermedades' },
  { value: 'unknown', label: 'Desconocidas' },
];
