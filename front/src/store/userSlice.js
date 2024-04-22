import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser, logoutUser } from "./thunkFunctions";
import { toast } from "react-toastify";

// 2. 초기값 만들어준다.
const initialState = {
  userData: {
    id: "",
    eamil: "",
    name: "",
    role: 0,
    image: "",
    createdAt: "",
  },
  isAuth: false, //로그인 유저인지 아닌지
  isLoading: false, //로딩인지 아닌지
};

// 1. userSlice(store의 한 조각)을 createSlice로 만든다.
const userSlice = createSlice({
  name: "user1",
  initialState, //초기값
  reducers: {}, //원래 이거 쓰는데 사용 안함. 아래꺼 사용함
  extraReducers: (builder) => {
    // 3. pending, fulfilled, reject 상황에 맞게 설정
    builder
      .addCase(loginUser.pending, (state) => {
        //대기상태
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        //다녀온 상태 에러가 나든 말든 return이 오면 fulfilled 인거임
        //action에는  back에서 "/login"에 send한 user, accessToken. message가 온다.

        console.log("로그인 정상 작동");
        state.isLoading = false;
        state.userData = action.payload;
        console.log("메세지 이전");
        toast.info(action.payload.message);
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        //거부상태
        console.log("로그인 오류!!");
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      //authUser
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
      })
      //logout
      .addCase(logoutUser.pending, (state) => {
        console.log("로그아웃 대기상태");
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("로그아웃 완료 상태");
        state.isLoading = false;
        state.userData = initialState.userData; //초기화
        state.isAuth = false;
        localStorage.removeItem("asseccToken"); //토큰 삭제
        toast.info(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;
