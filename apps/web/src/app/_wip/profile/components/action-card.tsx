"use client";

import React from "react";
// import { Button } from "@hive/ui";

export function ActionCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
}
