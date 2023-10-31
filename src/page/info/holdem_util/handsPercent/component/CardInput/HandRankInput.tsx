import { useEffect, useState } from "react";
import basic from "../../../../../../assets/json/pokerFunc/basic.json";
import handData2 from "../../../../../../assets/json/hand_rank/hand_data2.json";
import handData3 from "../../../../../../assets/json/hand_rank/hand_data3.json";
import handData4 from "../../../../../../assets/json/hand_rank/hand_data4.json";
import handData6 from "../../../../../../assets/json/hand_rank/hand_data6.json";
import handData8 from "../../../../../../assets/json/hand_rank/hand_data8.json";
import handData10 from "../../../../../../assets/json/hand_rank/hand_data.json";
import Card from "../../../../../../component/Card/Card";
import HandRankSlider, { Xway } from "../Slider/HandRankSlider";
import CardSetDialog from "../../../../../../component/Card/CardSetDialog_2";
interface HandRankInputProps {
  selectedBtn: string;
  setSelectedBtn: React.Dispatch<React.SetStateAction<string>>;
  selectedData: SelectedData;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedData>>;
}
type SelectedData = {
  index: number;
  card: string;
  sum: number;
}[];
const HandRankInput: React.FC<HandRankInputProps> = ({
  selectedBtn,
  setSelectedBtn,
  selectedData,
  setSelectedData,
}) => {
  const [isSuited, setIsSuited] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selCard, setSelCard] = useState(0);

  const [cards, setCards] = useState<string[]>(["", ""]);

  const [rank, setRank] = useState<string>("0");

  const handleButtonClick = (name: string) => {
    setSelectedBtn(name);
  };
  useEffect(() => handleButtonData(selectedBtn), [selectedBtn, setSelectedBtn]);
  const handleButtonData = (name: string) => {
    switch (name) {
      case "2":
        setSelectedData(handData2);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData2);

          return prev;
        });

        break;
      case "3":
        setSelectedData(handData3);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData3);

          return prev;
        });
        break;
      case "4~5":
        setSelectedData(handData4);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData4);

          return prev;
        });
        break;
      case "6~7":
        setSelectedData(handData6);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData6);

          return prev;
        });
        break;
      case "8~9":
        setSelectedData(handData8);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData8);

          return prev;
        });
        break;
      case "10":
        setSelectedData(handData10);
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData10);

          return prev;
        });
        break;

      default:
        setCards((prev) => {
          updateRank(prev[0], prev[1], handData2);

          return prev;
        });
        break;
    }
  };

  const isCard = (card: string): boolean => {
    // c2, dt, ha, s9 : true,  s1, tt, eq : false
    if (
      card.length === 2 &&
      basic.shapeList.includes(card[0]) &&
      basic.numList.includes(card[1])
    ) {
      return true;
    }
    return false;
  };

  const clickCard = (index: number) => {
    setSelCard(index);
    setModalOpen(true);
  };

  const isPocket = (): boolean => {
    // pocket check
    let tempNum = "";
    let isPocket = false;
    for (let i = 0; i < cards.length; i++) {
      if (!isCard(cards[i])) break;
      const num = cards[i].charAt(1);

      if (tempNum === "") {
        tempNum = num;
      } else {
        if (tempNum === num) {
          isPocket = true;
          break;
        }
      }
    }
    return isPocket;
  };

  const getOriginCard = (): string => {
    const card = cards[selCard];
    if (!isCard(card)) {
      return "";
    }

    return card.charAt(1);
  };

  const setCardFunc = (cardNumber: string) => {
    setCards((prevCards) => {
      if (isCard(prevCards[1 - selCard])) {
        const otherNum = prevCards[1 - selCard].charAt(1);
        if (otherNum === cardNumber) {
          prevCards[0] = `s${cardNumber}`;
          prevCards[1] = `d${cardNumber}`;
          setIsSuited(false);
          updateRank(prevCards[0], prevCards[1], selectedData);
          return prevCards;
        }
      }

      if (selCard === 0) {
        prevCards[selCard] = `s${cardNumber}`;
      } else if (selCard === 1) {
        if (isSuited) {
          prevCards[selCard] = `s${cardNumber}`;
        } else {
          prevCards[selCard] = `d${cardNumber}`;
        }
      }

      updateRank(prevCards[0], prevCards[1], selectedData);
      return prevCards;
    });
  };

  const suitCardChange = (isSuitedValue: boolean) => {
    if (isPocket()) return;

    setIsSuited(isSuitedValue);
    setCards((prev) => {
      if (isSuitedValue) {
        prev[0] = isCard(prev[0]) ? `s${prev[0].charAt(1)}` : "";
        prev[1] = isCard(prev[1]) ? `s${prev[1].charAt(1)}` : "";
      } else {
        prev[0] = isCard(prev[0]) ? `s${prev[0].charAt(1)}` : "";
        prev[1] = isCard(prev[1]) ? `d${prev[1].charAt(1)}` : "";
      }
      updateRank(prev[0], prev[1], selectedData);

      return prev;
    });
  };

  const transToRealCardText = (value: string): string => {
    let cardText = value;
    let numIndex1 = basic.numList.indexOf(cardText.charAt(0));
    let numIndex2 = basic.numList.indexOf(cardText.charAt(1));

    if (numIndex1 === 0) {
      numIndex1 = 13;
    }
    if (numIndex2 === 0) {
      numIndex2 = 13;
    }
    if (numIndex1 < numIndex2) {
      cardText = `${cardText.charAt(1)}${cardText.charAt(0)}${value.charAt(2)}`;
    }
    return cardText;
  };

  const updateRank = (card1: string, card2: string, dataList: SelectedData) => {
    if (isCard(card1) && isCard(card2)) {
      let cardsText = "";
      if (isPocket()) {
        const num = card1.charAt(1);
        cardsText = `${num}${num}p`;
      } else {
        cardsText = `${card1.charAt(1)}${card2.charAt(1)}${
          card1.charAt(0) === card2.charAt(0) ? "s" : "o"
        }`;
      }

      cardsText = transToRealCardText(cardsText);

      let percentage: string = "0";
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].card === cardsText) {
          percentage = dataList[i].sum.toString();
          break;
        }
      }
      setRank(parseFloat(percentage).toFixed(2));
    }
  };

  return (
    <div>
      <HandRankSlider
        selectedBtn={selectedBtn}
        setSelectedBtn={setSelectedBtn}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        handleButtonClick={handleButtonClick}
        handleButtonData={handleButtonData}
        cards={cards}
        rank={rank}
      />
      <div className="flex flex-row items-center h-full p-2">
        <div className="flex w-[40%] h-full justify-center items-center gap-2 ">
          {cards.map((v, i) => {
            return (
              <div
                className="cursor-pointer  "
                onClick={() => {
                  clickCard(i);
                }}
                key={i}
              >
                <Card card={v} />
              </div>
            );
          })}
        </div>
        <div className="flex  w-[60%] h-full  flex-col justify-center text-center ">
          <TypeSel isSuited={isSuited} setIsSuited={suitCardChange} />
          <div className="w-[70%] text-center self-center"></div>
          <ResultRank rank={rank} />
        </div>
      </div>
      {modalOpen && (
        <CardSetDialog
          setCardFunc={setCardFunc}
          setModalOpen={setModalOpen}
          origin={getOriginCard()}
        />
      )}
    </div>
  );
};

