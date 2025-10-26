// Bounded Context Owner: Engagement Guild
import { getFeedForProfile } from "../../server/feed/service";
import { FeedList } from "../../components/feed/FeedList";

const viewerId = "profile-jwrhineh";
const campusId = "ub-buffalo";

export default async function FeedPage() {
  const items = await getFeedForProfile({ campusId, profileId: viewerId, limit: 20 });
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">Your Feed</h1>
      <FeedList items={items} />
    </div>
  );
}
export const dynamic = "force-dynamic";
