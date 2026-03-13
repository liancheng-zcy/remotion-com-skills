# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **professional Remotion video component library** for creating tech tutorial videos with Apple-style aesthetics and FilmStorm-level quality.

**Goal**: Build a reusable component library for AI tech content creators, featuring:
- Apple-style minimal design (#000000 background + #007AFF accent)
- Organic, non-mechanical animations
- Professional SVG icons (no emoji)
- Code demonstrations with syntax highlighting
- Data visualization and metrics

---

## Development Commands

```bash
# Start Remotion Studio (live preview at http://localhost:3000)
npm run dev

# Run linting (ESLint + TypeScript)
npm run lint

# Bundle for rendering
npm run build

# Render specific composition
npx remotion render src/index.ts <CompositionID> out/video.mp4

# Upgrade Remotion
npm run upgrade
```

---

## Architecture

### Design System (src/design-system/)

**tokens.ts** - Centralized design constants:
- Colors: Apple-style palette (#000000 bg, #007AFF primary)
- Fonts: SF Pro Display/Text, JetBrains Mono
- Sizes: Large typography (hero: 120px, h1: 88px)
- Spacing, radius, animation durations

**animations.ts** - Animation presets:
- Spring presets: smooth, snappy, bouncy, heavy, playful
- Entrance animations: fade, slideUp, slideLeft, scale
- Decorative: lineExpand, glowSweep, breathe

### Component Library (src/components/new/)

All new components go here. Import via `src/components/new/index.ts`.

#### Core Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **HeroTitle** | Opening titles | Reveal animation, glow sweep, tags |
| **SectionTitle** | Chapter headers | Section number, progress bar, left indicator |
| **CodeTerminal** | Code display | macOS terminal style, line-by-line typing, syntax highlight |
| **AnimatedList** | Feature lists | Staggered entrance, icons, check animations |
| **FeatureCard** | Feature showcases | Icon + title + description, grid layout |
| **MetricCard** | Data metrics | Animated number counting, large typography |
| **Transitions** | Scene transitions | Fade, Slide, LightSweep, ZoomBlur, CurtainReveal |

#### Icon Library (src/components/new/Icons.tsx)

**50+ SVG icons** based on Heroicons (MIT) and Lucide (ISC) - free for commercial use.

Common icons:
- Tech: Computer, Bot, Terminal, Code, Database, Network
- Actions: Check, Plus, Minus, Close, ArrowRight, Download
- General: User, File, Folder, Calendar, Clock, Settings

**Usage**:
```tsx
import { Zap, Lock, Computer } from '../components/new/Icons';
<Zap size={24} color="#007AFF" strokeWidth={2} />
```

**Important**: Never use emoji. Always use icons from Icons.tsx.

---

## Component Usage Patterns

### HeroTitle
```tsx
<HeroTitle
  title="OpenClaw"
  subtitle="完全新手指南"
  tags={["AI 编码助手", "开源免费", "自托管部署"]}
/>
```

### CodeTerminal
```tsx
<CodeTerminal
  code={`npm install -g openclaw`}
  language="bash"
  filename="install.sh"
  typingSpeed={1}
  showLineNumbers={true}
/>
```

### AnimatedList (with icons)
```tsx
<AnimatedList
  items={[
    { title: '...', description: '...', icon: 'computer' },
    { title: '...', description: '...', icon: 'bot' },
  ]}
  variant="card"
/>
```

### FeatureGrid (with icons)
```tsx
<FeatureGrid
  features={[
    { icon: 'zap', title: '极速响应', description: '...' },
    { icon: 'lock', title: '隐私安全', description: '...' },
  ]}
  columns={3}
/>
```

---

## Animation Guidelines

### Do's
- Use `useCurrentFrame()` for all animations
- Use `spring()` for natural motion
- Use `interpolate()` with easing functions
- Stagger list items with frame delays

### Don'ts
- **Never use CSS animations** (they won't render)
- **Never use Tailwind animation classes**
- **Never use emoji** (use SVG icons instead)
- Avoid mechanical timing (use organic easing)

### Example Pattern
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Spring animation
const scale = spring({
  frame,
  fps,
  config: { damping: 25, stiffness: 100 },
});

// Interpolation with easing
const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: 'clamp',
  easing: Easing.out(Easing.quad),
});
```

---

## Styling Guidelines

### Colors (from tokens.ts)
```tsx
import { COLORS } from '../design-system/tokens';
// Background: COLORS.background (#000000)
// Primary: COLORS.primary (#007AFF)
// Text: COLORS.text (#FFFFFF)
// Secondary: COLORS.textSecondary (#8E8E93)
```

### Fonts
```tsx
import { FONTS } from '../design-system/tokens';
// Display: FONTS.display (SF Pro Display)
// Text: FONTS.text (SF Pro Text)
// Mono: FONTS.mono (JetBrains Mono)
```

### Typography Scale
- hero: 120px (main titles)
- h1: 88px (section titles)
- h2: 56px (subsections)
- h3: 40px (card titles)
- h4: 28px (small headers)
- body: 20px (descriptions)

---

## File Structure

```
src/
├── design-system/          # Design tokens and animation utilities
│   ├── tokens.ts
│   └── animations.ts
├── components/new/         # New component library
│   ├── index.ts           # Exports
│   ├── HeroTitle.tsx
│   ├── SectionTitle.tsx
│   ├── CodeTerminal.tsx
│   ├── AnimatedList.tsx
│   ├── FeatureCard.tsx
│   ├── MetricCard.tsx
│   ├── Transitions.tsx
│   └── Icons.tsx          # 50+ SVG icons
├── scenes/demo/           # Demo compositions
│   └── DemoScenes.tsx
├── Root.tsx               # Composition definitions
└── index.ts               # Entry point
```

---

## Dependencies

Key packages:
- `remotion` @ 4.0.434 - Video generation
- `@remotion/transitions` - Scene transitions
- `tailwindcss` @ 4.0.0 - Styling
- React @ 19.2.3

---

## TTS / Voiceover

User plans to implement Alibaba Cloud TTS as a Skill.
- Skip Edge TTS / ElevenLabs for now
- Voiceover sync system not yet implemented

---

## Common Issues & Solutions

### 1. LightSweep shows transparency at bottom
**Fix**: Add explicit `height` parameter:
```tsx
<LightSweep duration={30} height={1080} />
```

### 2. Flickering animation warning
**Cause**: Animation not purely driven by `useCurrentFrame()`
**Fix**: Ensure all animated values derive from frame

### 3. Emoji not rendering
**Policy**: Use SVG icons from Icons.tsx instead

### 4. Type errors with icons
**Fix**: Import IconProps and use proper typing:
```tsx
import { Zap, IconProps } from './Icons';
const iconMap: Record<string, React.FC<IconProps>> = { zap: Zap };
```

---

## Next Steps (Roadmap)

- [ ] AudioWaveform component (audio visualization)
- [ ] Chart components (BarChart, LineChart)
- [ ] TypewriterText effect
- [ ] Voiceover sync system
- [ ] TransitionSeries scene orchestration
- [ ] @remotion/light-leaks integration

---

## Contact

For questions about this component library, refer to:
- `/home/dachengzi/.claude/projects/-home-dachengzi-code-project-my-video/memory/MEMORY.md` - Session memory
- `src/components/new/` - Component implementations
- `src/design-system/` - Design tokens
