import { Heart, ShoppingBag, Star } from 'lucide-react'
import React from 'react'

const OurFeatures = () => {
    return (
        <>
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-gray-600">Free shipping on orders over Rs: 100</p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                            <p className="text-gray-600">Premium quality materials and craftsmanship</p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                            <p className="text-gray-600">30-day return policy for your peace of mind</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurFeatures
