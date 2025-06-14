# HIVE Branching Strategy & Protection Rules

This document outlines the branching model and the mandatory branch protection rules enforced for the HIVE monorepo.

## 1. Branching Model

We follow a simplified `main`-branch workflow.

- **`main`**: This is the single, primary branch. It must **always** be in a deployable, production-ready state. All CI checks must pass at all times.
- **Feature Branches**: All new work (features, bug fixes, experiments) MUST be done on a separate branch, typically named using the format `[user-initials]/[task-id]/[short-description]` (e.g., `ai/T1-S1A-02/school-search-input`).
- **Pull Requests (PRs)**: All code must be merged into `main` via a Pull Request. Direct pushes to `main` are strictly forbidden.

## 2. Proposed Branch Protection Rules for `main`

The following rules will be enforced by GitHub for the `main` branch. This is the implementation plan for task `FND-06`.

| Rule | Setting | Rationale |
| :--- | :--- | :--- |
| **Require a pull request before merging** | **On** | Prevents direct pushes, ensuring all changes go through a formal review process. |
| &nbsp;&nbsp;↳ Require approvals | **On** (1 approval) | Enforces that at least one other team member (the human partner) has reviewed and signed off on the code. This is our core AI/Human verification loop. |
| &nbsp;&nbsp;↳ Dismiss stale pull request approvals when new commits are pushed | **On** | Ensures that any changes made after an approval are re-reviewed, preventing accidental inclusion of unvetted code. |
| **Require status checks to pass before merging** | **On** | Protects the integrity of `main`. Code cannot be merged unless all automated quality gates (linting, type-checking, tests) are green. |
| &nbsp;&nbsp;↳ Require branches to be up to date before merging | **On** | Prevents merge conflicts and ensures that CI is run against the latest version of the `main` branch, avoiding "it worked on my machine" issues. |
| **Require conversation resolution before merging** | **On** | Ensures that all review comments and open questions have been addressed before the code is merged. |
| **Require linear history** | **On** | Prevents merge commits (`git merge`) in favor of squashing or rebasing. This keeps the commit history of `main` clean, linear, and easy to follow. |
| **Include administrators** | **On** | Enforces all these rules for repository administrators as well. There are no exceptions. |

---

**Human Task `HT-FND-06-01`:** Please review and approve these proposed rules. Once approved, I will mark task `FND-06` as complete. The actual implementation of these rules is a manual process in the GitHub repository settings. 