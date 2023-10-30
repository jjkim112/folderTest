import { Timestamp } from "firebase/firestore";
import { CostAndChip } from "./CostAndChip.interface";
import {
  ADDON_KEY,
  BUYIN_KEY,
  REBUYIN_KEY,
  REENTRY_KEY,
} from "../const/entry_const";
import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export class GeneralData {
  gameName: string;
  startTime: Date;
  note: string;
  isPrivate: boolean;
  addOnCost: CostAndChip;
  buyInCost: CostAndChip;
  reEntryCost: CostAndChip;
  rebuyCosts: CostAndChip[];
  addedChip: number;
  tournaSkin: number;

  constructor(
    gameName: string,
    startTime: Date,
    note: string,
    isPrivate: boolean,
    addOnCost: CostAndChip,
    buyInCost: CostAndChip,
    reEntryCost: CostAndChip,
    rebuyCosts: CostAndChip[],
    addedChip: number,
    tournaSkin: number
  ) {
    this.gameName = gameName;
    this.startTime = startTime;
    this.note = note;
    this.isPrivate = isPrivate;
    this.addOnCost = addOnCost;
    this.buyInCost = buyInCost;
    this.reEntryCost = reEntryCost;
    this.rebuyCosts = rebuyCosts;
    this.addedChip = addedChip;
    this.tournaSkin = tournaSkin;
  }

  static fromData(data: any): GeneralData {
    try {
      const gameName = FirebaseTypeChange.stringFromData(data["gameName"]);
      const startTime = FirebaseTypeChange.dateFromData(data["startTime"]);
      const note = FirebaseTypeChange.stringFromData(data["note"]);
      const isPrivate = FirebaseTypeChange.booleanFromData(data["isPrivate"]);
      const addOnCost = FirebaseTypeChange.anyFromData(data["addOnCost"]);
      const buyInCost = FirebaseTypeChange.anyFromData(data["buyInCost"]);
      const reEntryCost = FirebaseTypeChange.anyFromData(data["reEntryCost"]);
      const rebuyCosts = FirebaseTypeChange.listFromData(data["rebuyCosts"]);
      const addedChip = FirebaseTypeChange.numberFromData(data["addedChip"]);
      const tournaSkin = FirebaseTypeChange.numberFromData(data["tournaSkin"]);

      return new GeneralData(
        gameName,
        startTime,
        note,
        isPrivate,
        addOnCost,
        buyInCost,
        reEntryCost,
        rebuyCosts,
        addedChip,
        tournaSkin
      );
    } catch (error) {
      console.log(`[GeneralData Model] fromData e: ${error}`);
      return GeneralData.empty;
    }
  }

  static fromIndexedDB(data: any): GeneralData {
    try {
      // TODO
      return GeneralData.empty;
    } catch (error) {
      console.log(`[GeneralData Model] fromData e: ${error}`);
      return GeneralData.empty;
    }
  }

  get toMap() {
    return {
      gameName: this.gameName,
      startTime: this.startTime,
      note: this.note,
      isPrivate: this.isPrivate,
      addOnCost: this.addOnCost,
      buyInCost: this.buyInCost,
      reEntryCost: this.reEntryCost,
      rebuyCosts: this.rebuyCosts,
      addedChip: this.addedChip,
      tournaSkin: this.tournaSkin,
    };
  }

  get toIndexedDB() {
    return {
      gameName: this.gameName,
      startTime: this.startTime,
      note: this.note,
      isPrivate: this.isPrivate,
      addOnCost: this.addOnCost,
      buyInCost: this.buyInCost,
      reEntryCost: this.reEntryCost,
      rebuyCosts: this.rebuyCosts,
      addedChip: this.addedChip,
      tournaSkin: this.tournaSkin,
    };
  }
  static get empty() {
    return new GeneralData(
      "",
      new Date(),
      "",
      true,
      { title: ADDON_KEY, num: 0, cost: 0, chip: 0 },
      { title: BUYIN_KEY, num: 0, cost: 0, chip: 0 },
      { title: REENTRY_KEY, num: 0, cost: 0, chip: 0 },
      [{ title: REBUYIN_KEY, num: 0, cost: 0, chip: 0 }],
      0,
      0
    );
  }

  get clone() {
    return new GeneralData(
      this.gameName,
      this.startTime,
      this.note,
      this.isPrivate,
      { ...this.addOnCost },
      { ...this.buyInCost },
      { ...this.reEntryCost },
      this.rebuyCosts.map((rc) => ({ ...rc })),
      this.addedChip,
      this.tournaSkin
    );
  }
}
