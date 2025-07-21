# Changelog

All notable changes to PDFY will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with React 18 and TypeScript
- PDF preview functionality with react-pdf
- Modern UI with Tailwind CSS and Radix UI components
- User authentication with Supabase
- Core PDF operations:
  - Merge PDFs
  - Split PDFs
  - Remove pages
  - Extract pages
  - JPG to PDF conversion
  - PDF compression
  - PDF format conversion
- Responsive design for mobile and desktop
- Dark/Light theme toggle
- User dashboard and profile management

### Technical
- Vite build system for fast development
- TypeScript for type safety
- ESLint and Prettier for code quality
- React Query for state management
- React Router for navigation
- Component library with shadcn/ui
- PDF.js worker configuration for optimal performance

### Infrastructure
- Client-server architecture
- Supabase backend integration
- Environment-based configuration
- Git workflows and CI/CD ready

## [0.1.0] - 2025-07-22

### Added
- Initial release of PDFY
- Core PDF manipulation features
- User authentication system
- Modern React frontend
- Node.js backend API
- Comprehensive documentation

---

## Release Notes Format

### Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

### Version Numbering
- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backwards compatible
- **Patch** (0.0.X): Bug fixes, backwards compatible
