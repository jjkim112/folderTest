import { useEffect, useState } from 'react';
import { TestComp } from './TestCompProps';
import EditIcon from '@mui/icons-material/Edit';
import { GameTemplate } from 'src/domain/GameTemplate.model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import {
  Weeks,
  addTemplatesData,
  deleteTemplatesData,
  setTemplatesData,
  updateOnePubData,
} from 'src/reducer/adminPub';
import { WeekDayBox } from './week';

interface GameEditDialogProps {
  gameTemplate?: GameTemplate | null;
  onCancel: () => void;
}
interface BoxInfo {
  title: string;
  subTitle: string;
  content: string;
  days: string[];
}
export const GameEditDialog = ({
  gameTemplate,
  onCancel,
}: GameEditDialogProps) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [info, setInfo] = useState('');
  const [photos, setPhotos] = useState<string[]>(['', '', '']);
  const tam = useSelector((state: RootState) => state.admin.weeks);
  const [days, setDays] = useState<string[]>([]);
  const [boxes, setBoxes] = useState<BoxInfo[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const dayList = ['월', '화', '수', '목', '금', '토', '일'];

  const clickEditPhotos = () => {};

  const handleParentClick = (event) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      console.log('parent clicked');
      setTitle('');
      setSubtitle('');
      setInfo('');
      setPhotos([]);
      onCancel();
    }
  };

  const handleAddBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        tam.length.toString(),
        info,
        subtitle,
        title,
        []
      ),
      weeks: [...days],
    };
    dispatch(addTemplatesData(updataTam));

    dispatch(updateOnePubData(tam));
    onCancel();
  };

  const deleteBox = (index: string) => {
    dispatch(deleteTemplatesData(index));

    setTitle('');
    setInfo('');
    setSubtitle('');
    setDays([]);
    setSelectedBoxIndex(null);
    onCancel();
  };
  const updateBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        selectedBoxIndex.toString(),
        info,
        subtitle,
        title,
        []
      ),
      weeks: [...days],
    };
    dispatch(setTemplatesData(updataTam));
    dispatch(updateOnePubData(tam));

    setTitle('');
    setInfo('');
    setSubtitle('');
    setDays([]);
    setSelectedBoxIndex(null);
    onCancel();
  };
  useEffect(() => {
    if (gameTemplate !== null) {
      setSelectedBoxIndex(Number(gameTemplate.id));
      setTitle(gameTemplate.title);
      setSubtitle(gameTemplate.subTitle);
      setInfo(gameTemplate.info);
      setPhotos(gameTemplate.photos);
      tam.map((v, i) => {
        if (v.template.id === gameTemplate.id.toString()) {
          setDays(v.weeks);
        }
      });
    } else {
    }
  }, []);

  return (
    <div
      className="absolute left-0 top-0 w-full h-full"
      onClick={handleParentClick}
    >
      <div
        className="absolute top-[200px] left-[12.5%] w-3/4 h-[800px] bg-slate-300 border-2 border-black rounded-2xl"
        onClick={() => {}}
      >
        <TestComp
          title="제목"
          placeholder="제목을 입력해 주세요"
          content={title}
          setContent={setTitle}
        />
        <TestComp
          title="소제목"
          placeholder="소제목을 입력해 주세요"
          content={subtitle}
          setContent={setSubtitle}
        />

        <div className="p-2 flex flex-col w-full text-black ">
          <label className="text-white py-2">컨텐츠 설명 입력</label>
          <textarea
            className="h-32 resize-none"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <div className="p-2 flex flex-col">
          <div className="flex items-center">
            <span className="py-2 mr-4">사진</span>
            <EditIcon
              fontSize="small"
              className="hover:cursor-pointer"
              onClick={clickEditPhotos}
            ></EditIcon>
          </div>
          <div className="flex mb-2">
            {photos.map((url, i) => (
              <img
                key={`di${i}`}
                alt={`di${i}`}
                className="rounded-2xl mr-3"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'fill',
                }}
                src={url}
              />
            ))}
          </div>
        </div>

        <div className="p-2 flex flex-col">
          <span className="py-2 mr-4">요일</span>
          <WeekDayBox selectedDays={days} onDaySelect={setDays} />
        </div>
        {gameTemplate !== null ? (
          <>
            <div className="p-2 flex flex-col">
              <span className="py-2 mr-4">삭제하기</span>
              <div
                className="flex h-8 hover:cursor-pointer rounded-lg border-[1px] border-red-300  text-red-600 justify-center items-center"
                onClick={() => deleteBox(gameTemplate.id)}
              >
                삭제하기
              </div>
            </div>
            <div
              className="mx-auto flex w-32 h-16 hover:cursor-pointer rounded-lg border-[1px] border-black-300  justify-center items-center"
              onClick={() => updateBox()}
            >
              수정하기
            </div>
          </>
        ) : (
          <div
            className="mx-auto flex w-32 h-16 hover:cursor-pointer rounded-lg border-[1px] border-black-300  justify-center items-center"
            onClick={() => handleAddBox()}
          >
            추가하기
          </div>
        )}
      </div>
    </div>
  );
};
