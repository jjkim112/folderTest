import React from 'react';
import styled from 'styled-components';

interface WeekDayBoxProps {
  selectedDays: string[];
  onDaySelect: (days: string[]) => void;
}

const StyledBox = styled.div<{ isSelected: boolean }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  background-color: ${(props) => (props.isSelected ? 'gray' : 'purple')};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
//이 스타일 컴포넌트는 그사람의 힘을 빌렸어요

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
        <StyledBox
          key={day}
          isSelected={selectedDays.includes(day)}
          //여기서 스타일 컴포넌트 플옵수 사용데스
          onClick={() => handleDayClick(day)}
        >
          {day}
        </StyledBox>
      ))}
    </div>
  );
};
