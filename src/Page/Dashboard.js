import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Dashboard = () => {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
    }, []);

    // Country Flags Data
    const countryImages = [
        { name: "USA", img: "usa.avif" },
        { name: "Canada", img: "canada.avif" },
        { name: "Thailand", img: "thailand.avif" },
        { name: "Brazil", img: "brazil.avif" },
    ];

    return (
        <div className="w-full">
            {/* 🔹 Hero Image Swiper - Gray 300 */}
            <div className="w-full bg-gray-300">
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
                    {["/image2.webp", "/crusher-equipment.jpg"].map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt="Company Banner" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 🔹 Company Info Section - Gray 400 */}
            <div className="w-full bg-gray-400 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
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
                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <img src="/company.jpg" alt="Company" className="w-full max-w-lg rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* 🔹 Export Products Section - Gray 200 */}
            <section className="w-full bg-gray-200 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-blue-900">Our Export Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Industrial Valve */}
                        <Link to="/products" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
                            <img
                                src="/Ind-valves.jpg"
                                alt="Industrial Valve"
                                className="w-full h-40 object-contain mx-auto"
                            />
                            <h3 className="text-lg font-semibold mt-2 text-gray-800">Industrial Valve</h3>
                        </Link>

                        {/* Crushing & Mining */}
                        <Link to="/products" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
                            <img
                                src="/crusher.jpg"
                                alt="Crushing & Mining"
                                className="w-full h-40 object-contain mx-auto"
                            />
                            <h3 className="text-lg font-semibold mt-2 text-gray-800">Crushing & Mining</h3>
                        </Link>
                    </div>
                    <div className="text-center mt-6">
                        <Link
                            to="/products"
                            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View More Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* 🔹 Global Business Presence - Gray 100 */}
            <section className="w-full bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-blue-900">Global Business Presence</h2>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        speed={1000}
                        loop={true}
                        navigation
                        pagination={{ el: ".custom-pagination", clickable: true }}
                        modules={[Autoplay, Navigation, Pagination]}
                        className="mt-6 pb-8"
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {countryImages.map((country, index) => (
                            <SwiperSlide key={index} className="relative text-center">
                                <img
                                    src={country.img}
                                    alt={country.name}
                                    className="w-40 h-40 mx-auto object-contain"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">{country.name}</h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="custom-pagination flex justify-center mt-4"></div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
