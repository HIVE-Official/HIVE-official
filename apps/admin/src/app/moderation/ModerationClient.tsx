"use client";

import React from "react";
import { ModerationLiveList, type ModerationItemUI } from "./ModerationLiveList";
import { ModerationPreviewSheet } from "./ModerationPreviewSheet";

export function ModerationClient({ initialItems }: { initialItems: readonly ModerationItemUI[] }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  return (
    <>
      <ModerationLiveList initial={initialItems} onOpen={(id) => setOpenId(id)} />
      <ModerationPreviewSheet id={openId} onClose={() => setOpenId(null)} />
    </>
  );
}

