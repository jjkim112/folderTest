import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import handData2 from './hand_data2.json';
import handData3 from './hand_data3.json';
import handData4 from './hand_data4.json';
import handData6 from './hand_data6.json';
import handData8 from './hand_data8.json';
import handData10 from './hand_data.json';

import './hand_rank.css';
// Cheerio 모듈 가져오기
type selectedData = {
  index: number;
  card: string;
  sum: number;
}[];
interface WholeRangeChartProps {
  percentage: number;
  selectedData: selectedData;
}

const HandRankSlider: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(30);
  const [selectedBtn, setSelectedBtn] = useState('2');
  const [selectedData, setSelectedData] = useState(handData2);

  const handleButtonClick = (name: string) => {
    setSelectedBtn(name);
  };
  const handleButtonData = (name: string) => {
    switch (name) {
      case '2':
        setSelectedData(handData2);
        break;
      case '3':
        setSelectedData(handData3);
        break;
      case '4~5':
        setSelectedData(handData4);
        break;
      case '6~7':
        setSelectedData(handData6);
        break;
      case '8~9':
        setSelectedData(handData8);
        break;
      case '10':
        setSelectedData(handData10);
        break;

      default:
        setSelectedData(handData2);
        break;
    }
  };
  return (
    <div className="justify-center items-center ">
      <Xway
        value={selectedBtn}
        handleButtonClick={handleButtonClick}
        handleButtonData={handleButtonData}
      />
      <div className="ml-4 text-3xl text-amber-300 ">{selectedBtn}명일때</div>
      <WholeRangeChart percentage={percentage} selectedData={selectedData} />

      <RangeText value={percentage} />
      <Box className="mx-auto w-4/5">
        <Slider
          onChange={(_, value) => {
            if (typeof value === 'number') {
              setPercentage(value);
            }
          }}
          value={percentage}
          step={0.5}
          min={0.5}
          max={100}
        />
      </Box>
    </div>
  );
};

interface XwayProps {
  value: string;
  handleButtonClick: React.Dispatch<React.SetStateAction<string>>;
  handleButtonData: React.Dispatch<React.SetStateAction<string>>;
}
const Xway: React.FC<XwayProps> = (props) => {
  return (
    <div className="grid grid-cols-3 gap-1  text-2xl m-2  ">
      <BasicBtn
        name="2"
        isSel={props.value === '2'}
        onClick={() => {
          props.handleButtonClick('2');
          props.handleButtonData('2');
        }}
      ></BasicBtn>
      <BasicBtn
        name="3"
        isSel={props.value === '3'}
        onClick={() => {
          props.handleButtonClick('3');
          props.handleButtonData('3');
        }}
      ></BasicBtn>
      <BasicBtn
        name="4~5"
        isSel={props.value === '4~5'}
        onClick={() => {
          props.handleButtonClick('4~5');
          props.handleButtonData('4~5');
        }}
      ></BasicBtn>
      <BasicBtn
        name="6~7"
        isSel={props.value === '6~7'}
        onClick={() => {
          props.handleButtonClick('6~7');
          props.handleButtonData('6~7');
        }}
      ></BasicBtn>
      <BasicBtn
        name="8~9"
        isSel={props.value === '8~9'}
        onClick={() => {
          props.handleButtonClick('8~9');
          props.handleButtonData('8~9');
        }}
      ></BasicBtn>
      <BasicBtn
        name="10"
        isSel={props.value === '10'}
        onClick={() => {
          props.handleButtonClick('10');
          props.handleButtonData('10');
        }}
      ></BasicBtn>
    </div>
  );
};
interface BasicBtnProps {
  name?: string;
  isSel?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const BasicBtn: React.FC<BasicBtnProps> = ({ name, isSel, onClick }) => {
  return (
    <button
      className={
        isSel
          ? 'block mx-2 bg-red-200 shadow-xl rounded-full border-2 border-gray-400 cursor-pointer px-2 py-1'
          : 'block mx-2 hover:bg-red-200 shadow-xl rounded-full bg-white       border-2 border-gray-400 cursor-pointer px-2 py-1'
      }
      onClick={onClick}
    >
      {name ?? ''}
    </button>
  );
};
interface RangeTextProps {
  value: number;
}
const RangeText: React.FC<RangeTextProps> = (props) => {
  return (
    <div className="flex justify-center text-2xl mb-5">
      상위
      <div className="flex justify-center w-20 font-extrabold">
        {' '}
        {props.value}{' '}
      </div>
      % 핸드
    </div>
  );
};

const WholeRangeChart: React.FC<WholeRangeChartProps> = (props) => {
  const get169Hands = () => {
    const numList = [
      'a',
      'k',
      'q',
      'j',
      't',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
    ];
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

  return (
    <div className="rangeGrid">
      {get169Hands().map((v, i) => {
        const card: HandDataObject | null = getCardData(v);
        if (card?.sum && card.sum <= props.percentage) {
          return (
            <div
              className={
                v.charAt(0) === v.charAt(1)
                  ? 'containItemPocket'
                  : 'containItem'
              }
              key={i}
            >
              {`${v.substring(0, 2).toUpperCase()}${v.charAt(2)}`}
            </div>
          );
        } else {
          return (
            <div className="notContainItem" key={i}>
              {`${v.substring(0, 2).toUpperCase()}${v.charAt(2)}`}
            </div>
          );
        }
      })}
    </div>
  );
};

export default HandRankSlider;
