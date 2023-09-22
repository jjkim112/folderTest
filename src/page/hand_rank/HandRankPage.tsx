import React, { useState } from 'react';
import HandRankInput from './HandRankInput';
import HandRankSlider from './HandRankSlider';
import handData2 from './hand_data2.json';
interface TopBarProps {
  isInput: boolean;
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
}
type SelectedData = {
  index: number;
  card: string;
  sum: number;
}[];
const HandRankPage: React.FC = () => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState('2');
  const [selectedData, setSelectedData] = useState<SelectedData>(handData2);

  return (
    <div className=" h-full">
      <HandRankInput
        selectedBtn={selectedBtn}
        setSelectedBtn={setSelectedBtn}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

// const TopBar: React.FC<TopBarProps> = ({ isInput, setIsInput }) => {
//   return (
//     <header className="flex justify-center py-2">
//       <BasicBtn
//         name="Hand 입력"
//         isSel={isInput}
//         onClick={() => {
//           console.log('dsadasdasdasdsa');
//           setIsInput(true);
//         }}
//       />
//       <BasicBtn
//         name="Hand 상위%"
//         isSel={!isInput}
//         onClick={() => {
//           console.log('dsadasdasdasdsa');
//           setIsInput(false);
//         }}
//       />
//     </header>
//   );
// };

// interface BasicBtnProps {
//   name?: string;
//   isSel?: boolean;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
// }

// const BasicBtn: React.FC<BasicBtnProps> = ({ name, isSel, onClick }) => {
//   return (
//     <button
//       className={
//         isSel
//           ? 'block mx-2 bg-red-200 shadow-xl rounded-full border-2 border-gray-400 cursor-pointer px-2 py-1'
//           : 'block mx-2 hover:bg-red-200 shadow-xl rounded-full bg-white       border-2 border-gray-400 cursor-pointer px-2 py-1'
//       }
//       onClick={onClick}
//     >
//       {name ?? ''}
//     </button>
//   );
// };

export default HandRankPage;
