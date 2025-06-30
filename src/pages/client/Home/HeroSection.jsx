import { Button } from 'antd'
import { Heart, ShoppingBag } from 'lucide-react'
import React, { useContext } from 'react'
import { StoreUse } from '../../../components';
import { AuthContext } from '../../../routes/AuthProvider';

const HeroSection = ({ handleShopNowClick }) => {

    const { userRole } = useContext(AuthContext)
    const { setWishlistOpen } = StoreUse();

    return (
        <>
            <section
                className="relative  hero-img flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
                <div className="relative z-20 text-center flex flex-col justify-center items-center w-full h-full px-4">
                    <h1 className="md:text-4xl xs:text-3xl font-bold text-white md:mb-6 mb-4 drop-shadow-lg">
                        Fashion That Defines
                        <span className="text-[#0f172a] block">Your Style</span>
                    </h1>
                    <p className="text-xl xs:text-[14px] xs:leading-none text-gray-100 md:mb-8 mb-6 max-w-3xl mx-auto drop-shadow">
                        Discover the latest trends in fashion with our curated collection of premium clothing for men, women, and kids.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-[#0F172A] hover:bg-[#1E293B] h-12 px-8 text-lg"
                            icon={<ShoppingBag size={20} />}
                            onClick={handleShopNowClick}
                        >
                            Shop Now
                        </Button>
                        {userRole === 'user' && (
                            <Button
                                size="large"
                                className="h-12 px-8 text-lg border-2 border-gray-300 hover:border-[#FF6B6B] hover:text-[#FF6B6B] bg-white bg-opacity-80 text-gray-900"
                                icon={<Heart size={20} />}
                                onClick={() => setWishlistOpen(true)}
                            >
                                View Wishlist
                            </Button>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
