import React, { useEffect } from "react";
import "./assets/css/tStyle.scss";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./layout/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import FooterPage from "./layout/footer/FooterPage";
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import NotAuthRouter from "./components/NotAuthRouter";
import ProtectRouter from "./components/ProtectRouter";
import BasicPage from "./pages/BasicPage/BasicPage";
import MainPage from "./layout/Main/MainPage";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        {/* 하단의 Route path="/"안에 있는 Route를 누르면 보이는 element가 Outlet에 보인다. */}
      </main>
      <FooterPage></FooterPage>
    </>
  );
}

function App() {
  const isAuth = useSelector((state) => {
    return state.user.isAuth; //user는 내가 persist에서 combinReducer할때 저장했던 이름이다.
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation(); //page의 path 알려준다.
  useEffect(() => {
    if (isAuth) {
      //isAuth = true
      dispatch(authUser()); //dispatch는 신호를 보낸다.
    }
  }, [isAuth, dispatch, pathname]); // 세개의 값중 하나가 변화하면 실행
  return (
    <>
      {pathname}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          {/* 첫페이지를 보여주려면 index라고 한다. */}
          <Route element={<NotAuthRouter isAuth={isAuth} />}>
            {/* 로그인 했을때 여기를 통해서 로그인,회원가입 못누름 */}
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
          <Route element={<ProtectRouter isAuth={isAuth} />}>
            <Route path="/company" element={<CompanyPage />}></Route>
          </Route>
          <Route path="/basic" element={<BasicPage></BasicPage>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
