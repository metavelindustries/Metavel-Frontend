import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';

import useProducts from '../hooks/useProducts';
import Section, { SectionTitle } from '../components/common/Section';
import ProductSearch from '../components/products/ProductSearch';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterOpen, setFilterOpen] = useState(false);
  
  const { 
    products, 
    loading, 
    error,
    currentCategory,
    changeCategory 
  } = useProducts(categoryParam);

  useEffect(() => {
    document.title = currentCategory ? `${currentCategory} Products` : 'All Products';
  }, [currentCategory]);

  // Reset to top of page when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    changeCategory(categoryParam);
    
    // Close filters on mobile when category changes
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  }, [categoryParam, changeCategory]);

  // Reset "show all" when searching
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setShowAll(false);
  };

  // Filter products based on search term
  const filteredProducts = products
  .filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.metaDescription && product.metaDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !currentCategory || product.category?.name === currentCategory;
    return matchesSearch && matchesCategory;
  });


  // Products to display (limited if not showing all)
  const displayProducts = showAll ? filteredProducts : filteredProducts.slice(0, 12);

  // Collection of unique categories from products
  const categories = [...new Set(products.map(product => product.category?.name))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-[142px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-primary-main)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Section background="white" className="pt-[142px]">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[var(--color-neutral-800)] mb-4">
            Error Loading Products
          </h2>
          <p className="text-[var(--color-neutral-600)] mb-6">
            {error}
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <main className="pt-[142px]"> {/* Adjust padding top based on header height */}
      {/* Hero Banner */}
      <div className="relative bg-[var(--color-primary-main)] text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/crusher-equipment.jpg" 
            alt="Products" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-width py-8 md:py-16 text-center">
          <h1 className="heading-1 mb-2 md:mb-4">
            {currentCategory 
              ? `${currentCategory} Products` 
              : 'Our Industrial Products'
            }
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            Explore our high-quality range of industrial solutions designed for performance and reliability
          </p>
        </div>
      </div>

      {/* Main Products Section */}
      <Section background="light">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-auto md:flex-grow md:max-w-lg">
            <ProductSearch 
              searchTerm={searchTerm} 
              setSearchTerm={handleSearchChange}
              placeholder={`Search ${currentCategory || 'products'}...`}
            />
          </div>
          
          {/* View Controls */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                size="sm"
                icon={<Grid size={16} />}
                onClick={() => setViewMode('grid')}
                className="p-2 touch-target"
                aria-label="Grid View"
              />
              <Button 
                variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                size="sm"
                icon={<List size={16} />}
                onClick={() => setViewMode('list')}
                className="p-2 touch-target"
                aria-label="List View"
              />
            </div>
            <Button 
              variant="outline-primary" 
              size="sm"
              icon={<SlidersHorizontal size={16} />}
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden touch-target"
              aria-label="Filters"
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {filterOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setFilterOpen(false)}
          />
        )}

        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Category Filters - Sidebar */}
          <div className={`
            md:w-64 flex-shrink-0
            fixed md:static top-0 right-0 bottom-0 z-50 md:z-auto
            w-[280px] md:w-64 overflow-auto
            ${filterOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} 
            transition-transform duration-300 ease-in-out
            bg-white p-5 md:p-4 shadow-xl md:shadow-md md:rounded-lg
          `}>
            <div className="flex justify-between items-center mb-6 md:mb-4">
              <h3 className="font-semibold text-lg text-[var(--color-primary-main)]">Filters</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="md:hidden text-[var(--color-neutral-500)] p-1 touch-target"
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>
            
            <h3 className="font-medium text-md mb-3 text-[var(--color-primary-dark)]">
              Categories
            </h3>
            <div className="space-y-2">
              <div 
                className={`
                  cursor-pointer rounded-md p-3 md:p-2 transition-colors touch-target
                  ${!currentCategory ? 'bg-[var(--color-primary-light)] text-white' : 'hover:bg-[var(--color-neutral-100)]'}
                `}
                onClick={() => {
                  window.history.pushState({}, '', '/products');
                  changeCategory(null);
                }}
              >
                All Products
              </div>
              
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`
                    cursor-pointer rounded-md p-3 md:p-2 transition-colors touch-target
                    ${currentCategory === category ? 'bg-[var(--color-primary-light)] text-white' : 'hover:bg-[var(--color-neutral-100)]'}
                  `}
                  onClick={() => {
                    window.history.pushState({}, '', `/products?category=${encodeURIComponent(category)}`);
                    changeCategory(category);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
            
            {/* Mobile-only apply filters button */}
            <div className="mt-8 md:hidden">
              <Button 
                variant="primary" 
                fullWidth
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Products Display */}
          <div className="flex-grow">
            {/* Applied Filters */}
            {(currentCategory || searchTerm) && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium">Active filters:</span>
                
                {currentCategory && (
                  <Badge variant="primary" className="flex items-center">
                    <span>Category: {currentCategory}</span>
                    <button 
                      className="ml-2 text-xs p-1 touch-target"
                      onClick={() => {
                        window.history.pushState({}, '', '/products');
                        changeCategory(null);
                      }}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center">
                    <span>Search: {searchTerm}</span>
                    <button 
                      className="ml-2 text-xs p-1 touch-target"
                      onClick={() => setSearchTerm('')}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                
                <button 
                  className="text-sm text-[var(--color-primary-main)] hover:underline ml-auto p-1 touch-target"
                  onClick={() => {
                    setSearchTerm('');
                    window.history.pushState({}, '', '/products');
                    changeCategory(null);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Product Results Count */}
            <div className="mb-4 text-[var(--color-neutral-600)]">
              Showing {displayProducts.length} of {filteredProducts.length} products
            </div>
            
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            )}
            
            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {displayProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="card flex flex-col md:flex-row overflow-hidden"
                  >
                    <div className="md:w-1/3 relative">
                      <img 
                        src={product.images && product.images.length > 0 ? product.images[0].url : '/image1.jpg'}
                        alt={product.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {product.category && (
                        <Badge 
                          variant="secondary" 
                          className="absolute top-3 left-3"
                        >
                          {product.category.name}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 md:p-6 md:w-2/3 flex flex-col">
                      <h3 className="text-xl font-semibold text-[var(--color-neutral-800)] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[var(--color-neutral-600)] mb-4 flex-grow line-clamp-2 md:line-clamp-none">
                        {product.metaDescription}
                      </p>
                      <Button variant="primary" className="touch-target">
                        <a href={`/valve/${product._id}`} className="w-full py-2 block">View Details</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Show More Button */}
            {filteredProducts.length > 12 && !showAll && (
              <div className="mt-8 md:mt-10 text-center">
                <Button 
                  variant="outline-primary" 
                  onClick={() => setShowAll(true)}
                  className="touch-target px-6 py-3"
                >
                  Show All Products ({filteredProducts.length})
                </Button>
              </div>
            )}
            
            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-3">No products found</h3>
                <p className="text-[var(--color-neutral-600)] mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="primary"
                  onClick={() => {
                    setSearchTerm('');
                    window.history.pushState({}, '', '/products');
                    changeCategory(null);
                  }}
                  className="touch-target px-6 py-3"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default ProductsPage; 