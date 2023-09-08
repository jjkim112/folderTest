import React from 'react';

interface TournaEditButtonProps {
  onClick: () => void;
}

export const TournaEditButton: React.FC<TournaEditButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      style={{
        backgroundColor: 'red',
        border: '1px solid black',
        padding: '3px',
        cursor: 'pointer',
        color: 'white',
      }}
      onClick={onClick}
    >
      토너 수정
    </button>
  );
};
