import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test'

// Test data
const TEST_TOOL = {
  name: 'Test Survey Tool',
  description: 'A comprehensive survey tool for testing',
}

const TEST_ELEMENTS = [
  { type: 'textBlock', name: 'Text Block' },
  { type: 'textInput', name: 'Text Input' },
  { type: 'choiceSelect', name: 'Choice Select' },
  { type: 'button', name: 'Button' },
  { type: 'ratingStars', name: 'Rating Stars' },
]

// Helper functions
async function loginTestUser(page: Page) {
  await page.goto('/auth/login')
  await page.fill('[data-testid="email-input"]', 'test@example.com')
  await page.click('[data-testid="login-button"]')
  await page.waitForURL('/profile')
}

async function createNewTool(page: Page, toolData = TEST_TOOL) {
  await page.goto('/tools/create')
  await page.fill('[data-testid="tool-name-input"]', toolData.name)
  await page.fill('[data-testid="tool-description-input"]', toolData.description)
  await page.click('[data-testid="create-tool-button"]')
  await page.waitForURL(/\/tools\/[a-zA-Z0-9]+\/edit/)
}

async function dragElementToCanvas(page: Page, elementType: string, position = { x: 200, y: 200 }) {
  const element = page.locator(`[data-testid="element-${elementType}"]`)
  const canvas = page.locator('[data-testid="design-canvas"]')
  
  await element.dragTo(canvas, {
    targetPosition: position
  })
  
  // Wait for element to appear on canvas
  await page.waitForSelector(`[data-testid="canvas-element-${elementType}"]`)
}

async function configureElement(page: Page, elementId: string, config: Record<string, any>) {
  // Select element
  await page.click(`[data-testid="canvas-element-${elementId}"]`)
  
  // Wait for properties panel
  await page.waitForSelector('[data-testid="properties-panel"]')
  
  // Configure properties
  for (const [key, value] of Object.entries(config)) {
    const input = page.locator(`[data-testid="property-${key}"]`)
    
    if (typeof value === 'string') {
      await input.fill(value)
    } else if (typeof value === 'boolean') {
      if (value) {
        await input.check()
      } else {
        await input.uncheck()
      }
    }
  }
  
  // Apply changes
  await page.keyboard.press('Enter')
}

