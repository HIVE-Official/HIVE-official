import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test'
import { setupTestUser, cleanupTestData } from './helpers/test-setup'
import type { TestTool, TestElement as _TestElement, ElementConfig } from './types/tool-builder'

// Mock element type
interface MockElement {
  id: string;
  elementId: string;
  config: ElementConfig;
  position: { x: number; y: number };
  order: number;
  isVisible: boolean;
  isLocked: boolean;
}

// Extend window interface for mock properties
declare global {
  interface Window {
    __mockToolElements: MockElement[]
    __mockElementError: boolean
    __mockSlowRender: boolean
  }
}

// Test data
const TEST_TOOL: TestTool = {
  name: 'Test Tool',
  description: 'Test description'
};

// Mock elements data
const MOCK_ELEMENTS: MockElement[] = Array.from({ length: 50 }, (_, i) => ({
  id: `element_${i}`,
  elementId: 'textBlock-v1',
  config: { text: `Element ${i}` },
  position: { x: 100, y: 100 + i * 30 },
  order: i,
  isVisible: true,
  isLocked: false,
}));

// Helper functions
async function _loginTestUser(page: Page) {
  await page.goto('/auth/login')
  await page.fill('[data-testid="email-input"]', 'test@example.com')
  await page.click('[data-testid="login-button"]')
  await page.waitForURL('/profile')
}

async function createNewTool(page: Page, toolData: TestTool = TEST_TOOL) {
  await page.goto('/tools/create')
  await page.fill('[data-testid="tool-name-input"]', toolData.name)
  await page.fill('[data-testid="tool-description-input"]', toolData.description)
  await page.click('[data-testid="create-tool-button"]')
  await page.waitForURL(/\/tools\/[a-zA-Z0-9]+\/edit/)
}

async function simulateNetworkError(page: Page, url: string, errorCode = 500) {
  await page.route(url, route => {
    route.fulfill({
      status: errorCode,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Network error' })
    })
  })
}

async function simulateSlowNetwork(page: Page, url: string, delay = 5000) {
  await page.route(url, async route => {
    await new Promise(resolve => setTimeout(resolve, delay))
    await route.continue()
  })
}

