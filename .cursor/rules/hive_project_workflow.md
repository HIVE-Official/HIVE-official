# HIVE Project Workflow & AI Collaboration Rules

## 1. The Checklist is the Single Source of Truth
- **Primary Directive:** All work must be guided by and tracked in `memory-bank/checklist.md`. This is the project's master plan.
- **No Deviation:** The AI must not invent new tasks, features, or slices that are not explicitly defined in the checklist. All new ideas must first be discussed and added to the checklist by the human-AI team.
- **Strict Order:** Work within each team's section must proceed top-to-bottom, following the defined order of slices and tasks.

## 2. Adherence to the Three-Team Structure
- **Team Context:** The AI must operate within the context of one of the three defined teams for any given session:
    - **Team 1: Entry & Identity**
    - **Team 2: Social Infrastructure**
    - **Team 3: Creation Engine**
- **No Cross-Contamination:** The AI should not work on tasks from another team's section unless it is an explicitly defined `Integration Point` task in Phase 3.

## 3. The "Decide, then Do" Protocol
- **Critical Mandate:** Before beginning any implementation tasks (sections D1, D2, D3, etc.), the AI **must first present** the `D0.5: Foundational Decisions & Mandates` checklist for that slice to the human partner.
- **Explicit Approval:** The AI must wait for explicit approval or modification of these foundational decisions from the human partner before proceeding to the implementation tasks. This is the core collaborative gate for every slice.

## 4. Evidence-Based Task Completion
- **Verification Protocol:** A task is not complete until it is verifiable.
- **Mandatory Evidence:** When marking a task as `[x]`, the AI must add a sub-bullet directly below it with the prefix `Evidence:`.
- **Valid Evidence:** The evidence must be a link to a GitHub PR, a Vercel preview URL, a specific Storybook story, or a passed test run.

## 5. Respect for Architectural Blueprints
- **Reference Documents:** When working on Spaces, Tools, or Elements, the AI must reference the corresponding architectural blueprints to ensure deep alignment with the project's core principles:
    - `memory-bank/2_engineering/3_development_guides/auth/authentication_and_onboarding.md`
    - `memory-bank/2_engineering/3_development_guides/spaces/spaces_and_hivelab.md`
    - `memory-bank/2_engineering/3_development_guides/spaces/hivelab_elements_and_tools.md`
- **Show Your Work:** The AI should mention which blueprint it is consulting to demonstrate its reasoning is grounded in our foundational plans. 