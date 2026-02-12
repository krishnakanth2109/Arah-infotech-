import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Palette, 
  Smartphone, 
  ShoppingCart, 
  RefreshCw, 
  Brain,
  Code,
  Layers,
  Zap,
  Shield,
  Search,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBanner1 from '@/assets/hero-banner-1.jpg';

const mainServices = [
  {
    icon: Globe,
    title: 'Corporate Website Design',
    description: 'Professional, modern websites that establish credibility and communicate your brand message effectively. We create digital experiences that reflect your company\'s values and vision.',
    features: ['Custom Design', 'Brand Integration', 'Professional Copywriting', 'SEO-Ready Structure'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that prioritizes intuitive navigation, accessibility, and delightful interactions. We create interfaces that users love.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
  },
  {
    icon: Smartphone,
    title: 'Product & SaaS Websites',
    description: 'High-converting product pages and SaaS platforms designed to showcase features and drive sign-ups with compelling storytelling.',
    features: ['Feature Showcases', 'Pricing Pages', 'Demo Integration', 'Conversion Optimization'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Full-featured online stores with secure payments, inventory management, and optimized checkout flows that maximize sales.',
    features: ['Payment Integration', 'Inventory Management', 'Cart Optimization', 'Mobile Commerce'],
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    description: 'Transform outdated websites into modern, high-performing digital experiences that align with current design trends and user expectations.',
    features: ['Performance Audit', 'Modern Redesign', 'Content Migration', 'SEO Preservation'],
  },
  {
    icon: Brain,
    title: 'AI-Personalized Websites',
    description: 'Dynamic websites that adapt content and experiences based on user behavior and preferences, delivering personalized journeys at scale.',
    features: ['Behavior Tracking', 'Dynamic Content', 'A/B Testing', 'Personalization Engine'],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into understanding your business goals, target audience, and competitive landscape to create a strategic foundation.',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'Our designers create stunning visual concepts and interactive prototypes that bring your vision to life before development begins.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Expert developers build your website using cutting-edge technologies, with rigorous testing across all devices and browsers.',
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'We launch your website with comprehensive support and continue optimizing based on real user data and performance metrics.',
  },
];

const techStack = [
  { icon: Code, name: 'React & Next.js', description: 'Modern frameworks for fast, scalable applications' },
  { icon: Layers, name: 'Tailwind CSS', description: 'Utility-first CSS for responsive design' },
  { icon: Zap, name: 'Performance First', description: 'Optimized for Core Web Vitals' },
  { icon: Shield, name: 'Security Built-in', description: 'Enterprise-grade security measures' },
  { icon: Search, name: 'SEO Optimized', description: 'Search engine friendly architecture' },
  { icon: Users, name: 'Accessibility', description: 'WCAG compliant inclusive design' },
];

const benefits = [
  'Mobile-first responsive design for all devices',
  'Lightning-fast load times under 3 seconds',
  'SEO-optimized structure for better rankings',
  'Secure, scalable hosting solutions',
  'CMS integration for easy content updates',
  'Analytics integration for data-driven decisions',
  'Ongoing maintenance and support',
  '24/7 uptime monitoring',
];

const WebsiteDesigning = () => {
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const techRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isProcessInView = useInView(processRef, { once: true, margin: '-100px' });
  const isTechInView = useInView(techRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Website Designing That Converts"
          subtitle="Our Expertise"
          description="We create stunning, responsive, and high-performing websites that captivate visitors and turn them into loyal customers."
          backgroundImage={heroBanner1}
          badge="Website Designing"
        />

        {/* Services Grid */}
        <section ref={servicesRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Complete Web Design <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                From concept to launch, we provide end-to-end website design services 
                tailored to your unique business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                How We <span className="gradient-text">Build Success</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our proven 4-step process ensures your website project is delivered 
                on time, on budget, and exceeds expectations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-6xl font-display font-bold text-primary/10 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack & Benefits */}
        <section ref={techRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isTechInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Technology
                </span>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Built With <span className="gradient-text">Modern Tech</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We use the latest technologies and frameworks to build websites 
                  that are fast, secure, and easy to maintain.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isTechInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <tech.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{tech.name}</h4>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isTechInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Benefits
                </span>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Why Choose <span className="gradient-text">Arah Infotech</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  When you partner with us, you get more than just a website. 
                  You get a complete digital solution backed by expert support.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isTechInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button variant="hero" size="lg" className="mt-8" asChild>
                  <Link to="/contact">
                    Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteDesigning;
