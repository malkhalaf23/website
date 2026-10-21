# Ship Dock Twin

A 3D layout map of a warehouse outbound ship dock, built from floor photos and the user's descriptions. Goal: an accurate floor layout that can later show real data per staging spot. Layout only: never model carts, pallets or boxes. Never show sort/destination codes, times or package counts (location names only).

## Files
- This repo also holds an unrelated Hugo site (bettercap docs: `content/`, `docs/`, `themes/` …). Leave it alone; dock work only touches `dock-map.html` and this file.
- `dock-map.html`: the whole app. One self-contained page, Three.js r128 + OrbitControls from jsDelivr. Published as a private artifact: https://claude.ai/artifact/TxdeD2V6JQy9foHPaJXBo2 (republish the same file to keep the URL).

## Code map
- `CFG`: dimensions in feet. x runs along the dock wall (door numbers grow with x), z runs into the building. `doorX(n)` is based on door 149; `CFG.laneAnchors` [lane, door] place the odd scan lanes; `laneX()` interpolates; `palletX(n)` spreads pallet lanes SR-028→SR-002 evenly (SR-030 is 35 ft past SR-028); `pillarX(c)` is the K-row grid (1K-6 at SR-016, 1K-5 between SR-012/010).
- `DOORS`: one entry per door: `src`, `note`, `load`, `screen`, `poster`, `louver`, `hatch` (`"yellow"` only), `maxreach`, `sr` + `srOff` (odd scan lane in front), `staging` (2-column blocks at 175–177).
- Helpers: `addSpot(id,x,z,{door,lane,area,short,turned})`, `laneStage()` (lane staging column starting 1 ft past the red zone), `noStage()` (6×7 ft red/white no-staging zone), `rollerTable()`, `walk()` (green+pink walkway), `beam()`, `hatch()`.
- Toggles: Plan / Doors close-up / 3D, Flow (parcel paths), Details (signs, door kit, decals; tagged via `DETAIL`), Mezzanine (hides both decks). The scene is mirrored for display (`MX = -1`): door 149 shows on the right. Camera/marker code converts with `MX`.
- Status box: `id,status[,door]`; tapping a spot shows its lane and rings the door it ships from.

## The department as a whole (all photos + user, current truth)
Wall outward, door 148 (low-door end, by the entrance) to door 180 (far end):
1. Doors 148–180. Fluid doors 149, 150, 151, 153, 154 with MaxxReach booms (user confirmed 151 and 153 yes, 152 no). 152 has no fluid lane. Driver's cage (emergency exit used by drivers) between 154 and 155. Sprinkler risers + exit W022 in the 162–163 gap. Exit W019 by 179. Hard-hat storage and PIT charging past 180.
2. Green mile (walkway) along the doors from 155 to the end. Others run out from the driver's cage, 165, 171 and to W022.
3. Dock zone: odd auto-scan lanes SR-029 (155), 027 (156), 025 (157), 023 (159), 021 (161), 019 (midway 162/163, 35 ft before 017), 017 (164), 015 (166), 013 (168), 011 (169/170), 009 (170/171), 007 (172). Each: spiral → incline → straight roller table out from the wall, printer at the incline foot, two 6×7 ft red/white no-staging zones at the dock end, staging columns 1 ft past them.
   - Lane staging (user): 23: STG-157-6 | STG-159-1…4. 21: STG-159-5,6 | STG-161-1…5. 19: STG-161-6 | STG-162-1…5. Free-standing STG-163-1…10 in the 19–17 gap past a 4 ft green mile to W022. 17: STG-163-11,12. 15: STG-165-1…5. 13: STG-167-1…4 | STG-168-1…5. 11: STG-170-1…5 | STG-169-1…4. 9, 25, 27, 29: none.
   - Stage-only doors: 175, 176, 177 each 14 spots (2 × 7, yellow/black keep-clear at the wall). 173, 174 nothing. 178–180 carts staged, no lanes.
4. Mezzanine sorter with spirals (~44–58 ft); red stairs up beside SR-018.
5. Ship order (pallet) lanes, even SR-030 (door ~152, no slots) and SR-028 … SR-002 (across from 177), A–L each: standing on the back green mile facing the lane, A–F on the right, G–L on the left. Pole with twin screens (screen shows each location's ship door), printer, shrink-wrap spot at the green-mile end.
   - Between 28 and 30: STG-P-1…11, green mile, STG-O-1…10 (rows along the lane, highest number at the green mile). Past 2: STG-Y-1…7, a 10-spot block (name not given), green mile, STG-Z-1…7.
6. Back green mile: the department's spine, from the entrance (Main Office / AFE, pillar 1H-9, Fastenal PPE machine, whiteboards) to the far end. ENTER HERE / DO NOT ENTER signs.
7. Across it: floor staging blocks U (9), L, K, J, I, H, G, F, E, D, C, B, A (10 each), AA (10), AB (12), 6 ft apart (3 ft before AB), odds on the right facing away from the lanes, spot 1 at the green mile. Behind them an aisle, then the flat sorter: 40 chutes (gaylords) from STG-A to the induct stations (names not mapped, user). Further toward the entrance: ShipDock-Main staging (layout to come) and pallet storage.
8. Induct platform across from lanes 12 → 2: Induct Stations 1–4 (stairs, PS collection spot), overhead conveyor over the back green mile at lanes 2–4, jam-clearing ladders, corrugate/trash bins, pillars 1K-5, 1K-4.

Parcel flow (Flow toggle): induct stations → overhead conveyor → mezzanine sorter → (a) spirals → scan lanes → carts → cart doors, (b) MaxxReach → fluid doors 149–151, 153, 154, (c) pallet lanes → pallets → floor staging → door shown on the lane screen; flat sorter chutes → gaylords → floor staging → doors.

- Photos (latest 6): the flat sorter is two-sided — gaylords on the staging side, go-cart chutes on the far side with its own aisle. It turns on a round overhead loop at pillar 1J-9 (STG-A end, control cabinet under it). JACKPOT chute + corrugate recycling at the induct end of the far aisle. An overhead conveyor bridge runs from the main mezzanine across the back green mile to the induct platform / flat sorter. Severe weather assembly area sign by the induct platform end. A floor label STG-V-8 near pillar 1K-4 by the jam-clearing ladders: an STG-V block exists there (not on the map, ask).

## Still open
- SR-025 screens over 155/156 vs SR-025 at 157.
- Name of the 10-spot block between STG-Y and STG-Z; ShipDock-Main layout; door 148 and 178–180 details.
- Exact distances: door pitch, mezzanine depth, pallet lane depth (STG-P's 11 spots don't fit the current 34 ft), lane spacing below SR-012.

## Working style
- User is on a phone on the floor and sends photos plus short voice-typed descriptions. Update the map after each message, say what changed and what is still a guess, ask only the next specific questions. Keep replies short.
- Only place staging the user has told me about. The user's statements override photo readings; flag conflicts instead of silently picking.
- When asked, review all photos together (contact sheets in the scratchpad) rather than piece by piece.
