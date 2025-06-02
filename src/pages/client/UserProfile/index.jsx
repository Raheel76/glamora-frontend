import { Form, Input, Button, Card } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import PhoneInput from 'react-phone-input-2';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

const UserProfile = () => {
    const [form] = Form.useForm();
    const fileInputRef = useRef(null);
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const profile = response.data.profile;
                setProfileData(profile);
                setIsFormVisible(!profile.firstName);
            } catch (error) {
                console.error('Error fetching profile:', error.message);
                toast.error(error.response?.data?.message || 'Failed to fetch profile');
            }
        };
        fetchProfile();
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

    const onFinish = async (values) => {
        if (!imageFile && !profileData?.profileImage && !isEditing) {
            toast.error('Profile image is required');
            return;
        }

        if (!phone || phone.length < 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('mobileNumber', phone);
            formData.append('address', values.address);
            if (imageFile) {
                formData.append('profileImage', imageFile);
            }

            const response = await axios.put('http://localhost:5000/api/profile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProfileData(response.data.profile);
            setIsFormVisible(false);
            setIsEditing(false);
            toast.success(response.data.message);

            form.resetFields();
            setPhone('');
            setImage(null);
            setImageFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error saving profile:', error.message);
            toast.error(error.response?.data?.message || 'Failed to save profile');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsFormVisible(true);
        if (profileData) {
            form.setFieldsValue({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                address: profileData.address,
                mobileNumber: profileData.mobileNumber || '', // Sync form field
            });
            setPhone(profileData.mobileNumber || ''); // Sync PhoneInput
            setImage(profileData.profileImage ? `http://localhost:5000${profileData.profileImage}` : null);
            setImageFile(null);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete('http://localhost:5000/api/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
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
        } catch (error) {
            console.error('Error deleting profile:', error.message);
            toast.error(error.response?.data?.message || 'Failed to delete profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setIsEditing(false);
        form.resetFields();
        setPhone('');
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            {isFormVisible ? (
                <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Profile</h2>
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer w-32 h-32 rounded-full bg-gray-100 overflow-hidden block"
                            >
                                <img
                                    src={
                                        image ||
                                        (isEditing && profileData?.profileImage
                                            ? `http://localhost:5000${profileData.profileImage}`
                                            : 'https://via.placeholder.com/150')
                                    }
                                    alt="Profile"
                                    className="size-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
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
                        layout="vertical"
                        className="space-y-4"
                        form={form}
                        onFinish={onFinish}
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
                            rules={[
                                {
                                    validator: (_, value) =>
                                        phone && phone.length >= 10
                                            ? Promise.resolve()
                                            : Promise.reject('Please enter a valid mobile number'),
                                },
                            ]}
                            className="font-medium"
                        >
                            <PhoneInput
                                country={'pk'}
                                value={phone}
                                onChange={(value) => {
                                    setPhone(value);
                                    form.setFieldsValue({ mobileNumber: value }); // Sync with form
                                }}
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
                                    loading={loading}
                                >
                                    {isEditing ? 'Update Profile' : 'Save Profile'}
                                </Button>
                                {isEditing && (
                                    <Button
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
            ) : (
                <Card
                    title={<h2 className="text-2xl font-bold text-gray-800">User Profile</h2>}
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
                    className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-6"
                >
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                    src={
                                        profileData?.profileImage
                                            ? `http://localhost:5000${profileData.profileImage}`
                                            : 'https://via.placeholder.com/150'
                                    }
                                    alt="Profile"
                                    className="size-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <p>
                                <strong>First Name:</strong> {profileData?.firstName}
                            </p>
                            <p>
                                <strong>Last Name:</strong> {profileData?.lastName}
                            </p>
                            <p>
                                <strong>Mobile Number:</strong> {profileData?.mobileNumber}
                            </p>
                            <p>
                                <strong>Address:</strong> {profileData?.address}
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
};

export default UserProfile;