import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { SchoolCreationDialog } from '../../components/auth/school-creation-dialog'

describe('SchoolCreationDialog', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Add Your School')).toBeInTheDocument()
    expect(screen.getByLabelText('School Name')).toBeInTheDocument()
    expect(screen.getByLabelText('School Email Domain')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<SchoolCreationDialog {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when clicking the close button', () => {
    render(<SchoolCreationDialog {...defaultProps} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onSubmit with form data when submitting', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText('School Name'), {
      target: { value: 'University of Buffalo' },
    })
    fireEvent.change(screen.getByLabelText('School Email Domain'), {
      target: { value: 'buffalo.edu' },
    })

    // Submit the form
    fireEvent.click(screen.getByText('Submit Request'))

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1)
    expect(defaultProps.onSubmit).toHaveBeenCalledWith({
      name: 'University of Buffalo',
      domain: 'buffalo.edu',
    })
  })

  it('validates required fields', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    // Try to submit without filling out the form
    fireEvent.click(screen.getByText('Submit Request'))

    // Form should not be submitted
    expect(defaultProps.onSubmit).not.toHaveBeenCalled()

    // Required validation messages should be shown (browser native validation)
    const nameInput = screen.getByLabelText('School Name')
    const domainInput = screen.getByLabelText('School Email Domain')

    expect(nameInput).toBeInvalid()
    expect(domainInput).toBeInvalid()
  })

  it('validates domain format', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    const domainInput = screen.getByLabelText('School Email Domain')

    // Test invalid domains
    const invalidDomains = [
      'not-a-domain',
      'too.many.parts.edu',
      '.starts-with-dot.edu',
      'ends-with-dot.',
      'special@characters.edu',
    ]

    invalidDomains.forEach((domain: string) => {
      fireEvent.change(domainInput, { target: { value: domain } })
      expect(domainInput).toBeInvalid()
    })

    // Test valid domains
    const validDomains = [
      'buffalo.edu',
      'harvard.edu',
      'sub-domain.school.edu',
      'example.com',
    ]

    validDomains.forEach((domain: string) => {
      fireEvent.change(domainInput, { target: { value: domain } })
      expect(domainInput).toBeValid()
    })
  })

  it('has proper ARIA attributes', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title')
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    // Check that form controls are properly labeled
    expect(screen.getByLabelText('School Name')).toHaveAttribute('required')
    expect(screen.getByLabelText('School Email Domain')).toHaveAttribute('required')
  })

  it('maintains focus within the dialog', () => {
    render(<SchoolCreationDialog {...defaultProps} />)

    const firstFocusable = screen.getByLabelText('School Name')
    const lastFocusable = screen.getByText('Submit Request')

    // First focusable element should be focused initially
    expect(firstFocusable).toHaveFocus()

    // Tab should cycle through focusable elements
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' })
    expect(screen.getByLabelText('School Email Domain')).toHaveFocus()

    // Shift+Tab from first element should move to last element
    firstFocusable.focus()
    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'Tab',
      shiftKey: true,
    })
    expect(lastFocusable).toHaveFocus()
  })
}) 