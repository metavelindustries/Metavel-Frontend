const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="container mx-auto flex justify-around flex-wrap px-5">
          {/* About Section */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">About Metavel</h3>
            <p className="text-sm">Providing high-quality valve parts for industrial needs.</p>
          </div>
  
          {/* Contact Section */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm">Email: Metavelinfo@gmail.com</p>
            <p className="text-sm">Phone: +91 8320468884</p>
          </div>

          {/* Address Section */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <p className="text-sm">
              C / 204 , BALAJI RESIDENCY,<br />
              NR KALYAN FARM, NIKOL, Ahmedabad, <br />
              AHMADABAD, GUJARAT, 382350
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
  