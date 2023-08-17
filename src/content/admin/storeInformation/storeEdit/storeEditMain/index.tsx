import { useState, useEffect } from 'react';
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from 'src/data/DataService';
import { GameTemplate } from 'src/domain/GameTemplate.model';
import { Pub } from 'src/domain/Pub.model';
import { refreshGames } from 'src/reducer/gameSlice';
import { refreshWithPubId } from 'src/reducer/userSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { TestComp } from './TestCompProps';
import { WeekDayBox } from './week';
import { Box } from './box';
import {
  Weeks,
  addTemplatesData,
  deleteTemplatesData,
  setTemplatesData,
  setWeekPubData,
  updateOnePubData,
} from 'src/reducer/adminPub';
import { sub } from 'date-fns';
import { FirebasePub } from 'src/data/firebase/FirebasePub';

interface BoxInfo {
  title: string;
  subTitle: string;
  content: string;
  days: string[];
}
export default function StoreEditForm() {
  const id = useParams().id;
  const pickPub = useSelector((state: RootState) => state.admin.pub);
  const tam = useSelector((state: RootState) => state.admin.weeks);

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [boxes, setBoxes] = useState<BoxInfo[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const [visibility, setVisibility] = useState<boolean[]>(
    new Array(7).fill(false)
  );

  const toggleVisibility = (index: number) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };
  const finalFirebaseUpdate = async () => {
    await FirebasePub.updatePub(pickPub.id, pickPub.toMap);
  };

  const handleAddBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        tam.length.toString(),
        content,
        subTitle,
        title
      ),
      weeks: [...days],
    };
    dispatch(addTemplatesData(updataTam));

    dispatch(updateOnePubData(tam));

    setTitle('');
    setSubTitle('');
    setContent('');
    setDays([]);
  };

  const deleteBox = (index: string) => {
    dispatch(deleteTemplatesData(index));

    setTitle('');
    setSubTitle('');
    setContent('');
    setDays([]);
    setSelectedBoxIndex(null);
  };
  const updateBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        selectedBoxIndex.toString(),
        content,
        subTitle,
        title
      ),
      weeks: [...days],
    };
    dispatch(setTemplatesData(updataTam));
    dispatch(updateOnePubData(tam));

    setTitle('');
    setSubTitle('');
    setContent('');
    setDays([]);
    setSelectedBoxIndex(null);
  };

  const handleClickBox = (box: GameTemplate, index: number) => {
    if (selectedBoxIndex === index) {
      setTitle('');
      setSubTitle('');
      setContent('');
      setDays([]);
      setSelectedBoxIndex(null);
    } else {
      setSelectedBoxIndex(index);
      setTitle(box.title);
      setSubTitle(box.subTitle);
      setContent(box.info);

      tam.map((v, i) => {
        if (v.template.id === index.toString()) {
          setDays(v.weeks);
        }
      });
      console.log(days);
    }
  };

  if (pickPub != null) {
    return (
      <div className=" w-full text-white">
        <div className="p-2">
          <div>
            <button
              className="border-2 bg-blue-700 text-black font-bold p-3 rounded-lg "
              onClick={() => {
                navigate(-1);
              }}
            >
              ⬅️ 돌아가기
            </button>
            <button
              className="border-2 mx-2 bg-green-500 text-black font-bold p-3 rounded-lg "
              onClick={() => {
                finalFirebaseUpdate();
              }}
            >
              ⬅️ 수정완료
            </button>
          </div>
          <div className="flex flex-col">
            <TestComp
              title="타이틀 입력"
              placeholder="타이틀을 입력해 주세요"
              content={title}
              setContent={setTitle}
            />
            <TestComp
              title="서브 타이틀 입력"
              placeholder="서브 타이틀을 입력해 주세요"
              content={subTitle}
              setContent={setSubTitle}
            />

            <div className="p-2 flex flex-col w-full  text-black ">
              <label className="text-white py-2">컨텐츠 설명 입력</label>
              <textarea
                className="h-30"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <WeekDayBox selectedDays={days} onDaySelect={setDays} />
            {selectedBoxIndex === null ? (
              <button onClick={handleAddBox}>추가</button>
            ) : (
              <button onClick={updateBox}>수정</button>
            )}

            <div>
              <div className=" text-3xl"> 토너먼트 정보 추가/삭제</div>
              {tam.map((box, index) => (
                <Box
                  key={`${index}dsadsa`}
                  title={box.template.title}
                  subTitle={box.template.subTitle}
                  content={box.template.info}
                  oneDay={box.template.id}
                  onClick={() => {
                    handleClickBox(box.template, Number(box.template.id));
                  }}
                  onClick2={() => {
                    deleteBox(box.template.id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-2">
          <>
            <div className="p-2 text-3xl">요일 별 오픈 토너먼트</div>
            <div className="py-2">
              {pickPub &&
                pickPub.days.map((daysValue, daysIndex) => (
                  <div key={daysIndex} className="py-2">
                    {visibility[daysIndex] ? (
                      <h1 onClick={() => toggleVisibility(daysIndex)}>
                        <AiFillCaretUp className="inline" />{' '}
                        {`  ${daysValue.day}`}
                      </h1>
                    ) : (
                      <h1 onClick={() => toggleVisibility(daysIndex)}>
                        <AiFillCaretDown className="inline" />
                        {`  ${daysValue.day}`}
                      </h1>
                    )}
                    {visibility[daysIndex] &&
                      daysValue.games.map((gamesValue, gamesIndex) => (
                        <div key={`${gamesIndex}_${gamesValue.length}`}>
                          <div>
                            {pickPub.templates.map(
                              (templatesValue, templatesIndex) =>
                                templatesValue.id === gamesValue ? (
                                  <div
                                    key={templatesIndex}
                                    className="flex flex-col justify-center text-center py-1 pb-4"
                                  >
                                    <div className="bg-slate-800 rounded-tr-md  rounded-tl-md py-4">
                                      {templatesValue.title}
                                    </div>
                                    <div className="bg-slate-800 py-4">
                                      {templatesValue.subTitle}
                                    </div>
                                    <div className="bg-slate-800 rounded-br-md  rounded-bl-md py-4">
                                      {templatesValue.info}
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페인지 접근 입니다.</div>
        <br />
        <button
          className="bg-white"
          onClick={() => navigate('/admin/storeInfo')}
        >
          이전페이지로
        </button>
      </div>
    );
  }
}
