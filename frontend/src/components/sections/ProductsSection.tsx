import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, Zap, Shield, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const products = [
  {
    icon: BarChart3,
    name: 'AI Marketing Dashboard',
    description: 'Unified analytics platform that aggregates data from all your marketing channels and provides AI-powered insights.',
    features: ['Real-time Analytics', 'AI Predictions', 'Custom Reports'],
    badge: 'Popular',
  },
  {
    icon: Zap,
    name: 'Website Performance Analyzer',
    description: 'Comprehensive tool that scans your website for performance, SEO, and UX issues with actionable recommendations.',
    features: ['Speed Analysis', 'SEO Audit', 'UX Scoring'],
    badge: 'New',
  },
  {
    icon: Shield,
    name: 'Lead Intelligence Platform',
    description: 'AI-powered lead scoring and nurturing system that helps you focus on prospects most likely to convert.',
    features: ['Lead Scoring', 'Behavior Tracking', 'Automation'],
    badge: null,
  },
  {
    icon: Rocket,
    name: 'Custom AI Tools',
    description: 'Bespoke AI solutions tailored to your specific business needs, from chatbots to predictive models.',
    features: ['Custom Development', 'Integration', 'Training'],
    badge: 'Enterprise',
  },
];

const ProductsSection = () => {
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
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Powerful <span className="gradient-text">AI Products</span> Built for Growth
          </h2>
          <p className="text-lg text-muted-foreground">
            Our ready-to-deploy solutions boost your marketing, sharpen your website performance, and help your business grow faster—without the complexity.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <product.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/products">
              View All Products <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
