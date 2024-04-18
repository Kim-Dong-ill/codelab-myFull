import React, { useEffect } from "react";
import "./assets/css/tStyle.scss";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./layout/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";

function Layout() {
  return (
    <>
      <Navbar />
    </>
  );
}

function App() {
  const isAuth = useSelector((state) => {
    return state.user.isAuth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
