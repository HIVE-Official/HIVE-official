"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompleteHIVEToolsSystem } from "@hive/ui";
import { ToolDeployModal } from "../../../../../packages/ui/src/components/hivelab/ToolDeployModal";
type ToolDeploymentTarget = { id: string; name: string; type: 'profile' | 'space'; description?: string; permissions?: string[] };
type ToolDeploymentConfig = {
  targetType: 'profile' | 'space';
  targetId: string;
  surface?: string;
  permissions: { canInteract: boolean; canView: boolean; canEdit: boolean; allowedRoles?: string[] };
  settings: { showInDirectory: boolean; allowSharing: boolean; collectAnalytics: boolean; notifyOnInteraction: boolean };
};
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "../../hooks/use-session";
import { ErrorBoundary } from "../../components/error-boundary";
import { ToolsLoadingSkeleton } from "@hive/ui";
import { logger } from "@/lib/logger";
import {
  MessageSquare,
  Timer,
  Calculator,
  BarChart3,
  Calendar,
  Car,
} from "lucide-react";

// Type definition for fetch headers
type HeadersInit = Record<string, string>;

// Enhanced tools fetch with consolidated auth
async function fetchMarketplaceTools(): Promise<any[]> {
  const response = await apiClient.get("/api/tools/browse");
  if (!response.ok) throw new Error(`Failed to fetch marketplace tools: ${response.status}`);
  const data = await response.json();
  return data.tools || [];
}

async function fetchPersonalTools(): Promise<any[]> {
  const response = await apiClient.get("/api/tools/personal");
  if (!response.ok) throw new Error(`Failed to fetch personal tools: ${response.status}`);
  const data = await response.json();
  return data.tools || [];
}

// Import campus-specific templates and deployment system
import { CAMPUS_TOOL_TEMPLATES } from "../../lib/campus-tools-templates";
import {
  TemplateDeploymentService,
  DEPLOYMENT_PRESETS,
} from "../../lib/template-deployment";

// Convert campus templates to marketplace format
const CAMPUS_MARKETPLACE_TOOLS = CAMPUS_TOOL_TEMPLATES.map((template) => ({
  id: template.id,
  name: template.name,
  description: template.description,
  category: template.category,
  type: "template" as const,
  icon:
    template.category === "academic"
      ? Calculator
      : template.category === "social"
      ? MessageSquare
      : template.category === "events"
      ? Calendar
      : template.category === "services"
      ? Car
      : BarChart3,
  color:
    template.category === "academic"
      ? "var(--hive-status-success)"
      : template.category === "social"
      ? "var(--hive-status-info)"
      : template.category === "events"
      ? "var(--hive-status-warning)"
      : template.category === "services"
      ? "var(--hive-status-info)"
      : "var(--hive-text-secondary)",
  downloads:
    template.viralPotential === "very-high"
      ? Math.floor(Math.random() * 500) + 200
      : template.viralPotential === "high"
      ? Math.floor(Math.random() * 300) + 100
      : Math.floor(Math.random() * 150) + 50,
  rating: 4.5 + Math.random() * 0.5,
  ratingCount: Math.floor(Math.random() * 50) + 20,
  creator: "UB Students",
  creatorType: "community" as const,
  tags: [template.category, "campus", "ub"],
  version: "1.0.0",
  lastUpdated: new Date(),
  isFeatured: template.viralPotential === "very-high",
  isVerified: true,
  isInstalled: false,
  isPremium: false,
  supportedPlatforms: ["web", "mobile"] as const,
  requiredPermissions: ["spaces.read", "spaces.write"],
  viralPotential: template.viralPotential,
  ubSpecific: template.ubSpecific,
}));

