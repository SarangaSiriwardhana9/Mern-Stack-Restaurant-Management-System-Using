import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  if (!category) {
    return null;
  }

  return (
    <div className='bg-white rounded-lg shadow-md'>
      <Link to={`/categories/${category._id}`}>
        <div className='h-40 bg-gray-200 rounded-t-lg flex items-center justify-center'>
          <h2 className='text-lg font-medium'>{category.name}</h2>
        </div>
      </Link>
      <div className='p-3'>
        <Link
          to={`/categories/edit/${category._id}`}
          className='bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-2 rounded-lg shadow-md'
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Category;
