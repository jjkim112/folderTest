import { Timestamp } from "firebase/firestore";
import { last } from "lodash";
import { GeneralData } from "./component/GeneralData.model";
import { PrizeData } from "./component/PrizeData.model";
import { EntryData } from "./component/EntryData.model";
import { FirebaseTypeChange } from "../../util/commonFunc/firebase/FirebaseTypeChange";

export class TournamentInfo {
  readonly id: string;
  pubId: string; // 지점 id
  prevSecond: number;
  lastCheckedTime: Date; // TODO 와홀덤 처럼 실시간 정보 연동.
  isProgress: boolean; // 진행 중 여부
  generalData: GeneralData;
  prizeData: PrizeData;
  entryData: EntryData;
  blindList: BlindLevel[];

  constructor(
    id: string,
    pubId: string,
    prevSecond: number,
    lastCheckedTime: Date,
    isProgress: boolean,
    generalData: GeneralData,
    prizeData: PrizeData,
    entryData: EntryData,
    blindList: BlindLevel[]
  ) {
    this.id = id;
    this.pubId = pubId;
    this.prevSecond = prevSecond;
    this.lastCheckedTime = lastCheckedTime;
    this.isProgress = isProgress;
    this.generalData = generalData;
    this.prizeData = prizeData;
    this.entryData = entryData;
    this.blindList = blindList;
  }

  static fromListData(data: any): TournamentInfo[] {
    try {
      let temp: TournamentInfo[] = [];

      for (const oneData in data) {
        temp.push(TournamentInfo.fromData(oneData));
      }

      return temp;
    } catch (e) {
      console.log(`[TournamentInfo Model] fromListData e: ${e}`);
      return [];
    }
  }

  static fromData(data: any): TournamentInfo {
    try {
      const id = FirebaseTypeChange.stringFromData(data["id"]); // string;
      const pubId = FirebaseTypeChange.stringFromData(data["pubId"]); // string;
      const prevSecond = FirebaseTypeChange.numberFromData(data["prevSecond"]); // number;
      const lastCheckedTime = FirebaseTypeChange.dateFromData(
        data["lastCheckedTime"]
      );
      const isProgress = FirebaseTypeChange.booleanFromData(data["isProgress"]);

      const generalData = GeneralData.fromData(data); // GeneralData;
      const prizeData = PrizeData.fromData(data); // PrizeData;
      const entryData = EntryData.fromData(data); // EntryData;
      const blindList = FirebaseTypeChange.listFromData(data["blindList"]); // BlindLevel[];

      return new TournamentInfo(
        id,
        pubId,
        prevSecond,
        lastCheckedTime,
        isProgress,
        generalData,
        prizeData,
        entryData,
        blindList
      );
    } catch (error) {
      console.log(`[TournamentInfo Model] fromData e: ${error}`);
      return TournamentInfo.empty;
    }
  }

  static fromIndexedDB(data: any): TournamentInfo {
    try {
      // TODO
      return TournamentInfo.empty;
    } catch (error) {
      console.log(`[TournamentInfo Model] fromData e: ${error}`);
      return TournamentInfo.empty;
    }
  }

  get toIndexedDB() {
    return {
      id: this.id,
      pubId: this.pubId,
      prevSecond: this.prevSecond,
      lastCheckedTime: this.lastCheckedTime,
      isProgress: this.isProgress,
      ...this.generalData.toIndexedDB,
      ...this.prizeData.toIndexedDB,
      ...this.entryData.toIndexedDB,
      blindList: this.blindList,
    };
  }

  get toMap() {
    return {
      id: this.id,
      pubId: this.pubId,
      prevSecond: this.prevSecond,
      lastCheckedTime: this.lastCheckedTime,
      isProgress: this.isProgress,
      ...this.generalData.toMap,
      ...this.prizeData.toMap,
      ...this.entryData.toMap,
      blindList: this.blindList,
    };
  }

  static get empty() {
    return new TournamentInfo(
      "",
      "",
      0,
      new Date(),
      false,
      GeneralData.empty,
      PrizeData.empty,
      EntryData.empty,
      []
    );
  }

  get clone() {
    return new TournamentInfo(
      this.id,
      this.pubId,
      this.prevSecond,
      this.lastCheckedTime,
      this.isProgress,
      this.generalData.clone,
      this.prizeData.clone,
      this.entryData.clone,
      this.blindList.map((b) => ({ ...b }))
    );
  }
}

export interface BlindLevel {
  isBreak: boolean;
  level: number;
  bigBlind: number;
  smallBlind: number;
  ante: number;
  second: number; // 해당 레벨의 시간
}
