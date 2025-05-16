import { Form, Input, Button, Card } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import PhoneInput from 'react-phone-input-2';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';

const AdminProfileDesign = () => {
    const [form] = Form.useForm();
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [profileData, setProfileData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

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
        if (!imageFile && !profileData?.image) {
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
            image: image || profileData?.image,
        };


        localStorage.setItem('adminProfile', JSON.stringify(newProfileData));
        setProfileData(newProfileData)
        setIsFormVisible(false)
        setIsEditing(false)
        toast.success('Profile saved successfully');

        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }

    };


    useEffect(() => {
        const savedProfile = localStorage.getItem('adminProfile')
        if (savedProfile) {
            const parseProfile = JSON.parse(savedProfile)
            setProfileData(parseProfile)
            setIsFormVisible(false)
        }

    }, [])


    const handleEdit = () => {
        setIsEditing(true)
        setIsFormVisible(true)

        if (profileData) {
            form.setFieldsValue({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                address: profileData.address
            })
            setPhone(profileData.mobileNumber || '')
            setImage(profileData.image || null)
        }
    }

    const handleDelete = () => {
        localStorage.removeItem('adminProfile');
        setProfileData(null);
        setIsFormVisible(true);
        setIsEditing(false);
        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Profile deleted successfully');
    };


    const handleCancel = () => {
        setIsFormVisible(false)
        setIsEditing(false)
        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <>
            {isFormVisible ? (
                <>
                    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Profile</h2>
                        <div className="flex justify-center mb-6">
                            <div className="relative w-32 h-32">
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer w-32 h-32 rounded-full bg-gray-100 overflow-hidden  block"
                                >
                                    <img
                                        src={image || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="size-full object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 z-[11111] bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
                                        <Icon icon="mdi:camera" width="20" />
                                    </div>
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
                                // remove name here
                                rules={[
                                    { required: true, message: 'Please enter mobile number' },
                                    {
                                        validator: (_, value) =>
                                            phone && phone.length >= 10 ? Promise.resolve() : Promise.reject('Please enter a valid mobile number'),
                                    },
                                ]}
                                className="font-medium"
                            >
                                <PhoneInput
                                    country={'pk'}
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
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
                                <div className="flex gap-3">

                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full h-10 text-base font-medium rounded-md bg-blue-500 hover:bg-blue-600"
                                    >
                                        {isEditing ? 'Update Profile' : 'Save Profile'}
                                    </Button>
                                    {isEditing && (
                                        <Button
                                            htmlType="submit"
                                            className="w-full h-10 text-base !text-white font-medium rounded-md !bg-gray-500 hover:!bg-gray-600"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </Form.Item>
                        </Form>
                    </div>

                </>
            ) : (
                <Card
                    title={
                        <h2 className="text-2xl font-bold text-gray-800 ">Admin Profile</h2>
                    }
                    extra={
                        <div className="flex gap-4">
                            <Icon
                                icon="mdi:edit"
                                width="24"
                                className="cursor-pointer text-blue-500 hover:text-blue-600"
                                onClick={handleEdit}
                            />
                            <Icon
                                icon="mdi:delete"
                                width="24"
                                className="cursor-pointer text-red-500 hover:text-red-600"
                                onClick={handleDelete}
                            />
                        </div>
                    }
                    className="p-6 !bg-white rounded-lg shadow-md !max-w-2xl mx-auto mt-6"
                >
                    <div className="flex flex-col ">
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                    src={profileData?.image || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <p><strong>First Name:</strong> {profileData?.firstName}</p>
                            <p><strong>Last Name:</strong> {profileData?.lastName}</p>
                            <p><strong>Mobile Number:</strong>{profileData?.mobileNumber}</p>
                            <p><strong>Address:</strong> {profileData?.address} </p>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
};

export default AdminProfileDesign;