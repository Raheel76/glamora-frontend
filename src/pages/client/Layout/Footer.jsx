import React from 'react';
import { Layout, Row, Col, Input, Button, Divider } from 'antd';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  
  return (
    <AntFooter className="bg-gray-900 text-white p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated with Our Latest Offers</h2>
            <p className="text-blue-100 mb-6">Subscribe to our newsletter and get 10% off your first order!</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                prefix={<Mail size={16} />}
                className="flex-1"
                size="large"
              />
              <Button
                type="primary"
                size="large"
                icon={<Send size={16} />}
                className="bg-white text-blue-600 hover:bg-gray-100 border-0"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Row gutter={[48, 24]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Link to="/" className="block">
                <img 
                  src="/assets/glamLogo.png" 
                  alt="Glam Logo" 
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-300 leading-relaxed">
                Your ultimate destination for fashion-forward clothing. We bring you the latest trends 
                with premium quality and affordable prices.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="text-sm">17 J3, Johar Town, Lahore</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-400" />
                  <span className="text-sm">+923012903147</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-sm">support@glamfashion.com</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/men" className="text-gray-300 hover:text-white transition-colors">
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link to="/women" className="text-gray-300 hover:text-white transition-colors">
                    Women's Collection
                  </Link>
                </li>
                {/* <li>
                  <Link to="/kids" className="text-gray-300 hover:text-white transition-colors">
                    Kids Collection
                  </Link>
                </li> */}
                <li>
                  <Link to="/my-orders" className="text-gray-300 hover:text-white transition-colors">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* About */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Social Media & App */}
          <Col xs={12} sm={6} lg={6}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.x.com/"
                  className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
              
              <div className="space-y-3 mt-6">
                <h4 className="font-medium text-white">Download Our App</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/270px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/270px-Download_on_the_App_Store_Badge.svg.png"
                    alt="App Store"
                    className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 Glam Fashion. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;