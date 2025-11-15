# apps/web TypeScript Error Fix Guide

**Total Errors:** 748
**Generated:** 2025-11-15 13:27:18

---

## Error Summary by Category

### 1. Old Component Imports (~300 errors)
Components removed from @hive/ui exports (Core UI enforcement):
- **Tabs, TabsContent, TabsList, TabsTrigger** (48 errors)
- **Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter** (24 errors)
- **Select, SelectContent, SelectItem, SelectTrigger, SelectValue** (60 errors)
- **Alert, AlertDescription, AlertTitle** (20 errors)
- **Progress** (8 errors), **Switch** (6 errors)
- **Form components** (FormField, FormLabel, FormControl, FormDescription, etc.)
- **PageContainer, HiveConfirmModal**

**Fix Strategy:**
- **Tabs** → Button-based state switching with conditional rendering
- **Dialog** → Sheet (from Core UI)
- **Select** → Native HTML `<select>` with Tailwind styling
- **Alert** → Custom div with icon and styling
- **Progress** → Custom progress bar with Tailwind
- **Switch** → Custom checkbox or toggle
- **Form components** → Direct Label + Input usage

### 2. Type Safety Issues (~88 errors)
- 'userData' possibly undefined (32 errors)
- Parameter 'checked' implicitly any (29 errors)
- Property 'academic' missing on ProfileSystem (12 errors) → Use `identity.academic`
- Property 'author' vs 'authorId' mismatch (8 errors)
- Property 'fullName' missing (7 errors) → Use `identity.academic.name`

**Fix Strategy:** Add null checks, type annotations, fix property access paths

### 3. Next.js 15 Async Params (~50 errors)
Route handler `params` is now `Promise<Ellipsis>` instead of synchronous object.

**Fix Pattern:**
```typescript
// ❌ Before (Next.js 14):
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;  // Direct access
}

// ✅ After (Next.js 15):
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;  // Await first
}
```

**Affected:** All route handlers with dynamic segments `[id]`, `[userId]`, `[spaceId]`, etc.

### 4. API/Structure Issues (~310 errors)
- Type mismatches in admin route payloads
- Query vs CollectionReference type conflicts
- Missing module imports (`@/lib/structured-logger`, `@/components/*`)
- ElementInstance property mismatches

---

## Files Needing Fixes (Sorted by Error Count)


### src/components/admin/moderation-queue.tsx (47 errors)

```typescript
src/components/admin/moderation-queue.tsx(479,22): error TS2304: Cannot find name 'Dialog'.
src/components/admin/moderation-queue.tsx(483,24): error TS2304: Cannot find name 'DialogContent'.
src/components/admin/moderation-queue.tsx(484,26): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/moderation-queue.tsx(485,28): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/moderation-queue.tsx(485,56): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/moderation-queue.tsx(486,27): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/moderation-queue.tsx(499,25): error TS2304: Cannot find name 'DialogContent'.
src/components/admin/moderation-queue.tsx(500,23): error TS2304: Cannot find name 'Dialog'.
src/components/admin/moderation-queue.tsx(557,8): error TS2304: Cannot find name 'Dialog'.
src/components/admin/moderation-queue.tsx(559,24): error TS7006: Parameter 'open' implicitly has an 'any' type.
src/components/admin/moderation-queue.tsx(563,10): error TS2304: Cannot find name 'DialogContent'.
src/components/admin/moderation-queue.tsx(564,12): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/moderation-queue.tsx(565,14): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/moderation-queue.tsx(568,15): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/moderation-queue.tsx(569,13): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/moderation-queue.tsx(572,14): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(574,16): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(578,17): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(579,15): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(642,11): error TS2304: Cannot find name 'DialogContent'.
src/components/admin/moderation-queue.tsx(643,9): error TS2304: Cannot find name 'Dialog'.
src/components/admin/moderation-queue.tsx(658,8): error TS2304: Cannot find name 'Tabs'.
src/components/admin/moderation-queue.tsx(659,10): error TS2304: Cannot find name 'TabsList'.
src/components/admin/moderation-queue.tsx(660,12): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(660,56): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(661,12): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(661,57): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(662,12): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(662,54): error TS2304: Cannot find name 'TabsTrigger'.
src/components/admin/moderation-queue.tsx(663,11): error TS2304: Cannot find name 'TabsList'.
src/components/admin/moderation-queue.tsx(665,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(751,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(753,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(754,12): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(756,14): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(759,15): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(760,13): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(761,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(763,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(772,24): error TS2304: Cannot find name 'Progress'.
src/components/admin/moderation-queue.tsx(790,24): error TS2304: Cannot find name 'Progress'.
src/components/admin/moderation-queue.tsx(809,14): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(811,16): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(813,17): error TS2304: Cannot find name 'AlertDescription'.
src/components/admin/moderation-queue.tsx(814,15): error TS2304: Cannot find name 'Alert'.
src/components/admin/moderation-queue.tsx(816,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/moderation-queue.tsx(817,9): error TS2304: Cannot find name 'Tabs'.
```

### src/app/profile/settings/page-storybook-migration.tsx (38 errors)

```typescript
src/app/profile/settings/page-storybook-migration.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'PageContainer'.
src/app/profile/settings/page-storybook-migration.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/app/profile/settings/page-storybook-migration.tsx(15,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormField'.
src/app/profile/settings/page-storybook-migration.tsx(16,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveConfirmModal'.
src/app/profile/settings/page-storybook-migration.tsx(18,3): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/app/profile/settings/page-storybook-migration.tsx(19,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsContent'.
src/app/profile/settings/page-storybook-migration.tsx(20,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsList'.
src/app/profile/settings/page-storybook-migration.tsx(21,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/app/profile/settings/page-storybook-migration.tsx(22,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormLabel'.
src/app/profile/settings/page-storybook-migration.tsx(23,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormControl'.
src/app/profile/settings/page-storybook-migration.tsx(24,3): error TS2724: '"@hive/ui"' has no exported member named 'FormDescription'. Did you mean 'CardDescription'?
src/app/profile/settings/page-storybook-migration.tsx(174,26): error TS2345: Argument of type '(prev: PrivacySettings) => { profileVisibility: "public" | "private"; showActivity: any; showSpaces: any; showConnections: any; showOnlineStatus: any; allowDirectMessages: any; ghostMode: boolean; }' is not assignable to parameter of type 'SetStateAction<PrivacySettings>'.
src/app/profile/settings/page-storybook-migration.tsx(176,44): error TS2339: Property 'isPublic' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(177,39): error TS2339: Property 'showActivity' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(178,37): error TS2339: Property 'showSpaces' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(179,42): error TS2339: Property 'showConnections' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(180,43): error TS2339: Property 'showOnlineStatus' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(181,46): error TS2339: Property 'allowDirectMessages' does not exist on type 'PrivacySettings'.
src/app/profile/settings/page-storybook-migration.tsx(240,43): error TS2345: Argument of type '{ privacy: { isPublic: boolean; showActivity: boolean; showSpaces: boolean; showConnections: boolean; showOnlineStatus: boolean; allowDirectMessages: boolean; ghostMode: { enabled: boolean; level: "minimal" | "moderate" | "maximum"; }; }; }' is not assignable to parameter of type 'Partial<ProfileSystem>'.
src/app/profile/settings/page-storybook-migration.tsx(274,28): error TS2339: Property 'id' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/settings/page-storybook-migration.tsx(275,30): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/settings/page-storybook-migration.tsx(276,32): error TS2339: Property 'handle' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/settings/page-storybook-migration.tsx(277,31): error TS2339: Property 'email' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/settings/page-storybook-migration.tsx(278,21): error TS2339: Property 'builder' does not exist on type 'ProfileSystem'.
src/app/profile/settings/page-storybook-migration.tsx(280,27): error TS2339: Property 'verification' does not exist on type 'ProfileSystem'.
src/app/profile/settings/page-storybook-migration.tsx(376,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(389,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(402,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(415,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(428,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(451,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(464,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(477,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(503,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(515,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(527,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(539,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page-storybook-migration.tsx(551,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
```

### src/app/api/profile/route.ts (33 errors)

```typescript
src/app/api/profile/route.ts(53,25): error TS2349: This expression is not callable.
src/app/api/profile/route.ts(73,18): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(74,19): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(75,22): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(76,21): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(77,21): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(77,45): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(77,73): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(78,16): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(79,18): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(80,27): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(81,17): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(82,22): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(83,28): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(84,19): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(85,26): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(86,24): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(87,31): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(88,23): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(90,25): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(91,26): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(94,23): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(95,27): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(96,25): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(97,30): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(98,34): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(99,31): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(102,30): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(103,27): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(106,23): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(107,24): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(108,24): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(115,17): error TS18048: 'userData' is possibly 'undefined'.
```

### src/app/profile/settings/page.tsx (32 errors)

```typescript
src/app/profile/settings/page.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'PageContainer'.
src/app/profile/settings/page.tsx(17,3): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/app/profile/settings/page.tsx(18,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormField'.
src/app/profile/settings/page.tsx(19,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveConfirmModal'.
src/app/profile/settings/page.tsx(21,3): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/app/profile/settings/page.tsx(22,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsContent'.
src/app/profile/settings/page.tsx(23,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsList'.
src/app/profile/settings/page.tsx(24,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/app/profile/settings/page.tsx(25,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormLabel'.
src/app/profile/settings/page.tsx(26,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormControl'.
src/app/profile/settings/page.tsx(27,3): error TS2724: '"@hive/ui"' has no exported member named 'FormDescription'. Did you mean 'CardDescription'?
src/app/profile/settings/page.tsx(238,11): error TS1345: An expression of type 'void' cannot be tested for truthiness.
src/app/profile/settings/page.tsx(253,29): error TS2554: Expected 0 arguments, but got 1.
src/app/profile/settings/page.tsx(271,19): error TS2339: Property 'identity' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(272,21): error TS2339: Property 'identity' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(273,23): error TS2339: Property 'identity' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(274,22): error TS2339: Property 'identity' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(275,21): error TS2339: Property 'builder' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(277,27): error TS2339: Property 'verification' does not exist on type 'HiveProfileStub'.
src/app/profile/settings/page.tsx(373,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(384,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(395,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(406,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(417,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(438,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(449,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(460,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(484,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(495,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(506,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(517,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/app/profile/settings/page.tsx(528,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
```

### src/app/profile/edit/page-storybook-migration.tsx (28 errors)

