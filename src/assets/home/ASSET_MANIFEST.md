# Figma Home Asset Manifest

Source of Truth: Figma Desktop MCP Bridge (`http://localhost:3845`)

## Finalized Source Frames
1. **Screen 01**: `home page screen one copied ` (Node ID: `72:1670`, 390 × 844)
2. **Screen 02**: `HomeScreen02 copied` (Node ID: `77:1986`, 390 × 844)
3. **Screen 03**: `HomeScreen03 copied ` (Node ID: `80:2058`, 390 × 844)
4. **Screen 04**: `HomeScreen04` (Node ID: `80:2131`, 390 × 844)

---

## Asset Classification Overview
- **Category A (CSS/HTML Primitives)**: Solid background rectangles, rounded pill buttons ("Earn £50", "Send", "Add money", "Open" pill container), profile initials circle ("ML"), borders, dividers, typography. No asset files required.
- **Category B (Exact Reusable Figma Vectors)**: All icon vectors, flags, chevron symbols, and indicators extracted via high-res RGBA rasterization directly from the live Figma asset bridge.
- **Category C (Exact Figma Rasters/Artwork)**: Card artwork (`account/card-artwork.png`).
- **Category D (Assets Requiring Manual Export)**: 0 assets (100% of required visual assets were successfully exported via the Figma desktop bridge).

---

## Deduplicated Asset Registry

### 1. Shared Assets (`src/assets/home/shared/`)

#### Analytics Icon
- **Local Path**: `src/assets/home/shared/analytics-icon.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1745` (Screen 01), `77:2046` (Screen 02), `80:2119` (Screen 03), `80:2198` (Screen 04)
- **Original Dimensions**: 43.33 × 42.73 (Display: 43.33 × 43.33)
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TopBar`
- **Screens**: 01, 02, 03, 04

#### Open Plus Icon
- **Local Path**: `src/assets/home/shared/plus-icon.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1748` (Screen 01), `77:2049` (Screen 02), `80:2122` (Screen 03), `80:2201` (Screen 04)
- **Original Dimensions**: 15.05 × 15.05
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TopBar`
- **Screens**: 01, 02, 03, 04

#### GBP Flag
- **Local Path**: `src/assets/home/shared/flag-gbp.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1715` (Screen 01), `80:2105` (Screen 03), `80:2174` (Screen 04)
- **Original Dimensions**: 25.88 × 25.88
- **Asset Type**: Category B (Figma Vector / Flag)
- **Used By**: `AccountCard`, `TransferCalculatorSection`
- **Screens**: 01, 03, 04

#### Right Chevron
- **Local Path**: `src/assets/home/shared/chevron-right.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1726`
- **Original Dimensions**: 8.43 × 15.65
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Down Chevron
- **Local Path**: `src/assets/home/shared/chevron-down.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1732`
- **Original Dimensions**: 14.44 × 9.03
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `ActionButtonsRow`
- **Screens**: 01

---

### 2. Account Assets (`src/assets/home/account/`)

#### Card Artwork
- **Local Path**: `src/assets/home/account/card-artwork.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1724`
- **Original Dimensions**: 340.65 × 86.67
- **Asset Type**: Category C (Figma Raster / Graphic)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Card Logo (Wise Fast-Flag)
- **Local Path**: `src/assets/home/account/card-logo.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1725`
- **Original Dimensions**: 21.67 × 21.06
- **Asset Type**: Category B (Figma Vector / Logo)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Balance Eye Icon
- **Local Path**: `src/assets/home/account/eye-icon.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1741`
- **Original Dimensions**: 34.91 × 34.31
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `BalanceSection`
- **Screens**: 01

#### QR / Scan Icon
- **Local Path**: `src/assets/home/account/qr-icon.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1729`
- **Original Dimensions**: 38.52 × 43.33
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `ActionButtonsRow`
- **Screens**: 01

#### EUR Flag
- **Local Path**: `src/assets/home/account/flag-eur.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1712`
- **Original Dimensions**: 25.28 × 25.88
- **Asset Type**: Category B (Figma Vector / Flag)
- **Used By**: `AccountCard`
- **Screens**: 01

#### USD Flag
- **Local Path**: `src/assets/home/account/flag-usd.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1719`
- **Original Dimensions**: 25.88 × 25.88
- **Asset Type**: Category B (Figma Vector / Flag)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Account Details Icon (Bank Building)
- **Local Path**: `src/assets/home/account/account-details-icon.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1706`
- **Original Dimensions**: 15.05 × 15.05
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Promo Card 1/3 Circular Progress
- **Local Path**: `src/assets/home/account/promo-progress.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1693`
- **Original Dimensions**: 60.19 × 60.19
- **Asset Type**: Category B (Figma Vector / Graphic)
- **Used By**: `PromoCard`
- **Screens**: 01

