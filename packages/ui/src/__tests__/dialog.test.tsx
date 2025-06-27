import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { Dialog } from '../components/dialog'

describe('Dialog', () => {
  it('renders when open', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when clicking the close button', () => {
    const onClose = vi.fn()
    render(
      <Dialog isOpen={true} onClose={onClose} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    )

    fireEvent.click(screen.getByLabelText('Close dialog'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking the backdrop', () => {
    const onClose = vi.fn()
    render(
      <Dialog isOpen={true} onClose={onClose} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    )

    // Find the backdrop by its role and click it
    const backdrop = screen.getByRole('presentation')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)

    // Clicking the dialog itself should not call onClose
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders with description when provided', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        title="Test Dialog"
        description="Test description"
      >
        <p>Dialog content</p>
      </Dialog>
    )

    expect(screen.getByText('Test description')).toBeInTheDocument()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description')
  })

  it('applies size variants correctly', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog" size="sm">
        <p>Dialog content</p>
      </Dialog>
    )

    let dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-sm')

    rerender(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog" size="lg">
        <p>Dialog content</p>
      </Dialog>
    )

    dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-lg')
  })

  it('has proper ARIA attributes', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('applies custom className when provided', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        title="Test Dialog"
        className="custom-class"
      >
        <p>Dialog content</p>
      </Dialog>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('custom-class')
  })
}) 