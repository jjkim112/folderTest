import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pub } from "../../../domain/pub/Pub.model";

export function OnePubThumb({ pubData }: { pubData: Pub }) {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(Math.floor(window.innerWidth * 0.2));
      console.log(Math.floor(window.innerWidth * 0.2));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex w-full h-[${height}] p-2`}
      onClick={() => {
        navigate(`/holdem-pub/detail/${pubData.id}`);
      }}
    >
      <div className={`w-[150px] h-[150px]`}>
        <div
          className={`bg-slate-500 w-full h-full overflow-hidden rounded-tl-md rounded-bl-md`}
        >
          <img
            src={pubData.basicInfo.photos[0] ?? "/assets/images/background.png"}
            alt={pubData.basicInfo.name}
            className={`w-[150px] h-[150px] object-cover`}
          />
        </div>
      </div>
      <div className={`flex-1 h-[150px]`}>
        <div className="bg-slate-500 h-full p-2">
          <div className=" flex flex-col justify-around">
            <p className="text-lg font-bold text-black text-ellipsis overflow-hidden whitespace-nowrap py-2">
              {pubData.basicInfo.name}
            </p>
            <div className=" ">
              <div className=" text-sm font-bold text-white  rounded-xl text-center overflow-hidden text-ellipsis box-content line-clamp-2 ">
                {pubData.basicInfo.description}
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
                  {pubData.basicInfo.addressBasic.substring(0, 2)}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className={`w-[100px] h-[150px]`}>
        <div className="bg-slate-500 h-full p-2 rounded-tr-md rounded-br-md">
          오픈
        </div>
      </div>
    </div>
  );
}
