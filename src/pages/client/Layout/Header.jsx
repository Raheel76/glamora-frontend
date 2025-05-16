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
      <div className="flex justify-between items-center h-20 px-8 shadow-md bg-[#FADADD] ">
        <Link to='' className="w-[160px] h-14">
          <img src="/assets/header logo.png" alt="header logo" className='size-full' />
        </Link>
        <div className="flex">
          <Button onClick={handleLogout} className='px-6 py-4 text-[14px] font-medium border-none bg-[#c31f1fc3] !text-white hover:!bg-[#b93a31] rounded-full '>Log out</Button>
        </div>
      </div>
    </>
  )
}

export default Header
