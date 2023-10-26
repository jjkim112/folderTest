import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import { User } from '../../domain/User.model';
// import { UserGame } from '../../domain/UserGame.model';
// import { UserGameData } from '../../domain/UserGameData.model';
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import "./home.css";
import { Game } from "../admin/storeAddTournament/tournamentRegister";

function HomePage() {
  return (
    <div className="relative h-full w-full flex flex-col justify-center ">
      <div className="main-container">
        <img
          src="/assets/images/wp_title.gif"
          alt="Descriptionimage"
          className="logo"
        />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: 20,

            width: "70%",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색을해보세용"
            inputProps={{ "aria-label": "검색을해보세용" }}
          />
        </Paper>
      </div>
    </div>
  );
}
const TestBtn = () => {
  const _testFunc = async () => {
    const firestore = firebase.firestore();
    const pubsCol = firestore.collection("wwp_pubs");
    const pubsDocs = await pubsCol.get();

    const userCol = firestore.collection("wwp_users");

    for (const pubDoc of pubsDocs.docs) {
      const pubGameCol = pubsCol.doc(pubDoc.id).collection("games");
      const pubGameDocs = await pubGameCol.get();
      for (const onePubGameDoc of pubGameDocs.docs) {
        const oneGame: Game = Game.fromData(onePubGameDoc.data());
        for (const player of oneGame.players) {
          const playerDoc = userCol.doc(player.id);
          const playerDocSnapshot = await playerDoc.get();
          if (playerDocSnapshot.exists) {
            // // const userData = User.fromData(playerDocSnapshot.data());
            // // userData.games.push(
            // //   new UserGame(
            // //     new UserGameData(
            // //       oneGame.date,
            // //       oneGame.entry,
            // //       oneGame.gameTempId,
            // //       player.prize,
            // //       player.rank,
            // //       ''
            // //     ),
            // //     oneGame.id,
            // //     pubDoc.id
            // //   )
            // // );
            // await playerDoc.update(userData.toMap);
          } else {
            await playerDoc.set({
              id: player.id,
              nickname: player.id,
              games: [
                {
                  gameId: oneGame.id,
                  pubId: pubDoc.id,
                  datas: {
                    date: oneGame.date,
                    entry: oneGame.entry,
                    gameTempId: oneGame.gameTempId,
                    prize: player.prize,
                    rank: player.rank,
                  },
                },
              ],
            });
          }
        }
      }
    }
  };
  return (
    <button className="red bg-red-50" onClick={_testFunc}>
      테스트 버튼
    </button>
  );
};

const HomeTitle = () => {
  return (
    <img
      className="w-4/5 mb-12 pt-12 mx-auto"
      src="/assets/images/wp_title.gif"
      alt=""
    />
  );
};

type BasicBtnProps = {
  name: string;
  route: string;
};
const BasicBtn = ({ name, route }: BasicBtnProps) => {
  let navigate = useNavigate();
  const movePage = (route: string) => {
    navigate(route);
  };

  return (
    <button
      className="block hover:bg-red-200 shadow-xl rounded-full bg-white 
     border-2 border-gray-400 cursor-pointer px-4 py-2 mx-auto my-8"
      onClick={() => {
        movePage(route);
      }}
    >
      {name ?? ""}
    </button>
  );
};

export default HomePage;
