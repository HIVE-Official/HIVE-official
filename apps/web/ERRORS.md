# apps/web TypeScript Errors by Type

**Total Errors:** 748
**Error Types:** 34

---

## Error Type Summary

- **TS2339** (160 errors): Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- **TS2305** (135 errors): Module '"@hive/ui"' has no exported member 'AdminRitualComposer'.
- **TS2304** (131 errors): Cannot find name 'auth'.
- **TS7006** (63 errors): Parameter 'tag' implicitly has an 'any' type.
- **TS18048** (42 errors): 'space.tags.length' is possibly 'undefined'.
- **TS2322** (39 errors): Type '{ type: string; priority: string; indexName: string; fields: string[]; rea...
- **TS2345** (30 errors): Argument of type '{ total: number; active: number; newThisMonth: number; byYear:...
- **TS2724** (27 errors): '"@hive/ui"' has no exported member named 'HiveCardContent'. Did you mean 'CardC...
- **TS2554** (17 errors): Expected 2 arguments, but got 3.
- **TS2353** (15 errors): Object literal may only specify known properties, and 'installTo' does not exist...
- **TS2551** (15 errors): Property 'status' does not exist on type 'School'. Did you mean 'stats'?
- **TS2344** (10 errors): Type 'OmitWithTag<typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/api...
- **TS2740** (8 errors): Type 'Query<DocumentData, DocumentData>' is missing the following properties fro...
- **TS7031** (8 errors): Binding element 'resetErrorBoundary' implicitly has an 'any' type.
- **TS2741** (6 errors): Property 'members' is missing in type 'SpaceRecommendation' but required in type...
- **TS2365** (5 errors): Operator '+' cannot be applied to types 'number' and '{}'.
- **TS2538** (4 errors): Type '{}' cannot be used as an index type.
- **TS2559** (4 errors): Type '{ id: string; createdAt: string; }' has no properties in common with type ...
- **TS2769** (4 errors): No overload matches this call.
- **TS2352** (4 errors): Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<Docu...

---

## Detailed Breakdown

### TS2339 (160 errors)


**Pattern:** Property '' does not exist on type ''.
**Count:** 160

```
src/app/admin/head.tsx(6,29): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
src/app/api/admin/campus-expansion/route.ts(324,27): error TS2339: Property 'campusId' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/campus-expansion/route.ts(325,29): error TS2339: Property 'name' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/campus-expansion/route.ts(334,29): error TS2339: Property 'name' does not exist on type '{ addedBy: string; addedAt: Date; status: string; priority: number; estimatedStudents: number; marketSize: number; readinessScore: number; }'.
src/app/api/admin/system-health/route.ts(317,29): error TS2339: Property 'campusId' does not exist on type '{ timestamp: any; level: any; resolved: any; id: string; }'.
... and 155 more
```

### TS2305 (135 errors)


**Pattern:** Module '' has no exported member ''.
**Count:** 135

```
src/app/admin/page.tsx(13,3): error TS2305: Module '"@hive/ui"' has no exported member 'AdminRitualComposer'.
src/app/api/admin/rituals/[ritualId]/route.ts(4,3): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
src/app/api/admin/rituals/evaluate/route.ts(4,10): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
src/app/api/admin/rituals/route.ts(4,3): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
src/app/api/internal/rituals/evaluate/route.ts(2,10): error TS2305: Module '"@hive/core"' has no exported member 'EventBus'.
... and 130 more
```

### TS2304 (131 errors)


**Pattern:** Cannot find name ''.
**Count:** 131

```
src/app/api/admin/alerts/route.ts(18,53): error TS2304: Cannot find name 'auth'.
src/app/api/admin/behavioral-analytics/route.ts(12,60): error TS2304: Cannot find name 'auth'.
src/app/api/admin/campus-expansion/route.ts(139,138): error TS2304: Cannot find name 'auth'.
src/app/api/admin/completion-funnel/route.ts(12,62): error TS2304: Cannot find name 'auth'.
src/app/api/admin/lookup-user/route.ts(45,14): error TS2304: Cannot find name 'respond'.
... and 126 more
```

