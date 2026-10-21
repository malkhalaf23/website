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
- Green mile (photos): the walkway between the lane ends and the floor staging. STG-F sits across it from SR-016 (STG-F-10 by the SR-016 pole). ENTER HERE / DO NOT ENTER signs hang over it. Row-K pillars (yellow with orange bases) line its far side; 1K-7 is a little past SR-018, so pillar numbers rise toward higher doors too, about 2 lanes apart (~50 ft). Conflict: that puts 1K-7 almost in line with 1L-6 (seen in line with 165); one of the two needs a recheck.
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
- Building pillars carry grid labels (1J-9, 1K-8, 1K-9). This is a real coordinate system: photos of pillar labels plus one paced pillar-to-pillar distance would fix the scale of the whole map.

- LANES (from the user): one numbered sequence SR-0nn runs along the dock. ODD numbers are dock lanes: a spiral feeds an incline down to a roller table in front of a door (SR-025 at 155/156, SR-023 in front of 159, SR-021 at 162, SR-013 at 169). EVEN numbers SR-002…SR-028 are ship order (pallet) lanes behind the mezzanine, each with locations A–L. Each odd lane sits between its even neighbours (SR-023 between SR-022 and SR-024). Numbers fall toward higher doors. Positions come from `CFG.laneAnchors` [lane, door]; laneX() interpolates between anchors, so adding one anchor fixes a whole stretch. SR-018 (photo) lines up with 164/165. Lanes below SR-012 extrapolate past door 176, so the dock probably continues past 176.
- Ship order lane layout (photos of SR-018): roller table fed from the deck, pallet spots A–F one side and G–L the other (floor-marked PALLET), pole with twin screens and andon light, printer table (floor tape PRINTER) and SHRINK WRAP spot at the green-mile end. Red staircase to the mezzanine beside SR-018 with ENTER HERE sign.
- Door 159 (photo): screen DD159 · DYT3-CART-A, trailer AZNG DVC260128; SR-023's roller table with airbags, fed by an incline straight from a spiral, sits in front of it inside keep-clear hatching.
- The green-mile photos seemed to show lane numbers rising toward higher doors; the user's lane 23 at 159 and the odd dock-lane series say the opposite, so the green-mile reading was wrong. 1K-7 and STG-F placements built on it are suspect.

- FROM THE USER (overrides photos where they differ), doors 149–163:
  - 149, 150, 151, 152 and 154: fluid lanes, each with a MaxxReach. 153 has no fluid lane.
  - Between 154 and 155: emergency exit also used by drivers, called the driver's cage.
  - 155–162 are cart doors.
  - Odd (scan) dock lanes: SR-027 in front of 155, SR-025 in front of 157, SR-023 in front of 159, SR-021 in front of 161, SR-019 midway between 162 and 163. One lane number per door. (User said "I think 29" as a possible start; unconfirmed.) Even pallet lanes sit between them: SR-026 ≈ 156, SR-024 ≈ 158, SR-022 ≈ 160, SR-020 ≈ 162.
  - Exit W022 moved to past SR-019 in the 162–163 gap; the sketch exit at 152/153 was removed.

- FROM THE USER, doors 163–177 and the word "green mile":
  - "Green mile" = a green/pink taped walkway. One runs along the doors, so a lane "in front of" a door sits beyond that walkway, never against the dock plate. It starts at door 155 (user) and runs to the end. Others run straight out from 165 and 171, and from the driver's cage at 154/155.
  - 163 stage area, no conveyor. SR-017 in front of 164. 165 green mile. SR-015 in front of 166. 167 stage area. SR-013 in front of 168. SR-011 between 169 and 170. SR-009 between 170 and 171. 171 green mile. SR-007 in front of 172. 173, 174, 175, 176 and 177 have stage areas only, no lanes. So door 177 exists (lastDoor 177); the block past 176 is 177's.
  - CFG.laneAnchors now holds every odd lane 27→7 from the user; even lanes interpolate between them (SR-002 ≈ 175).
