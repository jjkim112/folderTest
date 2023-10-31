import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../domain/account/Account.model";

export interface PubCustomRankUser {
  id: string;
  totalPrize: number;
  howManyMoneyIn: number;
  howManyFirstRank: number;
}

export interface UserState {
  users: Account[];
  customUsers: PubCustomRankUser[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  customUsers: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoadingStart: (state) => {
      state.loading = true;
    },
    userLoadingEnd: (state) => {
      state.loading = false;
    },
    setUsers: (state, action: PayloadAction<Account[]>) => {
      state.users = action.payload;
    },
    refreshWithPubId: (state, action: PayloadAction<string>) => {
      const pubId = action.payload;
      if (pubId !== "") {
        let tempList: PubCustomRankUser[] = [];
        // for (const user of state.users) {
        //   let totalPrize = 0;
        //   let howManyMoneyIn = 0;
        //   let howManyFirstRank = 0;
        //   for (const game of user.games) {
        //     if (game.pubId === pubId) {
        //       totalPrize += game.datas.prize;
        //       if (game.datas.prize > 0) {
        //         howManyMoneyIn++;
        //       }
        //       if (game.datas.rank === 1) {
        //         howManyFirstRank++;
        //       }
        //     }
        //   }
        //   tempList.push({
        //     id: user.id,
        //     totalPrize: totalPrize,
        //     howManyMoneyIn: howManyMoneyIn,
        //     howManyFirstRank: howManyFirstRank,
        //   });
        // }
        tempList.sort((a, b) => b.totalPrize - a.totalPrize);
        state.customUsers = tempList;
      }
    },
  },
});

export const { userLoadingStart, userLoadingEnd, setUsers, refreshWithPubId } =
  userSlice.actions;
export default userSlice;
