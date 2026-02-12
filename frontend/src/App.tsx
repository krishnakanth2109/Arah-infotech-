import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import WebsiteDesigning from "./pages/services/WebsiteDesigning";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import AISolutions from "./pages/services/AISolutions";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Industries from "./pages/Industries";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Admin Components & Pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import Messages from "./pages/admin/Messages";
import CareersAdmin from "./pages/admin/CareersAdmin"; // Make sure file exists now

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // CHANGED: Use sessionStorage
  const token = sessionStorage.getItem("adminToken");
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/website-designing" element={<WebsiteDesigning />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/ai-solutions" element={<AISolutions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* --- Admin Authentication --- */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* --- Protected Admin Area --- */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="messages" element={<Messages />} />
                <Route path="careers" element={<CareersAdmin />} />
              </Route>

              {/* --- 404 --- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;