import { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/api.service';

const useProducts = (initialCategory = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (category) {
        response = await ProductService.getProductsByCategory(category);
      } else {
        response = await ProductService.getAllProducts();
      }
      
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Get a single product by ID
  const getProductById = useCallback(async (id) => {
    try {
      const response = await ProductService.getProductById(id);
      return response.data.data;
    } catch (err) {
      console.error('Error fetching product details:', err);
      throw new Error('Failed to fetch product details');
    }
  }, []);

  // Change the category and trigger a refetch
  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  // Initial fetch on mount and when category changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    changeCategory,
    currentCategory: category,
  };
};

export default useProducts; 