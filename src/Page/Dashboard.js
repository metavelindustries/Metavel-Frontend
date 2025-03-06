import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
    }, []);

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/all`);
                setProducts(response.data.data.slice(0, 4)); // Limit to 4 products
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    // Country Flags Data
    const countryImages = [
        { name: "USA", img: "usa.avif" },
        { name: "Canada", img: "canada.avif" },
        { name: "Thailand", img: "thailand.avif" },
        { name: "Brazil", img: "brazil.avif" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 🔹 Hero Image Swiper */}
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={1000} 
                loop={true}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[300px] md:h-[500px]"
            >
                {["/image1.jpg", "/image2.webp"].map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt="Company Banner" className="w-full h-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 🔹 Company Info Section */}
            <div className="bg-gray-200 py-12 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    {/* Welcome Text */}
                    <div className="md:w-1/2 text-left">
                        <h1 className="text-3xl font-bold text-blue-900">Welcome to Metavel PVT LTD</h1>
                        <p className="mt-4 text-gray-700">
                            Metavel PVT LTD is a global leader in <b>industrial valves</b> and <b>crusher & mining</b> solutions.
                            We provide top-quality <b>gate valves, ball valves, butterfly valves, and check valves</b> that
                            ensure high performance in industrial applications.
                        </p>
                        <p className="mt-2 text-gray-700">
                            Our <b>crushers and mining equipment</b> are designed for high efficiency,
                            low maintenance, and long-lasting performance, making us a trusted partner for industries worldwide.
                        </p>
                    </div>

                    {/* Company Image */}
                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <img src="/company.jpg" alt="Company" className="w-full max-w-lg rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* 🔹 Export Products Section */}
            <section className="container bg-gray-200 mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-center text-blue-900">Our Export Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {products.map((product) => (
                        <Link to={`/valve/${product._id}`}>
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                                <img
                                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                                    alt={product.name}
                                    className="w-full h-40 object-contain mx-auto"
                                />
                                <h3 className="text-lg font-semibold mt-2 text-gray-800">{product.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-6">
                    <Link
                        to="/products"
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        View More Products
                    </Link>
                </div>
            </section>

            {/* 🔹 Global Business Presence */}
            <section className="bg-gray-200 py-12 px-6">
                <h2 className="text-2xl font-bold text-center text-blue-900">Global Business Presence</h2>
                <Swiper
    spaceBetween={10}
    slidesPerView={3} // Show 3 country images at a time
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    speed={1000} // Smooth transitions
    loop={true}
    navigation
    pagination={{ el: ".custom-pagination", clickable: true }} // Custom pagination
    modules={[Autoplay, Navigation, Pagination]}
    className="mt-6 pb-8"
    breakpoints={{
        640: { slidesPerView: 1 }, // 1 slide for small screens
        768: { slidesPerView: 2 }, // 2 slides for tablets
        1024: { slidesPerView: 3 }, // 3 slides for desktops
    }}
>
    {countryImages.map((country, index) => (
        <SwiperSlide key={index} className="relative text-center">
            {/* Country Image */}
            <img
                src={country.img}
                alt={country.name}
                className="w-40 h-40 mx-auto object-contain"
            />

            {/* Country Name - Positioned Below Image */}
            <h3 className="text-lg font-semibold text-gray-800 mt-2">
                {country.name}
            </h3>
        </SwiperSlide>
    ))}
</Swiper>

{/* Custom Pagination Below Images */}
<div className="custom-pagination flex justify-center mt-4"></div>


            </section>
        </div>
    );
};

export default Dashboard;
