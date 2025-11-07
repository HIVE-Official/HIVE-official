"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ToolPreviewPage } from "../../../../../../../packages/ui/src/pages/hivelab/ToolPreviewPage";
import type { ToolComposition } from "@/lib/element-system";
import { useFeatureFlags } from "@hive/hooks";
import { useAuth } from "@hive/auth-logic";
import { ToolRuntime } from "@/components/tools/tool-runtime";
import { ToolNavigation } from "@/lib/tool-navigation";

// Mock composition (replace with real fetch)
const MOCK_TOOL_COMPOSITION: ToolComposition = {
  id: 'poll-maker',
  name: 'Poll Maker',
  description: 'Create interactive polls for spaces and events',
  elements: [
    {
      elementId: 'form-builder',
      instanceId: 'poll-form',
      config: {
        fields: [
          { name: 'question', type: 'text', label: 'Poll Question', placeholder: 'What should we order for lunch?', required: true },
          { name: 'option1', type: 'text', label: 'Option 1', placeholder: 'Pizza', required: true },
          { name: 'option2', type: 'text', label: 'Option 2', placeholder: 'Sandwiches', required: true },
          { name: 'option3', type: 'text', label: 'Option 3 (optional)', placeholder: 'Salads', required: false },
        ],
        validateOnChange: true,
        showProgress: false,
      },
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 },
    },
    {
      elementId: 'filter-selector',
      instanceId: 'poll-settings',
      config: {
        options: [
          { value: 'anonymous', label: 'Allow Anonymous Voting' },
          { value: 'show_results', label: 'Show Results After Voting' },
          { value: 'multiple_choice', label: 'Allow Multiple Choices' },
        ],
        allowMultiple: true,
        showCounts: false,
      },
      position: { x: 420, y: 0 },
      size: { width: 300, height: 150 },
    },
    {
      elementId: 'result-list',
      instanceId: 'poll-preview',
      config: { itemsPerPage: 10, showPagination: false, cardStyle: 'compact' },
      position: { x: 420, y: 170 },
      size: { width: 300, height: 130 },
    },
  ],
  connections: [
    { from: { instanceId: 'poll-form', output: 'formData' }, to: { instanceId: 'poll-preview', input: 'items' } },
    { from: { instanceId: 'poll-settings', output: 'selectedFilters' }, to: { instanceId: 'poll-form', input: 'settings' } },
  ],
  layout: 'grid',
};

export default function ToolPreviewRoutePage() {
  const params = useParams();
  const flags = useFeatureFlags();
  const { user } = useAuth();
  const [composition] = useState<ToolComposition>(MOCK_TOOL_COMPOSITION);

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-preview', toolId: params.toolId });
  }, [flags, params.toolId]);

  return (
    <ToolPreviewPage
      composition={composition}
      initialMode="preview"
      onBack={() => ToolNavigation.goBack('marketplace')}
      onEdit={() => ToolNavigation.editTool(composition.id)}
      onRun={() => ToolNavigation.toRun(composition.id)}
      onOpenSettings={() => ToolNavigation.toSettings(composition.id)}
      renderRuntime={(comp, mode) => (
        <ToolRuntime
          composition={comp}
          userId={user?.uid || 'anonymous'}
          mode={mode}
          onExecutionResult={() => undefined}
          onError={() => undefined}
        />
      )}
    />
  );
}
