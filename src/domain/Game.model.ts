import { Timestamp } from "firebase/firestore";

export class Game {
  map(
    arg0: (game: any, i: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode {
    throw new Error("Method not implemented.");
  }
  readonly id: string;
  readonly pubId: string;
  readonly gameTempId: string;

  entry: number;
  date: Date;
  players: GamePlayerThumb[];

  constructor(
    id: string,
    pubId: string,
    gameTempId: string,
    entry: number,
    date: Date,
    players: GamePlayerThumb[]
  ) {
    this.id = id;
    this.pubId = pubId;
    this.gameTempId = gameTempId;
    this.entry = entry;
    this.date = date;
    this.players = players;
  }

  get toMap() {
    return {
      id: this.id,
      pubId: this.pubId,
      gameTempId: this.gameTempId,
      entry: this.entry,
      date: this.date,
      players: this.players,
    };
  }

  static fromData(data: any): Game {
    try {
      const id = data["id"];
      const pubId = data["pubId"];
      const gameTempId = data["gameTempId"];
      const entry = data["entry"];
      const date = (data["date"] as Timestamp).toDate();
      const players = data["players"];

      return new Game(id, pubId, gameTempId, entry, date, players);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new Game("", "", "", 0, new Date(0), []);
    }
  }
}

export interface GamePlayerThumb {
  id: string;
  prize: number;
  rank: number;
}
