import React, { useState, useEffect } from "react";
import Category from "./Category";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/categories`
      );
      const data = await res.json();
      setCategories(data);
    };

    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
