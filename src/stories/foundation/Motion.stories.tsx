import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/button'

const meta: Meta = {
  title: '🏛️ Foundation/Motion',
  parameters: {
    docs: {
      description: {
        component: 'HIVE motion system with organic curves that feel alive with student energy.'
      }
    }
  }
}

export default meta
type Story = StoryObj

const MotionDemo = ({ 
  curve, 
  duration, 
  label, 
  description 
}: { 
  curve: string
  duration: string
  label: string
  description: string
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="border border-border rounded-lg p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-white">{label}</h3>
        <p className="text-sm text-muted">{description}</p>
        <code className="text-xs text-accent bg-surface/50 px-2 py-1 rounded mt-2 inline-block">
          {curve} • {duration}
        </code>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsActive(!isActive)}
        >
          Trigger Motion
        </Button>
        
        <div 
          className={`w-12 h-12 bg-accent rounded-lg transition-transform ${duration} ${
            isActive ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}
          style={{ transitionTimingFunction: curve }}
        />
      </div>
    </div>
  )
}

export const MotionSystem: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">HIVE Motion System</h2>
        <p className="text-muted mb-6">
          Our motion feels organic, not mechanical—following natural laws that make interactions feel alive with authentic student energy.
        </p>
      </div>

      <div className="space-y-6">
        <MotionDemo
          curve="cubic-bezier(0.33, 0.65, 0, 1)"
          duration="duration-180"
          label="HIVE Primary Curve"
          description="Our signature motion curve for all standard interactions"
        />
        
        <MotionDemo
          curve="ease-out"
          duration="duration-[120ms]"
          label="Quick Feedback"
          description="For immediate feedback on hover states and micro-interactions"
        />
        
        <MotionDemo
          curve="ease-in-out"
          duration="duration-300"
          label="Layout Transitions"
          description="For larger layout changes and page transitions"
        />
      </div>

      <div className="border border-accent rounded-xl p-6 bg-accent/5">
        <h3 className="text-lg font-semibold text-white mb-4">Motion Principles</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-accent font-medium mb-2">Organic Feel</h4>
            <p className="text-sm text-muted">
              Motion should feel natural and alive, never robotic or overly mechanical.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Student Energy</h4>
            <p className="text-sm text-muted">
              Animations should reflect the dynamic, energetic nature of campus life.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Purposeful</h4>
            <p className="text-sm text-muted">
              Every animation serves a purpose—guiding attention or providing feedback.
            </p>
          </div>
          <div>
            <h4 className="text-accent font-medium mb-2">Performance</h4>
            <p className="text-sm text-muted">
              Motion is optimized for performance, using transform and opacity when possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const InteractionStates: Story = {
  render: () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null)
    
    return (
      <div className="bg-background p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Interaction States</h2>
          <p className="text-muted mb-6">
            How components respond to user interactions with the HIVE motion system.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Button States</h3>
            <div className="flex flex-wrap gap-4">
              {['primary', 'secondary', 'accent'].map((variant) => (
                <Button
                  key={variant}
                  variant={variant as any}
                  onMouseEnter={() => setHoveredButton(variant)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="relative"
                >
                  {variant} button
                  {hoveredButton === variant && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-accent">
                      Hover State
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Card Interactions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['default', 'interactive', 'accent'].map((variant) => (
                <div
                  key={variant}
                  className={`
                    p-4 rounded-lg border transition-all duration-180 ease-hive
                    ${variant === 'default' ? 'border-border hover:border-accent/50' : ''}
                    ${variant === 'interactive' ? 'border-border hover:border-accent cursor-pointer hover:scale-[1.02]' : ''}
                    ${variant === 'accent' ? 'border-accent bg-accent/5' : ''}
                  `}
                >
                  <h4 className="font-medium text-white mb-2">{variant} card</h4>
                  <p className="text-sm text-muted">
                    {variant === 'interactive' ? 'Hover to see interaction' : 'Static content card'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}