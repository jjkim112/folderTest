import { useContext, useEffect, useRef, useState } from "react";
import basic from "../../../../assets/json/pokerFunc/basic.json";
import { getResult } from "../../../../util/commonFunc/poker_func";
import Card from "../../../../component/Card/Card";
import "../../../../styles/page/calculator/style.css";
import CardSetDialog from "../calculator/component/CardSetDialog";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  OnePlayer,
  flopCommunityCards,
  randomPickSet,
  refreshPokerCal,
  resetCommunityCards,
  updateCommunitCards,
  updatePlayerCards,
} from "../../../../redux/slice/pokerCalSlice";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const rankMap = {
  ROYAL_FLUSH: "로티플",
  STRAIGHT_FLUSH: "스티플",
  QUADS: "포카드",
  FULL_HOUSE: "풀하우스",
  FLUSH: "플러시",
  STRAIGHT: "스트레이트",
  TREE_OF_A_KIND: "트리플",
  TWO_PAIRS: "투페어",
  ONE_PAIR: "원페어",
  HIGH_CARDS: "하이",
};
class detailInfo {
  hand: any;
  wins: any;
  ties: any;
  ranks: any;
  total: number;

  constructor(hand: any, wins: any, ties: any, ranks: any, total: number) {
    this.hand = hand;
    this.wins = wins;
    this.ties = ties;
    this.ranks = ranks;
    this.total = total;
  }
}

const isCard = (value: any) => {
  // c2, dt, ha, s9 : true,  s1, tt, eq : false
  if (
    value.length == 2 &&
    basic.shapeList.includes(value[0]) &&
    basic.numList.includes(value[1])
  ) {
    return true;
  }
  return false;
};

const isRealHand = (hand: any) => {
  if (hand.length == 2) {
    if (isCard(hand[0]) && isCard(hand[1])) {
      return true;
    }
  }
  return false;
};
const getRealHands = (hands: any): any[] => {
  return hands.filter((hand: any, _: any) => {
    return isRealHand(hand);
  });
};

let prevHash = "";
var setCardFunc = () => {}; // dialog props

