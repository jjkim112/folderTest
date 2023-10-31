import { Timestamp } from "firebase/firestore";
import { CostAndChip } from "../../../interface/tournaDomain/CostAndChip.interface";
import {
  ADDON_KEY,
  BUYIN_KEY,
  REENTRY_KEY,
} from "../../../util/constant/entry_const";
import { FirebaseTypeChange } from "../../../util/commonFunc/firebase/FirebaseTypeChange";

export class EntryData {
  entryList: CostAndChip[];
  remainPlayer: number;
  rebuyableLevel: number | null;
  remainEntry: number | null;

  constructor(
    entryList: CostAndChip[],
    remainPlayer: number,
    rebuyableLevel: number | null,
    remainEntry: number | null
  ) {
    this.entryList = entryList;
    this.remainPlayer = remainPlayer;
    this.rebuyableLevel = rebuyableLevel;
    this.remainEntry = remainEntry;
  }

  static fromData(data: any): EntryData {
    try {
      const entryList = FirebaseTypeChange.listFromData(data["entryList"]);
      const remainPlayer = FirebaseTypeChange.numberFromData(
        data["remainPlayer"]
      );
      const remainEntry = FirebaseTypeChange.numberNullFromData(
        data["remainEntry"]
      );
      const rebuyableLevel = FirebaseTypeChange.numberNullFromData(
        data["rebuyableLevel"]
      );

      return new EntryData(
        entryList,
        remainPlayer,
        rebuyableLevel,
        remainEntry
      );
    } catch (error) {
      console.log(`[EntryData Model] fromData e: ${error}`);
      return EntryData.empty;
    }
  }

  static fromIndexedDB(data: any): EntryData {
    try {
      // TODO
      return EntryData.empty;
    } catch (error) {
      console.log(`[EntryData Model] fromData e: ${error}`);
      return EntryData.empty;
    }
  }

  get toMap() {
    return {
      entryList: this.entryList,
      remainPlayer: this.remainPlayer,
      rebuyableLevel: this.rebuyableLevel,
      remainEntry: this.remainEntry,
    };
  }

  get toIndexedDB() {
    return {
      entryList: this.entryList,
      remainPlayer: this.remainPlayer,
      rebuyableLevel: this.rebuyableLevel,
      remainEntry: this.remainEntry,
    };
  }

  static get empty() {
    return new EntryData([], 0, null, null);
  }

  get clone() {
    return new EntryData(
      this.entryList.map((e) => ({ ...e })),
      this.remainPlayer,
      this.rebuyableLevel,
      this.remainEntry
    );
  }

  static getTotalPlayer(entries: CostAndChip[]): number {
    let count = 0;
    for (const cac of entries) {
      if (cac.title === BUYIN_KEY || cac.title === REENTRY_KEY) {
        count += cac.num;
      }
    }
    return count;
  }

  static getTotalCostAndChip(entries: CostAndChip[]): CostAndChip {
    let totalCost = 0;
    let totalChip = 0;

    for (const cac of entries) {
      totalCost += cac.cost;
      totalChip += cac.chip;
    }

    return {
      title: "",
      num: 0,
      cost: totalCost,
      chip: totalChip,
    };
  }
  static getAddOnCount(entries: CostAndChip[]): number {
    let count = 0;

    for (const cac of entries) {
      if (cac.title === ADDON_KEY) {
        count = cac.num;
      }
    }

    return count;
  }
  static getReEentryCount(entries: CostAndChip[]): number {
    let count = 0;

    for (const cac of entries) {
      if (cac.title === REENTRY_KEY) {
        count = cac.num;
      }
    }

    return count;
  }
  static getEntryCount(entries: CostAndChip[]): number {
    let count = 0;

    for (const cac of entries) {
      if (cac.title === BUYIN_KEY) {
        count = cac.num;
      }
    }

    return count;
  }
  static getRebuyInCount(entries: CostAndChip[], index: number): number {
    let count = 0;

    for (const cac of entries) {
      if (cac.title === `re-buy-in-${index}`) {
        count += cac.num;
      }
    }

    return count;
  }
  static getRebuyInAllCount(
    entries: CostAndChip[],
    reBuyInLength: number
  ): number {
    let count = 0;

    for (let index = 0; index < reBuyInLength; index++) {
      for (const cac of entries) {
        if (cac.title === `re-buy-in-${index}`) {
          count += cac.num;
        }
      }
    }

    return count;
  }
}
