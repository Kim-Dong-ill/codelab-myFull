import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// export const loginUser = createAsyncThunk("user/loginUser", async (body) => {
//   //"user/loginUser"는 그냥 createAsyncThunk의 이름이다. 필요없음
//   //createAsyncThunk로 비동기 사용
//   //여러개의 thunk사용해서 export해줄꺼라서 바로 export해준다.
//   try {
//     const res = await axiosInstance.post("/user/login", body);
//     //로그인 할때 가져온 body로 axios 실행하는데 axiosInstance로 만들어서 실행할거다.
//     //back에 userRouter의 "/login" 이 값이 전달된다. (eamil, password)
//     //back에서는 해당 email로 유저를 찾아서 payload만들어서 토큰 발행할거다.
//     return res.data;
//     //res.data는 백에서 return으로 send한 user가 들어온다. (로그인한 유저)
//   } catch (error) {
//     console.log("Thunk axios 오류" + error.message);
//   }
// });

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/login", body);
      console.log("thunkapi 로그인");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk("user/authUser", async (_) => {
  try {
    const res = await axiosInstance.get("/user/auth"); //여기에 토큰 데리고 온다.
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_) => {
  try {
    console.log("로그아웃 Thunk 진입");
    const res = await axiosInstance.post("/user/logout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
