import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicRoute, OptionalAuthWrapper } from "@/components/auth/AuthMiddleware";
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
import EmailVerification from "./pages/EmailVerification";
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
            <Route path="/" element={
              <OptionalAuthWrapper>
                <Index />
              </OptionalAuthWrapper>
            } />
            
            {/* Dashboard - protected route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* PDF Tools - Open access, optional authentication */}
            <Route path="/merge-pdf" element={
              <OptionalAuthWrapper>
                <MergePDF />
              </OptionalAuthWrapper>
            } />
            <Route path="/split-pdf" element={
              <OptionalAuthWrapper>
                <SplitPDF />
              </OptionalAuthWrapper>
            } />
            <Route path="/remove-pages" element={
              <OptionalAuthWrapper>
                <RemovePages />
              </OptionalAuthWrapper>
            } />
            <Route path="/extract-pages" element={
              <OptionalAuthWrapper>
                <ExtractPages />
              </OptionalAuthWrapper>
            } />
            <Route path="/jpg-to-pdf" element={
              <OptionalAuthWrapper>
                <JpgToPDF />
              </OptionalAuthWrapper>
            } />
            <Route path="/compress-pdf" element={
              <OptionalAuthWrapper>
                <CompressPDF />
              </OptionalAuthWrapper>
            } />
            <Route path="/convert-pdf" element={
              <OptionalAuthWrapper>
                <ConvertPDF />
              </OptionalAuthWrapper>
            } />
            
            {/* Public Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            
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
            <Route path="/email-verification" element={
              <PublicRoute>
                <EmailVerification />
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
