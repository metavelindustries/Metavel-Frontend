import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valvesList, setValvesList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-blue-900">Loading...</div>
      </div>
    );
  }

  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get("category");
  
  console.log(categoryFilter);

  // Filter valves based on search term
  const filteredValves = valvesList.filter(valve =>{
    const matchesSearch = valve.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? valve.category.name === categoryFilter : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search valves..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Valves List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredValves.map(valve => (
          <div 
            key={valve._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {valve.images && valve.images.length > 0 && (
              <img 
                src={valve.images[0].url} 
                alt={valve.name} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{valve.name}</h3>
            <p className="text-gray-600 mb-4">{valve.metaDescription}</p>
            <Link to={`/valve/${valve._id}`}>
              <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

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