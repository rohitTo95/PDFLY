
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "@/components/auth/AuthMiddleware";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import RemovePages from "./pages/RemovePages";
import ExtractPages from "./pages/ExtractPages";
import JpgToPDF from "./pages/JpgToPDF";
import CompressPDF from "./pages/CompressPDF";
import ConvertPDF from "./pages/ConvertPDF";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Dashboard - protected route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - require authentication */}
            <Route path="/merge-pdf" element={
              <ProtectedRoute>
                <MergePDF />
              </ProtectedRoute>
            } />
            <Route path="/split-pdf" element={
              <ProtectedRoute>
                <SplitPDF />
              </ProtectedRoute>
            } />
            <Route path="/remove-pages" element={
              <ProtectedRoute>
                <RemovePages />
              </ProtectedRoute>
            } />
            <Route path="/extract-pages" element={
              <ProtectedRoute>
                <ExtractPages />
              </ProtectedRoute>
            } />
            <Route path="/jpg-to-pdf" element={
              <ProtectedRoute>
                <JpgToPDF />
              </ProtectedRoute>
            } />
            <Route path="/compress-pdf" element={
              <ProtectedRoute>
                <CompressPDF />
              </ProtectedRoute>
            } />
            <Route path="/convert-pdf" element={
              <ProtectedRoute>
                <ConvertPDF />
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes - redirect if already authenticated */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