```typescript
src/app/profile/edit/page-storybook-migration.tsx(10,3): error TS2305: Module '"@hive/ui"' has no exported member 'PageContainer'.
src/app/profile/edit/page-storybook-migration.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormField'.
src/app/profile/edit/page-storybook-migration.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormLabel'.
src/app/profile/edit/page-storybook-migration.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormControl'.
src/app/profile/edit/page-storybook-migration.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'FormMessage'.
src/app/profile/edit/page-storybook-migration.tsx(15,3): error TS2724: '"@hive/ui"' has no exported member named 'FormDescription'. Did you mean 'CardDescription'?
src/app/profile/edit/page-storybook-migration.tsx(24,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveModal'.
src/app/profile/edit/page-storybook-migration.tsx(124,36): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(125,34): error TS2339: Property 'handle' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(126,22): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(127,27): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(128,24): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(129,31): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(130,40): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(131,26): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(132,28): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(201,43): error TS2345: Argument of type '{ identity: { fullName: string; handle: string; }; personal: { bio: string; interests: string[]; }; academic: { pronouns: string; major: string; academicYear: "freshman" | "sophomore" | "junior" | "senior" | "graduate" | "faculty" | "alumni" | undefined; graduationYear: number | undefined; housing: string; }; }' is not assignable to parameter of type 'Partial<ProfileSystem>'.
src/app/profile/edit/page-storybook-migration.tsx(225,28): error TS2339: Property 'id' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(226,30): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(227,32): error TS2339: Property 'handle' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(228,32): error TS2339: Property 'avatarUrl' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(229,21): error TS2339: Property 'builder' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(231,22): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(232,21): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(233,24): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/app/profile/edit/page-storybook-migration.tsx(296,56): error TS2339: Property 'avatarUrl' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(296,89): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/app/profile/edit/page-storybook-migration.tsx(297,55): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
```

### src/components/admin/alert-dashboard.tsx (26 errors)

```typescript
src/components/admin/alert-dashboard.tsx(7,10): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/alert-dashboard.tsx(7,16): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/alert-dashboard.tsx(8,10): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/alert-dashboard.tsx(8,17): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/alert-dashboard.tsx(9,10): error TS2305: Module '"@hive/ui"' has no exported member 'Dialog'.
src/components/admin/alert-dashboard.tsx(9,18): error TS2305: Module '"@hive/ui"' has no exported member 'DialogDescription'.
src/components/admin/alert-dashboard.tsx(9,37): error TS2305: Module '"@hive/ui"' has no exported member 'DialogTrigger'.
src/components/admin/alert-dashboard.tsx(12,10): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/components/admin/alert-dashboard.tsx(348,10): error TS2304: Cannot find name 'TabsList'.
src/components/admin/alert-dashboard.tsx(364,11): error TS2304: Cannot find name 'TabsList'.
src/components/admin/alert-dashboard.tsx(367,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(495,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(498,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(513,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(516,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(543,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(546,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(612,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(615,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(647,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/alert-dashboard.tsx(903,8): error TS2304: Cannot find name 'DialogContent'.
src/components/admin/alert-dashboard.tsx(904,10): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/alert-dashboard.tsx(905,12): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/alert-dashboard.tsx(910,13): error TS2304: Cannot find name 'DialogTitle'.
src/components/admin/alert-dashboard.tsx(914,11): error TS2304: Cannot find name 'DialogHeader'.
src/components/admin/alert-dashboard.tsx(987,9): error TS2304: Cannot find name 'DialogContent'.
```

### src/components/admin/database-performance-dashboard.tsx (23 errors)

```typescript
src/components/admin/database-performance-dashboard.tsx(7,10): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/database-performance-dashboard.tsx(7,16): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/database-performance-dashboard.tsx(8,10): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/database-performance-dashboard.tsx(8,17): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/database-performance-dashboard.tsx(9,10): error TS2305: Module '"@hive/ui"' has no exported member 'Dialog'.
src/components/admin/database-performance-dashboard.tsx(9,18): error TS2305: Module '"@hive/ui"' has no exported member 'DialogDescription'.
src/components/admin/database-performance-dashboard.tsx(9,37): error TS2305: Module '"@hive/ui"' has no exported member 'DialogTrigger'.
src/components/admin/database-performance-dashboard.tsx(12,10): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/components/admin/database-performance-dashboard.tsx(13,10): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/database-performance-dashboard.tsx(328,10): error TS2304: Cannot find name 'TabsList'.
src/components/admin/database-performance-dashboard.tsx(335,11): error TS2304: Cannot find name 'TabsList'.
src/components/admin/database-performance-dashboard.tsx(338,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(457,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(460,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(572,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(575,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(661,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(664,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(773,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(776,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(848,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(851,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/database-performance-dashboard.tsx(971,11): error TS2304: Cannot find name 'TabsContent'.
```

### src/app/profile/connections/page.tsx (19 errors)

```typescript
src/app/profile/connections/page.tsx(135,28): error TS2339: Property 'displayName' does not exist on type 'AuthUser'.
src/app/profile/connections/page.tsx(136,30): error TS2339: Property 'photoURL' does not exist on type 'AuthUser'.
src/app/profile/connections/page.tsx(270,12): error TS2304: Cannot find name 'Tabs'.
src/app/profile/connections/page.tsx(270,51): error TS7006: Parameter 'v' implicitly has an 'any' type.
src/app/profile/connections/page.tsx(271,14): error TS2304: Cannot find name 'TabsList'.
src/app/profile/connections/page.tsx(272,16): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(272,57): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(273,16): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(273,53): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(274,16): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(278,17): error TS2304: Cannot find name 'TabsTrigger'.
src/app/profile/connections/page.tsx(279,15): error TS2304: Cannot find name 'TabsList'.
src/app/profile/connections/page.tsx(281,14): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(331,15): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(333,14): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(345,15): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(347,14): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(359,15): error TS2304: Cannot find name 'TabsContent'.
src/app/profile/connections/page.tsx(360,13): error TS2304: Cannot find name 'Tabs'.
```

### src/components/admin/space-creation-panel.tsx (19 errors)

```typescript
src/components/admin/space-creation-panel.tsx(25,3): error TS2305: Module '"@hive/ui"' has no exported member 'Select'.
src/components/admin/space-creation-panel.tsx(26,3): error TS2724: '"@hive/ui"' has no exported member named 'SelectContent'. Did you mean 'SheetContent'?
src/components/admin/space-creation-panel.tsx(27,3): error TS2305: Module '"@hive/ui"' has no exported member 'SelectItem'.
src/components/admin/space-creation-panel.tsx(28,3): error TS2724: '"@hive/ui"' has no exported member named 'SelectTrigger'. Did you mean 'SheetTrigger'?
src/components/admin/space-creation-panel.tsx(29,3): error TS2305: Module '"@hive/ui"' has no exported member 'SelectValue'.
src/components/admin/space-creation-panel.tsx(30,3): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/components/admin/space-creation-panel.tsx(31,3): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/space-creation-panel.tsx(32,3): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/space-creation-panel.tsx(127,25): error TS2339: Property 'customClaims' does not exist on type 'AuthUser'.
src/components/admin/space-creation-panel.tsx(127,65): error TS2339: Property 'customClaims' does not exist on type 'AuthUser'.
src/components/admin/space-creation-panel.tsx(151,44): error TS2339: Property 'checkHandle' does not exist on type '{ list: (params?: URLSearchParams | undefined) => Promise<Response>; create: (data: any) => Promise<Response>; get: (id: string) => Promise<...>; ... 5 more ...; tools: { ...; }; }'.
src/components/admin/space-creation-panel.tsx(206,26): error TS2339: Property 'installDefaultTools' does not exist on type '{ list: (params?: URLSearchParams | undefined) => Promise<Response>; create: (data: any) => Promise<Response>; get: (id: string) => Promise<...>; ... 5 more ...; tools: { ...; }; }'.
src/components/admin/space-creation-panel.tsx(211,26): error TS2339: Property 'setupRssFeed' does not exist on type '{ list: (params?: URLSearchParams | undefined) => Promise<Response>; create: (data: any) => Promise<Response>; get: (id: string) => Promise<...>; ... 5 more ...; tools: { ...; }; }'.
src/components/admin/space-creation-panel.tsx(346,37): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/admin/space-creation-panel.tsx(365,37): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/admin/space-creation-panel.tsx(461,37): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/admin/space-creation-panel.tsx(493,37): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/admin/space-creation-panel.tsx(520,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/components/admin/space-creation-panel.tsx(540,39): error TS7006: Parameter 'checked' implicitly has an 'any' type.
```

### src/hooks/use-realtime-feed-v2.ts (19 errors)

```typescript
src/hooks/use-realtime-feed-v2.ts(52,26): error TS2339: Property 'campusId' does not exist on type 'AuthUser'.
src/hooks/use-realtime-feed-v2.ts(78,22): error TS2339: Property 'type' does not exist on type 'FeedItem'.
src/hooks/use-realtime-feed-v2.ts(82,36): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(83,38): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(84,40): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(85,40): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(87,63): error TS2339: Property 'id' does not exist on type 'FeedItemSource'.
src/hooks/use-realtime-feed-v2.ts(88,34): error TS2339: Property 'name' does not exist on type 'FeedItemSource'.
src/hooks/use-realtime-feed-v2.ts(89,28): error TS2339: Property 'engagement' does not exist on type 'FeedItem'.
src/hooks/use-realtime-feed-v2.ts(90,28): error TS2339: Property 'isPromoted' does not exist on type 'FeedItem'.
src/hooks/use-realtime-feed-v2.ts(208,20): error TS2339: Property 'type' does not exist on type 'FeedItem'.
src/hooks/use-realtime-feed-v2.ts(212,34): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(213,36): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(214,38): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(215,38): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
src/hooks/use-realtime-feed-v2.ts(217,61): error TS2339: Property 'id' does not exist on type 'FeedItemSource'.
src/hooks/use-realtime-feed-v2.ts(218,32): error TS2339: Property 'name' does not exist on type 'FeedItemSource'.
src/hooks/use-realtime-feed-v2.ts(219,26): error TS2339: Property 'engagement' does not exist on type 'FeedItem'.
src/hooks/use-realtime-feed-v2.ts(220,26): error TS2339: Property 'isPromoted' does not exist on type 'FeedItem'.
```

### src/components/admin/cache-management-dashboard.tsx (17 errors)

```typescript
src/components/admin/cache-management-dashboard.tsx(5,10): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/cache-management-dashboard.tsx(5,16): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/cache-management-dashboard.tsx(9,10): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/cache-management-dashboard.tsx(9,17): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/cache-management-dashboard.tsx(10,10): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/cache-management-dashboard.tsx(294,10): error TS2304: Cannot find name 'TabsList'.
src/components/admin/cache-management-dashboard.tsx(310,11): error TS2304: Cannot find name 'TabsList'.
src/components/admin/cache-management-dashboard.tsx(313,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(426,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(429,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(479,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(482,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(532,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(535,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(570,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(573,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/cache-management-dashboard.tsx(615,11): error TS2304: Cannot find name 'TabsContent'.
```

