import { useState, useEffect } from "react";
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { useDaumPostcodePopup } from "react-daum-postcode";

import { useNavigate, useParams } from "react-router-dom";
import { DataService } from "src/data/DataService";
import { GameTemplate } from "src/domain/GameTemplate.model";
import { Pub } from "src/domain/Pub.model";
import { refreshGames } from "src/reducer/gameSlice";
import { refreshWithPubId } from "src/reducer/userSlice";
import { AppDispatch, RootState } from "src/store/store";
import { TestComp } from "./TestCompProps";
import { WeekDayBox } from "./week";
import { Box } from "./box";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  Weeks,
  addTemplatesData,
  deleteTemplatesData,
  setTemplatesData,
  setWeekPubData,
  updateOnePubData,
} from "src/reducer/adminPub";
import { sub } from "date-fns";
import { FirebasePub } from "src/data/firebase/FirebasePub";
import { AdminRequireLayout } from "src/content/admin/AdminRequireLayout";
import { GameEditDialog } from "./GameEditDialog";
import { PhotoEditDialog } from "./PhotoEditDialog";

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

  const [content, setContent] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [boxes, setBoxes] = useState<BoxInfo[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const [visibility, setVisibility] = useState<boolean[]>(
    new Array(7).fill(false)
  );

  const [photoDialog, setPhotoDialog] = useState(false);
  const [gameDialog, setGameDialog] = useState(false);

  useEffect(() => {
    setGames(pickPub.templates);
  }, []);
  /*
   *  주소 찾기 관련 함수들
   */
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
    await FirebasePub.updatePub(pickPub.id, pickPub.toMap);
  };

  const handleAddBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        tam.length.toString(),
        content,
        description,
        title
      ),
      weeks: [...days],
    };
    dispatch(addTemplatesData(updataTam));

    dispatch(updateOnePubData(tam));

    setTitle("");
    setDescription("");
    setContent("");
    setDays([]);
  };

  const deleteBox = (index: string) => {
    dispatch(deleteTemplatesData(index));

    setTitle("");
    setDescription("");
    setContent("");
    setDays([]);
    setSelectedBoxIndex(null);
  };
  const updateBox = () => {
    const updataTam: Weeks = {
      template: new GameTemplate(
        selectedBoxIndex.toString(),
        content,
        description,
        title
      ),
      weeks: [...days],
    };
    dispatch(setTemplatesData(updataTam));
    dispatch(updateOnePubData(tam));

    setTitle("");
    setDescription("");
    setContent("");
    setDays([]);
    setSelectedBoxIndex(null);
  };

  const handleClickBox = (box: GameTemplate, index: number) => {
    if (selectedBoxIndex === index) {
      setTitle("");
      setDescription("");
      setContent("");
      setDays([]);
      setSelectedBoxIndex(null);
    } else {
      setSelectedBoxIndex(index);
      setTitle(box.title);
      setDescription(box.subTitle);
      setContent(box.info);

      tam.map((v, i) => {
        if (v.template.id === index.toString()) {
          setDays(v.weeks);
        }
      });
      console.log(days);
    }
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
              {/* <button
                className="border-2 mx-2 bg-green-500 text-black font-bold p-3 rounded-lg "
                onClick={() => {
                  finalFirebaseUpdate();
                }}
              >
                ⬅️ 수정완료
              </button> */}
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
                <span className="py-2">주소</span>
                <div className="flex mb-2">
                  <button
                    className="w-32 rounded-md border-2 mr-4 h-[24px] text-sm"
                    onClick={handleClick}
                  >
                    주소 찾기
                  </button>
                  <div className="self-stretch bg-white w-full h-[24px] text-black">
                    {addressBasic}
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="w-32 text-center mr-4">세부 주소</div>
                    <input
                      className="text-black w-full"
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
                content={phone}
                setContent={setPhone}
              />
              <TestComp
                title="인스타 링크"
                placeholder="인스타 링크를 입력해주세요."
                content={phone}
                setContent={setPhone}
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
                  {photos.map((url) => (
                    <img
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
                <div className="flex items-center">
                  <span className="py-2 mr-4">토너 템플릿</span>
                  <AddIcon
                    fontSize="small"
                    className="hover:cursor-pointer"
                    onClick={clickAddGame}
                  ></AddIcon>
                </div>
                <div className="flex mb-2">
                  <div className="flex flex-col w-1/2 h-[600px] mr-4 border-2">
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
                  <div className="flex flex-col w-1/2 bg-yellow-50 h-[600px] text-black">
                    <div className="relative w-full">
                      {selGame !== null ? (
                        <>
                          <button
                            className="absolute top-1 right-1 text-black"
                            onClick={clickEditGame}
                          >
                            수정
                          </button>
                          <div className="flex">
                            <span className="w-20">제목</span>
                            {selGame.title}
                          </div>
                          <div className="flex">
                            <span className="w-20">소제목</span>
                            {selGame.subTitle}
                          </div>
                          <div className="flex">
                            <span className="w-20">설명</span>
                            <div className="whitespace-pre-wrap">
                              {selGame.info}
                            </div>
                          </div>
                          <div className="flex">
                            <span className="w-20">사진</span>
                            {["", "", ""].map((url) => {
                              return (
                                <img
                                  className="rounded-2xl mr-3"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "fill",
                                  }}
                                  src={url}
                                />
                              );
                            })}
                          </div>
                          <div className="flex">
                            <span className="w-20">요일</span>
                            <div className="">
                              {tam.map((v, i) => (
                                <div
                                  key={i}
                                  className="flex flex-row justify-center"
                                >
                                  {v.template.id === `${selGame?.id ?? "1"}` &&
                                    v.weeks.map((game, i) => (
                                      <div className="px-2">{game}</div>
                                    ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 flex flex-col w-full text-black ">
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

          {photoDialog && (
            <PhotoEditDialog
              onCancel={() => {
                setPhotoDialog(false);
              }}
            />
          )}
          {gameDialog && (
            <GameEditDialog
              onCancel={() => {
                setGameDialog(false);
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
