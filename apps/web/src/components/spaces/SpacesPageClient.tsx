// Bounded Context Owner: Community Guild
"use client";

import { useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import type { SpaceType } from "@core";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text
} from "@hive/ui";
import { useRouter } from "next/navigation";
import { ClientSpaceSchema } from "./space-schemas";

interface ClientMembership {
  readonly role: string | null;
}

export interface ClientSpace {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly memberCount: number;
  readonly membership: ClientMembership | null;
  readonly type: string;
  readonly visibility: string;
  readonly tagline: string | null;
  readonly accentIcon: string | null;
  readonly pattern: string | null;
  readonly onlineNow: number;
  readonly activityScore: number;
  readonly urgency: string;
}

export interface ClientSpaceSection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly spaces: readonly ClientSpace[];
}

export interface ClientFilter {
  readonly id: string;
  readonly label: string;
  readonly count: number;
}

export interface SpacesCatalogState {
  readonly joined: readonly ClientSpace[];
  readonly discover: readonly ClientSpace[];
  readonly recommended: readonly ClientSpace[];
  readonly sections: readonly ClientSpaceSection[];
  readonly filters: readonly ClientFilter[];
}

const SPACE_TYPE_LABELS: Record<SpaceType, string> = {
  student_organization: "Student Organization",
  university_organization: "University Organization",
  greek_life: "Greek Life",
  residential: "Residential Community"
};

const formatSpaceType = (type: string) =>
  SPACE_TYPE_LABELS[type as SpaceType] ?? type.replace(/_/g, " ");

const mapApiToClient = (payload: unknown): ClientSpace => ClientSpaceSchema.parse(payload);

interface SpacesPageClientProps {
  readonly viewerId: string;
  readonly campusId: string;
  readonly initialCatalog: SpacesCatalogState;
}

const updateSectionsWithSpace = (
  sections: readonly ClientSpaceSection[],
  updatedSpace: ClientSpace
) =>
  sections.map((section) => ({
    ...section,
    spaces: section.spaces.map((space) =>
      space.id === updatedSpace.id ? updatedSpace : space
    )
  }));

