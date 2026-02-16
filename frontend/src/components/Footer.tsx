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
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/share/182WY8hyuG/', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/@arahinfotech?si=z9qd-5FB6fTcQe4t', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/arah-infotech-pvt-ltd/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/arahinfotechpvtltd?igsh=NHFmc2o2aWV1Y3pl', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
     
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Grid Layout: 1 col mobile, 2 col tablet, 5 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* 1. Brand Section (Left Side) */}
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img src={logo} alt="Arah Infotech" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              We help businesses grow with AI-driven digital solutions—combining smart technology, creative thinking, and clear strategy.
            </p>
            
            {/* Social Links moved here */}
            <div className="flex gap-3 mt-auto">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Company Links */}
          <div className="lg:pl-4">
            <h4 className="font-display font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Products Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Contact Info (Right Side) */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a href="mailto:ops@arahinfotech.net" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">ops@arahinfotech.net</span>
              </a>
              
              {/* Phones */}
              <div className="space-y-3">
                <a href="tel:+918919801095" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 89198 01095</span>
                </a>
                <a href="tel:+916304244117" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 63042 44117</span>
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-muted-foreground group mt-1">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <address className="not-italic text-sm leading-relaxed">
                  Ground Floor, 83,<br />
                  Shamukh Empire, Ayyappa Society,<br />
                  Madhapur, Hyderabad,<br />
                  Telangana 500081
                </address>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Arah Infotech. All rights reserved.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Designed by Arah Infotech Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;