import type { Meta, StoryObj } from '@storybook/react';
import { FirebaseErrorBoundary as ErrorBoundary } from '../../components/error-boundary';
declare const meta: Meta<typeof ErrorBoundary>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const BuilderContext: Story;
export declare const MinimalFallback: Story;
export declare const DetailedError: Story;
export declare const WorkingComponent: Story;
export declare const ToolCompositionError: Story;
export declare const SpaceLoadingError: Story;
export declare const NetworkError: Story;
export declare const InteractiveDemo: Story;
//# sourceMappingURL=error-boundary.stories.d.ts.map