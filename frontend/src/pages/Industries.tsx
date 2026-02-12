import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Rocket, 
  Building2, 
  Building, 
  ShoppingCart, 
  GraduationCap, 
  Code2,
  Check,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBanner1 from '@/assets/hero-banner-1.jpg';

const industries = [
  {
    icon: Rocket,
    name: 'Startups',
    description: 'We support startups in launching quickly and confidently—delivering MVPs, investor-ready pitch decks, and scalable digital platforms designed to attract customers, partners, and investors.',
    challenges: [
      'Limited budgets and resource constraints',
      'Pressure to launch quickly and validate ideas',
      'Establishing a strong brand from the ground up',
      'Attracting and converting early customers',
    ],
    solutions: [
      'Cost-effective MVP development tailored for fast validation',
      'Rapid prototyping and iterative development cycles',
      'Strategic brand identity creation and market positioning',
      'Data-driven growth strategies to accelerate early traction',
    ],
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: Building2,
    name: 'SMEs',
    description: 'Scale your business with enterprise-grade digital and AI solutions—delivered at SME-friendly pricing. We understand the realities of growing organizations and design solutions that balance performance, cost, and speed to value.',
    challenges: [
      'Competing effectively with larger, well-funded players',
      'Limited in-house technical expertise',
      'Budget and resource constraints',
      'Need for fast, measurable return on investment',
    ],
    solutions: [
      'Scalable digital and AI infrastructure built for growth',
      'End-to-end managed digital services',
      'Cost-optimized, high-impact solution design',
      'Performance-driven marketing and growth initiatives',
    ],
    color: 'from-primary to-secondary',
  },
  {
    icon: Building,
    name: 'Enterprises',
    description: 'We deliver large-scale digital transformation through complex system integrations, custom AI solutions, and enterprise-grade platforms. As a long-term technology partner, we help enterprises modernize, scale globally, and drive sustained digital success.',
    challenges: [
      'Integrating and modernizing legacy systems',
      'Managing multiple stakeholders and complex workflows',
      'Ensuring security, compliance, and data governance',
      'Scaling platforms across regions and markets',
    ],
    solutions: [
      'Robust enterprise architecture and system design',
      'Custom AI and machine learning solutions',
      'Security-first development with compliance at the core',
      'Scalable, multi-region deployment strategies',
    ],
    color: 'from-green-400 to-emerald-600',
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce',
    description: 'We help e-commerce brands convert browsers into buyers through high-performance online stores, frictionless checkout experiences, and data-driven marketing strategies.',
    challenges: [
      'High cart abandonment rates',
      'Intense market competition',
      'Complex inventory management',
      'Customer retention and repeat purchases',
    ],
    solutions: [
      'Conversion-optimized e-commerce platforms',
      'AI-powered product recommendations and personalization',
      'Automated inventory and order management',
      'Customer loyalty and retention program development',
    ],
    color: 'from-purple-400 to-indigo-600',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'We design and deliver modern digital learning solutions—including LMS platforms, student portals, and engaging learning experiences—that make education more accessible, scalable, and effective.',
    challenges: [
      'Keeping remote and hybrid learners engaged',
      'Managing and updating educational content efficiently',
      'Tracking learner progress and performance',
      'Meeting accessibility and compliance requirements',
    ],
    solutions: [
      'Interactive, scalable LMS platforms',
      'Integrated content creation and management tools',
      'Advanced analytics dashboards for performance and insights',
    ],
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Code2,
    name: 'IT & SaaS',
    description: 'We support IT and SaaS companies with high-impact product websites, robust documentation portals, and developer-focused marketing designed to engage technical audiences and support scalable growth.',
    challenges: [
      'Creating and maintaining clear, up-to-date technical documentation',
      'Delivering a strong developer experience',
      'Enabling product-led growth strategies',
      'Building and sustaining developer communities',
    ],
    solutions: [
      'Custom developer portals and knowledge bases',
      'Comprehensive API and technical documentation platforms',
      'Product analytics and usage insights',
      'Community platforms to drive engagement and collaboration',
    ],
    color: 'from-cyan-400 to-primary',
  },
];

const Industries = () => {
  const industriesRef = useRef(null);
  const isIndustriesInView = useInView(industriesRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Industry-Specific Digital Solutions"
          subtitle="Industries We Serve"
          description="Every industry operates with its own challenges, regulations, and customer expectations. Our team brings deep, sector-specific expertise to deliver tailored digital and AI solutions that align precisely with your business needs and objectives."
          backgroundImage={heroBanner1}
          badge="Our Expertise"
        />

        {/* Industries */}
        <section ref={industriesRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isIndustriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="grid lg:grid-cols-3 gap-8 items-start"
                >
                  {/* Industry Overview */}
                  <div className="lg:col-span-1">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4`}>
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                      {industry.name}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {industry.description}
                    </p>
                    <Button variant="hero" asChild>
                      <Link to="/contact">
                        Discuss Your Project <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Challenges */}
                  <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                    <h3 className="text-lg font-display font-bold text-foreground mb-4">
                      Common Challenges
                    </h3>
                    <ul className="space-y-3">
                      {industry.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <h3 className="text-lg font-display font-bold text-foreground mb-4">
                      Our Solutions
                    </h3>
                    <ul className="space-y-3">
                      {industry.solutions.map((solution) => (
                        <li key={solution} className="flex items-start gap-3 text-foreground">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          {solution}
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

export default Industries;
