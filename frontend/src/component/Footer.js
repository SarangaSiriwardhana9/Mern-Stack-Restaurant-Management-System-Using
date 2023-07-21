import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-300 py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/3'>
            <h4 className='text-lg font-semibold mb-4'>About Us</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              eleifend, ex at gravida posuere, ipsum mi accumsan velit, vel
              efficitur nisi mauris vel lorem.
            </p>
          </div>
          <div className='w-full md:w-1/3'>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/'
                  className='hover:text-gray-400 transition-colors duration-300'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/menu'
                  className='hover:text-gray-400 transition-colors duration-300'
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='hover:text-gray-400 transition-colors duration-300'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='hover:text-gray-400 transition-colors duration-300'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/3'>
            <h4 className='text-lg font-semibold mb-4'>Follow Us</h4>
            <div className='flex space-x-4'>
              <a
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-gray-400 transition-colors duration-300'
              >
                <FaFacebook />
              </a>
              <a
                href='https://www.twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-gray-400 transition-colors duration-300'
              >
                <FaTwitter />
              </a>
              <a
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-gray-400 transition-colors duration-300'
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-500'>
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