test.describe('Tool Builder - Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestUser(page)
  })

  test.afterEach(async ({ page }) => {
    await cleanupTestData(page)
  })

  test('should handle tool creation failure', async ({ page }) => {
    // Simulate API failure
    await simulateNetworkError(page, '/api/tools', 500)
    
    await page.goto('/tools/create')
    await page.fill('[data-testid="tool-name-input"]', TEST_TOOL.name)
    await page.click('[data-testid="create-tool-button"]')
    
    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Failed to create tool')
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
    
    // Should allow retry
    await page.unroute('/api/tools')
    await page.click('[data-testid="retry-button"]')
    await page.waitForURL(/\/tools\/[a-zA-Z0-9]+\/edit/)
  })

  test('should handle tool loading failure', async ({ page }) => {
    await createNewTool(page)
    const toolUrl = page.url()
    
    // Simulate tool fetch failure
    await simulateNetworkError(page, '/api/tools/*', 404)
    
    await page.goto(toolUrl)
    
    // Should show tool not found error
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Tool not found')
    await expect(page.locator('[data-testid="back-to-tools"]')).toBeVisible()
  })

  test('should handle element library loading failure', async ({ page }) => {
    // Simulate elements API failure
    await simulateNetworkError(page, '/api/elements', 500)
    
    await createNewTool(page)
    
    // Should show element library error
    await expect(page.locator('[data-testid="element-library-error"]')).toContainText('Failed to load elements')
    await expect(page.locator('[data-testid="retry-elements"]')).toBeVisible()
    
    // Should allow retry
    await page.unroute('/api/elements')
    await page.click('[data-testid="retry-elements"]')
    await expect(page.locator('[data-testid="element-textBlock"]')).toBeVisible()
  })

  test('should handle save failures gracefully', async ({ page }) => {
    await createNewTool(page)
    
    // Add an element
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Simulate save failure
    await simulateNetworkError(page, '/api/tools/*', 500)
    
    // Trigger manual save
    await page.click('[data-testid="save-button"]')
    
    // Should show save error
    await expect(page.locator('[data-testid="save-error"]')).toContainText('Failed to save')
    await expect(page.locator('[data-testid="unsaved-changes"]')).toBeVisible()
    
    // Should retry automatically
    await page.unroute('/api/tools/*')
    await page.waitForSelector('[data-testid="save-success"]')
  })

  test('should handle publish validation errors', async ({ page }) => {
    await createNewTool(page)
    
    // Try to publish empty tool
    await page.click('[data-testid="publish-button"]')
    
    // Should show validation error
    await expect(page.locator('[data-testid="validation-error"]')).toContainText('Tool must have at least one element')
    await expect(page.locator('[data-testid="publish-button"]')).toBeDisabled()
    
    // Add element and try again
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    await expect(page.locator('[data-testid="publish-button"]')).toBeEnabled()
  })

  test('should handle element configuration validation', async ({ page }) => {
    await createNewTool(page)
    await page.dragAndDrop('[data-testid="element-textInput"]', '[data-testid="design-canvas"]')
    
    // Select element and open properties
    await page.click('[data-testid="canvas-element-textInput"]')
    
    // Enter invalid configuration
    await page.fill('[data-testid="property-maxLength"]', '-1')
    await page.keyboard.press('Enter')
    
    // Should show validation error
    await expect(page.locator('[data-testid="property-error"]')).toContainText('must be greater than 0')
    
    // Should not apply invalid config
    const element = page.locator('[data-testid="canvas-element-textInput"]')
    await expect(element).not.toHaveAttribute('maxlength', '-1')
  })

  test('should handle drag and drop errors', async ({ page }) => {
    await createNewTool(page)
    
    // Try to drag element to invalid location
    const element = page.locator('[data-testid="element-textBlock"]')
    const invalidTarget = page.locator('[data-testid="properties-panel"]')
    
    await element.dragTo(invalidTarget)
    
    // Should show error message
    await expect(page.locator('[data-testid="drop-error"]')).toContainText('Cannot drop element here')
    
    // Element should not be added to canvas
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).not.toBeVisible()
  })

  test('should handle element limit exceeded', async ({ page }) => {
    await createNewTool(page)
    
    // Mock tool with maximum elements
    await page.evaluate((mockElements) => {
      window.__mockToolElements = mockElements
    }, MOCK_ELEMENTS)
    
    // Try to add another element
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Should show limit error
    await expect(page.locator('[data-testid="limit-error"]')).toContainText('Maximum element limit reached')
    await expect(page.locator('[data-testid="element-count"]')).toContainText('50/50 elements')
  })

  test('should handle slow element loading', async ({ page }) => {
    await createNewTool(page)
    
    // Simulate slow element loading
    await page.evaluate(() => {
      window.__mockSlowRender = true
    })
    
    // Add element
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Verify loading state
    await expect(page.locator('[data-testid="element-loading"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-loading"]')).toContainText('Loading element')
  })

  test('handle large number of elements', async ({ page }) => {
    // Mock tool elements
    await page.evaluate((mockElements) => {
      window.__mockToolElements = mockElements
    }, MOCK_ELEMENTS)

    await page.goto('/builder/new')

    // Verify warning message
    await expect(page.locator('[data-testid="element-limit-warning"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-limit-warning"]')).toContainText('Large number of elements')
  })

  test('handle element rendering errors', async ({ page }) => {
    // Mock element error
    await page.evaluate(() => {
      window.__mockElementError = true
    })

    await page.goto('/builder/new')

    // Verify error message
    await expect(page.locator('[data-testid="element-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-error"]')).toContainText('Error rendering element')
  })

  test('handle slow element rendering', async ({ page }) => {
    // Mock slow render
    await page.evaluate(() => {
      window.__mockSlowRender = true
    })

    await page.goto('/builder/new')

    // Verify loading state
    await expect(page.locator('[data-testid="element-loading"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-loading"]')).toContainText('Loading element')
  })
})

