// Template Deployment System - Bridge between campus templates and working tools
import { ToolComposition } from './element-system';
import { CampusToolTemplate, CAMPUS_TOOL_TEMPLATES } from './campus-tools-templates';

export interface DeploymentRequest {
  templateId: string;
  userId: string;
  spaceId?: string;
  customizations?: {
    name?: string;
    description?: string;
    elementConfigs?: Record<string, any>;
  };
  socialSettings: {
    shareToFeed: boolean;
    notifySpace: boolean;
    allowPublicAccess: boolean;
  };
}

export interface DeployedTool {
  id: string;
  templateId: string;
  userId: string;
  spaceId?: string;
  name: string;
  description: string;
  composition: ToolComposition;
  socialSettings: DeploymentRequest['socialSettings'];
  createdAt: string;
  isActive: boolean;
  usageCount: number;
  shareableLink: string;
}

export class TemplateDeploymentService {
  
  /**
   * Deploy a campus tool template as a working tool
   */
  static async deployTemplate(request: DeploymentRequest): Promise<DeployedTool> {
    // Get the template
    const template = CAMPUS_TOOL_TEMPLATES.find(t => t.id === request.templateId);
    if (!template) {
      throw new Error(`Template ${request.templateId} not found`);
    }

    // Apply customizations to the template
    const customizedComposition = this.applyCustomizations(template, request.customizations);
    
    // Create the deployed tool
    const deployedTool: DeployedTool = {
      id: `deployed_${Date.now()}_${request.userId}`,
      templateId: request.templateId,
      userId: request.userId,
      spaceId: request.spaceId,
      name: request.customizations?.name || template.name,
      description: request.customizations?.description || template.description,
      composition: customizedComposition,
      socialSettings: request.socialSettings,
      createdAt: new Date().toISOString(),
      isActive: true,
      usageCount: 0,
      shareableLink: `/tools/run/${Date.now()}`
    };

    // Save to backend
    await this.saveDeployedTool(deployedTool);

    // Create social content if requested
    if (request.socialSettings.shareToFeed) {
      await this.createSocialContent(deployedTool, template);
    }

    // Send space notifications
    if (request.socialSettings.notifySpace && request.spaceId) {
      await this.notifySpace(deployedTool, request.spaceId);
    }

    return deployedTool;
  }

  /**
   * Get a deployed tool by ID
   */
  static async getDeployedTool(deploymentId: string): Promise<DeployedTool | null> {
    try {
      const response = await fetch(`/api/tools/deploy/${deploymentId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  /**
   * List deployed tools for a user
   */
  static async getUserDeployedTools(userId: string): Promise<DeployedTool[]> {
    try {
      const response = await fetch(`/api/tools/personal?userId=${userId}`);
      if (!response.ok) return [];
      const data = await response.json();
      return data.deployedTools || [];
    } catch {
      return [];
    }
  }

  /**
   * Execute a deployed tool action
   */
  static async executeToolAction(deploymentId: string, action: string, payload: any) {
    const response = await fetch('/api/tools/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deploymentId,
        action,
        data: payload,
        context: { timestamp: Date.now() }
      })
    });

    if (!response.ok) {
      throw new Error(`Tool execution failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Apply user customizations to template
   */
  private static applyCustomizations(
    template: CampusToolTemplate, 
    customizations?: DeploymentRequest['customizations']
  ): ToolComposition {
    if (!customizations) {
      return { ...template };
    }

    const composition = { ...template };

    // Apply element config overrides
    if (customizations.elementConfigs) {
      composition.elements = composition.elements.map(element => {
        const customConfig = customizations.elementConfigs?.[element.instanceId];
        if (customConfig) {
          return {
            ...element,
            config: { ...element.config, ...customConfig }
          };
        }
        return element;
      });
    }

    return composition;
  }

  /**
   * Save deployed tool to backend
   */
  private static async saveDeployedTool(deployedTool: DeployedTool): Promise<void> {
    const response = await fetch('/api/tools/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployedTool)
    });

    if (!response.ok) {
      throw new Error('Failed to save deployed tool');
    }
  }

  /**
   * Create social media content for deployed tool
   */
  private static async createSocialContent(deployedTool: DeployedTool, template: CampusToolTemplate): Promise<void> {
    const socialContent = {
      type: 'tool_created',
      content: `Just created a ${template.name} tool! ${this.getSocialMessage(template)}`,
      toolId: deployedTool.id,
      templateId: template.id,
      shareableLink: deployedTool.shareableLink,
      metadata: {
        category: template.category,
        viralPotential: template.viralPotential,
        campusSpecific: true
      }
    };

    // Post to user's feed
    await fetch('/api/feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorId: deployedTool.userId,
        content: socialContent.content,
        type: 'tool_share',
        metadata: socialContent.metadata,
        attachments: [{
          type: 'tool_link',
          url: deployedTool.shareableLink,
          title: deployedTool.name,
          description: deployedTool.description
        }]
      })
    });
  }

  /**
   * Generate viral social messages based on template type
   */
  private static getSocialMessage(template: CampusToolTemplate): string {
    const messages = {
      'study-group-signup': 'Who wants to ace this next exam together? 📚',
      'food-order-coordinator': 'Splitting costs and delivery - who\'s in? 🍕',
      'event-rsvp-manager': 'Planning something epic - come through! 🎉',
      'ride-share-organizer': 'Need a ride or offering one? Let\'s coordinate! 🚗',
      'textbook-exchange': 'Save money on textbooks with other UB students! 💰'
    };
    
    return messages[template.id as keyof typeof messages] || 'Check out this useful tool I made!';
  }

  /**
   * Notify space members about new tool
   */
  private static async notifySpace(deployedTool: DeployedTool, spaceId: string): Promise<void> {
    await fetch('/api/spaces/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spaceId,
        type: 'new_tool',
        message: `New tool available: ${deployedTool.name}`,
        actionUrl: deployedTool.shareableLink,
        metadata: {
          toolId: deployedTool.id,
          creatorId: deployedTool.userId
        }
      })
    });
  }
}

