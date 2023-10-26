import { Pub } from "../../../domain/Pub.model";
import { useState, useEffect } from "react";
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { DataService } from "../../../data/DataService";
import { refreshGames } from "../../../reducer/gameSlice";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTap } from "../../../utils/header/header_tap";
import { refreshWithPubId } from "../../../reducer/userSlice";
import MapTest from "src/utils/map/Map";
import { inputTournament } from "src/reducer/pubSlice";
import { EntryData } from "src/domain/tournament/EntryData.model";
import { GameTemplate } from "src/domain/pub/GameTemplate.model";
type Section = {
  label: string;
};
const tabs: Section[] = [
  {
    label: "토너먼트",
  },
  {
    label: "랭킹",
  },
  {
    label: "정보",
  },
];

export default function HoldemPubOnePage() {
  const id = useParams().id;
  const nowTime = new Date();
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);
  const tournaments = useSelector((state: RootState) => state.pub.tournaments);
  const customUsersData = useSelector(
    (state: RootState) => state.user.customUsers
  );
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const [visibility, setVisibility] = useState<boolean[]>(
    new Array(7).fill(false)
  );
  const [tournamentInfo, setTournamentInfo] = useState<boolean[]>(
    new Array(7).fill(false)
  );

  const toggleVisibility = (index: number) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };
  const toggleTournamentInfo = (index: number) => {
    const newVisibility = [...tournamentInfo];
    newVisibility[index] = !newVisibility[index];
    setTournamentInfo(newVisibility);
  };

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
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [count, setCount] = useState(0);
  const [filteredGameData, setFilteredGameData] = useState([]);

  useEffect(() => {
    goToPubPage();
    initFunc();
  }, []);
  const initFunc = async () => {
    refreshTournaments();
  };
  const refreshTournaments = async () => {
    const tList = await DataService.fetchWholeTournamentInfo(id);
    for (var t of tList) {
      dispatch(inputTournament(t));
    }
  };

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

  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneHourMs = 60 * 60 * 1000;
  const oneMinuteMs = 60 * 1000;

  const timeHMSChange = (difference) => {
    let remainingHours = Math.floor((difference % oneDayMs) / oneHourMs)
      .toString()
      .padStart(2, "0");
    let remainingMinutes = Math.floor((difference % oneHourMs) / oneMinuteMs)
      .toString()
      .padStart(2, "0");
    let remainingSeconds = Math.floor((difference % oneMinuteMs) / 1000)
      .toString()
      .padStart(2, "0");
    return `${remainingHours} : ${remainingMinutes}  : ${remainingSeconds}`;
  };
  const timeMSChange = (difference) => {
    let remainingMinutes = Math.floor(difference / 60)
      .toString()
      .padStart(2, "0");
    let remainingSeconds = Math.floor(difference % 60)
      .toString()
      .padStart(2, "0");
    return ` ${remainingMinutes}  : ${remainingSeconds}`;
  };

  const _getGameTemp = (pubId: string, tempId: string): GameTemplate | null => {
    for (const onePub of pubsData) {
      if (onePub.id === pubId) {
        for (const gt of onePub.basicInfo.gameTemplates) {
          if (gt.id === tempId) {
            return gt;
          }
        }
        return null;
      }
    }
    return null;
  };

  const getLevel = (index: number): number => {
    const blindList = tournaments[index].blindList ?? [];
    let temp = tournaments[index].prevSecond ?? 0; // 500, 700, 1300
    let count = 0;
    for (var b of blindList) {
      if (temp >= b.second) {
        temp -= b.second;
        count++;
      } else {
        break;
      }
    }
    return count;
  };

  if (pickPub != null) {
    return (
      <div key={`${pickPub.id}detail`} className=" w-full text-white">
        <div className="p-4 bg-slate-700 rounded-lg shadow-lg text-white">
          <button
            className="border-2 bg-white text-slate-700 font-bold p-3 rounded-lg mb-4"
            onClick={() => {
              navigate("/holdem-pub");
            }}
          >
            ⬅️ 돌아가기
          </button>
          <div className="flex flex-col md:flex-row items-center gap-x-8 pb-3">
            <img
              className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg"
              src={pickPub.basicInfo.photos[0]}
              alt="상점 이미지"
            />
            <div className="flex flex-col justify-center mt-4 md:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
                {pickPub.basicInfo.name}
              </h2>
              <div className="text-base md:text-lg mt-2">
                <h3 className="flex items-center gap-x-2">
                  <AiFillPhone className="inline" />
                  <span>{pickPub.basicInfo.phone}</span>
                </h3>
                <h3 className="flex items-center gap-x-2 mt-4">
                  <AiFillEnvironment className="inline" />
                  <span>{pickPub.basicInfo.addressBasic}</span>
                </h3>
              </div>
              <div className="flex flex-row items-center justify-center md:justify-start mt-4 space-x-4">
                <a href={pickPub.basicInfo.links[1].url}>
                  <img
                    className="w-[50px] rounded-full shadow-lg hover:opacity-80 transition-opacity duration-300 ease-in-out"
                    src="/assets/images/icon-instagram.png"
                    alt="인스타그램 링크"
                  />
                </a>
                <a href={pickPub.basicInfo.links[0].url}>
                  <img
                    className="w-[50px] rounded-full shadow-lg hover:opacity-80 transition-opacity duration-300 ease-in-out"
                    src="/assets/images/icon-kakao.png"
                    alt="카카오톡 링크"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <HeaderTap content={tabs} activeTab={setActiveHeaderTab} />
        <div className=" h-full">
          {activeHeaderTab === 0 && (
            <div className="">
              <div className="flex flex-col w-full h-full ">
                {tournaments.map((value, i) => (
                  <div className="flex flex-col border-b-2 border-amber-100">
                    <div
                      className="flex flex-row w-full h-[100px]  px-2"
                      onClick={() => toggleTournamentInfo(i)}
                    >
                      {value.generalData.startTime >= nowTime && (
                        <div className="flex flex-col justify-center text-center w-[30%] rounded-3xl bg-green-500 my-2  text-xs">
                          <div className="  ">{"등록 까지"}</div>
                          <div className=" ">{" 남은 시간"}</div>
                          <div className="  ">
                            <div>
                              {timeHMSChange(
                                value.generalData.startTime.getTime() -
                                  nowTime.getTime()
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {value.generalData.startTime < nowTime ? (
                        nowTime < value.entryData.reBuyableTime ? (
                          <div className="flex flex-col justify-center text-center w-[30%] rounded-3xl bg-red-500 my-2  text-xs">
                            <div className="  ">{"추가 등록 까지"}</div>
                            <div className=" ">{" 남은 시간"}</div>
                            <div className="  ">
                              <div>
                                {timeHMSChange(
                                  value.entryData.reBuyableTime.getTime() -
                                    nowTime.getTime()
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center text-center w-[30%] rounded-3xl bg-gray-500 my-2  text-xs">
                            <div className="  ">{"진행 중 or 끝남"}</div>
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                      <div className="flex flex-col justify-center text-start w-[70%]   my-2 ml-1 ">
                        <div className="w-full h-full  ">
                          {value.generalData.gameName}
                        </div>
                        <div className="w-full h-full  ">
                          {value.generalData.startTime.toLocaleString()}
                        </div>
                        <div>
                          {"상금 : "}
                          {value.prizeData.totalPrize}
                        </div>
                        <div className="flex flex-row justify-center text-start  w-full">
                          <div className="w-[50%]">
                            {"바이인 : "}
                            {value.generalData.buyInCost.cost}
                          </div>
                          <div className="w-[50%]">
                            {"현재 인원 : "}
                            {value.entryData.remainPlayer}/
                            {EntryData.getTotalPlayer(
                              value.entryData.entryList
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {tournamentInfo[i] && (
                      <div
                        className="w-full h-full flex flex-col p-2"
                        onClick={() => toggleTournamentInfo(i)}
                      >
                        <div className="flex flex-row w-full h-full pb-2">
                          <div className="flex flex-col w-[20%] justify-center text-center border-2">
                            <div>플레이어</div>
                            <div>
                              {value.entryData.remainPlayer}/
                              {EntryData.getTotalPlayer(
                                value.entryData.entryList
                              )}
                            </div>
                            <div>평균 칩</div>
                            <div>
                              {value.entryData.remainPlayer !== 0
                                ? Math.floor(
                                    EntryData.getTotalCostAndChip(
                                      value.entryData.entryList
                                    ).cost / value.entryData.remainPlayer
                                  )
                                : 0}
                            </div>
                          </div>
                          <div className="flex flex-col w-[60%] justify-center text-center border-2 mx-2">
                            <div>{`LV.${
                              value.blindList[getLevel(i)].level
                            }`}</div>
                            <div>{timeMSChange(value.prevSecond)}</div>
                            <div>{`${
                              value.blindList[getLevel(i)].smallBlind
                            }/ ${value.blindList[getLevel(i)].bigBlind}(${
                              value.blindList[getLevel(i)].ante
                            })`}</div>
                            <div>
                              {value.blindList[getLevel(i) + 1].smallBlind &&
                                `${
                                  value.blindList[getLevel(i) + 1].smallBlind
                                }/ ${
                                  value.blindList[getLevel(i) + 1].bigBlind
                                }(${value.blindList[getLevel(i) + 1].ante})`}
                            </div>
                          </div>
                          <div className="flex flex-col w-[20%] justify-center text-center border-2">
                            <div>총 상금</div>
                            <div>{value.prizeData.totalPrize}</div>
                            <div>1위</div>
                            <div>{value.prizeData.prizeStructure[0].prize}</div>
                          </div>
                        </div>
                        {value.generalData.note && (
                          <div className="border-2 p-2">
                            {value.generalData.note}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeHeaderTab === 1 && (
            <div className="p-2">
              <div>
                <div className="text-3xl">플레이어 순위</div>
                <div className="flex justify-center my-8">
                  <table className=" table-fixed w-full  rounded-lg overflow-hidden  ">
                    <thead>
                      <tr className="bg-[#2b3647] text-lg  ">
                        <th className="w-1/4 py-2 ">총 상금</th>
                        <th className="w-1/4 py-2">닉네임</th>
                        <th className="w-1/4 py-2">점수</th>
                        <th className="w-1/4 py-2">머니인</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customUsersData.map((ranking) => (
                        <tr
                          key={`Ranking-${ranking.id}`}
                          className="text-center text-xs  odd:bg-[#2d394bd1] even:bg-[#303950f7]"
                        >
                          <td className="w-1/4 py-2">{`${(
                            ranking.totalPrize / 10000
                          ).toLocaleString("ko-KR")}만원`}</td>
                          <td className="w-1/4 py-2">{ranking.id}</td>
                          <td className="w-1/4 py-2">
                            {ranking.howManyFirstRank}
                          </td>
                          <td className="w-1/4 py-2">
                            {ranking.howManyMoneyIn}
                          </td>
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
                            key={`GameId-${game.id}`}
                            className={`${
                              filteredGameData.length !== 0
                                ? selectedTournamentId === game.id
                                  ? "border-2"
                                  : ""
                                : ""
                            } text-center text-xs   odd:bg-[#2d394bd1] even:bg-[#303950f7] hover:cursor-pointer`}
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
                            <td className="w-1/4 py-2">
                              {game.players[0].name}
                            </td>
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
                        <th className="w-1/4 py-2">상금</th>
                        <th className="w-1/4 py-2">닉네임 </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGameData.map((game, i) =>
                        game.players.map((player) => {
                          return (
                            <tr
                              key={`${player.id}dsadsadsa`}
                              className="text-center text-xs  odd:bg-[#2d394bd1] even:bg-[#303950f7]"
                            >
                              <td className="w-1/4 py-2">
                                {_getGameTemp(
                                  pickPub?.id ?? "",
                                  game.gameTempId
                                )?.title ?? "존재하지 않음"}
                              </td>
                              <td className="w-1/4 py-2"> {player.rank}</td>
                              <td className="w-1/4 py-2">
                                {`${(player.prize / 10000).toLocaleString(
                                  "ko-KR"
                                )}만원`}
                              </td>

                              <td className="w-1/4 py-2">{player.name}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeHeaderTab === 2 && (
            <div className="h-full p-2">
              <div className="border-2 p-3 mb-2">
                {pickPub.basicInfo.description}
              </div>
              <div>요일 별 오픈 토너먼트</div>
              <div className="py-2">
                {/* {pickPub.days.map((daysValue, daysIndex) => (
                  <div key={daysIndex} className="py-2">
                    {visibility[daysIndex] ? (
                      <h1 onClick={() => toggleVisibility(daysIndex)}>
                        <AiFillCaretUp className="inline" />{" "}
                        {`  ${daysValue.day}`}
                      </h1>
                    ) : (
                      <h1 onClick={() => toggleVisibility(daysIndex)}>
                        <AiFillCaretDown className="inline" />
                        {`  ${daysValue.day}`}
                      </h1>
                    )}
                    {visibility[daysIndex] &&
                      daysValue.games.map((gamesValue, gamesIndex) => (
                        <div key={`${gamesIndex}_${gamesValue.length}`}>
                          <div>
                            {pickPub.templates.map(
                              (templatesValue, templatesIndex) =>
                                templatesValue.id === gamesValue ? (
                                  <div
                                    key={templatesIndex}
                                    className="flex flex-col justify-center text-center py-1 pb-4"
                                  >
                                    <div className="bg-slate-800 rounded-tr-md  rounded-tl-md py-4">
                                      {templatesValue.title}
                                    </div>
                                    <div className="bg-slate-800 py-4">
                                      {templatesValue.subTitle}
                                    </div>
                                    <div className="bg-slate-800 rounded-br-md  rounded-bl-md py-4">
                                      {templatesValue.info}
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ))} */}
              </div>
              <MapTest
                lat={pickPub.basicInfo.lat}
                lon={pickPub.basicInfo.lon}
              ></MapTest>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페인지 접근 입니다.</div>
        <br />
        <button className="bg-white" onClick={() => navigate("/holdem-pub")}>
          이전페이지로{" "}
        </button>
      </div>
    );
  }
}
