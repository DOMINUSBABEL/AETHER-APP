# AETHER-APP: Advanced Algorithmic Esoteric Intelligence & Cosmic Projection Hub

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Environment](https://img.shields.io/badge/env-React%2019%20%7C%20Three.js%20%7C%20Capacitor-brightgreen.svg)

**Author:** DOMINUSBABEL & GARTON Engineering (Orchestrated by User)
**Date:** May 26, 2026

---

## 📖 Abstract

The integration of mystical archetypes and natal computations within native mobile environments presents technical constraints regarding internet dependence, processing latency, and data leakage. 

This paper introduces **AETHER-APP v2.0**, a hybrid native-wrapper mobile application engineered utilizing React 19 and Vite, deployed natively onto Android (Capacitor). AETHER operates strictly on a **client-side algorithmic matrix**, circumventing external cloud-based Neural Network inference (IA) to guarantee total operational autonomy, absolute privacy, and instantaneous rendering. 

The application implements:
1. An interactive **WebGL Three.js engine** to render 3D physical Tarot cards with responsive mouse-tilting, kinetic flip animations, and additive particle glow.
2. A programmatically drawn **SVG Natal Mandala** wheel.
3. Strict deterministic mathematical heuristics to compute solar positions, sidereal lunar tracking, solar ascendant rotations, and cabalistic numerology.

---

## 🏛️ 1. System Architecture

AETHER is structured on a localized model-view-controller paradigm where calculations are handled synchronously on state mutations.

```mermaid
+-------------------------------------------------------+
|                 AETHER SYSTEM ARCHITECTURE            |
+-------------------------------------------------------+
|                                                       |
|   [ React 19 Frontend UI (App.tsx / Screens) ]        |
|    |-- Date Context Provider (userDate, userTime)     |
|    |-- Language Context Provider (ES / EN)            |
|                                                       |
|                       |                               |
|        [ Local Synchronous Controller ]               |
|                       |                               |
|   [ Mystic Algorithmic Matrix (mysticAlgorithms.ts)]  |
|    |-- Sidereal Moon tracker & Synodic phase math     |
|    |-- Solar Ascendant 30-degree rotation engine      |
|    |-- Life Path reduction & Personal Day matrix      |
|    |-- Tarot Element Sinergy & Synthesis compiler     |
|                                                       |
|                       |                               |
|        [ Render Curation Pipeline ]                   |
|                       |                               |
|   [ Visual Engines ]                                  |
|    |-- WebGL Three.js (TarotCard3D.tsx canvas)        |
|    |-- Procedural Canvas Vector Art (cardArtwork.ts)  |
|    |-- Astrolog-SVG Mandala Wheel (SoulMapScreen)     |
|                                                       |
|                       |                               |
|   [ Capacitor Native Bridge ]                         |
|    |-- Android Native WebView                         |
|                                                       |
+-------------------------------------------------------+
```

---

## 🧠 2. Mathematical Astro-Algorithms

All astrological and numerological data is generated locally without remote calls.

### 2.1 Sidereal Lunar Sign Tracking
The Moon's position relative to the background stars is estimated by calculating the elapsed days $d$ since the reference Unix Epoch (January 1, 1970, 00:00:00 UTC), where the Moon was positioned in Libra (approximate sign index $6.0$).

Given a target Date, the elapsed decimal days $d$ is:

$$ d = \frac{T_{target} - T_{epoch}}{86,400,000} $$

Using the Moon's average sidereal period ($T_{sidereal} \approx 27.321661$ days), the normalized cycle phase $\Phi_{sidereal}$ is computed:

$$ \Phi_{sidereal} = \left( d \pmod{T_{sidereal}} \right) / T_{sidereal} $$

The estimated lunar sign index $I_{moon} \in [0, 11]$ is then mapped to the 12 signs of the zodiac (0 = Aries, ..., 11 = Pisces) after adding the epoch calibration offset of $5.8$ signs:

$$ I_{moon} = \lfloor (\Phi_{sidereal} \cdot 12 + 5.8) \pmod{12} \rfloor $$

### 2.2 Synodic Lunar Phase Calculation
To calculate the visual Moon phase, we utilize the synodic cycle ($T_{synodic} \approx 29.530589$ days) measured from a known New Moon reference epoch ($T_{ref} = \text{Jan 7, 1970, 20:35:00 UTC}$):

$$ \Phi_{synodic} = \left( (T_{target} - T_{ref})/86,400,000 \pmod{T_{synodic}} \right) / T_{synodic} $$

*   **New Moon**: $\Phi_{synodic} < 0.03 \lor \Phi_{synodic} > 0.97$
*   **Waxing Crescent**: $0.03 \le \Phi_{synodic} < 0.22$
*   **First Quarter**: $0.22 \le \Phi_{synodic} < 0.28$
*   **Waxing Gibbous**: $0.28 \le \Phi_{synodic} < 0.47$
*   **Full Moon**: $0.47 \le \Phi_{synodic} < 0.53$
*   **Waning Gibbous**: $0.53 \le \Phi_{synodic} < 0.72$
*   **Last Quarter**: $0.72 \le \Phi_{synodic} < 0.78$
*   **Waning Crescent**: $0.78 \le \Phi_{synodic} \le 0.97$

### 2.3 Solar Ascendant Rotation Algorithm
The Ascendant represents the sign rising on the Eastern horizon. At local solar dawn (approximated at $06:00$ local time), the Ascendant sign matches the Sun sign. Every hour, the Earth rotates $15^\circ$, causing a new zodiac sign ($30^\circ$) to rise approximately every 2 hours.

Given the Sun Sign Index $I_{sun}$ and birth time in decimal hours $H_{birth}$:

$$ \Delta H = (H_{birth} - 6 + 24) \pmod{24} $$
$$ I_{ascendant} = \left( I_{sun} + \lfloor \Delta H / 2 \rfloor \right) \pmod{12} $$

---

## 🎨 3. Graphics Engines (Three.js WebGL & SVGs)

### 3.1 Three.js 3D Tarot Cards
Tarot cards are projected onto WebGL canvases using a thin box geometry. 
*   **Dynamic Material Mapping:** The right, left, top, and bottom edges are bound to an isotropic golden metallic shader. The front ($+Z$) and back ($-Z$) faces are bound to individual `THREE.CanvasTexture` buffers drawn dynamically.
*   **Physics Interaction:** An input event listener translates normalized mouse coordinates $(X, Y) \in [-1, 1]$ into a linear interpolation (lerp) target rotation around local axes:

$$ \theta_{x} \leftarrow \theta_{x} + (Y \cdot 0.25 - \theta_{x}) \cdot 0.1 $$
$$ \theta_{y} \leftarrow \theta_{y} + (\theta_{flip} + X \cdot 0.25 - \theta_{y}) \cdot 0.1 $$

*   **Additive Glow Particles:** A background emitter instantiates a circular `THREE.Points` array rotating slowly on the Z-axis with additive blending (`THREE.AdditiveBlending`).

### 3.2 Dynamic Vector Minimalist Artwork
To prevent application bloating and eliminate network delays, all card illustrations are generated locally inside `cardArtwork.ts`. Using canvas paths, AETHER draws custom sacred geometry configurations for each of the 78 cards. This approach ensures high-definition vectors at negligible storage cost ($<50\text{KB}$ compiled code vs. $>40\text{MB}$ static image assets).

---

## ⚙️ 4. Build & Native Deployment Pipeline

To compile the application and deploy it native to Android:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Compile static assets:**
    ```bash
    npm run build
    ```
3.  **Sync Capacitor native wrappers:**
    ```bash
    npx cap sync android
    ```
4.  **Assemble the Debug APK package:**
    ```bash
    $env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
    cd android
    .\gradlew.bat assembleDebug
    ```

---

*Developed and deployed under strict analytical heuristics by the Actagen / Babylon.IA ecosystem.*
