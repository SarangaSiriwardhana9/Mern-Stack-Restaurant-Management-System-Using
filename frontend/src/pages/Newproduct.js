import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };
  return (
    <div className='p-4'>
      <form
        className='m-auto w-full max-w-md shadow-md flex flex-col p-3 bg-white rounded-lg'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='name'
          className='text-sm font-medium text-gray-700 mb-1'
        >
          Name
        </label>
        <input
          type='text'
          name='name'
          className='bg-gray-200 p-2 rounded-lg mb-4'
          onChange={handleOnChange}
          value={data.name}
          required
        />

        <label
          htmlFor='category'
          className='text-sm font-medium text-gray-700 mb-1'
        >
          Category
        </label>
        <select
          className='bg-gray-200 p-2 rounded-lg mb-4 outline-none'
          required
          id='category'
          name='category'
          onChange={handleOnChange}
          value={data.category}
        >
          <option value='other'>Select category</option>
          <option value='Kottu'>Kottu</option>
          <option value='Rice'>Rice</option>
          <option value='Burgers'>Burgers</option>
          <option value='Noodles'>Noodles</option>
          <option value='Pizza'>Pizza</option>
          <option value='Cake'>Cake</option>
          <option value='HotDeals'>HotDeals</option>
          <option value='AddtoHome'>AddtoHome</option>
        </select>

        <label
          htmlFor='image'
          className='text-sm font-medium text-gray-700 mb-1'
        >
          Image
          <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer '>
            {data.image ? (
              <img src={data.image} className='h-full' />
            ) : (
              <span className='text-5xl'>
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept='image/*'
              id='image'
              onChange={uploadImage}
              className='hidden'
              required
            />
          </div>
        </label>

        <label
          htmlFor='price'
          className='text-sm font-medium text-gray-700 mb-1'
        >
          Price
        </label>
        <input
          type='text'
          name='price'
          className='bg-gray-200 p-2 rounded-lg mb-4'
          onChange={handleOnChange}
          value={data.price}
          required
        />

        <label
          htmlFor='description'
          className='text-sm font-medium text-gray-700 mb-1'
        >
          Description
        </label>
        <textarea
          rows={2}
          value={data.description}
          className='bg-gray-200 p-2 rounded-lg mb-4 resize-none'
          name='description'
          onChange={handleOnChange}
          required
        ></textarea>

        <button className='bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-2 rounded-lg shadow-md'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
