import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNewEvent = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState({
    name: "",
    image: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleStartTimeChange = (time) => {
    setStartDate(time);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleEndTimeChange = (time) => {
    setStartDate(time);
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, description } = data;
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();
    const startTimeISO = data.startTime
      ? new Date(`1970-01-01T${data.startTime}:00`).toISOString()
      : null; // convert start time to ISO string
    const endTimeISO = data.endTime
      ? new Date(`1970-01-01T${data.endTime}:00`).toISOString()
      : null; // convert end time to ISO string

    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMIN}/uploadEvent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
          startDate: startDateISO.split("T")[0], // extract only the date part from the ISO string
          startTime: startTimeISO
            ? startTimeISO.split("T")[1].slice(0, -1)
            : null, // extract only the time part from the ISO string
          endDate: endDateISO.split("T")[0], // extract only the date part from the ISO string
          endTime: endTimeISO ? endTimeISO.split("T")[1].slice(0, -1) : null, // extract only the time part from the ISO string
          description,
        }),
      }
    );

    const dataRes = await fetchData.json();
    console.log(dataRes);

    toast("Event Added Successfully");

    setData(() => {
      return {
        name: "",
        image: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: "",
      };
    });
  };

  return (
    <div className='max-w-md mx-auto  mt-10 bg-white rounded-lg shadow-lg w-600'>
      <div className='p-8 '>
        <h1 className='text-2xl font-bold text-gray-800 mb-10 text-center'>
          Add New Event
        </h1>
        <p className='text-gray-700 mb-10 text-center'>
          Today is : {new Date().toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='p-8 border-t border-gray-200'>
        <div className='space-y-8'>
          <div className='space-y-1'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <div className='mt-1'>
              <input
                required
                type='text'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                className='h-8 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md
                shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              />
            </div>
          </div>

          <div className='space-y-1'>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700'
            >
              Image
            </label>
            <div className='flex items-center space-x-12 '>
              {data.image ? (
                <img
                  src={data.image}
                  alt=''
                  className='w-40 h-40 object-cover rounded-full square'
                />
              ) : (
                <span className='w-20 h-20 flex items-center justify-center border border-gray-300 rounded-full'>
                  <BsCloudUpload className=' text-gray-400 w-8 h-8    shadow-sm ring-2 ring-gray-500 focus:ring-gray-700 focus:border-gray-700 block border-gray-300' />
                </span>
              )}

              <div>
                <input
                  required
                  type='file'
                  accept='image/*'
                  id='image'
                  onChange={uploadImage}
                  className='hidden'
                />
                <label
                  htmlFor='image'
                  className='inline-block px-4 py-2 leading-none text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                htmlFor='startDate'
                className='block text-sm font-medium text-gray-700 '
              >
                Start Date
              </label>
              <DatePicker
                required
                name='startDate'
                selected={startDate}
                onChange={handleStartDateChange}
                className='shadow-sm h-8 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              />
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='startTime'
                className='block text-sm font-medium text-gray-700'
              >
                Start Time
              </label>
              <input
                required
                type='time'
                name='startTime'
                value={data.startTime}
                onChange={handleOnChange}
                className='h-7 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              />
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='endDate'
                className='block text-sm font-medium text-gray-700'
              >
                End Date
              </label>
              <DatePicker
                required
                name='endDate'
                selected={endDate}
                onChange={handleEndDateChange}
                className='h-8 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md
                shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              />
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='endTime'
                className='block text-sm font-medium text-gray-700'
              >
                End Time
              </label>
              <input
                required
                type='time'
                name='endTime'
                value={data.endTime}
                onChange={handleOnChange}
                className='h-7 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md
                shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              />
            </div>
          </div>

          <div className='space-y-1'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <div className='mt-1'>
              <textarea
                required
                rows={2}
                value={data.description}
                name='description'
                onChange={handleOnChange}
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300 rounded-md
                shadow-sm ring-2 ring-blue-500 focus:ring-blue-700 focus:border-blue-700 block w-full sm:text-sm border-blue-300 rounded-md'
              ></textarea>
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Add Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewEvent;
