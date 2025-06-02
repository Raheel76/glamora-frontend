import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Divider, Radio, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StoreUse } from '../../../components';

const { Content } = Layout;
const { Option } = Select;

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart } = StoreUse();
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        const itemPrice = item.onSale ? item.salePrice : item.price;
        return sum + itemPrice * (item.quantity || 1);
    }, 0);

    const shipping = 10.00;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const handleSubmit = (values) => {
        console.log('Form values:', { ...values, paymentMethod });
        // Handle checkout logic here
        navigate('/order-confirmation');
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Content className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                            className="space-y-6"
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
                                            {/* Add more states */}
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
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                                </div>
                                            </div>
                                        </Radio>
                                        <Radio value="paypal" className="w-full">
                                            <div className="flex justify-between items-center w-full">
                                                <span>PayPal</span>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-6" />
                                            </div>
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
                        </Form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card title="Order Summary" className="shadow-sm">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-medium">{item.title}</h4>
                                            <div className="text-sm text-gray-500">
                                                Size: {item.sizes[0]} | Qty: {item.quantity || 1}
                                            </div>
                                            <div className="font-medium">
                                                ${((item.onSale ? item.salePrice : item.price) * (item.quantity || 1)).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Divider />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Divider />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    onClick={() => document.querySelector('form').submit()}
                                    className="bg-[#0F172A] hover:bg-[#1E293B] h-12 text-lg mt-4"
                                >
                                    Place Order
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default CheckoutPage;