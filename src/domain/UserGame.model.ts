import { UserGameData } from './UserGameData.model';

export class UserGame {
  datas: UserGameData;
  readonly gameId: string; //토너먼트 아이디
  readonly pubId: string; //지점 아이디

  constructor(datas: UserGameData, gameId: string, pubId: string) {
    this.datas = datas;
    this.gameId = gameId;
    this.pubId = pubId;
  }

  get toMap() {
    return {
      datas: this.datas.toMap,
      gameId: this.gameId,
      pubId: this.pubId,
    };
  }

  static fromData(data: any): UserGame {
    try {
      const datas = data['datas'];
      const gameId = data['gameId'];
      const pubId = data['pubId'];
      return new UserGame(UserGameData.fromData(datas), gameId, pubId);
    } catch (error) {
      var errorGameData = new UserGameData(new Date(0), 0, '', 0, 0, '');
      console.log(`[UserGames Model] fromData e: ${error}`);
      return new UserGame(errorGameData, '', '');
    }
  }
}

export interface GamePlayerThumb {
  id: string;
  prize: number;
  rank: number;
}
