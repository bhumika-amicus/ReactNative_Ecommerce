# React Native eCommerce App 🛍️

A modern, high-performance mobile eCommerce catalog application built from scratch using **React Native**, **Expo SDK 58**, and **Expo Router**. 

This project follows **Domain-Driven / Feature-Based Architecture**, utilizing strictly typed components, modern Flexbox layouts, and mobile-first optimization patterns.

---

## 📱 Features

- **Domain-Driven Architecture**: Structured around business domains (`src/features/products`) to ensure high cohesion and maintainability.
- **Virtualized Product Grid**: Built with `<FlatList>` (2 columns), featuring view recycling and virtualization to ensure zero-lag scrolling and low memory usage.
- **Dynamic Flexbox Alignment**: Two-group semantic layout (`justifyContent: 'space-between'`) ensuring all "Add to Cart" buttons and prices are aligned at the bottom across cards without fragile fixed-height hacks.
- **Hardware-Accelerated Image Caching**: Powered by `expo-image` (using native SDWebImage on iOS and Glide on Android) for smooth transitions and disk caching.
- **Design System & Theme Tokens**: Single source of truth for colors, spacing, typography scales, and radii (`src/constants/theme.ts`) typed with TypeScript `as const`.
- **Edge-to-Edge Safe Area Handling**: Integrated with `react-native-safe-area-context` and `expo-status-bar` for seamless top status bar tinting across devices with notches or Dynamic Islands.
- **Tactile UI Primitives**: Reusable `Card` and `Button` primitives built with `<Pressable>`, dynamic touch feedback states (`({ pressed }) => [...]`), and accessibility roles (`accessibilityRole="button"`).
- **Vector Iconography**: Crisp SVG icons powered by `lucide-react-native` and `react-native-svg`.

---

## 🛠️ Tech Stack

- **Framework**: [Expo SDK 58](https://expo.dev)
- **Core Library**: [React Native 0.88](https://reactnative.dev) & [React 19](https://react.dev)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Images**: [`expo-image`](https://docs.expo.dev/versions/latest/sdk/image/)
- **Icons**: [`lucide-react-native`](https://lucide.dev) & [`react-native-svg`](https://github.com/software-mansion/react-native-svg)
- **Safe Area**: [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context)

---

## 📂 Project Architecture

```
react_native_ecommerce/
├── app.json                     # Expo manifest (app name, icons, splash, orientation)
├── tsconfig.json                # TypeScript config with '@/*' path aliases
├── package.json                 # Project dependencies & scripts
│
├── assets/                      # App icons and splash assets
│   └── images/
│       ├── icon.png             # App launcher icon
│       ├── splash-icon.png      # Native splash icon
│       └── android-icon-*.png   # Android adaptive icons
│
└── src/
    ├── app/                     # Navigation Routes (Expo Router)
    │   ├── _layout.tsx          # Root shell (Stack navigator & status bar)
    │   └── index.tsx            # Home screen (Product catalog)
    │
    ├── components/              # Shared, Domain-Agnostic UI Primitives
    │   ├── layout/
    │   │   └── AppHeader.tsx    # Branded top app header
    │   └── ui/
    │       ├── Button.tsx       # Reusable Pressable button with active states
    │       └── Card.tsx         # Reusable surface card container
    │
    ├── constants/               # Design Tokens
    │   └── theme.ts             # Colors, Typography, Spacing, and Radii
    │
    └── features/                # Domain-Specific Feature Modules
        └── products/
            ├── components/
            │   ├── ProductCard.tsx   # Individual product card
            │   └── ProductGrid.tsx   # 2-column virtualized FlatList
            ├── data/
            │   └── products.ts       # Curated product catalog dataset
            └── types/
                └── product.ts        # TypeScript interface for Product entity
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app installed on your physical mobile device (iOS / Android) or an emulator / simulator.

### Installation

1. Clone or open the repository:
   ```bash
   cd react_native_ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Open the app:
   - **Physical Device**: Scan the QR code displayed in the terminal using the **Expo Go** app (Android) or **Camera** app (iOS).
   - **Android Emulator**: Press <kbd>a</kbd> in the terminal.
   - **iOS Simulator**: Press <kbd>i</kbd> in the terminal.
   - **Web**: Press <kbd>w</kbd> in the terminal.

---

## 🧪 Quality & Code Standards

Run type checking and linting to ensure zero compiler or styling errors:

```bash
# Run TypeScript type check
npx tsc --noEmit

# Run ESLint on the source directory
npx eslint src
```

---

## 📦 Assignment 7: REST API Integration (`fakestoreapi.com`)

### Objective
Transition the application from static local mock datasets to a live, asynchronous REST API architecture utilizing `useEffect`, `fetch`, resilient state modeling (loading/error/success), pull-to-refresh (`RefreshControl`), and proper lifecycle cleanup with `AbortController`.

### Implementation Roadmap & Architecture
- [x] **Step 1: API Contract Modeling & Adapter Pattern**
  - **Problem**: Raw third-party API contracts (`https://fakestoreapi.com/products`) have nested structures (`rating: { rate, count }`), numeric IDs (`id: 1`), and optional fields that can cause runtime null-pointer crashes in UI components.
  - **Solution**: Defined `ApiProduct` and implemented an Adapter function `mapApiProductToProduct()` that maps raw payloads into our clean, string-keyed `Product` domain model with defensive nullish coalescing defaults (`??`).
- [ ] **Step 2: REST API Service Implementation (`fetch` + `AbortSignal`)**
- [ ] **Step 3: Async State Modeling (`idle` / `loading` / `error` / `success`)**
- [ ] **Step 4: Screen Integration & Pull-to-Refresh (`RefreshControl`)**
- [ ] **Step 5: Dynamic Category Filtering with Live API Data**

---
