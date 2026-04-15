# World Map Page

This page provides a MUI-styled global manufactory overview for the React app.

## Purpose

Show manufacturing sites around the world and let users inspect each site’s operational status at a glance.

## Features

- Interactive world map view
- 4 fixed zoom levels
- Double-click a country to center and zoom to it
- Click empty map area to zoom in step-by-step
- Click a manufactory point to jump to the maximum zoom level
- Hover a point to view details:
  - site name
  - region
  - manufacturing specialty
  - resourcing status
  - yield
  - defect rate
- MUI-based layout with cards, chips, tooltips, and responsive spacing

## Main file

- `WorldMapPage.tsx` — page component and interaction logic

## Data model

Each manufactory entry currently uses static demo data:

```ts
{
  id: string
  name: string
  region: string
  specialty: string
  resourcing: string
  yield: string
  defect: string
  x: number
  y: number
}
```

## UI behavior

- Zoom is intentionally discrete instead of free-scroll.
- The plus/minus actions keep the experience predictable.
- The selected manufactory is also summarized in the right-side detail panel.

## Notes

- This implementation is demo-ready and prepared for future backend-driven data.
- Styling follows the existing MUI design language already used across the dashboard pages.
