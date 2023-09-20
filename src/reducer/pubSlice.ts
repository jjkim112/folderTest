import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { wait } from '@testing-library/user-event/dist/utils/misc/wait';
import { Pub } from '../domain/Pub.model';
import { DataService } from '../data/DataService';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TournamentInfo } from 'src/domain/TournamentInfo.model';

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
  name: 'pub',
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
    getOnePubData: (state, action: PayloadAction<Pub[]>) => {
      state.pubs = action.payload;
    },
    inputTournament: (state, action: PayloadAction<TournamentInfo>) => {
      const newTournaId = action.payload.id;
      let isNew = true;
      for (var t of state.tournaments) {
        if (newTournaId === t.id) {
          const index = state.tournaments.indexOf(t);
          state.tournaments[index] = action.payload;
          isNew = false;
          break;
        }
      }
      if (isNew) {
        state.tournaments.push(action.payload);
      }
    },
  },
});

export const {
  pubLoadingStart,
  pubLoadingEnd,
  refreshWholePub,
  inputTournament,
} = pubSlice.actions;
export default pubSlice;