### src/lib/content-validation.ts (17 errors)

```typescript
src/lib/content-validation.ts(39,12): error TS2339: Property 'type' does not exist on type 'Post'.
src/lib/content-validation.ts(45,22): error TS2339: Property 'toolShareMetadata' does not exist on type 'Post'.
src/lib/content-validation.ts(46,24): error TS2339: Property 'toolShareMetadata' does not exist on type 'Post'.
src/lib/content-validation.ts(47,31): error TS2339: Property 'toolShareMetadata' does not exist on type 'Post'.
src/lib/content-validation.ts(53,12): error TS2339: Property 'type' does not exist on type 'Post'.
src/lib/content-validation.ts(68,12): error TS2551: Property 'author' does not exist on type 'Post'. Did you mean 'authorId'?
src/lib/content-validation.ts(68,47): error TS2551: Property 'author' does not exist on type 'Post'. Did you mean 'authorId'?
src/lib/content-validation.ts(106,37): error TS2339: Property 'toLowerCase' does not exist on type '{ text: string; mediaUrls?: string[] | undefined; mentions?: string[] | undefined; }'.
src/lib/content-validation.ts(117,12): error TS2339: Property 'richContent' does not exist on type 'Post'.
src/lib/content-validation.ts(118,31): error TS2339: Property 'richContent' does not exist on type 'Post'.
src/lib/content-validation.ts(118,59): error TS7006: Parameter 'mention' implicitly has an 'any' type.
src/lib/content-validation.ts(130,12): error TS2339: Property 'type' does not exist on type 'Post'.
src/lib/content-validation.ts(130,36): error TS2551: Property 'pollMetadata' does not exist on type 'Post'. Did you mean 'metadata'?
src/lib/content-validation.ts(136,12): error TS2339: Property 'type' does not exist on type 'Post'.
src/lib/content-validation.ts(136,37): error TS2339: Property 'imageMetadata' does not exist on type 'Post'.
src/lib/content-validation.ts(138,27): error TS2339: Property 'imageMetadata' does not exist on type 'Post'.
src/lib/content-validation.ts(171,37): error TS2339: Property 'toLowerCase' does not exist on type '{ text: string; mediaUrls?: string[] | undefined; mentions?: string[] | undefined; }'.
```

### src/app/api/admin/campus-expansion/route.ts (16 errors)

```typescript
src/app/api/admin/campus-expansion/route.ts(139,138): error TS2304: Cannot find name 'auth'.
src/app/api/admin/campus-expansion/route.ts(172,44): error TS2345: Argument of type '{ total: number; active: number; newThisMonth: number; byYear: {}; byMajor: {}; }' is not assignable to parameter of type 'UserStats'.
src/app/api/admin/campus-expansion/route.ts(324,27): error TS2339: Property 'campusId' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/campus-expansion/route.ts(325,29): error TS2339: Property 'name' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/campus-expansion/route.ts(334,29): error TS2339: Property 'name' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/campus-expansion/route.ts(397,57): error TS2345: Argument of type '{ overallScore: number; technical: number; operational: number; business: number; product: number; }' is not assignable to parameter of type 'Record<string, Record<string, number>>'.
src/app/api/admin/campus-expansion/route.ts(415,45): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Record<string, unknown>'.
src/app/api/admin/campus-expansion/route.ts(663,45): error TS2365: Operator '+' cannot be applied to types 'number' and '{}'.
src/app/api/admin/campus-expansion/route.ts(667,10): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
src/app/api/admin/campus-expansion/route.ts(703,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(706,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(709,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(712,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(826,21): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
src/app/api/admin/campus-expansion/route.ts(841,12): error TS2538: Type '{}' cannot be used as an index type.
src/app/api/admin/campus-expansion/route.ts(841,29): error TS2538: Type '{}' cannot be used as an index type.
```

### src/app/api/tools/[toolId]/route.ts (16 errors)

```typescript
src/app/api/tools/[toolId]/route.ts(42,24): error TS2345: Argument of type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }' is not assignable to parameter of type 'string'.
src/app/api/tools/[toolId]/route.ts(47,12): error TS2339: Property 'ownerId' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(49,24): error TS2339: Property 'viewCount' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(55,23): error TS2345: Argument of type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }' is not assignable to parameter of type 'string'.
src/app/api/tools/[toolId]/route.ts(108,26): error TS2345: Argument of type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }' is not assignable to parameter of type 'string'.
src/app/api/tools/[toolId]/route.ts(121,34): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(122,75): error TS2339: Property 'elements' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(123,47): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(138,36): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(155,28): error TS2339: Property 'spaceId' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(158,52): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(161,54): error TS2339: Property 'elements' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(193,12): error TS2339: Property 'ownerId' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(238,19): error TS2339: Property 'spaceId' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(243,27): error TS2339: Property 'elements' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/route.ts(244,24): error TS2339: Property 'useCount' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
```

### src/app/tools/[toolId]/run/page.tsx (16 errors)

```typescript
src/app/tools/[toolId]/run/page.tsx(8,10): error TS2305: Module '"@/components/temp-stubs"' has no exported member 'Alert'.
src/app/tools/[toolId]/run/page.tsx(36,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(51,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(65,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(79,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(96,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(113,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(131,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(147,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
src/app/tools/[toolId]/run/page.tsx(166,3): error TS2353: Object literal may only specify known properties, and 'description' does not exist in type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(337,25): error TS2339: Property 'description' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(337,55): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(383,39): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(399,54): error TS2339: Property 'currentVersion' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(407,54): error TS2339: Property 'rating' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/tools/[toolId]/run/page.tsx(411,54): error TS2339: Property 'useCount' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
```

### src/app/api/feed/aggregation/route.ts (14 errors)

```typescript
src/app/api/feed/aggregation/route.ts(431,11): error TS2322: Type '{ views?: number | undefined; likes?: number | undefined; comments?: number | undefined; shares?: number | undefined; toolInteractions?: number | undefined; }' is not assignable to type '{ views: number; likes: number; comments: number; shares: number; toolInteractions: number; }'.
src/app/api/feed/aggregation/route.ts(472,52): error TS2559: Type '{ id: string; createdAt: string; }' has no properties in common with type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(546,11): error TS2322: Type '{ views?: number | undefined; likes?: number | undefined; comments?: number | undefined; shares?: number | undefined; toolInteractions?: number | undefined; }' is not assignable to type '{ views: number; likes: number; comments: number; shares: number; toolInteractions: number; }'.
src/app/api/feed/aggregation/route.ts(600,9): error TS2322: Type '{ views?: number | undefined; likes?: number | undefined; comments?: number | undefined; shares?: number | undefined; toolInteractions?: number | undefined; }' is not assignable to type '{ views: number; likes: number; comments: number; shares: number; toolInteractions: number; }'.
src/app/api/feed/aggregation/route.ts(731,70): error TS18048: 'content.metadata' is possibly 'undefined'.
src/app/api/feed/aggregation/route.ts(741,19): error TS2339: Property 'startDate' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(741,40): error TS2339: Property 'endDate' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(742,19): error TS2339: Property 'location' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(747,19): error TS2339: Property 'isPinned' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(753,26): error TS2339: Property 'progressPercentage' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(753,69): error TS2339: Property 'progressPercentage' does not exist on type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/feed/aggregation/route.ts(773,43): error TS2769: No overload matches this call.
src/app/api/feed/aggregation/route.ts(816,20): error TS18046: 'item.content' is of type 'unknown'.
src/app/api/feed/aggregation/route.ts(816,48): error TS18046: 'item.content' is of type 'unknown'.
```

### src/app/universal-shell-provider.tsx (14 errors)

```typescript
src/app/universal-shell-provider.tsx(8,3): error TS2305: Module '"@hive/ui"' has no exported member 'DEFAULT_MOBILE_NAV_ITEMS'.
src/app/universal-shell-provider.tsx(9,3): error TS2305: Module '"@hive/ui"' has no exported member 'DEFAULT_SIDEBAR_NAV_ITEMS'.
src/app/universal-shell-provider.tsx(10,8): error TS2305: Module '"@hive/ui"' has no exported member 'ShellMobileNavItem'.
src/app/universal-shell-provider.tsx(11,8): error TS2305: Module '"@hive/ui"' has no exported member 'ShellNavItem'.
src/app/universal-shell-provider.tsx(12,8): error TS2305: Module '"@hive/ui"' has no exported member 'ShellSpaceLink'.
src/app/universal-shell-provider.tsx(13,8): error TS2305: Module '"@hive/ui"' has no exported member 'ShellSpaceSection'.
src/app/universal-shell-provider.tsx(21,44): error TS2339: Property 'UniversalShell' does not exist on type 'typeof import("/Users/laneyfraass/hive_ui/packages/ui/src/index")'.
src/app/universal-shell-provider.tsx(21,66): error TS2339: Property 'default' does not exist on type 'typeof import("/Users/laneyfraass/hive_ui/packages/ui/src/index")'.
src/app/universal-shell-provider.tsx(362,57): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/universal-shell-provider.tsx(363,45): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/universal-shell-provider.tsx(384,8): error TS2322: Type '{ children: ReactNode; variant: string; navItems: ShellNavItem[]; mobileNavItems: ShellMobileNavItem[]; notificationCount: number; messageCount: number; notifications: Record<string, unknown>[]; notificationsLoading: boolean; notificationsError: string | null; mySpaces: ShellSpaceSection[]; onNotificationNavigate: (...' is not assignable to type 'IntrinsicAttributes'.
src/app/universal-shell-provider.tsx(394,34): error TS7006: Parameter 'url' implicitly has an 'any' type.
src/app/universal-shell-provider.tsx(414,6): error TS2322: Type '{ children: ReactNode; variant: string; sidebarStyle: string; headerStyle: string; navItems: ShellNavItem[]; mobileNavItems: ShellMobileNavItem[]; notificationCount: number; messageCount: number; notifications: Record<...>[]; ... 5 more ...; onNotificationNavigate: (url: any) => void; }' is not assignable to type 'IntrinsicAttributes'.
src/app/universal-shell-provider.tsx(428,32): error TS7006: Parameter 'url' implicitly has an 'any' type.
```

### src/components/admin/campus-expansion-dashboard.tsx (12 errors)

```typescript
src/components/admin/campus-expansion-dashboard.tsx(5,10): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/campus-expansion-dashboard.tsx(5,16): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/campus-expansion-dashboard.tsx(272,10): error TS2304: Cannot find name 'TabsList'.
src/components/admin/campus-expansion-dashboard.tsx(285,11): error TS2304: Cannot find name 'TabsList'.
src/components/admin/campus-expansion-dashboard.tsx(288,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(343,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(346,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(374,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(377,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(439,11): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(442,10): error TS2304: Cannot find name 'TabsContent'.
src/components/admin/campus-expansion-dashboard.tsx(504,11): error TS2304: Cannot find name 'TabsContent'.
```