### TS7006 (63 errors)


**Pattern:** Parameter '' implicitly has an '' type.
**Count:** 63

```
src/app/api/spaces/search/route.ts(87,37): error TS7006: Parameter 'tag' implicitly has an 'any' type.
src/app/api/spaces/search/route.ts(178,30): error TS7006: Parameter 'tag' implicitly has an 'any' type.
src/app/calendar/page.tsx(567,27): error TS7006: Parameter 'eventData' implicitly has an 'any' type.
src/app/calendar/page.tsx(681,20): error TS7006: Parameter 'eventId' implicitly has an 'any' type.
src/app/calendar/page.tsx(681,29): error TS7006: Parameter 'status' implicitly has an 'any' type.
... and 58 more
```

### TS18048 (42 errors)


**Pattern:** '' is possibly ''.
**Count:** 42

```
src/app/api/admin/spaces/analytics/route.ts(165,28): error TS18048: 'space.tags.length' is possibly 'undefined'.
src/app/api/feed/aggregation/route.ts(731,70): error TS18048: 'content.metadata' is possibly 'undefined'.
src/app/api/profile/route.ts(73,18): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(74,19): error TS18048: 'userData' is possibly 'undefined'.
src/app/api/profile/route.ts(75,22): error TS18048: 'userData' is possibly 'undefined'.
... and 37 more
```

### TS2322 (39 errors)


**Pattern:** Type '' is not assignable to type ''.
**Count:** 39

```
src/app/api/admin/database-optimization/route.ts(172,9): error TS2322: Type '{ type: string; priority: string; indexName: string; fields: string[]; reason: string; estimatedImpact: string; }[] | { type: string; priority: string; indexName: string; fields: (string | { memberCount: string; })[]; reason: string; estimatedImpact: string; }[] | { ...; }[]' is not assignable to type 'IndexRecommendation[]'.
src/app/api/admin/database-optimization/route.ts(187,5): error TS2322: Type '{ total: number; used: number; unused: number; missing: number; collections: { users: { name: string; indexes: { name: string; fields: string[]; used: boolean; }[]; usage: { used: number; unused: number; total: number; }; recommendations: { ...; }[]; }; }; recommendations: { ...; }[]; }' is not assignable to type 'IndexAnalysis'.
src/app/api/admin/database-optimization/route.ts(230,5): error TS2322: Type '{ averageTime: number; slowQueries: { collection: string; pattern: string; avgDuration: number; count: number; suggestedOptimization: string; }[]; queryStats: { users: { totalQueries: number; avgDuration: number; queries: { ...; }[]; }; }; bottlenecks: { ...; }[]; }' is not assignable to type 'QueryPerformance'.
src/app/api/admin/database-optimization/route.ts(314,5): error TS2322: Type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }[]' is not assignable to type 'IndexRecommendation[]'.
src/app/api/admin/rituals/route.ts(116,9): error TS2322: Type '{ id: string | undefined; createdAt: any; updatedAt: any; campusId: string; title: string; config: { founding: { limit: number; currentCount: number; deadline: string; founderBadge: { permanent: boolean; visibleOn: "profile"; exclusive: boolean; }; founderPerks: string[]; founderWall: { ...; }; urgency: string; soci...' is not assignable to type 'UpsertRitualInput'.
... and 34 more
```

### TS2345 (30 errors)


**Pattern:** Argument of type '' is not assignable to parameter of type ''.
**Count:** 30

