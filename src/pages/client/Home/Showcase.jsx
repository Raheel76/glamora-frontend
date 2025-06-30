import React from 'react'
import { Link } from 'react-router'

const Showcase = () => {
  return (
    <>
       <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 md:mb-12 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/men" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Men's Fashion"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                  <p className="text-gray-200">Shirts, Pants & More</p>
                </div>
              </div>
            </Link>

            {/* Women's Category */}
            <Link to='/women' className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Women's Fashion"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                  <p className="text-gray-200">Shirts, Pants & More</p>
                </div>
              </div>
            </Link>

            {/* Kids Category */}
            {/* <Link to='/kids' className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Kids Fashion"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Kids Collection</h3>
                  <p className="text-gray-200">Boys, Girls & Toys</p>
                </div>
              </div>
            </Link> */}
          </div>
        </div>
    </>
  )
}

export default Showcase
