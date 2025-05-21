import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, Spin } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const Header = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const items = [
    {
      key: '1',
      label: <span>{profile?.email}</span>,
      icon: <Icon icon="line-md:email" />,
    },
    {
      key: '2',
      label: 'Profile',
      icon: <Icon icon="iconamoon:profile" />,
      onClick: () => navigate('/profile')
    },
    {
      key: '3',
      label: <span className=' text-red-600'>Logout</span>,
      icon: <Icon icon="line-md:logout" className=' text-red-600' />,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data.profile);
        console.log('Profile data:', response.data.profile); // Debug
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center h-20 px-8 shadow-md bg-[#FADADD] ">
        <Link to='' className="w-[160px] h-14">
          <img src="/assets/header logo.png" alt="header logo" className='size-full' />
        </Link>
        <div className="flex items-center relative gap-3">
          <Dropdown menu={{ items }} className=''>
            <div onClick={e => e.preventDefault()} className=' flex items-center gap-3'>
              {loading ? (
                <Spin tip="Loading profile..." />
              ) : (
                <div className="flex items-center gap-2">
                  <div className='w-10 h-10'>
                    <img
                      src={profile?.profileImage ?
                        `http://localhost:5000${profile.profileImage}` :
                        "https://via.placeholder.com/40"
                      }

                      alt="Profile"
                      className=" object-cover size-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium">
                      {`${profile?.firstName}  ${profile?.lastName}`}
                    </span>
                  </div>

                </div>
              )}
              <Icon icon="ant-design:down-outlined" />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Header
