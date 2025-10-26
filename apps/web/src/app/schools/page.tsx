// Bounded Context Owner: Identity & Access Management Guild
import { CampusRegistry } from "@core";
import { SchoolsPage } from "../../components/schools/SchoolsPage";

export default function Page(): JSX.Element {
  const campuses = CampusRegistry.list();
  return <SchoolsPage campuses={campuses} />;
}