```
src/app/api/admin/campus-expansion/route.ts(172,44): error TS2345: Argument of type '{ total: number; active: number; newThisMonth: number; byYear: {}; byMajor: {}; }' is not assignable to parameter of type 'UserStats'.
src/app/api/admin/campus-expansion/route.ts(397,57): error TS2345: Argument of type '{ overallScore: number; technical: number; operational: number; business: number; product: number; }' is not assignable to parameter of type 'Record<string, Record<string, number>>'.
src/app/api/admin/campus-expansion/route.ts(415,45): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Record<string, unknown>'.
src/app/api/admin/database-optimization/route.ts(293,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
src/app/api/admin/database-optimization/route.ts(297,22): error TS2345: Argument of type '{ id: string; type: string; priority: string; collection: string; title: string; description: string; estimatedImpact: string; implementation: string; effort: string; }' is not assignable to parameter of type 'IndexRecommendation'.
... and 25 more
```

### TS2724 (27 errors)


**Pattern:** '' has no exported member named ''. Did you mean ''?
**Count:** 27

```
src/app/auth/login/page.tsx(7,50): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardContent'. Did you mean 'CardContent'?
src/app/auth/login/page.tsx(7,67): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardHeader'. Did you mean 'CardHeader'?
src/app/auth/login/page.tsx(7,83): error TS2724: '"@hive/ui"' has no exported member named 'HiveCardTitle'. Did you mean 'CardTitle'?
src/app/calendar/page.tsx(29,10): error TS2724: '"@hive/ui"' has no exported member named 'CalendarLoadingSkeleton'. Did you mean 'FeedLoadingSkeleton'?
src/app/feed/page-new.tsx(38,3): error TS2724: '"@hive/ui"' has no exported member named 'AriaLiveRegion'. Did you mean 'LiveRegion'?
... and 22 more
```

### TS2554 (17 errors)


**Pattern:** Expected 2 arguments, but got 3.
**Count:** 6

```
src/app/api/spaces/[spaceId]/tools/route.ts(105,69): error TS2554: Expected 2 arguments, but got 3.
src/app/api/spaces/[spaceId]/tools/route.ts(312,69): error TS2554: Expected 2 arguments, but got 3.
src/app/api/tools/deploy/route.ts(399,7): error TS2554: Expected 2 arguments, but got 3.
src/app/api/tools/install/route.ts(241,9): error TS2554: Expected 2 arguments, but got 3.
src/app/api/tools/route.ts(222,87): error TS2554: Expected 2 arguments, but got 3.
... and 1 more
```

**Pattern:** Expected 1 arguments, but got 3.
**Count:** 3

```
src/app/api/spaces/[spaceId]/tools/route.ts(262,64): error TS2554: Expected 1 arguments, but got 3.
src/app/api/tools/deploy/route.ts(392,7): error TS2554: Expected 1 arguments, but got 3.
src/app/api/tools/route.ts(221,66): error TS2554: Expected 1 arguments, but got 3.
```

**Pattern:** Expected 1-2 arguments, but got 3.
**Count:** 2

```
src/app/providers.tsx(34,87): error TS2554: Expected 1-2 arguments, but got 3.
src/components/error-provider.tsx(82,69): error TS2554: Expected 1-2 arguments, but got 3.
```

**Pattern:** Expected 1 arguments, but got 4.
**Count:** 2

```
src/lib/profile-transformers.ts(94,5): error TS2554: Expected 1 arguments, but got 4.
src/lib/profile-transformers.ts(177,44): error TS2554: Expected 1 arguments, but got 4.
```

**Pattern:** Expected 0 arguments, but got 2.
**Count:** 1

```
src/app/api/tools/[toolId]/share/route.ts(108,56): error TS2554: Expected 0 arguments, but got 2.
```

**Pattern:** Expected 0 arguments, but got 1.
**Count:** 1

```
src/app/profile/settings/page.tsx(253,29): error TS2554: Expected 0 arguments, but got 1.
```

**Pattern:** Expected 3 arguments, but got 5.
**Count:** 1

```
src/lib/api-wrapper.ts(168,11): error TS2554: Expected 3 arguments, but got 5.
```

