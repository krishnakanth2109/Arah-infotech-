import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Rocket, 
  Building2, 
  Building, 
  ShoppingCart, 
  GraduationCap, 
  Code2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    icon: Rocket,
    name: 'Startups',
    description: 'Launch fast with MVPs, pitch decks, and growth-focused digital presence.',
    color: 'bg-gradient-to-br from-orange-400 to-red-500',
  },
  {
    icon: Building2,
    name: 'SMEs',
    description: 'Scale your business with enterprise-grade solutions at SME-friendly pricing.',
    color: 'bg-gradient-to-br from-primary to-secondary',
  },
  {
    icon: Building,
    name: 'Enterprises',
    description: 'Complex integrations, custom AI solutions, and digital transformation at scale.',
    color: 'bg-gradient-to-br from-green-400 to-emerald-600',
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce',
    description: 'Convert browsers to buyers with optimized online stores and marketing.',
    color: 'bg-gradient-to-br from-purple-400 to-indigo-600',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'LMS platforms, student portals, and engaging learning experiences.',
    color: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
  {
    icon: Code2,
    name: 'IT & SaaS',
    description: 'Product websites, documentation, and developer-focused marketing.',
    color: 'bg-gradient-to-br from-cyan-400 to-primary',
  },
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Solutions Built for{' '}
            <span className="gradient-text">Your Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every industry comes with its own challenges. We bring the right expertise and insight to create solutions that fit your business—not a one-size-fits-all approach.

          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to="/industries"
                className="group block h-full"
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 text-center">
                  <div className={`w-16 h-16 rounded-xl ${industry.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {industry.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
