# HIVE Project Guidelines

## 🚨 MANDATORY AI WORKFLOW ENFORCEMENT - CLAUDE CODE INTEGRATION

### **AUTOMATIC BEHAVIOR - CLAUDE MUST EXECUTE ON EVERY SESSION:**

```
STEP 1: IMMEDIATELY upon receiving ANY task request:
   → Read todo.md (current development phase)
   → Read rules.md (technical standards)  
   → Read AI_WORKFLOW_ENFORCER.md (behavior patterns)
   
STEP 2: BEFORE any work begins:
   → Run: pnpm workflow-check "describe the task"
   → IF infrastructure fails: STOP, fix infrastructure first
   → IF phase restrictions: STOP, ask about phase priorities
   
STEP 3: FOR UI/component tasks:
   → Run: pnpm design-check ComponentName  
   → Ask: "Should this update our brand system?"
   → Audit existing components before creating new ones
```

### **CLAUDE CODE ENFORCEMENT TRIGGERS:**
- **Any mention of**: build, lint, error, config, fix → RUN WORKFLOW-CHECK IMMEDIATELY
- **Any mention of**: component, button, modal, card, form, style → RUN DESIGN-CHECK IMMEDIATELY
- **Any mention of**: implement, create, add, feature → VERIFY TODO.MD PHASE FIRST

### **FAILURE MODE PREVENTION:**
- ❌ **IF I start work without reading workflow files** → SYSTEM VIOLATION
- ❌ **IF I bypass infrastructure failures** → SYSTEM VIOLATION  
- ❌ **IF I create UI without design-check** → SYSTEM VIOLATION
- ❌ **IF I work outside current todo.md phase** → SYSTEM VIOLATION

## Collaboration Approach

### AI-Guided Feature Slice Development
- **Task Reference System**: Use comprehensive task breakdowns in `todo.md` as development guidance
- **Feature Slice Focus**: When Jacob says "work on Tools slice," use detailed task context for informed development
- **Collaborative Decision-Making**: Each task becomes a discussion point - ask business logic questions using task context
- **Strategic Development**: AI has comprehensive context to suggest Phase 1 vs Phase 2 priorities within slices

### Working with Claude
- **AI as Implementation Partner**: Use task breakdowns to understand what needs building without Jacob explaining every detail
- **Business Logic First**: Ask strategic questions informed by task context ("Should we build collaborative tool editing now or focus on basic builder functionality?")
- **Technical Co-Founder Role**: Present options using task framework - "These 3 tasks would complete Phase 1 Tools, or we could tackle these Phase 2 features instead"
- **Quality-Driven Development**: Follow existing patterns, use @hive/ui exclusively, maintain clean code standards

### Design System Evolution Rule
- **NEVER build components in isolation** - every new component must enhance and evolve our existing design system
- **ALWAYS ask before building**: "Should this component update our brand system? Should we audit existing patterns first?"
- **DESIGN SYSTEM FIRST**: When building new components, first audit how they connect to existing patterns, then build in a way that improves the entire system
- **COMPONENT INTERCONNECTION**: New components must work beautifully with existing components and establish patterns for future ones
- **EVOLUTIONARY APPROACH**: Each component should make the entire HIVE design system better, not just add to it

### Product Architecture Approach
- Always think like a product architect and product CTO
- Never view product completion based on technicalities - focus on user value
- Work in vertical slices: Feed, Rituals, Spaces, Tools/Elements/Systems, Profile

### Development Philosophy
- You do not build any "mock" or stub features/functionality - we build for production
- When building a page, never hardcode - work within our system or build within our system
- Everything must fit and integrate into HIVE seamlessly
- Follow elite design standards and maintain consistency with HIVE
- Think carefully and only action the specific task with the most concise and elegant solution

### Platform Vision
- HIVE is a social media platform blended with utility - "social utility"
- This platform is being vibe-coded with systematic rigor
- We're building a startup moving towards vBETA launch
- When I say audit, I expect full integration of backend with flawless frontend

# **HIVE Vision Statement**

---

## **We're building the first social platform where connections form around solving real problems together.**

---

**Most social platforms are entertainment dressed up as connection** — endless scrolling, artificial engagement, dopamine hits that leave you emptier than before. Campus life deserves better than another app that fragments your attention and wastes your time.

**HIVE is social utility** — where every connection has purpose, every community solves problems, and every interaction moves your life forward.

**This is social media that actually makes your life better.**

You don't just follow your classmates — you coordinate study sessions with tools you build together. You don't just join your dorm's group chat — you become part of a connected community with shared resources for laundry tracking, food orders, and floor events. You don't just network with your major — you collaborate with peers using academic tools that actually help you graduate.

**The magic happens when social meets utility:**

Your **Profile** isn't a highlight reel — it's your campus command center, connecting your calendar, your tools, your communities, and your goals in one personalized dashboard that actually runs your life.

Your **Spaces** aren't just discussion forums — they're functional communities where CS majors share interview prep tools, where your floor coordinates everything from study sessions to social events, where clubs actually get things done.

Your **Tools** aren't just productivity apps — they're solutions you build and share with your community, creating connections around solving real problems together.

Your **Feed** doesn't show you what your friends had for lunch — it surfaces the coordination, collaboration, and community building that's actually happening around you.

**We believe the future of social is utility-first.** Meaningful relationships form when people solve problems together, build things together, and help each other succeed. Not when they perform for each other's approval.

**HIVE is where campus communities become engines of mutual success** — where your social connections make you more capable, more organized, and more prepared to thrive. Where being social means being useful to each other.

**This is social media that prepares you for life, not just college.**

Because when you graduate, you won't remember the content you consumed. You'll remember the communities you built, the problems you solved together, and the tools you created that made everyone's life better.

**Welcome to social utility. Welcome to HIVE.**

---

*Where connections have purpose and community gets things done.*

---

## Design System & Technical Standards

### @hive/ui Design System Status
- **✅ COMPLETE**: Full design system with strategic gold borders, comprehensive Storybook (16 stories)
- **Components**: All atoms, molecules, organisms built with semantic tokens
- **Documentation**: See `HIVE_DESIGN_SYSTEM_STATUS.md` for implementation details
- **Integration**: All apps must use @hive/ui components - never create one-off UI elements

### Technical Stack
- **Frontend**: Next.js 15 App Router, TypeScript (strict), Tailwind CSS, @hive/ui design system
- **Backend**: Firebase (Firestore, Auth, Storage), Vercel Serverless Functions
- **Code Quality**: Zero TypeScript/ESLint errors, mobile-first, performance optimized
- **Development**: Monorepo with Turborepo, comprehensive Storybook integration

---

## Reference Documents

## 🚨 CRITICAL: AI WORKFLOW FILES INTEGRATION

**These files MUST be read and followed on EVERY task:**

1. **`todo.md`** - Current development phase, priorities, and blockers
2. **`CLAUDE.md`** - This file - collaboration rules and design system requirements
3. **`rules.md`** - Technical standards, infrastructure requirements, and quality gates  
4. **`AI_WORKFLOW_ENFORCER.md`** - Mandatory AI behavior patterns and decision trees

### **AUTOMATIC AI WORKFLOW COMMANDS:**
```bash
# MANDATORY before any task
pnpm workflow-check "describe the task"

# MANDATORY for UI/component work  
pnpm design-check ComponentName

# Generate AI workflow prompt for complex tasks
pnpm ai-prompt "describe the task"
```

### **AI FAILURE MODES TO PREVENT:**
- ❌ Working without reading workflow files
- ❌ Bypassing infrastructure failures
- ❌ Creating components without design system checks
- ❌ Working outside current todo.md phase
- ❌ Hardcoding instead of using design tokens
- ❌ Building without asking business logic questions

For detailed technical implementation guidelines, see:
- **`AI_DEVELOPMENT_RULES.md`** - Comprehensive technical architecture and coding standards
- **`HIVE_DESIGN_SYSTEM_STATUS.md`** - Design system implementation status
- **`apps/web/CLAUDE.md`** - Next.js specific patterns and deployment guidelines

