import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import CareersAdmin from "./pages/admin/CareersAdmin"; 
// Import the new Applications page
import CareersApplications from "./pages/admin/CareersApplications"; 
// Import the new Products Admin page
import ProductsAdmin from "./pages/admin/ProductsAdmin";

const queryClient = new QueryClient();

// --- Components ---

// ScrollToTop Component: Ensures page starts at top when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
            {/* Add ScrollToTop here inside BrowserRouter */}
            <ScrollToTop />
            
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
                {/* Default redirect to dashboard */}
                <Route index element={<Navigate to="dashboard" replace />} />
                
                {/* Admin Sub-routes */}
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="messages" element={<Messages />} />
                <Route path="careers" element={<CareersAdmin />} />
                <Route path="careersApplications" element={<CareersApplications />} />
                
                {/* NEW ROUTE: Products Management */}
                <Route path="products" element={<ProductsAdmin />} />
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