// Bounded Context Owner: Community Guild
import { SpaceCreateForm } from "../../../components/spaces/SpaceCreateForm";

const viewerId = "profile-jwrhineh";
const campusId = "ub-buffalo";

export default function CreateSpacePage(): JSX.Element {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <SpaceCreateForm viewerId={viewerId} campusId={campusId} />
    </div>
  );
}
