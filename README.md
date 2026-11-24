# React Native eCommerce App 🛍️

A modern, high-performance mobile eCommerce catalog and shopping application built from scratch using **React Native**, **Expo SDK 58**, and **Expo Router**. 

This application follows **Domain-Driven / Feature-Based Architecture**, utilizing strictly typed TypeScript contracts, modern Flexbox layouts, centralized design tokens, and industry-standard mobile optimization patterns.

---

## 📱 Features

- **Domain-Driven Architecture**: Structured around business domains (`src/features/products`) to ensure high cohesion and maintainability.
- **Dynamic Home Screen**: Features an immersive hero banner with glass-morphic badges, 2x2 promo cards, live API featured carousel, clean category cards, a unified midnight trust bar, and a minimalist footer.
- **Virtualized Product Grid**: Built with `<FlatList>` (2 columns), featuring view recycling, memoized `renderItem`, and windowing for lag-free 60/120fps scrolling.
- **Live FakeStore REST API Integration**: Fully asynchronous network communication with `fakestoreapi.com`, robust loading indicators, and resilient error recovery.
- **Native Pull-to-Refresh (`RefreshControl`)**: Non-destructive pull-to-refresh on both the Home feed and the Product Catalog screen—keeping existing data visible even during brief network drops.
- **Product Details & Cart Sync**: Dynamic route (`/product/[id]`) with a 280px hero image, quantity stepper, live subtotal calculation, and global state sync via `CartContext` and `useCart()`.
- **100% Centralized Design System**: Single source of truth for semantic colors, spacing, typography scales, and organic radii (`src/constants/theme.ts`) typed with TypeScript `as const` with zero hardcoded hex strings.
- **Edge-to-Edge Safe Area Handling**: Integrated with `react-native-safe-area-context` and `expo-status-bar` for seamless status bar tinting across devices with notches or Dynamic Islands.
- **Decoupled Touch Ergonomics**: Decoupled card navigation zones from independent "Add" action buttons, preventing accidental navigations.

---

## 🛠️ Tech Stack

