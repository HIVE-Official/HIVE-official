# SPACES & HIVELAB — COMPLETE SYSTEM SPEC (vBETA ↠ Semester Start)

*Read-me first: this is the single source-of-truth section for every engineer, designer, mod-lead, and Builder onboarding doc. It assumes no prior knowledge and folds in the newest "weekly-release" cadence and the decision to open all Spaces at semester start (Orientation Week).*

## 1. Purpose & Thesis
A Space is HIVE's programmable container for any campus micro-community—classes, majors, dorm floors, clubs, Greek chapters, or admin nodes. Students don't just join Spaces; Builders shape them by dropping Tools that turn empty surfaces into live social mechanics. 

## 2. Core Principles
| Principle | Why we hold it |
|---|---|
| Modular-by-default | All behaviour is injected via Tools; nothing is hard-wired. |
| Dormant until student-activated | Prevents "ghost" feeds and keeps quality in student hands. |
| Weekly evolution | Every Monday we drop new Elements/Tools; Builders decide when they matter. |
| Safety tax ≥ 20 % sprint | Hard rule: abuse prevention is always budgeted. |

## 3. Anatomy of a Space (Six Surfaces)
| # | Surface | Function | Default State |
|---|---|---|---|
| 1 | Pinned | Intro blocks, links, banners | "About this Space" text |
| 2 | Posts | Threads & quick polls | Hidden until a Tool is placed |
| 3 | Events | Calendar cards with RSVP | Hidden until EventCard exists |
| 4 | Tools Stack | Running list of live Tools | Empty |
| 5 | Chat | Real-time thread | Locked until v0.1.1 patch |
| 6 | Members | Grid of joined profiles | Auto-generated |

*All six surfaces are immutable in order/layout, giving students muscle-memory across Spaces.*

## 4. Space Types & Tagging
| Tag | Auto-join Logic | Examples |
|---|---|---|
| Academic:Class | Registrar import; all enrolled students | "BIO 201 – Cell Biology" |
| Academic:Major | user.major field | "Computer Science Majors" |
| Residential | Housing feed | "Governors Hall – 3rd Floor" |
| Student-Run | Request + approval | "UB Improv Club" |
| Greek Life | Request + approval | "Alpha Chi Omega – Beta Tau" |
| Uni Department | System-assigned | "Career Services" |

*All tags live in space_type / sub_type fields so directory filters stay future-proof.*

## 5. Lifecycle & States
-   **Dormant (Preview):** read-only mock surfaces, "Become a Builder" CTA.
-   **Activated:** first Tool placed, empty-state CTAs visible.
-   **Thriving:** activity_score > threshold; eligible for Trending rail.
-   **Frozen:** admin-only lock during abuse review.

*Course Spaces import as Activated on day 0 so every class feels alive from the first lecture.*

## 6. Roles & Permissions
| Action | Member | Builder | Admin |
|---|---|---|---|
| View & interact | ✔ | ✔ | ✔ |
| Place / edit Tools | — | ✔ | ✔ |
| Edit description / banner | — | ✔ | ✔ |
| Grant Builder | — | — | ✔ |
| Freeze Space | — | — | ✔ |

*Only the first student who opts in becomes Builder for that Space; multi-admin conflict handling is a post-vBETA roadmap item.*

## 7. Default Tool Palette (Semester Start)
| Tool | Surface | Quick Purpose |
|---|---|---|
| WelcomeBanner | Pinned | Sets vibe on first open |
| PromptPost | Posts | Reflection / intro thread |
| Pulse | Posts | One-question poll |
| EventCard | Events | Schedule + RSVP |
| PinnedLink | Pinned | Syllabus, drive link |
| JoinForm | Pinned | Gate entry (clubs/Greek) |

*All other Tools arrive in weekly drops; Chat is v0.1.1 after stability review.*

## 8. Templates for Lightning Setup
| Template | Included Tools | Intended For |
|---|---|---|
| Academic Cohort | Pulse · EventCard · PinnedLink | Majors & departments |
| Class Room | WelcomeBanner · EventCard | Individual courses |
| Residential Commons | WelcomeBanner · PromptPost | Dorm floors |
| Student Club Hub | JoinForm · EventCard · PinnedLink | Student orgs |
| Greek Chapter Home | PromptPost · Pulse · JoinForm | Fraternities/Sororities |

*Builders can start from a template or raw Tool picker; both routes satisfy the activation checklist.*

## 9. Builder Day-1 Flow
1.  Role grant toast → badge appears.
2.  Modal overlay: "You run this Space" + 3-step checklist
    1.  Place one Tool
    2.  Edit description
    3.  Pin resource.
3.  Checklist chip persists until complete.
4.  HiveLAB opens with "First-Tool Quickstart" wizard.

## 10. Discovery & Directory
-   `/spaces` list launches with alphabetical sort, then upgrades on Day +1 to `activity_score` DESC.
-   Filter pills map to the six tags above.
-   Trending rail (top 5 surging) ships in Week 2 patch.
-   Personal Profile shows auto-joined, previewed, and joined Spaces.

## 11. Weekly Update Cadence
| Cadence | What drops | Who cares |
|---|---|---|
| Every Monday | 6-8 new Elements → 2-3 template Tools | Builders in HiveLAB |
| Every Wednesday | "Builder Prompt" survey | Guides next drop |
| Every Friday | Trending Spaces + Tool surge recap banner | All users |

*All drops are flagged in HiveLAB banners and can be reverse-rolled within 15 min if issues flare.*

## 12. Safety & Moderation
-   Keyword filter on `PromptPost`/`Pulse`.
-   `JoinForm` rate-limits.
-   Immediate freeze toggle for admins.
-   Greek Life Spaces audited weekly during rush season.

## 13. Analytics & Success Metrics
| KPI | Launch Target |
|---|---|
| Builder ratio | ≥ 15 % of active users |
| Active Spaces/day | ≥ 30 % of total containers |
| Dormant bounce (<15 s) | ≤ 10 % |
| Avg. class-Space session | ≥ 2 min |

*Events stream to BigQuery via the existing Tool interaction & session-length hooks.* 