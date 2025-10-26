// Bounded Context Owner: Identity & Access Management Guild
import majorsData from "./majors.json";
import residentialSpacesData from "./residential-spaces.json";
import interestsData from "./interests.json";

export interface MajorOption {
  readonly id: string;
  readonly name: string;
  readonly college: string;
}

export interface ResidentialSpaceOption {
  readonly spaceId: string;
  readonly name: string;
  readonly campus: string;
  readonly cta: string;
}

export interface InterestOption {
  readonly id: string;
  readonly label: string;
  readonly category?: string;
}

export const majorOptions = majorsData as MajorOption[];
export const residentialSpaceOptions = residentialSpacesData as ResidentialSpaceOption[];
export const interestOptions = interestsData as InterestOption[];
