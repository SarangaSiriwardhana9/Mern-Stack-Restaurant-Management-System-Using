import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successful");
    window.localStorage.removeItem("isLoggedIn");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-slate-300 shadow-md'>
      <div className='container mx-auto px-4 py-2'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/'>
            <div className='h-12'>
              <img src={logo} alt='Logo' className='h-full' />
            </div>
          </Link>

          <div className='flex items-center gap-4 md:gap-7'>
            <nav className='hidden md:flex gap-6 text-lg'>
              <Link
                to='/'
                className='text-gray-800 hover:text-blue-500 transition-colors duration-300'
              >
                Home
              </Link>
              <Link
                to='/menu/63f0fdbb3bcc2f97fa53d25d'
                className='text-gray-800 hover:text-blue-500 transition-colors duration-300'
              >
                Menu
              </Link>
              <Link
                to='/about'
                className='text-gray-800 hover:text-blue-500 transition-colors duration-300'
              >
                About
              </Link>
              <Link
                to='/contact'
                className='text-gray-800 hover:text-blue-500 transition-colors duration-300'
              >
                Contact
              </Link>
            </nav>
            <div className='text-2xl text-slate-600 relative'>
              <Link to='/cart'>
                <BsCartFill />
                <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
                  {cartItemNumber.length}
                </div>
              </Link>
            </div>
            <div className='text-slate-600' onClick={handleShowMenu}>
              <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden shadow-md'>
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt='User'
                    className='h-full w-full'
                  />
                ) : (
                  <HiOutlineUserCircle />
                )}
              </div>
              {showMenu && (
                <div className='absolute right-2 bg-white py-2 shadow-lg flex flex-col min-w-[120px] text-center'>
                  {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <>
                      <Link
                        to='/newproduct'
                        className='whitespace-nowrap cursor-pointer px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                      >
                        New product
                      </Link>
                      <Link
                        to='/EmpDash'
                        className='whitespace-nowrap cursor-pointer bg-blue-400 px-2 py-1 text-white transition-colors duration-300'
                      >
                        Admin Dashboard
                      </Link>
                    </>
                  )}

                  {userData.image ? (
                    <>
                      <Link
                        to='/userProfile'
                        className='whitespace-nowrap cursor-pointer bg-blue-400 px-2 py-1 text-white transition-colors duration-300'
                      >
                        Profile
                      </Link>
                      <p
                        className='cursor-pointer text-white px-2 bg-red-500 py-1 mt-2'
                        onClick={handleLogout}
                      >
                        Logout ({userData.firstName})
                      </p>
                    </>
                  ) : (
                    <Link
                      to='/login'
                      className='whitespace-nowrap cursor-pointer px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    >
                      Login
                    </Link>
                  )}
                  <nav className='flex flex-col md:hidden'>
                    <Link
                      to='/'
                      className='px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    >
                      Home
                    </Link>
                    <Link
                      to='/menu/63f0fdbb3bcc2f97fa53d25d'
                      className='px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    >
                      Menu
                    </Link>
                    <Link
                      to='/about'
                      className='px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    >
                      About
                    </Link>
                    <Link
                      to='/contact'
                      className='px-2 py-1 text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
