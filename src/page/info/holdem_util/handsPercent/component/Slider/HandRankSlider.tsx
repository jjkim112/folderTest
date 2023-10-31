import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../../../../../../styles/page/handsPercent/Slider/hand_rank.css";

// Cheerio 모듈 가져오기
type SelectedData = {
  index: number;
  card: string;
  sum: number;
}[];
interface HandRankSliderProps {
  selectedBtn: string;
  setSelectedBtn: React.Dispatch<React.SetStateAction<string>>;
  selectedData: SelectedData;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedData>>;
  handleButtonClick: (name: string) => void;
  handleButtonData: (name: string) => void;
  cards: string[];
  rank: string;
}
interface WholeRangeChartProps {
  percentage: number;
  selectedData: SelectedData;
  cards: string[];
}

const HandRankSlider: React.FC<HandRankSliderProps> = ({
  selectedBtn,
  setSelectedBtn,
  selectedData,
  setSelectedData,
  handleButtonClick,
  handleButtonData,
  cards,
  rank,
}) => {
  const [percentage, setPercentage] = useState<number>(30);
  useEffect(
    () => setPercentage(Number(rank) === 0 ? 30 : Number(rank)),
    [rank]
  );
  return (
    <div className="justify-center items-center pt-4">
      <RangeText value={percentage} />
      <div className="flex flex-row w-full  justify-between px-5">
        <Box className="w-[50%]">
          <Slider
            onChange={(_, value) => {
              if (typeof value === "number") {
                setPercentage(value);
              }
            }}
            value={percentage}
            step={0.5}
            min={0.5}
            max={100}
          />
        </Box>
        <Xway
          value={selectedBtn}
          handleButtonClick={handleButtonClick}
          handleButtonData={handleButtonData}
        />
      </div>

      <WholeRangeChart
        cards={cards}
        percentage={percentage}
        selectedData={selectedData}
      />
    </div>
  );
};

interface XwayProps {
  value: string;
  handleButtonClick: React.Dispatch<React.SetStateAction<string>>;
  handleButtonData: React.Dispatch<React.SetStateAction<string>>;
}
export const Xway: React.FC<XwayProps> = (props) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.handleButtonClick(event.target.value as string);
    props.handleButtonData(event.target.value as string);
  };
  return (
    <Box sx={{ width: "30%" }}>
      <FormControl fullWidth>
        <InputLabel
          id="players-select-label"
          sx={{
            color: "red",
            fontSize: 20,
          }}
        >
          players
        </InputLabel>
        <Select
          labelId="players-select-label"
          id="players-select"
          value={props.value}
          label="players"
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderColor: "red", // 원하는 색상으로 변경 (예: red, blue, #ff0000 등)
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red", // 원하는 색상으로 변경 (예: red, blue, #ff0000 등)
              },
              "&:hover fieldset": {
                borderColor: "green", // 마우스 호버 시의 색상 설정 (원하는 색상으로 변경)
              },
            },
          }}
        >
          <MenuItem
            value={"2"}
            onClick={() => {
              props.handleButtonClick("2");
              props.handleButtonData("2");
            }}
          >
            2명
          </MenuItem>
          <MenuItem
            value={"3"}
            onClick={() => {
              props.handleButtonClick("3");
              props.handleButtonData("3");
            }}
          >
            3명
          </MenuItem>{" "}
          <MenuItem
            value={"4~5"}
            onClick={() => {
              props.handleButtonClick("4~5");
              props.handleButtonData("4~5");
            }}
          >
            4~5명
          </MenuItem>{" "}
          <MenuItem
            value={"6~7"}
            onClick={() => {
              props.handleButtonClick("6~7");
              props.handleButtonData("6~7");
            }}
          >
            6~7명
          </MenuItem>{" "}
          <MenuItem
            value={"8~9"}
            onClick={() => {
              props.handleButtonClick("8~9");
              props.handleButtonData("8~9");
            }}
          >
            8~9명
          </MenuItem>{" "}
          <MenuItem
            value={"10"}
            onClick={() => {
              props.handleButtonClick("10");
              props.handleButtonData("10");
            }}
          >
            10명
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

interface RangeTextProps {
  value: number;
}
const RangeText: React.FC<RangeTextProps> = (props) => {
  return (
    <div className="flex justify-center text-white text-2xl mb-5 font-extrabold">
      상위
      <div className="flex justify-center w-20 text-yellow-500 ">
        {" "}
        {props.value}{" "}
      </div>
      % 핸드
    </div>
  );
};

const WholeRangeChart: React.FC<WholeRangeChartProps> = (props) => {
  const numList = [
    "a",
    "k",
    "q",
    "j",
    "t",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const get169Hands = () => {
    var tempList: any[] = [];
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 13; j++) {
        if (i === j) {
          tempList = [...tempList, `${numList[i]}${numList[i]}p`];
        } else if (i > j) {
          tempList = [...tempList, `${numList[j]}${numList[i]}o`];
        } else {
          tempList = [...tempList, `${numList[i]}${numList[j]}s`];
        }
      }
    }
    return tempList;
  };

  interface HandDataObject {
    card: string;
    sum: number;
  }

  const getCardData = (value: string): HandDataObject | null => {
    for (let i = 0; i < props.selectedData.length; i++) {
      if (props.selectedData[i]?.card === value) {
        return props.selectedData[i];
      }
    }
    return null;
  };
  const getCardStr = (cards: string[]): string => {
    if (cards.length !== 2) {
      return "";
    }
    const leftCard = cards[0][1];
    const rightCard = cards[1][1];
    const isSuited = cards[0][0] === cards[1][0];
    const leftI = numList.indexOf(leftCard);
    const rightI = numList.indexOf(rightCard);
    if (leftI === rightI) {
      return `${leftCard}${leftCard}p`;
    }
    if (leftI > rightI) {
      return `${rightCard}${leftCard}${isSuited ? "s" : "o"}`;
    }
    return `${leftCard}${rightCard}${isSuited ? "s" : "o"}`;
  };

  return (
    <div className="rangeGrid">
      {get169Hands().map((v, i) => {
        console.log(getCardStr(props.cards));
        const card: HandDataObject | null = getCardData(v);
        if (card?.sum && card.sum <= props.percentage) {
          return (
            <div
              className={`${
                card.card === getCardStr(props.cards)
                  ? "border-green-300 border-[3px]"
                  : null
              }  ${
                v.charAt(0) === v.charAt(1)
                  ? "containItemPocket"
                  : "containItem"
              } `}
              key={i}
            >
              {`${v.substring(0, 2).toUpperCase()}${v.charAt(2)}`}
            </div>
          );
        } else {
          return (
            <div
              className={` 
              notContainItem
           `}
              key={i}
            >
              {`${v.substring(0, 2).toUpperCase()}${v.charAt(2)}`}
            </div>
          );
        }
      })}
    </div>
  );
};

export default HandRankSlider;
