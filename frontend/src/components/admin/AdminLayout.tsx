import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // CHANGED: Use sessionStorage
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Arah Admin</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <NavLink 
          to="/admin/dashboard" 
          end
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`
          }
          onClick={() => setIsOpen(false)}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink 
          to="/admin/messages" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`
          }
          onClick={() => setIsOpen(false)}
        >
          <MessageSquare className="w-5 h-5" />
          Messages
        </NavLink>

        <NavLink 
          to="/admin/careers" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`
          }
          onClick={() => setIsOpen(false)}
        >
          <Briefcase className="w-5 h-5" />
          Careers (CRUD)
        </NavLink>
      </nav>

      <div className="px-4 mt-auto">
        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:block w-64 border-r bg-card">
        <SidebarContent />
      </aside>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen bg-muted/10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;