import { useState, useEffect, useCallback } from 'react';
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from 'src/data/DataService';
import { Pub } from 'src/domain/Pub.model';
import { setOnePubData, setWeekPubData } from 'src/reducer/adminPub';
import { refreshGames } from 'src/reducer/gameSlice';
import { refreshWithPubId } from 'src/reducer/userSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { AdminRequireLayout } from '../../AdminRequireLayout';
type Params = {
  id: string;
};
export default function HoldemPubOnePage() {
  const { id } = useParams<Params>();
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);

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
  const goToPubPage = async () => {
    console.log('dsadsa');
    pubsData.map((v, i) => {
      if (v.id === id) {
        setPickPub(v);
      }
    });

    const getGameData = await DataService.fetchGamesInfo(id!);
    dispatch(refreshGames(getGameData));
    dispatch(refreshWithPubId(id!));
  };

  useEffect(() => {
    goToPubPage();
  }, []);

  if (pickPub != null) {
    return (
      <AdminRequireLayout>
        <div key={`${pickPub.id}detail`} className=" w-full text-white">
          <div className="p-2">
            <div>
              <button
                className="border-2 bg-blue-700 text-black font-bold p-3 rounded-lg "
                onClick={() => {
                  navigate('/admin/storeInfo');
                }}
              >
                ⬅️ 돌아가기
              </button>
              <button
                className="mx-2 border-2 bg-green-500 text-black font-bold p-3 rounded-lg "
                onClick={() => {
                  dispatch(setOnePubData(pickPub));

                  dispatch(setWeekPubData(pickPub));
                  navigate(`/admin/storeInfo/edit/${id}`);
                }}
              >
                🔄️ 매장 정보 수정
              </button>
              <button
                className="mx-2 border-2 bg-green-500 text-black font-bold p-3 rounded-lg "
                onClick={() => {
                  dispatch(setOnePubData(pickPub));

                  dispatch(setWeekPubData(pickPub));
                  navigate(`/admin/storeInfo/tournamentRegister/${id}`);
                }}
              >
                🔄️ 토너 정보 수정
              </button>
            </div>
            <div className="flex flex-col my-10 ">
              <img
                className=" w-[150px] h-[150px]"
                src={pickPub.photos[0]}
                alt="디테일 그림"
              />
              <div className="mt-1">
                <div>{pickPub.name}</div>
                <div>{pickPub.description.trim()}</div>
                <h3>
                  <AiFillPhone className="inline" /> {pickPub.phone.trim()}
                </h3>
                <h3>
                  <AiFillEnvironment className="inline" />
                  {pickPub.addressBasic.trim()}{' '}
                  {' ' + pickPub.addressDetail.trim()}
                </h3>

                <div className="flex flex-row  m-2">
                  <a href={`${pickPub.links[1].url}`}>
                    <img
                      className="w-[50px] mr-4"
                      src="\assets\images\icon-instagram.png"
                      alt="instagram"
                    />
                  </a>
                  <a href={`${pickPub.links[0].url}`}>
                    <img
                      className="w-[50px]"
                      src="\assets\images\icon-kakao.png"
                      alt="kakao"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className=" text-3xl">현재 있는 토너머트 정보</div>
            {pickPub.templates.map((gamesValue, gamesIndex) => (
              <div key={`${gamesIndex}_${gamesValue.id}`}>
                <div>
                  <div className="flex flex-col justify-center text-center py-1 pb-4">
                    <div className="bg-slate-800 rounded-tr-md  rounded-tl-md py-4">
                      {gamesValue.title.trim()}
                    </div>

                    <div className="bg-slate-800 py-4">
                      {gamesValue.subTitle.trim()}
                    </div>
                    <div className="bg-slate-800 rounded-br-md  rounded-bl-md py-4">
                      {gamesValue.info}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <>
              <div className="p-2 text-3xl">요일 별 오픈 토너먼트</div>
              <div className="py-2">
                {pickPub.days.map((daysValue, daysIndex) => (
                  <div key={`${daysIndex}_x`} className="py-2">
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
                        <div key={`${gamesIndex}_${gamesValue.length}x`}>
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
      </AdminRequireLayout>
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
