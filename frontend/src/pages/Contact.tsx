import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContact } from '@/lib/api';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Loader2
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
    title: 'Call Us (Primary)',
    content: '+91 89198 01095',
    link: 'tel:+918919801095',
  },
  {
    icon: Phone,
    title: 'Call Us (Support)',
    content: '+91 63042 44117',
    link: 'tel:+916304244117',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Ground Floor, 83, Shamukh Empire, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081',
    link: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon - Fri: 10AM - 7PM IST',
    link: null,
  },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const Contact = () => {
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-()]{10,}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name should only contain letters';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Map form fields to the backend Contact model:
      // firstName + lastName → fullName
      // service → subject
      await submitContact({
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.service,
        message: formData.message.trim(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
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
                    className="p-8 rounded-2xl bg-primary/10 text-center border border-primary/20"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out, {formData.firstName}. We will review your message and get back to you shortly.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: '', lastName: '', email: '', phone: '', service: '', message: ''
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John" 
                          className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.firstName && <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe" 
                          className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.lastName && <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" 
                        className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service Interested In <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.service ? "border-red-500 focus:ring-red-500" : "border-input"}`}
                      >
                        <option value="">Select a service</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="AI Solutions">AI Solutions</option>
                        <option value="Branding">Branding</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.service && <span className="text-xs text-red-500 mt-1 block">{errors.service}</span>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        rows={5}
                        className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                    </div>

                    {/* API error message */}
                    {submitError && (
                      <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        {submitError}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending... <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
                      ) : (
                        <>Send Message <Send className="w-5 h-5 ml-2" /></>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Contact Info Side */}
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
                  {contactInfo.map((info, index) => {
                    const Wrapper = info.link ? 'a' : 'div';
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      >
                        <Wrapper
                          href={info.link || undefined}
                          className={`flex items-start gap-4 p-4 rounded-xl bg-muted/50 transition-colors group ${info.link ? 'hover:bg-muted cursor-pointer' : ''}`}
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <info.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{info.title}</div>
                            <div className="text-muted-foreground text-sm leading-relaxed">{info.content}</div>
                          </div>
                        </Wrapper>
                      </motion.div>
                    );
                  })}
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
            title="Arah Infotech Location"
          ></iframe>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;