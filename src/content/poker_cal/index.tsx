import { useContext, useEffect, useRef, useState } from "react";
import basic from "../../utils/basic.json";
import { getResult } from "../../utils/poker_func";
import { json } from "react-router-dom";
import Card from "../../component/Card";
import "./style.css";
import CardSetDialog from "./CardSetDialog";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  OnePlayer,
  refreshPokerCal,
  updateCommunitCards,
  updatePlayerCards,
} from "../../reducer/pokerCalSlice";

class detailInfo {
  hand: any;
  wins: any;
  ties: any;
  constructor(hand: any, wins: any, ties: any) {
    this.hand = hand;
    this.wins = wins;
    this.ties = ties;
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
    var v = new detailInfo(hand, 0, 0);
    const handDetailsListFlat = handDetails.map(
      (value: any, _: any) => value.hand
    );
    const playerHandStr = hand[0] + hand[1];
    if (handDetailsListFlat.includes(playerHandStr)) {
      const temp: any = handDetails[handDetailsListFlat.indexOf(playerHandStr)];
      v = new detailInfo(temp.hands, temp.wins, temp.ties);
    }
    return v;
  };

  const refreshHandDetails = () => {
    const realHands = getRealHands(players.map((v, i) => v.hand));
    if (realHands.length < 2) {
      return;
    }

    const cardSerialize = [
      ...realHands.reduce((p: any, c: any) => [...p, ...c]),
      ...communityCards,
    ];

    var process = 0;
    for (let index = 0; index < communityCards.length; index++) {
      const cardStr = communityCards[index];
      if (isCard(cardStr)) {
        process++;
      } else {
        break;
      }
    }
    if (!(process == 0 || process == 3 || process == 4 || process == 5)) {
      return;
    }
    for (let index = 0; index < process; index++) {
      if (!isCard(communityCards[index])) {
        return;
      }
    }

    if (toCardHash(cardSerialize) != prevHash) {
      prevHash = toCardHash(cardSerialize);
      const list = getResult(realHands, communityCards);
      setHandDetails(
        list.map((v: any, i: any) => {
          return new detailInfo(v.hands, v.wins, v.ties);
        })
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      refreshHandDetails();
    });
  }, [communityCards, players]);

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex flex-col mx-auto">
        <div className="text-center text-4xl my-2">포커 계산기</div>
        <div className="text-center text-2xl my-2">커뮤니티 카드</div>
        <CommunityCardPart
          communityCards={communityCards}
          clickFunc={(cardValue: any, cardIndex: any) => {
            for (let i: number = 0; i <= cardIndex - 1; i++) {
              if (!isCard(communityCards[i])) {
                return;
              }
            }

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

              dispatch(updateCommunitCards(temp));
            });
            setDialogOpen(true);
          }}
        />
      </div>
      <div className="middle px-4 mx-auto">
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
    <div className="flex">
      {communityCards.map((v: any, i: any) => {
        return (
          <div className="mx-2" key={`${v}_${i}`}>
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
    <div className="flex justify-center text-center ">
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
  return (
    <div className="flex items-center">
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
      <div className="w-36 h-12 bg-red-300 items-center flex flex-col">
        <div>win: {detail.wins}</div>
        <div>tie: {detail.ties}</div>
      </div>
      <div
        className="mx-1 p-1 border-2 text-center border-black hover:cursor-pointer"
        onClick={delFunc}
      >
        삭제
      </div>
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
      <Card card={isCard(card) ? card : ""} width="80px" height="120px" />
    </div>
  );
};

export default PokerCalPage;
