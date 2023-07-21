import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import toast, { Toaster } from "react-hot-toast";
import "./background.css";
import { useEffect, useState } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import { loginUser } from "./redux/userSlice";
import React from "react";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      (async () => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_SERVER_DOMIN}/user`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          const userData = await res.json();
          console.log(userData);
          dispatch(loginUser(userData));
          setUser(userData);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }

    // fetch product data
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <main className='main pt-16'>
            <Outlet />
          </main>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
