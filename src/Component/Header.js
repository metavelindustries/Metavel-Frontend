import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react"; // Importing the MapPin icon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🔹 Top Header with Address and Contact */}
      <div className="bg-blue-900 text-white text-sm p-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Address Section */}
          <div className="flex items-center space-x-2">
            <MapPin size={16} /> {/* Address Icon */}
            <p className="hidden md:block">
              C / 204, BALAJI RESIDENCY, NR KALYAN FARM, NIKOL, Ahmedabad, GUJARAT, 382350
            </p>
          </div>

          {/* Contact Button - Improved UI */}
          <a
  href="tel:+916356973719"
  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition-all"
>
  Contact Us
</a>

        </div>
      </div>

      {/* 🔹 Main Header */}
      <header className="bg-gray-300 text-blue-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between md:justify-stretch items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/Metavel_logo.jpeg`}
              alt="Metavel Logo"
              className="w-10 h-10"
            />
            <Link to="/" className="hover:underline">
              <h1 className="text-xl font-bold">Metavel</h1>
            </Link>
          </div>

          {/* Menu Button (Mobile) */}
          <button
            className="md:hidden text-blue-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Menu */}
          <nav
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 transition-all ${
              menuOpen ? "block z-50" : "hidden"
            } md:flex md:flex-grow md:justify-center md:space-x-8 text-lg text-blue-900 shadow-md md:shadow-none`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 w-full md:justify-center items-center">
              <li>
                <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline" onClick={() => setMenuOpen(false)}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Industrial Valve" className="hover:underline" onClick={() => setMenuOpen(false)}>
                  Industrial Valves
                </Link>
              </li>
              <li>
                <Link to={`/products?category=${encodeURIComponent("Crushing & Mining")}`} className="hover:underline" onClick={() => setMenuOpen(false)}>
                  Crusher & Minings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
