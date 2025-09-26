# Storybook - UI Component Development

## 🚀 Quick Start

### Step 1: Start Development Server

Navigate to the web-app directory and run:

```bash
cd web-app
npm run storybook
```

### Step 2: Open Browser

Once the server starts, open: **[http://localhost:6006](http://localhost:6006)**

---

## 📖 What is Storybook?

Storybook is a frontend workshop for building UI components and pages in isolation. It helps developers:

✅ **Develop components** independently without running the entire app
✅ **Test different states** of components with interactive controls
✅ **Document component APIs** with automatic prop detection
✅ **Share UI components** with designers and stakeholders

---

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run storybook` | Start development server on port 6006 |
| `npm run build-storybook` | Build static files for deployment |

---

## 📁 Project Structure

Our components follow **Feature-Sliced Design** architecture:

```
src/
├── shared/
│   └── ui/
│       └── icons/
│           └── arrow-long-right/
│               ├── arrow-long-right.tsx
│               ├── arrow-long-right.stories.ts  ← Stories here
│               └── index.ts
├── features/
├── widgets/
└── pages/
```

Each component should have its `.stories.ts` file in the same directory.

---

## ✍️ Creating Stories

Stories are written in `*.stories.ts` files alongside components:

```typescript
// arrow-long-right.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import ArrowLongRight, { ArrowLongRightProps } from './arrow-long-right';

const meta: Meta<ArrowLongRightProps> = {
  title: 'Shared/UI/Icons/ArrowLongRight',
  component: ArrowLongRight,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
    strokeWidth: 1.5,
    color: 'currentColor',
  },
};
```

---

## 💡 Tips for Developers

🎮 **Use Controls panel** to test different prop combinations
📚 **Check Docs tab** for auto-generated component documentation
🔄 **Stories = Examples** - they show how to use components
📱 **Test responsive** behavior using viewport controls
🎨 **Design tokens** are documented in Storybook for consistency