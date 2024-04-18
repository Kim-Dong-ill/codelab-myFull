import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk("user/loginUser", async (body) => {
  //createAsyncThunk로 비동기 사용
  //여러개의 thunk사용해서 export해줄꺼라서 바로 export해준다.
  try {
    const res = await axiosInstance.post("/user/login", body);
    //로그인 할때 가져온 body로 axios 실행하는데 axiosInstance로 만들어서 실행할거다.
    return res.data;
    //back에 userRouter의 "/login" 이 값이 전달된다. (eamil, password)
    //back에서는 해당 email로 유저를 찾아서 payload만들어서 토큰 발행할거다.
  } catch (error) {
    console.log(error);
  }
});

export const authUser = createAsyncThunk("user/authUser", async (_) => {
  try {
    const res = await axiosInstance.get("/user/auth"); //여기에 토큰 데리고 온다.
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
