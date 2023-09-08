import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { wait } from '@testing-library/user-event/dist/utils/misc/wait';
import { Pub } from '../domain/Pub.model';
import { DataService } from '../data/DataService';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game, GamePlayerThumb } from '../domain/Game.model';

export interface GameState {
  games: Game[];
  oneGame: Game;
  oneGamePlayers: GamePlayerThumb[];
  loading: boolean;
  isEdit: boolean;
}

const initialState: GameState = {
  games: [],
  oneGame: new Game('', '', '', '', '', '', '', 0, new Date(), '', []),
  oneGamePlayers: [],
  loading: false,
  isEdit: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameLoadingStart: (state) => {
      state.loading = true;
    },
    gameLoadingEnd: (state) => {
      state.loading = false;
    },

    toggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload; // 예시입니다. 실제 필요한 로직에 맞게 수정하세요.
    },

    refreshGames: (state, action: PayloadAction<Game[]>) => {
      // TODO 합쳐지는 방식으로 고쳐야함.
      state.games = action.payload;
    },
    setOneGameData: (state, action: PayloadAction<Game>) => {
      state.oneGame = action.payload;
    },
    setOneGamePlayer: (state, action: PayloadAction<GamePlayerThumb[]>) => {
      // TODO 합쳐지는 방식으로 고쳐야함.
      state.oneGamePlayers = action.payload;
    },
    reSetOneData: (state) => {
      // TODO 합쳐지는 방식으로 고쳐야함.
      state.oneGame = new Game(
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        new Date(),
        '',
        []
      );
      state.oneGamePlayers = [];
    },
    updateOneGameData: (state, action: PayloadAction<Game>) => {
      state.games = state.games.map((v) =>
        v.id === action.payload.id ? action.payload : v
      );
    },
    updateOneGamePlayer: (state, action: PayloadAction<GamePlayerThumb[]>) => {
      // TODO 합쳐지는 방식으로 고쳐야함.
      state.oneGamePlayers = action.payload;
    },
    udateGameData: (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload);
    },
  },
});

export const {
  gameLoadingStart,
  gameLoadingEnd,
  setOneGameData,
  setOneGamePlayer,
  reSetOneData,
  updateOneGameData,
  refreshGames,
  udateGameData,
  updateOneGamePlayer,
  toggleEditMode,
} = gameSlice.actions;
export default gameSlice;