// Legacy marketplace tools for comparison
const MARKETPLACE_TOOLS = [
  {
    id: "poll-maker",
    name: "Poll Maker",
    description: "Create interactive polls for spaces and events",
    category: "social" as const,
    type: "individual" as const,
    icon: MessageSquare,
    color: "var(--hive-status-info)",
    downloads: 1247,
    rating: 4.8,
    ratingCount: 89,
    creator: "HIVE Team",
    creatorType: "hive_team" as const,
    tags: ["polling", "engagement", "voting"],
    version: "2.1.0",
    lastUpdated: new Date("2024-01-15"),
    isFeatured: true,
    isVerified: true,
    isInstalled: true,
    isPremium: false,
    supportedPlatforms: ["web", "mobile"] as const,
    requiredPermissions: ["spaces.read", "spaces.write"],
  },
  {
    id: "study-timer",
    name: "Study Timer",
    description: "Pomodoro-style timer with focus tracking",
    category: "productivity" as const,
    type: "individual" as const,
    icon: Timer,
    color: "var(--hive-brand-primary)",
    downloads: 892,
    rating: 4.6,
    ratingCount: 67,
    creator: "Focus Labs",
    creatorType: "organization" as const,
    tags: ["timer", "productivity", "study"],
    version: "1.5.2",
    lastUpdated: new Date("2024-01-10"),
    isFeatured: true,
    isVerified: true,
    isInstalled: false,
    isPremium: false,
    supportedPlatforms: ["web", "mobile", "desktop"] as const,
    requiredPermissions: ["notifications"],
  },
  {
    id: "grade-calculator",
    name: "Grade Calculator",
    description: "Calculate GPA and track academic progress",
    category: "academic" as const,
    type: "individual" as const,
    icon: Calculator,
    color: "var(--hive-status-warning)",
    downloads: 2156,
    rating: 4.9,
    ratingCount: 234,
    creator: "Academic Tools",
    creatorType: "student" as const,
    tags: ["grades", "gpa", "academic"],
    version: "3.0.1",
    lastUpdated: new Date("2024-01-08"),
    isFeatured: false,
    isVerified: true,
    isInstalled: true,
    isPremium: false,
    supportedPlatforms: ["web", "mobile"] as const,
    requiredPermissions: ["profile.read"],
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Track and visualize your space engagement",
    category: "productivity" as const,
    type: "individual" as const,
    icon: BarChart3,
    color: "var(--hive-status-success)",
    downloads: 543,
    rating: 4.7,
    ratingCount: 45,
    creator: "HIVE Team",
    creatorType: "hive_team" as const,
    tags: ["analytics", "dashboard", "metrics"],
    version: "1.2.0",
    lastUpdated: new Date("2024-01-12"),
    isFeatured: true,
    isVerified: true,
    isInstalled: false,
    isPremium: true,
    supportedPlatforms: ["web"] as const,
    requiredPermissions: ["analytics.read", "spaces.read"],
  },
];

