import { TournamentInfo } from "../../domain/tournament/TournamentInfo.model";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export class FirebaseTournament {
  static fetchTournamentInfo = async (
    pubId: string,
    tId: string
  ): Promise<TournamentInfo | null> => {
    const firestore = firebase.firestore();
    const pubDoc = firestore.collection("wwp_pubs").doc(pubId);
    const tournaDoc = pubDoc.collection("tournaments").doc(tId);
    try {
      const tData = await tournaDoc.get();
      if (tData.exists) {
        return TournamentInfo.fromData(tData.data());
      }
      return null;
    } catch (e) {
      console.log(`[FirebaseTournament] fetchTournamentInfo error : ${e}`);
      return null;
    }
  };

  static fetchWholeTournaments = async (
    pubId: string
  ): Promise<TournamentInfo[]> => {
    const firestore = firebase.firestore();
    const tournasCol = firestore
      .collection("wwp_pubs")
      .doc(pubId)
      .collection("tournaments");
    let tempList: TournamentInfo[] = [];
    try {
      const tournasData = await tournasCol.get();
      for (var oneDoc of tournasData.docs) {
        tempList.push(TournamentInfo.fromData(oneDoc.data()));
      }

      return tempList;
    } catch (e) {
      console.log(`[FirebaseTournament] fetchWholeTournaments error : ${e}`);
      return [];
    }
  };
}
