import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Valve = () => {
    const { id } = useParams();
    const [valve, setValve] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchValve = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/${id}`);
                setValve(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('An error occurred while fetching the valve.');
                setLoading(false);
            }
        };
        fetchValve();
        window.scrollTo(0, 0);
    }, [id]);

    const handleInquiry = () => {
        const phoneNumber = "tel:+916356973719";
        const email = "mailto:Metavelinfo@gmail.com";

        if (window.innerWidth <= 768) {
            window.location.href = phoneNumber;
        } else {
            alert(`Contact us at:\nPhone: +918320468884\nEmail: Metavelinfo@gmail.com`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl font-bold text-blue-900">Loading...</div>
            </div>
        );
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center my-4">
                <button onClick={() => navigate(-1)} className="text-blue-900 hover:underline">
                    ← Back
                </button>
                <button onClick={handleInquiry} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                    Contact Us
                </button>
            </div>
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Slider */}
                <div>
                <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Navigation, Pagination]}
                    >
                        {valve.images.slice(0, 3).map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img.url} alt="Valve" className="w-full aspect-[16/9] object-contain rounded-lg mx-auto" />
                            </SwiperSlide>
                        ))}
                    </Swiper>             
                </div>
                {/* Details */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{valve.name}</h1>
                    <p className="mt-2 text-gray-600">{valve.metaDescription}</p>
                    <p className="mt-10 text-gray-700">{valve.shortDescription}</p>
                    <p className="mt-10 text-gray-500">Category: {valve.category.name}</p>

                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="text-gray-700 text-left whitespace-pre-line leading-relaxed">
    {valve.bigDescription.split("\n").map((paragraph, index) => (
        <p key={index} className="indent-8">{paragraph}</p>
    ))}
</div>


                <div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Navigation, Pagination]}
                    >
                        {valve.images.slice(3, 6).map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img.url} alt="Valve" className="w-full aspect-[16/9] object-contain rounded-lg mx-auto" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Slider */}
                <div className='items-end mt-20'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Navigation, Pagination]}
                    >
                        {valve.images.slice(6, 9).map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img.url} alt="Valve" className="w-full aspect-[16/9] object-contain rounded-lg mx-auto" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Key Features Table */}
                <div className="mt-8">
    <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">Key Features:</h2>
    <table className="w-full border-collapse border border-gray-300">
        <tbody>
            {valve.keyFeatures.map((feature, index) => {
                let title = "";
                let description = "";

                // Find the first separator in the string
                const match = feature.match(/(::|–|:)/);
                
                if (match) {
                    const separator = match[0]; // Get the matched separator
                    [title, description] = feature.split(separator).map(str => str.trim());
                } else {
                    // If no separator exists, treat the whole text as description
                    title = "";
                    description = feature.trim();
                }

                return (
                    <tr key={index} className="border-b">
                        <td className="p-2 text-gray-800 font-bold">{title ? `${title} ${match ? match[0] : ""}` : ""}</td>
                        <td className="p-2 text-gray-600">{description}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>




            </div>

            {/* Specifications */}
            <div className="mt-10">
                <h2 className="text-xl font-bold text-center">Specifications</h2>
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <tbody>
                        {Object.entries(valve.specialization).map(([key, value], index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2 font-bold text-gray-800">{key}</td>
                                <td className="p-2 text-gray-600">
                                    {Array.isArray(value) && value.length > 0 ? value[0] : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Valve;