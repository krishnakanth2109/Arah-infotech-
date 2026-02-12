import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Search,
  TrendingUp,
  Share2,
  FileText,
  Award,
  BarChart3,
  Target,
  Users,
  Mail,
  Video,
  Megaphone,
  PieChart,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBanner2 from '@/assets/hero-banner-2.jpg';

const mainServices = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description: 'Comprehensive SEO strategies that improve rankings, drive organic traffic, and increase your visibility across all major search engines.',
    features: ['Technical SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Link Building'],
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven Google Ads and social media campaigns that maximize ROI and deliver measurable conversions at scale.',
    features: ['Google Ads Management', 'Meta Ads', 'LinkedIn Campaigns', 'Retargeting'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategic social presence management that builds community, drives engagement, and turns followers into customers.',
    features: ['Content Calendar', 'Community Management', 'Influencer Outreach', 'Social Listening'],
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    description: 'Compelling content strategies that educate, engage, and convert your target audience through valuable storytelling.',
    features: ['Blog Strategy', 'Content Creation', 'Content Distribution', 'Lead Magnets'],
  },
  {
    icon: Award,
    title: 'Branding & Identity',
    description: 'Complete brand development from logos to guidelines that make you memorable and differentiate you from competitors.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Messaging'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Optimization',
    description: 'Deep data analysis and continuous optimization to improve campaign performance and maximize your marketing investment.',
    features: ['GA4 Setup', 'Conversion Tracking', 'A/B Testing', 'Reporting Dashboards'],
  },
];

const additionalServices = [
  { icon: Mail, title: 'Email Marketing', description: 'Automated email campaigns that nurture leads and drive repeat purchases' },
  { icon: Video, title: 'Video Marketing', description: 'Engaging video content for YouTube, social media, and ads' },
  { icon: Megaphone, title: 'PR & Outreach', description: 'Media relations and press coverage to amplify your brand' },
  { icon: PieChart, title: 'Market Research', description: 'Competitive analysis and market insights for informed decisions' },
];

const results = [
  { metric: '350%', label: 'Average ROI', description: 'On paid advertising campaigns' },
  { metric: '200%', label: 'Traffic Increase', description: 'Through organic SEO efforts' },
  { metric: '85%', label: 'Lead Quality', description: 'Improvement with targeting' },
  { metric: '45%', label: 'Cost Reduction', description: 'In customer acquisition' },
];

const strategies = [
  {
    title: 'Multi-Channel Approach',
    description: 'We integrate all digital channels for a cohesive marketing experience that reaches your audience wherever they are.',
    icon: Target,
  },
  {
    title: 'Data-Driven Decisions',
    description: 'Every campaign is backed by data and analytics, ensuring we continuously optimize for the best possible results.',
    icon: BarChart3,
  },
  {
    title: 'Audience-First Strategy',
    description: 'We deeply understand your target audience to create messaging that resonates and drives action.',
    icon: Users,
  },
  {
    title: 'Agile Execution',
    description: 'Our agile approach allows us to quickly adapt to market changes and capitalize on emerging opportunities.',
    icon: Zap,
  },
];

const DigitalMarketing = () => {
  const servicesRef = useRef(null);
  const resultsRef = useRef(null);
  const strategyRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isResultsInView = useInView(resultsRef, { once: true, margin: '-100px' });
  const isStrategyInView = useInView(strategyRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Digital Marketing That Delivers Results"
          subtitle="Our Expertise"
          description="Data-driven marketing strategies that amplify your reach, generate qualified leads, and maximize your return on investment."
          backgroundImage={heroBanner2}
          badge="Digital Marketing"
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
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Full-Spectrum <span className="gradient-text">Marketing Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                From SEO to social media, we provide comprehensive digital marketing 
                services that drive real business growth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

            {/* Additional Services */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsRef} className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Results
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Numbers That <span className="gradient-text">Speak Volumes</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our data-driven approach consistently delivers exceptional results 
                for our clients across all industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isResultsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                    {result.metric}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {result.label}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section ref={strategyRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isStrategyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Our Approach
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Strategic <span className="gradient-text">Marketing Excellence</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We don't just run campaigns—we build marketing ecosystems that 
                  continuously deliver value and drive sustainable growth for your business.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get Your Marketing Audit <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isStrategyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <strategy.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {strategy.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default DigitalMarketing;
