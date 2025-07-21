# 📄 PDFY - Lovely PDF Tool

<div align="center">
  <img src="client/public/favicon_io/android-chrome-512x512.png" alt="PDFY Logo" width="120" height="120" />
  
  <h3>✨ The Ultimate PDF Toolkit for Modern Web</h3>
  
  <p>A powerful, user-friendly web application for all your PDF manipulation needs. Built with modern technologies for a seamless experience.</p>

  ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-7.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

  <p>
    <a href="#features">🚀 Features</a> •
    <a href="#demo">🖼️ Demo</a> •
    <a href="#quick-start">⚡ Quick Start</a> •
    <a href="#tech-stack">🛠️ Tech Stack</a> •
    <a href="#architecture">🏗️ Architecture</a>
  </p>
</div>

---

## 🚀 Features

### 📋 Core PDF Operations
- **🔗 Merge PDFs** - Combine multiple PDF files into one
- **✂️ Split PDFs** - Break down large PDFs into smaller files
- **🗑️ Remove Pages** - Delete unwanted pages from your PDFs
- **📤 Extract Pages** - Pull out specific pages to create new documents
- **🖼️ JPG to PDF** - Convert images to PDF format
- **📉 Compress PDFs** - Reduce file size while maintaining quality
- **🔄 Convert PDFs** - Transform PDFs to different formats

### 🎨 User Experience
- **🎨 Modern UI** - Beautiful, responsive design with Tailwind CSS
- **🌙 Dark/Light Mode** - Theme toggle for comfortable viewing
- **📱 Mobile Responsive** - Works seamlessly on all devices
- **⚡ Real-time Preview** - Live PDF preview with page navigation
- **🔒 Secure Authentication** - User accounts with Supabase Auth
- **📊 Dashboard** - Personalized user dashboard

### 🛡️ Technical Excellence
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🔧 Type Safe** - Full TypeScript implementation
- **🎯 Component Library** - Radix UI + shadcn/ui components
- **🚀 Modern Stack** - Latest React 18 with concurrent features
- **📱 PWA Ready** - Progressive Web App capabilities

---

## 🖼️ Demo

> **📸 Screenshots will be added here**

---

## ⚡ Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### 🚀 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/pdfy.git
cd pdfy

# 2️⃣ Install dependencies for both client and server
cd client && npm install
cd ../server && npm install

# 3️⃣ Set up environment variables
cd ../client
cp .env.example .env
# Edit .env with your Supabase credentials

# 4️⃣ Start the development servers
# Terminal 1: Client (Frontend)
cd client && npm run dev

# Terminal 2: Server (Backend)
cd server && npm run dev
```

### 🌐 Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| ⚛️ **React** | 18.3.1 | UI Framework |
| 🔷 **TypeScript** | 5.5.3 | Type Safety |
| ⚡ **Vite** | 7.0.3 | Build Tool |
| 🎨 **Tailwind CSS** | 3.4.11 | Styling |
| 🧩 **Radix UI** | Latest | Headless Components |
| 📄 **React-PDF** | 10.0.1 | PDF Rendering |
| 🔍 **React Query** | 5.56.2 | State Management |
| 🛣️ **React Router** | Latest | Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 **Node.js** | Runtime Environment |
| 🚀 **Express.js** | Web Framework |
| 🗄️ **Supabase** | Database & Auth |
| 📄 **PDF-lib** | PDF Manipulation |

### Development Tools
- 📝 **ESLint** - Code Linting
- 🎯 **Prettier** - Code Formatting
- 🔧 **TypeScript** - Static Type Checking
- 🧪 **Vitest** - Unit Testing

---

## 🏗️ Architecture

```
PDFY/
├── 📁 client/                 # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI Components
│   │   ├── 📁 pages/          # Route Components
│   │   ├── 📁 contexts/       # React Contexts
│   │   ├── 📁 hooks/          # Custom Hooks
│   │   ├── 📁 services/       # API Services
│   │   └── 📁 utils/          # Utility Functions
│   ├── 📁 public/             # Static Assets
│   └── ⚙️ vite.config.ts      # Vite Configuration
│
├── 📁 server/                 # Node.js Backend API
│   ├── 📁 controllers/        # Request Handlers
│   ├── 📁 routes/             # API Routes
│   ├── 📁 middlewares/        # Custom Middleware
│   └── 📁 utils/              # Server Utilities
│
├── 📁 supabase/               # Database & Auth
│   ├── 📁 functions/          # Edge Functions
│   └── 📁 migrations/         # Database Migrations
│
└── 📄 README.md               # This File
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `client` directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_BASE_URL=http://localhost:5000
```

### Build for Production

```bash
# Build the client
cd client && npm run build

# The built files will be in client/dist/
# Deploy the contents of this folder to your web server
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💻 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[React](https://reactjs.org/)** - The amazing UI library
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service platform
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF rendering in browsers

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Bug Reports**: [Open an issue](https://github.com/your-username/pdfy/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/pdfy/discussions)
- 📧 **Email**: your-email@example.com

---

<div align="center">
  <p>Made with ❤️ by <strong>Your Name</strong></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
