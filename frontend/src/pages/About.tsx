import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Lightbulb, Users, Award, Heart } from 'lucide-react';
import aboutHero from '@/assets/about-hero.jpg';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We’re always looking ahead—exploring new technologies and smarter ways of working to deliver solutions that stay ahead of the curve.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Your success is our success. We believe in true collaboration and work as an extension of your team, fully invested in your growth.',
  },
  {
    icon: Award,
    title: 'Excellence Always',
    description: ' “Good enough” isn’t how we operate. We push for excellence in every project, every detail, and every interaction.',
  },
  {
    icon: Heart,
    title: 'Integrity & Trust',
    description: 'Honesty and transparency guide everything we do. We build long-term relationships grounded in trust and accountability.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '150+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '30+', label: 'Team Members' },
];

const About = () => {
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const approachRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isApproachInView = useInView(approachRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Driving Meaningful Digital Transformation"
          subtitle="About Arah Infotech"
          description="We’re a team of passionate technologists, designers, and strategists who love solving real business problems. Our focus is simple: helping businesses grow, adapt, and succeed in an ever-evolving digital world."
          backgroundImage={aboutHero}
          badge="Our Story"
        />

        {/* Company Overview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Building the Future of{' '}
                  <span className="gradient-text">Digital Business</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Arah Infotech was founded with a clear purpose: to connect smart technology with real business results. Over the years, we’ve grown into a trusted digital partner for organizations around the world—known for combining deep technical know-how with creative thinking. The solutions we deliver don’t just meet expectations; they raise the bar.

                </p>
                <p className="text-muted-foreground mb-8">
                  Our approach is straightforward and effective. We take the time to understand your challenges, apply the right mix of AI and modern digital tools, and build solutions that create measurable impact. Whether you’re a startup ready to break through or an established enterprise driving digital transformation, we’re here to support you at every step.

                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-display font-bold gradient-text mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img 
                  src={aboutHero} 
                  alt="Arah Infotech Team"
                  className="rounded-2xl shadow-card-hover"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card-hover">
                  <div className="text-4xl font-display font-bold gradient-text">10+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section ref={visionRef} className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To become a global leader in AI-driven digital solutions—helping businesses of every size unlock the power of technology and achieve meaningful, sustainable growth in the digital world.

                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To create smart, impactful digital solutions that solve real business problems. By blending cutting-edge AI with thoughtful design and strategy, we help our clients adapt, grow, and succeed in a constantly changing digital landscape.

                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section ref={approachRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                AI + Logic + Design = <span className="gradient-text">Real Results</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our approach brings together the intelligence of AI, the clarity of logic, and the impact of great design. The result is solutions that perform beautifully, solve real problems, and look as good as they work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'AI Intelligence',
                  description: 'We use machine learning and data analytics to spot patterns, anticipate trends, and automate processes—helping you make smarter decisions and move faster.',
                },
                {
                  step: '02',
                  title: 'Logical Framework',
                  description: 'Every solution we build rests on a strong foundation—scalable architecture, clean code, and workflows designed for efficiency and growth.',
                },
                {
                  step: '03',
                  title: 'Design Excellence',
                  description: 'We create beautiful, intuitive experiences that feel effortless to use—engaging users and keeping them coming back.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-shadow"
                >
                  <div className="text-6xl font-display font-bold text-primary/10 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 relative">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground relative">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                What <span className="gradient-text">Drives Us</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
