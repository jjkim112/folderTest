import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export class OpenDayGame {
  startTime: string; // 16:30
  endTime: string; // 03:30
  gameTempIds: string[];

  constructor(startTime: string, endTime: string, gameTempIds: string[]) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.gameTempIds = gameTempIds;
  }

  get toMap() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      gameTempIds: this.gameTempIds,
    };
  }

  static fromListData(data: any): OpenDayGame[] {
    try {
      let temp: OpenDayGame[] = [];

      for (const oneData in data) {
        temp.push(OpenDayGame.fromData(oneData));
      }

      return temp;
    } catch (e) {
      console.log(`[OpenDayGame Model] fromListData e: ${e}`);
      return [];
    }
  }

  static fromData(data: any): OpenDayGame {
    try {
      const startTime = FirebaseTypeChange.stringFromData(data["startTime"]);
      const endTime = FirebaseTypeChange.stringFromData(data["endTime"]);
      const gameTempIds = FirebaseTypeChange.listFromData(data["gameTempIds"]);

      return new OpenDayGame(startTime, endTime, gameTempIds);
    } catch (error) {
      console.log(`[OpenDayGame Model] fromData e: ${error}`);
      return OpenDayGame.empty;
    }
  }

  static get empty() {
    return new OpenDayGame("00:00", "00:00", []);
  }
  get clone() {
    return new OpenDayGame(this.startTime, this.endTime, [...this.gameTempIds]);
  }

  static dateToStr(date: Date): string {
    return `${date.getHours.toString().padStart(2, "0")}:${date.getMinutes
      .toString()
      .padStart(2, "0")}`;
  }

  static getHMFromStr(v: string): number[] | null /* 12:30 => [ 12, 30 ] */ {
    if (v[2] !== ":") {
      return null;
    }
    const hour: number = Number(`${v[0]}${v[1]}`);
    const minute: number = Number(`${v[3]}${v[4]}`);

    return [hour, minute];
  }

  static isLastLater(a: number[], b: number[]): boolean {
    if (a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1])) {
      return true;
    }
    return false;
  }
}
