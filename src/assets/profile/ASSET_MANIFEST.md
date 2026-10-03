# Profile Asset Manifest

Source of Truth: Figma Desktop MCP Bridge (`ProfileScreen`, `ProfileScreen02`, `ProfileScreen03`)

## Finalized Reference Frames
1. **ProfileScreen**: Node ID `7:492` (Dimensions: 390 × 844 px)
2. **ProfileScreen02**: Node ID `21:2` (Dimensions: 390 × 844 px)
3. **ProfileScreen03**: Node ID `21:54` (Dimensions: 390 × 844 px)

---

## Asset Classification Overview

### Category A — CSS/HTML Primitives (No asset files needed)
- Screen, section, and container backgrounds (`SettingsBackground`, `TopBarBackground`, `ContentBackground`, `RowBackground`, etc.)
- TopBar "Open an account" pill container & styling (`#242823` background with `#9fe870` text)
- Email pill container (`#242823` background with border)
- Membership number and App version "Copy" buttons (`#282b27` pill containers)
- Feedback section container & background block (`21:64` FeedbackArtwork, solid `#121511` block)
- All typography, labels, subtitles, descriptions, and account names

### Category B — Exact Figma Visual Assets
All 18 unique visual vector icons, emblems, badges, and chevron glyphs extracted directly via high-resolution RGBA PNG rasterization from Figma Desktop MCP.

---

## Complete Profile Asset Inventory

| Local Filename | Figma Frame | Figma Node ID | Original Dimensions | Asset Type | Where Used | Scope / Sharing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/assets/profile/shared/btn-back.png` | `ProfileScreen` / `02` / `03` | `7:534` (`21:53`, `21:107`) | 43.33 × 42.79 px | Category B (PNG) | Header circular back button | **Shared** (`ProfileScreen`, `ProfileScreen02`, `ProfileScreen03`) |
| `src/assets/profile/shared/chevron-right.png` | `ProfileScreen` / `02` / `03` | `7:515` (and 16 duplicates) | 7.04 × 13.00 px | Category B (PNG) | Row navigation disclosure chevrons | **Shared** (`ProfileScreen`, `ProfileScreen02`, `ProfileScreen03`) |
| `src/assets/profile/shared/avatar-bg.png` | `ProfileScreen` | `7:527` | 78.54 × 78.54 px | Category B (PNG) | Avatar circular base disc | `ProfileScreen` only |
| `src/assets/profile/shared/badge-camera.png` | `ProfileScreen` | `7:528` | 28.17 × 27.63 px | Category B (PNG) | Avatar edit camera badge | `ProfileScreen` only |
| `src/assets/profile/shared/icon-wise-flag.png` | `ProfileScreen` | `7:524` | 16.79 × 16.25 px | Category B (PNG) | Email pill Wise fast-flag logo | `ProfileScreen` only |
| `src/assets/profile/account/chevron-right.png` | `ProfileScreen` | `7:515` | 7.04 × 13.00 px | Category B (PNG) | Menu row chevron (account path) | Backwards-compatibility with `ProfileMenuRow` |
| `src/assets/profile/account/icon-inbox.png` | `ProfileScreen` | `7:517` | 52.00 × 52.00 px | Category B (PNG) | Inbox row notification bell icon | `ProfileScreen` only |
| `src/assets/profile/account/icon-plan.png` | `ProfileScreen` | `7:513` | 52.00 × 52.00 px | Category B (PNG) | Your plan row credit card icon | `ProfileScreen` only |
| `src/assets/profile/account/icon-help.png` | `ProfileScreen` | `7:508` | 52.00 × 52.00 px | Category B (PNG) | Help row question mark icon | `ProfileScreen` only |
| `src/assets/profile/account/icon-statements.png` | `ProfileScreen` | `7:503` | 52.00 × 52.00 px | Category B (PNG) | Statements and reports document icon | `ProfileScreen` only |
| `src/assets/profile/settings/icon-team.png` | `ProfileScreen02` | `21:47` | 52.00 × 52.00 px | Category B (PNG) | Team members and payment approvals icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-security.png` | `ProfileScreen02` | `21:42` | 52.00 × 52.00 px | Category B (PNG) | Security and privacy shield icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-notifications.png` | `ProfileScreen02` | `21:37` | 52.00 × 52.00 px | Category B (PNG) | Notifications bell icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-payment-methods.png` | `ProfileScreen02` | `21:32` | 52.00 × 52.00 px | Category B (PNG) | Payment methods bank icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-limits.png` | `ProfileScreen02` | `21:27` | 52.00 × 52.00 px | Category B (PNG) | Limits gauge icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-language.png` | `ProfileScreen02` | `21:22` | 52.00 × 52.00 px | Category B (PNG) | Language and appearance contrast icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-personal.png` | `ProfileScreen02` | `21:17` | 52.00 × 52.00 px | Category B (PNG) | Personal details user avatar icon | `ProfileScreen02` only |
| `src/assets/profile/settings/icon-business.png` | `ProfileScreen02` | `21:12` | 52.00 × 26.00 px | Category B (PNG) | Business details building icon (viewport bottom) | `ProfileScreen02` only |
| `src/assets/profile/actions/icon-referrals.png` | `ProfileScreen03` | `21:99` | 52.00 × 52.00 px | Category B (PNG) | Referrals users group icon | `ProfileScreen03` only |
| `src/assets/profile/actions/icon-agreements.png` | `ProfileScreen03` | `21:94` | 52.00 × 52.00 px | Category B (PNG) | Our agreements info icon | `ProfileScreen03` only |
| `src/assets/profile/actions/icon-rate.png` | `ProfileScreen03` | `21:90` | 52.00 × 52.00 px | Category B (PNG) | Rate us star icon | `ProfileScreen03` only |
| `src/assets/profile/actions/icon-close.png` | `ProfileScreen03` | `21:85` | 52.00 × 52.00 px | Category B (PNG) | Close account circle-X icon | `ProfileScreen03` only |
| `src/assets/profile/actions/icon-logout.png` | `ProfileScreen03` | `21:80` | 52.00 × 52.00 px | Category B (PNG) | Log out exit icon | `ProfileScreen03` only |

---

## Verification Against Existing Home Assets
- **Right Chevron**: Home contains a right chevron at `src/assets/home/shared/chevron-right.png` (Node `72:1726`), with dimensions of `8.43 × 15.65 px`. Profile rows use a distinct chevron specification of `7.04 × 13.00 px` (Node `7:515`). Rather than reusing an incompatible dimension, Profile retains its own exact chevron asset (`src/assets/profile/shared/chevron-right.png`).
- **No Home Asset Alterations**: No files within `src/assets/home/` were modified or deleted.
