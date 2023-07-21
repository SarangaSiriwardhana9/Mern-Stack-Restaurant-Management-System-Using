import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "../component/CardFeature";
import AllProduct from "../component/AllProduct";
import delivery from "../images/delivery.png";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListHotDeals = productData.filter(
    (el) => el.category === "HotDeals"
  );
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className='p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex items-center bg-slate-300 w-36 px-2 py-1 rounded-full'>
            <p className='text-sm font-medium text-slate-900'>
              Fastest Delivery
            </p>
            <img src={delivery} className='h-6 ml-2' alt='Delivery' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>
            HOT, FRESH, AND DELIVERED TO YOUR DOOR{" "}
            <span className='text-red-600'>YOUR DOOR</span>
          </h2>
          <p className='py-3 text-base text-black-400'>
            Welcome to Nugasewana, the home of authentic Sri Lankan cuisine in
            Colombo. Our restaurant has been serving delicious meals since 2019,
            using only the freshest ingredients and traditional cooking methods.
            From traditional rice and curry dishes to fusion creations, we have
            something for everyone to enjoy. Whether you dine in or order
            delivery to your doorstep, our friendly staff are committed to
            providing exceptional service. Discover the flavors of Sri Lanka
            today at Nugasewana.
          </p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>
            Order Now
          </button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {/* Add your additional content here */}
        </div>
      </div>

      <div>
        <div className='flex w-full my-5 items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>Hot Deals</h2>
          <div className='ml-auto flex gap-4'>
            <button
              onClick={preveProduct}
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div className='flex gap-5 overflow-x-auto'>
          {homeProductCartListHotDeals[0]
            ? homeProductCartListHotDeals.map((el) => (
                <CardFeature
                  key={el._id + "HotDeals"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              ))
            : loadingArrayFeature.map((_, index) => (
                <CardFeature loading='Loading...' key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading='Your Product' />
    </div>
  );
};

export default Home;