- Removed in this pass: the guessed roller tables at 165/166 and 173, the stations near 164 and 166/167, and the photo-guessed table at 170–172 (all covered by the lane list).

- FROM THE USER, pallet lanes: each even (ship order) lane sits between its odd neighbours: SR-028 between 29 and 27, SR-026 between 27 and 25, SR-020 between 21 and 19, and so on. Odd scan lanes stop at SR-007; pallet lanes continue to SR-002, which sits across from 177. Anchors [29,153] (user thinks scan lanes start at 29) and [2,177] added, so SR-006 ≈ 173, SR-004 ≈ 175.

- CORRECTION FROM THE USER: auto scan lanes start at door 155 with SR-029 in front of 155. SR-025 at 157 and SR-023 at 159 stay as stated earlier, so SR-027 is at 156 (confirmed by the user). Pallet lanes follow: SR-028 ≈ 155.5, SR-026 ≈ 156.5. Nothing in front of 153.

- WHOLE-DEPARTMENT RECONCILIATION (all photos + user statements), wall outward:
  1. Doors 149–177. Fluid doors 149–152, 154 (MaxxReach booms fed from the mezzanine). Driver's cage 154/155. Risers + exit W022 in the 162–163 gap.
  2. Green mile along the doors from 155.
  3. Dock zone (~10–40 ft): auto scan lanes SR-029 (155) … SR-007 (172), each a roller table fed by an incline from a spiral; stage columns at the cart doors; taped row at ~33 ft past 165 (incl. STG-170); stage-only doors 163, 167, 173–177.
  4. Mezzanine with spirals (~44–58 ft); red stairs up beside SR-018.
  5. Ship order pallet lanes SR-028 (≈155.5) … SR-002 (177), each between its odd neighbours, printer + screens at the back end.
  6. Back walkway (the sketch's green mile) with ENTER HERE / DO NOT ENTER signs and row-K pillars.
  7. Floor staging (STG-F across from SR-016, STG-A) and the flat sorter beyond (seen behind SR-028).
  - The sketch's "auto scan" at 155 = the start of the scan lanes, so that separate box was removed. Its roller-table rectangles at 156–163 match the scan lanes.
  - Pallet lanes are spread evenly (palletX(): SR-028 at 155.5, SR-002 at 177, ~23 ft apart); each still lands between or beside its odd neighbours. Exact interpolation made 28/26 and 10/8 overlap, which can't be right for built lanes.
  - Pillar grid: 50 ft bays, column 9 at SR-028, column 6 in line with 165 (pillarX()). The green-mile photos suggesting other positions for 1K-7 and the lane order (SR-016 → SR-014) conflict with the user's lane list and were set aside; the far sign was probably misread.

- Second pass over the photos: wall columns M-10 (above 150/151) and M-6 (above 165/166) set the grid spacing (~53 ft, pillarX()). Kiosk beside 164, water cooler + broom and DO NOT ENTER decal at 163, "Check brakes" poster on 164, storm drain at 175/176, kiosk at 174/175, TDR COMPLETE sign at 176. STG-161-1…5 run straight out from the wall between the 160/161 hatching and the 161/162 walkway; each scan lane has a printer table at the incline foot beside the spiral guard.

- Third pass: 176/177 keep-clear between spot 1 and the wall is yellow/black (not red), and both blocks are framed in green tape; STG-176 odd spots on the lower-door column, confirmed. Hanging SHIPPING CLERK and "Truckers cage" signs at the driver's cage. Every door has a TDR COMPLETE sign and a KEYS box.
- PHOTO VS USER CONFLICTS (left as the user said, asked to recheck): (1) 151 and 152 photos show open dock plates with carts and no MaxxReach, only 149/150 and 153/154 booms visible; (2) the twin SR-025 screens hang over 155/156 with a roller table at 156, while the user puts SR-029 at 155 and SR-025 at 157.

- FROM THE USER, pallet lane spots: standing on the back green mile at the end of a ship order lane, facing the lane, A–F run on the right-hand side (higher-door side) and G–L on the left. Assumed A and G are the spots nearest the green mile (to confirm).

- Lane screen S0118 (photo, SR-018): two columns, A–F on the left with arrows pointing left, G–L on the right pointing right; the screen faces into the lane, which matches the user's "A–F on the right seen from the green mile". Rows also show the dock door each location ships from (DD166, DD169, DD171, DD168, DD158); green = active, grey = idle. USER: do NOT put sort codes (destination codes), times or package counts on the map — location names only. The status box accepts id,status[,door]; tapping a spot rings the door it ships from.

- SR-018-A floor label (photo): QR + location name on the floor, right next to yellow/black tape that edges the roller table. Every pallet lane location has one; the tape runs along both sides of the table.

- FROM THE USER: scan lane SR-021 has 5 staging spots, named STG-161-1 … STG-161-5 (named after the door, not the lane). Staging columns now record their door's scan lane (`lane`), shown when tapped.

- FROM THE USER + photos: three stage areas in front of 175, 176 and 177, each 14 spots (STG-175-1…14 etc.), 2 columns of 7 running straight out from the wall to the spiral guards, yellow/black keep-clear between the wall and spot 1, green tape round the blocks. Odd numbers kept on the lower-door column as seen at 176; the STG-175 photo from the wall looks like odd on the higher-door side, to confirm. The taped go-cart row at ~33 ft now stops before 174.

- FROM THE USER: doors 173 and 174 have no stage areas (and no lanes).

- FROM THE USER + photos: staging area U (STG-U-1…9) sits across the back green mile from door 166, on the left of lane SR-016 seen from the green mile, beside pillar 1K-6 and the flat sorter. Two columns: odd 1–9 (5 spots) on one side, even 2–8 (4 spots) on the other; numbering assumed to start at the green mile, odd column assumed nearer SR-016. Pillar 1K-6 stands beside STG-U / SR-016, so the grid is now pillarX(c)=palletX(16+4*(c-6)): 1K-7 ≈ SR-020, 1K-9 = SR-028 — all three pillar photos now agree. STG-F was moved out of that spot toward lower doors (position unknown now).

- FROM THE USER, floor staging row: across the back green mile, starting at STG-U (lane 16, 9 spots) and going toward lower doors (lanes 18, 20 …), a block every 6 ft: L, K, J, I, H, G, F, E, D, C, B, A. Each has 10 spots, odd 1–9 in one column and even 2–10 in the other (photo: STG-K-9). Replaces the old guessed STG-F and STG-A blocks. Orange-padded pillars stand among these blocks.

- FROM THE USER: in the floor staging blocks (U, L…A), odd numbers are on the right when facing away from the SR lanes, i.e. the lower-door column.

- FROM THE USER: floor staging blocks start about 2 ft back from the green mile tape (z0 = greenMile[1]+2, already so). Spot 1 at that end.

## Still open
- Confirm SR-027 at 156 (or does the whole 27→19 series shift by one door?). Is there a door 177 (for the block past 176)?
- Pillar grid labels along the dock and at the flat sorter, plus one paced pillar spacing. Where STG-A sits; which side of the SR-028 table holds A–F.
- Readable labels for the STG-160, STG-162 and STG-163 columns.
- Which door each lane lines up with (add to CFG.laneAnchors). Especially SR-028, SR-002 and the odd lanes near 164 and 166/167.
- Which column of 175–177 holds the odd numbers. STG-165 and STG-166 labels; which way pillar numbers run (a pillar label near 155 would settle it); how many spots STG-168 and STG-170 have and how far STG-170 sits from the wall; the labels on the row at ~33 ft; where SR-015…019 are.
- Real door spacing and the 162→163 gap, by pacing it off.

## Working style
- PRIORITY (user, current phase): first pin down where each conveyor and each pallet line (SR-002…SR-028) sits relative to the dock doors. Small details come after. The map opens in layout view; the Details button shows signs, door fittings and decals.
User sends photos one section at a time; update the map after each batch, say what changed and what is still a guess, then ask for the next specific shots. Keep replies short; the user is on a phone on the warehouse floor.
