import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 4. rootReducer는 여러 reducerSlice를 모아서 합치는 역할이고 combineReducers를 사용한다.
const rootReducer = combineReducers({
  user: userReducer, //userReducer의 Slice이다.
});

// 3. persistConfig는 localstoage에 저장하는 정보가 있는듯
const persistConfig = {
  key: "root", //localstoage에 들어갈때 "key"값을 적는다.
  storage, //import해서 가져왔는데 localstoage를 의미한다.
};

// 2. persistedReducer는 persistReducer로 가져오고 첫번째는 config 두번째는 reducer가 들어온다.
//이 과정에서 reducer위치가 config를 통해 localstoage에 저장되는듯 하다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 1. provider에 넣을 store만들기
//토큰이 새로고침하면 날아가서 persist로 localage에 저장하려한다.
//persist사용하려면 reducer에 persistedReducer 사용한다.
//middleware는 어디서 복사 붙여넣기 했다.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
