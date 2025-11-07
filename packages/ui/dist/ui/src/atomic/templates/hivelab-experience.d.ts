import { type HiveLabModePlaceholderProps } from './hivelab-mode-placeholder';
import { type HiveLabMode, type HiveLabOverviewProps } from './hivelab-overview';
import { type VisualToolComposerProps } from '@/components/hivelab/visual-tool-composer';
export type HiveLabView = 'overview' | HiveLabMode;
type ModeCopy = Record<Exclude<HiveLabMode, 'visual'>, Pick<HiveLabModePlaceholderProps, 'badge' | 'title' | 'description' | 'helper'>>;
export interface HiveLabExperienceProps {
    initialMode?: HiveLabView;
    overviewConfig?: HiveLabOverviewProps;
    modeCopy?: ModeCopy;
    composerProps?: Partial<VisualToolComposerProps>;
    userId?: string;
    onModeChange?: (mode: HiveLabView) => void;
}
export declare const HiveLabExperience: React.FC<HiveLabExperienceProps>;
export {};
//# sourceMappingURL=hivelab-experience.d.ts.map