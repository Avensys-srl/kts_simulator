# KTS Simulator (UI Prototype)

UI prototype that replicates the KTS controller screens (HOME, MENU, SET BOX INFO, settings/service/info trees) with interactive navigation, search, and simulated controls.

## Features
- HOME screen with speed wedge, power button, and live info box rotation
- MENU screen with Settings / Service / Info
- SET BOX INFO screen with selectable tiles (active/inactive) and persistence
- Tree navigation for Settings, Service, and Info
- Search to jump directly to any screen node

## Project structure
- `kts.html` – entry point
- `css/kts.css` – styles
- `js/kts.app.js` – UI logic, rendering, interactions
- `data/kts.data.js` – navigation tree data

## Run locally
Open `kts.html` in a browser (no build step required).

## Notes
- State such as selected SET BOX INFO tiles is stored in `localStorage`.
- Speed wedge bars reflect the current speed percentage and step size.

## License
Internal prototype (no license specified).