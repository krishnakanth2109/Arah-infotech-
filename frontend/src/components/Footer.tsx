import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/arah-logo.png';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
  ],
  services: [
    { name: 'Website Designing', href: '/services/website-designing' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'AI Solutions', href: '/services/ai-solutions' },
    { name: 'All Services', href: '/services' },
  ],
  products: [
    { name: 'Our Products', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Get Quote', href: '/contact#quote' },
  ],
  resources: [
    { name: 'Documentation', href: '/resources' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Support', href: '/contact' },
    { name: 'Login', href: 'https://hrms-420.netlify.app/', external: true },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/share/182WY8hyuG/', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/@arahinfotech?si=z9qd-5FB6fTcQe4t', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/arah-infotech-pvt-ltd/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/arahinfotechpvtltd?igsh=NHFmc2o2aWV1Y3pl', label: 'Instagram' },
];

const Footer = () => {
  const handleExternalLink = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return null;
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="gradient-primary">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
                Stay Ahead with AI Insights
              </h3>
              <p className="text-primary-foreground/80">
                Get weekly tips on AI, marketing, and web innovation.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 w-full md:w-80"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img src={logo} alt="Arah Infotech" className="h-10 mb-6" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We help businesses grow with AI-driven digital solutions—combining smart technology, creative thinking, and clear strategy to deliver results that truly matter.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:ops@arahinfotech.net" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                ops@arahinfotech.net
              </a>
              <a href="tel:+918919801095" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                +91 89198 01095
              </a>
              <a href="tel:+916304244117" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                +91 63042 44117
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 mt-1" />
                <span>Ground Floor, 83, Shamukh Empire, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => handleExternalLink(link.href, true)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Arah Infotech. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed by Arah Infotech Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;