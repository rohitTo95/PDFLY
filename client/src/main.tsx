import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Setup PDF.js worker early in the application lifecycle
import './utils/pdfWorkerSetup'

createRoot(document.getElementById("root")!).render(<App />);
