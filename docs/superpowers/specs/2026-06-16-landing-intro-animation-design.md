# Landing Intro Animation (Home) — Design Spec

Datum: 2026-06-16  
Scope: Landing Page `/` (Home) Intro Sequenz, **nur beim ersten Besuch pro Session**.

## Ziel

Eine ruhige, editoriale Intro-Sequenz, die die Landing Page „aufbaut“:

1. **Carousel Fly‑in**: Die Carousel-Elemente kommen aus zufälligen Startpositionen (off‑screen/versetzt), bewegen sich langsam zu ihren finalen Positionen im Ring, ohne dabei den Text in den Ecken zu überlagern.
2. **Header Reveal**: Kurz bevor die letzten Elemente einrasten, erscheint die Navigation (StickyMenu) via leichtem Reveal.
3. **Text Spawn**: Wenn alles sitzt, erscheinen Logo, Corner-Links, Tagline und Discover‑Button gestaffelt.

## Anforderungen

- **Nur einmal pro Session**: Sequenz läuft nur beim ersten Besuch in der aktuellen Browser‑Session.
  - Implementierung via `sessionStorage` Flag (z. B. `hs_home_intro_done = "1"`).
- **Keine Overlays**: Während Fly‑in darf das Carousel Corner‑Texte nicht überdecken.
  - Mechanisch: während der Introphase temporär konservativer (z. B. geringerer effektiver Radius / Zoom / Scale) und erst am Ende in die finalen Werte interpolieren.
- **Reduced Motion**: Bei `prefers-reduced-motion: reduce` wird die Sequenz übersprungen (oder stark verkürzt), alle Elemente erscheinen sofort.
- **Discover Overlay**: Unverändert; die Introsequenz betrifft nur die Landing Page, nicht den Discover‑Overlay.

## Sequenz & Timing

Zeiten sind Richtwerte; Feintuning im Code über Konstanten.

- **Phase A — Fly‑in**
  - Dauer: ca. 2.2s
  - `introProgress`: 0 → 1 (ease-out)
  - Carousel Rotation: **aus** (oder extrem langsam) bis `introProgress === 1`
- **Phase B — Header Reveal**
  - Start: `introProgress >= 0.86`
  - Dauer: 0.4–0.6s (Opacity + leichter Slide)
- **Phase C — Text Spawn**
  - Start: `introProgress >= 1.0`
  - Stagger: 80–140ms pro Elementgruppe

## Architektur / Zustände

Empfohlene Implementierung: **Option 1** (Orchestrierung in `HomePage`, Progress in `HomeCarousel`).

### Zustandsautomat (HomePage)

State `homeIntroPhase`:
- `skipped` (reduced motion oder session flag gesetzt)
- `intro` (Fly‑in läuft)
- `reveal_header` (Header sichtbar, Fly‑in läuft aus)
- `reveal_content` (Corner/Text erscheinen)
- `done` (normaler Zustand)

Ausgabe-Flags:
- `showHeader` (StickyMenu sichtbar / revealed)
- `showHomeText` (Logo + GridLinks + Tagline + Discover sichtbar)
- `introProgress` (0..1) an `HomeCarousel`

### Carousel Transform Interpolation (HomeCarousel)

Pro Item `i`:

- `targetPosition = getItemPosition(angle_i)`
- `targetRotation = getItemRotation(angle_i)`
- `targetScale = getAspectScale(aspect_i)`

Startwerte (deterministisch):
- `startPosition`: aus `seededRandom(i)` generiert, so dass Items initial außerhalb der safe‑area liegen (z. B. in einem „weiten“ Box‑Volumen um den Ring).
- `startRotation`: optional leichte Abweichung (nicht zwingend)
- `startScale`: leicht kleiner oder ähnlich, je nach gewünschtem Look

Interpolation:
- `pos = lerp(startPosition, targetPosition, introEased)`
- `rot = slerp(startRotation, targetRotation, introEased)` oder lerp Euler
- `scale = lerp(startScale, targetScale, introEased)`

Safe‑Area Schutz:
- Während `introProgress < 1`, benutze konservative Parameter:
  - `effectiveRadius`: kleiner als `CAROUSEL_RADIUS`
  - oder `effectiveZoom`: geringer
  - oder `CAROUSEL_ITEM_SCALE`: kleiner
  - Der Übergang zu finalen Werten erfolgt in den letzten 10–20% von `introProgress`.

## Betroffene Dateien (geplant)

- `src/pages/HomePage.tsx` — Intro-Orchestrierung, session flag, Reduced Motion Handling
- `src/components/HomeCarousel.tsx` — nimmt `introProgress` + `introActive`/`allowRotation` entgegen
- `src/components/HomeGrid.tsx` — optional: `visible`/`animate` Prop, damit Text erst später spawnt
- `src/styles/home.css` — ggf. Hilfsklassen für reveal/spawn (oder Framer Motion nur)

## Akzeptanzkriterien

- Beim ersten Besuch `/`:
  - Carousel‑Items fliegen ein und setzen sich in den Ring.
  - StickyMenu erscheint kurz vor Ende.
  - Logo/Corner‑Links/Tagline/Discover erscheinen erst danach.
- Bei erneutem Besuch `/` in derselben Session:
  - Keine Introsequenz; Seite erscheint direkt im finalen Zustand.
- Kein sichtbares Überdecken der Corner‑Texte während Fly‑in.
- Reduced motion: keine Fly‑in Animation.

