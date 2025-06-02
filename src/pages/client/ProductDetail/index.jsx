import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Breadcrumb, Button, Rate, Radio, Tabs, Divider, Row, Col } from 'antd';
import { ChevronRight, Home, Tag, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { StoreUse } from '../../../components';
import { shirts } from '../../../data/shirts';

const { Content } = Layout;
const { TabPane } = Tabs;

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setCartOpen, toggleFavorite, favorites } = StoreUse();
    const product = shirts.find(shirt => shirt.id === id);
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return <div>Product not found</div>;
    }

    const isFavorite = favorites.some(fav => fav.id === product.id);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, sizes: [selectedSize] });
        setCartOpen(true);
    };

    const handleCheckout = () => {
        addToCart({ ...product, sizes: [selectedSize] });
        navigate('/checkout');
    };

    return (
        <Layout className="bg-gray-50 min-h-screen">
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
                            title: 'Men',
                            href: '/men'
                        },
                        {
                            title: (
                                <div className="flex items-center">
                                    <Tag size={14} className="mr-1" />
                                    <span>Shirts</span>
                                </div>
                            ),
                            href: '/men/shirts'
                        },
                        {
                            title: product.title
                        }
                    ]}
                />

                <Button
                    type="link"
                    onClick={handleGoBack}
                    className="mb-6 pl-0 flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Shirts
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
                                                className={`aspect-w-1 aspect-h-1 rounded-md  h-[120px]  overflow-hidden ${selectedImage === index ? 'ring-2 ring-black' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.title} view ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={20}>

                                    <div className="aspect-w-4 aspect-h-5 w-full h-[658px] bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={product.images[selectedImage]}
                                            alt={product.title}
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
                                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                                    <div className="mt-2 flex items-center">
                                        <Rate disabled defaultValue={product.rating} className="text-amber-500" />
                                        <span className="ml-2 text-sm text-gray-500">{product.rating} rating</span>
                                    </div>
                                </div>
                                <Button
                                    type="text"
                                    icon={
                                        <Heart
                                            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
                                        />
                                    }
                                    onClick={() => toggleFavorite(product)}
                                />
                            </div>

                            <div className="text-2xl font-bold text-gray-900">
                                {product.onSale ? (
                                    <>
                                        <span className="text-red-600">${product.salePrice}</span>
                                        <span className="ml-2 text-xl text-gray-500 line-through">
                                            ${product.price}
                                        </span>
                                    </>
                                ) : (
                                    <span>${product.price}</span>
                                )}
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
                                    disabled={!product.inStock}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleCheckout}
                                    className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] h-12 text-lg"
                                    disabled={!product.inStock}
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
            </Content>
        </Layout>
    );
};

export default ProductDetailsPage;