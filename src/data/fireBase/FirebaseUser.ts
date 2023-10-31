import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Account } from "../../domain/account/Account.model";

export class FirebaseUser {
  static getWholeUserData = async (): Promise<Account[]> => {
    const firestore = firebase.firestore();
    const pubCol = firestore.collection("wwp_users");
    const pubDocsData = await pubCol.get();

    let tempList: Account[] = [];

    for (var oneDoc of pubDocsData.docs) {
      tempList.push(Account.fromData(oneDoc.data()));
    }

    return tempList;
  };

  static addNewUser = async (
    newUserId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newUserDoc = firestore.collection("wwp_users").doc(newUserId);
      const newUserDocData = await newUserDoc.get();
      if (!newUserDocData.exists) {
        await newUserDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebaseUser] addNewUser e: ${error}`);
      return false;
    }
  };

  // static updateUsersWithGame = async (
  //   players: GamePlayerThumb[],
  //   newId: string,
  //   pubId: string,
  //   gameTempId: string,
  //   entry: number,
  //   date: Date,
  //   note: string
  // ): Promise<boolean> => {
  //   const firestore = firebase.firestore();
  //   const userCol = firestore.collection("wwp_users");

  //   try {
  //     for (const onePlayer of players) {
  //       const userDoc = userCol.doc(onePlayer.id);
  //       const userDocSnapshot = await userDoc.get();

  //       if (userDocSnapshot.exists) {
  //         const userData = Account.fromData(userDocSnapshot.data());
  //         // userData.games.push(
  //         //   new UserGame(
  //         //     new UserGameData(
  //         //       date,
  //         //       entry,
  //         //       gameTempId,
  //         //       onePlayer.prize,
  //         //       onePlayer.rank,
  //         //       note
  //         //     ),
  //         //     newId,
  //         //     pubId
  //         //   )
  //         // );
  //         await userDoc.update(userData.toMap);
  //       } else {
  //         await userDoc.set({
  //           id: onePlayer.id,
  //           nickname: onePlayer.id,
  //           games: [
  //             {
  //               gameId: newId,
  //               pubId: pubId,
  //               datas: {
  //                 date: date,
  //                 entry: entry,
  //                 gameTempId: gameTempId,
  //                 prize: onePlayer.prize,
  //                 rank: onePlayer.rank,
  //                 note: note,
  //               },
  //             },
  //           ],
  //         });
  //       }
  //     }

  //     return true;
  //   } catch (error) {
  //     console.log(`[FirebaseUser] updateUsersWithGame e: ${error}`);
  //     return false;
  //   }
  // };

  static updateUser = async (
    UserId: string,
    updateData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updateUserDoc = firestore.collection("wwp_users").doc(UserId);
      const updateUserDocData = await updateUserDoc.get();
      if (updateUserDocData.exists) {
        await updateUserDoc.update(updateData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebaseUser] updateUser e: ${error}`);
      return false;
    }
  };
}
