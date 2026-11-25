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

### Assignment 8: Product Listing with Search & Combined Filters
- **Real-Time Client Search**: Instant search as you type, matching both product titles and descriptions without needing slow server roundtrips.
- **Combined Category & Keyword Filtering**: Seamlessly filters products matching both selected category and active search queries.
- **Dynamic "Clear All" Pill**: An active reset pill automatically surfaces as the first chip when any filter or search query is active, allowing 1-tap reset of all filters.
- **Streamlined Meta Row & SortModal**: Integrates the e-commerce standard `{count} results sorted by {sort} ⌵`, opening a clean bottom-sheet modal with radio checkmarks, saving over 40px of vertical height.
- **Floating Rating Badges**: Floats `★ 4.5` over the top-left of product images, decluttering the bottom text zone and leaving the top-right open for future wishlist actions.
- **Pulsing Skeleton Grid**: Replaced the bare spinning wheel with a 6-card pulsing skeleton screen (`ProductCardSkeleton` and `ProductGridSkeleton`), eliminating layout shift and reducing perceived wait time.
- **Interactive Empty States**: Integrated directly into `FlatList` so users never lose access to the search bar or category chips when 0 products match.

---

## 🧠 Core Architectural Decisions & Optimizations

### 1. In-Memory Client Filtering vs Server Roundtrips
- **The Challenge**: The public `fakestoreapi.com` REST API does not have server-side search, multi-category filtering, or price sorting query endpoints.
- **The Decision**: We fetch the catalog once on mount and execute combined filtering in-memory using `useMemo`. For typical mobile catalog sizes (20–100 items), client-side JavaScript filters and sorts in less than $1\text{ms}$, giving users instantaneous 60fps search results with zero network latency.

### 2. Short-Circuiting Order (Category First, Search Second)
- **The Concept**: In logic, `matchesCategory && matchesSearch` produces the exact same result whether category is checked first or second.
- **The Optimization**: A category comparison is a fast string equality check ($O(1)$), whereas text search requires lowercasing long descriptions and scanning substrings ($O(m \cdot n)$).
- **The Decision**: We evaluate category first. If a product does not belong to the selected category, JavaScript short-circuits (`return false`) immediately and skips running text search entirely.

### 3. Immutable Sorting (Preventing Catalog Cache Corruption)
- **The Gotcha**: In JavaScript, `Array.prototype.sort()` mutates arrays **in place**. If you call `.sort()` directly on state or cached data, the original array order is permanently altered in memory.
- **The Decision**: We always create a shallow copy (`[...filtered].sort(...)`) before applying sorting algorithms. This ensures the raw catalog cache remains pristine, allowing users to restore the natural catalog order at any time.

### 4. Natural Toggle-to-Deselect (No "Default" Developer Jargon)
- **The Problem**: Showing a button called "Default" or "Featured" to shoppers looks unnatural and clutters the screen with an option that doesn't actually filter anything.
- **The Decision**: We model active sort as `ProductSortOption | null`. When `sortBy` is `null`, the natural catalog order is displayed. Tapping an active sort chip toggles it back to `null`, giving shoppers an intuitive 1-tap way to clear their sort.

### 5. Cross-Platform SearchBar (Clear Button & Keyboard Blur)
- **The Platform Gotcha**: iOS `TextInput` has a native `clearButtonMode="while-editing"`, but Android completely lacks this prop. Relying on native clear buttons results in Android users having no way to quickly clear their search text.
- **The Decision**: We built a custom `SearchBar` with a styled `Pressable` clear (`X`) button that appears when text is typed. This gives iOS and Android the exact same 1-tap clear capability, while configuring mobile keyboard flags (`returnKeyType="search"`, `autoCorrect={false}`, `autoCapitalize="none"`). Furthermore, tapping `X` calls `inputRef.current?.blur()` and `Keyboard.dismiss()`, immediately dismissing the mobile keyboard so shoppers instantly regain full-screen view of the unfiltered product grid.

