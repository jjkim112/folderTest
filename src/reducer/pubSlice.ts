import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import { Pub } from "../domain/Pub.model";
import { DataService } from "../data/DataService";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TournamentInfo } from "src/domain/TournamentInfo.model";

export interface PubState {
  pubs: Pub[];
  tournaments: TournamentInfo[];
  loading: boolean;
}

const initialState: PubState = {
  pubs: [],
  tournaments: [],
  loading: false,
};

export const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    pubLoadingStart: (state) => {
      state.loading = true;
    },
    pubLoadingEnd: (state) => {
      state.loading = false;
    },
    refreshWholePub: (state, action: PayloadAction<Pub[]>) => {
      state.pubs = action.payload;
    },
    inputPubData: (state, action: PayloadAction<Pub>) => {
      let isNew = true;
      for (var p of state.pubs) {
        if (action.payload.id === p.id) {
          const index = state.pubs.indexOf(p);
          state.pubs[index] = action.payload;
          isNew = false;
          break;
        }
      }
      if (isNew) {
        state.pubs.push(action.payload);
      }
    },
    resetPubTournaments: (state, action: PayloadAction<TournamentInfo[]>) => {
      if (action.payload.length == 0) {
        return;
      }
      const pId = action.payload[0].pubId;

      for (var p of state.pubs) {
        if (pId === p.id) {
          const index = state.pubs.indexOf(p);
          state.pubs[index].games = action.payload;
          state.pubs[index] = state.pubs[index].clone;
          break;
        }
      }
    },
  },
});

export const {
  pubLoadingStart,
  pubLoadingEnd,
  refreshWholePub,
  inputPubData,
  resetPubTournaments,
} = pubSlice.actions;
export default pubSlice;
