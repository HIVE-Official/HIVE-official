# HIVE vBETA: Hypothesis-Driven Roadmap

**CEO Mandate:** This is the single source of truth for building the HIVE vBETA. It fuses our product strategy (the "why") with architectural rules and tactical execution (the "what" and "how"). All other checklist documents are now deprecated.

---

## **?? Core Principles (Mandatory)**

*These are non-negotiable rules applied to every task.*

- **Hypothesis-Driven:** Every feature is a test. We build to learn. Our work follows the `DEFINE -> BUILD -> VALIDATE` cycle.
- **Brand-Aligned:** All work must adhere to the HIVE brand standards: #0A0A0A canvas, #FFD700 accent, confident tone, and student-centric ethos.
- **Architecturally Sound:** All work must use the established design tokens, monorepo packages (`@hive/ui`, `@hive/hooks`, etc.), and routing conventions.
- **Mobile-First:** All interfaces must be designed and built for a 390px minimum width first.

---

## **EPIC 1: THE FIRST-TIME USER EXPERIENCE (The "Front Door")**

### **Feature Cluster: Public Site, Signup & Onboarding**
*Core Hypothesis: A frictionless, value-driven onboarding flow is the single most important driver of long-term user retention.*

| ID         | Type     | Hypothesis / Goal                                      | Task / Decision Description                                        | Validation Metric / Evidence                               | Status |
|:-----------|:---------|:-------------------------------------------------------|:-------------------------------------------------------------------|:-----------------------------------------------------------|:-------|
| **ONB-01** | **DEFINE**   | A visitor must grasp our "why" in 5 seconds.           | **DECISION:** Finalize the single-sentence HIVE value proposition.   | A clear, concise statement is documented.                    | ☐      |
| **ONB-02** | **BUILD**    | The value prop must be front and center.               | **TASK:** Build the `/welcome` page, featuring the value prop & a single CTA. | `welcome.tsx` is built; Storybook story exists.              | ☐      |
| **ONB-03** | **VALIDATE** | The landing page effectively converts interest.        | **TASK:** Add analytics to the CTA button.                         | Visitor-to-signup-start conversion rate > 5%.              | ☐      |
| **ONB-04** | **DEFINE**   | Users require trust to sign up.                        | **TASK:** Draft and approve final ToS & Privacy Policy text.       | Legal documents are approved and stored in `/legal`.         | ☐      |
| **ONB-05** | **BUILD**    | Trust must be established at the point of entry.       | **TASK:** Build ToS/Privacy pages and link them from the site footer. | Pages are live; links are present.                           | ☐      |
| **ONB-06** | **BUILD**    | A passwordless flow reduces friction.                  | **TASK:** Implement magic-link API & UI, including ToS checkbox.   | User can receive email, click link, and be authenticated.    | ☐      |
| **ONB-07** | **DEFINE**   | A unique identity fosters ownership.                   | **DECISION:** Define character limits & validation rules for handles. | Rules are documented.                                        | ☐      |
| **ONB-08** | **BUILD**    | Identity creation should be simple.                    | **TASK:** Build the UI for "Choose your handle" & "Set your name".   | Onboarding step exists and enforces validation rules.        | ☐      |
| **ONB-09** | **VALIDATE** | Users can easily create a valid identity.              | **TASK:** Instrument analytics for handle selection success/failure. | >98% of users create a handle on their first try.            | ☐      |

</rewritten_file> 