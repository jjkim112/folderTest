import { Timestamp } from 'firebase/firestore';
export class UserGameData {
  date: Date;
  entry: number;
  gameTempId: string;
  prize: number;
  rank: number;
  note: string;

  constructor(
    date: Date,
    entry: number,
    gameTempId: string,
    prize: number,
    rank: number,
    note: string
  ) {
    this.date = date;
    this.entry = entry;
    this.gameTempId = gameTempId;
    this.prize = prize;
    this.rank = rank;
    this.note = note;
  }

  get toMap() {
    return {
      date: this.date,
      entry: this.entry,
      gameTempId: this.gameTempId,
      prize: this.prize,
      rank: this.rank,
      note: this.note,
    };
  }
  static fromData(data: any): UserGameData {
    try {
      const date = (data['date'] as Timestamp).toDate();
      const entry: number = data['entry'];
      const gameTempId: string = data['gameTempId'];
      const prize: number = data['prize'];
      const rank: number = data['rank'];
      const note: string = data['note'];

      return new UserGameData(date, entry, gameTempId, prize, rank, note);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new UserGameData(new Date(0), 0, '', 0, 0, '');
    }
  }
}
