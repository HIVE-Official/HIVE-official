import * as UI from "@hive/ui";
import Link from "next/link";
import { MotionDemo } from "../../components/motion-demo";

export default function HiveLabPage(): JSX.Element {
  return (
    <div className="page px-page py-section">
      <div className="container-page max-w-5xl space-y-6">
        <UI.Card className="p-6 space-y-3">
          <UI.CardTitle className="text-xl font-semibold">HiveLab sandbox</UI.CardTitle>
          <UI.CardDescription className="text-sm text-muted-foreground">
            Prototype the canvas shell, tools rail, and editor primitives here before wiring them to Firestore.
          </UI.CardDescription>
          <UI.Button asChild className="focus-ring">
            <Link href="/hivelab/canvas">Open Canvas demo</Link>
          </UI.Button>
        </UI.Card>
        <UI.Card className="p-0 overflow-hidden">
          <UI.CardHeader className="px-6 pt-6 pb-2">
            <UI.CardTitle>Canvas preview</UI.CardTitle>
            <UI.CardDescription>Drop new HiveLab components here to validate motion & spacing.</UI.CardDescription>
          </UI.CardHeader>
          <UI.CardContent className="px-6 pb-6">
            <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/20 p-6">
              <MotionDemo />
            </div>
          </UI.CardContent>
        </UI.Card>
      </div>
    </div>
  );
}
