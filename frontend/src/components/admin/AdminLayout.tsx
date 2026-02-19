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
  FileText, 
  Receipt,  
  Package   
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex flex-col h-full py-4 transition-all duration-300">
      <div className={cn("px-6 mb-8 flex items-center h-10", collapsed ? "justify-center px-2" : "justify-between")}>
        {!collapsed ? (
          <h1 className="text-2xl font-display font-bold gradient-text whitespace-nowrap overflow-hidden transition-all duration-300">
            Arah Admin
          </h1>
        ) : (
          <span className="text-xl font-bold gradient-text">A</span>
        )}
      </div>
      
      <nav className="flex-1 px-3 space-y-2">
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
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Dashboard</span>}
        </NavLink>

      
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
        >
          <Briefcase className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Careers</span>}
        </NavLink>

        {/* 🔹 FIXED PATH HERE: Match App.tsx path="applications" */}
        <NavLink 
          to="/admin/applications" 
          className={({ isActive }) => 
            cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
              isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted',
              collapsed && "justify-center"
            )
          }
          onClick={() => setIsOpen(false)}
        >
          <Users className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Job Applications</span>}
        </NavLink>

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
        >
          <Package className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Products</span>}
        </NavLink>
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
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Contact Messages</span>}
        </NavLink>

        <div className="my-2 border-t border-border/50 mx-2" />

        <a href="https://Invoicepdf.netlify.app" target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-muted", collapsed && "justify-center")}>
          <Receipt className="w-5 h-5 flex-shrink-0 text-orange-500" />
          {!collapsed && <span className="whitespace-nowrap">Invoice Generator</span>}
        </a>

        <a href="https://automated-offer-letter-generator-mocha.vercel.app/" target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-muted", collapsed && "justify-center")}>
          <FileText className="w-5 h-5 flex-shrink-0 text-blue-500" />
          {!collapsed && <span className="whitespace-nowrap">Offer Letter Gen</span>}
        </a>
      </nav>

      <div className="px-3 mt-auto">
        <Button 
          variant="outline" 
          className={cn("w-full text-red-500 hover:bg-red-50", collapsed ? "justify-center px-0" : "justify-start")}
          onClick={handleLogout}
        >
          <LogOut className={cn("w-4 h-4", !collapsed && "mr-2")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className={cn("hidden md:flex flex-col border-r bg-card h-screen sticky top-0 transition-all duration-300 relative", isCollapsed ? "w-20" : "w-64")}>
        <Button variant="ghost" size="icon" className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronsRight className="h-3 w-3" /> : <ChevronsLeft className="h-3 w-3" />}
        </Button>
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon"><Menu className="w-5 h-5" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64"><SidebarContent collapsed={false} /></SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-muted/10 h-screen">
        <div className="mx-auto max-w-7xl h-full">
          <Outlet /> {/* 🔹 Child routes (Dashboard, etc.) render here */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;