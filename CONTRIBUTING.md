# Contributing to PDFY

Thank you for your interest in contributing to PDFY! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/pdfy.git
   cd pdfy
   ```

2. **Install Dependencies**
   ```bash
   # Client dependencies
   cd client && npm install
   
   # Server dependencies
   cd ../server && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   
   # Edit with your credentials
   ```

4. **Start Development**
   ```bash
   # Terminal 1: Client
   cd client && npm run dev
   
   # Terminal 2: Server
   cd server && npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code formatting is handled automatically
- **Components**: Use functional components with hooks

### Naming Conventions

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`pdfUtils.ts`)
- **Variables**: camelCase (`fileName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Components**: PascalCase (`PDFPreview`, `FileUploader`)

### Component Structure

```tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props interface
}

export const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className={cn("base-classes", className)}>
      {/* Component content */}
    </div>
  );
};
```

### Commit Messages

Follow conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add PDF compression feature
fix: resolve PDF preview loading issue
docs: update API documentation
```

## 🧪 Testing

### Running Tests

```bash
# Client tests
cd client && npm test

# Server tests
cd server && npm test
```

### Writing Tests

- Write unit tests for utilities and hooks
- Add integration tests for API endpoints
- Test components with React Testing Library

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

## 💡 Feature Requests

For new features, please:

1. Check existing issues and discussions
2. Provide a clear use case
3. Explain the expected behavior
4. Consider the impact on existing functionality

## 🔍 Code Review Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes with clear commits
4. **Test** your changes thoroughly
5. **Update** documentation if needed
6. **Submit** a pull request

### Pull Request Guidelines

- **Title**: Clear, descriptive title
- **Description**: Explain what changes were made and why
- **Testing**: Describe how the changes were tested
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Note any breaking changes

## 📁 Project Structure

```
PDFY/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   └── utils/              # Server utilities
└── supabase/               # Database & auth
```

## 🛠️ Development Tools

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
- ESLint

### Useful Commands

```bash
# Lint and fix
npm run lint

# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Areas for Contribution

We welcome contributions in these areas:

- **Bug fixes**: Help resolve existing issues
- **New PDF tools**: Add more PDF manipulation features
- **UI/UX improvements**: Enhance the user interface
- **Performance optimizations**: Improve app performance
- **Documentation**: Improve docs and add tutorials
- **Testing**: Add tests to improve coverage
- **Accessibility**: Make the app more accessible

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: Join our community (link TBD)

## 📜 License

By contributing to PDFY, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PDFY! 🎉
