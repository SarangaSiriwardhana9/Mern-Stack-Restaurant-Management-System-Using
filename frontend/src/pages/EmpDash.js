import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmpDash = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='bg-gray-800 shadow py-4'>
        <div className='container mx-auto px-4'>
          <h1 className='text-white text-center text-2xl font-bold'>
            Employee Dashboard
          </h1>
        </div>
      </div>

      <div className='flex-grow container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Link to='/employee-management'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Employee Management
            </button>
          </Link>

          <Link to='/UserData'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Customer Management
            </button>
          </Link>

          <div className='relative'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'
              onClick={toggleMenu}
            >
              Event Management
            </button>

            <ul
              className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50 ${
                showMenu ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to='/AddNewEvent'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  Add New Event
                </Link>
              </li>

              <li>
                <Link
                  to='/EventData'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  View Event Data
                </Link>
              </li>
            </ul>
          </div>

          <Link to='/Newproduct'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Menue Management
            </button>
          </Link>

          <Link to='/order-management'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Order Management
            </button>
          </Link>

          <Link to='/supplier-management'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Supplier Management
            </button>
          </Link>

          <Link to='/financial-management'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full'>
              Financial Management
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmpDash;
