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
- Views: Plan (orthographic, default; rotates so the dock runs top-to-bottom on phones), Doors 149–163 close-up, 3D. Mezzanine toggle. Find box jumps to a door, spot or station. Helpers: `hatch()` striped tape, `rollerTable()`, `walk()` green/pink walkway, `beam()` for inclines, `addSpot()` (pass `null` id for a taped spot whose label is unread). Per-door wall kit is drawn in one loop from `DOORS` fields `screen`, `poster`, `louver`.

## Facts confirmed from photos
- Doors 149–176 on one wall, ~9 ft wide on ~13 ft centres (estimated). Open doors show their number high, closed doors low.
- Staging spots: 4 ft wide × 5 ft deep (measured by user), in columns of 5 running straight out from the wall, starting ~12 ft off it. Spot 1 is nearest the door. QR code in each spot, label on one side edge.
- Columns usually sit just to the lower-number side of their door (157, 160, 161). Exception: 162 and 163 flank the walkway to exit W022.
- Doors 166–169 (photo): STG-167 is 1 column of 4 spots (not 5), sitting between 167 and 168, on the higher-number side. So the "lower-number side" rule does not hold everywhere. Carts on blue tape at 165/166 (STG-166 inferred, 4 spots assumed). Red/white hatching in front of 166–168. SR-013 (twin screens) hangs in front of 169 with its roller table and incline at 169/170. Airbag roller table at 165/166. Posters: 168 "Keep safe spacing between moving carts", 166 PPE. Louvers above 168, 169. Screen DD166.
- STG-168 (photo from the 168 apron looking out): 168-1 nearest the door, 168-2 behind it; column sits between 168 and 169, so 166–169 columns sit on the higher-number side of their door. 4 spots assumed. Further out, a row of spots parallel to the wall with STG-1… labels (the taped lane at ~33 ft). STOP decal at the walkway by 168/169.
- STG-170 (photo): a ROW parallel to the wall, not a column. 170-1 at the higher-door end, then 170-2, 170-3… toward lower doors; ~5 spots. Placed at ~24 ft out, just past SR-013's table (position approx). Behind it, a roller table runs along the dock at ~39 ft, fed by an incline from a spiral; hearing-protection and DANGER signs on its posts. Every spiral foot has a yellow octagonal guard. Hazmat signs hang along the mezzanine edge here.
- In front of 165 (photo): a walkway runs from the main walkway straight out under the mezzanine (with a small jog) toward the green mile. STOP and "check dome mirror" decals at its foot, bollards and a hearing-protection sign where it passes under the deck. Pillar 1L-6 stands just past the spirals in line with 165. A taped column with carts sits left of the walkway (STG-165, label unread); a pallet sits on STG-166's tape to the right. Stations with screens and inclines sit either side (near 164 and 166/167), numbers not read.
- Pillar grid: row L is the dock-side row (1L-6 at 165, ~50 ft out), row K is one bay further (1K-9 at SR-028), J further again. So a bay is roughly 50 ft deep. Which way the numbers run along the dock is still unknown.
- SR numbers drop going up the dock: 025 (155), 023 (158), 021 (162), 013 (169). So 019/017/015 probably sit at 163–168, not seen yet.
- Door 176 staging: 2 columns, 8 spots, odd numbers front, even behind.
- MaxxReach extendable conveyors at doors 149, 150 and 154, each with taped and chained keep-out areas. 151 and 152 have no conveyor.
- SR stations between doors, each with a roller table angled toward the dock: SR-025 (155/156), SR-023 (158/159), SR-021 (beside 162, in front of the riser wall).
- Gap between 162 and 163 (~45 ft centre to centre, estimated): sprinkler risers 621–643, electrical panels, emergency exit W022.
- Walkways (green + pink tape): main one runs along the door aprons from ~159 up the dock and jogs to the kiosk at 157/158. Perpendicular walkways reach the wall beside 154, between 161/162, and straight to W022.
- Keep-clear red/white hatching in front of 156, 159, 161.
- Each door has a screen showing its load (e.g. "DD149 · CP-CENTRAL"). This is a likely live data source.
- Mezzanine sorter with spiral chutes runs the length of the dock. Its spirals start just past the staging columns (~44 ft off the wall). Gravity inclines run down from it to the SR roller tables. The flat sorter area holds STG-F spots. Positions are approximate.
- STG-F spots follow the same numbering as 176: odd numbers in front, even behind (F-9 in front of F-10, with F-7/F-8 beside them).
- Door load type, worked out from the door screens and equipment: MaxxReach doors are fluid-loaded (149, 150, 154, and probably 153). Doors with staging columns are cart-loaded (160's screen reads DYT3-CART-A). 151 and 152 have no conveyor, so they are probably cart doors.
- 153: door closed. A second MaxxReach boom sits beside 154's, with its wall end at 153 (inferred).
- Sketch: an exit between 152 and 153. The sketch's "fluid lanes" at 149/150 match the MaxxReach doors in the photos.
- Past 176: a second 2-column staging block (label not read), then the fenced PIT charging area. 176 has keep-clear hatching between spot 1 and the wall.
- Every door has the same kit: dock lock panel left, yellow wall fan, door screen right, yellow apron tape around the leveler, yellow bollards; dome mirrors hang between doors. Screens read: DD149 CP-CENTRAL, DD151, DD152 AZNG, DD153, DD158, DD160 DYT3-CART-A.
- Posters on doors 150, 156, 158, 160; louvers above 149, 150, 159. Wall between 154 and 155: AED, electrical panels, clock, ladder rack. Storm drain pipe between 150 and 151. Hazmat signs hang over 149/150 and along the mezzanine edge. STOP decals where walkways cross.
- Past 165, go-carts park in a taped lane on the sorter side of the aisle (lane modelled, carts not).
- Flat sorter: a FLAT SORTER sign over each chute; pillar 1K-9 (yellow guard, red label band, 6 FT mark) at SR-028; DO NOT ENTER sign nearby; red tape edges STG-A.
- Main walkway and the roller tables with airbags continue all the way down past 166–175. Go-carts line the sorter side (not modelled).

- Flat sorter side: SR-028 sits at building pillar 1K-9. Its screen (S0128) lists 12 positions: SR-028-A–F on one side of a roller table and G–L on the other, laid out as taped columns running toward the flat sorter chutes. Exact layout and position are approximate.
- STG-A is a 2 × 4 block (A-1…A-8) with odd numbers on the aisle side ("Keep handles facing towards the aisle"), same scheme as STG-F and 176. Lettered blocks probably run A, B, C… along the flat sorter. Position not surveyed.
- Guess: dock-side SR stations are odd (SR-025, 023, 021) and flat-sorter ones even (SR-028). That would put SR-027 near 152/153 and SR-022/024/026 along the flat sorter.
- Building pillars carry grid labels (1J-9, 1K-8, 1K-9). This is a real coordinate system: photos of pillar labels plus one paced pillar-to-pillar distance would fix the scale of the whole map.

## Still open
- Confirm the 153 MaxxReach and the 152/153 exit. Is there a door 177 (for the block past 176)?
- Pillar grid labels along the dock and at the flat sorter, plus one paced pillar spacing. Where STG-A sits; which side of the SR-028 table holds A–F.
- Readable labels for the STG-160, STG-162 and STG-163 columns.
- Doors 170–175 up close (roller tables there are approximate). STG-165 and STG-166 labels; which way pillar numbers run (a pillar label near 155 would settle it); how many spots STG-168 and STG-170 have and how far STG-170 sits from the wall; the labels on the row at ~33 ft; where SR-015…019 are.
- Real door spacing and the 162→163 gap, by pacing it off.

## Working style
User sends photos one section at a time; update the map after each batch, say what changed and what is still a guess, then ask for the next specific shots. Keep replies short; the user is on a phone on the warehouse floor.
