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
  static fromData(data: any): GameTemplate {
    try {
      const id: string = data['id'];
      const info: string = data['info'];
      const subTitle: string = data['subTitle'];
      const title: string = data['title'];
      const photos: string[] = data['photos'] ?? [];

      return new GameTemplate(id, info, subTitle, title, photos);
    } catch (error) {
      console.log(`[GameTemplate Model] fromData e: ${error}`);
      return new GameTemplate('', '', '', '', []);
    }
  }
}
