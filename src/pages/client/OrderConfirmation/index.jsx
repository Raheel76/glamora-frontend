import React, { useEffect, useState } from 'react';
import { Layout, Result, Button, Card, Divider, Steps, Empty } from 'antd';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const { Content } = Layout;
const { Step } = Steps;

const OrderConfirmationPage = () => {
    const location = useLocation();
    const [orderData, setOrderData] = useState(null);
    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    useEffect(() => {
        if (location.state?.orderData) {
            setOrderData(location.state.orderData);
        }
    }, [location.state]);

    if (!orderData) {
        return (
            <Layout className="min-h-screen bg-gray-50">
                <Content className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                    <Result
                        status="warning"
                        title="Order information not found"
                        subTitle="Please check your email for order confirmation details."
                        extra={[
                            <Link to="/" key="home">
                                <Button type="primary" className="bg-[#0F172A] hover:bg-[#1E293B]">
                                    Back to Home
                                </Button>
                            </Link>
                        ]}
                    />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Content className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <Result
                    icon={<CheckCircle className="text-green-500" size={64} />}
                    title="Order Placed Successfully!"
                    subTitle={`Order number: #${orderNumber}`}
                    extra={[
                        <Link to="/men/shirts" key="continue">
                            <Button type="primary" className="bg-[#0F172A] hover:bg-[#1E293B] mr-4">
                                Continue Shopping
                            </Button>
                        </Link>,
                        <Link to="/" key="home">
                            <Button>Back to Home</Button>
                        </Link>
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Order Status */}
                    <Card className="shadow-sm">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Order Status</h3>
                                <span className="text-green-500 font-medium bg-green-100 px-3 py-1 rounded-full text-sm">
                                    Confirmed
                                </span>
                            </div>

                            <Steps direction="vertical" current={0} className="mt-6">
                                <Step
                                    title="Order Confirmed"
                                    description="Your order has been received and is being processed"
                                    icon={<CheckCircle size={20} className="text-green-500" />}
                                />
                                <Step
                                    title="Processing"
                                    description="We're preparing your items for shipment"
                                    icon={<Package size={20} />}
                                />
                                <Step
                                    title="Shipped"
                                    description="Your order is on its way"
                                    icon={<Truck size={20} />}
                                />
                                <Step
                                    title="Delivered"
                                    description="Package delivered to your address"
                                    icon={<Home size={20} />}
                                />
                            </Steps>

                            <div className="bg-blue-50 p-4 rounded-lg mt-6">
                                <h4 className="font-medium text-blue-900 mb-2">Estimated Delivery</h4>
                                <p className="text-blue-700 text-sm">
                                    Your order is expected to arrive in 3-5 business days.
                                </p>
                                <p className="text-blue-600 text-xs mt-1">
                                    You'll receive tracking information via email once your order ships.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Order Summary */}
                    <Card title="Order Summary" className="shadow-sm">
                        <div className="space-y-4">
                            {orderData.items && orderData.items.length > 0 ? (
                                orderData.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={`http://localhost:5000${item.image}`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-md shadow-sm"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                                <span>Size: <span className="font-medium">{item.size}</span></span>
                                                <span>Qty: <span className="font-medium">{item.quantity}</span></span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-gray-500">
                                                    ${item.price.toFixed(2)} each
                                                </span>
                                                <span className="font-semibold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Empty
                                    description="No items found in this order"
                                    className="py-8"
                                />
                            )}

                            <Divider />

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">Rs: {orderData.subtotal ? orderData.subtotal.toFixed(2) : '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        {orderData.shipping === 0 ? (
                                            <span className="text-green-600 font-semibold">Free</span>
                                        ) : (
                                            `Rs: ${orderData.shipping ? orderData.shipping.toFixed(2) : '0.00'}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">Rs: {orderData.tax ? orderData.tax.toFixed(2) : '0.00'}</span>
                                </div>
                                <Divider className="my-3" />
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-green-600">
                                        Rs: {orderData.total ? orderData.total.toFixed(2) : '0.00'}
                                    </span>
                                </div>
                            </div>

                            {orderData.subtotal > 100 && (
                                <div className="bg-green-50 border border-green-200 p-3 rounded-lg mt-4">
                                    <p className="text-sm text-green-700 font-medium flex items-center">
                                        <CheckCircle size={16} className="mr-2" />
                                        You saved on shipping! Free delivery on orders over RS: 100
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Shipping Address */}
                {orderData.shippingAddress && (
                    <Card title="Shipping Address" className="shadow-sm mt-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-gray-800">
                                <p className="font-semibold text-lg text-gray-900">
                                    {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                                </p>
                                <div className="mt-2 space-y-1">
                                    <p>{orderData.shippingAddress.address}</p>
                                    {orderData.shippingAddress.apartment && (
                                        <p>{orderData.shippingAddress.apartment}</p>
                                    )}
                                    <p>
                                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                                    </p>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-900">Email:</span> 
                                        <span className="ml-2 text-gray-700">{orderData.shippingAddress.email}</span>
                                    </p>
                                    <p className="text-sm mt-1">
                                        <span className="font-medium text-gray-900">Phone:</span> 
                                        <span className="ml-2 text-gray-700">{orderData.shippingAddress.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Payment Method */}
                <Card title="Payment Method" className="shadow-sm mt-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                     orderData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                                     orderData.paymentMethod === 'paypal' ? 'PayPal' :
                                     orderData.paymentMethod || 'Not specified'}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {orderData.paymentMethod === 'cod' 
                                        ? 'You will pay when your order is delivered to your address'
                                        : 'Payment has been processed successfully'
                                    }
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    orderData.paymentMethod === 'cod' 
                                        ? 'bg-orange-100 text-orange-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid'}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default OrderConfirmationPage;