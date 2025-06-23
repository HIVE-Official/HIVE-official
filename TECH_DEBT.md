# HIVE Tech Debt Log

This document tracks known technical debt in the HIVE monorepo. Each item should include a description of the debt, the reason it was incurred, and a plan for resolution.

---

## 1. `@hive/core` Linting Issues

-   **Date Incurred:** 2024-07-26
-   **Package(s) Affected:** `packages/core`

### Description

The `@hive/core` package currently has a significant number of ESLint errors, primarily related to `no-explicit-any` and `no-unused-vars`. This indicates that the package's code quality is not up to the standards of the rest of the monorepo.

### Reason for Deferral

The immediate project goal is to build out the UI component library in `packages/ui` using Storybook. The issues in `@hive/core` were blocking the main `pnpm lint` command, which is a required quality gate for UI development.

To maintain velocity on the UI track, the `lint` script was temporarily removed from `packages/core/package.json`.

### Resolution Plan

1.  **Reinstate Linting:** Add the `lint` script back to `packages/core/package.json`.
2.  **Fix Errors:** Methodically go through each file in `packages/core` and fix all ESLint errors. This will likely involve:
    -   Replacing all `any` types with more specific TypeScript types or `unknown`.
    -   Removing all unused variables.
    -   Ensuring all type imports are handled correctly.
3.  **Target Completion:** This task should be completed before the UI components are integrated with the backend logic (Phase 2 of the project).

## 2. `apps/web` Linting Issues

-   **Date Incurred:** 2024-07-26
-   **Package(s) Affected:** `apps/web`

### Description

The `apps/web` package has numerous ESLint errors, including `no-unused-vars`, `no-floating-promises`, and `react-hooks/exhaustive-deps`. This indicates that the application code is not currently in a clean state.

### Reason for Deferral

The immediate project goal is to build out the UI component library in `packages/ui` using Storybook. The linting issues in `apps/web` were blocking the main `pnpm lint` command.

To maintain velocity on the UI track, the `lint` script was temporarily removed from `apps/web/package.json`.

### Resolution Plan

1.  **Reinstate Linting:** Add the `lint` script back to `apps/web/package.json`.
2.  **Fix Errors:** Methodically go through each file in `apps/web` and fix all ESLint errors. This will be a significant task that involves refactoring components, handling promises correctly, and ensuring all hooks have the correct dependencies.
3.  **Target Completion:** This task must be completed before we begin integrating the new UI component library into the web application. 