import { Timestamp } from 'firebase/firestore';
import { BlindLevel } from './TournamentInfo.model';
import { FirebaseTypeChange } from './utils/FirebaseTypeChange';

export class PubCustomBilnd {
  id: string;

  blindList: BlindLevel[]; // blind 레벨 정보

  constructor(id: string, blindList: BlindLevel[]) {
    this.id = id;

    this.blindList = blindList;
  }

  static fromData(data: any): PubCustomBilnd {
    try {
      const id = FirebaseTypeChange.stringFromData(data['id']); // string
      const blindList = FirebaseTypeChange.listFromData(data['blindList']); // BlindLevel[], { isBreak: boolean; level: number; bigBlind: number; smallBlind: number; ante: number; second: number; }

      return new PubCustomBilnd(id, blindList);
    } catch (error) {
      console.log(`[TournamentInfo Model] fromData e: ${error}`);
      return new PubCustomBilnd('', []);
    }
  }
  get toMap() {
    return {
      id: this.id,
      blindList: this.blindList,
    };
  }
}
