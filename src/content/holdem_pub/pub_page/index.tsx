import { Pub } from '../../../domain/Pub.model';
import { useState, useEffect } from 'react';
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { DataService } from '../../../data/DataService';
import { refreshGames } from '../../../reducer/gameSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderTap } from '../../../utils/header/header_tap';
import { GameTemplate } from '../../../domain/GameTemplate.model';
import { Game } from '../../../domain/Game.model';
import { refreshWithPubId } from '../../../reducer/userSlice';
type Section = {
  label: string;
};
const tabs: Section[] = [
  {
    label: '랭킹',
  },
  {
    label: '정보',
  },
];

export default function HoldemPubOnePage() {
  const id = useParams().id;
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);
  const customUsersData = useSelector(
    (state: RootState) => state.user.customUsers
  );
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
    pubsData.map((v, i) => {
      if (v.id === id) {
        setPickPub(v);
      }
    });

    const getGameData = await DataService.fetchGamesInfo(id!);
    dispatch(refreshGames(getGameData));
    dispatch(refreshWithPubId(id!));
  };
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);

  useEffect(() => {
    goToPubPage();
  }, []);

  const _getGameTemp = (pubId: string, tempId: string): GameTemplate | null => {
    for (const onePub of pubsData) {
      if (onePub.id === pubId) {
        for (const gt of onePub.templates) {
          if (gt.id === tempId) {
            return gt;
          }
        }
        return null;
      }
    }
    return null;
  };

  if (pickPub != null) {
    return (
      <div key={`${pickPub.id}detail`} className=" w-full text-white">
        <div className="p-2">
          <button
            className="border-2 bg-blue-700 text-black font-bold p-3 rounded-lg "
            onClick={() => {
              navigate('/holdem-pub');
            }}
          >
            ⬅️ 돌아가기
          </button>
          <div className="flex flex-col my-10 ">
            <img
              className=" w-[150px] h-[150px]"
              src={pickPub.photos[0]}
              alt="디테일 그림"
            />
            <div className="mt-1">
              <div>{pickPub.name}</div>
              <h3>
                <AiFillPhone className="inline" /> {pickPub.phone}
              </h3>
              <h3>
                <AiFillEnvironment className="inline" /> {pickPub.address}
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
        <HeaderTap content={tabs} activeTab={setActiveHeaderTab} />
        <div className="p-2">
          {activeHeaderTab == 0 ? (
            <div>
              <div>플레이어 순위</div>
              <div>
                {customUsersData.map((user, i) => {
                  return (
                    <div key={i}>
                      <div className="my-2" key={`${i}_${user.id}`}>
                        {user.id}
                      </div>
                      <div>총 상금 : {user.totalPrize}</div>
                      <div>머니인 횟수 : {user.howManyMoneyIn}</div>
                      <div>1등 횟수 : {user.howManyFirstRank}</div>
                    </div>
                  );
                })}
              </div>
              <div>토너먼트 히스토리</div>
              {gamesData.map((game, i) => {
                return (
                  <div
                    className="rounded-3xl p-2 my-2 bg-gray-300"
                    key={`${i}_${game.id}`}
                  >
                    <div>
                      {' '}
                      {_getGameTemp(pickPub?.id ?? '', game.gameTempId)
                        ?.title ?? '존재하지 않음'}{' '}
                    </div>
                    <div> 엔트리 : {game.entry}</div>
                    <div> 일시 : {game.date.toUTCString()} </div>
                    <div> 우승자 : {game.players[0].id}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div>요일 별 오픈 토너먼트</div>
              <div className="py-2">
                {pickPub.days.map((daysValue, daysIndex) => (
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
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페인지 접근 입니다.</div>
        <br />
        <button className="bg-white" onClick={() => navigate('/holdem-pub')}>
          이전페이지로{' '}
        </button>
      </div>
    );
  }
}
