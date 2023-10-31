import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import { Pub } from "../domain/Pub.model";
import { DataService } from "../../data/dataService";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as CryptoJS from "crypto-js";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

export interface AuthState {
  pw: string;
}

const initialState: AuthState = {
  pw: "",
};
export const useAdmin = (): boolean => {
  const pw = useSelector((state: RootState) => state.auth.pw);
  return (
    pw == "f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b"
  );
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    inputPw: (state, action: PayloadAction<String>) => {
      state.pw = CryptoJS.SHA256(action.payload).toString();
    },
  },
});

export const { inputPw } = authSlice.actions;
export default authSlice;
