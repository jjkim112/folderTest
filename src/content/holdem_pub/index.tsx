import { useEffect, useState } from "react";
import Slick from "../../utils/slider/Slick";
import "./holdemPub.css";
import { useNavigate } from "react-router-dom";
import { Pub } from "../../domain/Pub.model";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { DataService } from "../../data/DataService";
import { refreshWholePub } from "../../reducer/pubSlice";
import { setUsers } from "../../reducer/userSlice";
import MapMakers from "src/utils/map/MapMaker";
import SearchBar from "./SearchBar";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import CustomScrollMenu from "./scroll_menu/CustomScrollMenu";
import { OnePubThumb } from "./OnePubThumb";

const MenuItem = ({ text }) => {
  return <div className="menu-item">{text}</div>;
};

// MenuItem들을 list만큼 생성한 List단위의 컴포넌트
export const Menu = (list: any) =>
  list.map((el: any) => {
    const { name } = el;
    return <MenuItem text={name} key={name} />;
  });

let filterList = [
  "진행중",
  "시작 예정",
  "입장 금액",
  "총 상금액",
  "Prize Pool",
];
export default function HoldemPubPage() {
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const dispatch = useDispatch<AppDispatch>();

  const [filters, setFilters] = useState(
    filterList.map((filter) => ({
      title: filter,
      isSelect: false,
    }))
  );

  const _initFunc = async () => {
    const wholeData = await DataService.fetchWholePub();
    dispatch(refreshWholePub(wholeData));

    // 유저 업데이트. (일단 막 넣기)
    // const wholeUser = await DataService.fetchWholeUser();
    // dispatch(setUsers(wholeUser));
  };
  const [DataItem, setDataItem] = useState(null);
  let list = [];

  useEffect(() => {
    _initFunc();
    setDataItem(Menu(list)); // Menu컴포넌트를 state에 저장
  }, []);
  let navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <section className="">
        <div className="p-1 flex flex-col justify-center">
          <div className="flex my-2 items-center">
            <div className="whitespace-nowrap h-min mr-2 px-4 py-1 hover:cursor-pointer rounded-full bg-gray-200 flex justify-center items-center">
              지역
            </div>
            <SearchBar />
          </div>
          <CustomScrollMenu data={filters} setData={setFilters} />
        </div>
        <section className="p-1">
          <div className="text-3xl font-bold text-white pb-2">홀덤 지점</div>
          <div className="flex flex-col items-center">
            {pubsData.map((pubData, index) => (
              <OnePubThumb key={pubData.id} pubData={pubData} />
            ))}
          </div>
        </section>

        <section className="p-2">
          <MapMakers pubsData={pubsData}></MapMakers>
        </section>
      </section>
    </div>
  );
}