- **Framework**: [Expo SDK 58](https://expo.dev)
- **Core Library**: [React Native 0.88](https://reactnative.dev) & [React 19](https://react.dev)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Images**: [`expo-image`](https://docs.expo.dev/versions/latest/sdk/image/) (Hardware-accelerated disk/memory cache)
- **Icons**: [`lucide-react-native`](https://lucide.dev) & [`react-native-svg`](https://github.com/software-mansion/react-native-svg)
- **Safe Area**: [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context)

---

## 📂 Project Architecture

```
react_native_ecommerce/
├── app.json                     # Expo manifest (app name, icons, orientation)
├── tsconfig.json                # TypeScript config with '@/*' path aliases
├── package.json                 # Project dependencies & scripts
│
├── assets/                      # App launcher and splash icons
│
└── src/
    ├── app/                     # Navigation Routes (Expo Router)
    │   ├── _layout.tsx          # Root shell (CartProvider & Stack Navigator)
    │   ├── index.tsx            # Home Screen (Assignment 6 - Feed & Carousel)
    │   ├── products.tsx         # Product Catalog (Assignment 5/7 - Grid & Filters)
    │   └── product/
    │       └── [id].tsx         # Product Details Screen (PDP with Stepper)
    │
    ├── components/
    │   ├── home/                # Modular Home Screen Sections
    │   │   ├── HeroBanner.tsx               # Immersive lifestyle hero card
    │   │   ├── PromoBannerGrid.tsx          # 2x2 soft pastel promo cards
    │   │   ├── FeaturedProductsSection.tsx  # Live horizontal carousel with retry
    │   │   ├── ShopByCategorySection.tsx    # API-ready category cards
    │   │   ├── ServiceHighlights.tsx        # Unified midnight trust bar
    │   │   └── FooterSection.tsx            # Minimalist brand signature & copyright
    │   ├── layout/
    │   │   └── AppHeader.tsx    # Branded top app bar with live cart badge
    │   └── ui/                  # Reusable Design System Primitives
    │       ├── Button.tsx       # Reusable Pressable button (variants & sizes)
    │       ├── Card.tsx         # Reusable surface card (elevated, bordered, flat)
    │       ├── CategoryCard.tsx # Filter pills with active selection
    │       ├── QuantitySelector.tsx # Number stepper with boundary guards
    │       └── SearchBar.tsx    # Controlled search input with clear trigger
    │
    ├── constants/               # Design Tokens
    │   └── theme.ts             # 100% centralized Colors, Typography, Spacing, Radius
    │
    ├── context/                 # Global Client State
    │   └── CartContext.tsx      # CartProvider and useCart() hook
    │
    ├── services/                # Global Network Layer
    │   └── apiClient.ts         # Centralized HTTP Client & ApiError
    │
    └── features/                # Domain-Specific Feature Modules
        └── products/
            ├── components/
            │   ├── ProductCard.tsx   # Individual product card (2-line title symmetry)
            │   └── ProductGrid.tsx   # 2-column FlatList with memoized renderItem
            ├── services/
            │   └── productService.ts # REST API integration (fetchProducts, fetchProductById)
            └── types/
                └── product.ts        # ApiProduct DTO, Product Entity & Adapter
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app installed on your physical mobile device (iOS / Android) or an emulator / simulator.

### Installation & Run

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

## 📦 Assignment Breakdown & Milestones

### Assignment 6: Static Home Screen
- **Hero Banner**: High-impact lifestyle visual with glass-morphic pill badge (`✨ NEW DROP • 2026`) and thumb-friendly `Explore Collection →` button.
- **Promo Grid**: 2x2 soft pastel-tinted cards (*New Arrivals, Best Sellers, Sale Items, Gift Cards*) with micro-badges and arrow buttons.
- **Featured Products Carousel**: Smooth horizontal scroll displaying top-rated picks using the reusable `ProductCard` component.
- **Shop by Category**: API-ready 2-column category cards that pass query params (`/products?category=...`) to pre-select filters in the catalog.
- **Midnight Trust Bar**: Unified high-contrast dark container (`#0F172A`) featuring 3 columns (*Secure Pay, 24/7 Help, Fast Ship*) with subtle vertical dividers, eliminating "box fatigue".
- **Minimalist Footer**: Clean brand mark, tagline, and copyright notice without redundant sitemap clutter.

### Assignment 7: Live REST API Integration (`fakestoreapi.com`)
- **API Integration**: Connected `apiClient.ts` to `https://fakestoreapi.com` with clean error normalization and typed responses.
- **Adapter Pattern**: `mapApiProductToProduct()` transforms third-party API payloads into clean `Product` entities, normalizing nested ratings and numeric IDs.
- **State Machine**: Handled the 3 primary async states (`loading`, `error`, `success`) plus non-blocking background `refreshing`.
- **Non-Destructive Pull-to-Refresh**: Failed refreshes never wipe existing products from the screen; existing catalog remains visible while alerting the user.
- **Native Lifecycle Cleanup**: All network requests subscribe to `AbortController.signal` and cancel automatically when unmounting.

---

## 🧠 Core Mobile Architecture & UX Best Practices

### 1. FlatList Virtualization Optimization
- **The Problem**: Passing an inline arrow function `renderItem={({ item }) => <ProductCard ... />}` re-allocates a new function on every scroll tick, causing FlatList to re-render visible cells unnecessarily.
- **The Solution**: Memoized with `useCallback`, paired with a stable `keyExtractor` for optimal cell recycling.

### 2. Symmetrical Card Grid Alignment
- **The Problem**: Variable product title lengths (1 line vs 3 lines) cause jagged, misaligned rows in a 2-column grid.
- **The Solution**: Set `numberOfLines={2}` and `minHeight: 36` on product titles. All cards occupy identical vertical space regardless of title length.

### 3. Header Flex Shrinkage
- **The Problem**: Long product titles inside a row container expand past their parent without `flex: 1`, overlapping the cart icon.
- **The Solution**: Styled `AppHeader` title with `flex: 1` and `Typography.subtitle` (18px), allowing text to truncate naturally with an ellipsis (`...`) before colliding with action buttons.

### 4. Avoiding Cascading Render Warnings (React 19)
- **The Principle**: Never call synchronous `setState` (such as `setLoading(true)`) directly at the top of a `useEffect` body.
- **The Implementation**: Let the initial `useState(true)` represent the first render, and update state strictly when resolved async promises complete. User-triggered retries manage their own loading triggers in event callbacks.

### 5. 100% Centralized Theme Tokens
- Zero hardcoded hex strings across all UI components. All surfaces, borders, text, status indicators, and promo tints are defined in `src/constants/theme.ts`.
