import { AccountBasic } from "./component/AccountBasic.model";
import { AccountPoint } from "./component/AccountPoint.model";
import { FirebaseTypeChange } from "../../util/commonFunc/firebase/FirebaseTypeChange";

export class Account {
  readonly id: string;
  pubs: string[];
  basicInfo: AccountBasic;
  pointInfo: AccountPoint;

  constructor(
    id: string,
    pubs: string[],
    basicInfo: AccountBasic,
    pointInfo: AccountPoint
  ) {
    this.id = id;
    this.pubs = pubs;
    this.basicInfo = basicInfo;
    this.pointInfo = pointInfo;
  }

  get toMap() {
    return {
      id: this.id,
      pubs: this.pubs,
      ...this.basicInfo.toMap,
      ...this.pointInfo.toMap,
    };
  }

  static fromData(data: any): Account {
    try {
      const id = FirebaseTypeChange.stringFromData(data["id"]); // string,
      const pubs = FirebaseTypeChange.listFromData(data["pubs"]); // string[],
      const basicInfo = AccountBasic.fromData(data); // AccountBasic,
      const pointInfo = AccountPoint.fromData(data); // AccountPoint

      return new Account(id, pubs, basicInfo, pointInfo);
    } catch (error) {
      console.log(`[Account Model] fromData e: ${error}`);
      return Account.empty;
    }
  }
  static get empty() {
    return new Account("", [], AccountBasic.empty, AccountPoint.empty);
  }
}
