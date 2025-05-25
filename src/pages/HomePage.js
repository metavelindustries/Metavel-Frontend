import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, Award, BarChart, Factory, Truck, Users, Phone, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Button from '../components/common/Button';
import Section, { SectionTitle } from '../components/common/Section';
import Card, { CardBody, CardImage } from '../components/common/Card';

const HomePage = () => {
  // Add scroll animation state
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set up intersection observer for scroll animations
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

  // Country data
  const countries = [
    { name: "USA", img: "usa.avif" },
    { name: "Canada", img: "canada.avif" },
    { name: "Thailand", img: "thailand.avif" },
    { name: "Brazil", img: "brazil.avif" },
  ];

  // Features data
  const features = [
    {
      icon: <Award size={32} className="text-[var(--color-secondary-main)]" />,
      title: "Premium Quality",
      description: "All products are manufactured with high-grade materials and undergo strict quality control."
    },
    {
      icon: <Factory size={32} className="text-[var(--color-secondary-main)]" />,
      title: "Custom Manufacturing",
      description: "We offer customization to meet your specific industrial requirements."
    },
    {
      icon: <Truck size={32} className="text-[var(--color-secondary-main)]" />,
      title: "Global Shipping",
      description: "Fast and reliable shipping to industrial clients worldwide."
    },
    {
      icon: <Users size={32} className="text-[var(--color-secondary-main)]" />,
      title: "Expert Support",
      description: "Dedicated technical team to assist with product selection and installation."
    },
    {
      icon: <BarChart size={32} className="text-[var(--color-secondary-main)]" />,
      title: "Performance Testing",
      description: "Rigorous testing to ensure optimal performance in demanding environments."
    }
  ];

  return (
    <main className="pt-[160px]">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary-dark)] overflow-hidden pt-0 pb-0">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false 
          }}
          loop={true}
          className="swiper-hero"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img 
                src="/image2.webp" 
                alt="Industrial Solutions" 
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center max-w-4xl animate-slide-up in-view">
                  <h1 className="text-3xl md:text-5xl font-bold text-on-dark mb-4">
                    Leading Provider of Industrial Solutions
                  </h1>
                  <p className="text-lg md:text-xl text-on-dark mb-8 max-w-2xl mx-auto">
                    High-quality industrial valves and crushing equipment for global industries
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="shadow-lg"
                    >
                      <Link to="/products" className="flex items-center">
                        Explore Products <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="lg"
                      className="bg-white shadow-lg"
                    >
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img 
                src="/crusher-equipment.jpg" 
                alt="Crushing Equipment" 
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center max-w-4xl animate-slide-up in-view">
                  <h1 className="text-3xl md:text-5xl font-bold text-on-dark mb-4">
                    Industrial Crushing & Mining Solutions
                  </h1>
                  <p className="text-lg md:text-xl text-on-dark mb-8 max-w-2xl mx-auto">
                    High-performance equipment designed for demanding environments
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="shadow-lg group"
                    >
                      <Link to={`/products?category=${encodeURIComponent("Crushing & Mining")}`} className="flex items-center">
                        View Crushers <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* About Company Section */}
      <Section background="white">
        <div 
          id="about-section"
          data-animate 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-slide-up ${visibleSections['about-section'] ? 'in-view' : ''}`}
        >
          <div>
            <h2 className="heading-2 mb-4 text-[var(--color-primary-main)]">
              About Metavel Industries
            </h2>
            <p className="body-regular mb-4 text-[var(--color-neutral-700)]">
              Metavel Industries is a global leader in <strong>industrial valves</strong> and <strong>crusher & mining</strong> solutions.
              We provide top-quality <strong>gate valves, ball valves, butterfly valves, and check valves</strong> that
              ensure high performance in industrial applications.
            </p>
            <p className="body-regular mb-6 text-[var(--color-neutral-700)]">
              Our <strong>crushers and mining equipment</strong> are designed for high efficiency,
              low maintenance, and long-lasting performance, making us a trusted partner for industries worldwide.
            </p>
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right" className="group">
              <Link to="/products" className="flex items-center">
                Our Products <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img 
              src="/company.jpg" 
              alt="Metavel Industries" 
              className="rounded-lg shadow-lg w-full object-cover interactive-card"
            />
            <div className="absolute -bottom-4 -left-4 bg-[var(--color-secondary-main)] rounded-lg p-4 shadow-lg hidden md:block transform transition-all duration-500 hover:scale-105">
              <p className="font-bold text-lg text-on-secondary">10+ Years</p>
              <p className="text-sm text-[var(--color-neutral-800)]">of industry experience</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Key Features */}
      <Section background="light">
        <div id="features-section" data-animate>
          <SectionTitle 
            title="Why Choose Metavel Industries" 
            subtitle="We combine quality manufacturing with exceptional service to deliver industry-leading products" 
            centered
            className={`animate-slide-up ${visibleSections['features-section'] ? 'in-view' : ''}`}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center p-6 interactive-card animate-slide-up ${visibleSections['features-section'] ? 'in-view' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-neutral-800)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-neutral-600)]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Product Categories */}
      <Section background="gradient-primary">
        <div id="products-section" data-animate>
          <SectionTitle 
            title="Our Product Categories" 
            subtitle="Explore our comprehensive range of industrial equipment and solutions" 
            centered
            titleClassName="text-white"
            subtitleClassName="text-white font-medium"
            className={`animate-slide-up ${visibleSections['products-section'] ? 'in-view' : ''}`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Industrial Valves */}
            <Card 
              className={`overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-slide-up ${visibleSections['products-section'] ? 'in-view' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative">
                <CardImage 
                  src="/Ind-valves.jpg" 
                  alt="Industrial Valves" 
                  aspectRatio="16/9"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 text-on-dark">Industrial Valves</h3>
                  <p className="mb-4 text-on-dark">
                    High-quality ball valves, gate valves, check valves and more for various industrial applications
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="group"
                  >
                    <Link to="/products?category=Industrial Valve" className="flex items-center">
                      Explore Valves <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Crushing & Mining */}
            <Card 
              className={`overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-slide-up ${visibleSections['products-section'] ? 'in-view' : ''}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative">
                <CardImage 
                  src="/crusher.jpg" 
                  alt="Crushing & Mining Equipment" 
                  aspectRatio="16/9"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 text-on-dark">Crusher & Mining Equipment</h3>
                  <p className="mb-4 text-on-dark">
                    Reliable crushing and mining solutions that offer maximum productivity
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="group"
                  >
                    <Link to={`/products?category=${encodeURIComponent("Crushing & Mining")}`} className="flex items-center">
                      Explore Crushers <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-10 animate-slide-up" style={{ transitionDelay: '300ms' }}>
            <Button 
              variant="outline-secondary" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--color-primary-main)]"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Global Presence */}
      <Section background="white">
        <div id="global-section" data-animate>
          <SectionTitle 
            title="Global Business Presence" 
            subtitle="Serving customers worldwide with premium industrial solutions" 
            centered
            className={`animate-slide-up ${visibleSections['global-section'] ? 'in-view' : ''}`}
          />
          
          <div className={`mt-10 animate-slide-up ${visibleSections['global-section'] ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              speed={600}
              navigation={true}
              autoplay={{ 
                delay: 3000, 
                disableOnInteraction: false 
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 40 },
              }}
              className="py-4 countries-swiper"
            >
              {countries.map((country, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center p-4 h-full">
                    <div className="bg-[var(--color-neutral-100)] p-6 rounded-full inline-flex items-center justify-center mb-4 h-32 w-32 mx-auto transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <img
                        src={country.img}
                        alt={country.name}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-primary-main)]">
                      {country.name}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className={`mt-12 bg-[var(--color-neutral-100)] rounded-lg p-8 text-center shadow-lg animate-slide-up ${visibleSections['global-section'] ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary-dark)]">Ready to Work with Us?</h3>
            <p className="text-[var(--color-neutral-700)] mb-6 max-w-2xl mx-auto">
              Contact our team to discuss your industrial valve or crushing equipment needs.
              We offer customized solutions for your specific requirements.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              icon={<Phone size={18} />}
              className="group"
            >
              <Link to="/contact" className="flex items-center">
                Contact Us <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default HomePage;