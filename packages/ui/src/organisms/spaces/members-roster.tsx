"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * MembersRoster - Full members list with filtering and bulk actions
 *
 * Features:
 * - Search by name or handle
 * - Filter by role (all/leaders/moderators/members)
 * - Sort by join date, activity, name
 * - Bulk actions (promote, remove) for leaders
 * - Individual member actions (promote, remove, block)
 */

import React, { useState, useMemo } from "react";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { AvatarCard } from "../../molecules/avatar-card";
import { Input } from "../../atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/card";
import { cn } from "../../utils/cn";
import type { SpaceMember, MemberRole } from "./types";
import {
  Users,
  Search,
  ArrowUpDown,
  Filter,
  UserPlus,
} from "lucide-react";
import { format } from "date-fns";

export interface MembersRosterProps {
  /** Space members */
  members: SpaceMember[];

  /** Total member count (may exceed members.length for pagination) */
  totalCount: number;

  /** Current user's role (for permission checks) */
  currentUserRole: MemberRole;

  /** Member click handler (view profile) */
  onMemberClick?: (member: SpaceMember) => void;

  /** Promote member handler (leaders only) */
  onPromoteMember?: (userId: string, newRole: MemberRole) => void;

  /** Remove member handler (leaders only) */
  onRemoveMember?: (userId: string) => void;

  /** Block member handler (leaders only) */
  onBlockMember?: (userId: string) => void;

  /** Invite member handler (leaders only) */
  onInviteMember?: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;
}

type SortOption = "name" | "joined" | "role";
type FilterRole = "all" | "leader" | "moderator" | "member";

export const MembersRoster = React.forwardRef<
  HTMLDivElement,
  MembersRosterProps
>(
  (
    {
      members,
      totalCount,
      currentUserRole,
      onMemberClick,
      onPromoteMember,
      onRemoveMember,
      onBlockMember,
      onInviteMember,
      isLoading = false,
      className,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState<FilterRole>("all");
    const [sortBy, setSortBy] = useState<SortOption>("joined");
    const [sortAscending, setSortAscending] = useState(false);

    const isLeader =
      currentUserRole === "leader" || currentUserRole === "moderator";

    // Filter and sort members
    const filteredMembers = useMemo(() => {
      let result = members;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (m) =>
            m.fullName.toLowerCase().includes(query) ||
            m.handle.toLowerCase().includes(query)
        );
      }

      // Role filter
      if (filterRole !== "all") {
        result = result.filter((m) => m.role === filterRole);
      }

      // Sort
      result = [...result].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
          comparison = a.fullName.localeCompare(b.fullName);
        } else if (sortBy === "joined") {
          comparison =
            new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
        } else if (sortBy === "role") {
          const roleOrder = { leader: 0, moderator: 1, member: 2, follower: 3 };
          comparison = roleOrder[a.role] - roleOrder[b.role];
        }
        return sortAscending ? comparison : -comparison;
      });

      return result;
    }, [members, searchQuery, filterRole, sortBy, sortAscending]);

    const toggleSort = (option: SortOption) => {
      if (sortBy === option) {
        setSortAscending(!sortAscending);
      } else {
        setSortBy(option);
        setSortAscending(false);
      }
    };

    return (
      <Card ref={ref} className={cn("bg-card border-border", className)}>
        <CardHeader className="space-y-4">
          {/* Header: Title + invite */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-h3 font-h3">Members</CardTitle>
              <Badge variant="outline">{totalCount.toLocaleString()}</Badge>
            </div>
            {isLeader && onInviteMember && (
              <Button
                onClick={onInviteMember}
                variant="default"
                size="sm"
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Invite
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members by name or handle..."
              className="pl-9"
            />
          </div>

          {/* Filters and sort */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Role filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {(["all", "leader", "moderator", "member"] as const).map(
                  (role) => (
                    <Button
                      key={role}
                      onClick={() => setFilterRole(role)}
                      variant={filterRole === role ? "default" : "ghost"}
                      size="sm"
                      className="capitalize"
                    >
                      {role}
                    </Button>
                  )
                )}
              </div>
            </div>

            <div className="flex-1" />

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Button
                onClick={() => toggleSort("name")}
                variant={sortBy === "name" ? "default" : "ghost"}
                size="sm"
              >
                Name
              </Button>
              <Button
                onClick={() => toggleSort("role")}
                variant={sortBy === "role" ? "default" : "ghost"}
                size="sm"
              >
                Role
              </Button>
              <Button
                onClick={() => toggleSort("joined")}
                variant={sortBy === "joined" ? "default" : "ghost"}
                size="sm"
              >
                Joined
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Members grid - portrait mode cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMembers.map((member) => {
          const metadata = `Joined ${format(
            new Date(member.joinedAt),
            "MMM d, yyyy"
          )}${
            member.graduationYear
              ? ` • Class of ${member.graduationYear}`
              : ""
          }`;

          return (
            <AvatarCard
              key={member.userId}
              id={member.userId}
              name={member.fullName}
              handle={member.handle}
              avatarUrl={member.avatarUrl}
              role={member.role}
              metadata={metadata}
              showRoleBadge={true}
              onClick={() => onMemberClick?.(member)}
              variant="default"
              action={isLeader && onPromoteMember ? {
                label: "Promote",
                onClick: () => onPromoteMember(member.userId, member.role === "member" ? "moderator" : "leader"),
                variant: "outline",
              } : undefined}
            />
          );
        })}
      </div>

          {/* Empty state */}
          {filteredMembers.length === 0 && (
            <div className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-body font-body text-muted-foreground mb-2">
                No members found
              </p>
              <p className="text-body-sm font-body-sm text-muted-foreground">
                {searchQuery || filterRole !== "all"
                  ? "Try adjusting your filters"
                  : "Members will appear here once they join"}
              </p>
            </div>
          )}

          {/* Load more (if paginated) */}
          {filteredMembers.length < totalCount && (
            <Button variant="ghost" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : `Load more (${
                    totalCount - filteredMembers.length
                  } remaining)`}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
);

MembersRoster.displayName = "MembersRoster";
