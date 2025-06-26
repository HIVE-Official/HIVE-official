# 🚀 HIVE Quick Start for Codex

Welcome to HIVE! This guide will get you up and running in **less than 5 minutes**.

## ⚡ Super Quick Setup

### 1. **Clone & Setup** (2 minutes)
```bash
# Clone the repo
git clone https://github.com/HIVE-Official/HIVE-official.git
cd HIVE-official

# For Windows (PowerShell) - RECOMMENDED
./scripts/setup.ps1

# For macOS/Linux (Bash)
chmod +x ./scripts/setup.sh
./scripts/setup.sh
```

### 2. **Start Development** (30 seconds)
```bash
# Terminal 1: Start web app
cd apps/web && pnpm dev

# Terminal 2: Start Storybook (optional)
cd packages/ui && pnpm storybook
```

### 3. **Verify Everything Works** (30 seconds)
- 🌐 **Web App**: http://localhost:3000
- 📚 **Storybook**: http://localhost:6006
- ✅ **Health Check**: `npx eslint . --max-warnings 15`

---

## 🎯 What You Need to Know (2 minutes read)

### **Project Structure**
```
hive_ui/
├── apps/web/           # Main Next.js app (your focus)
├── packages/ui/        # Storybook components 
├── packages/core/      # Business logic
├── docs/              # Brand guide & architecture
└── scripts/           # Setup scripts
```

### **Key Commands**
| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm storybook` | Start component library |
| `npx eslint . --max-warnings 15` | Lint code |
| `tsc --noEmit` | Type check |
| `pnpm build` | Build for production |

### **Brand & Design**
- **Colors**: Monochrome (black/white) + gold accent (`#FFD700`)
- **Typography**: Space Grotesk (headlines), Geist (body), Geist Mono (code)
- **Style**: Apple & Vercel inspired, heavy radius (8-16px)
- **Guide**: [`docs/brand-design.md`](docs/brand-design.md)

---

## 🐛 Common Issues & Fixes

### **"Firebase not configured"**
- Expected behavior - app runs in mock mode
- To fix: Copy `apps/web/.env.example` to `apps/web/.env.local`

### **ESLint/TypeScript errors**
```bash
# Usually fixes most issues
pnpm install --frozen-lockfile
npx eslint . --max-warnings 15
```

### **Build fails**
```bash
# Clean and rebuild
rm -rf node_modules .next .turbo
pnpm install
cd apps/web && pnpm build
```

### **Windows-specific issues**
- Use PowerShell (not Command Prompt)
- Use `npx` for tool commands
- Run setup script as Administrator if needed

---

## 🎨 Development Workflow

### **Building Components**
1. **Create in Storybook first**: `packages/ui/src/components/`
2. **Follow brand guide**: Dark theme, heavy radius, gold accents
3. **Export from**: `packages/ui/src/index.ts`
4. **Import in app**: `import { MyComponent } from '@hive/ui'`

### **Code Standards**
- **TypeScript**: Strict mode, no `any` types
- **React**: Server Components by default
- **Styling**: Tailwind CSS only
- **Testing**: Vitest + React Testing Library

### **Example Component**
```tsx
// packages/ui/src/components/my-component.tsx
import { cn } from "@/lib/utils"

interface MyComponentProps {
  variant: "primary" | "secondary"
  children: React.ReactNode
  className?: string
}

export const MyComponent = ({ 
  variant, 
  children, 
  className 
}: MyComponentProps) => (
  <div
    className={cn(
      "rounded-lg p-4 font-medium transition-colors",
      {
        "bg-black text-white": variant === "primary",
        "bg-white text-black border": variant === "secondary",
      },
      className
    )}
  >
    {children}
  </div>
)
```

---

## 📚 Essential Reading

| Document | What It Covers | Time |
|----------|----------------|------|
| [`docs/brand-design.md`](docs/brand-design.md) | Visual identity, colors, typography | 5 min |
| [`docs/CODEBASE_AUDIT.md`](docs/CODEBASE_AUDIT.md) | Architecture, package structure | 10 min |
| [`packages/ui/.storybook/`](packages/ui/.storybook/) | Component development setup | 2 min |

---

## 🆘 Need Help?

### **Immediate Issues**
1. Run the setup script again: `./scripts/setup.ps1`
2. Check terminal output for specific errors
3. Try the "Common Issues & Fixes" section above

### **Development Questions**
1. Check the brand guide for design decisions
2. Look at existing components in `packages/ui/src/components/`
3. Reference Storybook stories for usage examples

### **Environment Status**
```bash
# Quick health check
node --version          # Should be 20.12.1+
pnpm --version          # Should be 9.1.1+
npx eslint --version    # Should work
tsc --version           # Should work
```

---

## 🚀 You're Ready!

**Your development environment is now set up!** 

- 🌐 **Web app**: http://localhost:3000
- 📚 **Components**: http://localhost:6006
- 🎨 **Brand guide**: [`docs/brand-design.md`](docs/brand-design.md)
- 🏗️ **Architecture**: [`docs/CODEBASE_AUDIT.md`](docs/CODEBASE_AUDIT.md)

**Happy coding! 🐝** 