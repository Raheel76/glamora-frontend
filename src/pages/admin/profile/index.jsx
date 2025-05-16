import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import PhoneInput from 'react-phone-input-2';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';

const { Title, Text } = Typography;

const AdminProfileDesign = () => {
    const [form] = Form.useForm();
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    // Load profile data from localStorage on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('adminProfile');
        if (savedProfile) {
            const parsedProfile = JSON.parse(savedProfile);
            setProfileData(parsedProfile);
            setIsFormVisible(false);
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFinish = (values) => {
        if (!imageFile) {
            toast.error('Profile image is required');
            return;
        }

        if (!phone || phone.length < 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }

        const newProfileData = {
            firstName: values.firstName,
            lastName: values.lastName,
            mobileNumber: phone,
            address: values.address,
            image: image,
        };

        localStorage.setItem('adminProfile', JSON.stringify(newProfileData));
        setProfileData(newProfileData);
        toast.success('Profile saved successfully');
        setIsFormVisible(false);

        // Reset form and state
        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleEdit = () => {
        setIsFormVisible(true);
        // Pre-populate form with saved data
        if (profileData) {
            form.setFieldsValue({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                address: profileData.address,
            });
            setPhone(profileData.mobileNumber);
            setImage(profileData.image);
        }
    };

    const handleDelete = () => {
        localStorage.removeItem('adminProfile');
        setProfileData(null);
        setIsFormVisible(true);
        toast.success('Profile deleted successfully');
        // Reset form and state
        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-6">
            {isFormVisible ? (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Profile</h2>
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={image || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                    className="size-full object-cover"
                                />
                            </div>
                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
                            >
                                <Icon icon="mdi:camera" width="20" />
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="space-y-4"
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                            className="font-medium"
                        >
                            <Input
                                placeholder="Enter first name"
                                className="w-full px-3 py-2 rounded-lg border bg-[#ececec0a] border-gray-300 focus:outline-none focus:border-blue-600"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                            className="font-medium"
                        >
                            <Input
                                placeholder="Enter last name"
                                className="w-full px-3 py-2 rounded-lg border bg-[#ececec0a] border-gray-300 focus:outline-none focus:border-blue-600"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mobile Number"
                            name="mobileNumber"
                            rules={[{ required: true, message: 'Please enter mobile number' }]}
                            className="font-medium"
                        >
                            <PhoneInput
                                country={'pk'}
                                value={phone}
                                onChange={setPhone}
                                inputStyle={{
                                    width: '100%',
                                    padding: '8px 48px',
                                    borderRadius: '8px',
                                    border: '1px solid #d9d9d9',
                                    background: '#ececec0a',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please enter address' }]}
                            className="font-medium"
                        >
                            <Input.TextArea
                                placeholder="Enter address"
                                rows={4}
                                className="w-full px-3 py-2 rounded-lg border bg-[#ececec0a] border-gray-300 focus:outline-none focus:border-blue-600"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full h-10 text-base font-medium rounded-md bg-blue-500 hover:bg-blue-600"
                            >
                                Save Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <Card
                    title={<Title level={3}>Admin Profile</Title>}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                    extra={
                        <Space>
                            <Button
                                type="text"
                                icon={<Icon icon="mdi:pencil" style={{ fontSize: '20px' }} />}
                                onClick={handleEdit}
                            />
                            <Button
                                type="text"
                                icon={<Icon icon="mdi:delete" style={{ fontSize: '20px', color: 'red' }} />}
                                onClick={handleDelete}
                            />
                        </Space>
                    }
                >
                    <div className="flex justify-center mb-4">
                        <img
                            src={profileData?.image || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                    <p><Text strong>First Name: </Text>{profileData?.firstName}</p>
                    <p><Text strong>Last Name: </Text>{profileData?.lastName}</p>
                    <p><Text strong>Mobile Number: </Text>{profileData?.mobileNumber}</p>
                    <p><Text strong>Address: </Text>{profileData?.address}</p>
                </Card>
            )}
        </div>
    );
};

export default AdminProfileDesign;