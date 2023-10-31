// import { OpenDay } from "./Days.model";
// import { Game } from "./Game.model";
// import { GameTemplate } from "./GameTemplate.model";

import { BlindLevel, TournamentInfo } from './TournamentInfo.model';
import { PubBasic } from './pub/PubBasic.model';
import { FirebaseTypeChange } from './utils/FirebaseTypeChange';

export type Links = {
  name: string;
  url: string;
};

export class Pub {
  readonly id: string;
  ownerId: string;
  basicInfo: PubBasic;
  games: TournamentInfo[];

  constructor(
    id: string,
    ownerId: string,
    basicInfo: PubBasic,
    games: TournamentInfo[]
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.basicInfo = basicInfo;
    this.games = games;
  }

  get clone() {
    return new Pub(
      this.id,
      this.ownerId,
      this.basicInfo.clone,
      this.games.map((game) => game.clone)
    );
  }

  get toMap() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      ...this.basicInfo.toMap,
      // games: [] sub-col
    };
  }

  static fromData(data: any): Pub {
    try {
      const id = FirebaseTypeChange.stringFromData(data['id']); // string;
      const ownerId = FirebaseTypeChange.stringFromData(data['ownerId']); // string;
      const basicInfo = PubBasic.fromData(data); // PubBasic;
      // const games = TournamentInfo.fromListData(data["games"]); // TournamentInfo[];

      return new Pub(id, ownerId, basicInfo, []);
    } catch (error) {
      console.log(`[Pub Model] fromData e: ${error}`);

      return Pub.empty;
    }
  }

  static get empty() {
    return new Pub('', '', PubBasic.empty, []);
  }
}
