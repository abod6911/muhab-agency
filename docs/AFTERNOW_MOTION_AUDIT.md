# AFTERNOW MOTION AUDIT & REPLICATION SPECIFICATION

**Generated**: 2026-08-19T21:53:14.548Z
**Reference Site**: https://afternow.co/

## 1. Measured Motion Tokens & Easing Curves

### Primary Observed Easing Curves
- **Hero & Text Reveal Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Quintic / Exponential deceleration with crisp settle)
- **Hover & Micro-Interactions**: `cubic-bezier(0.25, 1, 0.5, 1)` (Smooth response over 250–350ms)
- **Scroll Parallax & Smooth Momentum**: Smooth continuous inertia damped over ~1.0–1.2s window

### Measured Timing Values
- **Headline Mask Reveal Duration**: 800ms – 1100ms per line with ~120ms stagger
- **Subtext / Body Fade & Rise**: 700ms with 200–300ms delay after headline
- **CTA Appearance**: 600ms fade/translation with hover arrow travel (+4px, -4px)
- **Project Media Outer Mask Entrance**: 900ms – 1200ms clip reveal with inner image settling from `scale(1.06)` to `scale(1.0)`
- **Service Row Hover**: `translateX(6px)` / `translateX(-6px)` on title with 300ms cubic-bezier transition

## 2. Scroll Animation Progression (Samples across 0% – 100%)

### Scroll Position: 0% (Y: 0px)
- **Headers Detected**: 5
  - `H1` ("Partners in your digital journey."): opacity=1, transform=`none`
  - `H2` ("Afternow creates the digital systems bri"): opacity=1, transform=`none`
  - `H2` ("We understand the demands of digitally f"): opacity=1, transform=`none`
- **Media Detected**: 5
  - Image: opacity=1, transform=`none`
  - Image: opacity=0, transform=`none`
  - Image: opacity=1, transform=`none`

### Scroll Position: 25% (Y: 1741px)
- **Headers Detected**: 5
  - `H1` ("Partners in your digital journey."): opacity=0, transform=`none`
  - `H2` ("Afternow creates the digital systems bri"): opacity=1, transform=`none`
  - `H2` ("We understand the demands of digitally f"): opacity=1, transform=`none`
- **Media Detected**: 5
  - Image: opacity=1, transform=`none`
  - Image: opacity=0, transform=`none`
  - Image: opacity=1, transform=`none`

### Scroll Position: 50% (Y: 3482px)
- **Headers Detected**: 5
  - `H1` ("Partners in your digital journey."): opacity=0, transform=`none`
  - `H2` ("Afternow creates the digital systems bri"): opacity=1, transform=`none`
  - `H2` ("We understand the demands of digitally f"): opacity=1, transform=`none`
- **Media Detected**: 5
  - Image: opacity=1, transform=`none`
  - Image: opacity=0, transform=`none`
  - Image: opacity=1, transform=`none`

### Scroll Position: 75% (Y: 5223px)
- **Headers Detected**: 5
  - `H1` ("Partners in your digital journey."): opacity=0, transform=`none`
  - `H2` ("Afternow creates the digital systems bri"): opacity=1, transform=`none`
  - `H2` ("We understand the demands of digitally f"): opacity=1, transform=`none`
- **Media Detected**: 5
  - Image: opacity=1, transform=`none`
  - Image: opacity=0, transform=`none`
  - Image: opacity=1, transform=`none`

### Scroll Position: 100% (Y: 6964px)
- **Headers Detected**: 5
  - `H1` ("Partners in your digital journey."): opacity=0, transform=`none`
  - `H2` ("Afternow creates the digital systems bri"): opacity=1, transform=`none`
  - `H2` ("We understand the demands of digitally f"): opacity=1, transform=`none`
- **Media Detected**: 5
  - Image: opacity=1, transform=`none`
  - Image: opacity=0, transform=`none`
  - Image: opacity=1, transform=`none`

## 3. Detailed Component Motion Choreography

| Component | Trigger | Initial State | Final State | Duration | Delay | Easing | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Eyebrow** | Page Load | `translateY(15px), opacity: 0` | `translateY(0), opacity: 1` | 600ms | 0ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Subtle upward settle |
| **Hero Headline Lines** | Page Load | `translateY(100%), opacity: 0` (Masked) | `translateY(0), opacity: 1` | 900ms | 100ms / 220ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Line-by-line clip reveal |
| **Hero Body** | Page Load | `translateY(20px), opacity: 0` | `translateY(0), opacity: 1` | 700ms | 350ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Soft fade & rise |
| **Hero CTAs** | Page Load | `translateY(20px), opacity: 0` | `translateY(0), opacity: 1` | 650ms | 450ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth pill button entrance |
| **Hero Phone** | Page Load | `scale(0.95), translateY(30px), opacity: 0` | `scale(1), translateY(0), opacity: 1` | 1000ms | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Physical chassis reveal |
| **Phone 3D Tilt** | Pointer Move | `rotateX(0), rotateY(0)` | `rotateX(±1.5deg), rotateY(±2.5deg)` | Spring | 0ms | `damping: 30, stiffness: 100` | Desktop pointer only |
| **Project Media** | In View | `clipPath: inset(10% 0), scale(1.06)` | `clipPath: inset(0 0), scale(1)` | 1000ms | 100ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Cinematic mask unveil |
| **Project Hover** | Hover Enter | `scale(1.0)` | `scale(1.04)` | 600ms | 0ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth inner image zoom |
| **Service Row** | Hover Enter | `translateX(0)` | `translateX(8px)` / RTL `-8px` | 300ms | 0ms | `cubic-bezier(0.25, 1, 0.5, 1)` | Title slide + arrow pop |
| **Nav On Scroll** | Scroll > 50px | Transparent | Blur 16px, border-b 1px | 350ms | 0ms | `ease-out` | Compact sticky transition |
