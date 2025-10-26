// Bounded Context Owner: HiveLab Guild
import { redirect } from "next/navigation";

export default function LabToolHomeRedirect({ params }: { params: { spaceId: string; toolId: string } }) {
  const { spaceId, toolId } = params;
  redirect(`/lab/${spaceId}?toolId=${encodeURIComponent(toolId)}`);
}

