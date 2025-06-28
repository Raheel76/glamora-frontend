import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge, Dropdown, Space, Spin } from 'antd'
import axios from 'axios';
import { Bell, Heart, Mail, ShoppingBag, User, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { StoreUse } from '../../../components';
import { AuthContext } from '../../../routes/AuthProvider';

const Header = () => {
  const { cart, favorites, setCartOpen, setWishlistOpen, notifications, setNotificationOpen, fetchNotifications } = StoreUse();
  const { isAuthenticated, userRole, userEmail } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Navigation categories data
  const navCategories =[
    {
      name: 'Men',
      path: '/men',
      items: [
        {
          label: 'All',
          key: 'all',
          path: '/men',
          onClick: () => navigate('/men')
        },
        {
          label: 'Shirts',
          key: 'men-shirts',
          path: '/men/shirts',
          onClick: () => navigate('/men/shirts')
        },
        {
          label: 'Pants',
          key: 'men-pants',
          path: '/men/pants',
          onClick: () => navigate('/men/pants')
        },
        {
          label: 'Shoes',
          key: 'men-shoes',
          path: '/men/shoes',
          onClick: () => navigate('/men/shoes')
        },
      ]
    },
    {
      name: 'Women',
      path: '/women',
      items: [
        {
          label: 'All',
          key: 'all',
          path: '/women',
          onClick: () => navigate('/women')
        },
        {
          label: 'Shirts',
          key: 'women-dresses',
          path: '/women/shirts',
          onClick: () => navigate('/women/shirts')
        },
        {
          label: 'Pants',
          key: 'women-pants',
          path: '/women/pants',
          onClick: () => navigate('/women/pants')
        },
        {
          label: 'Shoes',
          key: 'women-shoes',
          path: '/women/shoes',
          onClick: () => navigate('/women/shoes')
        }
      ]
    },
    // {
    //   name: 'Kids',
    //   path: '/kids',
    //   items: [
    //     {
    //       label: 'Boys',
    //       key: 'kids-boys',
    //       path: '/kids/boys',
    //       onClick: () => navigate('/kids/boys')
    //     },
    //     {
    //       label: 'Girls',
    //       key: 'kids-girls',
    //       path: '/kids/girls',
    //       onClick: () => navigate('/kids/girls')
    //     },
    //     {
    //       label: 'Toys',
    //       key: 'kids-toys',
    //       path: '/kids/toys',
    //       onClick: () => navigate('/kids/toys')
    //     },
    //     {
    //       label: 'Accessories',
    //       key: 'kids-accessories',
    //       path: '/kids/accessories',
    //       onClick: () => navigate('/kids/accessories')
    //     }
    //   ]
    // }
  ];

  const profileItems =  userRole === 'admin' ? [
    {
      key: '1',
      label: userEmail,
      disabled: true,
    },
    {
      key: '2',
      label: <Link to="/admin">Back to Admin Dashboard</Link>,
    },
    {
      key: '4',
      label: <span className='text-red-600'>Logout</span>,
      icon: <X size={20} className='text-red-600' />,
      onClick: handleLogout,
    },
  ] : [
    {
      key: '1',
      label: <span>{profile?.email}</span>,
      icon: <Mail size={20} />,
    },
    {
      key: '2',
      label: 'My Orders',
      icon: <ShoppingBag size={20} />,
      onClick: () => navigate('/my-orders')
    },
    {
      key: '3',
      label: 'Profile',
      icon: <User size={20} />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'wallet',
      label: 'My Wallet',
      icon: <Icon icon="icon-park-outline:wallet" width="20" />,
      onClick: () => navigate('/wallet')
    },
    {
      key: '4',
      label: <span className='text-red-600'>Logout</span>,
      icon: <X size={20} className='text-red-600' />,
      onClick: handleLogout,
    },

  ];
  const unreadNotifications = Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0;

  // Check which category is active based on current route
  const isCategoryActive = (categoryPath) => {
    return location.pathname.startsWith(categoryPath);
  };

  // Check which dropdown item is active
  const isDropdownItemActive = (itemPath) => {
    return location.pathname === itemPath;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch profile
        const profileResponse = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(profileResponse.data.profile);

        // Fetch notifications
        await fetchNotifications(); // Call fetchNotifications from StoreUse
      } catch (error) {
        console.error('Error fetching data:', error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, [fetchNotifications]);

  return (
    <div className="flex justify-between items-center h-20 px-8 shadow-lg fixed w-full top-0 z-50 bg-[#0f172a]">
      <Link to='/' className="w-[160px] h-14">
        <img src="/assets/glamLogo.png" alt="header logo" className='size-full' />
      </Link>

      <div className="flex items-center gap-6">
        {navCategories.map((category) => (
          <Dropdown
            key={category.name}
            menu={{
              items: category.items.map(item => ({
                ...item,
                label: (
                  <span className={`${isDropdownItemActive(item.path) ? 'text-[#FF6B6B] font-medium' : ''}`}>
                    {item.label}
                  </span>
                ),
                className: isDropdownItemActive(item.path) ? 'bg-gray-100' : ''
              }))
            }}
            placement="bottom"
            trigger={['hover']}
            onOpenChange={(open) => setActiveDropdown(open ? category.name : null)}
          >
            <div
              className={`flex items-center cursor-pointer ${isCategoryActive(category.path) || activeDropdown === category.name
                ? 'text-[#FF6B6B] font-semibold'
                : 'text-white '
                }`}
            >
              <Space>
                {category.name}
                <Icon
                  icon="ant-design:down-outlined"
                  className={`text-xs ${isCategoryActive(category.path) || activeDropdown === category.name
                    ? 'text-[#FF6B6B]'
                    : ''
                    }`}
                />
              </Space>
            </div>
          </Dropdown>
        ))}
      </div>

      <div className="flex items-center relative gap-3">
        {loading ? (
          <Spin />
        ) : (
          <>
          {isAuthenticated && (
              <Dropdown menu={{ items: profileItems }} trigger={['hover']}>
                <div onClick={(e) => e.preventDefault()} className='flex items-center gap-3 cursor-pointer'>
                  <div className="flex items-center gap-2">
                    <div className='w-10 overflow-hidden h-10'>
                      <img
                        src={profile?.profileImage ?
                          `http://localhost:5000${profile.profileImage}` :
                          "/img/default-profile.png"
                        }
                        alt="Profile"
                        className="object-cover size-full rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-white font-medium">
                        {`${profile?.firstName} ${profile?.lastName}`}
                      </span>
                    </div>
                  </div>
                  <Icon icon="ant-design:down-outlined" className=' text-white' />
                </div>
              </Dropdown>
            )}
            {isAuthenticated && userRole === 'user' && (
              <>
                <div className="flex items-center gap-4">
                  <Badge count={unreadNotifications} size="small">
                    <Bell
                      onClick={() => setNotificationOpen(true)}
                      className="w-6 h-6 text-white cursor-pointer hover:text-[#FF6B6B]"
                    />
                  </Badge>
                  <Badge count={favorites.length} size="small">
                    <Heart onClick={() => setWishlistOpen(true)} className="w-6 h-6 text-white cursor-pointer" />
                  </Badge>

                  <Badge count={cart.length} size="small">
                    <ShoppingBag
                      className="w-6 h-6 text-white cursor-pointer"
                      onClick={() => setCartOpen(true)}
                    />
                  </Badge>
                </div>
              </>
            )}
            
          </>
        )}


      </div>
    </div>
  )
}

export default Header;