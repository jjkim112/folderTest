import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/useSlice";
import pokerCalSlice from "./slice/pokerCalSlice";
import pubSlice from "./slice/pubSlice";

const rootReducer = combineReducers({
  pub: pubSlice.reducer,
  pokerCal: pokerCalSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  //이런식으로 main store에서 각각의 리듀서를 다 만들지말고 이런식으로 하는 방식
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
