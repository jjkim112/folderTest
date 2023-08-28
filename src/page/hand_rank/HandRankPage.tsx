import React, { useState } from 'react';
import HandRankInput from './HandRankInput';
import HandRankSlider from './HandRankSlider';

interface TopBarProps {
  isInput: boolean;
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandRankPage: React.FC = () => {
  const [isInput, setIsInput] = useState<boolean>(false);

  return (
    <div className=" h-screen">
      <TopBar isInput={isInput} setIsInput={setIsInput} />
      {isInput ? <HandRankInput /> : <HandRankSlider />}
    </div>
  );
};

const TopBar: React.FC<TopBarProps> = ({ isInput, setIsInput }) => {
  return (
    <header className="flex justify-center py-2">
      <BasicBtn
        name="Hand 입력"
        isSel={isInput}
        onClick={() => {
          console.log('dsadasdasdasdsa');
          setIsInput(true);
        }}
      />
      <BasicBtn
        name="Hand 상위%"
        isSel={!isInput}
        onClick={() => {
          console.log('dsadasdasdasdsa');
          setIsInput(false);
        }}
      />
    </header>
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

export default HandRankPage;
