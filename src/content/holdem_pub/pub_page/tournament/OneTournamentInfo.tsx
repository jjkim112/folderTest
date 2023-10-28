import React, { useEffect, useState } from "react";
import { BlindLevel, TournamentInfo } from "src/domain/TournamentInfo.model";
import { EntryData } from "src/domain/tournament/EntryData.model";
import { PrizeData } from "src/domain/tournament/PrizeData.model";
import { FormatText } from "src/utils/format_text";

interface OneTournamentInfoProps {
  tournament: TournamentInfo;
  isClick: boolean;
  toggleTournamentInfo: (tId: string | null) => void;
}

const oneDayMs = 24 * 60 * 60 * 1000;
const oneHourMs = 60 * 60 * 1000;
const oneMinuteMs = 60 * 1000;

const timeHMSChange = (difference: number) => {
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
const timeMSChange = (difference: number) => {
  let remainingMinutes = Math.floor(difference / 60)
    .toString()
    .padStart(2, "0");
  let remainingSeconds = Math.floor(difference % 60)
    .toString()
    .padStart(2, "0");
  return ` ${remainingMinutes}  : ${remainingSeconds}`;
};

enum GameStatus {
  notStart,
  registerAble,
  endRegister,
  finished,
}

export default function OneTouramentInfo({
  tournament,
  isClick,
  toggleTournamentInfo,
}: OneTournamentInfoProps) {
  const [nowTime, setNowTime] = useState(new Date());
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.notStart);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (tournament.generalData.startTime > nowTime) {
      if (gameStatus !== GameStatus.notStart) {
        setGameStatus(GameStatus.notStart);
      }
    } else if (
      tournament.entryData.reBuyableTime !== null &&
      tournament.entryData.reBuyableTime > nowTime
    ) {
      if (gameStatus !== GameStatus.registerAble) {
        setGameStatus(GameStatus.registerAble);
      }
    } else {
      if (gameStatus !== GameStatus.finished) {
        let totalBlindSecond = 0;

        for (var b of tournament.blindList) {
          if (b.second !== undefined || b.second !== null) {
            totalBlindSecond += Number(b.second);
          }
        }

        const remainTime = totalBlindSecond - tournament.prevSecond;
        const diffTime = Math.floor(
          (nowTime.getTime() - tournament.lastCheckedTime.getTime()) / 1000
        );
        if (diffTime < remainTime) {
          setGameStatus(GameStatus.endRegister);
        } else {
          setGameStatus(GameStatus.finished);
        }
      }
    }
  }, [tournament, nowTime]);

  const injectContent = (
    notStartContent: string,
    registerAbleContent: string,
    endRegisterContent: string,
    finishContent: string
  ) => {
    switch (gameStatus) {
      case GameStatus.notStart:
        return notStartContent;
      case GameStatus.registerAble:
        return registerAbleContent;
      case GameStatus.endRegister:
        return endRegisterContent;
    }
    return finishContent;
  };

  return (
    <div
      className="flex flex-col border-b-2 border-amber-100"
      onClick={() => {
        toggleTournamentInfo(isClick ? null : tournament.id);
      }}
    >
      <div className="flex flex-row w-full h-[120px]  px-2">
        <div className="w-[30%]">
          <StatusShowPart
            tournament={tournament}
            nowTime={nowTime}
            gameStatus={gameStatus}
          />
        </div>
        <div className="flex-7 flex flex-col justify-center text-start w-[70%]   my-2 ml-1 ">
          <div className="w-full">{tournament.generalData.gameName}</div>
          <div className="w-full">
            {tournament.generalData.startTime.toLocaleString()}
          </div>
          <div>
            {"프라이즈 : "}
            {tournament.prizeData.totalPrize}
          </div>
          <div className="flex flex-row justify-center text-start  w-full">
            <div className="w-[50%]">
              {"바이인 : "}
              {FormatText.toFormatNum(tournament.generalData.buyInCost.cost)} p
            </div>
            <div className="w-[50%]">
              {`${injectContent(
                `예약 인원 : -`,
                `현재 인원 : ${
                  tournament.entryData.remainPlayer
                }/${EntryData.getTotalPlayer(tournament.entryData.entryList)}`,
                `현재 인원 : ${
                  tournament.entryData.remainPlayer
                }/${EntryData.getTotalPlayer(tournament.entryData.entryList)}`,
                `총 엔트리 : ${EntryData.getTotalPlayer(
                  tournament.entryData.entryList
                )}`
              )}`}
            </div>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="w-full flex flex-col p-2">
          <AdditionPart
            tournament={tournament}
            nowTime={nowTime}
            gameStatus={gameStatus}
          />
          {tournament.generalData.note && (
            <div className="border-2 p-2 whitespace-pre-wrap">
              {tournament.generalData.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusShowPart({
  tournament,
  nowTime,
  gameStatus,
}: {
  tournament: TournamentInfo;
  nowTime: Date;
  gameStatus: GameStatus;
}) {
  const injectContent = (
    notStartContent: string,
    registerAbleContent: string,
    endRegisterContent: string,
    finishContent: string
  ) => {
    switch (gameStatus) {
      case GameStatus.notStart:
        return notStartContent;
      case GameStatus.registerAble:
        return registerAbleContent;
      case GameStatus.endRegister:
        return endRegisterContent;
    }
    return finishContent;
  };

  return (
    <div
      className={`w-full h-[100px] flex flex-col justify-center text-center rounded-3xl ${injectContent(
        "bg-green-500",
        "bg-red-500",
        "bg-blue-300",
        "bg-gray-500"
      )} my-2  text-xs`}
    >
      <div className="flex flex-col justify-center text-center text-xs">
        <div className="whitespace-pre-wrap">
          {injectContent(
            "등록 까지\n남은 시간",

            tournament.entryData.reBuyableTime !== null
              ? "추가 등록 까지\n남은 시간"
              : "진행 중",
            "진행 중",
            "종료"
          )}
        </div>
        <div>
          {injectContent(
            timeHMSChange(
              tournament.generalData.startTime.getTime() - nowTime.getTime()
            ),
            timeHMSChange(
              tournament.entryData.reBuyableTime !== null
                ? tournament.entryData.reBuyableTime.getTime() -
                    nowTime.getTime()
                : tournament.prevSecond * 1000 +
                    nowTime.getTime() -
                    tournament.lastCheckedTime.getTime()
            ),
            timeHMSChange(
              tournament.prevSecond * 1000 +
                nowTime.getTime() -
                tournament.lastCheckedTime.getTime()
            ),
            "-"
          )}
        </div>
      </div>
    </div>
  );
}

function AdditionPart({
  tournament,
  nowTime,
  gameStatus,
}: {
  tournament: TournamentInfo;
  nowTime: Date;
  gameStatus: GameStatus;
}) {
  const [blindIndex, setBlindIndex] = useState(-1);

  useEffect(() => {
    const blindList = tournament.blindList ?? [];
    let temp = tournament.prevSecond ?? 0; // 500, 700, 1300
    let index = 0;
    for (var b of blindList) {
      if (temp >= b.second) {
        temp -= b.second;
        index++;
      } else {
        break;
      }
    }
    setBlindIndex(index);
  }, []);

  const getAvgChip = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      if (tournament.blindList[blindIndex].isBreak) {
        return "0";
      } else {
        if (tournament.entryData.remainPlayer > 0) {
          return FormatText.toFormatThumbNum(
            Math.floor(
              EntryData.getTotalCostAndChip(tournament.entryData.entryList)
                .chip / tournament.entryData.remainPlayer
            )
          );
        }
      }
    }
    return "0";
  };

  const getAvgBB = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      if (tournament.blindList[blindIndex].isBreak) {
        return "0";
      } else {
        const bb = Number(tournament.blindList[blindIndex].bigBlind);
        if (bb !== 0 && tournament.entryData.remainPlayer > 0) {
          return FormatText.toFormatThumbNum(
            Math.floor(
              EntryData.getTotalCostAndChip(tournament.entryData.entryList)
                .chip /
                (bb * tournament.entryData.remainPlayer)
            )
          );
        }
      }
    }
    return "0";
  };

  const getLevelRemainTime = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      let blindTotalSecond = 0;
      const diffTime = Math.floor(
        (nowTime.getTime() - tournament.lastCheckedTime.getTime()) / 1000
      );
      const playTime = diffTime + tournament.prevSecond;

      for (let index = 0; index <= blindIndex; index++) {
        blindTotalSecond += Number(tournament.blindList[index].second);
      }
      if (blindTotalSecond > playTime) {
        return timeMSChange(blindTotalSecond - playTime);
      } else {
        // 최신화 필요.
        return "00:00";
      }
    }
    return "0";
  };

  const injectContent = (
    notStartContent: string,
    registerAbleContent: string,
    endRegisterContent: string,
    finishContent: string
  ) => {
    switch (gameStatus) {
      case GameStatus.notStart:
        return notStartContent;
      case GameStatus.registerAble:
        return registerAbleContent;
      case GameStatus.endRegister:
        return endRegisterContent;
    }
    return finishContent;
  };

  const blindInfoStr = (v: BlindLevel) => {
    try {
      if (
        v == undefined ||
        v === null ||
        v.smallBlind === undefined ||
        v.smallBlind === null ||
        v.bigBlind === undefined ||
        v.bigBlind === null ||
        v.ante === undefined ||
        v.ante === null
      ) {
        return "- / - (-)";
      }
      return `${FormatText.toFormatThumbNum(
        v.smallBlind
      )} / ${FormatText.toFormatThumbNum(
        v.bigBlind
      )} (${FormatText.toFormatThumbNum(v.ante)})`;
    } catch (e) {
      return "- / - (-)";
    }
  };

  return (
    <div className="flex flex-row w-full pb-2 ">
      <div className="flex flex-col w-[20%] h-[150px] justify-center text-center border-2">
        <div>플레이어</div>
        <div>
          {injectContent(
            "-",
            `${tournament.entryData.remainPlayer}/${EntryData.getTotalPlayer(
              tournament.entryData.entryList
            )}`,
            `${tournament.entryData.remainPlayer}/${EntryData.getTotalPlayer(
              tournament.entryData.entryList
            )}`,
            "-"
          )}
        </div>
        <div>평균 칩</div>
        <div className="whitespace-pre-wrap">
          {injectContent(
            "- ( - bb )",
            `${getAvgChip()}\n( ${getAvgBB()} bb)`,
            `${getAvgChip()}\n( ${getAvgBB()} bb)`,
            "- ( - bb )"
          )}
        </div>
      </div>
      <div className="flex flex-col w-[50%] h-[150px] justify-center text-center border-2 mx-2">
        {blindIndex === -1 || blindIndex >= tournament.blindList.length ? (
          <>블라인드 정보가 없습니다.</>
        ) : (
          <>
            <div>
              {injectContent(
                `${
                  tournament.blindList[0].isBreak
                    ? "Break"
                    : `LV.${tournament.blindList[0].level}`
                }`,
                `${
                  tournament.blindList[blindIndex].isBreak
                    ? "Break"
                    : `LV.${tournament.blindList[blindIndex].level}`
                }`,
                `${
                  tournament.blindList[blindIndex].isBreak
                    ? "Break"
                    : `LV.${tournament.blindList[blindIndex].level}`
                }`,
                "THE END"
              )}
            </div>
            <div>
              {injectContent(
                timeMSChange(Number(tournament.blindList[0].second)),
                getLevelRemainTime(),
                getLevelRemainTime(),
                "00:00"
              )}
            </div>
            <div>
              {injectContent(
                blindInfoStr(tournament.blindList[0]),
                blindInfoStr(tournament.blindList[blindIndex]),
                blindInfoStr(tournament.blindList[blindIndex]),
                "- / - (-)"
              )}
            </div>
            {`next : ${injectContent(
              blindInfoStr(tournament.blindList[1]),
              blindInfoStr(tournament.blindList[blindIndex]),
              blindInfoStr(tournament.blindList[blindIndex]),
              "- / - (-)"
            )}`}
          </>
        )}
      </div>
      <div className="flex flex-col w-[30%] h-[150px] justify-center text-center border-2">
        <div>총 상금</div>
        <div>{tournament.prizeData.totalPrize}</div>
        <div>1위</div>
        <div>
          {tournament.prizeData.prizeStructure.length !== 0
            ? tournament.prizeData.prizeStructure[0].prize ?? "-"
            : "-"}
        </div>
      </div>
    </div>
  );
}
