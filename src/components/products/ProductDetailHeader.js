import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ProductDetailHeader = ({ product, onContactClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div className="w-full md:w-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-[var(--color-primary-main)] mb-2 hover:underline font-medium touch-target py-1"
          aria-label="Back to products"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Products</span>
        </button>
        
        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-neutral-800)]">
            {product.name}
          </h1>
          
          {product.category && (
            <Badge variant="secondary" className="ml-2">
              {product.category.name}
            </Badge>
          )}
        </div>
      </div>
      
      <Button 
        variant="primary" 
        className="w-full md:w-auto touch-target" 
        onClick={onContactClick}
        icon={<Phone size={18} />}
        fullWidth={window.innerWidth < 768}
      >
        Contact Us
      </Button>
    </div>
  );
};

ProductDetailHeader.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  onContactClick: PropTypes.func.isRequired
};

export default ProductDetailHeader; 