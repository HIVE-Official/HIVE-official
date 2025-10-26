import * as UI from "@hive/ui";

export default function FeedPage(): JSX.Element {
  return (
    <div className="page px-page py-section">
      <div className="container-page max-w-4xl space-y-4">
        <UI.Card className="p-6">
          <UI.CardTitle className="text-xl font-semibold">Feed (Prototype)</UI.CardTitle>
          <UI.CardDescription>
            Use this surface to test feed UI modules before integrating into the production app. Swap this section with
            real components as they become available.
          </UI.CardDescription>
        </UI.Card>
        <UI.Card className="p-6">
          <UI.CardTitle className="text-lg font-medium">Example Post Slot</UI.CardTitle>
          <UI.CardDescription className="mb-4 text-sm text-muted-foreground">
            Replace this with the real feed card organism to verify timeline spacing, interactions, and motion.
          </UI.CardDescription>
          <UI.Button variant="secondary" className="focus-ring">Add experimental card</UI.Button>
        </UI.Card>
      </div>
    </div>
  );
}

