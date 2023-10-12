import { Timestamp } from 'firebase/firestore';

export class TournamentInfo {
  readonly id: string;
  pubId: string; // 지점 id
  gameName: string; // 토너먼트 명
  totalPrize: string; // 총상금
  moneyIn: number; // 머니인 수
  prizeStructure: RankAndPrize[]; // 등수에 따른 상금 금액
  totalPlayer: number; // 총 플레이어
  remainPlayer: number; // 남은 플레이어
  rebuyNum: number; // 리바인 횟수
  addOnNum: number; // 애드온 횟수
  buyInCost: CostAndChip; //바이인 금액
  addOnCost: CostAndChip; // 애드온 금액
  rebuyList: CostAndChip[]; // 리바인 금액 관련
  totalChips: number; // 총 칩
  blindList: BlindLevel[]; // blind 레벨 정보
  entryList: EntryContent[]; // 각 Entry 정보
  startTime: Date; // start 시간
  rebuyableLevel: number | null; // entry 가능한 시간, null 이면 entry가 있는 거
  remainEntry: number | null; // entry 가능한 사람정보 null 이면 시간이 존재하는거
  note: string; // 비고
  prevSecond: number;
  isPrivate: boolean;
  reentryTime: Date | null;

  constructor(
    id: string,
    pubId: string,
    gameName: string,
    totalPrize: string,
    moneyIn: number,
    prizeStructure: RankAndPrize[],
    totalPlayer: number,
    remainPlayer: number,
    rebuyNum: number,
    addOnNum: number,
    buyInCost: CostAndChip,
    addOnCost: CostAndChip,
    rebuyList: CostAndChip[],
    totalChips: number,
    blindList: BlindLevel[],
    entryList: EntryContent[],
    startTime: Date,
    rebuyableLevel: number | null,
    remainEntry: number | null,
    note: string,
    prevSecond: number,
    isPrivate: boolean,
    reentryTime: Date | null
  ) {
    this.id = id;
    this.pubId = pubId;
    this.gameName = gameName;
    this.totalPrize = totalPrize;
    this.moneyIn = moneyIn;
    this.prizeStructure = prizeStructure;
    this.totalPlayer = totalPlayer;
    this.remainPlayer = remainPlayer;
    this.rebuyNum = rebuyNum;
    this.addOnNum = addOnNum;
    this.buyInCost = buyInCost;
    this.addOnCost = addOnCost;
    this.rebuyList = rebuyList;
    this.totalChips = totalChips;
    this.blindList = blindList;
    this.entryList = entryList;
    this.startTime = startTime;
    this.rebuyableLevel = rebuyableLevel;
    this.remainEntry = remainEntry;
    this.note = note;
    this.prevSecond = prevSecond;
    this.isPrivate = isPrivate;
    this.reentryTime = reentryTime;
  }

  static fromData(data: any): TournamentInfo {
    try {
      const id = data['id']; // string
      const pubId = data['pubId']; // string
      const gameName = data['gameName']; // string
      const totalPrize = data['totalPrize']; // string
      const moneyIn = data['moneyIn']; // number
      const prizeStructure = data['prizeStructure']; // RankAndPrize[], { rank: number; prize: string; }
      const totalPlayer = data['totalPlayer']; // number
      const remainPlayer = data['remainPlayer']; // number
      const rebuyNum = data['rebuyNum']; // number
      const addOnNum = data['addOnNum']; // number
      const addOnCost = data['addOnCost']; // string
      const buyInCost = data['buyInCost']; // string
      const rebuyList = data['rebuyList']; // string[]
      const totalChips = data['totalChips']; // number
      const blindList = data['blindList']; // BlindLevel[], { isBreak: boolean; level: number; bigBlind: number; smallBlind: number; ante: number; second: number; }
      const entryList = data['entryList']; // EntryContent[], {}
      const startTime = (data['startTime'] as Timestamp).toDate(); // Date
      const rebuyableLevel = data['rebuyableLevel'];
      const remainEntry = data['remainEntry']; // number | null
      const note = data['note']; // string
      const prevSecond = data['prevSecond']; // string
      const isPrivate = data['isPrivate'] ?? false;
      const reentryTime =
        (data['reentryTime'] as Timestamp).toDate() || new Date();

      return new TournamentInfo(
        id,
        pubId,
        gameName,
        totalPrize,
        moneyIn,
        prizeStructure,
        totalPlayer,
        remainPlayer,
        rebuyNum,
        addOnNum,
        buyInCost,
        addOnCost,
        rebuyList,
        totalChips,
        blindList,
        entryList,
        startTime,
        rebuyableLevel,
        remainEntry,
        note,
        prevSecond,
        isPrivate,
        reentryTime
      );
    } catch (error) {
      console.log(`[TournamentInfo Model] fromData e: ${error}`);
      return new TournamentInfo(
        '',
        '',
        '',
        '',
        0,
        [],
        0,
        0,
        0,
        0,
        { cost: 0, chip: 0 },
        { cost: 0, chip: 0 },
        [],
        0,
        [],
        [],
        new Date(0),
        null,
        null,
        '',
        0,
        false,
        null
      );
    }
  }
  get toMap() {
    return {
      id: this.id,
      pubId: this.pubId,
      gameName: this.gameName,
      totalPrize: this.totalPrize,
      moneyIn: this.moneyIn,
      prizeStructure: this.prizeStructure,
      totalPlayer: this.totalPlayer,
      remainPlayer: this.remainPlayer,
      rebuyNum: this.rebuyNum,
      addOnNum: this.addOnNum,
      addOnCost: this.addOnCost,
      buyInCost: this.buyInCost,
      rebuyList: this.rebuyList,
      totalChips: this.totalChips,
      blindList: this.blindList,
      entryList: this.entryList,
      startTime: this.startTime,
      rebuyableLevel: this.rebuyableLevel,
      remainEntry: this.remainEntry,
      note: this.note,
      prevSecond: this.prevSecond,
      isPrivate: this.isPrivate,
      reentryTime: this.reentryTime,
    };
  }
}

export interface EntryContent {
  nickName: string;
  cost: number;
  chip: number;
  starting: boolean;
  rebuyNum: number;
  addOnNum: number;
}

export interface RankAndPrize {
  rank: string;
  prize: string;
}
export interface CostAndChip {
  cost: number;
  chip: number;
}

export interface BlindLevel {
  isBreak: boolean;
  level: number;
  bigBlind: number;
  smallBlind: number;
  ante: number;
  second: number; // 해당 레벨의 시간
}
