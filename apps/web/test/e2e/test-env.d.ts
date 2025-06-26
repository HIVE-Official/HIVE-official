import type { BaseAnalyticsEvent } from './types'
import type { ToolBuilderEvent } from './types/tool-builder'

declare global {
  interface Window {
    analyticsEvents: (BaseAnalyticsEvent | ToolBuilderEvent)[]
  }
}

export {} 