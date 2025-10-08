# Classroom to Campus - Scene Specification

## Camera Setup (Top-Down Shot)

```tsx
<PerspectiveCamera
  makeDefault
  position={[0, 12, 8]}        // Elevated, angled down
  rotation={[-Math.PI / 3, 0, 0]}  // 60° downward tilt
  fov={50}                     // Cinematic field of view
/>
```

**What this shows:**
- Overhead view of lecture hall
- See all student desks in grid layout
- Professor at front (top of frame)
- Whiteboard/screen visible

---

## Scene Layout (Grid Coordinates)

### Classroom Dimensions
- **Width**: 12 units (6 columns of desks, 2 units apart)
- **Depth**: 15 units (5 rows of desks, 3 units apart)
- **Height**: 0 (floor) to 5 (ceiling lights)

### Student Grid
```
Front (Professor)
┌─────────────────────┐
│ 👨‍🏫 Whiteboard       │
├─────────────────────┤
│ 🪑 🪑 🪑 🪑 🪑 🪑  │  Row 1 (y = -3)
│ 🪑 🪑 🪑 🪑 🪑 🪑  │  Row 2 (y = -6)
│ 🪑 🪑 🪑*🪑 🪑 🪑  │  Row 3 (y = -9) *Main student
│ 🪑 🪑 🪑 🪑 🪑 🪑  │  Row 4 (y = -12)
│ 🪑 🪑 🪑 🪑 🪑 🪑  │  Row 5 (y = -15)
└─────────────────────┘
Back
```

**Total**: 30 voxel students (6 columns × 5 rows)

---

## Voxel Student Rig

### Base Components
```tsx
<group position={[x, 0, z]}>  // Desk position
  {/* Desk */}
  <Box args={[0.8, 0.5, 1.2]} position={[0, 0.25, 0]}>
    <meshStandardMaterial color="#1a1a1a" />
  </Box>

  {/* Student */}
  <VoxelStudent
    position={[0, 0.5, -0.3]}  // Sitting at desk
    isMainCharacter={false}
    phoneState="idle"  // "idle" | "checking" | "hive"
  />
</group>
```

### Student States
1. **Idle** (70% of time): Looking forward, hands on desk
2. **Checking Phone** (25%): Phone up, head tilted down, gray glow
3. **HIVE Moment** (5%, main student only): Gold glow, face lights up

---

## Animation Timeline (Scroll-Driven)

### Section 0: Classroom Intro (0-25% scroll)
- Static scene, top-down view
- Idle animations play (students fidget, check phones)
- Ambient classroom sounds

### Section 1: HIVE Opens (25-50% scroll)
- Main student (Row 3, Col 3) pulls out phone
- **Gold particle effect** emanates from phone
- Bloom effect intensifies
- Notification sound plays
- Other students notice (heads turn slightly)

### Section 2: Connection Spreads (50-75% scroll)
- Gold connections draw from main student to nearby students
- Camera starts zooming out
- Classroom walls fade to transparency
- Hexagonal patterns appear between connected students

### Section 3: Campus Expansion (75-100% scroll)
- Camera lifts higher, rotates to isometric view
- Classroom becomes one hexagon in larger campus grid
- Other buildings appear (dorms, library, stadium)
- Full campus network visible (100+ voxel students)
- Final view: Thriving hive structure

---

## Idle Phone Animation Pattern

```tsx
// Random phone checks (non-main students)
useFrame((state) => {
  const time = state.clock.getElapsedTime()

  // Each student has random offset
  const shouldCheckPhone =
    Math.sin(time * 0.5 + studentOffset) > 0.8  // ~20% probability

  if (shouldCheckPhone && phoneState !== "checking") {
    // Animate phone up
    spring({
      from: { phoneY: -0.5, headRot: 0 },
      to: { phoneY: 0.3, headRot: -0.3 }
    })

    // Hold for 2-3 seconds
    setTimeout(() => {
      // Put phone away
      spring({ to: { phoneY: -0.5, headRot: 0 } })
    }, 2000 + Math.random() * 1000)
  }
})
```

**Visual:**
- Phone slides up from desk (gray rectangle)
- Student's head tilts down
- Faint gray glow on face
- After 2-3 seconds, phone goes back down

**Contrast:**
- Random students: Gray glow (mindless scrolling)
- Main student: **Gold glow** (HIVE connection)

---

## Performance Optimizations

### Instanced Meshes
```tsx
// 30 students use same geometry (1 draw call)
<InstancedMesh ref={studentsRef} args={[null, null, 30]}>
  <boxGeometry args={[0.4, 0.6, 0.3]} />
  <meshStandardMaterial color="#ffffff" />
</InstancedMesh>
```

### Level of Detail (LOD)
- **Close up** (classroom): Full voxel detail
- **Mid range** (building expansion): Simplified models
- **Far away** (campus view): Point lights only

### Shader Optimizations
- Pixelation granularity: 3px (close) → 8px (far)
- Bloom intensity: High (HIVE moment) → Low (ambient)
- Shadow maps: 512px (good enough for voxels)

---

## Color Coding System

### Student Phone States
- **Idle** (no phone): #ffffff (white voxel)
- **Checking (gray)**: Face glow #666666
- **HIVE (gold)**: Face glow #FFD700

### Connection Lines
- **Direct friends**: #ffffff (solid)
- **Shared spaces**: #FFD700 (pulsing)
- **Campus-wide**: #FFD700 (20% opacity)

### Environmental Colors
- **Floor**: #0c0c0c
- **Desks**: #1a1a1a
- **Walls**: #000000 (fade to transparent)
- **Sky** (campus): #000814 (dark blue-black)

---

## Sound Design

### Ambient Layers
1. **Classroom hum** (0-50% scroll): Low frequency, keyboard clicks
2. **Notification ding** (25% scroll): Pristine, high-quality chime
3. **Connection whoosh** (50-75%): Sci-fi data transfer sound
4. **Campus ambience** (75-100%): Distant students, birds, activity

### Audio Implementation
```tsx
import { Howl } from 'howler'

const sounds = {
  ambient: new Howl({ src: '/sounds/classroom-ambient.mp3', loop: true }),
  ding: new Howl({ src: '/sounds/hive-notification.mp3', volume: 0.7 }),
  whoosh: new Howl({ src: '/sounds/connection.mp3', volume: 0.5 })
}

// Trigger on scroll thresholds
useEffect(() => {
  if (scrollProgress > 0.25 && !dingPlayed) {
    sounds.ding.play()
    setDingPlayed(true)
  }
}, [scrollProgress])
```

---

## Next Steps

1. Install dependencies (see tech stack above)
2. Create `<ClassroomScene />` component
3. Build `<VoxelStudent />` rig with phone animation
4. Implement scroll-driven camera movement
5. Add pixelation + bloom post-processing
6. Record/source ambient sounds
7. Polish idle animations and timing
