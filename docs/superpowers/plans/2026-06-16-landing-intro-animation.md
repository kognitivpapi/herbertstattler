# Landing Intro Animation (Home) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a one-time-per-session landing intro sequence where carousel items fly in, the header reveals just before settling, and then all landing texts spawn.

**Architecture:** `HomePage` orchestrates a small intro state machine and passes `introProgress`/flags into `HomeCarousel` and `HomeGrid`. `HomeCarousel` interpolates each plane’s transform from a deterministic random start pose to its ring pose. `HomeGrid` reveals its DOM content via Framer Motion based on the phase. Intro runs once per session via `sessionStorage`.

**Tech Stack:** React + TypeScript, Framer Motion, @react-three/fiber, drei, CSS.

---

## File map

**Modify:**
- `src/pages/HomePage.tsx` — intro state machine, `sessionStorage`, pass props
- `src/components/HomeCarousel.tsx` — accept `introProgress` and use it for pose interpolation + rotation gating
- `src/components/HomeGrid.tsx` — accept `visible` flag and animate DOM spawn
- `src/styles/home.css` — (optional) only if needed for pointer-events/stacking during intro

**Create:**
- `src/lib/homeIntro.ts` — constants + helpers for deterministic random start poses and easing

---

### Task 1: Add intro helpers + constants

**Files:**
- Create: `src/lib/homeIntro.ts`

- [ ] **Step 1: Create `src/lib/homeIntro.ts` with constants and helpers**

```ts
import * as THREE from 'three'
import { seededRandom, CAROUSEL_RADIUS } from './carouselMath'

export const HOME_INTRO_STORAGE_KEY = 'hs_home_intro_done'
export const HOME_INTRO_DURATION_MS = 2200
export const HOME_HEADER_REVEAL_AT = 0.86

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

/**
 * Deterministic "random" start pose far from ring.
 * Tuned to keep center clear and avoid corner overlays while animating in.
 */
export function getIntroStartPose(index: number) {
  const r1 = seededRandom(index + 11)
  const r2 = seededRandom(index + 101)
  const r3 = seededRandom(index + 1001)

  // Spread items around a wider ellipse; bias outward and slightly forward/back.
  const radius = CAROUSEL_RADIUS * (1.8 + r1 * 0.7)
  const angle = r2 * Math.PI * 2

  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const y = (r3 - 0.5) * 5.5

  // Small yaw variance
  const yaw = (r1 - 0.5) * 0.45

  return {
    position: new THREE.Vector3(x, y, z),
    rotation: new THREE.Euler(0, yaw, 0),
  }
}
```

- [ ] **Step 2: Typecheck quick sanity**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/lib/homeIntro.ts
git commit -m "feat(home): add intro animation helpers"
```

---

### Task 2: Orchestrate phases in `HomePage`

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Test: manual in browser at `/`

- [ ] **Step 1: Add phase state and session gating**

Implement:
- Check `sessionStorage.getItem(HOME_INTRO_STORAGE_KEY)` on mount
- If present: `introProgress=1`, `showHeader=true`, `showHomeText=true`
- If not: run requestAnimationFrame loop for `HOME_INTRO_DURATION_MS`:
  - compute `t = clamp01(elapsed/duration)`
  - `introProgress = easeOutCubic(t)`
  - `showHeader = introProgress >= HOME_HEADER_REVEAL_AT`
  - `showHomeText = introProgress >= 1`
  - when done: set storage key

- [ ] **Step 2: Pass props into components**

Update render:
- `HomeCarousel` gets `introProgress` and `allowRotation` (true only after intro done)
- `HomeGrid` gets `visible={showHomeText}`
- `StickyMenu` render controlled by `showHeader` (or keep mounted but Framer Motion reveal)

- [ ] **Step 3: Manual test**

Run dev server, open `/`:
- First load: intro runs once, then stays.
- Reload tab: if same session, intro should not re-run.
- New session (new tab / restart browser): intro runs.

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat(home): orchestrate one-time landing intro"
```

---

### Task 3: Implement carousel fly-in interpolation in `HomeCarousel`

**Files:**
- Modify: `src/components/HomeCarousel.tsx`
- Modify: `src/lib/carouselMath.ts` (only if we need a temporary effective radius/scale helper)

- [ ] **Step 1: Add props to `HomeCarousel`**

Add:
- `introProgress?: number` default `1`
- `allowRotation?: boolean` default `true`

- [ ] **Step 2: In `CarouselItem`, interpolate from intro start pose**

Use `getIntroStartPose(i)` from `src/lib/homeIntro.ts`.
During render:
- group uses `position`/`rotation` derived from lerp between start and target.
- Keep the final `scale` eased similarly; optionally smaller until last 15%.

- [ ] **Step 3: In `CarouselRing`, gate rotation**

Only rotate the ring when `allowRotation` is true.

- [ ] **Step 4: Manual test**

Observe:
- items fly in from random positions to ring positions
- no obvious overlap into corner texts (during intro DOM texts are hidden anyway, but we still keep motion calm)

- [ ] **Step 5: Commit**

```bash
git add src/components/HomeCarousel.tsx src/lib/homeIntro.ts
git commit -m "feat(home): fly-in carousel items for intro"
```

---

### Task 4: Reveal landing texts in `HomeGrid`

**Files:**
- Modify: `src/components/HomeGrid.tsx`
- (Optional) Modify: `src/styles/home.css`

- [ ] **Step 1: Add prop `visible: boolean`**

When `visible` is false:
- keep layout but hide content with Framer Motion (opacity 0, slight y)
- pointer events should remain safe (already mostly `pointer-events: none` on parents)

- [ ] **Step 2: Stagger spawn**

Stagger:
- Logo
- corner links
- tagline + discover button

- [ ] **Step 3: Manual test**

Verify:
- texts appear only after carousel settled
- no flashes (use `initial={false}` where appropriate)

- [ ] **Step 4: Commit**

```bash
git add src/components/HomeGrid.tsx
git commit -m "feat(home): stagger landing text reveal after intro"
```

---

### Task 5: Reduced-motion handling and cleanup

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/HomeCarousel.tsx`

- [ ] **Step 1: Use `useReducedMotion` (Framer Motion) in `HomePage`**

If reduced motion:
- mark intro done immediately (set storage key)
- show header + content instantly

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Final commit**

```bash
git add src/pages/HomePage.tsx src/components/HomeCarousel.tsx
git commit -m "fix(home): skip intro for reduced motion"
```

