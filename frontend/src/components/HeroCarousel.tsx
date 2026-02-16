import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const slides = [
  {
    id: 1,
    image: heroBanner1,
    title: "AI-Powered Digital Excellence",
    subtitle: "Transform Your Business with Intelligent Solutions",
    description: "We combine cutting-edge AI technology with creative design to deliver digital experiences that drive growth and engagement.",
    cta: "Get Started",
    ctaLink: "/contact",
    secondaryCta: "Learn More",
    secondaryLink: "/about",
  },
  {
    id: 2,
    image: heroBanner2,
    title: "Data-Driven Marketing",
    subtitle: "Scale Your Reach with Smart Strategies",
    description: "Harness the power of analytics and AI to create marketing campaigns that convert visitors into loyal customers.",
    cta: "Explore Services",
    ctaLink: "/services",
 
    secondaryLink: "/case-studies",
  },
  {
    id: 3,
    image: heroBanner3,
    title: "Stunning Web Experiences",
    subtitle: "Design That Captivates & Converts",
    description: "From sleek corporate sites to powerful e-commerce platforms, we craft websites that make lasting impressions.",
    cta: "See Our Work",
    ctaLink: "/services/website-designing",
    secondaryCta: "Get a Quote",
    secondaryLink: "/contact",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/98 dark:via-background/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {slide.subtitle}
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {slide.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to={slide.ctaLink}>{slide.cta}</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to={slide.secondaryLink}>{slide.secondaryCta}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={prevSlide}
          className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-foreground/30 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={nextSlide}
          className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </div>
      </motion.div> */}
    </section>
  );
};

export default HeroCarousel;
