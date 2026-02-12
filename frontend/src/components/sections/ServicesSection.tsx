import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  TrendingUp, 
  Brain, 
  Palette, 
  Search, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Globe,
    title: 'Website Designing',
    description: 'Stunning, responsive websites that captivate visitors and drive conversions. From corporate sites to e-commerce platforms.',
    features: ['UI/UX Design', 'Responsive Development', 'E-commerce Solutions'],
    link: '/services/website-designing',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies that amplify your brand reach and generate qualified leads at scale.',
    features: ['SEO Optimization', 'Performance Ads', 'Content Strategy'],
    link: '/services/digital-marketing',
    gradient: 'from-secondary to-primary',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Harness the power of artificial intelligence to automate processes, gain insights, and stay ahead of competition.',
    features: ['AI Analytics', 'Marketing Automation', 'Custom AI Tools'],
    link: '/services/ai-solutions',
    gradient: 'from-primary to-secondary',
  },
];

const additionalServices = [
  { icon: Palette, title: 'Brand Identity', description: 'Logo design, visual identity, and brand guidelines' },
  { icon: Search, title: 'SEO Excellence', description: 'Rank higher and drive organic traffic' },
  { icon: BarChart3, title: 'Analytics & Insights', description: 'Data-driven decision making' },
];

const ServicesSection = () => {
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Everything You Need to{' '}
            <span className="gradient-text">Win in the Digital World
</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From beautifully designed websites to smart, intelligent automation, we deliver end-to-end digital solutions that change how you engage, connect, and grow with your customers.
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="h-full bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-background hover:bg-accent/50 transition-colors border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/services">
              Explore All Services <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