const PokerCalPage = () => {
  const toCardHash = (cardArray: any) => {
    return cardArray.reduce((prev: any, curr: any) => {
      // TODO
      // card 값 serialization 하기. 저장하기.
      // 같은 가드 패들의 값이 들어오면, 저 함수를 돌리지마!
      return prev + curr;
    });
  };
  const randomPick = useSelector(
    (state: RootState) => state.pokerCal.randomPick
  );
  const communityCards = useSelector(
    (state: RootState) => state.pokerCal.communityCards
  );
  const players = useSelector((state: RootState) => state.pokerCal.players);
  const dispatch = useDispatch<AppDispatch>();

  const [handDetails, setHandDetails] = useState([]);

  var [dialogOpen, setDialogOpen] = useState(false);

  var [dialogSelCard, setDialogSelCard] = useState("");

  var dialogInputSetFunc = (func: any) => {
    setCardFunc = func;
  };

  const getHandDetail = (hand: any) => {
    var v = new detailInfo(hand, 0, 0, {}, 0);
    const handDetailsListFlat = handDetails.map(
      (value: any, _: any) => value.hand
    );
    const playerHandStr = hand[0] + hand[1];
    if (handDetailsListFlat.includes(playerHandStr)) {
      const temp: any = handDetails[handDetailsListFlat.indexOf(playerHandStr)];
      v = new detailInfo(
        temp.hands,
        temp.wins,
        temp.ties,
        temp.ranks,
        temp.total
      );
    }
    return v;
  };

  const handDetailInit = () => {
    setHandDetails(
      players.map((v: OnePlayer, i: any) => {
        return new detailInfo(v.hand, 0, 0, {}, 0);
      })
    );
  };
  const isGoodCommuCards = (cards: string[]): boolean => {
    var processList = cards.map((v) => (isCard(v) ? 1 : 0));
    return (
      processList.toString() === [0, 0, 0, 0, 0].toString() ||
      processList.toString() === [1, 1, 1, 0, 0].toString() ||
      processList.toString() === [1, 1, 1, 1, 0].toString() ||
      processList.toString() === [1, 1, 1, 1, 1].toString()
    );
  };

  const refreshHandDetails = () => {
    const realHands = getRealHands(players.map((v, i) => v.hand));
    if (realHands.length < 2) {
      handDetailInit();
      return;
    }

    const cardSerialize = [
      ...realHands.reduce((p: any, c: any) => [...p, ...c]),
      ...communityCards,
    ];

    if (!isGoodCommuCards(communityCards)) {
      handDetailInit();
      return;
    }

    if (toCardHash(cardSerialize) != prevHash) {
      prevHash = toCardHash(cardSerialize);
      const list = getResult(realHands, communityCards);
      setHandDetails(
        list.map((v: any, i: any) => {
          return new detailInfo(v.hands, v.wins, v.ties, v.ranks, v.total);
        })
      );
    }
  };
  const _flopFunc = () => {
    dispatch(flopCommunityCards());
  };
  const _resetFlopFunc = () => {
    dispatch(resetCommunityCards());
  };

  const _pickFlop = () => {
    const setNum = 1 - randomPick[0];
    let tempList = [...[setNum, setNum, setNum], ...randomPick.slice(3, 5)];
    dispatch(randomPickSet(tempList));
  };
  const _pickTurn = () => {
    const setNum = 1 - randomPick[3];
    let tempList = [...randomPick.slice(0, 3), setNum, randomPick[4]];
    dispatch(randomPickSet(tempList));
  };
  const _pickRiver = () => {
    const setNum = 1 - randomPick[4];
    let tempList = [...randomPick.slice(0, 4), setNum];
    dispatch(randomPickSet(tempList));
  };

  useEffect(() => {
    setTimeout(() => {
      refreshHandDetails();
    });
  }, [communityCards, players]);

  return (
    <div className="flex flex-col w-full mx-auto h-screen">
      <div className="flex flex-col  w-full mx-auto h-full">
        <div className="text-center text-4xl my-2 text-[#f0e68c]">
          포커 계산기
        </div>
        <div className="text-center text-2xl my-2 text-[#f0e68c]">
          커뮤니티 카드
        </div>
        {/* <div className="flex flex-wrap w-40">
          {remainCards.map((v) => ` (${v}) `)}
        </div>
        <div>{communityCards.map((v) => ` [${v}] `)}</div> */}
        <div className="flex justify-center">
          <button className="px-4  text-blue-200 underline" onClick={_flopFunc}>
            카드깔기
          </button>
          <button
            className="px-4  text-blue-200 underline"
            onClick={_resetFlopFunc}
          >
            리셋
          </button>
        </div>
        <div className="flex justify-center my-2">
          <button
            className={`${
              randomPick.slice(0, 3).toString() === [0, 0, 0].toString()
                ? "bg-slate-500 mx-1 px-4 border-[1px] border-red-100 rounded-2xl text-yellow-200"
                : "bg-gray-400 mx-1 px-4 border-[1px] border-gray-600 rounded-2xl text-gray-200"
            }`}
            onClick={_pickFlop}
          >
            플랍3장
          </button>
          <button
            className={`${
              randomPick.slice(3, 4).toString() === [0].toString()
                ? "bg-slate-500 mx-1 px-4 border-[1px] border-red-100 rounded-2xl text-yellow-200"
                : "bg-gray-400 mx-1 px-4 border-[1px] border-gray-600 rounded-2xl text-gray-200"
            }`}
            onClick={_pickTurn}
          >
            턴1장
          </button>
          <button
            className={`${
              randomPick.slice(4, 5).toString() === [0].toString()
                ? "bg-slate-500 mx-1 px-4 border-[1px] border-red-100 rounded-2xl text-yellow-200"
                : "bg-gray-400 mx-1 px-4 border-[1px] border-gray-600 rounded-2xl text-gray-200"
            }`}
            onClick={_pickRiver}
          >
            리버1장
          </button>
        </div>
        <CommunityCardPart
          communityCards={communityCards}
          clickFunc={(cardValue: any, cardIndex: any) => {
            // for (let i: number = 0; i <= cardIndex - 1; i++) {
            //   if (!isCard(communityCards[i])) {
            //     return;
            //   }
            // }

            setDialogSelCard(cardValue);
            dialogInputSetFunc((targetCard: any) => {
              var delCard = "";
              var addCard = "";
              if (targetCard == cardValue) {
                delCard = targetCard;
              } else {
                delCard = cardValue;
                addCard = targetCard;
              }
              var temp = Array.from(communityCards);
              if (targetCard == cardValue) {
                temp[cardIndex] = "";
              } else {
                temp[cardIndex] = targetCard;
              }

              dispatch(updateCommunitCards(temp as string[]));
            });
            setDialogOpen(true);
          }}
        />
        <div className="flex flex-col justify-center items-center w-full  ">
          {players.map((v, i) => {
            const detail = getHandDetail(v.hand);
            return (
              <OnePlayerPart
                player={v}
                key={`${i}_${v.hand}`}
                detail={detail}
                clickFunc={(cardValue: any, handIndex: any) => {
                  setDialogSelCard(cardValue);
                  dialogInputSetFunc((targetCard: any) => {
                    var delCard = "";
                    var addCard = "";
                    if (targetCard == cardValue) {
                      delCard = targetCard;
                    } else {
                      delCard = cardValue;
                      addCard = targetCard;
                    }

                    var tempList: OnePlayer[] = Array.from(
                      players.map((v) => v.clone)
                    );

                    if (targetCard == cardValue) {
                      tempList[i].hand[handIndex] = "";
                    } else {
                      tempList[i].hand[handIndex] = targetCard;
                    }
                    dispatch(updatePlayerCards(tempList));
                  });
                  setDialogOpen(true);
                }}
                delFunc={() => {
                  console.log("del func");
                  const card1 = players[i].hand[0];
                  const card2 = players[i].hand[1];
                  var temp = Array.from(players.map((v) => v.clone));
                  temp.splice(i, 1);
                  dispatch(updatePlayerCards(temp));
                }}
              />
            );
          })}
        </div>
        <div className="w-full mb-2">
          <div className=" flex justify-center ">
            <ActionPart players={players} />
          </div>
        </div>
      </div>

      {dialogOpen && (
        <CardSetDialog
          cardSetFunc={setCardFunc}
          setDialogOpen={setDialogOpen}
          selCard={dialogSelCard}
        />
      )}
    </div>
  );
};

