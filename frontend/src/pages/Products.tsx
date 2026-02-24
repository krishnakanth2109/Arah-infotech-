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
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api'; // <-- Properly utilizing this import now

// Map string icon names to components
const iconMap: any = {
  BarChart3: BarChart3,
  Zap: Zap,
  Shield: Shield,
  Rocket: Rocket,
};

const Products = () => {
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });

  // ✅ FIX: Replaced the manual 'fetch' with your configured API function
  // This guarantees the User side fetches data exactly like the Admin side does.
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts 
  });

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
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No products found.
              </div>
            ) : (
              <div className="space-y-16">
                {products.map((product: any, index: number) => {
                  const IconComponent = iconMap[product.icon] || BarChart3;
                  
                  return (
                    <motion.div
                      key={product._id}
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
                            <IconComponent className="w-7 h-7 text-primary-foreground" />
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
                          {product.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Products;