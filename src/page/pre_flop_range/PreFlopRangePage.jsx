import { useState } from "react";

const positionList = [
  {
    position: "UTG",
    imgPath: "/assets/images/pre_flop_range/utg_range_way9.jpg",
  },
  {
    position: "Middle",
    imgPath: "/assets/images/pre_flop_range/middle_range_way9.jpg",
  },
  {
    position: "Middle+1",
    imgPath: "/assets/images/pre_flop_range/middle_+1_range_way9.jpg",
  },
  {
    position: "HighJack",
    imgPath: "/assets/images/pre_flop_range/highjack_range_way9.jpg",
  },
  {
    position: "CutOff",
    imgPath: "/assets/images/pre_flop_range/cutoff_range_way9.jpg",
  },
  {
    position: "Button",
    imgPath: "/assets/images/pre_flop_range/button_range_way9.jpg",
  },
  {
    position: "SmallBlind",
    imgPath: "/assets/images/pre_flop_range/small_range_way9.jpg",
  },
];

const PreFlopRangePage = () => {
  const [selPosition, setSelPosition] = useState("");
  return (
    <div className="flex flex-col items-center h-full">
      <div className="mx-auto text-center text-4xl my-4">
        프리플랍 레인지 (9-way)
      </div>
      <TypeSel selPosition={selPosition} setSelPosition={setSelPosition} />
      <RangeChartImg selPosition={selPosition} />
    </div>
  );
};
const TypeSel = ({ selPosition, setSelPosition }) => {
  return (
    <div className="flex justify-center gap-4">
      {positionList.map((v, i) => {
        return (
          <OneTypeBtn
            isSel={selPosition === v.position}
            content={v.position}
            onClick={() => {
              setSelPosition(v.position);
            }}
          />
        );
      })}
    </div>
  );
};

const OneTypeBtn = ({ isSel, content, onClick }) => {
  return (
    <div
      className={
        isSel
          ? "block mx-2 bg-red-200 shadow-xl rounded-full border-2 border-gray-400 cursor-pointer px-2 py-1"
          : "block mx-2 hover:bg-red-200 shadow-xl rounded-full bg-white       border-2 border-gray-400 cursor-pointer px-2 py-1"
      }
      onClick={onClick}
    >
      {content}
    </div>
  );
};

const RangeChartImg = ({ selPosition }) => {
  return (
    <img
      className="object-contain mt-10"
      src={getImgPathFromPosition(selPosition)}
      alt=""
    />
  );
};

const getImgPathFromPosition = (position) => {
  for (let i = 0; i < positionList.length; i++) {
    if (positionList[i].position === position) {
      return positionList[i].imgPath;
    }
  }
  return "";
};
export default PreFlopRangePage;