### 6. Keeping Filters Accessible During Empty States (`ListEmptyComponent`)
- **The UX Mistake**: When 0 products match, novice apps often replace the entire screen with an empty view, hiding the search bar and category chips. The user is trapped and forced to press a reset button just to fix a typo.
- **The Decision**: We render empty states through `FlatList.ListEmptyComponent`. The top search bar, category chips, and sort bar stay permanently visible and interactable. Applying `flexGrow: 1` and `justifyContent: 'center'` vertically centers the empty message within the list area.

### 7. Indexed Access Types for Native Props (`FlatListProps['ListEmptyComponent']`)
- **The TypeScript Gotcha**: In React Native, `FlatList`'s `ListEmptyComponent` prop accepts a rendered JSX element or a component type, but strictly **forbids `null`**. Writing `ListEmptyComponent?: React.ReactElement | null` causes a TypeScript compilation error.
- **The Decision**: Instead of hardcoding guessed unions, we used TypeScript's Indexed Access Type: `FlatListProps<Product>['ListEmptyComponent']`. This automatically borrows React Native's exact prop signature, making the wrapper component 100% type-safe.

### 8. React 19 State Synchronization During Render
- **The Principle**: Calling `setState` synchronously inside a `useEffect` on route navigation triggers cascading render warnings in React 19.
- **The Decision**: Following React 19 guidelines, `useProductFilters` tracks previous navigation params and synchronizes state directly during the render phase when params change, eliminating unnecessary `useEffect` cycles and render cascades.

### 9. Skeleton Screens (Ghost Placeholders) vs. Indeterminate Spinners
- **The Problem**: A spinning circle on a blank screen increases perceived wait times by 40% because users focus purely on the wait. When data finally arrives, the sudden appearance of 2-column cards causes visual layout shock.
- **The Decision**: We built `ProductCardSkeleton` and `ProductGridSkeleton` with gentle 60fps native pulse animations (`Animated` with `useNativeDriver: true`). Shoppers immediately see the 2-column structure of the store, and live products swap in smoothly without layout shift.

### 10. Seamless Header Search Transition (`autoFocus` & Persistent Shell)
- **The UX Friction**: When tapping a search icon in the top header, the user signals immediate intent: *I want to search, so let me type!* If the catalog opens with the keyboard down, the user is forced to tap the search input a frustrating second time. Furthermore, if the page remounts controls when switching from loading to loaded, the keyboard stutters and dismisses itself.
- **The Solutions**:
  - **Screen Transition Timing Guard**: React Navigation / Expo Router screen animations take 150–250ms. Requesting native keyboard focus before the screen is attached to the native window often gets ignored by mobile OS keyboard managers. In `SearchBar`, when `autoFocus={true}` is received, an `inputRef` calls `.focus()` after a brief 100ms delay to guarantee the native keyboard glides up cleanly every time.
  - **Persistent Screen Shell**: Instead of replacing the entire screen with a full-page loading placeholder, the screen shell (`AppHeader`, `SearchBar`, category chips, and result meta bar) stays permanently mounted. Only the catalog area swaps between `ProductGridSkeleton` and `ProductGrid`. This ensures the search bar never unmounts, preserving both focus and any characters the user begins typing.
  - **React 19 Native Ref Typing**: Typed using `ComponentRef<typeof TextInput>` (`ComponentRef` officially replaces the deprecated `ElementRef` in React 19) to ensure clean, future-proof type safety.

### 11. Automatic Category Carousel Auto-Scroll (`onLayout` + `scrollTo`)
- **The UX Friction**: When a user selects a category from Home that sits further down the list (e.g. *Women's Fashion* is the 5th chip), horizontal `ScrollView` by default mounts at $x = 0$. The active chip sits hidden off-screen to the right, forcing users to manually swipe right just to see their active selection.
- **The Decision**: We attached React Native's native `onLayout` event to each category chip to record its exact horizontal pixel coordinate. When the active category is measured, the `ScrollView` automatically glides to bring that active chip directly into view. When filters are cleared, it smoothly scrolls back to $x = 0$ (*All*).

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