test.describe('Tool Builder - Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page)
  })

  test('should create a new tool and navigate to builder', async ({ page }) => {
    await createNewTool(page)
    
    // Verify we're in the builder
    await expect(page.locator('[data-testid="tool-builder"]')).toBeVisible()
    await expect(page.locator('[data-testid="tool-name"]')).toContainText(TEST_TOOL.name)
    
    // Verify element library is loaded
    await expect(page.locator('[data-testid="element-library"]')).toBeVisible()
    
    // Verify all core elements are present
    for (const element of TEST_ELEMENTS) {
      await expect(page.locator(`[data-testid="element-${element.type}"]`)).toBeVisible()
    }
  })

  test('should add elements via drag and drop', async ({ page }) => {
    await createNewTool(page)
    
    // Add text block
    await dragElementToCanvas(page, 'textBlock', { x: 100, y: 100 })
    
    // Add text input
    await dragElementToCanvas(page, 'textInput', { x: 100, y: 200 })
    
    // Add button
    await dragElementToCanvas(page, 'button', { x: 100, y: 300 })
    
    // Verify elements are on canvas
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
    await expect(page.locator('[data-testid="canvas-element-textInput"]')).toBeVisible()
    await expect(page.locator('[data-testid="canvas-element-button"]')).toBeVisible()
    
    // Verify element count
    await expect(page.locator('[data-testid="element-count"]')).toContainText('3 elements')
  })

  test('should configure element properties', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Configure text block
    await configureElement(page, 'textBlock', {
      text: 'Welcome to our survey!',
      fontSize: 'xl',
      fontWeight: 'bold',
      textAlign: 'center'
    })
    
    // Verify configuration applied
    const textElement = page.locator('[data-testid="canvas-element-textBlock"]')
    await expect(textElement).toContainText('Welcome to our survey!')
    await expect(textElement).toHaveClass(/text-xl/)
    await expect(textElement).toHaveClass(/font-bold/)
    await expect(textElement).toHaveClass(/text-center/)
  })

  test('should use element presets', async ({ page }) => {
    await createNewTool(page)
    
    // Open element library
    await page.click('[data-testid="element-textBlock"]')
    
    // Select preset
    await page.click('[data-testid="preset-heading-large"]')
    
    // Verify preset applied
    const textElement = page.locator('[data-testid="canvas-element-textBlock"]')
    await expect(textElement).toContainText('Main Heading')
    await expect(textElement).toHaveClass(/text-3xl/)
    await expect(textElement).toHaveClass(/font-bold/)
  })

  test('should switch between design modes', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Switch to preview mode
    await page.click('[data-testid="mode-preview"]')
    await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible()
    
    // Switch to code mode
    await page.click('[data-testid="mode-code"]')
    await expect(page.locator('[data-testid="json-viewer"]')).toBeVisible()
    
    // Verify JSON contains our element
    const jsonContent = await page.locator('[data-testid="json-content"]').textContent()
    if (!jsonContent) throw new Error('JSON content not found')
    expect(jsonContent).toContain('textBlock')
    
    // Switch back to design mode
    await page.click('[data-testid="mode-design"]')
    await expect(page.locator('[data-testid="design-canvas"]')).toBeVisible()
  })

  test('should test different device modes', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Test tablet mode
    await page.click('[data-testid="device-tablet"]')
    const tabletCanvas = page.locator('[data-testid="design-canvas"]')
    await expect(tabletCanvas).toHaveCSS('max-width', '768px')
    
    // Test mobile mode
    await page.click('[data-testid="device-mobile"]')
    const mobileCanvas = page.locator('[data-testid="design-canvas"]')
    await expect(mobileCanvas).toHaveCSS('max-width', '375px')
    
    // Back to desktop
    await page.click('[data-testid="device-desktop"]')
    const desktopCanvas = page.locator('[data-testid="design-canvas"]')
    await expect(desktopCanvas).toHaveCSS('width', '100%')
  })

  test('should save tool automatically', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Wait for auto-save indicator
    await expect(page.locator('[data-testid="save-status"]')).toContainText('Saving...')
    await expect(page.locator('[data-testid="save-status"]')).toContainText('Saved')
    
    // Refresh page and verify tool persisted
    await page.reload()
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
  })

  test('should preview tool functionality', async ({ page }) => {
    await createNewTool(page)
    
    // Create a simple form
    await dragElementToCanvas(page, 'textBlock', { x: 100, y: 50 })
    await configureElement(page, 'textBlock', { text: 'Please enter your name:' })
    
    await dragElementToCanvas(page, 'textInput', { x: 100, y: 150 })
    await configureElement(page, 'textInput', { 
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true
    })
    
    await dragElementToCanvas(page, 'button', { x: 100, y: 250 })
    await configureElement(page, 'button', { text: 'Submit' })
    
    // Switch to preview mode
    await page.click('[data-testid="mode-preview"]')
    
    // Test form interaction
    await page.fill('[data-testid="preview-textInput"]', 'John Doe')
    await page.click('[data-testid="preview-button"]')
    
    // Verify form submission (would show success message)
    await expect(page.locator('[data-testid="form-success"]')).toBeVisible()
  })

  test('should publish tool', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Publish tool
    await page.click('[data-testid="publish-button"]')
    
    // Confirm publish dialog
    await page.click('[data-testid="confirm-publish"]')
    
    // Verify tool status changed
    await expect(page.locator('[data-testid="tool-status"]')).toContainText('Published')
    
    // Verify tool is accessible via public URL
    const toolUrl = await page.locator('[data-testid="public-url"]').textContent()
    if (!toolUrl) throw new Error('Tool URL not found')
    await page.goto(toolUrl)
    await expect(page.locator('[data-testid="published-tool"]')).toBeVisible()
  })

  test('should share tool via link', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Open share dialog
    await page.click('[data-testid="share-button"]')
    
    // Create share link
    await page.click('[data-testid="create-share-link"]')
    
    // Copy share link
    const shareLink = await page.locator('[data-testid="share-link"]').textContent()
    if (!shareLink) throw new Error('Share link not found')
    expect(shareLink).toContain('/tools/shared/')
    
    // Test share link in new tab
    const newPage = await page.context().newPage()
    await newPage.goto(shareLink)
    await expect(newPage.locator('[data-testid="shared-tool"]')).toBeVisible()
  })

  test('should fork shared tool', async ({ page }) => {
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Share tool
    await page.click('[data-testid="share-button"]')
    await page.click('[data-testid="create-share-link"]')
    const shareLink = await page.locator('[data-testid="share-link"]').textContent()
    if (!shareLink) throw new Error('Share link not found')
    
    // Login as different user and fork
    await page.goto('/auth/logout')
    await loginTestUser(page) // Would use different test user
    
    await page.goto(shareLink)
    await page.click('[data-testid="fork-tool"]')
    
    // Verify fork created
    await expect(page.locator('[data-testid="tool-name"]')).toContainText('(Copy)')
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
  })
})

