import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/thunkFunctions";

function Navbar() {
  const isAuth = useSelector((state) => {
    return state.user?.isAuth;
  }); //state.user? 가 없으면? 뒤에 실행 안함

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    console.log("로그아웃 클릭");
    dispatch(logoutUser()).then(() => {
      navigate("/"); //로그아웃시 첫 화면으로 이동
    });
  }

  const routes = [
    { to: "/login", name: "로그인", auth: false },
    { to: "/register", name: "회원가입", auth: false },
    { to: "/company", name: "회사소개", auth: true },
    { to: "/basic", name: "기본", auth: null },
    { to: "", name: "로그아웃", auth: true },
  ];
  return (
    <div className="w-full shadow-md">
      <div className="container m-auto flex justify-between">
        <h1 className="font-semibold p-4">
          <Link to="/">COMPANY</Link>
        </h1>
        <ul className="flex">
          {routes.map(({ to, name, auth }) => {
            //배열을 item에 넣고 그 to, name auth를 사용가능
            if (isAuth != auth) {
              //로그인 하면 isAuth가 true이다. 로그인과 회원가입은 false이니까 if 의 결과값은 true가 나와서 null 이 나온다.
              return null;
            }

            if (name === "로그아웃") {
              return (
                <li key={name}>
                  <Link
                    onClick={handleLogout}
                    className="h-full flex px-4 justify-center items-center"
                  >
                    {name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={name}>
                  <Link
                    to={to}
                    className="h-full flex px-4 justify-center items-center"
                  >
                    {name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