const CommunityCardPart = ({ communityCards, clickFunc }: any) => {
  return (
    <div className="flex  justify-center  w-full ">
      {communityCards.map((v: any, i: any) => {
        return (
          <div className="mx-2 " key={`${v}_${i}`}>
            <OneCardDiv
              card={v}
              cardClickFunc={() => {
                clickFunc(v, i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

interface ActionPartProps {
  players: OnePlayer[];
}

const ActionPart = ({ players }: ActionPartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex  justify-center text-center ">
      <div
        className="flex justify-center text-center items-center border-2 w-24 h-12"
        onClick={() => {
          var temp = Array.from(players.map((v) => v.clone));
          temp.push(new OnePlayer(["", ""]));

          dispatch(updatePlayerCards(temp));
        }}
      >
        추가
      </div>
      <div className="mx-8"></div>
      <div
        className="flex justify-center text-center items-center border-2 w-24 h-12"
        onClick={() => {
          dispatch(refreshPokerCal());
        }}
      >
        리셋
      </div>
    </div>
  );
};

const OnePlayerPart = ({ player, detail, clickFunc, delFunc }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const iconClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex justify-center ${
        isOpen && detail.total != 0 ? "items-start" : "items-center"
      } w-full`}
    >
      <div className="w-36 mx-2 my-2 flex justify-center items-center rounded-xl">
        <OneCardDiv
          card={player.hand[0]}
          cardClickFunc={() => {
            clickFunc(player.hand[0], 0);
          }}
        />
        <div className="mx-1"></div>
        <OneCardDiv
          card={player.hand[1]}
          cardClickFunc={() => {
            clickFunc(player.hand[1], 1);
          }}
        />
      </div>

      <div className="flex py-2">
        <div className="w-32 bg-red-300 items-center flex flex-col">
          <div>win: {detail.wins}</div>
          <div>tie: {detail.ties}</div>
          {isOpen && (
            <>
              <div className="bg-black h-[1px] w-full border-black"></div>
              {Object.entries(detail.ranks).map(([k, v]) => {
                return oneNumberPart(k, Number(v), detail.total);
              })}
            </>
          )}
        </div>
        <div onClick={iconClick}>
          {isOpen ? <BiUpArrow /> : <BiDownArrow />}
        </div>
      </div>
      <div
        className="mx-1 p-1 border-2 text-center self-center border-black hover:cursor-pointer"
        onClick={delFunc}
      >
        삭제
      </div>
    </div>
  );
};
const oneNumberPart = (key: any, value: number, total: number) => {
  return (
    <div key={key}>
      <span className="text-[11px]">{rankMap[key]} : </span>
      {total === 0 || value === 0 ? (
        <span className="text-[12px]">0</span>
      ) : (
        <span
          className={
            value / total > 0.15 &&
            [
              "ROYAL_FLUSH",
              "STRAIGHT_FLUSH",
              "QUADS",
              "FULL_HOUSE",
              "FLUSH",
              "STRAIGHT",
            ].includes(key)
              ? "text-[15px] font-semibold text-yellow-300"
              : "text-[12px]"
          }
        >
          {((100 * value) / total).toFixed(1)}
        </span>
      )}
    </div>
  );
};

const OneCardDiv = ({ card, cardClickFunc }: any) => {
  return (
    <div
      className="hover:cursor-pointer"
      onClick={(event) => {
        cardClickFunc();
        // setClickedDiv(event.target);
        // const shape = "s";
        // const num = "t";
        // event.target.src = `/assets/images/card/${shape}${num}.png`;
        // event.target.style.border = "1px solid red";
        // event.target.style.border = "none";
      }}
    >
      <Card card={isCard(card) ? card : ""} width="60px" height="100px" />
    </div>
  );
};

export default PokerCalPage;
