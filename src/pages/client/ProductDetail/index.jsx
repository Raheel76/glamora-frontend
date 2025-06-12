import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Breadcrumb, Button, Rate, Radio, Tabs, Divider, Row, Col, Spin, Typography } from 'antd';
import { ChevronRight, Home, Tag, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { StoreUse } from '../../../components';
import { productsAPI } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setCartOpen, toggleFavorite, favorites } = StoreUse();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            try {
                setLoading(true);
                setRelatedLoading(true);

                // Fetch the current product
                const productResponse = await productsAPI.getById(id);
                const productData = productResponse.data;
                setProduct(productData);
                setSelectedSize(productData.sizes[0]);

                // Fetch related products in the same category and subcategory
                const relatedResponse = await productsAPI.getBySubcategory(
                    productData.category,
                    productData.subcategory
                );
                // Filter out the current product and only show shirts
                const filteredRelated = relatedResponse.data
                    .filter(item => item._id !== id && item.subcategory.toLowerCase() === 'shirts');
                setRelatedProducts(filteredRelated);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load product details');
                navigate('/');
            } finally {
                setLoading(false);
                setRelatedLoading(false);
            }
        };

        if (id) {
            fetchProductAndRelated();
        }
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const isFavorite = favorites.some(fav => fav._id === product._id);

    const handleGoBack = () => {
        navigate('/men/shirts');
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.warning('Please select a size');
            return;
        }
        addToCart({ ...product, selectedSize });
        setCartOpen(true);
        toast.success(`${product.name} added to cart!`);
    };

    const handleCheckout = () => {
        if (!selectedSize) {
            toast.warning('Please select a size');
            return;
        }
        addToCart({ ...product, selectedSize });
        navigate('/checkout');
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
        toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Content className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <Breadcrumb
                    className="mb-6"
                    separator={<ChevronRight size={14} className="text-gray-400" />}
                    items={[
                        {
                            title: (
                                <div className="flex items-center">
                                    <Home size={14} className="mr-1" />
                                    <span>Home</span>
                                </div>
                            ),
                            href: '/'
                        },
                        {
                            title: product.category,
                            href: `/${product.category.toLowerCase()}`
                        },
                        {
                            title: (
                                <div className="flex items-center">
                                    <Tag size={14} className="mr-1" />
                                    <span>{product.subcategory}</span>
                                </div>
                            ),
                            href: `/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`
                        },
                        {
                            title: product.name
                        }
                    ]}
                />

                <Button
                    type="link"
                    onClick={handleGoBack}
                    className="mb-6 pl-0 flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to {product.subcategory}
                </Button>

                <Row gutter={[24, 24]}>
                    <Col md={12}>
                        <div className="space-y-4">
                            <Row gutter={[24, 16]}>
                                <Col md={4}>
                                    <div className="grid grid-cols-1 gap-4">
                                        {product.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`aspect-w-1 aspect-h-1 rounded-md h-[120px] overflow-hidden ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                                            >
                                                <img
                                                    src={`http://localhost:5000${image}`}
                                                    alt={`${product.name} view ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={20}>
                                    <div className="aspect-w-4 aspect-h-5 w-full h-[658px] bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={`http://localhost:5000${product.images[selectedImage]}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                    <div className="mt-2 flex items-center">
                                        <Rate disabled defaultValue={4.5} className="text-amber-500" />
                                        <span className="ml-2 text-sm text-gray-500">4.5 rating</span>
                                    </div>
                                </div>
                                <Button
                                    type="text"
                                    icon={
                                        <Heart
                                            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
                                        />
                                    }
                                    onClick={handleToggleFavorite}
                                />
                            </div>

                            <div className="text-2xl font-bold text-gray-900">
                                Rs: {product.price}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <Radio.Group
                                    value={selectedSize}
                                    onChange={e => setSelectedSize(e.target.value)}
                                    className="mt-2"
                                >
                                    {product.sizes.map(size => (
                                        <Radio.Button key={size} value={size} className="mr-2">
                                            {size}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ShoppingCart size={20} />}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] h-12 text-lg"
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleCheckout}
                                    className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] h-12 text-lg"
                                >
                                    Buy Now
                                </Button>
                            </div>

                            <Divider />

                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Description" key="1">
                                    <div className="prose max-w-none">
                                        <p>{product.description}</p>
                                        <p className="text-sm text-gray-500 mt-2">{product.note}</p>
                                    </div>
                                </TabPane>
                                <TabPane tab="Details" key="2">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium">SKU</h4>
                                                <p className="text-gray-600">{product.sku}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Fit Type</h4>
                                                <p className="text-gray-600">{product.fitType}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Material</h4>
                                                <p className="text-gray-600">{product.material}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Occasion</h4>
                                                <p className="text-gray-600">{product.occasion}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Stretch</h4>
                                                <p className="text-gray-600">{product.stretch}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Hand Feel</h4>
                                                <p className="text-gray-600">{product.handFeel}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Design Details</h4>
                                            <p className="text-gray-600">{product.designDetails}</p>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>

                {/* Related Products Section - Only Shirts */}
                <Divider className="my-12" />
                <div className="mt-12">
                    <Title level={3} className=" text-center !text-3xl">Related Shirts</Title>
                    {relatedLoading ? (
                        <div className="flex justify-center">
                            <Spin />
                        </div>
                    ) : relatedProducts.length > 0 ? (
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={4}
                            navigation={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}
                            className="mySwiper px-4 py-6"
                        >
                            {relatedProducts.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <div 
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        <div className="relative pb-[120%]">
                                            <img
                                                src={`http://localhost:5000${product.images[0]}`}
                                                alt={product.name}
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900 ">{product.name}</h3>
                                            <div className="mt-1 flex justify-between items-center">
                                                <span className="text-gray-900 font-bold">${product.price}</span>
                                                <Rate 
                                                    disabled 
                                                    defaultValue={4.5} 
                                                    className="text-amber-500 text-xs" 
                                                    count={1}
                                                    character={<span>★</span>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="text-gray-500 text-center">No related shirts found.</p>
                    )}
                </div>
            </Content>
        </div>
    );
};

export default ProductDetailsPage;