import { useState } from "react";
import { TestComp } from "./TestCompProps";
import EditIcon from "@mui/icons-material/Edit";

interface GameEditDialogProps {
  onCancel: () => void;
}

export const GameEditDialog = ({ onCancel }: GameEditDialogProps) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [info, setInfo] = useState("");
  const [photos, setPhotos] = useState<string[]>(["", "", ""]);
  const [days, setDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const dayList = ["월", "화", "수", "목", "금", "토", "일"];

  const clickEditPhotos = () => {};

  const handleParentClick = (event) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      console.log("parent clicked");
      onCancel();
    }
  };

  return (
    <div
      className="absolute left-0 top-0 w-full h-full"
      onClick={handleParentClick}
    >
      <div
        className="absolute top-[200px] left-[12.5%] w-3/4 h-[800px] bg-slate-300 border-2 border-black rounded-2xl"
        onClick={() => {}}
      >
        <TestComp
          title="제목"
          placeholder="제목을 입력해 주세요"
          content={title}
          setContent={setTitle}
        />
        <TestComp
          title="소제목"
          placeholder="소제목을 입력해 주세요"
          content={subtitle}
          setContent={setSubtitle}
        />
        <TestComp
          title="설명"
          placeholder="설명을 입력해 주세요"
          content={info}
          setContent={setInfo}
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
          <span className="py-2 mr-4">요일</span>
          <div className="flex mb-2 justify-around px-12">
            {days.map((isChecked, i) => {
              return (
                <div
                  className={`flex w-10 h-10 rounded-lg border-[1px] justify-center items-center hover:cursor-pointer ${
                    isChecked ? "bg-red-300" : ""
                  }`}
                  onClick={() => {
                    setDays((prev) => {
                      let temp = Array.from(prev);
                      temp[i] = !isChecked;
                      return temp;
                    });
                  }}
                >
                  {dayList[i]}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2 flex flex-col">
          <span className="py-2 mr-4">삭제하기</span>
          <div className="flex h-8 hover:cursor-pointer rounded-lg border-[1px] border-red-300  text-red-600 justify-center items-center">
            삭제하기
          </div>
        </div>
        <div className="mx-auto flex w-32 h-16 hover:cursor-pointer rounded-lg border-[1px] border-black-300  justify-center items-center">
          수정완료
        </div>
      </div>
    </div>
  );
};
