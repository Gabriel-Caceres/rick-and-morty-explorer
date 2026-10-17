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

## Publicar en GitHub

1. Crea un repositorio vacío en GitHub llamado `rick-and-morty-explorer` (no marques README inicial).
2. En la carpeta del proyecto ejecuta:

```bash
git init
git add .
git commit -m "Proyecto React Rick and Morty completo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/rick-and-morty-explorer.git
git push -u origin main
```

Sustituye `TU_USUARIO`. GitHub puede solicitar autenticación por navegador.

## Desplegar en AWS Amplify

1. Abre [AWS Amplify](https://console.aws.amazon.com/amplify/home).
2. Elige crear una aplicación y **Deploy an app** / desplegar mediante Git.
3. Selecciona **GitHub**, autoriza el acceso y selecciona el repositorio.
4. Elige la rama `main`.
5. Comprueba que los comandos son `npm install`, `npm run build` y la carpeta de salida `dist` (ya configurado en `amplify.yml`).
6. Confirma **Save and deploy** / **Deploy**.
7. Al finalizar, copia la URL `https://...amplifyapp.com` y pruébala en modo incógnito.

> AWS puede generar costos según consumo y plan. Revisa los precios, alertas y presupuesto de tu cuenta antes de desplegar.

## Verificaciones para la entrega

- [ ] `npm run build` termina sin errores.
- [ ] Se muestran tarjetas con imágenes.
- [ ] Búsqueda por nombre funciona.
- [ ] Filtros por estado y especie funcionan juntos.
- [ ] No hay resultados y errores muestran mensajes útiles.
- [ ] Detalle abre y cierra (también con Escape).
- [ ] Paginación funciona.
- [ ] Vista móvil funciona.
- [ ] Repositorio GitHub está accesible para el profesor.
- [ ] URL de AWS abre correctamente sin iniciar sesión.

### Entrega

- GitHub: `https://github.com/TU_USUARIO/rick-and-morty-explorer`
- AWS: `https://TU_DOMINIO.amplifyapp.com`

Datos y personajes pertenecen a sus respectivos titulares; proyecto académico no oficial.
