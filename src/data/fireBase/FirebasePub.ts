import { Pub } from "../../domain/pub/Pub.model";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export class FirebasePub {
  static getPubData = async (pubId: string): Promise<Pub | null> => {
    try {
      const firestore = firebase.firestore();
      const pubDoc = firestore.collection("wwp_pubs").doc(pubId);
      const pubDocData = await pubDoc.get();
      if (pubDocData.exists) {
        return Pub.fromData(pubDocData.data());
      }
      return null;
    } catch (e) {
      console.log(`[FirebasePub] getPubData e: ${e}`);
      return null;
    }
  };

  static getWholePubData = async (): Promise<Pub[]> => {
    const firestore = firebase.firestore();
    const pubCol = firestore.collection("wwp_pubs");
    const pubDocsData = await pubCol.get();

    let tempList: Pub[] = [];

    for (var oneDoc of pubDocsData.docs) {
      tempList.push(Pub.fromData(oneDoc.data()));
    }

    return tempList;
  };

  // static getWholeGamesData = async (pubId: string): Promise<Game[]> => {
  //   const firestore = firebase.firestore();
  //   const pubGameCol = firestore
  //     .collection("wwp_pubs")
  //     .doc(pubId)
  //     .collection("games");
  //   const gameDocsData = await pubGameCol.get();

  //   let tempList: Game[] = [];

  //   for (var oneDoc of gameDocsData.docs) {
  //     tempList.push(Game.fromData(oneDoc.data()));
  //   }

  //   return tempList;
  // };

  static addNewPub = async (
    newPubId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newPubDoc = firestore.collection("wwp_pubs").doc(newPubId);
      const newPubDocData = await newPubDoc.get();
      if (!newPubDocData.exists) {
        await newPubDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] addNewPub e: ${error}`);
      return false;
    }
  };

  static addNewGame = async (
    pubId: string,
    newId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newGameDoc = firestore
        .collection("wwp_pubs")
        .doc(pubId)
        .collection("games")
        .doc(newId);
      const newGameDocData = await newGameDoc.get();
      if (!newGameDocData.exists) {
        await newGameDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] addNewGame e: ${error}`);
      return false;
    }
  };
  static deleteGame = async (
    pubId: string,
    gameId: string
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newGameDoc = firestore
        .collection("wwp_pubs")
        .doc(pubId)
        .collection("games")
        .doc(gameId);
      const newGameDocData = await newGameDoc.get();
      if (!newGameDocData.exists) {
        return false;
      } else {
        await newGameDoc.delete();

        return true;
      }
    } catch (error) {
      console.log(`[FirebasePub] deleteGame e: ${error}`);
      return false;
    }
  };

  static updatePub = async (
    pubId: string,
    updateData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updatePubDoc = firestore.collection("wwp_pubs").doc(pubId);
      const updatePubDocData = await updatePubDoc.get();
      if (updatePubDocData.exists) {
        await updatePubDoc.update(updateData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] updatePub e: ${error}`);
      return false;
    }
  };
}
