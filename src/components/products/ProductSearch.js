import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const ProductSearch = ({ searchTerm, setSearchTerm, placeholder = 'Search products...' }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="form-input pl-10 py-3 pr-4 rounded-full shadow-md border-0 focus:ring-2 focus:ring-[var(--color-primary-light)] w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-neutral-500)]" size={20} />
      </div>
    </div>
  );
};

ProductSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default ProductSearch; 