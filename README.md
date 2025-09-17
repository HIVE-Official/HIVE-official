# HIVE - Campus Social Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange.svg)](https://firebase.google.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.1.1-yellow.svg)](https://pnpm.io/)

**A complete social platform for university communities - built with modern web technologies**

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📖 Documentation

All documentation is organized in the [`docs/`](./docs/) directory:

- **[Developer Guide](./docs/guides/DEVELOPER_GUIDE.md)** - Quick reference for developers
- **[Code Standards](./docs/standards/CODE_STANDARDS.md)** - Coding conventions and patterns
- **[Architecture](./docs/architecture/)** - System design and technical decisions
- **[CLAUDE.md](./CLAUDE.md)** - AI-assisted development guidelines

## 🎯 What is HIVE?

HIVE is a comprehensive social platform designed specifically for university communities:

### Core Features
- **🏠 Spaces** - Communities for dorms, majors, clubs, and interests
- **📅 Events** - Organize and discover campus activities
- **🛠️ Tools** - Build and share campus utilities with visual builder
- **🔄 Rituals** - Recurring campus traditions and events
- **📱 Feed** - Real-time updates from your communities
- **👤 Profiles** - Personal dashboards with privacy controls

## 🏗️ Project Structure

```
hive/
├── apps/
│   ├── web/          # Main Next.js application
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Shared component library
│   ├── core/         # Business logic and types
│   ├── hooks/        # Shared React hooks
│   ├── validation/   # Schema validation
│   └── ...           # Other shared packages
├── docs/             # All documentation
└── scripts/          # Build and utility scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Animations

### Backend
- **Firebase** - Authentication, Firestore, Storage
- **Next.js API Routes** - Serverless functions
- **Zod** - Schema validation

### Infrastructure
- **Turborepo** - Monorepo management
- **pnpm** - Fast, efficient package manager
- **ESLint/Prettier** - Code quality

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checks

# Testing
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests

# Tools
pnpm storybook        # Start Storybook
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in `apps/web/`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

## 🚦 Development Workflow

1. **Check out a new branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**
   - Follow [Code Standards](./docs/standards/CODE_STANDARDS.md)
   - Write tests for new features
   - Update documentation if needed

3. **Run checks**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Read the [Code Standards](./docs/standards/CODE_STANDARDS.md)
2. Check the [Developer Guide](./docs/guides/DEVELOPER_GUIDE.md)
3. Follow the development workflow above
4. Open a pull request with a clear description

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

- Check the [documentation](./docs/)
- Review [CLAUDE.md](./CLAUDE.md) for AI assistance
- Open an issue for bugs or feature requests

---

Built with ❤️ for university communities