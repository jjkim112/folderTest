import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export class GameTemplate {
  readonly id: string;
  info: string;
  subTitle: string;
  title: string;
  photos: string[];

  constructor(
    id: string,
    info: string,
    subTitle: string,
    title: string,
    photos: string[]
  ) {
    this.id = id;
    this.info = info;
    this.subTitle = subTitle;
    this.title = title;
    this.photos = photos;
  }

  get toMap() {
    return {
      id: this.id,
      info: this.info,
      subTitle: this.subTitle,
      title: this.title,
      photos: this.photos,
    };
  }

  static fromListData(data: any): GameTemplate[] {
    try {
      let temp: GameTemplate[] = [];

      for (const oneData in data) {
        temp.push(GameTemplate.fromData(oneData));
      }

      return temp;
    } catch (e) {
      console.log(`[GameTemplate Model] fromListData e: ${e}`);
      return [];
    }
  }

  static fromData(data: any): GameTemplate {
    try {
      const id: string = FirebaseTypeChange.stringFromData(data["id"]);
      const info: string = FirebaseTypeChange.stringFromData(data["info"]);
      const subTitle: string = FirebaseTypeChange.stringFromData(
        data["subTitle"]
      );
      const title: string = FirebaseTypeChange.stringFromData(data["title"]);
      const photos: string[] = FirebaseTypeChange.listFromData(data["photos"]);

      return new GameTemplate(id, info, subTitle, title, photos);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return GameTemplate.empty;
    }
  }

  static get empty() {
    return new GameTemplate("", "", "", "", []);
  }
  get clone() {
    return new GameTemplate(this.id, this.info, this.subTitle, this.title, [
      ...this.photos,
    ]);
  }
}
