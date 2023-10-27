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

export default function OneTouramentInfo({
  tournament,
  isClick,
  toggleTournamentInfo,
}: OneTournamentInfoProps) {
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="flex flex-col border-b-2 border-amber-100"
      onClick={() => {
        toggleTournamentInfo(null);
      }}
    >
      <div className="flex flex-row w-full h-[100px]  px-2">
        {tournament.generalData.startTime >= nowTime && (
          <div className="flex flex-col justify-center text-center w-[30%] rounded-3xl bg-green-500 my-2  text-xs">
            <div className="  ">{"등록 까지"}</div>
            <div className=" ">{" 남은 시간"}</div>
            <div className="  ">
              <div>
                {timeHMSChange(
                  tournament.generalData.startTime.getTime() - nowTime.getTime()
                )}
              </div>
            </div>
          </div>
        )}

        {tournament.generalData.startTime < nowTime ? (
          nowTime < tournament.entryData.reBuyableTime ? (
            <div className="flex flex-col justify-center text-center w-[30%] rounded-3xl bg-red-500 my-2  text-xs">
              <div className="  ">{"추가 등록 까지"}</div>
              <div className=" ">{" 남은 시간"}</div>
              <div className="  ">
                <div>
                  {timeHMSChange(
                    tournament.entryData.reBuyableTime.getTime() -
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
              {"현재 인원 : "}
              {tournament.entryData.remainPlayer}/
              {EntryData.getTotalPlayer(tournament.entryData.entryList)}
            </div>
          </div>
        </div>
      </div>
      {isClick && (
        <div
          className="w-full h-full flex flex-col p-2"
          onClick={() => toggleTournamentInfo(null)}
        >
          <AdditionPart tournament={tournament} nowTime={nowTime} />
          {tournament.generalData.note && (
            <div className="border-2 p-2">{tournament.generalData.note}</div>
          )}
        </div>
      )}
    </div>
  );
}

function AdditionPart({
  tournament,
  nowTime,
}: {
  tournament: TournamentInfo;
  nowTime: Date;
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
        return 0;
      } else {
        if (tournament.entryData.remainPlayer > 0) {
          return FormatText.toFormatNum(
            Math.floor(
              EntryData.getTotalCostAndChip(tournament.entryData.entryList)
                .chip / tournament.entryData.remainPlayer
            )
          );
        }
      }
    }
    return 0;
  };

  const getAvgBB = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      if (tournament.blindList[blindIndex].isBreak) {
        return 0;
      } else {
        const bb = Number(tournament.blindList[blindIndex].bigBlind);
        if (bb !== 0 && tournament.entryData.remainPlayer > 0) {
          return (
            EntryData.getTotalCostAndChip(tournament.entryData.entryList).chip /
            (bb * tournament.entryData.remainPlayer)
          )
            .toFixed(1)
            .toString();
        }
      }
    }
    return 0;
  };

  const getLevelRemainTime = () => {
    if (blindIndex !== -1 && blindIndex < tournament.blindList.length) {
      const lastCheckedTime = tournament.lastCheckedTime;
      let totalSecond = 0;
      for (let index = 0; index <= blindIndex; index++) {
        totalSecond += tournament.blindList[index].second;
      }
      // return totalSecond - tournament.prevSecond;
      return totalSecond - tournament.prevSecond;
    }
    return 0;
  };

  return (
    <div className="flex flex-row w-full h-full pb-2">
      <div className="flex flex-col w-[20%] justify-center text-center border-2">
        <div>플레이어</div>
        <div>
          {tournament.entryData.remainPlayer}/
          {EntryData.getTotalPlayer(tournament.entryData.entryList)}
        </div>
        <div>평균 칩</div>
        <div>{getAvgChip()}</div>
        <div> {`( ${getAvgBB()} bb )`}</div>
      </div>
      <div className="flex flex-col w-[60%] justify-center text-center border-2 mx-2">
        {blindIndex === -1 || blindIndex >= tournament.blindList.length ? (
          <>블라인드 정보가 없습니다.</>
        ) : (
          <>
            <div>{`${
              tournament.blindList[blindIndex].isBreak
                ? "Break"
                : `LV.${tournament.blindList[blindIndex].level}`
            }`}</div>
            {/* <div>{timeMSChange(tournament.prevSecond)}</div> */}
            <div>{timeMSChange(getLevelRemainTime())}</div>
            <div>{`${FormatText.toFormatThumbNum(
              tournament.blindList[blindIndex].smallBlind,
              0
            )} / ${FormatText.toFormatThumbNum(
              tournament.blindList[blindIndex].bigBlind,
              0
            )} (${FormatText.toFormatThumbNum(
              tournament.blindList[blindIndex].ante,
              0
            )})`}</div>
            <div>next</div>
            {blindIndex >= tournament.blindList.length ? (
              <>
                <div>-</div>
              </>
            ) : tournament.blindList[blindIndex + 1].isBreak ? (
              <div>Break</div>
            ) : (
              <>
                <div>
                  {`${FormatText.toFormatThumbNum(
                    tournament.blindList[blindIndex + 1].smallBlind,
                    0
                  )} / ${FormatText.toFormatThumbNum(
                    tournament.blindList[blindIndex + 1].bigBlind,
                    0
                  )} (${FormatText.toFormatThumbNum(
                    tournament.blindList[blindIndex + 1].ante,
                    0
                  )})`}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col w-[20%] justify-center text-center border-2">
        <div>총 상금</div>
        <div>{tournament.prizeData.totalPrize}</div>
        <div>1위</div>
        <div>
          {tournament.prizeData.prizeStructure.length !== 0
            ? tournament.prizeData.prizeStructure[0].prize
            : "-"}
        </div>
      </div>
    </div>
  );
}
