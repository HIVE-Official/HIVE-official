export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-display font-display text-foreground">
          HIVE Font Test
        </h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-h2 font-display text-foreground mb-4">
              Space Grotesk (Display Font)
            </h2>
            <div className="space-y-2">
              <p className="text-h1 font-display">Heading 1 - Space Grotesk</p>
              <p className="text-h2 font-display">Heading 2 - Space Grotesk</p>
              <p className="text-h3 font-display">Heading 3 - Space Grotesk</p>
              <p className="text-h4 font-display">Heading 4 - Space Grotesk</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-h2 font-display text-foreground mb-4">
              Geist (Sans Font)
            </h2>
            <div className="space-y-2">
              <p className="text-body font-sans">Body text - Geist Sans</p>
              <p className="text-body-sm font-sans">Small body text - Geist Sans</p>
              <p className="text-caption font-sans">Caption text - Geist Sans</p>
              <p className="text-button font-sans">Button text - Geist Sans</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-h2 font-display text-foreground mb-4">
              Geist Mono (Monospace Font)
            </h2>
            <div className="space-y-2">
              <p className="text-code font-mono">Code text - Geist Mono</p>
              <p className="text-sm font-mono">Small mono text - Geist Mono</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-h2 font-display text-foreground mb-4">
              Font Weights Test
            </h2>
            <div className="space-y-2">
              <p className="text-body font-sans font-light">Light weight - Geist</p>
              <p className="text-body font-sans font-normal">Normal weight - Geist</p>
              <p className="text-body font-sans font-medium">Medium weight - Geist</p>
              <p className="text-body font-sans font-semibold">Semibold weight - Geist</p>
              <p className="text-body font-sans font-bold">Bold weight - Geist</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-h2 font-display text-foreground mb-4">
              CSS Variables Test
            </h2>
            <div className="space-y-2">
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-body">
                CSS Variable: var(--font-display) - Should be Space Grotesk
              </p>
              <p style={{ fontFamily: 'var(--font-sans)' }} className="text-body">
                CSS Variable: var(--font-sans) - Should be Geist
              </p>
              <p style={{ fontFamily: 'var(--font-mono)' }} className="text-body">
                CSS Variable: var(--font-mono) - Should be Geist Mono
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 