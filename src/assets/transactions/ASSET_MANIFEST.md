# Transaction Asset Manifest

Source of Truth: Figma Desktop MCP — Frame `TransactionDetailsScreen01`, Node ID `124:2`  
Frame Dimensions: 390 × 844 px

---

## Asset Classification

### Category A — CSS/HTML Primitives (no asset files)
- **SummaryBackground** (`124:22`) — solid fill `#292c27` rectangle  
- **DetailsBackground** (`124:5`) — solid fill `#121511` rectangle (near-black)  
- **StatusPillBackground** (`124:25`) — `#282b27` rounded rect, border `#494b48 0.542px`, radius `16.25px`  
- All typography, labels, values, section titles  
- All horizontal dividers (`#414441`, `h: 0.542px`)  

### Category B — Exact Figma Assets (PNG, extracted from Figma Desktop MCP bridge)

| Local Filename | Figma Node ID | Figma Frame | Original Dimensions | Format | Usage | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/assets/transactions/details/icon-tx-arrow-down.png` | `124:29` | `TransactionDetailsScreen01` | 78.54 × 78.54 px | PNG | Large circular ↓ transaction icon (TransactionSummary) | Details only |
| `src/assets/transactions/shared/btn-close.png` | `124:33` | `TransactionDetailsScreen01` | 43.33 × 43.33 px | PNG | X close button (top-left of SummaryActions) | Shared / reusable |
| `src/assets/transactions/shared/btn-help.png` | `124:32` | `TransactionDetailsScreen01` | 43.33 × 43.33 px | PNG | Help ? button (SummaryActions) | Shared / reusable |
| `src/assets/transactions/shared/btn-more.png` | `124:31` | `TransactionDetailsScreen01` | 43.33 × 43.33 px | PNG | Three-dot ··· button (SummaryActions) | Shared / reusable |
| `src/assets/transactions/details/icon-status-money-added.png` | `124:26` | `TransactionDetailsScreen01` | 26 × 26 px | PNG | Status pill icon (Money added +) | Details only |
| `src/assets/transactions/details/icon-amount-direction.png` | `124:28` | `TransactionDetailsScreen01` | 16.25 × 16.25 px | PNG | Small + direction indicator left of amount | Details only |
| `src/assets/transactions/details/bg-details-panel.png` | `124:5` | `TransactionDetailsScreen01` | 390 × 481 px | PNG | Details panel background texture (solid fill) | Downloaded but implemented as CSS `#121511` |

---

## Directory Structure

```
src/assets/transactions/
├── ASSET_MANIFEST.md          ← this file
├── shared/                    ← reusable across all transaction screens
│   ├── btn-close.png          (43.33 × 43.33)
│   ├── btn-help.png           (43.33 × 43.33)
│   └── btn-more.png           (43.33 × 43.33)
└── details/                   ← specific to details screens
    ├── icon-tx-arrow-down.png (78.54 × 78.54)
    ├── icon-status-money-added.png (26 × 26)
    ├── icon-amount-direction.png   (16.25 × 16.25)
    └── bg-details-panel.png   (390 × 481 — downloaded, used as CSS)
```

---

## Verification

- All assets downloaded from `http://localhost:3845/assets/...` during Figma extraction phase
- Runtime source code imports ONLY from `src/assets/transactions/`
- Zero references to `localhost:3845` remain in runtime code
- Existing Home assets (`src/assets/home/transactions/`) are NOT modified