test.describe('Tool Builder - Element Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page)
    await createNewTool(page)
  })

  test('should duplicate elements', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock')
    
    // Right-click to open context menu
    await page.click('[data-testid="canvas-element-textBlock"]', { button: 'right' })
    await page.click('[data-testid="context-duplicate"]')
    
    // Verify duplicate created
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toHaveCount(2)
  })

  test('should delete elements', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock')
    
    // Select and delete
    await page.click('[data-testid="canvas-element-textBlock"]')
    await page.keyboard.press('Delete')
    
    // Verify element removed
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toHaveCount(0)
    await expect(page.locator('[data-testid="element-count"]')).toContainText('0 elements')
  })

  test('should move elements with keyboard', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock', { x: 100, y: 100 })
    
    // Select element
    await page.click('[data-testid="canvas-element-textBlock"]')
    
    // Move with arrow keys
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowDown')
    
    // Verify position changed
    const element = page.locator('[data-testid="canvas-element-textBlock"]')
    const boundingBox = await element.boundingBox()
    expect(boundingBox?.x).toBeGreaterThan(100)
    expect(boundingBox?.y).toBeGreaterThan(100)
  })

  test('should lock/unlock elements', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock')
    
    // Lock element
    await page.click('[data-testid="canvas-element-textBlock"]', { button: 'right' })
    await page.click('[data-testid="context-lock"]')
    
    // Verify element is locked
    await expect(page.locator('[data-testid="lock-indicator"]')).toBeVisible()
    
    // Try to move locked element (should not move)
    const originalBox = await page.locator('[data-testid="canvas-element-textBlock"]').boundingBox()
    await page.keyboard.press('ArrowRight')
    const newBox = await page.locator('[data-testid="canvas-element-textBlock"]').boundingBox()
    expect(newBox?.x).toBe(originalBox?.x)
  })

  test('should show/hide elements', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock')
    
    // Hide element
    await page.click('[data-testid="canvas-element-textBlock"]', { button: 'right' })
    await page.click('[data-testid="context-hide"]')
    
    // Verify element is hidden in preview
    await page.click('[data-testid="mode-preview"]')
    await expect(page.locator('[data-testid="preview-textBlock"]')).not.toBeVisible()
    
    // But still visible in design mode
    await page.click('[data-testid="mode-design"]')
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toHaveClass(/opacity-50/)
  })
})