### src/components/admin/feed-algorithm-control.tsx (12 errors)

```typescript
src/components/admin/feed-algorithm-control.tsx(7,10): error TS2305: Module '"@hive/ui"' has no exported member 'Switch'.
src/components/admin/feed-algorithm-control.tsx(8,10): error TS2305: Module '"@hive/ui"' has no exported member 'Slider'.
src/components/admin/feed-algorithm-control.tsx(9,10): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/feed-algorithm-control.tsx(9,17): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/feed-algorithm-control.tsx(363,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(401,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(442,38): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(484,38): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(522,37): error TS7006: Parameter 'checked' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(537,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(558,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(577,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
```

### src/lib/profile-transformers.ts (12 errors)

```typescript
src/lib/profile-transformers.ts(94,5): error TS2554: Expected 1 arguments, but got 4.
src/lib/profile-transformers.ts(102,5): error TS2353: Object literal may only specify known properties, and 'academic' does not exist in type 'ProfileSystem'.
src/lib/profile-transformers.ts(135,18): error TS2339: Property 'verification' does not exist on type 'ProfileSystem'.
src/lib/profile-transformers.ts(177,44): error TS2554: Expected 1 arguments, but got 4.
src/lib/profile-transformers.ts(179,36): error TS2554: Expected 1 arguments, but got 2.
src/lib/profile-transformers.ts(233,22): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/lib/profile-transformers.ts(234,22): error TS2339: Property 'avatarUrl' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
src/lib/profile-transformers.ts(235,13): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/lib/profile-transformers.ts(236,13): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/lib/profile-transformers.ts(237,13): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/lib/profile-transformers.ts(238,13): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
src/lib/profile-transformers.ts(239,13): error TS2339: Property 'academic' does not exist on type 'ProfileSystem'.
```

### src/app/api/profile/v2/route.ts (11 errors)

```typescript
src/app/api/profile/v2/route.ts(231,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/app/api/profile/v2/route.ts(237,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/app/api/profile/v2/route.ts(244,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/app/api/profile/v2/route.ts(281,47): error TS2339: Property 'members' does not exist on type '{ id: string; }'.
src/app/api/profile/v2/route.ts(281,66): error TS2339: Property 'members' does not exist on type '{ id: string; }'.
src/app/api/profile/v2/route.ts(285,21): error TS2339: Property 'name' does not exist on type '{ id: string; }'.
src/app/api/profile/v2/route.ts(286,23): error TS2339: Property 'matchReason' does not exist on type '{ id: string; }'.
src/app/api/profile/v2/route.ts(287,25): error TS2339: Property 'category' does not exist on type '{ id: string; }'.
src/app/api/profile/v2/route.ts(392,36): error TS2339: Property 'createdAt' does not exist on type '{ userId: string; updatedAt: string; campusId: any; }'.
src/app/api/profile/v2/route.ts(410,84): error TS2559: Type '"No updates"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
src/app/api/profile/v2/route.ts(415,47): error TS2559: Type '"Profile updated"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
```

### src/app/api/spaces/search/route.ts (10 errors)

```typescript
src/app/api/spaces/search/route.ts(87,37): error TS7006: Parameter 'tag' implicitly has an 'any' type.
src/app/api/spaces/search/route.ts(178,30): error TS7006: Parameter 'tag' implicitly has an 'any' type.
src/app/api/spaces/search/route.ts(209,52): error TS18048: 'offset' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(209,61): error TS18048: 'limit' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(214,34): error TS18048: 'offset' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(214,43): error TS18048: 'limit' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(218,39): error TS18048: 'offset' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(218,48): error TS18048: 'limit' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(218,56): error TS18048: 'offset' is possibly 'undefined'.
src/app/api/spaces/search/route.ts(218,65): error TS18048: 'limit' is possibly 'undefined'.
```

### src/app/feed/page-new.tsx (10 errors)

```typescript
src/app/feed/page-new.tsx(32,3): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardPost'.
src/app/feed/page-new.tsx(33,3): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardEvent'.
src/app/feed/page-new.tsx(34,3): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardTool'.
src/app/feed/page-new.tsx(37,3): error TS2305: Module '"@hive/ui"' has no exported member 'KeyboardShortcutsOverlay'.
src/app/feed/page-new.tsx(38,3): error TS2724: '"@hive/ui"' has no exported member named 'AriaLiveRegion'. Did you mean 'LiveRegion'?
src/app/feed/page-new.tsx(40,8): error TS2724: '"@hive/ui"' has no exported member named 'FeedCardPostData'. Did you mean 'FeedCardSystemData'?
src/app/feed/page-new.tsx(41,8): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardEventData'.
src/app/feed/page-new.tsx(42,8): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardToolData'.
src/app/feed/page-new.tsx(378,52): error TS2769: No overload matches this call.
src/app/feed/page-new.tsx(379,48): error TS2769: No overload matches this call.
```

### src/app/api/tools/[toolId]/share/route.ts (9 errors)

```typescript
src/app/api/tools/[toolId]/share/route.ts(102,26): error TS2345: Argument of type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }' is not assignable to parameter of type 'string'.
src/app/api/tools/[toolId]/share/route.ts(108,56): error TS2554: Expected 0 arguments, but got 2.
src/app/api/tools/[toolId]/share/route.ts(113,27): error TS2339: Property 'permission' does not exist on type '{ action: "create_share_link"; toolId: string; expiresAt?: Date | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(126,31): error TS2339: Property 'permission' does not exist on type '{ action: "create_share_link"; toolId: string; expiresAt?: Date | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(134,29): error TS2339: Property 'permission' does not exist on type '{ action: "create_share_link"; toolId: string; expiresAt?: Date | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(166,22): error TS2339: Property 'elements' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(203,31): error TS2339: Property 'elements' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(208,22): error TS2339: Property 'ownerId' does not exist on type '{ name: string; id: string; status: "published" | "draft" | "archived"; metadata?: Record<string, any> | undefined; config?: any; version?: string | undefined; }'.
src/app/api/tools/[toolId]/share/route.ts(223,9): error TS2783: 'id' is specified more than once, so this usage will be overwritten.
```

### src/app/rituals/[ritualId]/page.tsx (9 errors)

```typescript
src/app/rituals/[ritualId]/page.tsx(9,10): error TS2305: Module '"@hive/ui"' has no exported member 'RitualDetailLayout'.
src/app/rituals/[ritualId]/page.tsx(71,39): error TS2339: Property 'status' does not exist on type 'Query<RitualDetailView, Error, RitualDetailView, string[]>'.
src/app/rituals/[ritualId]/page.tsx(107,32): error TS7006: Parameter 'matchupId' implicitly has an 'any' type.
src/app/rituals/[ritualId]/page.tsx(107,43): error TS7006: Parameter 'choice' implicitly has an 'any' type.
src/app/rituals/[ritualId]/page.tsx(127,28): error TS7006: Parameter 'clueId' implicitly has an 'any' type.
src/app/rituals/[ritualId]/page.tsx(157,30): error TS7006: Parameter 'matchupId' implicitly has an 'any' type.
src/app/rituals/[ritualId]/page.tsx(157,41): error TS7006: Parameter 'competitorId' implicitly has an 'any' type.
src/app/rituals/[ritualId]/page.tsx(174,7): error TS2322: Type '{ children: Element; fallbackRender: ({ resetErrorBoundary }: { resetErrorBoundary: any; }) => Element; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<ErrorBoundary> & Readonly<ErrorBoundaryProps>'.
src/app/rituals/[ritualId]/page.tsx(174,26): error TS7031: Binding element 'resetErrorBoundary' implicitly has an 'any' type.
```

### src/app/spaces/[spaceId]/page.tsx (9 errors)

```typescript
src/app/spaces/[spaceId]/page.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'FeedCardPost'.
src/app/spaces/[spaceId]/page.tsx(13,8): error TS2724: '"@hive/ui"' has no exported member named 'FeedCardPostData'. Did you mean 'FeedCardSystemData'?
src/app/spaces/[spaceId]/page.tsx(15,10): error TS2305: Module '"@hive/ui"' has no exported member 'SpaceBoardSkeleton'.
src/app/spaces/[spaceId]/page.tsx(108,11): error TS7006: Parameter 'p' implicitly has an 'any' type.
src/app/spaces/[spaceId]/page.tsx(207,35): error TS7006: Parameter 'p' implicitly has an 'any' type.
src/app/spaces/[spaceId]/page.tsx(229,28): error TS7006: Parameter 'id' implicitly has an 'any' type.
src/app/spaces/[spaceId]/page.tsx(230,29): error TS7006: Parameter 'id' implicitly has an 'any' type.
src/app/spaces/[spaceId]/page.tsx(231,30): error TS7006: Parameter 'id' implicitly has an 'any' type.
src/app/spaces/[spaceId]/page.tsx(232,27): error TS7006: Parameter 'id' implicitly has an 'any' type.
```

### src/app/spaces/page.tsx (9 errors)

```typescript
src/app/spaces/page.tsx(11,10): error TS2305: Module '"@hive/ui"' has no exported member 'SpacesDiscoverySkeleton'.
src/app/spaces/page.tsx(268,53): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
src/app/spaces/page.tsx(272,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(291,53): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
src/app/spaces/page.tsx(295,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(315,53): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
src/app/spaces/page.tsx(319,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(340,53): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
src/app/spaces/page.tsx(344,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
```

### src/app/api/admin/database-optimization/route.ts (8 errors)

```typescript
src/app/api/admin/database-optimization/route.ts(172,9): error TS2322: Type '{ type: string; priority: string; indexName: string; fields: string[]; reason: string; estimatedImpact: string; }[] | { type: string; priority: string; indexName: string; fields: (string | { memberCount: string; })[]; reason: string; estimatedImpact: string; }[] | { ...; }[]' is not assignable to type 'IndexRecommendation[]'.
src/app/api/admin/database-optimization/route.ts(187,5): error TS2322: Type '{ total: number; used: number; unused: number; missing: number; collections: { users: { name: string; indexes: { name: string; fields: string[]; used: boolean; }[]; usage: { used: number; unused: number; total: number; }; recommendations: { ...; }[]; }; }; recommendations: { ...; }[]; }' is not assignable to type 'IndexAnalysis'.
src/app/api/admin/database-optimization/route.ts(230,5): error TS2322: Type '{ averageTime: number; slowQueries: { collection: string; pattern: string; avgDuration: number; count: number; suggestedOptimization: string; }[]; queryStats: { users: { totalQueries: number; avgDuration: number; queries: { ...; }[]; }; }; bottlenecks: { ...; }[]; }' is not assignable to type 'QueryPerformance'.
src/app/api/admin/database-optimization/route.ts(293,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
src/app/api/admin/database-optimization/route.ts(297,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
src/app/api/admin/database-optimization/route.ts(301,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
src/app/api/admin/database-optimization/route.ts(305,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
src/app/api/admin/database-optimization/route.ts(314,5): error TS2322: Type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }[]' is not assignable to type 'IndexRecommendation[]'.
```

