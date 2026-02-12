import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  CheckCircle
} from 'lucide-react';
import contactHero from '@/assets/contact-hero.jpg';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'ops@arahinfotech.net',
    link: 'mailto:ops@arahinfotech.net',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 89198 01095',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 63042 44117',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Groud Floor, 83, Shamukh Emmpire, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon - Fri: 10AM - 7PM IST',
  },
];

const Contact = () => {
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Let's Build Something Amazing Together"
          subtitle="Contact Us"
          description="Have a project in mind? We'd love to hear from you. Reach out and let's discuss how we can help transform your digital presence."
          backgroundImage={contactHero}
          badge="Get In Touch"
        />

        {/* Contact Section */}
        <section ref={formRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-primary/10 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input placeholder="John" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <Input placeholder="Doe" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input type="email" placeholder="john@example.com" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input type="tel" placeholder="+1 (234) 567-890" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service Interested In
                      </label>
                      <select className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground">
                        <option value="">Select a service</option>
                        <option value="website">Website Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="ai">AI Solutions</option>
                        <option value="branding">Branding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message
                      </label>
                      <Textarea 
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Send Message <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Prefer to reach out directly? Here's how you can connect with us.
                </p>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{info.title}</div>
                        <div className="text-muted-foreground">{info.content}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <MessageSquare className="w-6 h-6" />
                      <span>Live Chat</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <Calendar className="w-6 h-6" />
                      <span>Book a Call</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 bg-muted/50 flex items-center justify-center">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.5702634567523!2d78.39148346948299!3d17.44625707837821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ac7d2a35b3%3A0xe30b8afc58d1c9ef!2sArah%20Infotech!5e0!3m2!1sen!2sin!4v1770637284007!5m2!1sen!2sin"
    className="w-full h-full rounded-lg border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