// Unified Tools Section per @hive.md: Marketplace, Personal Tools, and HiveLab
export default function ToolsPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "marketplace" | "personal" | "hivelab"
  >("marketplace");
  const [deployOpen, setDeployOpen] = useState(false);
  const [deployTool, setDeployTool] = useState<{ id: string; name: string } | null>(null);

  const { user: _user } = useSession();
  const { toast } = useToast();

  // Temporarily using default flags while fixing React context issue
  const flags = useMemo(
    () => ({
      trackEvent: (_feature: string, _action: string, _metadata?: any) => {
        logger.debug("Track event", {
          category: 'tools',
          action: _action,
          metadata: _metadata,
        });
      },
    }),
    []
  );

  useEffect(() => {
    setIsClient(true);
    // Track page view
    flags.trackEvent("tools", "view", { page: "tools-marketplace" });
  }, [flags]);

  const {
    data: marketplaceTools,
    isLoading: marketplaceLoading,
    error: marketplaceError,
  } = useQuery({
    queryKey: ["marketplace-tools"],
    queryFn: fetchMarketplaceTools,
    staleTime: 300000, // 5 minutes
    enabled: isClient && activeTab === "marketplace",
  });

  const {
    data: personalTools,
    isLoading: personalLoading,
    error: personalError,
  } = useQuery({
    queryKey: ["personal-tools"],
    queryFn: fetchPersonalTools,
    staleTime: 300000, // 5 minutes
    enabled: isClient && activeTab === "personal",
  });

  const isLoading = marketplaceLoading || personalLoading;
  const error = marketplaceError || personalError;

  const handleTabChange = (tab: "marketplace" | "personal" | "hivelab") => {
    setActiveTab(tab);
    flags.trackEvent("tools", "tab_change", { tab });
  };

  const handleToolInstall = async (toolId: string) => {
    try {
      const tool = [...CAMPUS_MARKETPLACE_TOOLS, ...MARKETPLACE_TOOLS].find(
        (t) => t.id === toolId
      );
      if (!tool) {
        throw new Error("Tool not found");
      }

      // Check if this is a campus template
      const isCampusTemplate = CAMPUS_TOOL_TEMPLATES.some(
        (t) => t.id === toolId
      );

      if (isCampusTemplate) {
        // Deploy campus template as working tool
        const deploymentRequest = {
          templateId: toolId,
          userId: _user?.id || "anonymous",
          socialSettings: DEPLOYMENT_PRESETS.space_shared, // Default to viral sharing
        };

        const deployedTool = await TemplateDeploymentService.deployTemplate(
          deploymentRequest
        );

        flags.trackEvent("tools", "template_deploy", {
          toolId,
          templateId: deployedTool.templateId,
          viralPotential: 'viralPotential' in tool ? (tool as any).viralPotential : 'high',
        });

        // Show success with link to use the tool
        toast({
          title: `${tool.name} created! 🎉`,
          description: 'Share with friends to get the most value',
          type: 'success',
          duration: 4000
        });

        // Navigate to the deployed tool
        window.location.href = `/tools/${deployedTool.id}/run`;
      } else {
        // Legacy tool installation
        const sessionData = window.localStorage.getItem("hive_session");
        const authToken = sessionData ? "session-token" : "test-token";

        const response = await fetch("/api/tools/install", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ toolId }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Installation failed (${response.status})`
          );
        }

        flags.trackEvent("tools", "install", { toolId });
        toast({
          title: 'Tool installed!',
          description: `${tool.name} is now ready to use`,
          type: 'success',
          duration: 3000
        });
      }
    } catch (error) {
      logger.error("Failed to install tool", {
        toolId,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      const errorMessage =
        error instanceof Error ? error.message : "Failed to install tool";
      toast({
        title: 'Installation failed',
        description: errorMessage,
        type: 'error',
        duration: 5000
      });
    }
  };

  const handleToolPreview = (toolId: string) => {
    flags.trackEvent("tools", "preview", { toolId });
    // Navigate to tool preview page
    window.location.href = `/tools/${toolId}/preview`;
  };

  const handleToolAction = (toolId: string, action: string) => {
    flags.trackEvent("tools", "action", { toolId, action });

    switch (action) {
      case "edit":
        window.location.href = `/tools/${toolId}/edit`;
        break;
      case "run":
        window.location.href = `/tools/${toolId}/run`;
        break;
      case "settings":
        window.location.href = `/tools/${toolId}/settings`;
        break;
      case "share": {
        navigator.clipboard.writeText(
          `${window.location.origin}/tools/${toolId}`
        );
        toast({
          title: 'Link copied!',
          description: 'Tool link copied to clipboard',
          type: 'success',
          duration: 2000
        });
        break;
      }
      default:
        logger.warn("Unknown tool action", { action });
    }
  };

  const handleCreateTool = (
    mode: "visual" | "template" | "wizard" = "visual"
  ) => {
    flags.trackEvent("tools", "create_start", { mode });
    // Navigate to HiveLab with mode parameter
    window.location.href = `/hivelab?mode=${mode}`;
  };

  const [targets, setTargets] = useState<ToolDeploymentTarget[]>([]);

  // Load eligible space targets for deployments
  useEffect(() => {
    let cancel = false;
    (async () => {
      if (!_user?.id) return;
      const base: ToolDeploymentTarget[] = [{ id: _user.id, name: 'My Profile', type: 'profile', description: 'Deploy to your personal profile' }];
      try {
        const res = await apiClient.get('/api/spaces/mine?roles=builder,admin');
        if (res.ok) {
          const data = await res.json();
          const spaceTargets: ToolDeploymentTarget[] = (data.spaces || []).map((s: any) => ({ id: s.id, name: s.name, type: 'space', description: `Deploy to ${s.name}` }));
          if (!cancel) setTargets([...base, ...spaceTargets]);
        } else {
          if (!cancel) setTargets(base);
        }
      } catch {
        if (!cancel) setTargets(base);
      }
    })();
    return () => { cancel = true; };
  }, [_user?.id]);

  const handleToolSelect = (tool: any) => {
    setDeployTool({ id: tool.id, name: tool.name });
    setDeployOpen(true);
  };

  const handleDeploy = async (config: ToolDeploymentConfig) => {
    if (!deployTool) return;
    try {
      const res = await apiClient.post("/api/tools/deploy", {
        toolId: deployTool.id,
        deployTo: config.targetType,
        targetId: config.targetId,
        surface: config.surface,
        permissions: config.permissions,
        settings: config.settings,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Failed to deploy tool (${res.status})`);
      }
      setDeployOpen(false);
      flags.trackEvent("tools", "deploy_success", {
        toolId: deployTool.id,
        targetType: config.targetType,
      });
      toast({
        title: "Tool deployed",
        description: `${deployTool.name} is live. Viewing analytics...`,
        type: "success",
        duration: 3000,
      });
      window.location.href = `/tools/${deployTool.id}/analytics`;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Deployment failed";
      toast({ title: "Deployment failed", description: message, type: "error", duration: 5000 });
    }
  };

  // Show loading skeleton while data is being fetched
  if (isLoading || !isClient) {
    return <ToolsLoadingSkeleton />;
  }

  return (
    <ErrorBoundary>
      <CompleteHIVEToolsSystem
        tools={
          marketplaceTools || [
            ...CAMPUS_MARKETPLACE_TOOLS,
            ...MARKETPLACE_TOOLS,
          ]
        }
        onToolSelect={handleToolSelect}
        onToolCreate={handleCreateTool}
        showCreateButton={true}
        showSearch={true}
        showFilters={true}
        className="w-full"
      />
      {deployTool && (
        <ToolDeployModal
          open={deployOpen}
          onOpenChange={setDeployOpen}
          toolName={deployTool.name}
          availableTargets={targets}
          onDeploy={handleDeploy}
        />
      )}
    </ErrorBoundary>
  );
}
