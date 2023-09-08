import React from 'react';

interface PlayerButtonProps {
  onClick: () => void;
}

export const PlayerButton: React.FC<PlayerButtonProps> = ({ onClick }) => {
  return (
    <button
      style={{
        backgroundColor: 'green',
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
