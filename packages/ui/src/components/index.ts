// === CORE UI COMPONENTS ===
export * from "./alert"
export * from "./alert-dialog"
export * from "./avatar"
export * from "./badge"
export * from "./button"
export * from "./ritual-button"
export * from "./card"
export * from "./checkbox"
export * from "./dialog"
export * from "./input"
export * from "./label"
export * from "./progress"
export * from "./radio-group"
export * from "./select"
export * from "./skeleton"
export * from "./switch"
export * from "./tabs"
export * from "./popover"
export * from "./dropdown-menu"
export * from "./tooltip"
export * from "./textarea"
export * from "./typography"
export * from "./loading-spinner"
export * from "./countdown"
export * from "./error-boundary"
export * from "./toast"
export * from "./toast-provider"
export * from "./HiveLogo"

// === AUTH COMPONENTS ===
export * from "./auth/school-pick"
export * from "./auth/email-gate"
export * from "./auth/firebase-setup-guide"
export * from "./auth/auth-flow"
export * from "./auth/CheckEmailInfo"
export * from "./auth/magic-link-sent"
export * from "./auth/email-form"
export * from "./auth/dev-mode-panel"
export * from "./auth/school-creation-dialog"
export * from "./auth/email-verification"
export * from "./auth/school-search"

// === SPLASH SCREEN ALTERNATIVES ===
// Alternative A: Countdown-focused (pre-launch)
export { SplashScreen as CountdownSplashScreen } from "./auth/splash-screen"
// Alternative B: Animation-focused (brand experience)  
export { SplashScreen as AnimatedSplashScreen } from "./brand/splash-screen"

// === ONBOARDING ALTERNATIVES ===
// See /components/onboarding/ALTERNATIVES.md for selection guide

// Academic Step Alternatives
export { AcademicStep } from "./onboarding/academic-step"                    // Motion-first
export { AcademicCardStep } from "./onboarding/academic-card-step"          // Card-first

// Interest Selection Alternatives
export { InterestsStep } from "./onboarding/interests-step"                 // Category-first
export { InterestsSelectionStep } from "./onboarding/interests-selection-step" // Tag-first

// Welcome Step Alternatives
export { WelcomeStep } from "./onboarding/welcome-step"                     // Hero-first
export { WelcomeRoleStep } from "./onboarding/welcome-role-step"            // Role-first

// Other Onboarding Components
export * from "./onboarding/create-profile-step"
export * from "./onboarding/school-pledge-step"
export * from "./onboarding/onboarding-complete-step"
export * from "./onboarding/role-selection-step"
export * from "./onboarding/faculty-verification-step"
export * from "./onboarding/alumni-coming-soon-step"
export * from "./onboarding/avatar-upload-step"
export * from "./onboarding/claim-space-step"
export * from "./onboarding/space-selection-step"
export * from "./onboarding/alumni-waitlist-modal"
export * from "./onboarding/faculty-modal"
export * from "./onboarding/image-crop-modal"
export * from "./onboarding/onboarding-layout"
export * from "./onboarding/progress-indicator"
export * from "./onboarding/campus-select/campus-selector"

// New Onboarding Components
export * from "./onboarding/role-step"
export * from "./onboarding/interests-step-new"
export * from "./onboarding/spaces-discovery-step"

// === FEED COMPONENTS ===
export * from "./feed/post-card"
export * from "./feed/post-card-compact"
export * from "./feed/post-card-detailed"
export * from "./feed/post-card-minimal"
export * from "./feed/post-card-premium"

// === SPACES COMPONENTS ===
export * from "./spaces"
export * from "./spaces/space-card"
export * from "./spaces/space-card-preview"
export * from "./spaces/space-card-grid"
export * from "./spaces/space-activation-request-form"
export * from "./spaces/space-request-form"

// === RITUAL COMPONENTS ===
export * from "./ritual/ritual-card"
export * from "./ritual/ritual-card-celebration"
export * from "./ritual/ritual-card-countdown"

// === PROFILE COMPONENTS ===
export * from "./profile/bento-grid"
export * from "./profile/bento-profile-dashboard"
export * from "./profile/calendar-card"
export * from "./profile/ghost-mode-card"
export * from "./profile/hivelab-card"
export * from "./profile/profile-header-card"
export * from "./profile/tools-card"

// === LANDING COMPONENTS ===
export * from "./landing"
export * from "./landing/countdown-timer"
export * from "./landing/hive-landing-page"

// === LAYOUT COMPONENTS ===
export * from "./AppHeader"
export * from "./BottomNavBar"

// === VISUAL IMPROVEMENTS ===
// Enhanced Components (Experimental/Bold)
export { EnhancedCard } from "./visual-improvements/enhanced-card"
export { EnhancedButton } from "./visual-improvements/enhanced-button" 
export { 
  EnhancedTypography, 
  HeroText, 
  EnergyText, 
  HandwrittenText, 
  NeonText, 
  StickerText 
} from "./visual-improvements/enhanced-typography"
export { 
  GoldParticles,
  EnergyRipple,
  GlowAura,
  EnergyMeter,
  MagneticField,
  HolographicBorder,
  RetroScanLines,
  CampusMesh,
  EnergyBurst,
  FloatingElement
} from "./visual-improvements/visual-effects"

// Refined Components (Vercel/Apple inspired)
export {
  RefinedButton,
  RefinedCard, 
  RefinedTypography,
  RefinedInput,
  RefinedBadge
} from "./visual-improvements/refined-components"

// Button Options (Multiple A/B Test Variants)
export {
  VercelButton,
  AppleButton,
  CampusButton,
  TechButton,
  SocialButton
} from "./visual-improvements/button-options"

// Card Options (Multiple A/B Test Variants)
export {
  MinimalCard,
  GlassCard,
  CampusCard,
  TechCard,
  SocialCard
} from "./visual-improvements/card-options"

// Typography Options (Multiple A/B Test Variants)
export {
  MinimalTypography,
  DisplayTypography,
  CampusTypography,
  TechTypography,
  SocialTypography,
  MinimalHero,
  DisplayImpact,
  CampusEnergy,
  TechTerminal,
  SocialFriendly
} from "./visual-improvements/typography-options"

// === PAGE LAYOUTS ===
export * from "./page-layouts/homepage-options"
export * from "./page-layouts/advanced-homepage-options"

// === MOTION & UTILS ===
export * from "../lib/motion"
export * from "../lib/adaptive-motion" 