export function SpacesPageClient({ viewerId, campusId, initialCatalog }: SpacesPageClientProps): JSX.Element {
  const [catalog, setCatalog] = useState<SpacesCatalogState>(initialCatalog);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const joinedCount = catalog.joined.length;

  const handleFilterSelect = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleJoin = (spaceId: string) => {
    startTransition(async () => {
      const response = await fetch("/api/spaces/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId, profileId: viewerId, campusId })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      const isSuccess = (v: unknown): v is { success: true; data: unknown } =>
        typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      if (!isSuccess(json)) {
        return;
      }

      const updatedSpace = mapApiToClient(json.data);

      setCatalog((prev) => {
        const filteredJoined = prev.joined.filter((space) => space.id !== updatedSpace.id);
        const filteredRecommended = prev.recommended.filter((space) => space.id !== updatedSpace.id);
        const updatedDiscover = prev.discover.map((space) =>
          space.id === updatedSpace.id
            ? { ...updatedSpace, membership: { role: updatedSpace.membership?.role ?? "member" } }
            : space
        );

        return {
          joined: [{ ...updatedSpace, membership: { role: updatedSpace.membership?.role ?? "member" } }, ...filteredJoined],
          recommended: filteredRecommended,
          discover: updatedDiscover,
          sections: updateSectionsWithSpace(prev.sections, updatedSpace),
          filters: prev.filters
        };
      });
    });
  };

  const handleLeave = (spaceId: string) => {
    startTransition(async () => {
      const response = await fetch("/api/spaces/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId, profileId: viewerId })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      const isSuccess = (v: unknown): v is { success: true; data: unknown } =>
        typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      if (!isSuccess(json)) {
        return;
      }

      const updatedSpace = mapApiToClient(json.data);

      setCatalog((prev) => {
        const updatedJoined = prev.joined.filter((space) => space.id !== spaceId);
        const updatedDiscover = prev.discover.map((space) =>
          space.id === spaceId
            ? {
                ...updatedSpace,
                membership: null
              }
            : space
        );

        return {
          joined: updatedJoined,
          recommended: [{ ...updatedSpace, membership: null }, ...prev.recommended.filter((space) => space.id !== spaceId)],
          discover: updatedDiscover,
          sections: updateSectionsWithSpace(prev.sections, updatedSpace),
          filters: prev.filters
        };
      });
    });
  };

  const filteredDiscover = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return catalog.discover.filter((space) => {
      const matchesFilter =
        activeFilter === "all" || space.type === activeFilter || space.visibility === activeFilter;

      const matchesQuery =
        query.length === 0 ||
        space.name.toLowerCase().includes(query) ||
        space.description.toLowerCase().includes(query) ||
        space.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesFilter && matchesQuery;
    });
  }, [catalog.discover, searchQuery, activeFilter]);

  const discoverCount = filteredDiscover.length;

  const renderSpaceCard = (space: ClientSpace, actions: ReactNode) => (
    <Card key={space.id} className="border-border/70 bg-card/90 overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ background: space.pattern ?? "linear-gradient(90deg, rgba(148,163,184,0.4) 0%, rgba(100,116,139,0.4) 100%)" }}
      />
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            {space.accentIcon ? <span className="text-base">{space.accentIcon}</span> : null}
            {space.name}
          </span>
          <Badge variant="outline">{space.memberCount} members</Badge>
        </CardTitle>
        {space.tagline ? <Text variant="muted" className="text-sm">{space.tagline}</Text> : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="bg-muted/40 text-xs">
            Online {space.onlineNow}
          </Badge>
          <Badge variant="outline" className="bg-muted/40 text-xs capitalize">
            {formatSpaceType(space.type)}
          </Badge>
          <Badge variant="outline" className="bg-muted/40 text-xs capitalize">
            {space.urgency} urgency
          </Badge>
        </div>
        <Text variant="muted" className="text-sm">
          {space.description}
        </Text>
        <div className="flex flex-wrap gap-2">
          {space.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">{actions}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Spaces</h1>
            <p className="text-muted-foreground">
              Discover panic rooms, study squads, and support circles tailored for your campus.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">{joinedCount} joined</Badge>
            <Button
              size="sm"
              onClick={() => router.push("/spaces/create")}
              disabled={isPending}
            >
              Create Space
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Search spaces by name, tag, or need..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="md:max-w-sm"
          />
          <div className="flex gap-2 overflow-x-auto">
            {catalog.filters.map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={activeFilter === filter.id ? "secondary" : "ghost"}
                onClick={() => handleFilterSelect(filter.id)}
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="joined" className="space-y-6">
        <TabsList>
          <TabsTrigger value="joined">Joined ({joinedCount})</TabsTrigger>
          <TabsTrigger value="discover">Discover ({discoverCount})</TabsTrigger>
          <TabsTrigger value="recommended">Recommended ({catalog.recommended.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="joined">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {catalog.joined.map((space) =>
              renderSpaceCard(
                space,
                <>
                  <Button size="sm" variant="secondary" onClick={() => router.push(`/spaces/${space.id}`)}>
                    Open
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLeave(space.id)}
                    disabled={isPending}
                  >
                    Leave
                  </Button>
                </>
              )
            )}
            {catalog.joined.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  You haven't joined any spaces yet.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-8">
          {searchQuery.length === 0 && activeFilter === "all" ? (
            <div className="space-y-8">
              {catalog.sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setSearchQuery(section.title)}>
                      Explore
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.spaces.map((space) =>
                      renderSpaceCard(
                        space,
                        <>
                          {space.membership ? (
                            <Button size="sm" variant="secondary" disabled>
                              Joined
                            </Button>
                          ) : (
                            <Button size="sm" onClick={() => handleJoin(space.id)} disabled={isPending}>
                              Join
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => router.push(`/spaces/${space.id}`)}>
                            Preview
                          </Button>
                        </>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{discoverCount} spaces match your filters.</span>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredDiscover.map((space) =>
                renderSpaceCard(
                  space,
                  <>
                    {space.membership ? (
                      <Button size="sm" variant="secondary" disabled>
                        Joined
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleJoin(space.id)} disabled={isPending}>
                        Join
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => router.push(`/spaces/${space.id}`)}>
                      Preview
                    </Button>
                  </>
                )
              )}
              {filteredDiscover.length === 0 && (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No spaces match that search yet. Want to create one?
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {catalog.recommended.map((space) =>
              renderSpaceCard(
                space,
                <>
                  <Button size="sm" onClick={() => handleJoin(space.id)} disabled={isPending}>
                    Join
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => router.push(`/spaces/${space.id}`)}>
                    Preview
                  </Button>
                </>
              )
            )}
            {catalog.recommended.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  You're fully plugged in! Explore Discover for more spaces.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
