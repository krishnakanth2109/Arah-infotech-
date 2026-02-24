import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCareers, createCareer, updateCareer, deleteCareer } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MapPin, 
  Briefcase, 
  Loader2,
  AlertCircle 
} from 'lucide-react';

// --- Validation Patterns ---
const PATTERNS = {
  // Alphanumeric, spaces, hyphens, parenthesis (e.g., "Senior Engineer (L2)")
  JOB_ROLE: /^[a-zA-Z0-9\s\-\(\)]+$/, 
  
  // Strictly letters and spaces (e.g., "Engineering", "Human Resources")
  DEPT: /^[a-zA-Z\s]+$/, 
  
  // Alphanumeric, plus, hyphens (e.g., "2-4 Years", "5+ Years", "Fresher")
  EXPERIENCE: /^[a-zA-Z0-9\s\-\+]+$/,
  
  // Alphanumeric and hyphens (e.g., "Full-time", "Part-time", "Contract")
  TYPE: /^[a-zA-Z\s\-]+$/,
  
  // Alphanumeric, commas, hyphens, slashes (e.g., "New York, NY", "Remote / Hybrid")
  LOCATION: /^[a-zA-Z0-9\s,\-\/]+$/
};

const CareersAdmin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    dept: '',
    jobRole: '',
    experience: '',
    type: 'Full-time',
    location: '',
    skills: '' 
  });

  // Validation Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch Jobs
  const { data: careers = [], isLoading } = useQuery({ 
    queryKey: ['careers'], 
    queryFn: getCareers 
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: createCareer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast({ title: "Success", description: "Job posted successfully" });
      handleCloseDialog();
    },
    onError: () => toast({ title: "Error", description: "Failed to post job", variant: "destructive" })
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCareer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast({ title: "Updated", description: "Job updated successfully" });
      handleCloseDialog();
    },
    onError: () => toast({ title: "Error", description: "Failed to update job", variant: "destructive" })
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCareer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast({ title: "Deleted", description: "Job removed successfully" });
    }
  });

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Job Role
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = "Job Role is required.";
    } else if (formData.jobRole.length < 3 || formData.jobRole.length > 50) {
      newErrors.jobRole = "Must be between 3 and 50 characters.";
    } else if (!PATTERNS.JOB_ROLE.test(formData.jobRole)) {
      newErrors.jobRole = "Only letters, numbers, (), and - allowed.";
    }

    // 2. Department (Strictly letters)
    if (!formData.dept.trim()) {
      newErrors.dept = "Department is required.";
    } else if (!PATTERNS.DEPT.test(formData.dept)) {
      newErrors.dept = "Department cannot contain numbers or special characters.";
    }

    // 3. Experience
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required.";
    } else if (!PATTERNS.EXPERIENCE.test(formData.experience)) {
      newErrors.experience = "Invalid format (e.g., use '2-4 Years').";
    }

    // 4. Type
    if (!formData.type.trim()) {
      newErrors.type = "Job Type is required.";
    } else if (!PATTERNS.TYPE.test(formData.type)) {
      newErrors.type = "Only letters and hyphens allowed.";
    }

    // 5. Location
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    } else if (!PATTERNS.LOCATION.test(formData.location)) {
      newErrors.location = "Invalid characters in location.";
    }

    // 6. Skills
    if (!formData.skills.trim()) {
      newErrors.skills = "At least one skill is required.";
    } else {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
      if (skillsArray.length === 0) {
        newErrors.skills = "Please enter valid comma-separated skills.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ dept: '', jobRole: '', experience: '', type: 'Full-time', location: '', skills: '' });
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (job: any) => {
    setEditingId(job._id);
    setFormData({
      dept: job.dept,
      jobRole: job.jobRole,
      experience: job.experience,
      type: job.type,
      location: job.location,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({ 
        variant: "destructive", 
        title: "Validation Error", 
        description: "Please check the highlighted fields." 
      });
      return;
    }

    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for specific field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold">Manage Careers</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" /> Post New Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings ({careers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role & Department</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {careers.map((job: any) => (
                  <TableRow key={job._id}>
                    <TableCell>
                      <div className="font-medium text-lg">{job.jobRole}</div>
                      <div className="text-sm text-muted-foreground">{job.dept}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
                        <span className="text-muted-foreground">Exp: {job.experience}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {Array.isArray(job.skills) && job.skills.slice(0, 3).map((s: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">{s}</span>
                        ))}
                        {Array.isArray(job.skills) && job.skills.length > 3 && (
                           <span className="px-2 py-0.5 text-xs text-muted-foreground">+{job.skills.length - 3}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenEdit(job)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => {
                          if(window.confirm('Are you sure you want to delete this job?')) {
                            deleteMutation.mutate(job._id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Job Posting' : 'Post New Job'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            
            <div className="grid grid-cols-2 gap-4">
              {/* Job Role */}
              <div className="space-y-2">
                <Label htmlFor="jobRole">Job Role <span className="text-red-500">*</span></Label>
                <Input 
                  id="jobRole"
                  name="jobRole" 
                  value={formData.jobRole} 
                  onChange={handleChange} 
                  placeholder="e.g. React Developer" 
                  className={errors.jobRole ? "border-red-500" : ""}
                />
                {errors.jobRole && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.jobRole}</p>}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="dept">Department <span className="text-red-500">*</span></Label>
                <Input 
                  id="dept"
                  name="dept" 
                  value={formData.dept} 
                  onChange={handleChange} 
                  placeholder="e.g. Engineering" 
                  className={errors.dept ? "border-red-500" : ""}
                />
                {errors.dept && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.dept}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Experience <span className="text-red-500">*</span></Label>
                <Input 
                  id="experience"
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  placeholder="e.g. 2-4 Years" 
                  className={errors.experience ? "border-red-500" : ""}
                />
                {errors.experience && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.experience}</p>}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Type <span className="text-red-500">*</span></Label>
                <Input 
                  id="type"
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  placeholder="e.g. Full-time" 
                  className={errors.type ? "border-red-500" : ""}
                />
                {errors.type && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.type}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Input 
                id="location"
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="e.g. Hyderabad / Remote" 
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.location}</p>}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (Comma Separated) <span className="text-red-500">*</span></Label>
              <Textarea 
                id="skills"
                name="skills" 
                value={formData.skills} 
                onChange={handleChange} 
                placeholder="React, TypeScript, Node.js, AWS" 
                className={errors.skills ? "border-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">Separate multiple skills with commas.</p>
              {errors.skills && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.skills}</p>}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : (editingId ? 'Update Job' : 'Post Job')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareersAdmin;