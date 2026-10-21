# Ship Dock Twin

A 3D layout map of a warehouse outbound ship dock, built section by section from photos the user takes on the floor. Goal: an accurate floor layout that can later show real data per staging spot. Layout only: never model carts, pallets or boxes.

## Files
- This repo also holds an unrelated Hugo site (bettercap docs: `content/`, `docs/`, `themes/` …). Leave it alone; dock work only touches the two files below.
- `dock-map.html`: the whole app. One self-contained page using Three.js r128 + OrbitControls from jsDelivr. Open it in a browser to view.

## How the code is organized (top of the script)
- `CFG`: all dimensions in feet. x runs along the dock wall (door numbers increase with x), z runs out into the building.
- `DOORS`: one entry per door seen in photos. Fields: `src`, `note`, `hatch` (keep-clear zone), `maxreach`, `sr` + `srOff` (SR station and its roller table), `staging` (`cols`, `spots`, `off`, `inferred`).
- Doors with no entry render faded as "not surveyed yet". The progress bar counts `DOORS` entries.
- Everything tapped shows its source: confirmed in photos, label not read yet, from the sketch, or approximate.
- A CSV box (`id,status`) colors staging spots: empty, cart, pallet, full, ready.

## Facts confirmed from photos
- Doors 149–176 on one wall, ~9 ft wide on ~13 ft centres (estimated). Open doors show their number high, closed doors low.
- Staging spots: 4 ft wide × 5 ft deep (measured by user), in columns of 5 running straight out from the wall, starting ~12 ft off it. Spot 1 is nearest the door. QR code in each spot, label on one side edge.
- Columns usually sit just to the lower-number side of their door (157, 160, 161). Exception: 162 and 163 flank the walkway to exit W022.
- Door 176 staging: 2 columns, 8 spots, odd numbers front, even behind.
- MaxxReach extendable conveyors at doors 149, 150 and 154, each with taped and chained keep-out areas. 151 and 152 have no conveyor.
- SR stations between doors, each with a roller table angled toward the dock: SR-025 (155/156), SR-023 (158/159), SR-021 (beside 162, in front of the riser wall).
- Gap between 162 and 163 (~45 ft centre to centre, estimated): sprinkler risers 621–643, electrical panels, emergency exit W022.
- Walkways (green + pink tape): main one runs along the door aprons from ~159 up the dock and jogs to the kiosk at 157/158. Perpendicular walkways reach the wall beside 154, between 161/162, and straight to W022.
- Keep-clear red/white hatching in front of 156, 159, 161.
- Each door has a screen showing its load (e.g. "DD149 · CP-CENTRAL"). This is a likely live data source.
- Mezzanine sorter with spiral chutes runs the length of the dock. The flat sorter area holds STG-F spots. Positions of both are approximate.

## Still open
- Door 153 floor setup. Label on the box in front of 160. Readable labels for the STG-160, STG-162 and STG-163 columns.
- Doors 166–175 up close (roller tables there are approximate).
- Real door spacing and the 162→163 gap, by pacing it off.

## Working style
User sends photos one section at a time; update the map after each batch, say what changed and what is still a guess, then ask for the next specific shots. Keep replies short; the user is on a phone on the warehouse floor.
