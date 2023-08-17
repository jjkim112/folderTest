import React from 'react';
import { useSelector } from 'react-redux';
import { OpenDay } from 'src/domain/Days.model';
import { RootState } from 'src/store/store';

interface BoxProps {
  title: string;
  subTitle: string;
  content: string;

  oneDay: string;
  onClick: () => void;
  onClick2: () => void;
}
export const Box: React.FC<BoxProps> = ({
  title,
  subTitle,
  content,

  oneDay,
  onClick,
  onClick2,
}) => {
  const tam = useSelector((state: RootState) => state.admin.weeks);
  return (
    <div className="p-2 flex flex-col relative" onClick={onClick}>
      <div className="absolute top-0 left-0 p-1 z-10 " onClick={onClick2}>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 bg-white text-red-500"
        >
          <path
            d="M19 6L18 19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19L5 6H3V4H7L8 2H16L17 4H21V6H19ZM8.81 19L9.81 7H14.19L15.19 19H8.81ZM13 10V17H11V10H13Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center text-center py-1 pb-4">
        <div className="bg-slate-800 rounded-tr-md rounded-tl-md py-4">
          {title}
        </div>
        <div className="bg-slate-800 py-4">{subTitle}</div>
        <div className="bg-slate-800 py-4">{content}</div>
        <div className="bg-slate-800 rounded-br-md rounded-bl-md py-4">
          {tam.map((v, i) => (
            <div key={i} className="flex flex-row justify-center">
              {v.template.id === oneDay &&
                v.weeks.map((game, i) => <div className="px-2">{game}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
