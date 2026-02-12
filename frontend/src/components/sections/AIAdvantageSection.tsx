import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Zap, Shield, Target, LineChart, Users } from 'lucide-react';

const advantages = [
  {
    icon: Sparkles,
    title: 'Built with an AI-First Mindset',
    description: 'We weave AI into everything we create—from smart chatbots to predictive insights—so you can move faster, make better decisions, and stay ahead of the competition.',
    stat: '3x',
    statLabel: 'Faster Results',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Delivery',
    description: 'By combining agile workflows with proven AI frameworks, we move fast—without ever cutting corners on quality.',
    stat: '50%',
    statLabel: 'Reduced Time-to-Market',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with bank-level security at every layer—without slowing down performance or the user experience.',
    stat: '99.9%',
    statLabel: 'Uptime Guarantee',
  },
  {
    icon: Target,
    title: 'Built for Conversion',
    description: 'Every design choice we make is driven by data. We focus on outcomes that grow your business—not just visuals that look good.',
    stat: '2.5x',
    statLabel: 'Higher Conversions',
  },
  {
    icon: LineChart,
    title: 'Continuous Optimization',
    description: 'After launch, our AI keeps working—constantly analyzing performance and recommending improvements to help you get the best possible return on investment.',
    stat: '40%',
    statLabel: 'Average Growth',
  },
  {
    icon: Users,
    title: 'A True Partnership',
    description: 'We’re more than a service provider. We work alongside you as a long-term partner, fully invested in your digital growth and success.',
    stat: '95%',
    statLabel: 'Client Retention',
  },
];

const AIAdvantageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            The AI Advantage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Why Businesses Choose{' '}
            <span className="gradient-text">Arah Infotech</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We don’t just create digital solutions. We build smart systems that learn, evolve, and deliver real, measurable growth for your business.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-300">
                {/* Icon & Stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <advantage.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold gradient-text">
                      {advantage.stat}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {advantage.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAdvantageSection;
