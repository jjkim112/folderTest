import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { DataService } from "src/data/DataService";
import { Pub } from "src/domain/Pub.model";
import { refreshGames } from "src/reducer/gameSlice";
import { refreshWithPubId } from "src/reducer/userSlice";
import { AppDispatch, RootState } from "src/store/store";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { AdminRequireLayout } from "../../AdminRequireLayout";
import { FirebasePub } from "src/data/firebase/FirebasePub";

export default function StoreInfoEdit() {
  const id = "a129cvi34dhi398";

  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const [tell, setTell] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [fristAddress, setFristAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const finalFirebaseUpdate = async () => {
    let newPickPub = pickPub;

    newPickPub.basicInfo.name = shopName;
    newPickPub.basicInfo.phone = tell;
    newPickPub.basicInfo.addressBasic = fristAddress + " " + secondAddress;

    await FirebasePub.updatePub(newPickPub.id, newPickPub.toMap);
  };
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFristAddress(fullAddress);
    setShopAddress(fullAddress + " " + secondAddress);

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const goToPubPage = async () => {
    pubsData.map((v, i) => {
      if (v.id === id) {
        setPickPub(v);
        setTell(v.basicInfo.phone);
        setShopName(v.basicInfo.name);
        setShopAddress(v.basicInfo.addressBasic);
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
        <div className="flex justify-center p-2">
          <div className="w-full max-w-[80%]">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-center font-bold text-gray-800 text-xl">
                  매장정보
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="mb-3">
                  <div className="mb-3">
                    <label
                      htmlFor="_idx"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      매장 고유 번호
                    </label>
                    <input
                      className="form-input border-gray-300 rounded-full w-full py-2 px-4"
                      id="_idx"
                      defaultValue={pickPub.id}
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        전화번호
                      </label>
                      <input
                        className="form-input border-gray-300 rounded-full w-full py-2 px-4"
                        id="phone"
                        name="shopVo.phone"
                        type="text"
                        placeholder="전화번호"
                        value={tell}
                        onChange={(e) => {
                          setTell(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        상호명
                      </label>
                      <input
                        className="form-input border-gray-300 rounded-full w-full py-2 px-4"
                        id="name"
                        name="shopVo.name"
                        type="text"
                        value={shopName}
                        onChange={(e) => {
                          setShopName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button type="button" onClick={handleClick}>
                      주소로 찾기
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
                      <label
                        htmlFor="addr_main"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        주소
                      </label>
                      <input
                        className="form-input border-gray-300 rounded-full w-full py-2 px-4"
                        id="addr_main"
                        name="shopVo.addr_main"
                        type="text"
                        placeholder="주소"
                        value={fristAddress}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addr_detail"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        상세주소
                      </label>
                      <input
                        className="form-input border-gray-300 rounded-full w-full py-2 px-4"
                        id="addr_detail"
                        name="shopVo.addr_detail"
                        type="text"
                        placeholder="상세주소"
                        value={secondAddress}
                        onChange={(e) => {
                          setSecondAddress(e.target.value);
                          setShopAddress(fristAddress + " " + e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>{shopAddress}</div>

                  <div className="mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                      onClick={() => {
                        finalFirebaseUpdate();
                      }}
                    >
                      수정
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminRequireLayout>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페이지 접근 입니다.</div>
        <br />
        <button
          className="bg-white"
          onClick={() => navigate("/admin/storeInfo")}
        >
          이전페이지로
        </button>
      </div>
    );
  }
}
