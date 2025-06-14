import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto flex justify-around flex-wrap px-5">
        {/* About Section */}
        <div className="text-center mb-4 max-w-xs">
          <h3 className="text-lg font-semibold">About Metavel</h3>
          <p className="text-sm">
              Metavel is a trusted name in the <b>Industrial Valves</b> and <b>Crushing & Mining</b> industries,  
              providing high-quality solutions for various industrial applications.
            </p>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Our Product</h3>
          <Link to="/products?category=Industrial Valve" className="hover:underline">
            Industrial Valves
          </Link><br />
          <Link to={`/products?category=${encodeURIComponent("Crushing & Mining")}`} className="hover:underline">
            Crusher & Minings
          </Link>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-sm">Email: Metavelinfo@gmail.com</p>
          <p className="text-sm">Phone: +91 6356973719</p>
        </div>
        

        {/* Address Section */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <p className="text-sm">
            Rakhiyal, Ahmedabad, India 380023.
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs mt-4">
        <p>&copy; 2025 Metavel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
