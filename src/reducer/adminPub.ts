import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pub } from "../domain/Pub.model";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { GameTemplate } from "src/domain/pub/GameTemplate.model";
export interface PubState {
  pub?: Pub;
  weeks: Weeks[];
}
export interface Weeks {
  template: GameTemplate;
  weeks: string[];
}

const initialState: PubState = {
  weeks: [],
  pub: null,
};

export const adminPubSlice = createSlice({
  name: "adminPub",
  initialState,
  reducers: {
    setOnePubData: (state, action: PayloadAction<Pub>) => {
      state.pub = action.payload;
    },
    updateOnePubData: (state, action: PayloadAction<Weeks[]>) => {
      // let updateDatas = action.payload;
      // let templateList: GameTemplate[] = [];
      // let newPub: Pub = state.pub;
      // for (const updateData of updateDatas) {
      //   templateList.push(updateData.template);
      // }
      // newPub.templates = [...templateList];
      // console.log(newPub);
      // state.pub = newPub;
    },
    setWeekPubData: (state, action: PayloadAction<Pub>) => {
      let pickPub = action.payload;
      let newWeeks: Weeks[] = [];
      pickPub.basicInfo.gameTemplates.map((template, ti) => {
        return newWeeks.push({ template, weeks: [] });
      });

      // pickPub.days.map((day, i) => {
      //   day.games.map((game, i) => {
      //     pickPub.templates.map((template, ti) => {
      //       newWeeks[ti].template = template;
      //       if (template.id === game) {
      //         newWeeks[ti].weeks.push(day.day);
      //       }
      //     });
      //   });
      // });
      state.weeks = newWeeks;
    },
    setTemplatesData: (state, action: PayloadAction<Weeks>) => {
      const updatedWeeks = state.weeks.map((v, i) => {
        if (action.payload.template.id === v.template.id) {
          v.template = action.payload.template;
          v.weeks = action.payload.weeks;
        }
        return v; // 변경된 Week 객체를 리턴
      });
      // state.pub.days.map((v, i) => {
      //   v.games.length = 0;
      // });
      // state.weeks.map((week, _) => {
      //   week.weeks.map((month) => {
      //     state.pub.days.map((value, _) => {
      //       if (month === value.day) {
      //         value.games.push(week.template.id);
      //       }
      //     });
      //   });
      // });

      let templateList: GameTemplate[] = [];

      for (const updateData of updatedWeeks) {
        templateList.push(updateData.template);
      }

      console.log(templateList);

      state.pub.basicInfo.gameTemplates = templateList;
    },
    addTemplatesData: (state, action: PayloadAction<Weeks>) => {
      state.weeks.push(action.payload);
      let templateList: GameTemplate[] = [];

      for (const updateData of state.weeks) {
        templateList.push(updateData.template);
      }

      // state.weeks.map((week, _) => {
      //   week.weeks.map((month) => {
      //     state.pub.days.map((value, _) => {
      //       if (month === value.day) {
      //         if (!value.games.includes(week.template.id)) {
      //           value.games.push(week.template.id);
      //         }
      //       }
      //     });
      //   });
      // });

      console.log(templateList);

      state.pub.basicInfo.gameTemplates = templateList;
    },
    deleteTemplatesData: (state, action: PayloadAction<string>) => {
      state.weeks = state.weeks.filter(
        (value) => value.template.id !== action.payload
      );
      let templateList: GameTemplate[] = [];

      for (const updateData of state.weeks) {
        templateList.push(updateData.template);
      }

      state.pub.basicInfo.gameTemplates = templateList;

      // state.pub.days.map((v, i) => {
      //   v.games.length = 0;
      // });
      // state.weeks.map((week, _) => {
      //   week.weeks.map((month) => {
      //     state.pub.days.map((value, _) => {
      //       if (month === value.day) {
      //         value.games.push(week.template.id);
      //       }
      //     });
      //   });
      // });
    },
  },
});

export const {
  setOnePubData,
  setWeekPubData,
  setTemplatesData,
  addTemplatesData,
  deleteTemplatesData,
  updateOnePubData,
} = adminPubSlice.actions;
export default adminPubSlice;
