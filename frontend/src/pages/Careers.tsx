import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCareers, submitContact } from '@/lib/api';
import { 
  Briefcase, CheckCircle, Award, MapPin, Building, Calendar, ChevronRight, Mail, Heart, DollarSign, Clock, Home, Globe, BookOpen, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import careersHero from '@/assets/careers-hero.jpg';

// Static Benefits Data
const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', description: 'Industry-competitive salaries with regular reviews.' },
  { icon: Clock, title: 'Flexible Hours', description: 'Maintain work-life balance with flexible timings.' },
  { icon: Home, title: 'Work From Home', description: 'Remote work options available.' },
  { icon: Globe, title: 'Global Exposure', description: 'Work with international clients.' },
  { icon: BookOpen, title: 'Learning Budget', description: 'Annual budget for courses and certifications.' },
  { icon: Users, title: 'Team Building', description: 'Regular team outings and events.' },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Fetch Jobs Data
  const { data: jobOpenings = [], isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  // Simple Form State for Application
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: ''
  });

  const handleApplyNow = (job: any) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: appForm.fullName,
        email: appForm.email,
        phone: appForm.phone,
        subject: `Application for ${selectedJob?.jobRole} (${selectedJob?.dept})`,
        message: `Cover Letter:\n${appForm.coverLetter}\n\nLinkedIn: ${appForm.linkedin}`,
        resumeLink: "Pending" // In a real app, upload file first, then send link
      };

      await submitContact(payload);

      toast({
        title: 'Application Submitted!',
        description: 'We will review your profile and get back to you.',
      });
      setIsApplicationModalOpen(false);
      setAppForm({ fullName: '', email: '', phone: '', linkedin: '', coverLetter: '' });
    } catch (error) {
      toast({ title: 'Error', description: 'Submission failed.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container mx-auto px-4 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
             >
                <Badge className="mb-6 py-2 px-4 bg-primary/10 text-primary">Join Our Team</Badge>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Build the Future with <span className="gradient-text">Arah Infotech</span></h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join us in creating innovative digital solutions.</p>
                <Button size="lg" onClick={() => document.getElementById('openings')?.scrollIntoView({behavior: 'smooth'})}>View Openings</Button>
             </motion.div>
          </div>
        </section>

        {/* Dynamic Jobs Section */}
        <section id="openings" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current <span className="gradient-text">Openings</span></h2>
            
            {isLoading ? (
              <div className="text-center">Loading jobs...</div>
            ) : jobOpenings.length === 0 ? (
               <div className="text-center text-muted-foreground">No current openings. Check back later!</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobOpenings.map((job: any) => (
                  <Card key={job._id} className="h-full hover:shadow-card-hover border-border flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{job.dept}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{job.jobRole}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> {job.location}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building className="w-4 h-4" /> {job.type}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4" /> Exp: {job.experience}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleApplyNow(job)}>Apply Now</Button>
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
                <div key={b.title} className="p-6 rounded-2xl bg-card border hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
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

      {/* Simplified Application Modal */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.jobRole}</DialogTitle>
            <DialogDescription>Enter your details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={appForm.fullName} onChange={e => setAppForm({...appForm, fullName: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={appForm.phone} onChange={e => setAppForm({...appForm, phone: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={appForm.email} onChange={e => setAppForm({...appForm, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn Profile</Label>
              <Input value={appForm.linkedin} onChange={e => setAppForm({...appForm, linkedin: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Cover Letter</Label>
              <Textarea value={appForm.coverLetter} onChange={e => setAppForm({...appForm, coverLetter: e.target.value})} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit Application'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Careers;