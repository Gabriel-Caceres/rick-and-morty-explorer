# Portalverse — Rick and Morty Explorer

Aplicación web desarrollada con **React + Vite**, que consume la [Rick and Morty API](https://rickandmortyapi.com/documentation/#rest) usando `fetch()`.

## Características

- Tarjetas con imagen, nombre, especie, género, estado y ubicación.
- Búsqueda por nombre con retraso de 350 ms, consultando la API.
- Filtros combinables por estado y especie (en el servidor).
- Paginación real de la API.
- Modal de detalles con origen, ubicación, tipo y cantidad de episodios.
- Manejo de error, carga y ausencia de resultados.
- Diseño responsive y oscuro.
- Preparado para AWS Amplify Hosting.

## Requisitos

Node.js 20.19+ (o 22.12+) y npm.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre el enlace local que muestre Vite, habitualmente http://localhost:5173.

## Compilar y comprobar

```bash
npm run build
npm run preview
```

## Estructura

- `src/App.jsx`: componente principal, filtros, paginación y estados.
- `src/components/CharacterCard.jsx`: tarjeta individual.
- `src/components/CharacterModal.jsx`: ficha detallada.
- `src/services/api.js`: comunicación REST y errores.
- `src/hooks/useDebounce.js`: reduce peticiones al escribir.
- `src/styles.css`: diseño global y responsivo.
- `amplify.yml`: configuración del despliegue AWS.

## Verificaciones para la entrega

- [x] `npm run build` termina sin errores.
- [x] Se muestran tarjetas con imágenes.
- [x] Búsqueda por nombre funciona.
- [x] Filtros por estado y especie funcionan juntos.
- [x] No hay resultados y errores muestran mensajes útiles.
- [x] Detalle abre y cierra (también con Escape).
- [x] Paginación funciona.
- [x] Vista móvil funciona.
- [x] Repositorio GitHub está accesible para el profesor.
- [x] URL de AWS abre correctamente sin iniciar sesión.

Datos y personajes pertenecen a sus respectivos titulares; proyecto académico no oficial.
