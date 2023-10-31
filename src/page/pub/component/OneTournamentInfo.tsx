import React, { useEffect, useState } from "react";
import {
  BlindLevel,
  TournamentInfo,
} from "../../../domain/tournament/TournamentInfo.model";
import { EntryData } from "../../../domain/tournament/component/EntryData.model";
import { FormatText } from "../../../assets/text/format_text";

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
const timeHMSChangeWithDay = (difference: number) => {
  let remainingDays = Math.floor(difference / oneDayMs);
  let remainingHours = Math.floor((difference % oneDayMs) / oneHourMs)
    .toString()
    .padStart(2, "0");
  let remainingMinutes = Math.floor((difference % oneHourMs) / oneMinuteMs)
    .toString()
    .padStart(2, "0");
  let remainingSeconds = Math.floor((difference % oneMinuteMs) / 1000)
    .toString()
    .padStart(2, "0");

  if (remainingDays > 0) {
    return `${remainingDays}D ${remainingHours}H ${remainingMinutes}M`;
  } else {
    return `${remainingHours} : ${remainingMinutes}  : ${remainingSeconds}`;
  }
};
const timeMSChangeFromSec = (difference: number) => {
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

  const [blindIndex, setBlindIndex] = useState(-1);

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
      tournament.entryData.rebuyableLevel !== null &&
      getRemainRebuyableTime() > 0
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

        const remainTime = totalBlindSecond - getPrevSecond();
        // TODO 종료에 대한 if 문 하나 필요!!
        // last Checked Time 과 지금 시간 비교.
        // 12000, 9000 => 3000이 더 있음. 아직 잘 모르겠음.

        if (remainTime > 0) {
          setGameStatus(GameStatus.endRegister);
        } else {
          setGameStatus(GameStatus.finished);
        }
      }
    }

    const blindList = tournament.blindList ?? [];
    let temp = getPrevSecond();
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
  }, [tournament, nowTime]);

  const getPrevSecond = () => {
    if (tournament.isProgress) {
      return Math.floor(
        (tournament.prevSecond * 1000 +
          nowTime.getTime() -
          tournament.lastCheckedTime.getTime()) /
          1000
      );
    } else {
      return tournament.prevSecond;
    }
  };

  const getRemainRebuyableTime = () => {
    try {
      let remainRebuyTime = 0;

      if (tournament.id !== "") {
        if (
          tournament.entryData.rebuyableLevel === null
          // || tournament.entryData.remainEntry === null
        ) {
          remainRebuyTime = 0;
        } else {
          let totalRebuyAbleSecond = 0;

          for (let index = 0; index < tournament.blindList.length; index++) {
            if (
              !tournament.blindList[index].isBreak &&
              tournament.blindList[index].level >
                tournament.entryData.rebuyableLevel
            ) {
              break;
            } else {
              totalRebuyAbleSecond += Number(
                tournament.blindList[index].second
              );
            }
          }
          remainRebuyTime = totalRebuyAbleSecond - tournament.prevSecond;
        }
      }
      if (tournament.isProgress) {
        remainRebuyTime -= Math.floor(
          (nowTime.getTime() - tournament.lastCheckedTime.getTime()) / 1000
        );
      }
      return Math.max(remainRebuyTime, 0);
    } catch (e) {
      return 0;
    }
  };
  const getRemainSecondForStart = () => {
    return Math.floor(
      (tournament.generalData.startTime.getTime() - nowTime.getTime()) / 1000
    );
  };
  const getProgressSecond = () => {
    if (tournament.isProgress) {
      return Math.floor(
        (nowTime.getTime() -
          tournament.lastCheckedTime.getTime() +
          tournament.prevSecond * 1000) /
          1000
      );
    } else {
      return tournament.prevSecond;
    }
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
            remainSecondForStart={getRemainSecondForStart()}
            rebuyableSecond={getRemainRebuyableTime()}
            progressSecond={getProgressSecond()}
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
            blindIndex={blindIndex}
            prevSecond={getPrevSecond()}
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
  remainSecondForStart,
  rebuyableSecond,
  progressSecond,
  gameStatus,
}: {
  tournament: TournamentInfo;
  remainSecondForStart: number;
  rebuyableSecond: number;
  progressSecond: number;
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

            tournament.entryData.rebuyableLevel !== null
              ? "추가 등록 까지\n남은 시간"
              : "진행 중",
            "진행 중",
            "종료"
          )}
        </div>
        <div>
          {injectContent(
            timeHMSChangeWithDay(remainSecondForStart * 1000),
            timeHMSChange(rebuyableSecond * 1000),
            timeHMSChange(progressSecond * 1000),
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
  blindIndex,
  prevSecond,
  gameStatus,
}: {
  tournament: TournamentInfo;
  nowTime: Date;
  blindIndex: number;
  prevSecond: number;
  gameStatus: GameStatus;
}) {
  const getAvgChip = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      if (tournament.entryData.remainPlayer > 0) {
        return FormatText.toFormatThumbNum(
          Math.floor(
            EntryData.getTotalCostAndChip(tournament.entryData.entryList).chip /
              tournament.entryData.remainPlayer
          )
        );
      }
    }
    return "0";
  };

  const getAvgBB = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      const bb = Number(tournament.blindList[blindIndex].bigBlind);
      if (bb !== 0 && tournament.entryData.remainPlayer > 0) {
        return FormatText.toFormatThumbNum(
          Math.floor(
            EntryData.getTotalCostAndChip(tournament.entryData.entryList).chip /
              (bb * tournament.entryData.remainPlayer)
          )
        );
      }
    }
    return "0";
  };

  const getLevelRemainTime = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      let blindTotalSecond = 0;
      for (let index = 0; index <= blindIndex; index++) {
        blindTotalSecond += Number(tournament.blindList[index].second);
      }
      if (blindTotalSecond > prevSecond) {
        return timeMSChangeFromSec(blindTotalSecond - prevSecond);
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
        v.ante === null ||
        v.isBreak === undefined ||
        v.isBreak === null
      ) {
        return "- / - (-)";
      }
      if (v.isBreak) {
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
            `${getAvgChip()}\n( ${getAvgBB()} bb )`,
            `${getAvgChip()}\n( ${getAvgBB()} bb )`,
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
                timeMSChangeFromSec(Number(tournament.blindList[0].second)),
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
              `${blindInfoStr(tournament.blindList[1])}`,
              blindIndex === tournament.blindList.length - 1
                ? "종료"
                : tournament.blindList[blindIndex + 1].isBreak
                ? "Break"
                : `${blindInfoStr(tournament.blindList[blindIndex + 1])}`,
              blindIndex === tournament.blindList.length - 1
                ? "종료"
                : tournament.blindList[blindIndex + 1].isBreak
                ? "Break"
                : `${blindInfoStr(tournament.blindList[blindIndex + 1])}`,
              "- / - (-)"
            )}`}
          </>
        )}
      </div>
      <div className="flex flex-col w-[30%] h-[150px] justify-center text-center border-2">
        <div>총 프라이즈</div>
        <div> {tournament.prizeData.totalPrize ?? ""} </div>
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
