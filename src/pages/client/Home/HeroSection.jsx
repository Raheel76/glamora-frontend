import { Button } from 'antd'
import { Heart, ShoppingBag } from 'lucide-react'
import React from 'react'
import { StoreUse } from '../../../components';

const HeroSection = ({handleShopNowClick}) => {
  const { setWishlistOpen } = StoreUse();

    return (
        <>
            <section
                className="relative h-[60vh] hero-img flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black bg-opacity-10 z-10" />
                <div className="relative z-20 text-center flex flex-col justify-center items-center w-full h-full px-4">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Fashion That Defines
                        <span className="text-[#0f172a] block">Your Style</span>
                    </h1>
                    <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow">
                        Discover the latest trends in fashion with our curated collection of premium clothing for men, women, and kids.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-[#0F172A] hover:bg-[#1E293B] h-12 px-8 text-lg"
                            icon={<ShoppingBag size={20} />}
                            onClick={handleShopNowClick}
                        >
                            Shop Now
                        </Button>
                        <Button
                            size="large"
                            className="h-12 px-8 text-lg border-2 border-gray-300 hover:border-[#FF6B6B] hover:text-[#FF6B6B] bg-white bg-opacity-80 text-gray-900"
                            icon={<Heart size={20} />}
                            onClick={() => setWishlistOpen(true)}
                        >
                            View Wishlist
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
