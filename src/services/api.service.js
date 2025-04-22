import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors or handle them globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Product Service
class ProductService {
  // Get all products
  static getAllProducts() {
    return api.get('/product/all');
  }
  
  // Get product by ID
  static getProductById(id) {
    return api.get(`/product/${id}`);
  }
  
  // Get products by category
  static getProductsByCategory(category) {
    return api.get(`/product/all?category=${category}`);
  }
}

// Export the services
export { ProductService };

// Export the base api for custom calls
export default api; 