import { FirebaseTypeChange } from '../utils/FirebaseTypeChange';

interface PubPointInfo {
  pubId: string;
  point: number;
}

export class AccountPoint {
  showdownPoint: number;
  //   pubWallets: PubPointInfo[];
  //   editPermissionAccounts: string[];
  //   lastUpdate: Date;
  //   payHistory: PayTransaction[]
  constructor(showdownPoint: number) {
    this.showdownPoint = showdownPoint;
  }

  static fromData(data: any): AccountPoint {
    try {
      const showdownPoint = FirebaseTypeChange.numberFromData(
        data['showdownPoint']
      );

      return new AccountPoint(showdownPoint);
    } catch (error) {
      console.log(`[AccountPoint Model] fromData e: ${error}`);
      return AccountPoint.empty;
    }
  }

  static get empty() {
    return new AccountPoint(0);
  }

  get toMap() {
    return {
      showdownPoint: this.showdownPoint,
    };
  }
  get clone() {
    return new AccountPoint(this.showdownPoint);
  }
}
