"use client";

import type { ReactNode } from "react";

import { Button } from "../../00-Global/atoms/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../00-Global/atoms/sheet";
import { RailWidget } from "./rail-widget";

export interface TodayDrawerProps {
  trigger?: ReactNode;
}

export function TodayDrawer({ trigger }: TodayDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="secondary" type="button">
            Today
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[70vh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Today</SheetTitle>
          <SheetDescription>
            Quick access to now, widgets, and upcoming.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <RailWidget
            variant="eventNow"
            title="Club Meeting"
            description={"UB Robotics \u2013 North Campus"}
            ctaLabel="Details"
          />
          <RailWidget
            variant="action"
            title="Submit RSVP"
            description="Tonight at 7pm"
          />
          <RailWidget
            variant="progress"
            title="Onboarding"
            progress={60}
            ctaLabel="Resume"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
