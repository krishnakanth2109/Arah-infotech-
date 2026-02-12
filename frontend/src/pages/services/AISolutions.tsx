import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain,
  LineChart,
  Bot,
  Target,
  Cog,
  Sparkles,
  Cpu,
  Database,
  MessageSquare,
  Workflow,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const mainServices = [
  {
    icon: LineChart,
    title: 'Marketing Intelligence Tools',
    description: 'AI-powered analytics that uncover insights and predict trends in your marketing data, helping you make smarter decisions faster.',
    features: ['Predictive Analytics', 'Trend Forecasting', 'Competitor Analysis', 'Market Insights'],
  },
  {
    icon: Bot,
    title: 'AI Analytics Dashboards',
    description: 'Real-time dashboards with machine learning insights for smarter decision making across your entire organization.',
    features: ['Real-time Data', 'Custom KPIs', 'Automated Reports', 'Anomaly Detection'],
  },
  {
    icon: Target,
    title: 'Lead Scoring & Automation',
    description: 'Intelligent lead qualification and nurturing that focuses your efforts on high-value prospects who are ready to buy.',
    features: ['Behavioral Scoring', 'Automated Nurturing', 'CRM Integration', 'Conversion Prediction'],
  },
  {
    icon: Cog,
    title: 'Custom AI Integrations',
    description: 'Bespoke AI solutions tailored to your unique business processes and requirements, built to scale with your growth.',
    features: ['Custom Models', 'API Development', 'System Integration', 'Scalable Architecture'],
  },
];

const aiCapabilities = [
  { icon: MessageSquare, title: 'AI Chatbots', description: 'Intelligent conversational AI for customer support and sales' },
  { icon: Workflow, title: 'Process Automation', description: 'Automate repetitive tasks with smart workflows' },
  { icon: Sparkles, title: 'Content Generation', description: 'AI-powered content creation for marketing and communications' },
  { icon: Cpu, title: 'Predictive Modeling', description: 'Forecast trends and customer behavior with precision' },
  { icon: Database, title: 'Data Processing', description: 'Extract insights from large datasets automatically' },
  { icon: Shield, title: 'Fraud Detection', description: 'AI-powered security and anomaly detection systems' },
];

const useCases = [
  {
    industry: 'E-commerce',
    title: 'Personalized Shopping Experience',
    description: 'AI recommends products based on browsing history, purchase patterns, and real-time behavior to increase conversion rates.',
    result: '40% increase in average order value',
  },
  {
    industry: 'Healthcare',
    title: 'Patient Engagement Automation',
    description: 'Automated appointment reminders, follow-ups, and personalized health content delivery to improve patient outcomes.',
    result: '60% reduction in no-shows',
  },
  {
    industry: 'Financial Services',
    title: 'Lead Qualification System',
    description: 'AI scores and prioritizes leads based on hundreds of data points, ensuring sales teams focus on high-potential prospects.',
    result: '3x improvement in lead conversion',
  },
  {
    industry: 'Real Estate',
    title: 'Property Matching Engine',
    description: 'Machine learning matches buyers with properties based on preferences, behavior, and market trends.',
    result: '50% faster sales cycles',
  },
];

const whyAI = [
  {
    title: 'Competitive Advantage',
    description: 'Stay ahead of competitors by leveraging AI to make faster, smarter decisions.',
    icon: TrendingUp,
  },
  {
    title: 'Cost Efficiency',
    description: 'Automate repetitive tasks and reduce operational costs by up to 70%.',
    icon: Zap,
  },
  {
    title: 'Scalability',
    description: 'AI solutions that grow with your business without proportional cost increases.',
    icon: Database,
  },
  {
    title: '24/7 Operations',
    description: 'AI never sleeps, providing round-the-clock service and monitoring.',
    icon: Bot,
  },
];

const AISolutions = () => {
  const servicesRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const useCasesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isCapabilitiesInView = useInView(capabilitiesRef, { once: true, margin: '-100px' });
  const isUseCasesInView = useInView(useCasesRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="AI-Powered Solutions for Tomorrow"
          subtitle="Our Expertise"
          description="Harness the power of artificial intelligence to automate processes, gain insights, and stay ahead of the competition."
          backgroundImage={heroBanner3}
          badge="AI Solutions"
        />

        {/* Main Services */}
        <section ref={servicesRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                AI Services
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Intelligent <span className="gradient-text">Business Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We build AI solutions that solve real business problems, 
                from marketing automation to custom enterprise applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
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

        {/* AI Capabilities */}
        <section ref={capabilitiesRef} className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                What Our AI <span className="gradient-text">Can Do</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                From chatbots to predictive modeling, we harness the full spectrum 
                of AI technologies to transform your business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <capability.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-2">{capability.title}</h4>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why AI Section */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyAI.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isCapabilitiesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-foreground mb-2">{reason.title}</h4>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section ref={useCasesRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isUseCasesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                AI in <span className="gradient-text">Action</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                See how businesses across industries are leveraging our AI solutions 
                to achieve remarkable results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isUseCasesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    {useCase.industry}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {useCase.description}
                  </p>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">{useCase.result}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isUseCasesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Start Your AI Journey <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default AISolutions;
