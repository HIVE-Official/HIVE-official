# HIVE Codebase Architecture

## 📐 Top-Level Structure

```
/
├── apps/                     # Applications
│   ├── web/                  # Main Next.js app (port 3000)
│   └── admin/                # Admin dashboard (port 3001)
│
├── packages/                 # Shared packages (monorepo)
│   ├── ui/                   # @hive/ui - Atomic design system
│   ├── core/                 # @hive/core - DDD business logic
│   ├── firebase/             # @hive/firebase - Firebase integration
│   ├── auth-logic/           # @hive/auth-logic - Authentication
│   ├── hooks/                # @hive/hooks - React hooks
│   ├── tokens/               # @hive/tokens - Design tokens
│   ├── validation/           # @hive/validation - Zod schemas
│   ├── analytics/            # @hive/analytics - Analytics tracking
│   ├── i18n/                 # @hive/i18n - Internationalization
│   ├── api-client/           # @hive/api-client - API client
│   ├── utilities/            # @hive/utilities - Shared utils
│   └── config/               # @hive/config - Shared config
│
├── docs/                     # Documentation
│   ├── features/             # Feature specifications
│   ├── ux/                   # UX topology + design patterns
│   ├── api/                  # API documentation
│   ├── development/          # Developer guides
│   ├── deployment/           # Deployment guides
│   ├── architecture/         # System architecture docs
│   └── archive/              # Old docs + migration notes
│
├── infrastructure/           # Infrastructure & deployment
│   ├── firebase/             # Firebase config + Cloud Functions
│   ├── docker/               # Docker configs
│   ├── kubernetes/           # Kubernetes configs
│   ├── deploy/               # Deployment scripts
│   └── dataconnect/          # Data Connect schema
│
├── tooling/                  # Development tools
│   ├── scripts/              # Build/dev scripts
│   ├── mcp-servers/          # MCP servers
│   └── .storybook/           # Storybook config
│
├── public/                   # Static assets
│
├── .claude/                  # Claude Code config
├── .cursor/                  # Cursor IDE config
├── .husky/                   # Git hooks
├── .vercel/                  # Vercel deployment config
├── .vscode/                  # VSCode config
│
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # Workspace config
├── turbo.json                # Turborepo config
└── tsconfig.json             # Root TypeScript config
```

## 🎯 Design Principles

1. **Clear Separation**: Apps, packages, docs, infra, tooling are separate
2. **Monorepo Structure**: All packages in `/packages`, all apps in `/apps`
3. **Documentation First**: All docs in `/docs` with clear categorization
4. **Infrastructure Isolated**: All deployment/infra in `/infrastructure`
5. **Tooling Separated**: Dev tools in `/tooling`, not cluttering root

## 📦 Package Dependencies

```
apps/web → depends on → all packages/*
apps/admin → depends on → @hive/ui, @hive/core

@hive/ui → depends on → @hive/tokens
@hive/hooks → depends on → @hive/core, @hive/tokens
@hive/auth-logic → depends on → @hive/firebase
@hive/core → depends on → @hive/firebase
```

## 🏗️ Build Order (Turborepo)

1. `@hive/tokens` - Design tokens
2. `@hive/firebase` - Firebase init
3. `@hive/core` - Business logic
4. `@hive/auth-logic`, `@hive/validation`, `@hive/analytics`
5. `@hive/hooks` - React hooks
6. `@hive/ui` - UI components
7. `apps/web`, `apps/admin` - Applications

## 📚 Documentation Index

- [Feature Specs](./features/) - Product requirements
- [UX Topology](./ux/) - Design patterns
- [API Docs](./api/) - API reference
- [Development](./development/) - Dev setup guides
- [Deployment](./deployment/) - Deploy guides
- [Architecture](./architecture/) - System design

---

**Last Updated:** November 15, 2025  
**Branch:** main (formerly storybook-production-rebuild)  
**Clean Architecture:** 30+ dirs → 13 dirs
