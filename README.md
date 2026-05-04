# CityPet

MVP funcional de una comunidad urbana para mascotas. Esta primera version prioriza validacion visual y navegacion completa con datos mock en memoria.

## Incluye

- Landing profesional responsive.
- Feed social con likes simulados.
- Match de mascotas con acciones simuladas.
- Marketplace de servicios y productos.
- Dashboard de usuario mock.
- Perfil publico de mascota.
- Dataset mock en `src/data/mockData.ts`.
- Prisma corregido para SQLite, listo para evolucionar.

## Ejecutar

```bash
npm install
npm run db:generate
npm run lint
npm run build
npm run dev
```

Abrir `http://localhost:3000`.

## Estado de datos

La app funciona con mocks. Prisma genera cliente correctamente, pero las pantallas no dependen todavia de base de datos real.
