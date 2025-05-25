import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card, { CardBody, CardImage } from '../common/Card';
import Badge from '../common/Badge';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card 
      className="group h-full flex flex-col animate-hover"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <CardImage 
          src={product.images && product.images.length > 0 ? product.images[0].url : '/image1.jpg'} 
          alt={product.name}
          className="transition-transform duration-500 group-hover:scale-105"
          aspectRatio="4/3"
        />
        
        {/* Category Badge */}
        {product.category && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3"
          >
            {product.category.name}
          </Badge>
        )}
      </div>
      
      <CardBody className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-[var(--color-neutral-800)] mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-[var(--color-neutral-600)] mb-4 line-clamp-2 flex-grow">
          {product.metaDescription}
        </p>
        
        <Link 
          to={`/valve/${product._id}`} 
          className="inline-flex items-center text-[var(--color-primary-main)] font-medium hover:text-[var(--color-primary-dark)] transition-colors touch-target py-1"
        >
          View Details
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardBody>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    metaDescription: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ),
    category: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func
};

export default ProductCard; 