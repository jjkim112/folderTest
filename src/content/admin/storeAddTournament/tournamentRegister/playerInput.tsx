import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
export interface playerInputItem {
  playerId: string;
  prize: number;
  rank: number;
}

const addPlayerInput = () => {};

export const PlayerInputList: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '23ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-col outline outline-gray-950 gap-y-6 p-2">
        <TextField
          id="playerId"
          label="playerId" //제목
          variant="outlined"
          placeholder="플레이어 이름을 입력하세요"
          // value={playerId}
          // onChange={}
        />
        <TextField
          id="prize"
          label="prize" //제목
          variant="outlined"
          placeholder="플레이어 상금을 입력하세요"
        />
        <TextField
          id="rank"
          label="rank" //제목
          variant="outlined"
          placeholder="플레이어 순위를 입력하세요"
        />
        <button onClick={addPlayerInput}>+</button>
      </div>
    </Box>
  );
};
