import { logger } from '@/lib/logger';

/**
 * Tool Navigation Helper
 * Provides consistent navigation patterns throughout the HIVE tool system
 */

export interface ToolNavigationOptions {
  toolId?: string;
  mode?: 'visual' | 'template' | 'wizard';
  template?: string;
  preserveState?: boolean;
}

export class ToolNavigation {
  /**
   * Navigate to tool marketplace
   */
  static toMarketplace() {
    window.location.href = '/tools';
  }

  /**
   * Navigate to tool builder
   */
  static toBuild(options: ToolNavigationOptions = {}) {
    const params = new URLSearchParams();
    
    if (options.toolId) params.set('tool', options.toolId);
    if (options.mode) params.set('mode', options.mode);
    if (options.template) params.set('template', options.template);
    
    const url = `/build${params.toString() ? '?' + params.toString() : ''}`;
    
    if (options.preserveState) {
      history.pushState(null, '', url);
    } else {
      window.location.href = url;
    }
  }

  /**
   * Navigate to tool preview
   */
  static toPreview(toolId: string, openInNewTab = false) {
    const url = `/tools/${toolId}/preview`;
    
    if (openInNewTab) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }

  /**
   * Navigate to tool deployment
   */
  static toDeploy(toolId: string) {
    window.location.href = `/tools/${toolId}/deploy`;
  }

  /**
   * Navigate to tool settings
   */
  static toSettings(toolId: string) {
    window.location.href = `/tools/${toolId}/settings`;
  }

  /**
   * Navigate to tool analytics
   */
  static toAnalytics(toolId: string) {
    window.location.href = `/tools/${toolId}/analytics`;
  }

  /**
   * Navigate to tool run/use page
   */
  static toRun(toolId: string) {
    window.location.href = `/tools/${toolId}/run`;
  }

  /**
   * Create a new tool from template
   */
  static createFromTemplate(templateId: string, mode: 'visual' | 'template' | 'wizard' = 'template') {
    this.toBuild({ template: templateId, mode });
  }

  /**
   * Edit an existing tool
   */
  static editTool(toolId: string, mode: 'visual' | 'template' | 'wizard' = 'visual') {
    this.toBuild({ toolId, mode });
  }

  /**
   * Duplicate a tool
   */
  static duplicateTool(toolId: string) {
    this.toBuild({ template: toolId, mode: 'visual' });
  }

  /**
   * Share a tool
   */
  static async shareTool(toolId: string, toolName: string) {
    const shareUrl = `${window.location.origin}/tools/${toolId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `HIVE Tool: ${toolName}`,
          text: `Check out this tool on HIVE`,
          url: shareUrl,
        });
        return true;
      } catch (error) {
        // Fallback to clipboard if sharing fails
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch (error) {
      logger.error('Failed to copy to clipboard:', { error: String(error) });
      return false;
    }
  }

  /**
   * Get the current tool context from URL
   */
  static getCurrentContext(): {
    page: 'marketplace' | 'build' | 'preview' | 'deploy' | 'settings' | 'analytics' | 'run' | 'unknown';
    toolId?: string;
    mode?: string;
    template?: string;
  } {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (path === '/tools') {
      return { page: 'marketplace' };
    }

    if (path === '/build') {
      return {
        page: 'build',
        toolId: params.get('tool') || undefined,
        mode: params.get('mode') || undefined,
        template: params.get('template') || undefined,
      };
    }

    const toolMatch = path.match(/^\/tools\/([^/]+)\/(\w+)$/);
    if (toolMatch) {
      const [, toolId, action] = toolMatch;
      
      switch (action) {
        case 'preview':
          return { page: 'preview', toolId };
        case 'deploy':
          return { page: 'deploy', toolId };
        case 'settings':
          return { page: 'settings', toolId };
        case 'analytics':
          return { page: 'analytics', toolId };
        case 'run':
          return { page: 'run', toolId };
        default:
          return { page: 'unknown', toolId };
      }
    }

    return { page: 'unknown' };
  }

  /**
   * Go back in tool workflow with fallback
   */
  static goBack(fallbackTo: 'marketplace' | 'build' = 'marketplace') {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      switch (fallbackTo) {
        case 'marketplace':
          this.toMarketplace();
          break;
        case 'build':
          this.toBuild();
          break;
      }
    }
  }
}

export default ToolNavigation;