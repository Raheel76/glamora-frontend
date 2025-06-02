import { Button } from 'antd'
import axios from 'axios';
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const Sidebar = () => {
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
            <div className="md:flex hidden flex-col w-[200px] py-4 justify-between bg-[#0f172a] min-h-screen ">
                <div>
                    <div className="flex items-center justify-center">
                        <Link to='' className="w-[160px] h-14">
                            <img src="/assets/glamLogo.png" alt="header logo" className='size-full' />
                        </Link>
                    </div>
                    {/* --------nav links--------- */}
                    <div className="flex gap-3 my-6 nav-tab mx-3 flex-col">
                        <NavLink end to='/admin' className="py-2  px-4 bg-white flex items-center justify-between rounded-md shadow-md">
                            <span className=' text-[14px] font-medium '>Dashboard</span>
                            <iconify-icon icon="pajamas:dashboard" className='text-2xl'></iconify-icon>
                        </NavLink>
                        <NavLink to='/admin/men' className="py-2  px-4 bg-white flex items-center justify-between rounded-md shadow-md">
                            <span className=' text-[14px] font-medium '>Men</span>
                            <iconify-icon icon="icon-park-outline:men-jacket" className='text-2xl'></iconify-icon>
                        </NavLink>
                        <NavLink to='/admin/women' className="py-2  px-4 bg-white flex items-center justify-between rounded-md shadow-md">
                            <span className=' text-[14px] font-medium '>Women</span>
                            <iconify-icon icon="icon-park-outline:women" className='text-2xl'></iconify-icon>
                        </NavLink>
                        <NavLink to='/admin/kids' className="py-2  px-4 bg-white flex items-center justify-between rounded-md shadow-md">
                            <span className=' text-[14px] font-medium '>Kids</span>
                            <iconify-icon icon="hugeicons:kid" className='text-2xl'></iconify-icon>
                        </NavLink>
                        <NavLink to='/admin/profile' className="py-2  px-4 bg-white flex items-center justify-between rounded-md shadow-md">
                            <span className=' text-[14px] font-medium '>Profile</span>
                            <iconify-icon icon="carbon:user-profile"  className='text-2xl'></iconify-icon>
                        </NavLink>
                    </div>

                </div>
                <div className="flex mx-6 flex-col">
                    <Button className="!bg-red-700 px-4 py-5 !rounded-[24px] hover:!bg-red-600 border-none !text-white cursor-pointer" onClick={handleLogout}>
                        <iconify-icon icon="line-md:logout" className="text-2xl"></iconify-icon>
                        <span className="ml-1 font-bold">Log out</span>
                    </Button>                </div>
            </div>
        </>
    )
}

export default Sidebar
