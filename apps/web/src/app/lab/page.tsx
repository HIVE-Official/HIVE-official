// Bounded Context Owner: HiveLab Guild
// Leaders-only Space picker (UI scaffold). In v1, Lab opens in a Space context.
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";

const DEMO_SPACES = [
  { id: "space-robotics", name: "Robotics Club", desc: "Projects • Meets Wed 6pm" },
  { id: "space-greek-life", name: "Greek Life Council", desc: "Chairs • Events • Rosters" },
  { id: "space-residential-north", name: "Residential North", desc: "Halls • Weeklies • Move-in" },
];

export default function LabEntryPage(): JSX.Element {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">HiveLab — pick a Space</h1>
        <p className="text-muted-foreground">
          HiveLab runs inside a Space. Choose where you want to build.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DEMO_SPACES.map((s) => (
          <Link key={s.id} href={`/lab/${s.id}`}>
            <Card className="transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle>{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
