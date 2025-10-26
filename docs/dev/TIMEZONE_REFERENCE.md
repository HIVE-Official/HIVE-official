# Timezone Policy and Helpers (UB)

Purpose
- Provide a single reference for how HIVE formats times, keyed by campus.
- We follow Option A: always display event times in the campus timezone, with a short zone hint (e.g., ET).

Policy
- Campus → IANA time zone mapping owned by the server. Default is `America/New_York`.
- UI formats dates using the campus timezone via `Intl.DateTimeFormat` (no extra libs).
- Hint with a short zone label (ET for `America/New_York`).

Server (campus mapping)
- File: `apps/web/src/server/campus/timezone.ts:1`
- API: `campusTimeZone(campusId?: string) => string`
- UB default: `America/New_York`.

UI Helpers (formatting)
- File: `packages/ui/src/utils/timezone.ts:1`
- APIs:
  - `formatInTimeZone(date, tz, options)` → `string`
  - `formatEventRangeInTimeZone(start, end, tz)` → `string`
  - `tzAbbrev(tz)` → `ET | undefined`
  - `formatWithAbbrev(date, tz, options)` → `string` (e.g., `Oct 22, 6:00 PM ET`)
  - `formatEventRangeWithAbbrev(start, end, tz)` → `string` (e.g., `Wed, Oct 22, 6:00 PM – 7:00 PM ET`)

Usage Example (Event Detail)
```ts
import { campusTimeZone } from "apps/web/src/server/campus/timezone"; // server side
import { formatEventRangeWithAbbrev } from "@hive/ui/utils/timezone";    // client side

const tz = campusTimeZone(space.campusId);
const label = formatEventRangeWithAbbrev(event.startAt, event.endAt, tz);
```

Notes
- If rendering on the client without the server helper, pass `"America/New_York"` directly until the campus ID is available.
- For remote viewers, Option B (viewer timezone) can be considered later; we’ll still append the campus hint to reduce confusion.
- If adding more campuses, extend `CAMPUS_TIMEZONES` in `apps/web/src/server/campus/timezone.ts`.

