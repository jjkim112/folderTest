import { Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
export class Game {
  id: string;
  pubId: string;
  gameTempId: string;
  title: string;
  subTitle: string;
  description: string;
  note: string;
  entry: number;
  date: Date;
  totalReward: string;

  players: GamePlayerThumb[];

  constructor(
    id: string,
    pubId: string,
    gameTempId: string,
    title: string,
    subTitle: string,
    description: string,
    note: string,
    entry: number,
    date: Date,
    totalReward: string,
    players: GamePlayerThumb[]
  ) {
    this.id = id;
    this.pubId = pubId;
    this.gameTempId = gameTempId;
    this.title = title;
    this.subTitle = subTitle;
    this.description = description;
    this.note = note;
    this.entry = entry;
    this.date = date;
    this.totalReward = totalReward;
    this.players = players;
  }

  get clone() {
    return new Game(
      this.id,
      this.pubId,
      this.gameTempId,
      this.title,
      this.subTitle,
      this.description,
      this.note,
      this.entry,
      this.date,
      this.totalReward,
      this.players
    );
  }

  get toMap() {
    return {
      id: this.id || '',
      pubId: this.pubId || '',
      gameTempId: this.gameTempId || '',
      title: this.title || '',
      subTitle: this.subTitle || '',
      description: this.description || '',
      note: this.note || '',
      entry: this.entry || 0,
      date: firebase.firestore.Timestamp.fromDate(this.date),
      totalReward: this.totalReward || '',
      players:
        this.players && Array.isArray(this.players)
          ? // Make sure each player object does not contain undefined values
            // If the player object is not defined, assign an empty array
            this.players.map((v) => ({
              id: v.id || '',
              name: v.name || '',
              prize: v.prize || '',
              note: v.note || '',
              rank: v.rank || '',
            }))
          : [],
    };
  }

  static fromData(data: any): Game {
    try {
      const id = data['id'];
      const pubId = data['pubId'];
      const gameTempId = data['gameTempId'];
      const title = data['title'];
      const subTitle = data['subTitle'];
      const description = data['description'];
      const note = data['note'];
      const entry = data['entry'];
      const date = (data['date'] as Timestamp).toDate();
      const totalReward = data['totalReward'];
      const players = data['players'];

      return new Game(
        id,
        pubId,
        gameTempId,
        title,
        subTitle,
        description,
        note,
        entry,
        date,
        totalReward,
        players
      );
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new Game('', '', '', '', '', '', '', 0, new Date(0), '', []);
    }
  }
}

export interface GamePlayerThumb {
  id: string;
  name: string;
  prize: number;
  note: string;
  rank: number;
}
