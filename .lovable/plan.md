

## Add new Solapur businesses to the demo dataset

I'll merge the 20 businesses you provided into the existing demo dataset (`src/data/businesses.ts`) so they appear across the homepage (Featured, Famous in Solapur, Trending, Offers, search, categories).

### Mapping your fields to the existing `Business` schema

The existing `Business` type has more fields than your list. I'll map/fill as follows:

| Your field | Maps to | Notes |
|---|---|---|
| `name` | `name` | — |
| `category` | `category` | Lowercased id: Restaurant→`restaurants`, Salon→`salons`, Cafe→`restaurants` (closest existing category), Gym→`fitness`, Pharmacy→`medical`, Clothing→new `clothing` category |
| `location` | `area` | Area portion only (e.g. "Railway Lines") |
| `address` | `address` | — |
| `rating` | `rating` | — |
| `views` | `views` | — |
| `contacts` | `reviewCount` | Used as proxy (no contacts field exists) |
| `popular` | — | Popularity already derives from `views >= 3000`; kept as-is. Your values (70–140) won't trigger the badge — see note below. |
| `verified` | `isFeatured` | `verified: true` → featured |
| `offer` | `offers` | Empty string → omitted |
| `status` | `openHours` | "Open" → "Open Now", "Closed" → "Currently Closed" |
| `image` | `image` | Replaced with stable Unsplash URLs (source.unsplash.com random URLs break caching/layout) |

Auto-filled fields: `id` (sequential "11"–"30"), `description` (short generated line per business), `phone`/`whatsapp` (placeholder +91 numbers), `mapUrl` (Google Maps query with address).

### New category: Clothing

Add `{ id: "clothing", name: "Clothing", icon: "👕", count: 2 }` to the `categories` array so the two clothing listings have a valid category tile.

### Views note

Your `views` values (65–140) are far below the existing demo range (1800–5200) and the 3000-view "Popular in Solapur" threshold. I'll **scale them up** (multiply by ~30) so they sit naturally alongside existing data and your `popular: true` items actually show the badge. Ratings, names, offers, and other fields stay exactly as you provided.

### File changes

- **`src/data/businesses.ts`** — append 20 new entries to the `businesses` array; add `clothing` to `categories`.

That's the only file change needed — all homepage sections read from this array and will pick up the new entries automatically.

### Out of scope

- Not inserting into the Supabase `businesses` table (that's for vendor-added listings). These remain demo data.
- Not changing any UI components.