### src/app/api/feed/algorithm/route.ts (8 errors)

```typescript
src/app/api/feed/algorithm/route.ts(364,13): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
src/app/api/feed/algorithm/route.ts(365,30): error TS2339: Property 'authorName' does not exist on type 'MinimalPost'.
src/app/api/feed/algorithm/route.ts(369,28): error TS2339: Property 'toolName' does not exist on type 'MinimalPost'.
src/app/api/feed/algorithm/route.ts(370,32): error TS2339: Property 'deploymentId' does not exist on type 'MinimalPost'.
src/app/api/feed/algorithm/route.ts(374,13): error TS2322: Type 'string | Date' is not assignable to type 'string'.
src/app/api/feed/algorithm/route.ts(375,13): error TS2322: Type '{ likes?: number | undefined; comments?: number | undefined; shares?: number | undefined; } | { likes: number; comments: number; shares: number; views: number; interactions: number; }' is not assignable to type '{ likes: number; comments: number; shares: number; views: number; interactions: number; }'.
src/app/api/feed/algorithm/route.ts(377,29): error TS2339: Property 'surface' does not exist on type 'MinimalPost'.
src/app/api/feed/algorithm/route.ts(378,15): error TS2322: Type 'unknown' is not assignable to type 'string | undefined'.
```

### src/app/onboarding/components/steps/hive-academics-step.tsx (7 errors)

```typescript
src/app/onboarding/components/steps/hive-academics-step.tsx(7,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandDialog'.
src/app/onboarding/components/steps/hive-academics-step.tsx(8,3): error TS2305: Module '"@hive/ui"' has no exported member 'Command'.
src/app/onboarding/components/steps/hive-academics-step.tsx(9,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandInput'.
src/app/onboarding/components/steps/hive-academics-step.tsx(10,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandList'.
src/app/onboarding/components/steps/hive-academics-step.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandEmpty'.
src/app/onboarding/components/steps/hive-academics-step.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandGroup'.
src/app/onboarding/components/steps/hive-academics-step.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'CommandItem'.
```

### src/components/admin/firebase-monitoring.tsx (7 errors)

```typescript
src/components/admin/firebase-monitoring.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/firebase-monitoring.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/firebase-monitoring.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsContent'.
src/components/admin/firebase-monitoring.tsx(15,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsList'.
src/components/admin/firebase-monitoring.tsx(16,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/firebase-monitoring.tsx(17,3): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/firebase-monitoring.tsx(18,3): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
```

### src/components/admin/real-time-moderation.tsx (7 errors)

```typescript
src/components/admin/real-time-moderation.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/real-time-moderation.tsx(13,3): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
src/components/admin/real-time-moderation.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'Select'.
src/components/admin/real-time-moderation.tsx(15,3): error TS2724: '"@hive/ui"' has no exported member named 'SelectContent'. Did you mean 'SheetContent'?
src/components/admin/real-time-moderation.tsx(16,3): error TS2305: Module '"@hive/ui"' has no exported member 'SelectItem'.
src/components/admin/real-time-moderation.tsx(17,3): error TS2724: '"@hive/ui"' has no exported member named 'SelectTrigger'. Did you mean 'SheetTrigger'?
src/components/admin/real-time-moderation.tsx(18,3): error TS2305: Module '"@hive/ui"' has no exported member 'SelectValue'.
```

### src/components/landing/Landing.tsx (7 errors)

```typescript
src/components/landing/Landing.tsx(8,3): error TS2305: Module '"@hive/ui"' has no exported member 'Heading'.
src/components/landing/Landing.tsx(9,3): error TS2305: Module '"@hive/ui"' has no exported member 'Text'.
src/components/landing/Landing.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLogo'.
src/components/landing/Landing.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'Eyebrow'.
src/components/landing/Landing.tsx(19,34): error TS2307: Cannot find module '../layout/GradientBackdrop' or its corresponding type declarations.
src/components/landing/Landing.tsx(20,27): error TS2307: Cannot find module '../layout/Container' or its corresponding type declarations.
src/components/landing/Landing.tsx(21,25): error TS2307: Cannot find module '../layout/Section' or its corresponding type declarations.
```

### src/app/api/search/route.ts (6 errors)

```typescript
src/app/api/search/route.ts(276,7): error TS2322: Type '({ id: string; title: string; description: string; type: "space"; category: string; url: string; metadata: { memberCount: number; status: string; tags: string[]; }; keywords: string[]; } | { id: string; title: string; ... 5 more ...; keywords: string[]; } | ... 4 more ... | { ...; })[]' is not assignable to type 'SearchIndexItem[]'.
src/app/api/search/route.ts(286,11): error TS2322: Type '{ id: string; title: string; description: string; type: "space"; category: string; url: string; metadata: { memberCount: number; status: string; tags: string[]; }; keywords: string[]; }[]' is not assignable to type 'SearchIndexItem[]'.
src/app/api/search/route.ts(289,11): error TS2322: Type '{ id: string; title: string; description: string; type: "tool"; category: string; url: string; metadata: { rating: number; creator: string; downloads: number; }; keywords: string[]; }[]' is not assignable to type 'SearchIndexItem[]'.
src/app/api/search/route.ts(292,11): error TS2322: Type '{ id: string; title: string; description: string; type: "person"; category: string; url: string; metadata: { year: string; major: string; role: string; }; keywords: string[]; }[]' is not assignable to type 'SearchIndexItem[]'.
src/app/api/search/route.ts(295,11): error TS2322: Type '({ id: string; title: string; description: string; type: "event"; category: string; url: string; metadata: { date: string; time: string; location: string; duration?: undefined; prizes?: undefined; subject?: undefined; }; keywords: string[]; } | { ...; } | { ...; })[]' is not assignable to type 'SearchIndexItem[]'.
src/app/api/search/route.ts(298,11): error TS2322: Type '{ id: string; title: string; description: string; type: "post"; category: string; url: string; metadata: { author: string; likes: number; comments: number; }; keywords: string[]; }[]' is not assignable to type 'SearchIndexItem[]'.
```

### src/app/onboarding/components/hive-onboarding-wizard.tsx (6 errors)

```typescript
src/app/onboarding/components/hive-onboarding-wizard.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'AuthOnboardingLayout'.
src/app/onboarding/components/hive-onboarding-wizard.tsx(15,3): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardContent'. Did you mean 'CardContent'?
src/app/onboarding/components/hive-onboarding-wizard.tsx(16,3): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardHeader'. Did you mean 'CardHeader'?
src/app/onboarding/components/hive-onboarding-wizard.tsx(17,3): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardTitle'. Did you mean 'CardTitle'?
src/app/onboarding/components/hive-onboarding-wizard.tsx(18,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLogo'.
src/app/onboarding/components/hive-onboarding-wizard.tsx(19,3): error TS2305: Module '"@hive/ui"' has no exported member 'OnboardingFrame'.
```

### src/components/admin/behavioral-analytics.tsx (6 errors)

```typescript
src/components/admin/behavioral-analytics.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/behavioral-analytics.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/behavioral-analytics.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsContent'.
src/components/admin/behavioral-analytics.tsx(15,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsList'.
src/components/admin/behavioral-analytics.tsx(16,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/behavioral-analytics.tsx(160,51): error TS7006: Parameter 'v' implicitly has an 'any' type.
```

### src/components/admin/content-analytics.tsx (6 errors)

```typescript
src/components/admin/content-analytics.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/content-analytics.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'Tabs'.
src/components/admin/content-analytics.tsx(14,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsContent'.
src/components/admin/content-analytics.tsx(15,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsList'.
src/components/admin/content-analytics.tsx(16,3): error TS2305: Module '"@hive/ui"' has no exported member 'TabsTrigger'.
src/components/admin/content-analytics.tsx(177,51): error TS7006: Parameter 'v' implicitly has an 'any' type.
```

### src/lib/api-auth-secure.ts (6 errors)

```typescript
src/lib/api-auth-secure.ts(79,28): error TS2339: Property 'allowed' does not exist on type 'boolean'.
src/lib/api-auth-secure.ts(86,40): error TS2345: Argument of type 'boolean' is not assignable to parameter of type '{ success: boolean; limit: number; remaining: number; reset: number; retryAfter?: number | undefined; }'.
src/lib/api-auth-secure.ts(96,16): error TS2345: Argument of type '[]' is not assignable to parameter of type 'T'.
src/lib/api-auth-secure.ts(170,30): error TS2339: Property 'allowed' does not exist on type 'boolean'.
src/lib/api-auth-secure.ts(177,40): error TS2345: Argument of type 'boolean' is not assignable to parameter of type '{ success: boolean; limit: number; remaining: number; reset: number; retryAfter?: number | undefined; }'.
src/lib/api-auth-secure.ts(244,49): error TS2345: Argument of type 'string[] | undefined' is not assignable to parameter of type 'string[]'.
```

### src/lib/error-reporting.ts (6 errors)

```typescript
src/lib/error-reporting.ts(74,51): error TS2339: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
src/lib/error-reporting.ts(75,16): error TS2339: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
src/lib/error-reporting.ts(183,51): error TS2339: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
src/lib/error-reporting.ts(184,16): error TS2339: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
src/lib/error-reporting.ts(246,15): error TS2484: Export declaration conflicts with exported declaration of 'ErrorReport'.
src/lib/error-reporting.ts(246,28): error TS2484: Export declaration conflicts with exported declaration of 'ErrorMetrics'.
```

### src/app/api/admin/spaces/analytics/route.ts (5 errors)

```typescript
src/app/api/admin/spaces/analytics/route.ts(165,28): error TS18048: 'space.tags.length' is possibly 'undefined'.
src/app/api/admin/spaces/analytics/route.ts(322,9): error TS2322: Type '{ id: string; name: string | undefined; type: string; memberCount: number; growthRate: number; }[]' is not assignable to type '{ id: string; name: string; type: string; memberCount: number; growthRate: number; }[]'.
src/app/api/admin/spaces/analytics/route.ts(338,9): error TS2322: Type '{ id: string; name: string | undefined; type: string; activityScore: number; }[]' is not assignable to type '{ id: string; name: string; type: string; activityScore: number; }[]'.
src/app/api/admin/spaces/analytics/route.ts(354,9): error TS2322: Type '{ id: string; name: string | undefined; type: string; builderCount: number; toolsCreated: number; }[]' is not assignable to type '{ id: string; name: string; type: string; builderCount: number; toolsCreated: number; }[]'.
src/app/api/admin/spaces/analytics/route.ts(378,9): error TS2322: Type '{ id: string; name: string | undefined; memberCount: number; healthScore: number; }[]' is not assignable to type '{ id: string; name: string; memberCount: number; healthScore: number; }[]'.
```

