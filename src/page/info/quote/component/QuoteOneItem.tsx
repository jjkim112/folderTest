import { useState } from 'react';
import './quote.css';
import Avatar from '@mui/material/Avatar';
type QuoteOneItemProps = {
  pokerQuote: string;
  lifeQuote: string;
};
const QuoteOneItem = ({ pokerQuote, lifeQuote }: QuoteOneItemProps) => {
  const [toggle, setToggle] = useState(true);

  const onClickToggle = (isMouseIn: boolean) => (e: any) => {
    setToggle(isMouseIn);
  };

  return (
    <div className="flex flex-row  h-[100px] justify-start w-full my-4 rounded-2xl bg-white">
      <Avatar
        alt="Remy Sharp"
        src="/assets/images/gangnaeng.jpg"
        sx={{ width: '5vw', height: '7vh' }}
        className="self-center"
      />
      <div className="flex flex-col w-full justify-center  text-start text-[1.5vw]">
        <div className="font-extrabold">{pokerQuote}</div>

        <div className="">{lifeQuote}</div>
      </div>
    </div>
  );
};

export default QuoteOneItem;
