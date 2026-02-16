import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Eye, 
  Search, 
  FileText, 
  Linkedin, 
  Mail, 
  Phone, 
  Calendar,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you have these
import { Badge } from '@/components/ui/badge';   // Assuming you have these
import { Input } from '@/components/ui/input';   // Assuming you have these

// --- Types based on your Mongoose Schema ---
interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  coverLetter: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CareersApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // --- Fetch Applications ---
  const fetchApplications = async () => {
    try {
      const token = sessionStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch(`${API_URL}/applications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        sessionStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch applications');

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Delete Application ---
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        if (selectedApp?._id === id) setSelectedApp(null);
      } else {
        alert('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // --- Filtering Logic ---
  const filteredApplications = applications.filter(app => 
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Helpers ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Reviewed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Shortlisted': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground mt-1">
            Manage incoming applications from your career page.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Applied For</th>
                <th className="px-4 py-3">Applied Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.fullName}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{app.jobTitle}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`${getStatusColor(app.status)} border-none`}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedApp(app)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(app._id)}
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Details Modal (Overlay) --- */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-background z-10">
              <div>
                <h2 className="text-xl font-bold">{selectedApp.fullName}</h2>
                <p className="text-muted-foreground text-sm">Applied for: {selectedApp.jobTitle}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href={`mailto:${selectedApp.email}`} className="hover:underline">{selectedApp.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a href={`tel:${selectedApp.phone}`} className="hover:underline">{selectedApp.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    {selectedApp.linkedin ? (
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                        View Profile
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not provided</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Applied Date</p>
                    <span>{formatDate(selectedApp.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Cover Letter Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Cover Letter</h3>
                </div>
                <div className="bg-muted/20 p-4 rounded-md text-sm leading-relaxed whitespace-pre-wrap text-foreground/90 border">
                  {selectedApp.coverLetter}
                </div>
              </div>

              {/* ID Reference */}
              <div className="pt-4 border-t text-xs text-muted-foreground flex justify-between">
                <span>Application ID: {selectedApp._id}</span>
                <span>Job ID: {selectedApp.jobId}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-muted/10 flex justify-end gap-2 sticky bottom-0">
               <Button variant="outline" onClick={() => setSelectedApp(null)}>
                 Close
               </Button>
               <Button 
                 variant="destructive" 
                 onClick={() => {
                   handleDelete(selectedApp._id);
                 }}
               >
                 Delete Application
               </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersApplications;