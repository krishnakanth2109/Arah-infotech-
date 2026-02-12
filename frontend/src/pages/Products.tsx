import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  BarChart3, 
  Zap, 
  Shield, 
  Rocket,
  Check,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBanner2 from '@/assets/hero-banner-2.jpg';

const products = [
  {
    icon: BarChart3,
    name: 'AI Marketing Dashboard',
    tagline: 'Unified Analytics for Smarter Decision-Making',
    description: 'Bring all your marketing data into a single, intelligent dashboard. Our AI-powered platform delivers real-time insights, predictive analytics, and actionable recommendations to help you continuously optimize campaign performance and drive better outcomes.',
    features: [
      'Real-time data integration from 20+ platforms',
      'AI-driven trend analysis and predictive insights',
      'Customizable report builder for advanced reporting',
      'Automated alerts and intelligent notifications',
      'Built-in collaboration tools for teams',
      'White-label capabilities for agencies and enterprises',
    ],
    pricing: 'Starting at $299/month',
    badge: 'Most Popular',
  },
  {
    icon: Zap,
    name: 'Website Performance Analyzer',
    tagline: 'Optimize Every Aspect of Your Site',
    description: 'A comprehensive analysis platform that identifies performance bottlenecks, SEO gaps, accessibility issues, and user experience improvements. Receive prioritized, actionable recommendations ranked by impact to help you improve site performance and business outcomes.',
    features: [
      'Core Web Vitals and performance analysis',
      'Comprehensive SEO audits with 100+ technical checks',
      'Accessibility compliance and usability testing',
      'Competitive benchmarking and comparative insights',
      'Automated monthly scans and reporting',
      'Priority-based issue identification and recommendations',
    ],
    pricing: 'Starting at $99/month',
    badge: 'New Release',
  },
  {
    icon: Shield,
    name: 'Lead Intelligence Platform',
    tagline: 'Focus on Leads That Convert',
    description: 'An AI-powered lead scoring and management platform designed to identify high-value prospects, automate personalized nurturing, and accelerate deal closures.',
    features: [
      'Machine learning–based lead scoring and prioritization',
      'Behavioral tracking and advanced analytics',
      'Automated, personalized email nurturing sequences',
      'Seamless CRM integrations',
      'End-to-end sales pipeline visualization',
      'Conversion-focused optimization insights',
    ],
    pricing: 'Starting at $199/month',
    badge: null,
  },
  {
    icon: Rocket,
    name: 'Custom AI Tools',
    tagline: 'Built for Your Unique Business Needs',
    description: 'Bespoke AI solutions engineered to address your specific challenges. From custom intelligent chatbots to advanced predictive models, we design and build solutions tailored precisely to your requirements.',
    features: [
      'Custom AI model design and development',
      'Seamless integration with existing systems and workflows',
      'Comprehensive training and technical documentation',
      'Ongoing support, maintenance, and updates',
      'Scalable, enterprise-grade architecture',
      'Data privacy and compliance–ready frameworks',
    ],
    pricing: 'Custom pricing',
    badge: 'Enterprise',
  },
];

const Products = () => {
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="AI-Powered Products for Business Growth"
          subtitle="Products"
          description="Enterprise-ready, ready-to-deploy AI solutions designed to enhance marketing performance, optimize digital experiences, and accelerate sustainable business growth."
          backgroundImage={heroBanner2}
          badge="Our Products"
        />

        {/* Products Grid */}
        <section ref={productsRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                        <product.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      {product.badge && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                      {product.name}
                    </h2>
                    <p className="text-lg text-primary mb-4">{product.tagline}</p>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-2xl font-display font-bold gradient-text">
                        {product.pricing}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="lg" asChild>
                        <Link to="/contact">
                          Get Started <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/contact">Request Demo</Link>
                      </Button>
                    </div>
                  </div>

                  <div className={`p-8 rounded-2xl bg-card border border-border ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-lg font-display font-bold text-foreground mb-6">
                      Key Features
                    </h3>
                    <ul className="space-y-4">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default Products;