**Pattern:** Expected 1 arguments, but got 2.
**Count:** 1

```
src/lib/profile-transformers.ts(179,36): error TS2554: Expected 1 arguments, but got 2.
```

### TS2353 (15 errors)


**Pattern:** Object literal may only specify known properties, and '' does not exist in type ''.
**Count:** 15

```
src/app/api/tools/install/route.ts(222,11): error TS2353: Object literal may only specify known properties, and 'installTo' does not exist in type '{ deployedTo: "profile" | "space"; targetId: string; spaceType?: string | undefined; toolId: string; deploymentId: string; surface?: string | undefined; permissions?: any; settings?: any; }'.
src/app/hivelab/variants/mock-data.ts(17,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
src/app/hivelab/variants/mock-data.ts(49,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
src/app/hivelab/variants/mock-data.ts(79,5): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'Element'.
src/app/tools/[toolId]/run/page.tsx(36,5): error TS2353: Object literal may only specify known properties, and 'elementId' does not exist in type 'ElementInstance'.
... and 10 more
```

### TS2551 (15 errors)


**Pattern:** Property '' does not exist on type ''. Did you mean ''?
**Count:** 15

```
src/app/schools/components/school-search.tsx(56,16): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(185,35): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(195,32): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/app/schools/components/school-search.tsx(199,33): error TS2551: Property 'status' does not exist on type 'School'. Did you mean 'stats'?
src/hooks/use-realtime-feed-v2.ts(82,36): error TS2551: Property 'author' does not exist on type 'FeedItemContent'. Did you mean 'authorId'?
... and 10 more
```

### TS2344 (10 errors)


**Pattern:** Type '' does not satisfy the constraint ''.
**Count:** 10

```
.next/types/app/api/admin/dashboard/route.ts(12,13): error TS2344: Type 'OmitWithTag<typeof import("/Users/laneyfraass/hive_ui/apps/web/src/app/api/admin/dashboard/route"), "POST" | "PATCH" | "DELETE" | "PUT" | "GET" | "config" | "dynamic" | "generateStaticParams" | ... 7 more ... | "OPTIONS", "">' does not satisfy the constraint '{ [x: string]: never; }'.
.next/types/app/api/admin/rituals/[ritualId]/route.ts(49,7): error TS2344: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
.next/types/app/api/admin/rituals/[ritualId]/route.ts(244,7): error TS2344: Type '{ __tag__: "DELETE"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
.next/types/app/api/admin/rituals/[ritualId]/route.ts(283,7): error TS2344: Type '{ __tag__: "PATCH"; __param_position__: "second"; __param_type__: { params: { ritualId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
.next/types/app/api/profile-v2/[userId]/route.ts(49,7): error TS2344: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: { params: { userId: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
... and 5 more
```

### TS2740 (8 errors)


**Pattern:** Type '' is missing the following properties from type '': id, parent, path, listDocuments, and 2 more.
**Count:** 8

```
src/app/api/spaces/[spaceId]/events/route.ts(70,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(72,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(76,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/events/route.ts(79,5): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
src/app/api/spaces/[spaceId]/posts/route.ts(85,7): error TS2740: Type 'Query<DocumentData, DocumentData>' is missing the following properties from type 'CollectionReference<DocumentData, DocumentData>': id, parent, path, listDocuments, and 2 more.
... and 3 more
```

### TS7031 (8 errors)


**Pattern:** Binding element '' implicitly has an '' type.
**Count:** 8

```
src/app/rituals/[ritualId]/page.tsx(174,26): error TS7031: Binding element 'resetErrorBoundary' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(363,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(401,36): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(442,38): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
src/components/admin/feed-algorithm-control.tsx(484,38): error TS7031: Binding element 'newValue' implicitly has an 'any' type.
... and 3 more
```

### TS2741 (6 errors)


**Pattern:** Property '' is missing in type '' but required in type ''.
**Count:** 6

