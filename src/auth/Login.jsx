import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Col, Row, Spin, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {

      const response = await axios.post('http://localhost:5000/api/auth/login', formData)

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      localStorage.setItem('token', response.data.token)

      toast.success(response.data.message)
      console.log(response.data.user);

      navigate('/')


    } catch (error) {
      const errorMessage = error.response.data.message || 'Error during login'
      console.log(error.response.data)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  };



  return (
    <>
      <Row align={'middle'} >
        <Col xs={24} md={12}>
          <div className="w-full h-[100vh] ">
            <img src="/assets/photo-1733324961705-97bd6cd7f4ba.png" alt="auth-img" className='size-full object-cover' />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="flex justify-center items-center bg-[#d6d6d6] flex-column h-[100vh]">

            <div className="border md:w-3/4 xxl:w-[60%] p-6 bg-[#f5f5f5] rounded-2xl shadow-2xl">
              <div className="flex justify-center mb-6 text-[#29a9ee]  items-center gap-2">
                <h6 className="text-center text-2xl mb-0 font-bold ">Log in</h6>
                <div className="flex text-[32px]  items-center">
                  <Icon icon="hugeicons:login-method" />
                </div>
              </div>
              <form onSubmit={handleSubmit}>

                <div className="mb-6">
                  <h6 className="font-medium mb-1">Email</h6>
                  <input
                    type="email"
                    name="email"
                    placeholder="email address"
                    className="w-full px-3 py-2 rounded-md border bg-[#e6e7e7] border-gray-300 focus:outline-none focus:border-blue-600"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-6">
                  <h6 className="font-medium mb-1">Password</h6>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-[#e6e7e7] focus:outline-none focus:border-blue-600"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <Button
                  htmlType="submit"
                  className="text-base rounded-xl font-medium w-full h-10 bg-[#44b1ec] border-none hover:!bg-[#42a4d8] !text-white "
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Log in"}
                </Button>
              </form>
              <p className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="font-medium text-blue-600">
                  Signup
                </Link>
              </p>
              <div className="flex justify-center mt-4">
                <Link to="/auth/forgot" className="font-medium text-center text-blue-600">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Login



