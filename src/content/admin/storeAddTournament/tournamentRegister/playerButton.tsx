import React from 'react';

interface PlayerButtonProps {
  isEdit: boolean;
  onClick: () => void;
}

export const PlayerButton: React.FC<PlayerButtonProps> = ({
  isEdit,
  onClick,
}) => {
  return (
    <button
      style={{
        backgroundColor: isEdit ? 'gray' : 'green',
        border: '1px solid black',
        padding: '3px',
        cursor: 'pointer',
        color: 'white',
      }}
      onClick={onClick}
    >
      유저 상세
    </button>
  );
};
