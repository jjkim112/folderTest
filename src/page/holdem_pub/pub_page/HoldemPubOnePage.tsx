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
import { Game } from '../../../domain/Game.model';
import { useNavigate, useParams } from 'react-router-dom';
import { dividerClasses } from '@mui/material';

export default function HoldemPubOnePage() {
  const id = useParams().id;
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);
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
        console.log(v.id);
        setPickPub(v);
      }
    });

    const getGameData = await DataService.fetchGamesInfo(id!);
    dispatch(refreshGames(getGameData));
  };

  useEffect(() => {
    goToPubPage();
  }, []);
  if (pickPub != null) {
    return (
      <div key={`${pickPub.id}detail`} className="p-2 w-full text-white">
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
                      <div key={gamesIndex}>
                        <div>
                          {pickPub.templates.map(
                            (templatesValue, templatesIndex) =>
                              templatesValue.id === gamesValue ? (
                                <div key={templatesIndex} className="py-10">
                                  <div className="">{templatesValue.title}</div>
                                  <div>{templatesValue.subTitle}</div>
                                  <div>{templatesValue.info}</div>
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
          </div>
        </div>

        {gamesData.map((game, i) => {
          return (
            <div key={i}>
              <div>{game.entry}</div>
              <div>{game.players.toString()}</div>
            </div>
          );
        })}
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
