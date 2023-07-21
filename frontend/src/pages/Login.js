import React, { useState } from "react";
import userIcon from "../images/userIcon.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleShowPass = () => {
    setShowPassword((preve) => !preve);
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
  const handleLoginSuccess = (dataRes) => {
    dispatch(loginRedux(dataRes));
    // store the authentication token in local storage
    localStorage.setItem("authToken", dataRes.token);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
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
      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log(userData.firstName);
    } else {
      alert("please insert required data");
      navigate("/login");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen  style={{ marginTop: "-50px" }}'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        {/*<h1 className="text-center text-2xl font bold">Signup</h1>*/}
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={userIcon} className='w-full' />
        </div>

        <form
          className='py-3 w-full flex flex-col rounded-lg'
          onSubmit={handleSubmit}
        >
          <label htmlfore='email'>E-mail</label>
          <input
            required
            type={"email"}
            id='email'
            name='email'
            className='mt-5 mb-3 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlfore='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200  rounded mt-5 mb-2 focus-within:outline focus-within:outline-blue-300 '>
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

          <button
            type='submit'
            className=' mt-10 font-medium py-1 rounded-full w-full text-xl max-w-[120px] m-auto bg-green-500 hover:bg-green-600'
          >
            Login
          </button>
        </form>
        <p className='text-left text-base mt-3'>
          Dont have an account ?{" "}
          <Link
            to={"/Signup"}
            className='text-blue-500 underline hover:text-green-600'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
