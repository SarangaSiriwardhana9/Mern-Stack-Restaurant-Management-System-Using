import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { firstName, lastName, email, image } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
    window.localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className='max-w-md mx-auto mt-16 bg-white rounded-xl shadow-md  overflow-hidden'>
      <h2 className='text-3xl font-bold text-gray-900 p-8 text-center  '>
        My Profile
      </h2>
      <div className='flex justify-center items-center border-t border-b border-gray-300 py-6 px-8'>
        <div className='mr-8'>
          <img
            className='h-32 w-32 object-cover rounded-full'
            src={image}
            alt={`${firstName} ${lastName}`}
          />
        </div>
        <div className='w-2/3'>
          <div className='mb-4'>
            <label
              htmlFor='first-name'
              className='block mb-2 font-bold text-gray-800 text-xl'
            >
              First Name
            </label>
            <span
              id='first-name'
              className='block text-gray-900 font-semibold text-lg'
            >
              {firstName}
            </span>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='last-name'
              className='block mb-2 font-bold text-gray-800 text-xl'
            >
              Last Name
            </label>
            <span
              id='last-name'
              className='block text-gray-900 font-semibold text-lg'
            >
              {lastName}
            </span>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block mb-2 font-bold text-gray-800 text-xl'
            >
              Email
            </label>
            <a
              href={`mailto:${email}`}
              className='text-indigo-600 hover:text-indigo-500 underline text-lg'
            >
              {email}
            </a>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center py-4 px-8'>
        <button className='bg-blue-500 w-40 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2'>
          Update Profile
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 w-40 text-white font-bold h-8 py-1 px-3 rounded focus:outline-none focus:shadow-outline'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className='flex justify-center items-center py-4 px-8'>
        <button className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
