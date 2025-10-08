// Campus Context System
export {
  CampusProvider,
  useCampusContext,
  useCampusLocation,
  useCampusCommunity,
  useCampusTemporal,
  useCampusTools
} from './campus-context'

export type {
  CampusContextValue,
  CampusLocation,
  CampusProximityData,
  CampusActivityStream,
  UpcomingCampusEvent,
  ToolSuggestion,
  Tool,
  CampusProviderProps
} from './campus-context'

// Specialized context providers
export {
  SliceContextProvider,
  useSliceContext,
  useFeedContext,
  useSpacesContext,
  useProfileContext,
  useHiveLabContext
} from './slice-context'

export type {
  SliceContextValue,
  FeedSliceContext,
  SpacesSliceContext,
  ProfileSliceContext,
  HiveLabSliceContext
} from './slice-context'