#### Promo Card Right Chevron
- **Local Path**: `src/assets/home/account/promo-chevron.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1691`
- **Original Dimensions**: 7.82 × 13.24
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `PromoCard`
- **Screens**: 01

#### Carousel Dot (Active)
- **Local Path**: `src/assets/home/account/carousel-dot-active.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1699`
- **Original Dimensions**: 9.03 × 9.03
- **Asset Type**: Category B (Figma Vector / Indicator)
- **Used By**: `CarouselDots`
- **Screens**: 01

#### Carousel Dot (Inactive / Plus)
- **Local Path**: `src/assets/home/account/carousel-dot-inactive.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1700`
- **Original Dimensions**: 9.03 × 9.03
- **Asset Type**: Category B (Figma Vector / Indicator)
- **Used By**: `CarouselDots`
- **Screens**: 01

#### Currency Row Chevron (GBP)
- **Local Path**: `src/assets/home/account/chevron-row-gbp.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1713`
- **Original Dimensions**: 9.03 × 15.05
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Currency Row Chevron (EUR)
- **Local Path**: `src/assets/home/account/chevron-row-eur.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1710`
- **Original Dimensions**: 8.43 × 15.05
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Currency Row Chevron (USD)
- **Local Path**: `src/assets/home/account/chevron-row-usd.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1717`
- **Original Dimensions**: 9.03 × 15.65
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `AccountCard`
- **Screens**: 01

#### Account Balance Chevron
- **Local Path**: `src/assets/home/account/chevron-account-balance.png`
- **Figma Frame**: `home page screen one copied `
- **Figma Node ID**: `72:1721`
- **Original Dimensions**: 8.43 × 15.65
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `AccountCard`
- **Screens**: 01

---

### 3. Navigation Assets (`src/assets/home/navigation/`)

#### Home Nav Icon
- **Local Path**: `src/assets/home/navigation/nav-home.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1688` (Screen 01), `77:2001` (Screen 02), `80:2074` (Screen 03), `80:2146` (Screen 04)
- **Original Dimensions**: 19.86 × 19.86
- **Asset Type**: Category B (Figma Vector / Navigation Icon)
- **Used By**: `BottomNavBar`
- **Screens**: 01, 02, 03, 04

#### Cards Nav Icon
- **Local Path**: `src/assets/home/navigation/nav-cards.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1685` (Screen 01), `77:1998` (Screen 02), `80:2071` (Screen 03), `80:2143` (Screen 04)
- **Original Dimensions**: 21.67 × 17.45
- **Asset Type**: Category B (Figma Vector / Navigation Icon)
- **Used By**: `BottomNavBar`
- **Screens**: 01, 02, 03, 04

#### Recipients Nav Icon
- **Local Path**: `src/assets/home/navigation/nav-recipients.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1682` (Screen 01), `77:1995` (Screen 02), `80:2068` (Screen 03), `80:2140` (Screen 04)
- **Original Dimensions**: 19.86 × 19.86
- **Asset Type**: Category B (Figma Vector / Navigation Icon)
- **Used By**: `BottomNavBar`
- **Screens**: 01, 02, 03, 04

#### Payments Nav Icon
- **Local Path**: `src/assets/home/navigation/nav-payments.png`
- **Figma Frame**: `home page screen one copied `, `HomeScreen02 copied`, `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `72:1679` (Screen 01), `77:1992` (Screen 02), `80:2065` (Screen 03), `80:2137` (Screen 04)
- **Original Dimensions**: 19.26 × 22.27
- **Asset Type**: Category B (Figma Vector / Navigation Icon)
- **Used By**: `BottomNavBar`
- **Screens**: 01, 02, 03, 04

---

### 4. Transactions Assets (`src/assets/home/transactions/`)

#### Transaction Down Arrow Icon
- **Local Path**: `src/assets/home/transactions/tx-down.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2037`
- **Original Dimensions**: 51.76 × 51.76
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransactionsSection`
- **Screens**: 02

#### Transaction Up Arrow Icon
- **Local Path**: `src/assets/home/transactions/tx-up.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2032`
- **Original Dimensions**: 51.76 × 51.76
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransactionsSection`
- **Screens**: 02

#### Transaction Plus Icon
- **Local Path**: `src/assets/home/transactions/tx-plus.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2027`
- **Original Dimensions**: 51.76 × 51.76
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransactionsSection`
- **Screens**: 02

---

### 5. Returns Assets (`src/assets/home/returns/`)

#### Returns GBP Flag with Green Plus Badge
- **Local Path**: `src/assets/home/returns/returns-flag-badge.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2017`
- **Original Dimensions**: 52.36 × 52.36
- **Asset Type**: Category B (Figma Vector / Icon Composite)
- **Used By**: `ReturnsSection`
- **Screens**: 02