test.describe('Tool Builder - Network Issues', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestUser(page)
  })

  test('should handle slow network gracefully', async ({ page }) => {
    // Simulate slow tool loading
    await simulateSlowNetwork(page, '/api/tools/*', 3000)
    
    await page.goto('/tools/create')
    await page.fill('[data-testid="tool-name-input"]', TEST_TOOL.name)
    await page.click('[data-testid="create-tool-button"]')
    
    // Should show loading state
    await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible()
    await expect(page.locator('[data-testid="loading-message"]')).toContainText('Creating tool...')
    
    // Should eventually load
    await page.waitForURL(/\/tools\/[a-zA-Z0-9]+\/edit/, { timeout: 10000 })
  })

  test('should handle intermittent connectivity', async ({ page }) => {
    await createNewTool(page)
    
    // Simulate network going offline
    await page.context().setOffline(true)
    
    // Try to save
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Should show offline indicator
    await expect(page.locator('[data-testid="offline-indicator"]')).toBeVisible()
    await expect(page.locator('[data-testid="offline-message"]')).toContainText('Working offline')
    
    // Should queue changes
    await expect(page.locator('[data-testid="queued-changes"]')).toContainText('1 change queued')
    
    // Go back online
    await page.context().setOffline(false)
    
    // Should sync changes
    await expect(page.locator('[data-testid="sync-indicator"]')).toContainText('Syncing...')
    await expect(page.locator('[data-testid="sync-success"]')).toBeVisible()
  })

  test('should handle concurrent editing conflicts', async ({ page }) => {
    await createNewTool(page)
    const toolUrl = page.url()
    
    // Open same tool in another tab
    const secondPage = await page.context().newPage()
    await secondPage.goto(toolUrl)
    
    // Make changes in both tabs
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    await secondPage.dragAndDrop('[data-testid="element-button"]', '[data-testid="design-canvas"]')
    
    // Should detect conflict
    await expect(page.locator('[data-testid="conflict-warning"]')).toContainText('Tool was modified by another user')
    await expect(page.locator('[data-testid="resolve-conflict"]')).toBeVisible()
    
    // Should offer conflict resolution options
    await page.click('[data-testid="resolve-conflict"]')
    await expect(page.locator('[data-testid="conflict-options"]')).toBeVisible()
    await expect(page.locator('[data-testid="keep-mine"]')).toBeVisible()
    await expect(page.locator('[data-testid="keep-theirs"]')).toBeVisible()
    await expect(page.locator('[data-testid="merge-changes"]')).toBeVisible()
  })
})

