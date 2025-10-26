// Bounded Context Owner: Rituals Guild
import { listRitualsForProfile } from "../../server/rituals/service";
import { RitualList } from "../../components/rituals/RitualList";

const viewerId = "profile-jwrhineh";

export default async function RitualsPage() {
  const rituals = await listRitualsForProfile(viewerId);
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">Rituals</h1>
      <RitualList rituals={rituals} />
    </div>
  );
}
