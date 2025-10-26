// Bounded Context Owner: Governance Guild
import { Card, Button } from "@hive/ui";

export default function NotAuthorized() {
  const webLoginUrl = process.env.NEXT_PUBLIC_WEB_LOGIN_URL || "http://localhost:3000/login";
  return (
    <main className="p-6">
      <Card className="p-6">
        <h1 className="text-h4 font-h4 mb-2">Not authorized</h1>
        <p className="text-body text-muted-foreground mb-4">
          You need an administrator account to access the HIVE control panel.
        </p>
        <div>
          <a href={webLoginUrl}>
            <Button variant="default">Go to sign in</Button>
          </a>
        </div>
      </Card>
    </main>
  );
}
