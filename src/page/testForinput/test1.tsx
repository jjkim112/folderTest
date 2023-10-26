import { useState, useRef, useContext, useEffect } from "react";
import TitleWithInput from "./test2";
import OneMetadataItem from "./test3";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Pub } from "../../domain/Pub.model";

type JsonObject = {
  title: string;
  subTitle: string;
  info: string;
};

const ProjectCreatePage = () => {
  const [title, setTitle] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const [subTitle, setSubTitle] = useState("");
  const simbolRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState("");
  const cNameRef = useRef<HTMLInputElement>(null);

  const [warning, setWarning] = useState<string>("");

  const [notUseJsonArray, setNotUseJsonArray] = useState<Pub[]>([]);
  const [useJsonArray, setUseJsonArray] = useState<Pub[]>([]);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  useEffect(() => {
    setNotUseJsonArray(pubsData);
  }, []);

  const handleAddInput = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subTitle || !info) {
      setTimeout(() => {
        if (!title) {
          setWarning("티켓 이름을 적어 주세요");
          cNameRef.current?.focus();
        } else if (!subTitle) {
          setWarning("심볼 적어 주세요");
          simbolRef.current?.focus();
        } else if (!info) {
          setWarning("프로젝트 명/제목을 적어 주세요");
          nameRef.current?.focus();
        }
      }, 0);

      return;
    }
    const newInput: JsonObject = {
      title: title,
      subTitle: subTitle,
      info: info,
    };

    setNotUseJsonArray([...notUseJsonArray]);
  };

  const matadataRemove = (index: number) => {
    setNotUseJsonArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(index, 1);
      return newArray;
    });
    setUseJsonArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  return (
    <div className="flex justify-center">
      <div className="inner">
        <div className=" flex flex-col items-stretch mx-10 my-8 text-white">
          <div className="text-[20px] self-start font-bold">프로젝트 정보</div>
          <div className="ml-8">
            <TitleWithInput
              title="* 타이틀 : "
              placeholder="타이틀  "
              ref={cNameRef}
              onInputChange={setTitle}
            />
            <TitleWithInput
              title="*서브타이틀 : "
              placeholder="서브타이틀"
              ref={simbolRef}
              onInputChange={setSubTitle}
            />
            <TitleWithInput
              title="* 인포 : "
              placeholder="인포"
              ref={nameRef}
              onInputChange={setInfo}
            />
          </div>

          <button
            className="mx-4 border-[1px] border-gray-500 text-gray-500 text-[15px] rounded-2xl grow hover:bg-gray-100"
            type="button"
            onClick={handleAddInput}
          >
            개별정보 추가 +
          </button>
          {warning && <p style={{ color: "red" }}>{warning}</p>}
          <div className="text-[12px] mt-8 mb-4">
            개수 : {pubsData[0].basicInfo.gameTemplates.length}개
          </div>
          <div className="flex flex-wrap">
            {notUseJsonArray
              .concat()
              .reverse()
              .map((v, i) => (
                <OneMetadataItem
                  key={i}
                  removeFunc={() => {
                    matadataRemove(i);
                  }}
                  value={v.basicInfo.gameTemplates}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatePage;
