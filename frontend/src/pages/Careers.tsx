import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// 1. IMPORT submitApplication from your API file
import { getCareers, submitApplication } from '@/lib/api'; 
import { 
  MapPin, 
  Building, 
  Calendar, 
  DollarSign, 
  Clock, 
  Home, 
  Globe, 
  BookOpen, 
  Users,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Static Benefits Data
const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', description: 'Industry-competitive salaries with regular reviews.' },
  { icon: Clock, title: 'Flexible Hours', description: 'Maintain work-life balance with flexible timings.' },
  { icon: Home, title: 'Work From Home', description: 'Remote work options available.' },
  { icon: Globe, title: 'Global Exposure', description: 'Work with international clients.' },
  { icon: BookOpen, title: 'Learning Budget', description: 'Annual budget for courses and certifications.' },
  { icon: Users, title: 'Team Building', description: 'Regular team outings and events.' },
];

interface Job {
  _id?: string;
  id?: string;
  jobRole: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  skills: string[];
  postedDate: string;
}

interface AppForm {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  coverLetter?: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Fetch Jobs Data
  const { data: jobOpenings = [], isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  // Form State
  const [appForm, setAppForm] = useState<AppForm>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: ''
  });

  // Error State
  const [errors, setErrors] = useState<FormErrors>({});

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setErrors({}); // Clear errors
    setAppForm({ fullName: '', email: '', phone: '', linkedin: '', coverLetter: '' }); // Reset form
    setIsApplicationModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for specific field on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-()]{10,}$/;

    // Name Validation
    if (!appForm.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (!nameRegex.test(appForm.fullName)) {
      newErrors.fullName = 'Name should only contain letters';
    } else if (appForm.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email Validation
    if (!appForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(appForm.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Phone Validation
    if (!appForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(appForm.phone)) {
      newErrors.phone = 'Invalid phone number (min 10 digits)';
    }
    
    // Cover Letter Validation
    if (!appForm.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (appForm.coverLetter.trim().length < 20) {
      newErrors.coverLetter = 'Please write at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedJob) return;

    setIsSubmitting(true);

    try {
      // Safely grab the job ID whether the backend uses _id or id
      const jobId = selectedJob._id || selectedJob.id;

      const payload = {
        jobId: jobId,
        jobTitle: selectedJob.jobRole,
        fullName: appForm.fullName,
        email: appForm.email,
        phone: appForm.phone,
        linkedin: appForm.linkedin,
        coverLetter: appForm.coverLetter
      };

      // 2. REPLACED fetch WITH Axios API function
      await submitApplication(payload);

      toast({
        title: 'Application Submitted!',
        description: `We have received your application for ${selectedJob.jobRole}.`,
        variant: "default" 
      });
      
      setIsApplicationModalOpen(false);
      
    } catch (error: any) {
      console.error("Submission Error Details:", error);
      
      // Axios stores the backend message in error.response.data.message
      const errorMessage = error.response?.data?.message || error.message || 'There was an error submitting your application. Please try again.';
      
      toast({ 
        title: 'Submission Failed', 
        description: errorMessage, 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container mx-auto px-4 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
             >
                <Badge className="mb-6 py-2 px-4 bg-primary/10 text-primary hover:bg-primary/20">Join Our Team</Badge>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Build the Future with <span className="gradient-text">Arah Infotech</span></h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join us in creating innovative digital solutions that transform businesses.</p>
                <Button variant="hero" size="lg" onClick={() => document.getElementById('openings')?.scrollIntoView({behavior: 'smooth'})}>
                  View Openings
                </Button>
             </motion.div>
          </div>
        </section>

        {/* Dynamic Jobs Section */}
        <section id="openings" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Current <span className="gradient-text">Openings</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Find the role that fits your skills and passion.
            </p>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : jobOpenings.length === 0 ? (
               <div className="text-center py-20 bg-muted/20 rounded-xl">
                 <p className="text-lg text-muted-foreground">No current openings available. Please check back later!</p>
               </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobOpenings.map((job: Job) => (
                  <Card key={job._id || job.id} className="h-full hover:shadow-card-hover border-border flex flex-col transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-muted">{job.dept}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{job.jobRole}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 shrink-0" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="w-4 h-4 shrink-0" /> {job.type}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 shrink-0" /> Exp: {job.experience}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills?.slice(0, 4).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills && job.skills.length > 4 && (
                          <Badge variant="secondary" className="text-xs font-normal">+{job.skills.length - 4}</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full group" onClick={() => handleApplyNow(job)}>
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Benefits & <span className="gradient-text">Perks</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div key={b.title} className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                  <p className="text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Application Modal with Validation */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.jobRole}</DialogTitle>
            <DialogDescription>
              Please fill in your details below. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4 pt-4" noValidate>
            
            {/* Name & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  value={appForm.fullName} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                  className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={appForm.phone} 
                  onChange={handleChange} 
                  placeholder="+91 9876543210"
                  className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email"
                type="email" 
                name="email"
                value={appForm.email} 
                onChange={handleChange} 
                placeholder="john@example.com"
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
              <Input 
                id="linkedin"
                name="linkedin"
                value={appForm.linkedin} 
                onChange={handleChange} 
                placeholder="https://linkedin.com/in/johndoe"
                className={errors.linkedin ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.linkedin && <span className="text-xs text-red-500">{errors.linkedin}</span>}
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter / Short Bio <span className="text-red-500">*</span></Label>
              <Textarea 
                id="coverLetter"
                name="coverLetter"
                value={appForm.coverLetter} 
                onChange={handleChange} 
                placeholder="Tell us why you're a good fit..."
                rows={4}
                className={errors.coverLetter ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.coverLetter && <span className="text-xs text-red-500">{errors.coverLetter}</span>}
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsApplicationModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Careers;