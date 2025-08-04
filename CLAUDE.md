## Collaboration Approach

### Working with Claude

- When working on tasks, ask me questions before hand - because I will be the sole dev.
- When adding pages to the live router, ask me business logic questions first for clarity 

### Design System Evolution Rule

- **NEVER build components in isolation** - every new component must enhance and evolve our existing design system
- **ALWAYS ask before building**: "Should this component update our brand system? Should we audit existing patterns first?"
- **DESIGN SYSTEM FIRST**: When building new components, first audit how they connect to existing patterns, then build in a way that improves the entire system
- **COMPONENT INTERCONNECTION**: New components must work beautifully with existing components and establish patterns for future ones
- **EVOLUTIONARY APPROACH**: Each component should make the entire HIVE design system better, not just add to it

### Project Guidelines

- You must follow all md to see where we are in project and follow foundations of HIVE
- When building a page, you must never hardcode. Work within our system or build within our system.
- When we build something it must fit and integrate into HIVE seamlessly for use.
- When creating front end design, you must follow elite design standards and high stadnard and consistency with HIVE.

### Product Architecture Approach

- Always think like a product architect
- Never view product completion based on technicalities but as a product CTO.

### Platform Component Principles

- Important that all components when built are considering other parts of the platform for leverage and no redundancy.

### Startup Journey

- We are building a startup.

### Product Versioning

- vBETA is meant to get our product to production. v1 will be our first update post beta.

### Platform Vision

- Hive's UI and UX has to remember that it is a social media platform blended with utility.
- This platform is being vibe-coded. 

### Audit Expectations

- When I say audit, I expect high expectations of full integration of the backend with a flawless buttery front end 

### Development Approach

- You are to work in vertical slices. Feed, Rituals, Spaces, Tools/Elements/Systems, Profile 

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

### Development Principles

- You do not build any "mock" or stub features/functionality. We build for production.

### HIVE Global UI/UX Consistencies

- The Platform Blueprint document outlines the complete set of architectural principles, layout patterns, and interaction rules that ensure a consistent, "tech sleek," and intuitive user experience across the entire HIVE platform
- Core architectural philosophy is built on a duality between Feeds (for Discovery & Consumption) and Boards (for Agency & Action)
- Global navigation components include a Nav Shell (desktop left sidebar or mobile bottom tab bar) and a Top Nav Bar that adapts to the current context
- Universal interaction patterns include "Expand & Focus" for drilling into content and a consistent Configuration Panel for settings
- Uses an Atomic Design System with standardized Organisms (Widgets/Cards), Molecules (User Identity, Search bars), and Atoms (Buttons, Inputs, Icons)
- Implements global state displays with consistent Loading States, Empty States, and Notifications
- Enforces platform-wide UI/UX consistencies to create a cohesive, intelligent platform experience