### src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts (5 errors)

```typescript
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(88,39): error TS2769: No overload matches this call.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(89,31): error TS2339: Property 'data' does not exist on type 'QuerySnapshot<unknown, DocumentData>'.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(97,53): error TS2538: Type 'undefined' cannot be used as an index type.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(99,31): error TS2538: Type 'undefined' cannot be used as an index type.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(157,22): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
```

### src/app/auth/login/page.tsx (5 errors)

```typescript
src/app/auth/login/page.tsx(7,10): error TS2305: Module '"@hive/ui"' has no exported member 'AuthOnboardingLayout'.
src/app/auth/login/page.tsx(7,50): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardContent'. Did you mean 'CardContent'?
src/app/auth/login/page.tsx(7,67): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardHeader'. Did you mean 'CardHeader'?
src/app/auth/login/page.tsx(7,83): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardTitle'. Did you mean 'CardTitle'?
src/app/auth/login/page.tsx(7,105): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLogo'.
```

### src/app/calendar/page.tsx (5 errors)

```typescript
src/app/calendar/page.tsx(29,10): error TS2724: '"@hive/ui"' has no exported member named 'CalendarLoadingSkeleton'. Did you mean 'FeedLoadingSkeleton'?
src/app/calendar/page.tsx(567,27): error TS7006: Parameter 'eventData' implicitly has an 'any' type.
src/app/calendar/page.tsx(681,20): error TS7006: Parameter 'eventId' implicitly has an 'any' type.
src/app/calendar/page.tsx(681,29): error TS7006: Parameter 'status' implicitly has an 'any' type.
src/app/calendar/page.tsx(690,24): error TS7006: Parameter 'eventId' implicitly has an 'any' type.
```

### src/app/hivelab/page.tsx (5 errors)

```typescript
src/app/hivelab/page.tsx(10,3): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLabExperience'.
src/app/hivelab/page.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'hiveLabOverviewMock'.
src/app/hivelab/page.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'hiveLabModeCopy'.
src/app/hivelab/page.tsx(15,32): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLabView'.
src/app/hivelab/page.tsx(23,17): error TS2339: Property 'loading' does not exist on type 'UseAuthReturn'.
```

### src/app/schools/components/school-search.tsx (5 errors)

```typescript
src/app/schools/components/school-search.tsx(56,16): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(185,35): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(188,45): error TS2339: Property 'waitlistCount' does not exist on type 'School'.
src/app/schools/components/school-search.tsx(195,32): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(199,33): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
```

### middleware.ts (4 errors)

```typescript
middleware.ts(118,9): error TS2448: Block-scoped variable 'hasSession' used before its declaration.
middleware.ts(118,9): error TS2454: Variable 'hasSession' is used before being assigned.
middleware.ts(118,23): error TS2448: Block-scoped variable 'session' used before its declaration.
middleware.ts(119,56): error TS2448: Block-scoped variable 'session' used before its declaration.
```

### src/app/api/spaces/[spaceId]/events/route.ts (4 errors)

```typescript
src/app/api/spaces/[spaceId]/events/route.ts(70,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(72,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(76,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(79,5): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
```

### src/app/api/spaces/[spaceId]/posts/route.ts (4 errors)

```typescript
src/app/api/spaces/[spaceId]/posts/route.ts(85,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/posts/route.ts(90,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/posts/route.ts(93,5): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/posts/route.ts(103,9): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
```

### src/lib/feed-aggregation.ts (4 errors)

```typescript
src/lib/feed-aggregation.ts(189,32): error TS2352: Conversion of type '{ id: string; spaceId: string; authorId: string; type: string; content: string; toolShareMetadata: { toolId: string; toolName: string; shareType: string; }; reactions: { heart: number; }; reactedUsers: { ...; }; ... 5 more ...; updatedAt: Date; }' to type 'Post' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/lib/feed-aggregation.ts(370,18): error TS2339: Property 'type' does not exist on type 'Post'.
src/lib/feed-aggregation.ts(371,18): error TS2339: Property 'reactions' does not exist on type 'Post'.
src/lib/feed-aggregation.ts(371,43): error TS2339: Property 'reactions' does not exist on type 'Post'.
```

### src/lib/rituals/event-handlers.ts (4 errors)

```typescript
src/lib/rituals/event-handlers.ts(7,3): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
src/lib/rituals/event-handlers.ts(15,18): error TS7006: Parameter 'event' implicitly has an 'any' type.
src/lib/rituals/event-handlers.ts(60,18): error TS7006: Parameter 'event' implicitly has an 'any' type.
src/lib/rituals/event-handlers.ts(111,18): error TS7006: Parameter 'event' implicitly has an 'any' type.
```

### .next/types/app/api/admin/rituals/[ritualId]/route.ts (3 errors)

```typescript
.next/types/app/api/admin/rituals/[ritualId]/route.ts(49,7): error TS2344: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
.next/types/app/api/admin/rituals/[ritualId]/route.ts(244,7): error TS2344: Type '{ __tag__: "DELETE"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
.next/types/app/api/admin/rituals/[ritualId]/route.ts(283,7): error TS2344: Type '{ __tag__: "PATCH"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
```

### .next/types/validator.ts (3 errors)

```typescript
.next/types/validator.ts(891,31): error TS2344: Type 'typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/api/admin/rituals/[ritualId]/route")' does not satisfy the constraint 'RouteHandlerConfig<"/api/admin/rituals/[ritualId]">'.
.next/types/validator.ts(1467,31): error TS2344: Type 'typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/api/profile-v2/[userId]/route")' does not satisfy the constraint 'RouteHandlerConfig<"/api/profile-v2/[userId]">'.
.next/types/validator.ts(2362,31): error TS2344: Type 'typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/spaces/[spaceId]/layout")' does not satisfy the constraint 'LayoutConfig<"/spaces/[spaceId]">'.
```

### src/app/api/profile/spaces/recommendations/route.ts (3 errors)

```typescript
src/app/api/profile/spaces/recommendations/route.ts(304,32): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
src/app/api/profile/spaces/recommendations/route.ts(314,32): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
src/app/api/profile/spaces/recommendations/route.ts(339,32): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
```

### src/app/api/spaces/[spaceId]/tools/route.ts (3 errors)

```typescript
src/app/api/spaces/[spaceId]/tools/route.ts(105,69): error TS2554: Expected 2 arguments, but got 3.
src/app/api/spaces/[spaceId]/tools/route.ts(262,64): error TS2554: Expected 1 arguments, but got 3.
src/app/api/spaces/[spaceId]/tools/route.ts(312,69): error TS2554: Expected 2 arguments, but got 3.
```

### src/app/hivelab/variants/mock-data.ts (3 errors)

```typescript
src/app/hivelab/variants/mock-data.ts(17,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
src/app/hivelab/variants/mock-data.ts(49,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
src/app/hivelab/variants/mock-data.ts(79,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
```

### src/app/onboarding/components/steps/hive-photo-step.tsx (3 errors)

```typescript
src/app/onboarding/components/steps/hive-photo-step.tsx(464,24): error TS2304: Cannot find name 'Camera'.
src/app/onboarding/components/steps/hive-photo-step.tsx(467,22): error TS2304: Cannot find name 'Camera'.
src/app/onboarding/components/steps/hive-photo-step.tsx(574,16): error TS2304: Cannot find name 'Camera'.
```

### src/components/admin/realtime-performance-dashboard.tsx (3 errors)

```typescript
src/components/admin/realtime-performance-dashboard.tsx(11,3): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
src/components/admin/realtime-performance-dashboard.tsx(12,3): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/admin/realtime-performance-dashboard.tsx(13,3): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
```

### src/hooks/use-hive-profile.ts (3 errors)

```typescript
src/hooks/use-hive-profile.ts(8,10): error TS2724: '"@hive/core/types/profile-system"' has no exported member named 'getProfileCompleteness'. Did you mean 'ProfileCompleteness'?
src/hooks/use-hive-profile.ts(246,56): error TS2304: Cannot find name 'HiveProfileUpdateData'.
src/hooks/use-hive-profile.ts(631,32): error TS2339: Property 'id' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
```

### src/hooks/use-platform-integration.ts (3 errors)

```typescript
src/hooks/use-platform-integration.ts(33,24): error TS2339: Property 'uid' does not exist on type 'User'.
src/hooks/use-platform-integration.ts(101,56): error TS2339: Property 'uid' does not exist on type 'User'.
src/hooks/use-platform-integration.ts(421,48): error TS2339: Property 'uid' does not exist on type 'User'.
```

### src/lib/api-client-resilient.ts (3 errors)

```typescript
src/lib/api-client-resilient.ts(348,5): error TS2741: Property 'hasMore' is missing in type '{ spaces: never[]; total: number; }' but required in type 'SpacesListResponse'.
src/lib/api-client-resilient.ts(355,5): error TS2741: Property 'hasMore' is missing in type '{ tools: never[]; total: number; }' but required in type 'ToolsListResponse'.
src/lib/api-client-resilient.ts(413,9): error TS2322: Type 'string' is not assignable to type 'Record<string, unknown>'.
```

### src/app/api/admin/feed-algorithm/route.ts (2 errors)

```typescript
src/app/api/admin/feed-algorithm/route.ts(84,35): error TS2345: Argument of type '(request: NextRequest, token: DecodedIdToken) => Promise<Response>' is not assignable to parameter of type '(request: NextRequest, token: DecodedIdToken) => Promise<NextResponse<unknown>>'.
src/app/api/admin/feed-algorithm/route.ts(129,36): error TS2345: Argument of type '(request: NextRequest, token: DecodedIdToken) => Promise<Response>' is not assignable to parameter of type '(request: NextRequest, token: DecodedIdToken) => Promise<NextResponse<unknown>>'.
```

### src/app/api/admin/rituals/route.ts (2 errors)

```typescript
src/app/api/admin/rituals/route.ts(4,3): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
src/app/api/admin/rituals/route.ts(116,9): error TS2322: Type '{ id: string | undefined; createdAt: any; updatedAt: any; campusId: string; title: string; config: { founding: { limit: number; currentCount: number; deadline: string; founderBadge: { permanent: boolean; visibleOn: "profile"; exclusive: boolean; }; founderPerks: string[]; founderWall: { ...; }; urgency: string; soci...' is not assignable to type 'UpsertRitualInput'.
```

