import { OpenDay } from './Days.model';
import { Game } from './Game.model';
import { GameTemplate } from './GameTemplate.model';

export type Links = {
  name: string;
  url: string;
};

export class Pub {
  readonly id: string;
  name: string;
  phone: string;
  address: string;
  lat: number;
  lon: number;
  links: Links[];
  photos: string[];
  days: OpenDay[];
  templates: GameTemplate[];
  games: Game[];

  constructor(
    id: string,
    name: string,
    phone: string,
    address: string,
    lat: number,
    lon: number,
    links: Links[],
    photos: string[],
    days: OpenDay[],
    templates: GameTemplate[],
    games: Game[]
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.lat = lat;
    this.lon = lon;
    this.links = links;
    this.photos = photos;
    this.days = days;
    this.templates = templates;
    this.games = games;
  }

  get clone() {
    return new Pub(
      this.id,
      this.name,
      this.phone,
      this.address,
      this.lat,
      this.lon,
      this.links,
      this.photos,
      this.days,
      this.templates,
      this.games
    );
  }
  get toMap() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      address: this.address,
      coordinate: { lat: this.lat, lon: this.lon },
      links: this.links,
      photos: this.photos,
      days: this.days.map((v) => v.toMap),
      templates: this.templates.map((v) => v.toMap),
      //   games: this.games.map((v) => v.toMap), <= sub collection
    };
  }

  static fromData(data: any): Pub {
    try {
      const id: string = data['id'];
      const name: string = data['name'];
      const phone: string = data['phone'];
      const address: string = data['address'];
      let lat: number = 0;
      let lon: number = 0;
      if (data['coordinate'] !== undefined) {
        lat = data['coordinate']['lat'] ?? 0;
        lon = data['coordinate']['lon'] ?? 0;
      }
      const links: Links[] = data['links'];
      const photos: string[] = data['photos'];
      const days: OpenDay[] = (data['days'] as []).map((v) =>
        OpenDay.fromData(v)
      );

      const templates: GameTemplate[] = (data['templates'] as []).map((v) =>
        GameTemplate.fromData(v)
      );
      //   const games: Game[] = (data["games"] as []).map((v) => Game.fromData(v));

      return new Pub(
        id,
        name,
        phone,
        address,
        lat,
        lon,
        links,
        photos,
        days,
        templates,
        []
      );
    } catch (error) {
      console.log(`[Pub Model] fromData e: ${error}`);
      return new Pub('', '', '', '', 0, 0, [], [], [], [], []);
    }
  }
}
