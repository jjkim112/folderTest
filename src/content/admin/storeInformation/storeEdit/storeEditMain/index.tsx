import { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";

import { useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "src/store/store";
import { TestComp } from "./TestCompProps";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { FirebasePub } from "src/data/firebase/FirebasePub";
import { AdminRequireLayout } from "src/content/admin/AdminRequireLayout";
import { GameEditDialog } from "./GameEditDialog";
import { PhotoEditDialog } from "./PhotoEditDialog";
import { refreshWholePub } from "src/reducer/pubSlice";
import { GameTemplate } from "src/domain/pub/GameTemplate.model";
type Params = {
  id: string;
};
export default function StoreEditForm() {
  const { id } = useParams<Params>();
  const pickPub = useSelector((state: RootState) => state.admin.pub);
  const tam = useSelector((state: RootState) => state.admin.weeks);

  //펍 정보
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [addressBasic, setAddressBasic] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [kakao, setKakao] = useState("");
  const [insta, setInsta] = useState("");
  const [photos, setPhotos] = useState<string[]>([
    "https://t1.daumcdn.net/cfile/tistory/2257194756D7FDBB26",
    "https://t1.daumcdn.net/cfile/tistory/2257194756D7FDBB26",
    "https://t1.daumcdn.net/cfile/tistory/2257194756D7FDBB26",
    "https://t1.daumcdn.net/cfile/tistory/2257194756D7FDBB26",
  ]);

  const [games, setGames] = useState<GameTemplate[]>([]);
  const [selGame, setSelGame] = useState<GameTemplate | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean[]>(
    new Array(7).fill(false)
  );

  const [photoDialog, setPhotoDialog] = useState(false);
  const [gameDialog, setGameDialog] = useState(false);

  useEffect(() => {
    setGames(pickPub.basicInfo.gameTemplates);
    setTitle(pickPub.basicInfo.name);
    setDescription(pickPub.basicInfo.description);
    setAddressBasic(pickPub.basicInfo.addressBasic);
    setAddressDetail(pickPub.basicInfo.addressDetail);
    setLat(pickPub.basicInfo.lat);
    setLon(pickPub.basicInfo.lon);
    setPhone(pickPub.basicInfo.phone);
    setKakao(pickPub.basicInfo.links[0].url);
    setInsta(pickPub.basicInfo.links[1].url);
  }, []);

  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    console.log(data);
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
    setAddressBasic(fullAddress);
    // setShopAddress(fullAddress + ' ' + secondAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const toggleVisibility = (index: number) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };
  const finalFirebaseUpdate = async () => {
    let newPickPub = pickPub.clone;

    newPickPub.basicInfo.name = title;
    newPickPub.basicInfo.lat = lat;
    newPickPub.basicInfo.lon = lon;
    newPickPub.basicInfo.addressBasic = addressBasic;
    newPickPub.basicInfo.addressDetail = addressDetail;
    newPickPub.basicInfo.description = description;
    newPickPub.basicInfo.phone = phone;
    newPickPub.basicInfo.links[1].url = insta;
    newPickPub.basicInfo.links[0].url = kakao;
    newPickPub.basicInfo.photos = photos;

    await FirebasePub.updatePub(newPickPub.id, newPickPub.toMap);
    const getPubsData = await FirebasePub.getWholePubData();
    dispatch(refreshWholePub(getPubsData));
    navigate(`/admin/storeInfo/detail/${newPickPub.id}`);
  };

  const clickEditPhotos = () => {
    setPhotoDialog(true);
  };
  const clickAddGame = () => {
    setGameDialog(true);
  };
  const clickEditGame = () => {
    setGameDialog(true);
  };

  if (pickPub != null) {
    return (
      <AdminRequireLayout>
        <div className="w-full text-white">
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
                title="이름"
                placeholder="이름을 입력해 주세요"
                content={title}
                setContent={setTitle}
              />
              <TestComp
                title="가게 설명"
                placeholder="설명을 입력해 주세요"
                content={description}
                setContent={setDescription}
              />

              <div className="p-2 flex flex-col">
                <div className="flex flex-col mb-2">
                  <span className="py-2 text-yellow-500 font-bold">주소</span>
                  <button
                    className="w-32 rounded-md border-2 mr-4 my-2 h-[24px] text-sm text-white"
                    onClick={handleClick}
                  >
                    주소 찾기
                  </button>
                  <input
                    className="bg-white  border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder=""
                    value={addressBasic}
                    readOnly
                  />
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="py-2 text-yellow-500 font-bold">
                      세부 주소
                    </span>
                    <input
                      className="bg-white border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder=""
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <TestComp
                title="전화번호"
                placeholder="번호를 입력해주세요."
                content={phone}
                setContent={setPhone}
              />
              <TestComp
                title="카카오 링크"
                placeholder="카카오 링크를 입력해주세요."
                content={kakao}
                setContent={setKakao}
              />
              <TestComp
                title="인스타 링크"
                placeholder="인스타 링크를 입력해주세요."
                content={insta}
                setContent={setInsta}
              />

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
                      key={`Edit${i}`}
                      alt={`Edit${i}`}
                      className="rounded-2xl mr-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "fill",
                      }}
                      src={url}
                    />
                  ))}
                </div>
              </div>

              <div className="p-2 flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="py-2 mr-4">토너 템플릿</span>
                    <AddIcon
                      fontSize="small"
                      className="hover:cursor-pointer"
                      onClick={() => {
                        clickAddGame();
                        setSelGame(null);
                      }}
                    ></AddIcon>
                  </div>
                  {selGame !== null ? (
                    <button className=" text-white" onClick={clickEditGame}>
                      토너 수정
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="flex mb-2 h-full ">
                  <div className="flex flex-col w-1/2 h-[600px] overflow-y-scroll mr-4 border-2">
                    <table className=" table-fixed w-full  rounded-lg overflow-hidden  ">
                      <thead>
                        <tr className="text-lg  ">
                          <th className="w-1/5 py-2">Id</th>
                          <th className="w-4/5 py-2">제목</th>
                        </tr>
                      </thead>
                      <tbody>
                        {games.map((oneTemplateGame) => (
                          <tr
                            key={oneTemplateGame.id}
                            className={`text-center text-base ${
                              oneTemplateGame.id === selGame?.id
                                ? "border-2 border-red-300"
                                : ""
                            }`}
                            onClick={() => {
                              setSelGame(oneTemplateGame);
                            }}
                          >
                            <td className="w-1/5 py-1">{oneTemplateGame.id}</td>
                            <td className="w-4/5 py-1">
                              {oneTemplateGame.title}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col w-1/2 bg-yellow-50 h-[600px]  overflow-y-scroll text-black">
                    <div className="w-full">
                      {selGame !== null ? (
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="border w-2/12  px-2 py-1">제목</td>
                              <td className="border px-2 py-1">
                                {selGame.title}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">소제목</td>
                              <td className="border px-2 py-1">
                                {selGame.subTitle}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">설명</td>
                              <td className="border px-2 py-1">
                                {selGame.info}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">사진</td>
                              <td className="flex flex-wrap gap-x-3 border px-2 py-1">
                                {[
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                ].map((url, i) => (
                                  <img
                                    key={`view${i}`}
                                    alt={`view${i}`}
                                    className="rounded-full w-[70px] h-[70px] object-cover"
                                    src={url}
                                  />
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">요일</td>
                              <td className="border px-2 py-1">
                                {tam.map((v, i) => (
                                  <div
                                    key={i}
                                    className="flex flex-row justify-center"
                                  >
                                    {v.template.id ===
                                      `${selGame?.id ?? "1"}` &&
                                      v.weeks.map((game, i) => (
                                        <div className="px-2">{game}</div>
                                      ))}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <>
              <div className="p-2 text-3xl">요일 별 오픈 토너먼트</div>
              <div className="py-2">
                {/* {pickPub &&
                  pickPub.days.map((daysValue, daysIndex) => (
                    <div key={daysIndex} className="py-2">
                      {visibility[daysIndex] ? (
                        <h1 onClick={() => toggleVisibility(daysIndex)}>
                          <AiFillCaretUp className="inline" />{" "}
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
                              {pickPub.basicInfo.templates.map(
                                (templatesValue, templatesIndex) =>
                                  templatesValue.id === gamesValue ? (
                                    <div
                                      key={`tem${templatesIndex}`}
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
                  ))} */}
              </div>
            </>
          </div>

          {photoDialog && (
            <PhotoEditDialog
              onCancel={() => {
                setPhotoDialog(false);
                setGames(pickPub.basicInfo.gameTemplates);
              }}
            />
          )}
          {gameDialog && (
            <GameEditDialog
              gameTemplate={selGame}
              onCancel={() => {
                setGameDialog(false);
                setGames(pickPub.basicInfo.gameTemplates);
                setSelGame(null);
              }}
            />
          )}
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
