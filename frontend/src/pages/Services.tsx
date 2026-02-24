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
  Search,
  TrendingUp,
  Share2,
  FileText,
  Award,
  BarChart3,
  Bot,
  LineChart,
  Target,
  Cog,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const websiteServices = [
  {
    icon: Globe,
    title: 'Corporate Website Design',
    description: 'Modern, professional websites that build trust, strengthen your brand, and communicate your message clearly.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-first design focused on clarity, accessibility, and smooth, enjoyable interactions.',
  },
  {
    icon: Smartphone,
    title: 'Product & SaaS Websites',
    description: 'High-converting product and SaaS websites built to highlight features, tell your story, and drive sign-ups.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Robust online stores with secure payments, smart inventory management, and checkout experiences designed to convert.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    description: 'We refresh outdated websites into fast, modern digital experiences that perform better and look sharper.',
  },
  {
    icon: Brain,
    title: 'AI-Personalized Websites',
    description: 'Smart, dynamic websites that adapt content and experiences based on user behavior—so every visit feels relevant.',
  },
];

const marketingServices = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description: 'End-to-end SEO strategies designed to improve search rankings, increase organic visibility, and drive sustainable traffic growth.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Results-focused Google Ads and social media advertising campaigns powered by data, built to maximize conversions and return on investment.',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategic social media management that strengthens brand presence, fosters engagement, and builds meaningful audience relationships.',
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    description: ' Insight-driven content strategies that position your brand as an authority while educating, engaging, and converting your target audience.',
  },
  {
    icon: Award,
    title: 'Branding & Identity',
    description: 'Comprehensive brand development—from logo design to brand guidelines—ensuring consistency, clarity, and long-term brand recognition.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Optimization',
    description: 'Advanced analytics, reporting, and continuous optimization to enhance campaign performance and support data-backed decision-making.',
  },
];

const aiServices = [
  {
    icon: LineChart,
    title: 'Marketing Intelligence Tools',
    description: 'AI-powered analytics solutions that deliver deep insights, identify patterns, and predict trends—enabling smarter, faster, and more informed marketing decisions.',
  },
  {
    icon: Bot,
    title: 'AI Analytics Dashboards',
    description: 'Real-time, AI-driven dashboards that apply machine learning insights to support faster, smarter, and more confident decision-making.',
  },
  {
    icon: Target,
    title: 'Lead Scoring & Automation',
    description: 'AI-driven lead scoring and automated nurturing workflows that prioritize high-value prospects and improve sales efficiency.',
  },
  {
    icon: Cog,
    title: 'Custom AI Integrations',
    description: 'Bespoke AI solutions designed to seamlessly integrate with your existing systems and align precisely with your unique business processes and requirements.',
  },
];

const Services = () => {
  const websiteRef = useRef(null);
  const marketingRef = useRef(null);
  const aiRef = useRef(null);
  const isWebsiteInView = useInView(websiteRef, { once: true, margin: '-100px' });
  const isMarketingInView = useInView(marketingRef, { once: true, margin: '-100px' });
  const isAIInView = useInView(aiRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="End-to-End Digital Solutions"
          subtitle="Services"
          description="From beautifully crafted websites to intelligent AI-powered systems, we deliver complete digital services designed to create real, measurable business impact."
          backgroundImage={heroBanner3}
          badge="What We Do"
        />

        {/* Website Designing */}
        <section ref={websiteRef} id="website-designing" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isWebsiteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Website Designing
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Websites That Look Great— <span className="gradient-text">and Convert</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We design beautiful, responsive, high-performing websites that capture attention, engage users, and turn visitors into customers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isWebsiteInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Marketing */}
        <section ref={marketingRef} id="digital-marketing" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isMarketingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Digital Marketing
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Performance-Driven <span className="gradient-text">Marketing Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We deliver data-driven marketing strategies designed to expand your reach, attract high-quality leads, and maximize return on investment across digital channels.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isMarketingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Solutions */}
        <section ref={aiRef} id="ai-solutions" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isAIInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                AI-Powered Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Intelligent <span className="gradient-text">Automation</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We leverage artificial intelligence to automate complex processes, unlock actionable insights, and help your organization maintain a competitive advantage in a rapidly evolving digital landscape.

              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {aiServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isAIInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                 
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
