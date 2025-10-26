# HiveLab Canvas Shell & Navigation — BDD Scenarios

Source specs: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` (§1 IA, §4 Left Rail)  
Scope: Navigation surfaces for HiveLab Canvas on desktop. Anchor student value for University at Buffalo leaders running their Spaces safely.

## Scenario 1 — UB Robotics leader lands on Canvas with the right Space context

**Given** Jordan is the Robotics Club lead at University at Buffalo and is signed in  
**And** Jordan has authoring access to the Robotics and Engineering Living-Learning Spaces  
**When** Jordan visits `/lab` during planning hour  
**Then** HiveLab routes to `/lab/space-robotics` and renders the Canvas shell (Left Rail · Center · Right Dock)  
**And** the Left Rail highlights System tiles followed by the Robotics tools list (`docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` §1, §4)  
**And** the Center column defaults to Tool Home for the most recently edited Robotics tool  
**So that** Jordan can immediately continue preparing tools for the Robotics Space without re-picking context.

## Scenario 2 — UB Orientation mentor switches Spaces safely

**Given** Casey co-leads UB Orientation and UB Welcome Crew Spaces with different confidentiality needs  
**And** Casey is editing a limited-run tool in UB Orientation that auto-expires in 9 days  
**When** Casey opens the Space picker overlay from the Canvas shell header  
**Then** the picker lists only Spaces where Casey is a leader, sorted by recent activity (`docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` §1)  
**And** selecting UB Welcome Crew swaps the Left Rail to that Space’s tool roster while preserving overlays or unsaved Canvas work  
**So that** Casey avoids cross-posting sensitive Orientation tools into the wrong Space.

## Scenario 3 — Safety handoff keeps Join/Chat accessible while authoring

**Given** Priya is finalizing a Safety Check-In tool for the UB Nightlife Safety Space  
**And** Priya needs to respond quickly if a member escalates via Join/Chat  
**When** Priya works inside `/lab/space-safety/tools/check-in/edit`  
**Then** the Left Rail’s System section always exposes Events • Join/Chat • About with live/idle badges (`docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` §4)  
**And** clicking Join/Chat opens the Space surface in a new tab without disrupting Canvas state  
**So that** Priya can keep students safe while iterating on the Safety tool.

---

## Shell & Navigation Data Contract

Goal: provide a single serialized payload to hydrate the Canvas shell client-side once leader authentication succeeds.

| Field | Description | Source spec / dependency |
| ----- | ----------- | ------------------------ |
| `space` | `{ id, name, avatar, campusId, isDefault }` for current context. Secondary spaces for picker sorted by recent activity. | `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` §1 |
| `systemTiles` | Static array `[{ id: "events" \| "chat" \| "about", state: "live" \| "idle" }]` with optional `extendsLabel`. | §4 Left Rail; requires live status feed from Spaces service. |
| `tools` | List sorted Live → recently used (48h) → A–Z with placement markers (`start`, `live`, `board`, `manage`), visibility chip (Live / Idle / ⏳). | §4 Left Rail; blocked on `Serializer contracts for Tool Home/Manage` (`TODO.md` “Serializer contracts ...”). |
| `drafts` | Count + CTA link to Drafts overlay. | Spec §1 overlays. |
| `overlays` | Flags: `libraryOpen`, `runTestOpen`, `publishOpen`, `lintOpen`, `replacePickerOpen`. | Spec §1 overlays; uses query-param hydration per TODO `Overlay routing flags`. |
| `permissions` | `canSwitchSpaces`, `canPublish`, `countdownVisible` booleans per leader. | Spec §1; relies on Tool permissions service and Firestore rules (already complete per `firestore.rules:135`). |
| `telemetryContext` | Shared context `{ spaceId, leaderId, surface: "canvas_shell" }` for `publish_*`, `run_test_click`, `tile_*`, `future.*`. | Tool telemetry sink (`packages/core/src/application/tools/ports/tool-telemetry.port.ts`). |
| `activeTool` | Tool Home/Manage contract (see below) for the selected tool; optional when Canvas loads without a selection. | Spec §1 center column; blocked on serializer contract work.

### Tool Home / Manage contract (center column)

`activeTool` surfaces the Manage view within the Canvas shell. Map to existing `ToolSnapshot` fields and identify gaps before we freeze UI payload.

| Section | Required fields | Current source | Gaps |
| ------- | --------------- | -------------- | ---- |
| Header | `{ title, description, icon, versionLabel, lastSavedAt }` | `ToolSnapshot` (`name`, `description`, `icon`, `version`, `updatedAt`) | Need formatted `versionLabel` (e.g., `v3` or `draft`) and friendly “Saved · {ago}” string. |
| Health banner | Run Test freshness, health (`looks_good | heads_up | fix_required`), blocking count, link to Run Test overlay | `ToolSnapshot.lastTest` (`health`, `blockingIssueCount`, `lastRunAt`) | Need derived `isStale` (lastRunAt >10m) and CTA label per spec. |
| Metrics cards | Projected completions, completion rate, expected board posts/live interactions (Run Test report) | `RunTestReport.results` from `/test` route | Need cached summary on snapshot or join with last Run Test report storage. |
| Ghost roster & Fast-forward | Mirror Run Test results for quick glance | `RunTestReport.ghostRoster`, `fastForward` | Persist latest report in repository or accessible via new `tool.lastRunTestReport`. |
| Countdown panel | Limited run countdown (leaders-only) | `ToolSnapshot.limitedRunEndsAt` + countdown util in `serializeTool` | Need leader gating in serializer and reason strings (“Limited run • 9 days left”). |
| Placements & badges | `placements.start/live/board/calendar`, `dock`, `audience`, `hasPII`, `attachedEventId` summary | `ToolSnapshot.authoring` + runtime inference | Need serializer to map to UI-friendly glyph data and include `boardMode` string. |
| Deployments table | `deployedTo`, `deploymentPins`, campus filters, toolContext parity | `ToolSnapshot.deployedTo`, `deploymentPins` | Need human-readable names (Space service) + flagged mismatches. |
| Actions | `canRunTest`, `canPublish`, `canDeploy`, `requiresApproval`, countdown gating | `ToolSnapshot.permissions`, `ToolSnapshot.lastTest`, telemetry context | Need consolidated gating logic (publish disabled when stale/blocks) and `requiresApproval` copy. |
| Lints summary | Count by severity + first three issues (with autofix summary) | `ToolSnapshot.authoringIssues` | Need severity grouping + `autofix.label`. |
| Export links | `/api/lab/spaces/:spaceId/tools/:id/export`, results download | TBD future endpoints | Stub until export story ready (`TODO.md` future bullet). |

### Backend prerequisites

- **Serializer contracts** (TODO.md “Serializer contracts for Tool Home/Manage”) must expose `tools` and `systemTiles` view models.  
- **Space picker API**: Replace picker endpoint for >8 tools (TODO.md “Replace picker API...”) populates `drafts` CTA and reorder tokens.  
- **Future endpoints**: Support/request/follow (TODO.md “Future endpoints...”) feed `telemetryContext` and Future tiles badge counts.  
- **Indexes**: Lab collections + event attach queries (TODO.md “Indexes for lab collections...”) ensure shell loads under 200 ms.  
- **Telemetry coverage**: Add integration tests for `tile_*`, `settings.change/*`, `future.*` before wiring UI (TODO.md “Vitest coverage...”).  
- **Docs**: Update `docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md` once contracts finalize.
