// Bounded Context Owner: Community Guild
import { getCatalogPresentation, buildCatalogResponse } from "../../server/spaces/service";
import { SpacesPageClient, type SpacesCatalogState } from "../../components/spaces/SpacesPageClient";
import { CatalogPresentationSchema, ClientSpaceSchema } from "../../components/spaces/space-schemas";
import { Flags } from "../../server/flags";
import { seedSpaceSnapshots } from "../../server/spaces/fixtures";
import { cookies } from "next/headers";

const viewerId = "profile-jwrhineh";
const campusId = "ub-buffalo";

export default async function SpacesPage() {
  const cookieStore = await cookies();
  const demoEnabled =
    cookieStore.get("ff.demo.spaces")?.value === "1" ||
    process.env.NEXT_PUBLIC_DEMO_SPACES === "true" ||
    process.env.NEXT_PUBLIC_DEMO_SPACES === "1" ||
    Flags.demoSpaces();

  const catalogRaw = demoEnabled
    ? await buildCatalogResponse(
        {
          all: seedSpaceSnapshots,
          joined: seedSpaceSnapshots.slice(0, 1),
          recommended: seedSpaceSnapshots.slice(1)
        } as unknown as Parameters<typeof buildCatalogResponse>[0],
        viewerId
      )
    : await getCatalogPresentation({ campusId, profileId: viewerId });
  // Validate and coerce the catalog into client-safe shapes
  const catalog = CatalogPresentationSchema.parse(catalogRaw);

  const initialCatalog: SpacesCatalogState = {
    joined: catalog.joined.map((s) => ClientSpaceSchema.parse(s)),
    discover: catalog.discover.map((s) => ClientSpaceSchema.parse(s)),
    recommended: catalog.recommended.map((s) => ClientSpaceSchema.parse(s)),
    sections: catalog.sections.map((section) => ({
      id: section.id,
      title: section.title,
      description: section.description,
      spaces: section.spaces.map((s) => ClientSpaceSchema.parse(s))
    })),
    filters: catalog.filters
  };

  const isEmpty =
    initialCatalog.joined.length === 0 &&
    initialCatalog.discover.length === 0 &&
    initialCatalog.recommended.length === 0;
  // demoEnabled already computed

  return (
    <>
      {isEmpty && !demoEnabled ? (
        <div className="container mx-auto max-w-6xl px-4 pt-6">
          <div className="rounded-md border border-border bg-card p-4 flex items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              No spaces found. Load demo content to start building.
            </div>
            <a
              className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm"
              href={"/__feature?name=demo.spaces&value=1&redirect=/spaces"}
            >
              Load demo data
            </a>
          </div>
        </div>
      ) : null}
      <SpacesPageClient viewerId={viewerId} campusId={campusId} initialCatalog={initialCatalog} />
    </>
  );
}
export const dynamic = "force-dynamic";
