import type { HiveLabOverviewProps, HiveLabMode } from './hivelab-overview';
import type { HiveLabModePlaceholderProps } from './hivelab-mode-placeholder';
export declare const hiveLabOverviewMock: HiveLabOverviewProps;
type PlaceholderConfig = Pick<HiveLabModePlaceholderProps, 'badge' | 'title' | 'description' | 'helper'>;
export declare const hiveLabModeCopy: Record<Exclude<HiveLabMode, 'visual'>, PlaceholderConfig>;
export {};
//# sourceMappingURL=hivelab-mock-data.d.ts.map