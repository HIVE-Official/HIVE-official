"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { ShieldCheck } from "lucide-react";
import type { TileProps } from "../grid/types";

export const IdentityHero: React.FC<TileProps> = ({
  user,
  isEditing = false,
}) => {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card
      className="flex h-full items-center justify-start p-6"
      hoverable={!isEditing}
    >
      <Avatar className="h-20 w-20 mr-6">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
        <p className="text-md text-muted-foreground">@{user.handle}</p>
        {user.isBuilder && (
          <Badge className="mt-3 w-fit border-amber-400/50 bg-amber-900/30 text-amber-300">
            <ShieldCheck className="h-4 w-4 mr-1.5" />
            Builder
          </Badge>
        )}
      </div>
    </Card>
  );
};
