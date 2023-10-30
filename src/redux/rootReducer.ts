import { combineReducers } from "@reduxjs/toolkit";
import pubSlice from "../reducer/pubSlice";
import gameSlice from "../reducer/gameSlice";
import pokerCalSlice from "../reducer/pokerCalSlice";
import userSlice from "../reducer/userSlice";
import adminPubSlice from "src/reducer/adminPub";
import authSlice from "src/reducer/authSlice";

const rootReducer = combineReducers({
  pub: pubSlice.reducer,
  admin: adminPubSlice.reducer,
  game: gameSlice.reducer,
  pokerCal: pokerCalSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  //이런식으로 main store에서 각각의 리듀서를 다 만들지말고 이런식으로 하는 방식
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
