import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Menue from "./pages/Menue";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Newproduct from "./pages/Newproduct";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import UserData from "./pages/UserData";
import AddNewEvent from "./pages/AddNewEvent";
import Category from "./pages/Category";
import CategoriesPage from "./pages/CategoriesPage";

import { store } from "./redux/index";
import { Provider } from "react-redux";
import EmpDash from "./pages/EmpDash";
import UserProfile from "./pages/UserProfile";

import EventData from "./pages/EventData";

const loggedIn = window.localStorage.setItem("isLoggedIn", true);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='menue' element={<Menue />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='newproduct' element={<Newproduct />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='EmpDash' element={<EmpDash />} />
      <Route path='userProfile' element={<UserProfile />} />
      <Route path='Category' element={<Category />} />
      <Route path='CategoriesPage' element={<CategoriesPage />} />

      <Route path='UserData' element={<UserData />} />
      <Route path='AddNewEvent' element={<AddNewEvent />} />
      <Route path='EventData' element={<EventData />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