#### Returns Right Chevron
- **Local Path**: `src/assets/home/returns/returns-chevron.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2016`
- **Original Dimensions**: 7.22 × 13.24
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `ReturnsSection`
- **Screens**: 02

---

### 6. Calculator Assets (`src/assets/home/calculator/`)

#### Rate Line Artwork (Screen 02 Compact)
- **Local Path**: `src/assets/home/calculator/calc-rate-line.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2006`
- **Original Dimensions**: 276.25 × 29.49
- **Asset Type**: Category B (Figma Vector / Artwork)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 02

#### Chart Grid Line
- **Local Path**: `src/assets/home/calculator/calc-grid-line.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2012`
- **Original Dimensions**: 274.44 × 6.02
- **Asset Type**: Category B (Figma Vector / Graphic)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 02

#### Rate Point Badge
- **Local Path**: `src/assets/home/calculator/calc-rate-point.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2009`
- **Original Dimensions**: 36.11 × 19.26
- **Asset Type**: Category B (Figma Vector / Graphic)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 02

#### Rate Point Marker Dot
- **Local Path**: `src/assets/home/calculator/calc-point-marker.png`
- **Figma Frame**: `HomeScreen02 copied`
- **Figma Node ID**: `77:2010`
- **Original Dimensions**: 9.63 × 6.62
- **Asset Type**: Category B (Figma Vector / Graphic)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 02

#### Rate Line Artwork (Screen 03 Full Chart)
- **Local Path**: `src/assets/home/calculator/calc-rate-line-expanded.png`
- **Figma Frame**: `HomeScreen03 copied `
- **Figma Node ID**: `80:2114`
- **Original Dimensions**: 278.06 × 114.95
- **Asset Type**: Category B (Figma Vector / Artwork)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03

#### Current Rate Indicator (Glowing Dot)
- **Local Path**: `src/assets/home/calculator/calc-current-rate-indicator.png`
- **Figma Frame**: `HomeScreen03 copied `
- **Figma Node ID**: `80:2115`
- **Original Dimensions**: 32.50 × 35.51
- **Asset Type**: Category B (Figma Vector / Indicator)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03

#### ZAR Flag
- **Local Path**: `src/assets/home/calculator/flag-zar.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2095` (Screen 03), `80:2180` (Screen 04)
- **Original Dimensions**: 25.88 × 25.88
- **Asset Type**: Category B (Figma Vector / Flag)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03, 04

#### Currency Swap Icon
- **Local Path**: `src/assets/home/calculator/swap-icon.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2098` (Screen 03), `80:2184` (Screen 04)
- **Original Dimensions**: 15.65 × 15.65
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03, 04

#### Fee Info Icon
- **Local Path**: `src/assets/home/calculator/fee-info-icon.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2087` (Screen 03), `80:2166` (Screen 04)
- **Original Dimensions**: 15.05 × 14.44
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03, 04

#### Notification Bell Icon
- **Local Path**: `src/assets/home/calculator/bell-icon.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2077` (Screen 03), `80:2156` (Screen 04)
- **Original Dimensions**: 51.76 × 51.76
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `TransferCalculatorSection` (Exchange rate updates)
- **Screens**: 03, 04

#### Exchange Rate Updates Right Chevron
- **Local Path**: `src/assets/home/calculator/updates-chevron.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2075` (Screen 03), `80:2154` (Screen 04)
- **Original Dimensions**: 7.22 × 13.24
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `TransferCalculatorSection` (Exchange rate updates)
- **Screens**: 03, 04

#### ZAR Dropdown Chevron
- **Local Path**: `src/assets/home/calculator/chevron-dropdown-zar.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2094` (Screen 03), `80:2179` (Screen 04)
- **Original Dimensions**: 12.64 × 7.82
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03, 04

#### GBP Dropdown Chevron
- **Local Path**: `src/assets/home/calculator/chevron-dropdown-gbp.png`
- **Figma Frame**: `HomeScreen03 copied `, `HomeScreen04`
- **Figma Node ID**: `80:2103` (Screen 03), `80:2173` (Screen 04)
- **Original Dimensions**: 12.64 × 7.82
- **Asset Type**: Category B (Figma Vector / Symbol)
- **Used By**: `TransferCalculatorSection`
- **Screens**: 03, 04

---

### 7. Protection Assets (`src/assets/home/protection/`)

#### Protection Shield Icon
- **Local Path**: `src/assets/home/protection/protection-shield.png`
- **Figma Frame**: `HomeScreen04`
- **Figma Node ID**: `80:2153`
- **Original Dimensions**: 18.06 × 22.27
- **Asset Type**: Category B (Figma Vector / Icon)
- **Used By**: `ProtectionSection` (Screen 04)
- **Screens**: 04