interface TypeSelProps {
  isSuited: boolean;
  setIsSuited: (isSuited: boolean) => void;
}

const TypeSel: React.FC<TypeSelProps> = (props) => {
  return (
    <div className="flex h-full justify-center py-2 ">
      <BasicBtn
        name="suited"
        isSel={props.isSuited ?? false}
        onClick={() => {
          props.setIsSuited(true);
        }}
      />
      <BasicBtn
        name="off-suit"
        isSel={!props.isSuited ?? false}
        onClick={() => {
          props.setIsSuited(false);
        }}
      />
    </div>
  );
};

interface BasicBtnProps {
  name?: string;
  isSel: boolean;
  onClick?: () => void;
}

const BasicBtn: React.FC<BasicBtnProps> = ({ name, isSel, onClick }) => {
  return (
    <button
      className={
        isSel
          ? "block mx-2 bg-blue-200 rounded-xl border-2 border-yellow-200 cursor-pointer px-2 py-1"
          : "block mx-2 hover:bg-blue-200 rounded-xl border-2 border-gray-100 cursor-pointer px-2 py-1"
      }
      onClick={onClick}
    >
      {name ?? ""}
    </button>
  );
};

interface ResultRankProps {
  rank: string;
}

const ResultRank: React.FC<ResultRankProps> = (props) => {
  return (
    <div className="flex  h-[50%] justify-center text-2xl font-bold text-white pb-3">
      상위 {props.rank} % 핸드
    </div>
  );
};

export default HandRankInput;