### src/app/api/admin/system-health/route.ts (2 errors)

```typescript
src/app/api/admin/system-health/route.ts(317,29): error TS2339: Property 'campusId' does not exist on type '{ timestamp: any; level: any; resolved: any; id: string; }'.
src/app/api/admin/system-health/route.ts(317,59): error TS2339: Property 'campusId' does not exist on type '{ timestamp: any; level: any; resolved: any; id: string; }'.
```

### src/app/api/auth/check-handle/route.ts (2 errors)

```typescript
src/app/api/auth/check-handle/route.ts(25,13): error TS2339: Property 'handle' does not exist on type 'unknown'.
src/app/api/auth/check-handle/route.ts(41,13): error TS2339: Property 'handle' does not exist on type 'Record<string, string> | undefined'.
```

### src/app/api/spaces/leave/route.ts (2 errors)

```typescript
src/app/api/spaces/leave/route.ts(39,32): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
src/app/api/spaces/leave/route.ts(52,34): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
```

### src/app/api/tools/deploy/route.ts (2 errors)

```typescript
src/app/api/tools/deploy/route.ts(392,7): error TS2554: Expected 1 arguments, but got 3.
src/app/api/tools/deploy/route.ts(399,7): error TS2554: Expected 2 arguments, but got 3.
```

### src/app/api/tools/install/route.ts (2 errors)

```typescript
src/app/api/tools/install/route.ts(222,11): error TS2353: Object literal may only specify known properties, and 'installTo' does not exist in type '{ deployedTo: "profile" | "space"; targetId: string; spaceType?: string | undefined; toolId: string; deploymentId: string; surface?: string | undefined; permissions?: any; settings?: any; }'.
src/app/api/tools/install/route.ts(241,9): error TS2554: Expected 2 arguments, but got 3.
```

### src/app/api/tools/route.ts (2 errors)

```typescript
src/app/api/tools/route.ts(221,66): error TS2554: Expected 1 arguments, but got 3.
src/app/api/tools/route.ts(222,87): error TS2554: Expected 2 arguments, but got 3.
```

### src/app/spaces/create/page.tsx (2 errors)

```typescript
src/app/spaces/create/page.tsx(168,17): error TS2339: Property 'lockMessage' does not exist on type '{ label: string; description: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; color: string; requiresVerification: boolean; locked: boolean; lockMessage: string; } | { ...; } | { ...; } | { ...; }'.
src/app/spaces/create/page.tsx(349,73): error TS2339: Property 'lockMessage' does not exist on type '{ label: string; description: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; color: string; requiresVerification: boolean; locked: boolean; lockMessage: string; } | { ...; } | { ...; } | { ...; }'.
```

### src/app/tools/[toolId]/settings/page.tsx (2 errors)

```typescript
src/app/tools/[toolId]/settings/page.tsx(9,10): error TS2305: Module '"@/components/temp-stubs"' has no exported member 'Alert'.
src/app/tools/[toolId]/settings/page.tsx(404,29): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
```

### src/app/tools/page.tsx (2 errors)

```typescript
src/app/tools/page.tsx(8,10): error TS2305: Module '"@hive/ui"' has no exported member 'CompleteHIVEToolsSystem'.
src/app/tools/page.tsx(22,10): error TS2305: Module '"@hive/ui"' has no exported member 'ToolsLoadingSkeleton'.
```

### src/app/waitlist/[schoolId]/components/waitlist-form.tsx (2 errors)

```typescript
src/app/waitlist/[schoolId]/components/waitlist-form.tsx(11,10): error TS2305: Module '"@/components/temp-stubs"' has no exported member 'Alert'.
src/app/waitlist/[schoolId]/components/waitlist-form.tsx(11,17): error TS2305: Module '"@/components/temp-stubs"' has no exported member 'AlertDescription'.
```

### src/components/error-boundaries/ritual-error-boundary.tsx (2 errors)

```typescript
src/components/error-boundaries/ritual-error-boundary.tsx(4,10): error TS2305: Module '"@hive/ui"' has no exported member 'Alert'.
src/components/error-boundaries/ritual-error-boundary.tsx(4,17): error TS2724: '"@hive/ui"' has no exported member named 'AlertDescription'. Did you mean 'CardDescription'?
```

### src/components/landing/3d/CorkBoard.tsx (2 errors)

```typescript
src/components/landing/3d/CorkBoard.tsx(42,17): error TS2339: Property 'point' does not exist on type 'Event<string, unknown>'.
src/components/landing/3d/CorkBoard.tsx(43,18): error TS2339: Property 'point' does not exist on type 'Event<string, unknown>'.
```

### src/hooks/use-realtime-comments.ts (2 errors)

```typescript
src/hooks/use-realtime-comments.ts(166,26): error TS2339: Property 'displayName' does not exist on type 'AuthUser'.
src/hooks/use-realtime-comments.ts(167,28): error TS2339: Property 'photoURL' does not exist on type 'AuthUser'.
```

### src/lib/api-auth-middleware.ts (2 errors)

```typescript
src/lib/api-auth-middleware.ts(233,17): error TS2339: Property 'message' does not exist on type 'object & Record<"status", unknown>'.
src/lib/api-auth-middleware.ts(234,17): error TS2339: Property 'code' does not exist on type 'object & Record<"status", unknown>'.
```

### src/lib/api-wrapper.ts (2 errors)

```typescript
src/lib/api-wrapper.ts(168,11): error TS2554: Expected 3 arguments, but got 5.
src/lib/api-wrapper.ts(188,13): error TS2554: Expected 2 arguments, but got 3.
```

### .next/types/app/api/admin/dashboard/route.ts (1 errors)

```typescript
.next/types/app/api/admin/dashboard/route.ts(12,13): error TS2344: Type 'OmitWithTag<typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/api/admin/dashboard/route"), "POST" | "PATCH" | "DELETE" | "PUT" | "GET" | "config" | "dynamic" | "generateStaticParams" | ... 7 more ... | "OPTIONS", "">' does not satisfy the constraint '{ [x: string]: never; }'.
```

### .next/types/app/api/profile-v2/[userId]/route.ts (1 errors)

```typescript
.next/types/app/api/profile-v2/[userId]/route.ts(49,7): error TS2344: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: { params: { userId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
```

### .next/types/app/spaces/[spaceId]/layout.ts (1 errors)

```typescript
.next/types/app/spaces/[spaceId]/layout.ts(34,31): error TS2344: Type '{ children: ReactNode; params: { spaceId: string; }; }' does not satisfy the constraint 'LayoutProps'.
```

### .next/types/app/waitlist/[schoolId]/page.ts (1 errors)

```typescript
.next/types/app/waitlist/[schoolId]/page.ts(34,29): error TS2344: Type 'WaitlistPageProps' does not satisfy the constraint 'PageProps'.
```

### src/app/admin/head.tsx (1 errors)

```typescript
src/app/admin/head.tsx(6,29): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
```

### src/app/admin/page.tsx (1 errors)

```typescript
src/app/admin/page.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'AdminRitualComposer'.
```

### src/app/api/admin/alerts/route.ts (1 errors)

```typescript
src/app/api/admin/alerts/route.ts(18,53): error TS2304: Cannot find name 'auth'.
```

### src/app/api/admin/behavioral-analytics/route.ts (1 errors)

```typescript
src/app/api/admin/behavioral-analytics/route.ts(12,60): error TS2304: Cannot find name 'auth'.
```

### src/app/api/admin/completion-funnel/route.ts (1 errors)

```typescript
src/app/api/admin/completion-funnel/route.ts(12,62): error TS2304: Cannot find name 'auth'.
```

### src/app/api/admin/feed-metrics/route.ts (1 errors)

```typescript
src/app/api/admin/feed-metrics/route.ts(10,35): error TS2345: Argument of type '(request: NextRequest, token: DecodedIdToken) => Promise<Response>' is not assignable to parameter of type '(request: NextRequest, token: DecodedIdToken) => Promise<NextResponse<unknown>>'.
```

### src/app/api/admin/lookup-user/route.ts (1 errors)

```typescript
src/app/api/admin/lookup-user/route.ts(45,14): error TS2304: Cannot find name 'respond'.
```

### src/app/api/admin/rituals/[ritualId]/route.ts (1 errors)

```typescript
src/app/api/admin/rituals/[ritualId]/route.ts(4,3): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
```

### src/app/api/admin/rituals/evaluate/route.ts (1 errors)

```typescript
src/app/api/admin/rituals/evaluate/route.ts(4,10): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
```

### src/app/api/admin/spaces/bulk/route.ts (1 errors)

```typescript
src/app/api/admin/spaces/bulk/route.ts(73,60): error TS2304: Cannot find name 'CURRENT_CAMPUS_ID'.
```

### src/app/api/admin/tools/detail/[toolId]/route.ts (1 errors)

```typescript
src/app/api/admin/tools/detail/[toolId]/route.ts(7,35): error TS2345: Argument of type '(request: NextRequest, { params }: { params: Promise<{ toolId: string; }>; }) => Promise<NextResponse<{ success: boolean; error: string; }> | NextResponse<{ success: boolean; tool: any; deployments: { ...; }[]; reviews: { ...; }[]; events: FirebaseFirestore.DocumentData[]; }>>' is not assignable to parameter of type '(request: NextRequest, token: DecodedIdToken) => Promise<NextResponse<unknown>>'.
```

### src/app/api/analytics/metrics/route.ts (1 errors)

```typescript
src/app/api/analytics/metrics/route.ts(166,51): error TS2345: Argument of type '{ timestamp: any; receivedAt: any; id: string; }[]' is not assignable to parameter of type 'StoredMetric[]'.
```

### src/app/api/internal/rituals/evaluate/route.ts (1 errors)

```typescript
src/app/api/internal/rituals/evaluate/route.ts(2,10): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
```

### src/app/api/profile/[userId]/route.ts (1 errors)

```typescript
src/app/api/profile/[userId]/route.ts(7,31): error TS2345: Argument of type '(_request: any, { params }: { params: any; }, respond: typeof ResponseFormatter) => Promise<Response>' is not assignable to parameter of type '(request: any, context: unknown, respond: typeof ResponseFormatter) => Promise<Response>'.
```

### src/app/api/profile/privacy/route.ts (1 errors)

```typescript
src/app/api/profile/privacy/route.ts(149,49): error TS2559: Type '"Privacy settings updated"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
```

### src/app/api/tools/event-system/route.ts (1 errors)

