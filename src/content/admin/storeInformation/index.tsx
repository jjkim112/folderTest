import { useDispatch, useSelector } from 'react-redux';
import { DataService } from 'src/data/DataService';
import { refreshWholePub } from 'src/reducer/pubSlice';
import { setUsers } from 'src/reducer/userSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminRequireLayout } from '../AdminRequireLayout';
export default function StoreInformation() {
  const pubsData = useSelector((state: RootState) => state.pub.pubs);

  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const _initFunc = async () => {
    const wholeData = await DataService.fetchWholePub();
    dispatch(refreshWholePub(wholeData));

    // 유저 업데이트. (일단 막 넣기)
    const wholeUser = await DataService.fetchWholeUser();
    dispatch(setUsers(wholeUser));
  };
  useEffect(() => {
    _initFunc();
  }, []);
  return (
    <AdminRequireLayout>
      <section className="p-1">
        <div className="text-3xl font-bold text-white pb-2">홈덤 지점</div>
        <div className="flex flex-col items-center">
          {pubsData.map((pubData, index) => (
            <div
              className="w-full h-[calc(360px/2)]  p-2"
              key={`${pubData.id}${index}`}
              onClick={() => {
                navigate(`detail/${pubData.id}`);
              }}
            >
              <div className="flex flex-row w-full h-full">
                <div className="w-1/5 h-full">
                  <div className="h-full overflow-hidden rounded-tl-md rounded-bl-md">
                    <img
                      src={pubData.photos[0] ?? '/assets/images/background.png'}
                      alt={pubData.name}
                      className="w-full h-full object-[100%_100%]"
                    />
                  </div>
                </div>
                <div className="w-3/5 h-full">
                  <div className="bg-slate-500 h-full p-2">
                    <div className=" flex flex-col justify-around">
                      <p className="text-lg font-bold text-black text-ellipsis overflow-hidden whitespace-nowrap py-2">
                        {pubData.name}
                      </p>
                      <div className=" ">
                        <div className=" text-sm font-bold text-white  rounded-xl text-center overflow-hidden text-ellipsis box-content line-clamp-2 ">
                          지점 설명 지점설명 지점 설명 지점설명 지점 설명
                          지점설명 지점 설명 지점설명 지점 설명 지점설명 지점
                          설명 지점설명 지점 설명 지점설명 지점 설명 지점설명
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-around w-full pt-5">
                      <p className="flex w-1/3 font-bold text-center items-center justify-center text-gray-800 text-3xl">
                        <span>⭐</span>
                        {5.0}
                      </p>
                      {true ? (
                        <div className=" ">
                          <div className="w-full text-sm font-bold text-white bg-blue-400 rounded-xl text-center p-2">
                            {pubData.addressBasic.substring(0, 2)}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-1/5 h-full">
                  <div className="bg-slate-500 h-full rounded-tr-md rounded-br-md p-5">
                    <img
                      src={pubData.photos[1] ?? '/assets/images/background.png'}
                      alt={pubData.name}
                      className="w-full h-full object-fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminRequireLayout>
  );
}
