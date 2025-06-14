import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight, Navigation } from 'lucide-react';
import Section, { SectionTitle } from '../components/common/Section';
import Button from '../components/common/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [visibleSections, setVisibleSections] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Setup intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.2 });
    
    // Observe sections
    document.querySelectorAll('[data-animate]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <main className="pt-[160px]">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary-dark)] overflow-hidden pt-0 pb-0">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/image2.webp" 
            alt="Contact Us" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-darker)] to-transparent opacity-80"></div>
        <div className="relative container-width py-16 md:py-24">
          <div id="hero-section" data-animate className={`max-w-2xl animate-slide-up ${visibleSections['hero-section'] ? 'in-view' : ''}`}>
            <h1 className="heading-1 text-on-dark mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-on-dark mb-8">
              Have questions about our industrial valves or crushing equipment? 
              Our team is ready to provide the information and support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details and Form */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div id="contact-info" data-animate className={`animate-slide-up ${visibleSections['contact-info'] ? 'in-view' : ''}`}>
            <div className="bg-[var(--color-primary-main)] text-white p-8 rounded-lg shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-6 text-on-dark">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="text-[var(--color-secondary-main)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-on-dark">Office Address</h3>
                    <p className="text-on-dark">
                      Rakhiyal, Ahmedabad, India 380023.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-[var(--color-secondary-main)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-on-dark">Phone Number</h3>
                    <a 
                      href="tel:+916356973719" 
                      className="text-on-dark hover:text-[var(--color-secondary-light)] transition-colors"
                    >
                      +91 6356973719
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-[var(--color-secondary-main)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-on-dark">Email</h3>
                    <a 
                      href="mailto:Metavelinfo@gmail.com" 
                      className="text-on-dark hover:text-[var(--color-secondary-light)] transition-colors"
                    >
                      Metavelinfo@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock size={24} className="text-[var(--color-secondary-main)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-on-dark">Business Hours</h3>
                    <p className="text-on-dark">
                      Monday to Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" data-animate className={`lg:col-span-2 animate-slide-up ${visibleSections['contact-form'] ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[var(--color-neutral-200)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Send Us a Message</h2>
              
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="What is your inquiry about?"
                  />
                </div>
                
                <div className="form-group mb-6">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Please provide details about your inquiry..."
                    rows="5"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full md:w-auto group"
                  icon={<Send size={18} />}
                >
                  <span className="flex items-center">
                    Send Message
                    <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section background="light">
        <div id="map-section" data-animate className={`animate-slide-up ${visibleSections['map-section'] ? 'in-view' : ''}`}>
          <SectionTitle 
            title="Our Location" 
            subtitle="Find us at our Ahmedabad office" 
            centered
          />
          
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg relative border-4 border-white">
            <div className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg">
              <Navigation size={28} className="text-[var(--color-primary-main)]" />
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.0447809086313!2d72.6631407762632!3d23.058819779148365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e872655eee347%3A0x1adc314737832d64!2sBalaji%20Residency%2C%20Nikol%20Naroda%20Road!5e0!3m2!1sen!2sin!4v1745344612486!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Metavel Industries Location"
              className="w-full"
            ></iframe>
          </div>
          <div className="flex justify-center mt-6">
            <a 
              href="https://maps.app.goo.gl/5dTyUoCfv7e6Yty36" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center bg-[var(--color-primary-main)] text-white py-3 px-5 rounded-md hover:bg-[var(--color-primary-dark)] transition-colors group"
            >
              <span>Open in Google Maps</span>
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient-primary">
        <div id="cta-section" data-animate className={`max-w-4xl mx-auto text-center animate-slide-up ${visibleSections['cta-section'] ? 'in-view' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for High-Quality Industrial Solutions?
          </h2>
          <p className="text-lg text-[var(--color-neutral-100)] mb-8 max-w-2xl mx-auto">
            Discover how Metavel Industries can help improve efficiency and performance in your industrial processes with our premium valves and crushing equipment.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="group"
          >
            <Link to="/products" className="flex items-center">
              Explore Our Products
              <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  );
};

export default ContactPage; 