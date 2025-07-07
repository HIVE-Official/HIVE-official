"use client";
import React from "react";
// import { Button } from "@hive/ui";
// import { Card, CardContent } from "@hive/ui";
// import { Textarea } from "@hive/ui";

interface CreatePostProps {
  _spaceId: string;
  _onPostCreated: () => void;
}

export function CreatePost({ _spaceId, _onPostCreated }: CreatePostProps) {
  return (
    <div>
      <h2>Create Post</h2>
    </div>
  );
}