// Quick deployment presets for common scenarios
export const DEPLOYMENT_PRESETS = {
  personal: {
    shareToFeed: false,
    notifySpace: false,
    allowPublicAccess: false
  },
  space_shared: {
    shareToFeed: true,
    notifySpace: true,
    allowPublicAccess: true
  },
  viral: {
    shareToFeed: true,
    notifySpace: true,
    allowPublicAccess: true
  }
} as const;

// Template preview for showing users what they'll get
export function getTemplatePreview(templateId: string) {
  const template = CAMPUS_TOOL_TEMPLATES.find(t => t.id === templateId);
  if (!template) return null;

  return {
    name: template.name,
    description: template.description,
    category: template.category,
    estimatedSetupTime: '2-3 minutes',
    expectedUsage: template.viralPotential === 'very-high' ? 'High engagement expected' :
                   template.viralPotential === 'high' ? 'Good engagement expected' :
                   'Moderate usage expected',
    campusFeatures: template.ubSpecific.locations ? 
      `Pre-loaded with ${template.ubSpecific.locations.length} UB locations` : 
      'Campus-optimized',
    socialImpact: template.socialIntegration.feedPost ? 
      'Will be shared to your network' : 
      'Private tool',
    elements: template.elements.length,
    examples: this.getTemplateExamples(templateId)
  };
}

// Usage examples for templates
function getTemplateExamples(templateId: string): string[] {
  const examples = {
    'study-group-signup': [
      'CSE 115 Final Exam Study Session',
      'MTH 141 Homework Group',
      'PHY 107 Lab Report Collaboration'
    ],
    'food-order-coordinator': [
      'Ellicott Chipotle Group Order',
      'Late Night Pizza for Floor',
      'Governors Complex Grocery Run'
    ],
    'event-rsvp-manager': [
      'Floor Movie Night',
      'Study Break Gaming Session',
      'Weekend Downtown Trip'
    ],
    'ride-share-organizer': [
      'Airport Trip for Break',
      'Wegmans Shopping Run',
      'Downtown Buffalo Exploration'
    ],
    'textbook-exchange': [
      'Selling CSE 115 Textbook',
      'Looking for MTH 141 Solutions Manual',
      'Trading Chemistry Lab Manual'
    ]
  };

  return examples[templateId as keyof typeof examples] || ['Custom tool usage'];
}