```
src/app/spaces/page.tsx(272,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(295,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(319,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/app/spaces/page.tsx(344,19): error TS2741: Property 'members' is missing in type 'SpaceRecommendation' but required in type 'SpaceCardData'.
src/lib/api-client-resilient.ts(348,5): error TS2741: Property 'hasMore' is missing in type '{ spaces: never[]; total: number; }' but required in type 'SpacesListResponse'.
... and 1 more
```

### TS2365 (5 errors)


**Pattern:** Operator '' cannot be applied to types '' and ''.
**Count:** 5

```
src/app/api/admin/campus-expansion/route.ts(663,45): error TS2365: Operator '+' cannot be applied to types 'number' and '{}'.
src/app/api/admin/campus-expansion/route.ts(703,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(706,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(709,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
src/app/api/admin/campus-expansion/route.ts(712,7): error TS2365: Operator '<' cannot be applied to types 'Record<string, number>' and 'number'.
```

### TS2538 (4 errors)


**Pattern:** Type '' cannot be used as an index type.
**Count:** 4

```
src/app/api/admin/campus-expansion/route.ts(841,12): error TS2538: Type '{}' cannot be used as an index type.
src/app/api/admin/campus-expansion/route.ts(841,29): error TS2538: Type '{}' cannot be used as an index type.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(97,53): error TS2538: Type 'undefined' cannot be used as an index type.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(99,31): error TS2538: Type 'undefined' cannot be used as an index type.
```

### TS2559 (4 errors)


**Pattern:** Type '' has no properties in common with type ''.
**Count:** 4

```
src/app/api/feed/aggregation/route.ts(472,52): error TS2559: Type '{ id: string; createdAt: string; }' has no properties in common with type '{ type?: string | undefined; title?: string | undefined; content?: string | undefined; metadata?: Record<string, unknown> | undefined; toolId?: string | undefined; }'.
src/app/api/profile/privacy/route.ts(149,49): error TS2559: Type '"Privacy settings updated"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
src/app/api/profile/v2/route.ts(410,84): error TS2559: Type '"No updates"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
src/app/api/profile/v2/route.ts(415,47): error TS2559: Type '"Profile updated"' has no properties in common with type '{ message?: string | undefined; status?: number | undefined; meta?: Partial<{ total?: number | undefined; page?: number | undefined; limit?: number | undefined; timestamp: string; } | undefined>; }'.
```

### TS2769 (4 errors)


**Pattern:** No overload matches this call.
**Count:** 4

```
src/app/api/feed/aggregation/route.ts(773,43): error TS2769: No overload matches this call.
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(88,39): error TS2769: No overload matches this call.
src/app/feed/page-new.tsx(378,52): error TS2769: No overload matches this call.
src/app/feed/page-new.tsx(379,48): error TS2769: No overload matches this call.
```

### TS2352 (4 errors)


**Pattern:** Conversion of type '' to type '' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to '' first.
**Count:** 4

```
src/app/api/profile/v2/route.ts(231,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/app/api/profile/v2/route.ts(237,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/app/api/profile/v2/route.ts(244,23): error TS2352: Conversion of type '{ empty: true; docs: never[]; }' to type 'QuerySnapshot<DocumentData, DocumentData>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
src/lib/feed-aggregation.ts(189,32): error TS2352: Conversion of type '{ id: string; spaceId: string; authorId: string; type: string; content: string; toolShareMetadata: { toolId: string; toolName: string; shareType: string; }; reactions: { heart: number; }; reactedUsers: { ...; }; ... 5 more ...; updatedAt: Date; }' to type 'Post' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

### TS2448 (3 errors)


**Pattern:** Block-scoped variable '' used before its declaration.
**Count:** 3

```
middleware.ts(118,9): error TS2448: Block-scoped variable 'hasSession' used before its declaration.
middleware.ts(118,23): error TS2448: Block-scoped variable 'session' used before its declaration.
middleware.ts(119,56): error TS2448: Block-scoped variable 'session' used before its declaration.
```

### TS2307 (3 errors)


**Pattern:** Cannot find module '' or its corresponding type declarations.
**Count:** 3

```
src/components/landing/Landing.tsx(19,34): error TS2307: Cannot find module '../layout/GradientBackdrop' or its corresponding type declarations.
src/components/landing/Landing.tsx(20,27): error TS2307: Cannot find module '../layout/Container' or its corresponding type declarations.
src/components/landing/Landing.tsx(21,25): error TS2307: Cannot find module '../layout/Section' or its corresponding type declarations.
```

### TS2362 (2 errors)


**Pattern:** The left-hand side of an arithmetic operation must be of type '', '', '' or an enum type.
**Count:** 2

```
src/app/api/admin/campus-expansion/route.ts(667,10): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
src/app/api/admin/campus-expansion/route.ts(826,21): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

