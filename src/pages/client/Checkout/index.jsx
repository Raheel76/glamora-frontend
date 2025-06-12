import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Divider, Radio, Card, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StoreUse } from '../../../components';
import { ordersAPI } from '../../../utils/api';
import { ArrowLeft } from 'lucide-react';

const { Content } = Layout;
const { Option } = Select;

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart, user } = StoreUse();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Calculate totals
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10.00; // Free shipping over $100
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const handleSubmit = async (values) => {
        if (cart.length === 0) {
            message.error('Your cart is empty');
            return;
        }

        try {
            setLoading(true);

            // Prepare order data
            const orderData = {
                items: cart.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity || 1,
                    size: item.selectedSize || item.sizes[0],
                    image: item.images[0]
                })),
                shippingAddress: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                    apartment: values.apartment,
                    city: values.city,
                    state: values.state,
                    zipCode: values.zipCode
                },
                paymentMethod,
                subtotal,
                shipping,
                tax,
                total,
                status: 'pending'
            };

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create order
            const response = await ordersAPI.create(orderData);

            if (response.data) {
                // Clear cart after successful order
                clearCart();
                message.success('Order placed successfully!');

                // Navigate to confirmation page with order ID
                navigate('/order-confirmation', {
                    state: {
                        orderId: response.data._id,
                        orderData: response.data
                    }
                });
            }
        } catch (error) {
            console.error('Order creation error:', error);
            message.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (cart.length === 0) {
        return (
            <Layout className="min-h-screen bg-gray-50">
                <Content className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout.</p>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/men/shirts')}
                            className="bg-[#0F172A]"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Content className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your order</p>
                </div>

                <Button
                    type="link"
                    onClick={handleGoBack}
                    className="mb-3 pl-0 flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Go Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            className="space-y-6"
                            initialValues={{
                                email: user?.email || ''
                            }}
                        >
                            {/* Contact Information */}
                            <Card title="Contact Information" className="shadow-sm">
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Card>

                            {/* Shipping Address */}
                            <Card title="Shipping Address" className="shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item
                                        name="firstName"
                                        label="First Name"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="lastName"
                                        label="Last Name"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name="address"
                                    label="Street Address"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="apartment"
                                    label="Apartment, suite, etc. (optional)"
                                >
                                    <Input />
                                </Form.Item>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="state"
                                        label="State"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select>
                                            <Option value="CA">California</Option>
                                            <Option value="NY">New York</Option>
                                            <Option value="TX">Texas</Option>
                                            <Option value="FL">Florida</Option>
                                            <Option value="IL">Illinois</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="zipCode"
                                        label="ZIP Code"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </Card>

                            {/* Payment Method */}
                            <Card title="Payment Method" className="shadow-sm">
                                <Radio.Group
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full"
                                >
                                    <div className="space-y-4">
                                        <Radio value="card" className="w-full">
                                            <div className="flex justify-between items-center w-full">
                                                <span>Credit/Debit Card</span>
                                                <div className="flex gap-2">
                                                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">VISA</span>
                                                    <span className="text-xs bg-red-100 px-2 py-1 rounded">MC</span>
                                                </div>
                                            </div>
                                        </Radio>
                                        <Radio value="paypal" className="w-full">
                                            <div className="flex justify-between items-center w-full">
                                                <span>PayPal</span>
                                                <span className="text-xs bg-blue-100 px-2 py-1 rounded">PayPal</span>
                                            </div>
                                        </Radio>
                                        <Radio value="cod" className="w-full">
                                            <span>Cash on Delivery</span>
                                        </Radio>
                                    </div>
                                </Radio.Group>

                                {paymentMethod === 'card' && (
                                    <div className="mt-4 space-y-4">
                                        <Form.Item
                                            name="cardNumber"
                                            label="Card Number"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input placeholder="1234 5678 9012 3456" />
                                        </Form.Item>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Form.Item
                                                name="expiryDate"
                                                label="Expiry Date"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input placeholder="MM/YY" />
                                            </Form.Item>
                                            <Form.Item
                                                name="cvv"
                                                label="CVV"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input placeholder="123" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={loading}
                                className="w-full bg-[#0F172A] hover:bg-[#1E293B] h-12 text-lg"
                            >
                                {loading ? 'Processing...' : `Place Order - Rs: ${total.toFixed(2)}`}
                            </Button>
                        </Form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card title="Order Summary" className="shadow-sm sticky top-4">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        <img
                                            src={`http://localhost:5000${item.images[0]}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <div className="text-sm text-gray-500">
                                                Size: {item.selectedSize || item.sizes[0]} | Qty: {item.quantity || 1}
                                            </div>
                                            <div className="font-medium">
                                                Rs: {(item.price * (item.quantity || 1)).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Divider />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>Rs: {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `Rs: ${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>Rs: {tax.toFixed(2)}</span>
                                    </div>
                                    <Divider />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>Rs: {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {subtotal > 100 && (
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-sm text-green-700 font-medium">
                                            🎉 You qualify for free shipping!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default CheckoutPage;