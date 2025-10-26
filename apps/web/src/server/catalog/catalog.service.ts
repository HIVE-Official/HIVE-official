// Bounded Context Owner: Identity & Access Management Guild
import {
  interestOptions as fallbackInterestOptions,
  majorOptions as fallbackMajorOptions,
  residentialSpaceOptions as fallbackResidentialSpaceOptions,
  type InterestOption,
  type MajorOption,
  type ResidentialSpaceOption
} from "@core";
import { firebaseFirestore } from "@hive/firebase";

export interface CatalogSnapshot {
  readonly majors: MajorOption[];
  readonly interests: InterestOption[];
  readonly residentialSpaces: ResidentialSpaceOption[];
}

const fallbackCatalog: CatalogSnapshot = {
  majors: fallbackMajorOptions,
  interests: fallbackInterestOptions,
  residentialSpaces: fallbackResidentialSpaceOptions
};

export const fetchCatalogSnapshot = async (): Promise<CatalogSnapshot> => {
  try {
    const firestore = firebaseFirestore();
    const doc = await firestore.collection("catalog").doc("onboarding").get();

    if (!doc.exists) {
      return fallbackCatalog;
    }

    const data = doc.data() as Partial<CatalogSnapshot>;

    return {
      majors: Array.isArray(data?.majors) && data.majors.length > 0 ? data.majors : fallbackMajorOptions,
      interests:
        Array.isArray(data?.interests) && data.interests.length > 0
          ? data.interests
          : fallbackInterestOptions,
      residentialSpaces:
        Array.isArray(data?.residentialSpaces) && data.residentialSpaces.length > 0
          ? data.residentialSpaces
          : fallbackResidentialSpaceOptions
    };
  } catch (error) {
    console.warn("Falling back to local catalog snapshot", error);
    return fallbackCatalog;
  }
};
