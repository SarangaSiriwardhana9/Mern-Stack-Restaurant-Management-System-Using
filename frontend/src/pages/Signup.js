import React, { useState } from "react";
import userIcon from "../images/userIcon.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  console.log(data);

  const handleShowPass = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  console.log(process.env.REACT_APP_SERVER_DOMIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchData.json();
        console.log(dataRes);

        //alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/Login");
        }
      } else {
        alert("password and confirm password is not equal");
      }
    } else {
      alert("please insert required data");
    }
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 '>
        {/*<h1 className="text-center text-2xl font bold">Signup</h1>*/}
        <div className=' h-20 w-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative'>
          <img
            src={data.image ? data.image : userIcon}
            className='w-full h-full'
          />

          <label htmlFor='profileImage'>
            <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60 w-full text-center  cursor-pointer'>
              <p className='text-sm p-1 text-white'>Upload</p>
            </div>
            <input
              type={"file"}
              id='profileImage'
              accept='image/*'
              className='hidden'
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className='py-3 w-full flex flex-col' onSubmit={handleSubmit}>
          <label htmlfore='firstName'>First Name</label>
          <input
            required
            type={"text"}
            id='firstName'
            name='firstName'
            className='mt-1 mb-3 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlfore='lastName'>Lirst Name</label>
          <input
            required
            type={"text"}
            id='lastName'
            name='lastName'
            className='mt-1 mb-3 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlfore='email'>E-mail</label>
          <input
            required
            type={"email"}
            id='email'
            name='email'
            className='mt-1 mb-3 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlfore='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 '>
            <input
              required
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              className='w-full bg-slate-200 p-0 border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className='flex text-xl cursor-pointer'
              onClick={handleShowPass}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlfore='confirmPassword'>Confirm Password</label>
          <div className='flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 '>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              id='confirmPassword'
              name='confirmPassword'
              className='w-full bg-slate-200 p-0 border-none outline-none'
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className='flex text-xl cursor-pointer'
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type='submit'
            className=' mt-5 font-medium py-1 rounded-full w-full text-xl max-w-[120px] m-auto bg-green-500 hover:bg-green-600'
          >
            Sign Up
          </button>
        </form>
        <p className='text-left text-base mt-3'>
          Allready have an account ?{" "}
          <Link
            to={"/Login"}
            className='text-blue-500 underline hover:text-green-600'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
