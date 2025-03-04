import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-stretch items-center">
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

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-16">
            <li>
              <Link to="/" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/?category=Industrial Valve" className="hover:underline">
                Industrial Valves
              </Link>
            </li>
            <li>
              <Link to={`/?category=${encodeURIComponent("Crushing & Mining")}`} className="hover:underline">
                Crusher & Minings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
