import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useFocusTrap } from '../use-focus-trap'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Test component that uses the hook
const TestDialog = ({
  isOpen = true,
  onClose = () => {},
}: {
  isOpen?: boolean
  onClose?: () => void
}) => {
  const ref = useFocusTrap<HTMLDivElement>({ enabled: isOpen, onEscape: onClose })

  return (
    <div ref={ref} data-testid="dialog">
      <button>First Button</button>
      <button>Middle Button</button>
      <button>Last Button</button>
    </div>
  )
}

describe('useFocusTrap', () => {
  beforeEach(() => {
    // Create a mock body since JSDOM doesn't provide one
    if (!document.body) {
      const body = document.createElement('body')
      document.documentElement.appendChild(body)
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('focuses the first focusable element when enabled', () => {
    render(<TestDialog />)
    const buttons = screen.getAllByRole('button')
    expect(document.activeElement).toBe(buttons[0])
  })

  it('traps focus when tabbing forward', () => {
    render(<TestDialog />)
    const buttons = screen.getAllByRole('button')

    // Tab through all buttons
    buttons.forEach((_, index) => {
      fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' })
      expect(document.activeElement).toBe(
        buttons[(index + 1) % buttons.length]
      )
    })
  })

  it('traps focus when tabbing backward', () => {
    render(<TestDialog />)
    const buttons = screen.getAllByRole('button')

    // Start from last button
    buttons[buttons.length - 1].focus()

    // Shift+Tab should go to previous button
    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'Tab',
      shiftKey: true,
    })
    expect(document.activeElement).toBe(buttons[buttons.length - 2])

    // Shift+Tab from first button should go to last button
    buttons[0].focus()
    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'Tab',
      shiftKey: true,
    })
    expect(document.activeElement).toBe(buttons[buttons.length - 1])
  })

  it('calls onEscape when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<TestDialog onClose={onClose} />)

    fireEvent.keyDown(document.activeElement || document.body, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not trap focus when disabled', () => {
    const { rerender } = render(<TestDialog isOpen={false} />)
    const buttons = screen.getAllByRole('button')

    // Should not focus first button when disabled
    expect(document.activeElement).not.toBe(buttons[0])

    // Enable the trap
    rerender(<TestDialog isOpen={true} />)
    expect(document.activeElement).toBe(buttons[0])

    // Disable the trap
    rerender(<TestDialog isOpen={false} />)
    expect(document.activeElement).not.toBe(buttons[0])
  })

  it('ignores hidden and disabled elements', () => {
    const HiddenButtonDialog = () => {
      const ref = useFocusTrap<HTMLDivElement>()
      return (
        <div ref={ref}>
          <button hidden>Hidden</button>
          <button disabled>Disabled</button>
          <button>Visible</button>
          <div aria-hidden="true">
            <button>Hidden by aria</button>
          </div>
        </div>
      )
    }

    render(<HiddenButtonDialog />)
    const visibleButton = screen.getByText('Visible')
    expect(document.activeElement).toBe(visibleButton)
  })
}) 