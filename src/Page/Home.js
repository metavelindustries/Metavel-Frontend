import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valvesList, setValvesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/all`)
      .then(response => {
        setValvesList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get("category");

  // Reset "show all" when user searches or selects a category
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAll(false);
  };

  const handleCategoryClick = () => {
    setShowAll(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-blue-900">Loading...</div>
      </div>
    );
  }

  // Filter valves based on search term
  const filteredValves = valvesList.filter(valve => {
    const matchesSearch = valve.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? valve.category.name === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const visibleValves = showAll ? filteredValves : filteredValves.slice(0, 9);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            placeholder="Search valves..."
            className="w-full p-3 pl-10 border-2 border-blue-600 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={searchTerm}
            onChange={handleSearchChange} // 🔥 Reset "show all" on search
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"  
            xmlns="http://www.w3.org/2000/svg"  
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="currentColor"  
            strokeWidth="2"  
            strokeLinecap="round"  
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Valves List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleValves.map(valve => (
          <div 
            key={valve._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {valve.images && valve.images.length > 0 && (
              <img 
                src={valve.images[0].url} 
                alt={valve.name} 
                className="h-48 object-cover rounded-md mb-4 mx-auto"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{valve.name}</h3>
            <p className="text-gray-600 mb-4">{valve.metaDescription}</p>
            <Link to={`/valve/${valve._id}`} onClick={handleCategoryClick}> 
              <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* "Show More" Button */}
      {filteredValves.length > 9 && !showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Show More
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredValves.length === 0 && (
        <div className="flex justify-center items-center h-screen text-center text-gray-600">
          No valves found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default Home;
