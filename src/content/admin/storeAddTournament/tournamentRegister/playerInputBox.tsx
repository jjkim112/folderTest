import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FullFeaturedCrudGrid } from './playerInputBoard';
import { Game, GamePlayerThumb } from 'src/domain/Game.model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import {
  reSetOneData,
  setOneGameData,
  toggleEditMode,
  udateGameData,
  updateOneGameData,
} from 'src/reducer/gameSlice';
import { AdminRequireLayout } from '../../AdminRequireLayout';
import { FirebasePub } from 'src/data/firebase/FirebasePub';
import { DataService } from 'src/data/DataService';
import { Pub } from 'src/domain/Pub.model';
type BasicType = {
  pubsData: Pub;
};

export const BasicTextFields: React.FC<BasicType> = ({ pubsData }) => {
  const formRef = React.useRef(null);
  const gamesData = useSelector((state: RootState) => state.game.oneGame);
  const gamesPlayer = useSelector(
    (state: RootState) => state.game.oneGamePlayers
  );
  const isEdit = useSelector((state: RootState) => state.game.isEdit);
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = React.useState<Game>(
    useSelector((state: RootState) => state.game.oneGame)
  );
  React.useEffect(() => {
    setInputs(gamesData);
  }, [gamesData]);

  const addInfoToList = async () => {
    let newGame = new Game(
      inputs.date.toJSON(), // id
      pubsData.id, // pubId
      inputs.gameTempId,
      inputs.title,
      inputs.subTitle,
      inputs.description,
      inputs.note,
      Number(inputs.entry),
      inputs.date,
      inputs.totalReward,
      gamesPlayer
    );
    console.log(newGame);
    dispatch(udateGameData(newGame));

    await FirebasePub.addNewGame(
      pubsData.id,
      inputs.date.toJSON(),
      newGame.toMap
    );
    dispatch(reSetOneData());
  };
  const updateInfoToList = async () => {
    console.log(inputs);
    console.log(gamesData);
    let newGame = new Game(
      gamesData.id, // id
      pubsData.id, // pubId
      inputs.gameTempId ?? gamesData.gameTempId,
      gamesData.title,
      gamesData.subTitle,
      gamesData.subTitle,
      inputs.note ?? gamesData.note,
      Number(inputs.entry) ?? gamesData.entry,
      inputs.date ?? gamesData.date,
      inputs.totalReward ?? gamesData.totalReward,
      gamesPlayer
    );
    console.log(newGame);

    dispatch(updateOneGameData(newGame));
    dispatch(toggleEditMode(false));

    await FirebasePub.addNewGame(
      pubsData.id,
      inputs.date?.toJSON(),
      newGame.toMap
    );
    dispatch(reSetOneData());
  };

  const mergeInputBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    if (name === 'gameTemplateId') {
      for (let oneTemplate of pubsData.templates) {
        if (oneTemplate.id === value) {
          console.log('이름적용');
          setInputs(
            (prevInputs) =>
              ({
                ...prevInputs,
                title: oneTemplate.title,
                subTitle: oneTemplate.subTitle,
                description: oneTemplate.info,
                gameTempId: oneTemplate.id,
              } as Game)
          );
        }
      }
    } else {
      setInputs(
        (prevInputs) =>
          ({
            ...prevInputs,
            [name]: value,
          } as Game)
      ); // Type assertion to Game type
    }
  };
  const mergeClickInputBox = (id: string) => {
    for (let oneTemplate of pubsData.templates) {
      if (oneTemplate.id === id) {
        console.log('이름적용');
        setInputs(
          (prevInputs) =>
            ({
              ...prevInputs,
              title: oneTemplate.title,
              subTitle: oneTemplate.subTitle,
              description: oneTemplate.info,
              gameTempId: oneTemplate.id,
            } as Game)
        );
      }
    }
  };

  return (
    <AdminRequireLayout>
      <div className="flex flex-col justify-center items-center">
        <Box
          className="bg-white"
          component="form"
          ref={formRef}
          sx={{
            '& > :not(style)': { m: 2, width: '138ch' },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <PlayerInputList /> */}
          <FullFeaturedCrudGrid rows={gamesPlayer} />
          <div className="flex gap-3">
            <div className="-my-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    value={dayjs(inputs.date)}
                    onChange={(newValue: any) => {
                      const nextInputs: Game = {
                        ...inputs,
                        date: new Date(newValue),
                      } as Game;
                      console.log(nextInputs);

                      setInputs(nextInputs);
                    }}
                    label="날짜 및 시간"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex gap-3">
              <TextField
                name="entry"
                value={inputs.entry}
                onChange={mergeInputBox}
                id="entry"
                label="총합 엔트리"
                variant="outlined"
              />
              <TextField
                name="totalReward"
                value={inputs.totalReward}
                onChange={mergeInputBox}
                id="totalReward"
                label="총상금"
                variant="outlined"
              />

              <TextField
                name="note"
                value={inputs.note}
                onChange={mergeInputBox}
                id="standard-basic"
                label="비고"
                variant="outlined"
              />
              <TextField
                id="outlined-select-currency"
                select //선택하는 형태로 바꿔주는거
                label="게임템플릿"
                helperText="Please select your currency"
                value={inputs.gameTempId}
                onChange={mergeInputBox}
                name="gameTemplateId"
              >
                {pubsData &&
                  pubsData.templates &&
                  pubsData.templates.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      onClick={() => mergeClickInputBox(option.id)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          </div>
        </Box>
        <div className="flex flex-row gap-1 p-2">
          {isEdit ? (
            <button
              className="bg-black w-10 text-yellow-300"
              onClick={updateInfoToList}
            >
              수정하기
            </button>
          ) : (
            <button
              className="bg-black w-10 text-yellow-300"
              onClick={addInfoToList}
            >
              등록하기
            </button>
          )}
          {isEdit ? (
            <button
              className="bg-black w-10  text-yellow-300"
              onClick={() => {
                dispatch(toggleEditMode(false));
                dispatch(reSetOneData());
              }}
            >
              수정 취소
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </AdminRequireLayout>
  );
};
