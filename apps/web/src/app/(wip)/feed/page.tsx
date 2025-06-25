import { type Metadata } from "next";
import { MainFeed } from "@hive/ui";

export const metadata: Metadata = {
  title: "Feed | HIVE",
  description: "Your personalized feed of campus activity",
};

export default function FeedPage() {
  return (
    <main className="flex-1">
      <MainFeed />
    </main>
  );
}
