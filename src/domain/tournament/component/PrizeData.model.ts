import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export class PrizeData {
  totalPrize: string;
  moneyIn: number;
  prizeStructure: RankAndPrize[];

  constructor(
    totalPrize: string,
    moneyIn: number,
    prizeStructure: RankAndPrize[]
  ) {
    this.totalPrize = totalPrize;
    this.moneyIn = moneyIn;
    this.prizeStructure = prizeStructure;
  }

  static fromData(data: any): PrizeData {
    try {
      const totalPrize = FirebaseTypeChange.stringFromData(data["totalPrize"]);
      const moneyIn = FirebaseTypeChange.numberFromData(data["moneyIn"]);
      const prizeStructure = FirebaseTypeChange.listFromData(
        data["prizeStructure"]
      );

      return new PrizeData(totalPrize, moneyIn, prizeStructure);
    } catch (error) {
      console.log(`[PrizeData Model] fromData e: ${error}`);
      return PrizeData.empty;
    }
  }

  static fromIndexedDB(data: any): PrizeData {
    try {
      // TODO
      return PrizeData.empty;
    } catch (error) {
      console.log(`[PrizeData Model] fromData e: ${error}`);
      return PrizeData.empty;
    }
  }

  get toMap() {
    return {
      totalPrize: this.totalPrize,
      moneyIn: this.moneyIn,
      prizeStructure: this.prizeStructure,
    };
  }

  get toIndexedDB() {
    return {
      totalPrize: this.totalPrize,
      moneyIn: this.moneyIn,
      prizeStructure: this.prizeStructure,
    };
  }

  static get empty() {
    return new PrizeData("", 0, []);
  }
  get clone() {
    return new PrizeData(
      this.totalPrize,
      this.moneyIn,
      this.prizeStructure.map((ps) => ({ ...ps }))
    );
  }
}

export interface RankAndPrize {
  rank: string;
  prize: string;
}
