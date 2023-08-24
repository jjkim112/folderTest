import { useState, useEffect } from "react";
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DataService } from "src/data/DataService";
import { GameTemplate } from "src/domain/GameTemplate.model";
import { Pub } from "src/domain/Pub.model";
import { refreshGames } from "src/reducer/gameSlice";
import { refreshWithPubId } from "src/reducer/userSlice";
import { AppDispatch, RootState } from "src/store/store";

type Section = {
  label: string;
};
const tabs: Section[] = [
  {
    label: "랭킹",
  },
  {
    label: "정보",
  },
];

export default function GuestInfoEditMain() {
  const id = useParams().id;
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);
  const customUsersData = useSelector(
    (state: RootState) => state.user.customUsers
  );
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const goToPubPage = async () => {
    pubsData.map((v, i) => {
      if (v.id === id) {
        setPickPub(v);
      }
    });

    const getGameData = await DataService.fetchGamesInfo(id!);
    dispatch(refreshGames(getGameData));
    dispatch(refreshWithPubId(id!));
  };
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [count, setCount] = useState(0);
  const [filteredGameData, setFilteredGameData] = useState([]);
  useEffect(() => {
    goToPubPage();
  }, []);
  useEffect(() => {
    // filteredGameData를 갱신
    if (selectedTournamentId !== null) {
      const filteredData = gamesData.filter(
        (game) => game.id === selectedTournamentId
      );

      setFilteredGameData(filteredData);
    } else {
      setFilteredGameData([]);
    }
  }, [selectedTournamentId, gamesData]);
  const _getGameTemp = (pubId: string, tempId: string): GameTemplate | null => {
    for (const onePub of pubsData) {
      if (onePub.id === pubId) {
        for (const gt of onePub.templates) {
          if (gt.id === tempId) {
            return gt;
          }
        }
        return null;
      }
    }
    return null;
  };

  if (pickPub != null) {
    return (
      <div key={`${pickPub.id}detail`} className=" w-full text-white">
        <div className="p-2">
          <button
            className="border-2 bg-blue-700 text-black font-bold p-3 rounded-lg "
            onClick={() => {
              navigate(-1);
            }}
          >
            ⬅️ 돌아가기
          </button>
        </div>

        <div className="p-2">
          <div>
            <div className="text-3xl">플레이어 순위</div>
            <div className="flex justify-center my-8">
              <table className=" table-fixed w-full  rounded-lg overflow-hidden  ">
                <thead>
                  <tr className="bg-[#2b3647] text-lg  ">
                    <th className="w-1/4 py-2 ">총 상금</th>
                    <th className="w-1/4 py-2">닉네임</th>
                    <th className="w-1/4 py-2">랭크</th>
                    <th className="w-1/4 py-2">머니인 횟수</th>
                  </tr>
                </thead>
                <tbody>
                  {customUsersData.map((ranking) => (
                    <tr
                      key={ranking.id}
                      className="text-center text-lg  odd:bg-[#2d394bd1] even:bg-[#303950f7]"
                    >
                      <td className="w-1/4 py-2">{`${(
                        ranking.totalPrize / 10000
                      ).toLocaleString("ko-KR")}만원`}</td>
                      <td className="w-1/4 py-2">{ranking.id}</td>
                      <td className="w-1/4 py-2">{ranking.howManyFirstRank}</td>
                      <td className="w-1/4 py-2">{ranking.howManyMoneyIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-2xl">토너먼트 우승자</div>
            <div className="flex justify-center my-8">
              <table className=" table-fixed w-full  rounded-lg overflow-hidden  ">
                <thead>
                  <tr className="bg-[#2b3647] text-lg  ">
                    <th className="w-1/4 py-2 ">토너먼트</th>
                    <th className="w-1/4 py-2">엔트리</th>
                    <th className="w-1/4 py-2">일시</th>
                    <th className="w-1/4 py-2">우승자 </th>
                  </tr>
                </thead>
                <tbody>
                  {gamesData.map((game, i) => {
                    return (
                      <tr
                        key={game.id}
                        className={`text-center text-lg  odd:bg-[#2d394bd1] even:bg-[#303950f7] hover:cursor-pointer`}
                        onClick={() => {
                          if (selectedTournamentId !== game.id) {
                            setSelectedTournamentId(game.id);

                            setCount(0);
                          } else {
                            if (count > 0) {
                              const filteredData = gamesData.filter(
                                (game) => game.id === selectedTournamentId
                              );
                              setFilteredGameData(filteredData);
                              setCount(0);
                            } else {
                              setCount((prevNumber) => prevNumber + 1);
                              setFilteredGameData([]);
                            }
                          }
                        }}
                      >
                        <td className="w-1/4 py-2">
                          {_getGameTemp(pickPub?.id ?? "", game.gameTempId)
                            ?.title ?? "존재하지 않음"}
                        </td>
                        <td className="w-1/4 py-2"> {game.entry}</td>
                        <td className="w-1/4 py-2">
                          {game.date.toUTCString()}
                        </td>
                        <td className="w-1/4 py-2">{game.players[0].id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-2xl">
              토너먼트 히스토리(위에 토너먼트 클릭시 화면에 표시)
            </div>

            <div className="flex justify-center my-8">
              <table className=" table-fixed w-full  rounded-lg overflow-hidden  ">
                <thead>
                  <tr className="bg-[#2b3647] text-lg  ">
                    <th className="w-1/4 py-2 ">토너먼트</th>
                    <th className="w-1/4 py-2">등수</th>
                    <th className="w-1/4 py-2">획득금액</th>
                    <th className="w-1/4 py-2">닉네임 </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGameData.map((game, i) =>
                    game.players.map((player) => {
                      return (
                        <tr
                          key={`${player.id}dsadsadsa`}
                          className="text-center text-lg  odd:bg-[#2d394bd1] even:bg-[#303950f7]"
                        >
                          <td className="w-1/4 py-2">
                            {_getGameTemp(pickPub?.id ?? "", game.gameTempId)
                              ?.title ?? "존재하지 않음"}
                          </td>
                          <td className="w-1/4 py-2"> {player.rank}</td>
                          <td className="w-1/4 py-2">{`${(
                            player.prize / 10000
                          ).toLocaleString("ko-KR")}만원`}</td>
                          <td className="w-1/4 py-2">{player.id}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페인지 접근 입니다.</div>
        <br />
        <button className="bg-white" onClick={() => navigate("/admin/")}>
          이전페이지로
        </button>
      </div>
    );
  }
}
