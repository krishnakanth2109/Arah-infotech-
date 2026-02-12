import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/sections/ServicesSection';
import AIAdvantageSection from '@/components/sections/AIAdvantageSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <ServicesSection />
        <AIAdvantageSection />
        <ProductsSection />
        <IndustriesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
