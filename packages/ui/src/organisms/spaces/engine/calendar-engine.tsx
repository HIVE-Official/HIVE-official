// Bounded Context Owner: Spaces Domain Guild
// Calendar engine adapter contract. A lightweight mock implementation is provided.

import * as React from "react";
import type { CalendarEvent } from "../types";

export type CalendarEngineView = "day" | "week";

export type CalendarEngineProps = {
  view: CalendarEngineView;
  events: readonly CalendarEvent[];
  timeStepMinutes?: number; // slot size, default 30
  startHour?: number; // 0-23
  endHour?: number; // 1-24
  currentDate?: Date; // base date for day/week
  onSelectSlot?: (range: { start: Date; end: Date }) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
  className?: string;
};

export type CalendarEngineComponent = React.FC<CalendarEngineProps>;
