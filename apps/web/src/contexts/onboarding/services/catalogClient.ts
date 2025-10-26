// Bounded Context Owner: Identity & Access Management Guild
import type {
  InterestOption,
  MajorOption,
  ResidentialSpaceOption
} from "@core";

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T;
  return data;
};

export interface CatalogResponse {
  readonly majors: MajorOption[];
  readonly interests: InterestOption[];
  readonly residentialSpaces: ResidentialSpaceOption[];
}

export const catalogClient = {
  async fetchCatalog(): Promise<CatalogResponse> {
    const response = await globalThis.fetch("/api/catalog", {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to load catalog");
    }

    return parseJson<CatalogResponse>(response);
  }
};