test.describe('Tool Builder - Data Validation', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestUser(page)
  })

  test('should validate tool name requirements', async ({ page }) => {
    await page.goto('/tools/create')
    
    // Try empty name
    await page.click('[data-testid="create-tool-button"]')
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Tool name is required')
    
    // Try name too long
    await page.fill('[data-testid="tool-name-input"]', 'a'.repeat(101))
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Tool name must be 100 characters or less')
    
    // Try invalid characters
    await page.fill('[data-testid="tool-name-input"]', 'Tool<script>alert("xss")</script>')
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Tool name contains invalid characters')
  })

  test('should validate element positioning', async ({ page }) => {
    await createNewTool(page)
    
    // Try to position element outside canvas bounds
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Move element to negative position via properties
    await page.click('[data-testid="canvas-element-textBlock"]')
    await page.fill('[data-testid="property-x"]', '-100')
    await page.keyboard.press('Enter')
    
    // Should clamp to valid position
    const element = page.locator('[data-testid="canvas-element-textBlock"]')
    const boundingBox = await element.boundingBox()
    expect(boundingBox?.x).toBeGreaterThanOrEqual(0)
  })

  test('should validate element configuration schemas', async ({ page }) => {
    await createNewTool(page)
    await page.dragAndDrop('[data-testid="element-choiceSelect"]', '[data-testid="design-canvas"]')
    
    // Select element and configure
    await page.click('[data-testid="canvas-element-choiceSelect"]')
    
    // Try to add too many options
    for (let i = 0; i < 25; i++) {
      await page.click('[data-testid="add-option"]')
    }
    
    // Should show validation error
    await expect(page.locator('[data-testid="options-error"]')).toContainText('Maximum 20 options allowed')
    
    // Should disable add button
    await expect(page.locator('[data-testid="add-option"]')).toBeDisabled()
  })

  test('should validate nested element depth', async ({ page }) => {
    await createNewTool(page)
    
    // Create deeply nested structure
    await page.dragAndDrop('[data-testid="element-stack"]', '[data-testid="design-canvas"]')
    
    // Add nested stacks beyond limit
    let currentParent = '[data-testid="canvas-element-stack"]'
    for (let i = 0; i < 4; i++) {
      await page.dragAndDrop('[data-testid="element-stack"]', currentParent)
      currentParent = `[data-testid="canvas-element-stack-${i + 1}"]`
    }
    
    // Should show nesting error
    await expect(page.locator('[data-testid="nesting-error"]')).toContainText('Maximum nesting depth exceeded')
  })

  test('should validate circular references', async ({ page }) => {
    await createNewTool(page)
    
    // Create elements that could form circular reference
    await page.dragAndDrop('[data-testid="element-conditionGate"]', '[data-testid="design-canvas"]')
    
    // Configure condition that references itself
    await page.click('[data-testid="canvas-element-conditionGate"]')
    await page.selectOption('[data-testid="condition-source"]', 'conditionGate_1')
    await page.selectOption('[data-testid="condition-target"]', 'conditionGate_1')
    
    // Should show circular reference error
    await expect(page.locator('[data-testid="circular-error"]')).toContainText('Circular reference detected')
  })
})

test.describe('Tool Builder - Performance Issues', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestUser(page)
  })

  test('should handle large tool files', async ({ page }) => {
    await createNewTool(page)
    
    // Add many elements to simulate large tool
    for (let i = 0; i < 30; i++) {
      await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]', {
        targetPosition: { x: 100 + (i % 10) * 50, y: 100 + Math.floor(i / 10) * 50 }
      })
    }
    
    // Should still be responsive
    await page.click('[data-testid="mode-preview"]')
    await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible({ timeout: 10000 })
    
    // Should show performance warning
    await expect(page.locator('[data-testid="performance-warning"]')).toContainText('Large tool may affect performance')
  })

  test('should handle memory constraints', async ({ page }) => {
    // Simulate low memory environment
    await page.addInitScript(() => {
      // Mock performance.memory to simulate low memory
      Object.defineProperty(performance, 'memory', {
        value: {
          usedJSHeapSize: 50 * 1024 * 1024, // 50MB
          totalJSHeapSize: 60 * 1024 * 1024, // 60MB
          jsHeapSizeLimit: 64 * 1024 * 1024, // 64MB
        }
      })
    })
    
    await createNewTool(page)
    
    // Should show memory warning
    await expect(page.locator('[data-testid="memory-warning"]')).toContainText('Low memory detected')
    
    // Should suggest optimizations
    await expect(page.locator('[data-testid="optimization-tips"]')).toBeVisible()
  })

  test('should handle render timeout', async ({ page }) => {
    await createNewTool(page)
    
    // Add element that takes long to render
    await page.evaluate(() => {
      window.__mockSlowRender = true
    })
    
    await page.dragAndDrop('[data-testid="element-textBlock"]', '[data-testid="design-canvas"]')
    
    // Should show timeout error after 1 second
    await expect(page.locator('[data-testid="render-timeout"]')).toContainText('Element render timeout', { timeout: 2000 })
    await expect(page.locator('[data-testid="timeout-fallback"]')).toBeVisible()
  })
}) 