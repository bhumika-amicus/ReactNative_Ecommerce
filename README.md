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
    ├── services/                # Global Infrastructure & Network
    │   └── apiClient.ts         # Centralized Singleton HTTP Client & ApiError
    │
    └── features/                # Domain-Specific Feature Modules
        └── products/
            ├── components/
            │   ├── ProductCard.tsx   # Individual product card
            │   └── ProductGrid.tsx   # 2-column virtualized FlatList with RefreshControl
            ├── services/
            │   └── productService.ts # REST API integration & memory-first cache
            └── types/
                └── product.ts        # Domain models & Adapter mapper function
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
- [x] **Step 2: Generic `apiClient` & `productService` with `AbortSignal`**
  - **Architecture**: Created centralized `src/services/apiClient.ts` to manage `BASE_URL`, standard JSON headers, automatic `response.ok` status validation, and error normalization.
  - **Industry-Standard Error Handling**: Implemented custom `ApiError extends Error` enabling type-safe `instanceof ApiError` narrowing in UI components while preserving native stack traces.
  - **Cancellation Support**: Supported native `signal?: AbortSignal` across all requests to cancel in-flight HTTP requests when screens unmount.
  - **Pure Service Layer**: `productService.ts` provides clean, stateless API methods (`fetchProducts`, `fetchProductById`) cleanly separating network transport from React components.
- [x] **Step 3: Async State Modeling (`loading` / `error` / `success`)**
  - **State Segregation**: Separated initial screen `loading` from pull-to-refresh `refreshing` to prevent full-screen flashing when refreshing an active catalog.
  - **Guaranteed Cleanup**: Used `try ... catch ... finally` to guarantee `setLoading(false)` and `setRefreshing(false)` always execute, preventing stuck spinners on network drops.
  - **Resilient Retry UI**: Implemented an error fallback state rendering an alert badge, human-readable error description, and an active **"Try Again"** button.
- [x] **Step 4: Screen Integration & Pull-to-Refresh (`RefreshControl`)**
  - **Component Wiring**: Integrated live `fetchProducts` into `src/app/products.tsx` with `useEffect` and `AbortController` cleanup.
  - **Native Pull-to-Refresh**: Connected native `RefreshControl` through `ProductGrid.tsx` to `<FlatList>`, properly themed with `tintColor` (iOS) and `colors` (Android).
- [x] **Step 5: Dynamic Category Filtering with Live API Data**
  - **Dynamic Derivation**: Replaced fragile hardcoded categories with dynamic extraction (`['All', ...new Set(products.map(p => p.category))]`) so the UI automatically aligns with live FakeStore categories.

---

## 🧠 Core Architectural Concepts & Design Patterns Learned

### 1. The Singleton Pattern (`apiClient`)
- **Concept**: Centralizes all networking into a single instance (`src/services/apiClient.ts`).
- **Why it matters**: Eliminates duplication of `BASE_URL`, default JSON headers, and HTTP status checking across files. Adding new verbs (`POST`, `PUT`, `DELETE`) is centralized in one place.

### 2. The Adapter / Mapper Pattern
- **Concept**: A pure transformer function (`mapApiProductToProduct`) that sits between external HTTP payloads and internal UI components.
- **Why it matters**: Protects components (`ProductCard`, `FlatList`) from third-party schema drift, handles numeric to string ID conversions, and enforces safe fallbacks for optional or nested objects (like `rating.rate ?? 0`).

### 3. Custom Error Hierarchy: `class ApiError extends Error`
- **Concept**: Subclassing JavaScript's native `Error` to store metadata (`status?: number`, `data?: unknown`).
- **`instanceof` vs `typeof`**: `typeof` only identifies primitives and returns `"object"` for all errors. `instanceof ApiError` inspects the prototype chain, allowing TypeScript to narrow types safely in `catch` blocks while preserving native V8 engine call stacks (`err.stack`).

### 4. `AbortController` Request Lifecycle
- **Concept**: Passing `controller.signal` into `fetch()` and calling `controller.abort()` in `useEffect`'s cleanup return.
- **Why it matters**: Automatically cancels in-flight HTTP requests if the user navigates away before the network responds, saving battery, cellular bandwidth, and preventing state updates on unmounted screens.

### 5. Shared Image Caching Architecture (`expo-image`)
- **The Problem**: Mixing React Native core `<Image>` with `expo-image` causes cache misses. Even if the catalog downloaded an image, the detail screen re-downloads it over the network, rendering a jarring blank white box while loading.
- **The Solution**: Standardizing on `expo-image` with `cachePolicy="memory-disk"` and `transition={200}`. Images cached by the catalog grid are instantly reused by the detail screen directly from RAM in 0ms with a smooth cross-fade animation.

### 6. Modern `async/await` Pattern in `useEffect` (Inner Async Function)
- **The Rule**: `useEffect(async () => ...)` is strictly invalid in React because an `async` function implicitly returns a `Promise`, whereas React requires `useEffect` to return either `undefined` or a synchronous cleanup function.
- **The Solution**: Declare an inner `async function loadData() { ... }` inside the effect, invoke it immediately (`loadData()`), and return the cleanup function `() => controller.abort()`.
- **Avoiding Cascading Render Warnings**: Avoid calling synchronous `setState` calls (such as `setLoading(true)`) immediately inside the effect body before the `await`. Let the initial state values handle the first render, and only update state in response to resolved async promises.

### 7. User-Facing Error Normalization (`getFriendlyErrorMessage`)
- **The Principle**: Never leak raw technical messages or HTTP status codes (`"Request failed with status 400/500"`) into customer-facing mobile interfaces.
- **The Implementation**: An error normalization adapter in `src/services/apiClient.ts` that maps technical exceptions to human-friendly actionable guidance:
  - `404` &rarr; *"We couldn't find what you were looking for. It may have been removed."*
  - `5xx` &rarr; *"Our store servers are currently experiencing issues. Please try again shortly."*
  - `4xx` &rarr; *"Unable to load products at this time. Please try again."*
  - Offline/Network drop &rarr; *"Unable to connect to the store. Please check your internet connection."*

---