test.describe('Tool Builder - Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page)
    await createNewTool(page)
  })

  test('should use undo/redo functionality', async ({ page }) => {
    // Add element
    await dragElementToCanvas(page, 'textBlock')
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
    
    // Undo
    await page.click('[data-testid="undo-button"]')
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).not.toBeVisible()
    
    // Redo
    await page.click('[data-testid="redo-button"]')
    await expect(page.locator('[data-testid="canvas-element-textBlock"]')).toBeVisible()
  })

  test('should search element library', async ({ page }) => {
    // Search for text elements
    await page.fill('[data-testid="element-search"]', 'text')
    
    // Verify filtered results
    await expect(page.locator('[data-testid="element-textBlock"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-textInput"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-button"]')).not.toBeVisible()
    
    // Clear search
    await page.fill('[data-testid="element-search"]', '')
    await expect(page.locator('[data-testid="element-button"]')).toBeVisible()
  })

  test('should filter elements by category', async ({ page }) => {
    // Filter by Inputs & Choices
    await page.click('[data-testid="category-inputs"]')
    
    // Verify only input elements shown
    await expect(page.locator('[data-testid="element-textInput"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-choiceSelect"]')).toBeVisible()
    await expect(page.locator('[data-testid="element-textBlock"]')).not.toBeVisible()
    
    // Show all categories
    await page.click('[data-testid="category-all"]')
    await expect(page.locator('[data-testid="element-textBlock"]')).toBeVisible()
  })

  test('should validate tool structure', async ({ page }) => {
    // Try to add too many elements (test limit)
    for (let i = 0; i < 51; i++) {
      await dragElementToCanvas(page, 'textBlock', { x: 100 + (i % 10) * 50, y: 100 + Math.floor(i / 10) * 50 })
    }
    
    // Should show validation error
    await expect(page.locator('[data-testid="validation-error"]')).toContainText('exceeds maximum element limit')
  })

  test('should export tool configuration', async ({ page }) => {
    await dragElementToCanvas(page, 'textBlock')
    await dragElementToCanvas(page, 'button')
    
    // Export tool
    await page.click('[data-testid="export-button"]')
    
    // Verify download initiated
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-json"]')
    const download = await downloadPromise
    
    expect(download.suggestedFilename()).toContain('.json')
  })
})

test.describe('Tool Builder - Analytics Integration', () => {
  test.beforeEach(async ({ page }) => {
    await loginTestUser(page)
  })

  test('should track tool creation events', async ({ page }) => {
    // Mock analytics endpoint
    await page.route('/api/analytics/creation', async route => {
      const request = route.request()
      const body = await request.postDataJSON()
      
      expect(body.events).toContainEqual(
        expect.objectContaining({
          eventType: 'tool_created',
          metadata: expect.objectContaining({
            hasDescription: true,
            creationSource: 'scratch'
          })
        })
      )
      
      await route.fulfill({ status: 200, body: '{"success": true}' })
    })
    
    await createNewTool(page)
  })

  test('should track element interaction events', async ({ page }) => {
    let elementAddedTracked = false
    
    await page.route('/api/analytics/creation', async route => {
      const request = route.request()
      const body = await request.postDataJSON()
      
      const elementAddedEvent = body.events.find((e: any) => e.eventType === 'element_added')
      if (elementAddedEvent) {
        expect(elementAddedEvent.metadata).toMatchObject({
          elementType: 'textBlock',
          addMethod: 'drag_drop',
          canvasElementsCount: 1
        })
        elementAddedTracked = true
      }
      
      await route.fulfill({ status: 200, body: '{"success": true}' })
    })
    
    await createNewTool(page)
    await dragElementToCanvas(page, 'textBlock')
    
    // Wait for analytics to be sent
    await page.waitForTimeout(1000)
    expect(elementAddedTracked).toBe(true)
  })

  test('should track builder session events', async ({ page }) => {
    let sessionStartTracked = false
    let sessionEndTracked = false
    
    await page.route('/api/analytics/creation', async route => {
      const request = route.request()
      const body = await request.postDataJSON()
      
      if (body.events.some((e: any) => e.eventType === 'builder_session_start')) {
        sessionStartTracked = true
      }
      
      if (body.events.some((e: any) => e.eventType === 'builder_session_end')) {
        sessionEndTracked = true
      }
      
      await route.fulfill({ status: 200, body: '{"success": true}' })
    })
    
    await createNewTool(page)
    await page.close() // Should trigger session end
    
    expect(sessionStartTracked).toBe(true)
    expect(sessionEndTracked).toBe(true)
  })
}) 