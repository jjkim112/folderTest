import { TournamentInfo } from "src/domain/TournamentInfo.model";
// import { Game, GamePlayerThumb } from '../domain/Game.model';
// import { GameTemplate } from '../domain/GameTemplate.model';
import { Pub } from "../domain/Pub.model";
// import { User } from '../domain/User.model';
import { FirebasePub } from "./firebase/FirebasePub";
import { FirebaseUser } from "./firebase/FirebaseUser";
import { FirebaseTournament } from "./firebase/FirebaseTournament";
import { GameTemplate } from "src/domain/pub/GameTemplate.model";
import { Game } from "src/content/admin/storeAddTournament/tournamentRegister";
import { GamePlayerThumb } from "src/content/admin/storeAddTournament/tournamentRegister/detailTournaUser";
import { Account } from "src/domain/Account.model";

export class DataService {
  static fetchPubData = async (pubId: string): Promise<Pub | null> => {
    try {
      const pubData = await FirebasePub.getPubData(pubId);
      return pubData;
    } catch (e) {
      console.log(`[DataService] fetchPubData e: ${e}`);
      return null;
    }
  };

  static addPub = async (
    name: string,
    phone: string,
    address: string,
    lat: number,
    lon: number,
    links: Object[],
    photos: string[],
    days: Object,
    templates: GameTemplate[]
  ): Promise<boolean> => {
    try {
      const newId = `${Date.now()}_${name}`;
      const isSuccess = await FirebasePub.addNewPub(newId, {
        id: newId,
        name: name,
        phone: phone,
        address: address,
        lat: lat,
        lon: lon,
        links: links,
        photos: photos,
        days: days,
        templates: templates,
        customBlinds: [
          {
            isBreak: true,
            level: 0,
            bigBlind: 0,
            smallBlind: 0,
            ante: 0,
            second: 0,
          },
        ],
      });
      return isSuccess;
    } catch (e) {
      return false;
    }
  };

  static fetchWholePub = async (): Promise<Pub[]> => {
    try {
      const pubs = await FirebasePub.getWholePubData();
      return pubs;
    } catch (e) {
      console.log(`[DataService] fetchWholePub e: ${e}`);
      return [];
    }
  };

  static fetchGamesInfo = async (pubId: string): Promise<Game[]> => {
    try {
      const games = await FirebasePub.getWholeGamesData(pubId);
      return games;
    } catch (e) {
      console.log(`[DataService] fetchWholePub e: ${e}`);
      return [];
    }
  };

  static updatePubInfo = async (pubId: string): Promise<boolean> => {
    try {
      const isSuccess = await FirebasePub.updatePub(pubId, {
        name: "wwp 제주 지점!",
      });
      return isSuccess;
    } catch (e) {
      return false;
    }
  };
  static fetchWholeTournamentInfo = async (
    pubId: string | null
  ): Promise<TournamentInfo[]> => {
    if (pubId === null) return [];
    let temp: TournamentInfo[] = await FirebaseTournament.fetchWholeTournaments(
      pubId
    );
    return temp;
  };

  static fetchTournamentInfo = async (
    pubId: string,
    tId: string
  ): Promise<TournamentInfo | null> => {
    let temp = await FirebaseTournament.fetchTournamentInfo(pubId, tId);
    return temp;
  };

  static addGame = async (
    pubId: string,
    gameTempId: string,
    entry: number,
    note: string,
    players: GamePlayerThumb[]
  ): Promise<boolean> => {
    try {
      const newId = `${Date.now()}_${gameTempId}`;
      const nowDate = Date.now();
      const isSuccess = await FirebasePub.addNewGame(pubId, newId, {
        id: newId,
        pubId: pubId,
        gameTempId: gameTempId,
        entry: entry,
        date: nowDate,
        note: note,
        players: players,
      });

      // TODO 같이 움직여야하는 데이터들은 transaction 에 담아 한번에 처리가능하도록 함수 짜보기
      let isSucessUser = false;
      if (isSuccess) {
        isSucessUser = await FirebaseUser.updateUsersWithGame(
          players,
          newId,
          pubId,
          gameTempId,
          entry,

          new Date(nowDate),
          note
        );
      }

      return isSuccess && isSucessUser;
    } catch (e) {
      console.log(`[DataService] addGame e: ${e}`);
      return false;
    }
  };

  static fetchWholeUser = async (): Promise<Account[]> => {
    try {
      const users = await FirebaseUser.getWholeUserData();
      return users;
    } catch (e) {
      console.log(`[DataService] fetchWholeUser e: ${e}`);
      return [];
    }
  };
}
