import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, CheckCircle, AlertCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { ProductService } from '../services/api.service';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import Card, { CardBody } from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProductDetailHeader from '../components/products/ProductDetailHeader';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  
  // New image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  
  const handleContactClick = () => {
    if (window.innerWidth <= 768) {
      window.location.href = 'tel:+916356973719';
    } else {
      alert(`Contact us at:\nPhone: +916356973719\nEmail: Metavelinfo@gmail.com`);
    }
  };
  
  const handleNextImage = () => {
    if (!product || !product.images) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = () => {
    if (!product || !product.images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };
  
  const toggleZoom = () => {
    setZoomActive(!zoomActive);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomActive) {
        if (e.key === 'Escape') {
          setZoomActive(false);
        }
        return;
      }
      
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomActive, product]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-[142px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-primary-main)]"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <Section background="white" className="pt-[142px]">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[var(--color-neutral-800)] mb-4">
            Error Loading Product
          </h2>
          <p className="text-[var(--color-neutral-600)] mb-6">
            {error || 'Product not found'}
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate(-1)}
            icon={<ArrowLeft size={16} />}
          >
            Go Back
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <main className="pt-[142px]">
      <Section background="white">
        {/* Product Header */}
        <ProductDetailHeader 
          product={product} 
          onContactClick={handleContactClick} 
        />
        
        {/* Top Section with Images and Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Custom Product Gallery */}
          <div className="product-gallery">
            {/* Main Image */}
            <div className="product-main-image" onClick={toggleZoom}>
              {product.images && product.images.length > 0 && (
                <img 
                  src={product.images[currentImageIndex].url} 
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                />
              )}
              
              {/* Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    className="product-gallery-nav product-gallery-prev" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="product-gallery-nav product-gallery-next" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`product-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={img.url} 
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Zoom Modal */}
            <div className={`product-gallery-zoom ${zoomActive ? 'active' : ''}`}>
              <div className="zoom-container">
                {product.images && product.images.length > 0 && (
                  <img 
                    src={product.images[currentImageIndex].url} 
                    alt={`${product.name} - Full Size`}
                  />
                )}
                
                {/* Navigation Arrows in Zoom View */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button 
                      className="product-gallery-nav product-gallery-prev" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      aria-label="Previous image"
                      style={{ left: '5px', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="product-gallery-nav product-gallery-next" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      aria-label="Next image"
                      style={{ right: '5px', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                <button className="zoom-close" onClick={toggleZoom} aria-label="Close zoom view">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Overview */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-neutral-800)] mb-2">
                {product.name}
              </h2>
              
              <div className="flex gap-2 mb-4">
                {product.category && (
                  <Badge variant="primary">
                    {product.category.name}
                  </Badge>
                )}
              </div>
              
              <p className="text-[var(--color-neutral-600)]">
                {product.metaDescription}
              </p>
            </div>
            
            {/* Short Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-neutral-800)]">
                Overview
              </h3>
              <p className="text-[var(--color-neutral-600)]">
                {product.shortDescription}
              </p>
            </div>
            
            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                variant="primary" 
                onClick={handleContactClick}
                icon={<Phone size={16} />}
                fullWidth
              >
                Request Quote
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={() => window.location.href = 'mailto:Metavelinfo@gmail.com'}
                icon={<Mail size={16} />}
                fullWidth
              >
                Email Inquiry
              </Button>
            </div>
            
            {/* Key Features */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <Card variant="flat" className="mb-6">
                <CardBody>
                  <h3 className="text-lg font-semibold mb-3 text-[var(--color-primary-main)]">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.keyFeatures.map((feature, index) => {
                      // Parse feature format (which could be "Title: Description" or just "Description")
                      let featureTitle = '';
                      let featureDesc = feature;
                      
                      const match = feature.match(/(::|–|:)/);
                      if (match) {
                        const separator = match[0];
                        [featureTitle, featureDesc] = feature.split(separator).map(str => str.trim());
                      }
                      
                      return (
                        <li key={index} className="flex gap-2">
                          <CheckCircle size={20} className="text-[var(--color-secondary-main)] flex-shrink-0 mt-1" />
                          <div>
                            {featureTitle && (
                              <span className="font-medium">{featureTitle}: </span>
                            )}
                            {featureDesc}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
        
        {/* Tabs for Additional Information */}
        <div className="mb-12 mt-12 pt-4 border-t border-[var(--color-neutral-200)]">
          <div className="product-tabs">
            <button
              className={`product-tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Detailed Description
            </button>
            
            <button
              className={`product-tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            
            <button
              className={`product-tab-button ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="product-tab-content">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="text-[var(--color-neutral-700)] text-left whitespace-pre-line leading-relaxed">
                    {product.bigDescription && product.bigDescription.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    {product.images && product.images.length > 3 && (
                      <img 
                        src={product.images[3].url} 
                        alt={product.name} 
                        className="rounded-lg shadow-md max-h-[400px] object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--color-primary-main)] text-white">
                        <th className="px-4 py-3 text-left">Specification</th>
                        <th className="px-4 py-3 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specialization && Object.entries(product.specialization).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-neutral-100)]' : 'bg-white'}>
                          <td className="px-4 py-3 font-medium border border-[var(--color-neutral-200)]">{key}</td>
                          <td className="px-4 py-3 border border-[var(--color-neutral-200)]">
                            {Array.isArray(value) && value.length > 0 ? value[0] : value || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {(!product.specialization || Object.keys(product.specialization).length === 0) && (
                  <div className="text-center py-8 text-[var(--color-neutral-500)]">
                    <AlertCircle size={32} className="mx-auto mb-2" />
                    <p>No specifications available for this product.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'applications' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-main)]">Product Applications</h3>
                <p className="mb-4">This product is ideal for use in the following applications:</p>
                <ul className="list-disc pl-6 space-y-2 text-[var(--color-neutral-700)]">
                  {product.applications ? (
                    product.applications.map((application, index) => (
                      <li key={index}>{application}</li>
                    ))
                  ) : (
                    <li>Please contact us for specific application information.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gradient-to-br from-[var(--color-primary-main)] to-[var(--color-primary-light)] text-white rounded-lg p-8 mb-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">Interested in this Product?</h3>
            <p className="mb-6 text-white/90 leading-relaxed">
              Contact our team for pricing, customization options, and technical specifications. 
              We provide professional consultation to help you choose the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleContactClick}
                className="transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
              >
                Contact Us
              </Button>
              <Button 
                variant="outline-secondary" 
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary-main)] transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                onClick={() => window.location.href = 'mailto:Metavelinfo@gmail.com'}
              >
                Request Information
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default ProductDetailPage;