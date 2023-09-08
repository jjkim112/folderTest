import React from 'react';

interface WeekDayBoxProps {
  selectedDays: string[];
  onDaySelect: (days: string[]) => void;
}

export const WeekDayBox: React.FC<WeekDayBoxProps> = ({
  selectedDays,
  onDaySelect,
}) => {
  const handleDayClick = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    onDaySelect(newDays);
    //클릭과 동시에 받아오는 selectedDays를 업뎃, 즉 플옵스로 받는 days의 useState를 바로 실시간으로 업데이트
    //그렇게 selectecdDays 안에 해당 요일이 있으면 색 변경-참,거짓으로 진행
  };

  return (
    <div>
      {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
        <div
          className={`inline-block w-10 h-10 text-center items-center  m-5 border-2 border-gray-400  leading-8 ${
            selectedDays.includes(day) ? 'bg-purple-400' : 'bg-gray-500'
          } cursor-pointer  hover:opacity-70`}
          key={day}
          //여기서 스타일 컴포넌트 플옵수 사용데스
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
};
