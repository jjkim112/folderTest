import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const wholeCard: string[] = [
  "sa",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "st",
  "sj",
  "sq",
  "sk",
  "da",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "dt",
  "dj",
  "dq",
  "dk",
  "ca",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ct",
  "cj",
  "cq",
  "ck",
  "ha",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "h8",
  "h9",
  "ht",
  "hj",
  "hq",
  "hk",
];

const isCard = (value: string): boolean => {
  return wholeCard.includes(value);
};
const isRealHand = (hand: string[]): boolean => {
  if (hand.length == 2) {
    if (isCard(hand[0]) && isCard(hand[1])) {
      return true;
    }
  }
  return false;
};

export class OnePlayer {
  hand: string[];
  constructor(hand: string[]) {
    this.hand = hand;
  }
  get clone() {
    return new OnePlayer(Array.from(this.hand));
  }
}

export interface PokerCalState {
  remainCards: string[];
  players: OnePlayer[];
  communityCards: string[];
  randomPick: number[];
}

const initialState: PokerCalState = {
  remainCards: Array.from(wholeCard),
  players: [new OnePlayer(["", ""]), new OnePlayer(["", ""])],
  communityCards: ["", "", "", "", ""],
  randomPick: [0, 0, 0, 1, 1],
};

export const pokerCalSlice = createSlice({
  name: "pokerCal",
  initialState,
  reducers: {
    updatePlayerCards: (state, action: PayloadAction<OnePlayer[]>) => {
      for (const onePlayer of state.players) {
        if (isCard(onePlayer.hand[0])) {
          state.remainCards.push(onePlayer.hand[0]);
        }
        if (isCard(onePlayer.hand[1])) {
          state.remainCards.push(onePlayer.hand[1]);
        }
      }

      for (const onePlayer of action.payload) {
        if (isCard(onePlayer.hand[0])) {
          const index = state.remainCards.indexOf(onePlayer.hand[0]);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
        if (isCard(onePlayer.hand[1])) {
          const index = state.remainCards.indexOf(onePlayer.hand[1]);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
      }

      state.players = Array.from(action.payload);
    },
    updateCommunitCards: (state, action: PayloadAction<string[]>) => {
      for (const cardTemp of state.communityCards) {
        if (isCard(cardTemp)) {
          state.remainCards.push(cardTemp);
        }
      }

      for (const cardTemp of action.payload) {
        if (isCard(cardTemp)) {
          const index = state.remainCards.indexOf(cardTemp);
          if (index !== -1) {
            state.remainCards.splice(index, 1);
          }
        }
      }
      state.communityCards = Array.from(action.payload);
    },
    refreshPokerCal: (state) => {
      state.remainCards = Array.from(initialState.remainCards);
      state.players = Array.from(initialState.players);
      state.communityCards = Array.from(initialState.communityCards);
      state.randomPick = Array.from(initialState.randomPick);
    },
    randomPickSet: (state, action: PayloadAction<number[]>) => {
      state.randomPick = Array.from(action.payload);
    },
    flopCommunityCards: (state) => {
      state.communityCards.forEach((card, i) => {
        if (state.randomPick[i] === 0) {
          if (isCard(card)) {
            state.remainCards.push(card);
          }
        }
      });

      const pickNum = state.randomPick.filter((v) => v === 0).length;
      const randoms: number[] = randomSelIndex(
        state.remainCards.length,
        pickNum
      );

      let tempCards: string[] = [];
      let index = 0;
      state.randomPick.forEach((v, i) => {
        if (v === 1) {
          tempCards.push(state.communityCards[i]);
        } else {
          tempCards.push(state.remainCards[randoms[index]]);
          index++;
        }
      });
      // console.log("state.remainCards.length");
      // console.log(state.remainCards.length);
      // console.log("randoms");
      // console.log(randoms);
      // console.log("tempCards");
      // console.log(tempCards);

      state.communityCards = tempCards;
      tempCards.forEach((v) => {
        const index = state.remainCards.indexOf(v);
        if (index !== -1) {
          state.remainCards.splice(index, 1);
        }
      });
    },
    resetCommunityCards: (state) => {
      // for (let i = 0; i < 5; i++) {
      //   if (state.randomPick[i] === 0) {
      //     if (isCard(state.communityCards[i])) {
      //       state.remainCards.push(state.communityCards[i]);
      //       state.communityCards[i] = "";
      //     }
      //   }
      // }

      for (const card of state.communityCards) {
        state.remainCards.push(card);
      }
      state.communityCards = Array.from(initialState.communityCards);
    },
  },
});

const randomSelIndex = (length: number, needNum: number): number[] => {
  let randoms: number[] = [];
  for (let i: number = 0; i < needNum; ) {
    const tempNum = Math.floor(Math.random() * length);
    if (!randoms.includes(tempNum)) {
      randoms.push(tempNum);
      i++;
    }
  }
  return randoms;
};

export const {
  flopCommunityCards,
  resetCommunityCards,
  updatePlayerCards,
  updateCommunitCards,
  randomPickSet,
  refreshPokerCal,
} = pokerCalSlice.actions;
export default pokerCalSlice;