### TS18046 (2 errors)


**Pattern:** '' is of type ''.
**Count:** 2

```
src/app/api/feed/aggregation/route.ts(816,20): error TS18046: 'item.content' is of type 'unknown'.
src/app/api/feed/aggregation/route.ts(816,48): error TS18046: 'item.content' is of type 'unknown'.
```

### TS2484 (2 errors)


**Pattern:** Export declaration conflicts with exported declaration of ''.
**Count:** 2

```
src/lib/error-reporting.ts(246,15): error TS2484: Export declaration conflicts with exported declaration of 'ErrorReport'.
src/lib/error-reporting.ts(246,28): error TS2484: Export declaration conflicts with exported declaration of 'ErrorMetrics'.
```

### TS2454 (1 errors)


**Pattern:** Variable '' is used before being assigned.
**Count:** 1

```
middleware.ts(118,9): error TS2454: Variable 'hasSession' is used before being assigned.
```

### TS2349 (1 errors)


**Pattern:** This expression is not callable.
**Count:** 1

```
src/app/api/profile/route.ts(53,25): error TS2349: This expression is not callable.
```

### TS2464 (1 errors)


**Pattern:** A computed property name must be of type '', '', '', or ''.
**Count:** 1

```
src/app/api/spaces/[spaceId]/posts/[postId]/reactions/route.ts(157,22): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
```

### TS2783 (1 errors)


**Pattern:** '' is specified more than once, so this usage will be overwritten.
**Count:** 1

```
src/app/api/tools/[toolId]/share/route.ts(223,9): error TS2783: 'id' is specified more than once, so this usage will be overwritten.
```

### TS1345 (1 errors)


**Pattern:** An expression of type '' cannot be tested for truthiness.
**Count:** 1

```
src/app/profile/settings/page.tsx(238,11): error TS1345: An expression of type 'void' cannot be tested for truthiness.
```

### TS2698 (1 errors)


**Pattern:** Spread types may only be created from object types.
**Count:** 1

```
src/lib/api-response-types.ts(70,7): error TS2698: Spread types may only be created from object types.
```

### TS2564 (1 errors)


**Pattern:** Property '' has no initializer and is not definitely assigned in the constructor.
**Count:** 1

```
src/lib/cache/redis-client.ts(157,11): error TS2564: Property 'client' has no initializer and is not definitely assigned in the constructor.
```

### TS2552 (1 errors)


**Pattern:** Cannot find name ''. Did you mean ''?
**Count:** 1

```
src/lib/realtime-optimization.ts(455,13): error TS2552: Cannot find name 'firebaseRealtimeService'. Did you mean 'sseRealtimeService'?
```

### TS2411 (1 errors)


**Pattern:** Property ''Authorization'' of type '' is not assignable to '' index type ''.
**Count:** 1

```
src/lib/secure-auth-utils.ts(14,3): error TS2411: Property ''Authorization'' of type 'string | undefined' is not assignable to 'string' index type 'string'.
```
