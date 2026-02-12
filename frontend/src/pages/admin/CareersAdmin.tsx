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
import { Plus, Pencil, Trash2, MapPin, Briefcase } from 'lucide-react';

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
    skills: '' // Managed as comma separated string for input
  });

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

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ dept: '', jobRole: '', experience: '', type: 'Full-time', location: '', skills: '' });
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
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert comma string back to array
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          {isLoading ? <div>Loading...</div> : (
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
                        {Array.isArray(job.skills) && job.skills.map((s: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">{s}</span>
                        ))}
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
              <div className="space-y-2">
                <Label>Job Role</Label>
                <Input name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="e.g. React Developer" required />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input name="dept" value={formData.dept} onChange={handleChange} placeholder="e.g. Engineering" required />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 2-4 Years" required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Full-time" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Hyderabad / Remote" required />
            </div>

            <div className="space-y-2">
              <Label>Skills (Comma Separated)</Label>
              <Textarea 
                name="skills" 
                value={formData.skills} 
                onChange={handleChange} 
                placeholder="React, TypeScript, Node.js, AWS" 
                required 
              />
              <p className="text-xs text-muted-foreground">Separate multiple skills with commas.</p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingId ? 'Update Job' : 'Post Job')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareersAdmin;