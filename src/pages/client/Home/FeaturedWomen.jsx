import React, { useEffect, useState } from 'react'
import { message, Spin } from 'antd';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import { productsAPI } from '../../../utils/api';
import { Link } from 'react-router';
const FeaturedWomen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                setLoading(true);
                const response = await productsAPI.getAll();
                const all = response.data.filter(p => p.category === 'Women');
                const shirts = all.filter(p => p.subcategory && p.subcategory.toLowerCase().includes('shirt')).slice(0, 3);
                const pants = all.filter(p => p.subcategory && p.subcategory.toLowerCase().includes('pant')).slice(0, 3);
                const shoes = all.filter(p => p.subcategory && p.subcategory.toLowerCase().includes('shoe')).slice(0, 3);
                let mixed = [...shirts, ...pants, ...shoes];
                mixed = mixed.sort(() => Math.random() - 0.5);
                setProducts(mixed);
            } catch (error) {
                console.error('Error fetching products:', error);
                message.error('Failed to load products');
            } finally {

                setLoading(false);

            }
        };
        fetchProducts();
    }, []);

    // Function to get subcategory route (copied from MenProducts)
    const getSubcategoryRoute = (subcategory) => {
        if (!subcategory) return '/men';
        const sub = subcategory.toLowerCase();
        const subcategoryRoutes = {
            shirt: '/men/shirts',
            pants: '/men/pants',
            shoes: '/men/shoes',
        };
        if (sub.includes('shirt')) return subcategoryRoutes.shirt;
        if (sub.includes('pant')) return subcategoryRoutes.pants;
        if (sub.includes('shoe')) return subcategoryRoutes.shoes;
        return '/men';
    };

    // Handle product click to redirect to subcategory page
    const handleProductClick = (product) => {
        window.location.href = getSubcategoryRoute(product.subcategory);
    };

    return (
        <>
            <div className="relative">
                <div className="men-featured">
                    <img src="/assets/new-womenswear-at-lama.webp" alt="" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-full flex flex-col -translate-x-1/2 text-center">
                    <span className='text-2xl font-bold text-white tracking-[6px]'>GOLDEN DELICIOUS</span>
                    <span className='text-2xl  text-white tracking-[6px]'>All Men's Collection</span>

                    <Link to='/women' className=' text-lg font-medium text-[#000000] underline  '>Shop Now</Link>
                </div>
            </div>
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Featured Men's Products
                    </h2>
                    {loading ? (
                        <div className="flex justify-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={3}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 10 },
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            className="mySwiper"
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <div
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        <div className="relative pb-[100%]">
                                            <img
                                                src={`http://localhost:5000${product.images[0]}`}
                                                alt={product.name}
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                                            <p className="text-gray-600 mt-1">Rs: {product.price}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </section>
        </>
    )
}

export default FeaturedWomen