```typescript
src/app/api/tools/event-system/route.ts(265,3): error TS2345: Argument of type 'ZodDiscriminatedUnion<"action", [ZodObject<{ spaceId: ZodOptional<ZodString>; isPersonal: ZodDefault<ZodBoolean>; configuration: ZodDefault<ZodObject<{ defaultEventTypes: ZodDefault<...>; calendarIntegration: ZodDefault<...>; notificationSettings: ZodDefault<...>; spaceIntegration: ZodDefault<...>; memberPermissions...' is not assignable to parameter of type 'ZodType<{ action: "install"; configuration: { defaultEventTypes: string[]; calendarIntegration: boolean; notificationSettings: { eventReminders: boolean; rsvpUpdates: boolean; checkInAlerts: boolean; }; spaceIntegration: { ...; }; memberPermissions: { ...; }; }; isPersonal: boolean; spaceId?: string | undefined; } |...'.
```

### src/app/api/tools/search/route.ts (1 errors)

```typescript
src/app/api/tools/search/route.ts(91,3): error TS2345: Argument of type 'ZodObject<{ query: ZodString; limit: ZodDefault<ZodNumber>; offset: ZodDefault<ZodNumber>; category: ZodOptional<ZodEnum<["productivity", "academic", "social", "utility", "entertainment", "other"]>>; verified: ZodOptional<...>; minDeployments: ZodOptional<...>; sortBy: ZodDefault<...>; includePrivate: ZodDefault<......' is not assignable to parameter of type 'ZodType<{ offset: number; limit: number; query: string; sortBy: "created" | "deployments" | "rating" | "relevance"; includePrivate: boolean; category?: "academic" | "social" | "other" | "productivity" | "utility" | "entertainment" | undefined; verified?: boolean | undefined; minDeployments?: number | undefined; }, Z...'.
```

### src/app/api/tools/state/[deploymentId]/route.ts (1 errors)

```typescript
src/app/api/tools/state/[deploymentId]/route.ts(445,59): error TS2345: Argument of type '{ path: string; value?: any; operation?: "append" | "delete" | "set" | "increment" | undefined; }' is not assignable to parameter of type '{ path: string; operation: "append" | "delete" | "set" | "increment"; value?: any; }'.
```

### src/app/events/page.tsx (1 errors)

```typescript
src/app/events/page.tsx(655,27): error TS7006: Parameter 'eventData' implicitly has an 'any' type.
```

### src/app/feed/page-storybook-migration.tsx (1 errors)

```typescript
src/app/feed/page-storybook-migration.tsx(9,3): error TS2305: Module '"@hive/ui"' has no exported member 'PageContainer'.
```

### src/app/feed/page-v2.tsx (1 errors)

```typescript
src/app/feed/page-v2.tsx(24,10): error TS2305: Module '"@hive/ui"' has no exported member 'PostCard'.
```

### src/app/onboarding/components/steps/hive-welcome-step.tsx (1 errors)

```typescript
src/app/onboarding/components/steps/hive-welcome-step.tsx(3,18): error TS2305: Module '"@hive/ui"' has no exported member 'HiveLogo'.
```

### src/app/providers.tsx (1 errors)

```typescript
src/app/providers.tsx(34,87): error TS2554: Expected 1-2 arguments, but got 3.
```

### src/app/rituals/page.tsx (1 errors)

```typescript
src/app/rituals/page.tsx(101,7): error TS2322: Type '{ rituals: RitualData[]; featuredRitual: RitualData | undefined; featuredRitualBanner: RitualFeedBanner | undefined; onBannerAction: (href: string) => void; onRitualJoin: (ritualId: string) => Promise<...>; onRitualView: (ritualId: string) => void; defaultTab: any; isLoading: boolean; }' is not assignable to type 'IntrinsicAttributes & RitualsPageLayoutProps & RefAttributes<HTMLDivElement>'.
```

### src/app/schools/page.tsx (1 errors)

```typescript
src/app/schools/page.tsx(11,10): error TS2305: Module '"../../components/temp-stubs"' has no exported member 'SchoolsPageHeader'.
```

### src/app/spaces/[spaceId]/events/page.tsx (1 errors)

```typescript
src/app/spaces/[spaceId]/events/page.tsx(19,46): error TS2322: Type '{ spaceId: string; userRole: string; canCreateEvents: boolean; }' is not assignable to type 'IntrinsicAttributes & { spaceId: string; }'.
```

### src/app/spaces/[spaceId]/members/page.tsx (1 errors)

```typescript
src/app/spaces/[spaceId]/members/page.tsx(18,47): error TS2322: Type '{ spaceId: string; userRole: string; isLeader: boolean; }' is not assignable to type 'IntrinsicAttributes & { spaceId: string; }'.
```

### src/app/spaces/[spaceId]/resources/page.tsx (1 errors)

```typescript
src/app/spaces/[spaceId]/resources/page.tsx(16,49): error TS2322: Type '{ spaceId: string; userRole: string; canUpload: boolean; isLeader: boolean; }' is not assignable to type 'IntrinsicAttributes & { spaceId: string; }'.
```

### src/app/spaces/browse/page.tsx (1 errors)

```typescript
src/app/spaces/browse/page.tsx(302,51): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "xs" | "none" | null | undefined'.
```

### src/app/tools/[toolId]/analytics/page.tsx (1 errors)

```typescript
src/app/tools/[toolId]/analytics/page.tsx(114,49): error TS2345: Argument of type '"export_analytics"' is not assignable to parameter of type '"view" | "complete" | "interact" | "abandon"'.
```

### src/app/tools/[toolId]/deploy/page.tsx (1 errors)

```typescript
src/app/tools/[toolId]/deploy/page.tsx(9,10): error TS2305: Module '"@/components/temp-stubs"' has no exported member 'Alert'.
```

### src/app/tools/[toolId]/preview/page.tsx (1 errors)

```typescript
src/app/tools/[toolId]/preview/page.tsx(89,11): error TS2322: Type '"live" | "preview"' is not assignable to type '"embed" | "preview" | "run"'.
```

### src/app/user/[handle]/page.tsx (1 errors)

```typescript
src/app/user/[handle]/page.tsx(116,42): error TS2339: Property 'fullName' does not exist on type '{ academic: AcademicIdentity; photoCarousel: PhotoCarousel; badges: Badge[]; }'.
```

### src/app/ux/preboarding/page.tsx (1 errors)

```typescript
src/app/ux/preboarding/page.tsx(57,25): error TS2322: Type '{ feedType: string; className: string; }' is not assignable to type 'IntrinsicAttributes'.
```

### src/app/waitlist/[schoolId]/components/waitlist-progress.tsx (1 errors)

```typescript
src/app/waitlist/[schoolId]/components/waitlist-progress.tsx(3,10): error TS2305: Module '"@hive/ui"' has no exported member 'Progress'.
```

### src/app/waitlist/[schoolId]/page.tsx (1 errors)

```typescript
src/app/waitlist/[schoolId]/page.tsx(56,50): error TS2339: Property 'waitlistCount' does not exist on type 'School'.
```

### src/components/error-provider.tsx (1 errors)

```typescript
src/components/error-provider.tsx(82,69): error TS2554: Expected 1-2 arguments, but got 3.
```

### src/components/feed/ritual-feed-integration.tsx (1 errors)

```typescript
src/components/feed/ritual-feed-integration.tsx(5,10): error TS2305: Module '"@hive/ui"' has no exported member 'RitualFeedBannerCard'.
```

### src/components/landing/ui/WaitlistForm.tsx (1 errors)

```typescript
src/components/landing/ui/WaitlistForm.tsx(108,17): error TS2322: Type '"glow"' is not assignable to type '"link" | "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive" | "brand" | "success" | "warning" | null | undefined'.
```

### src/components/realtime/realtime-demo.tsx (1 errors)

```typescript
src/components/realtime/realtime-demo.tsx(145,30): error TS2339: Property 'type' does not exist on type 'Space'.
```

### src/hooks/use-connections.ts (1 errors)

```typescript
src/hooks/use-connections.ts(276,24): error TS2339: Property 'strength' does not exist on type 'Connection'.
```

### src/hooks/use-presence.ts (1 errors)

```typescript
src/hooks/use-presence.ts(10,3): error TS2305: Module '"firebase/firestore"' has no exported member 'onDisconnect'.
```

### src/lib/api-response-types.ts (1 errors)

```typescript
src/lib/api-response-types.ts(70,7): error TS2698: Spread types may only be created from object types.
```

### src/lib/auth-middleware.ts (1 errors)

```typescript
src/lib/auth-middleware.ts(198,11): error TS2339: Property 'logAuthEvent' does not exist on type 'typeof import("/Users/laneyfraass/hive_ui/apps/web/src/lib/structured-logger")'.
```

### src/lib/cache/cache-service.ts (1 errors)

```typescript
src/lib/cache/cache-service.ts(318,47): error TS2339: Property 'status' does not exist on type 'Ritual'.
```

### src/lib/cache/redis-client.ts (1 errors)

```typescript
src/lib/cache/redis-client.ts(157,11): error TS2564: Property 'client' has no initializer and is not definitely assigned in the constructor.
```

### src/lib/firebase-optimized.ts (1 errors)

```typescript
src/lib/firebase-optimized.ts(53,8): error TS2305: Module '"firebase/storage"' has no exported member 'Storage'.
```

### src/lib/middleware/withAdminCampusIsolation.ts (1 errors)

```typescript
src/lib/middleware/withAdminCampusIsolation.ts(27,25): error TS2345: Argument of type 'AdminHandler<TArgs>' is not assignable to parameter of type '(request: NextRequest, token: DecodedIdToken, ...args: TArgs) => Promise<NextResponse<unknown>>'.
```

### src/lib/rate-limiter-redis.ts (1 errors)

```typescript
src/lib/rate-limiter-redis.ts(297,47): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Duration'.
```

### src/lib/realtime-optimization.ts (1 errors)

```typescript
src/lib/realtime-optimization.ts(455,13): error TS2552: Cannot find name 'firebaseRealtimeService'. Did you mean 'sseRealtimeService'?
```

### src/lib/rituals-framework.ts (1 errors)

```typescript
src/lib/rituals-framework.ts(362,7): error TS2353: Object literal may only specify known properties, and 'campusId' does not exist in type 'Omit<RitualParticipation, "id">'.
```

### src/lib/secure-auth-utils.ts (1 errors)

```typescript
src/lib/secure-auth-utils.ts(14,3): error TS2411: Property ''Authorization'' of type 'string | undefined' is not assignable to 'string' index type 'string'.
```

### src/server/onboarding-catalog-firestore.ts (1 errors)

```typescript
src/server/onboarding-catalog-firestore.ts(30,40): error TS2339: Property 'interests' does not exist on type 'InterestCategory | { id: string; title: string; items?: string[] | undefined; icon?: string | undefined; interests?: string[] | undefined; }'.
```
