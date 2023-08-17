import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import pubSlice from "../reducer/pubSlice";
import gameSlice from "../reducer/gameSlice";
import pokerCalSlice from "../reducer/pokerCalSlice";
import userSlice from "../reducer/userSlice";
import adminPubSlice from "src/reducer/adminPub";
import authSlice from "src/reducer/authSlice";

export const store = configureStore({
  reducer: {
    pub: pubSlice.reducer,
    admin: adminPubSlice.reducer,
    game: gameSlice.reducer,
    pokerCal: pokerCalSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
