import { Button } from 'antd'
import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      navigate('/auth/login');

    } catch (error) {
      toast.error('Error during logout');
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-end items-center h-20 px-8 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-2">
          <div>
            <img src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="header logo" className='w-10 h-10 object-fit-cover rounded-full' />
          </div>
          <span className='text-[14px] font-medium'>Admin</span>
       </div>
      </div>
    </>
  )
}

export default Header
