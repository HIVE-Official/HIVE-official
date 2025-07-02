import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "framer-motion";
import { Button, Badge } from "../../index";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";

// Landing Page Component for Storybook
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyIi8+PC9zdmc+')] bg-repeat"></div>
      
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="px-6 pt-8">
          <nav className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="text-2xl font-black tracking-tight text-accent">
                HIVE
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge variant="outline" className="border-border text-muted font-mono text-xs">
                v1.0 BETA
              </Badge>
            </motion.div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-8"
          >
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-mono text-sm uppercase tracking-wider text-muted">
                Your Campus OS
              </span>
              <Sparkles className="h-4 w-4 text-accent" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'Space Grotesk Variable, system-ui, sans-serif' }}
            >
              HIVE
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-2xl text-xl leading-relaxed text-muted md:text-2xl"
              style={{ fontFamily: 'Geist, system-ui, sans-serif' }}
            >
              Minimal surface.{" "}
              <span className="text-accent font-medium">Maximal spark.</span>
              <br />
              Real-time campus community built by students.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-6"
            >
              <Button
                size="lg"
                className="group h-14 w-full bg-foreground px-8 text-lg font-medium text-background hover:bg-foreground/90 sm:w-auto"
                onClick={() => {
                  // In a real app, this would navigate to signup
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 w-full border-border px-8 text-lg font-medium text-muted hover:border-accent hover:text-accent sm:w-auto"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-12"
            >
              <p className="font-mono text-sm text-muted">
                Built by Students · Owned by Students.
              </p>
            </motion.div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section id="features" className="px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-6xl"
          >
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Campus Native",
                  description: "Spaces built around your school's unique culture and communities."
                },
                {
                  icon: Zap,
                  title: "Real-time Magic",
                  description: "Live feeds, instant updates, and seamless campus-wide communication."
                },
                {
                  icon: Sparkles,
                  title: "Creator Tools",
                  description: "Build and share tools that help your campus community thrive."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/50"
                >
                  <feature.icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground" style={{ fontFamily: 'Space Grotesk Variable, system-ui, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted" style={{ fontFamily: 'Geist, system-ui, sans-serif' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="font-mono text-sm text-muted">
              © 2024 HIVE. Privacy-first social for the next generation.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const meta: Meta<typeof LandingPage> = {
  title: "Full Website/Landing Page",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
      ],
    },
    docs: {
      description: {
        component: `
**HIVE Landing Page - Brand Compliant Design**

This landing page showcases the complete HIVE brand aesthetic:

**🎨 Brand Compliance:**
- **Monochrome + Gold System**: Pure black/white with gold accents (#FFD700)
- **Premium Typography**: Space Grotesk Variable for headlines, Geist for body
- **Dark-First Design**: Deep black canvas (#0A0A0A) with subtle surfaces
- **Motion-First Feedback**: Framer Motion animations with HIVE timing
- **8dp Grid System**: Consistent spacing throughout

**⚡ Key Features:**
- Grain texture overlay for premium feel
- Progressive disclosure animation sequence
- Black button fills (brand compliant)
- Gold accents for special moments only
- Mobile-first responsive design
- Accessibility-first focus management

**🏗️ Component Architecture:**
- Uses only HIVE UI components (Button, Badge)
- Brand-compliant hover states
- Proper semantic HTML structure
- Screen reader friendly
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

// === PRIMARY STORIES ===

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Complete brand-compliant landing page with dark aesthetic and gold accents.",
      },
    },
  },
};

export const BrandShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Brand Compliance Overview */}
      <div className="p-6 bg-surface border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-display">
          🎨 HIVE Brand Compliance
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-accent">✅ Brand Aligned</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Pure monochrome + gold system</li>
              <li>• Black button fills only</li>
              <li>• Space Grotesk + Geist typography</li>
              <li>• 8dp grid spacing system</li>
              <li>• Motion-first feedback</li>
              <li>• Dark-first surfaces</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-400">❌ Avoided</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Gold button backgrounds</li>
              <li>• Success/error colors</li>
              <li>• Light theme defaults</li>
              <li>• Inconsistent typography</li>
              <li>• Random spacing values</li>
              <li>• Jarring animations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Landing Page */}
      <LandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete brand showcase demonstrating all HIVE design principles in action.",
      },
    },
  },
};

export const ResponsiveTesting: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-surface border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-2">📱 Responsive Testing</h3>
        <p className="text-sm text-muted">
          Test the landing page at different breakpoints to ensure mobile-first design works properly.
          Key features: stacked CTAs on mobile, proper typography scaling, touch-friendly buttons.
        </p>
      </div>
      <LandingPage />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
    docs: {
      description: {
        story: "Mobile-first responsive testing with iPhone 12 viewport.",
      },
    },
  },
};

export const AnimationShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-surface border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-2">⚡ Motion Design</h3>
        <p className="text-sm text-muted">
          HIVE uses subtle, purposeful animations with specific timing:
          • Header: 0.5s stagger • Hero: 0.8s cascade • Features: scroll-triggered
        </p>
      </div>
      <LandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates HIVE's motion design system with progressive disclosure animations.",
      },
    },
  },
}; 