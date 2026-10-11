# ⚡ DevForge — Zero-Backend Apple & Web Developer Suite

> A suite of high-performance, 100% client-side engineering tools built for Apple platform engineers, web developers, and game creators. Zero external tracking, zero server dependencies, instant execution.

---

## 🛠️ The 5 Integrated Developer Engines

### 1. 📱 Xcode AppIcon Studio
- **Problem**: Manually resizing icons for iPhone, iPad, Mac, Apple Watch, and visionOS is tedious and error-prone.
- **Solution**: Drag & drop any single 1024×1024 PNG. DevForge automatically renders all standard Apple asset specifications (`16x16` up to `1024x1024`), structures the official `Contents.json` asset catalog, and packages everything into an instant `AppIcon.appiconset.zip` ready to drop directly into Xcode.

### 2. 📦 JSON ➔ Swift 6 & TypeScript Converter
- **Problem**: Writing boilerplate `Codable` structs for complex API responses takes hours.
- **Solution**: Recursive AST generator that converts JSON payloads into modern **Swift 6** structs (`Sendable`, `Identifiable`, snake_case to camelCase `CodingKeys`) and strict TypeScript interfaces with nullable detection.

### 3. 🎨 SwiftUI MeshGradient Lab
- **Problem**: Crafting multi-point mesh gradients introduced in iOS 18 / macOS 15 requires tedious vector math.
- **Solution**: Interactive 3×3 draggable control point canvas with real-time bicubic color interpolation. Exports production-ready native SwiftUI `MeshGradient(width: 3, height: 3, points: [...], colors: [...])` code.

### 4. 📐 SVG ➔ SwiftUI Path Generator
- **Problem**: Using raster assets or complex SVGs in SwiftUI adds bundle weight and rendering overhead.
- **Solution**: Parses SVG vector commands (`M`, `L`, `C`, `S`, `H`, `V`, `Z`) into native SwiftUI `Path` operations (`path.move(to:)`, `path.addCurve(to:)`) for zero-dependency vector shapes.

### 5. 👾 8-Bit Retro Sound FX Synthesizer
- **Problem**: Prototype indie games and apps need quick, crisp sound effects without license entanglements or heavy audio libraries.
- **Solution**: 100% Web Audio API oscillator synthesis (Laser, Jump, Coin, Explosion, PowerUp). Tweak frequencies and decay in real time, and export directly as uncompressed 16-bit 44.1kHz `.wav` audio.

---

## 🚀 Quick Start

### Direct Click
Double-click `DevForge.command` in Finder to launch.

### Terminal
```bash
./launch.sh
```
Or open `index.html` directly in Safari or Chrome.

---

## 🔒 100% Client-Side Privacy
Every calculation, image resize, audio synthesis, and AST generation runs directly in your browser's local sandbox memory. Zero bytes leave your machine.
