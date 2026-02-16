import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  Menu,
  Users, 
  ChevronsLeft,
  ChevronsRight,
  FileText, // For Offer Letter
  Receipt,  // For Invoice
  Package   // For Products
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile Sheet State
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop Collapse State

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // --- Sidebar Content Component ---
  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex flex-col h-full py-4 transition-all duration-300">
      
      {/* Header / Logo */}
      <div className={cn("px-6 mb-8 flex items-center h-10", collapsed ? "justify-center px-2" : "justify-between")}>
        {!collapsed ? (
          <h1 className="text-2xl font-display font-bold gradient-text whitespace-nowrap overflow-hidden transition-all duration-300">
            Arah Admin
          </h1>
        ) : (
          <span className="text-xl font-bold gradient-text">A</span>
        )}
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2">
        {/* 1. Dashboard */}
        <NavLink 
          to="/admin/dashboard" 
          end
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
          title={collapsed ? "Dashboard" : ""}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Dashboard</span>}
        </NavLink>

        {/* 2. Messages */}
        <NavLink 
          to="/admin/messages" 
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
          title={collapsed ? "Messages" : ""}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Messages</span>}
        </NavLink>

        {/* 3. Careers */}
        <NavLink 
          to="/admin/careers" 
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
          title={collapsed ? "Careers" : ""}
        >
          <Briefcase className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Careers</span>}
        </NavLink>

        {/* 4. Job Applications */}
        <NavLink 
          to="/admin/careersApplications" 
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
          title={collapsed ? "Job Applications" : ""}
        >
          <Users className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Job Applications</span>}
        </NavLink>

        {/* 5. Products Management (NEW) */}
        <NavLink 
          to="/admin/products" 
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
          title={collapsed ? "Products" : ""}
        >
          <Package className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Products</span>}
        </NavLink>

        {/* --- Divider --- */}
        <div className="my-2 border-t border-border/50 mx-2" />

        {/* 6. External Tool: Invoice Generator */}
        <a 
          href="https://Invoicepdf.netlify.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative text-muted-foreground hover:bg-muted cursor-pointer",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Invoice Generator" : ""}
        >
          <Receipt className="w-5 h-5 flex-shrink-0 text-orange-500" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Invoice Generator</span>}
        </a>

        {/* 7. External Tool: Offer Letter Generator */}
        <a 
          href="https://automated-offer-letter-generator-mocha.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative text-muted-foreground hover:bg-muted cursor-pointer",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Offer Letter Generator" : ""}
        >
          <FileText className="w-5 h-5 flex-shrink-0 text-blue-500" />
          {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all duration-200">Offer Letter Gen</span>}
        </a>

      </nav>

      {/* Logout Button */}
      <div className="px-3 mt-auto">
        <Button 
          variant="outline" 
          className={cn(
            "w-full text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut className={cn("w-4 h-4", !collapsed && "mr-2")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      
      {/* --- Desktop Sidebar --- */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r bg-card h-screen sticky top-0 transition-all duration-300 ease-in-out relative group",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-muted hidden group-hover:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-3 w-3" />
          ) : (
            <ChevronsLeft className="h-3 w-3" />
          )}
        </Button>

        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {/* --- Mobile Sidebar (Sheet) --- */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background shadow-sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent collapsed={false} />
          </SheetContent>
        </Sheet>
      </div>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen bg-muted/10 transition-all duration-300">
        <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;