# KTS Simulator (UI Prototype)

A front-end prototype that replicates the KTS controller user interface and navigation flows. It is meant for UI/UX validation and stakeholder review, not for device control.

---

## What this is
- A static, browser-based simulator of KTS screens (HOME, MENU, SET BOX INFO, Settings/Service/Info trees).
- A navigable UI that mirrors the device structure and includes a search-to-screen jump.

## What this is **not**
- Not connected to real hardware or backend logic.
- Not a functional control system.

---

## Features
- **HOME screen**
  - Power button with OFF blackout state.
  - Speed wedge visualization with multi-layer bars.
  - Up/Down controls to change speed percentage.
  - Info box that cycles through selected variables.

- **MENU screen**
  - Settings / Service / Info entry points.

- **SET BOX INFO**
  - Selectable tiles (active = green, inactive = blue).
  - Active selections rotate in the HOME info box.
  - Selection state persists via `localStorage`.

- **Navigation tree**
  - Full Settings/Service/Info hierarchy.
  - Paging controls (`<<` / `>>`) for grouped pages.

- **Search**
  - Type to filter any node and jump directly to the path.

---

## File structure
```
/ (root)
+- kts.html           # Entry point
+- css/
¦  +- kts.css         # Styles
+- js/
¦  +- kts.app.js      # UI logic, rendering, interactions
+- data/
¦  +- kts.data.js     # Navigation tree data
+- README.md
```

---

## Run locally
No build step is required.
1. Open `kts.html` in a browser.
2. (Optional) Use a local server if you want to avoid file-URL restrictions.

---

## Configuration knobs
All visual positioning for the speed wedge, arrows, and percentage is anchored to the blue frame via CSS variables:

```css
.speedBox{
  --wedge-x: 50%;
  --wedge-y: 46px;
  --arrows-x: 52px;
  --arrows-y: 50%;
  --pct-x: 30px;
  --pct-y: 12px;
}
```

You can adjust those values to align with the device screenshots.

---

## State persistence
The simulator stores SET BOX INFO selections in `localStorage` under:
- `kts.pageVars`

Delete browser storage to reset.

---

## Known limitations
- Pure front-end simulation only.
- No real device data or sensors.
- Values are placeholders unless wired to real data.

---

## Contributing
This repository is a prototype. If you add new screens:
- Extend the tree in `data/kts.data.js`.
- Add UI render logic in `js/kts.app.js` if needed.

---

## License
Internal prototype (no license specified).