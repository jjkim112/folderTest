import { Timestamp } from "firebase/firestore";
import { GameTemplate } from "./GameTemplate.model";
import { OpenDayGame } from "./OpenDayGame.model";
import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export type Link = {
  name: string;
  url: string;
};

export class PubBasic {
  name: string;
  description: string;
  phone: string;
  lat: number;
  lon: number;
  addressBasic: string;
  addressDetail: string;
  links: Link[];
  photos: string[];
  gameTemplates: GameTemplate[];
  openDayGames: OpenDayGame[];
  readyTime: Date;

  constructor(
    name: string,
    description: string,
    phone: string,
    lat: number,
    lon: number,
    addressBasic: string,
    addressDetail: string,
    links: Link[],
    photos: string[],
    gameTemplates: GameTemplate[],
    openDayGames: OpenDayGame[],
    readyTime: Date
  ) {
    this.name = name;
    this.description = description;
    this.phone = phone;
    this.lat = lat;
    this.lon = lon;
    this.addressBasic = addressBasic;
    this.addressDetail = addressDetail;
    this.links = links;
    this.photos = photos;
    this.gameTemplates = gameTemplates;
    this.openDayGames = openDayGames;
    this.readyTime = readyTime;
  }

  static fromData(data: any): PubBasic {
    try {
      const name = FirebaseTypeChange.stringFromData(data["name"]); // string;
      const description = FirebaseTypeChange.stringFromData(
        data["description"]
      ); // string;
      const phone = FirebaseTypeChange.stringFromData(data["phone"]); // string;
      const lat = FirebaseTypeChange.numberFromData(data["lat"]); // number;
      const lon = FirebaseTypeChange.numberFromData(data["lon"]); // number;
      const addressBasic = FirebaseTypeChange.stringFromData(
        data["addressBasic"]
      ); // string;
      const addressDetail = FirebaseTypeChange.stringFromData(
        data["addressDetail"]
      ); // string;
      const links = FirebaseTypeChange.anyFromData(data["links"]); // Links;
      const photos = FirebaseTypeChange.listFromData(data["photos"]); // string[];
      const gameTemplates = GameTemplate.fromListData(data["gameTemplates"]); // GameTemplate[];
      const openDayGames = OpenDayGame.fromListData(data["openDayGames"]); // OpenDayGame[];.
      const readyTime = FirebaseTypeChange.dateFromData(data["readyTime"]); // Date;

      return new PubBasic(
        name,
        description,
        phone,
        lat,
        lon,
        addressBasic,
        addressDetail,
        links,
        photos,
        gameTemplates,
        openDayGames,
        readyTime
      );
    } catch (error) {
      console.log(`[PubBasic Model] fromData e: ${error}`);
      return PubBasic.empty;
    }
  }

  get toMap() {
    return {
      name: this.name,
      description: this.description,
      phone: this.phone,
      lat: this.lat,
      lon: this.lon,
      addressBasic: this.addressBasic,
      addressDetail: this.addressDetail,
      links: this.links,
      photos: this.photos,
      gameTemplates: this.gameTemplates.map((gt) => gt.toMap),
      openDayGames: this.openDayGames.map((odg) => odg.toMap),
      readyTim: this.readyTime,
    };
  }

  static get empty() {
    return new PubBasic(
      "",
      "",
      "",
      37.5511886,
      126.9883919,
      "",
      "",
      [],
      [],
      [],
      [],
      new Date()
    );
  }

  get clone() {
    return new PubBasic(
      this.name,
      this.description,
      this.phone,
      this.lat,
      this.lon,
      this.addressBasic,
      this.addressDetail,
      this.links.map((link) => ({ ...link })),
      [...this.photos],
      this.gameTemplates.map((gt) => gt.clone),
      this.openDayGames.map((odg) => odg.clone),
      this.readyTime
    );
  }

  get isOpen(): boolean | null {
    return false;
  }
}
