import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import "../../../styles/page/pub/scroll_menu/customScrollMenu.css";

interface CustomScrollMenuProps {
  data: any[];
  setData: (data: any[]) => void;
}

export default function CustomScrollMenu({
  data,
  setData,
}: CustomScrollMenuProps): JSX.Element {
  // We will use React useRef hook to reference the wrapping div:
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const oneClick = (v: any) => {
    const temp = data.map((od) => ({ ...od }));
    console.log(temp);
    for (const oneData of temp) {
      if (oneData.title === v.title) {
        oneData.isSelect = !v.isSelect;
      }
    }
    console.log(temp);
    setData(temp);
  };

  return (
    <div
      className="flex space-x-3 overflow-x-scroll"
      {...events}
      ref={ref} // add reference and events to the wrapping div
    >
      {data.map((v) => {
        return (
          <div
            className={`flex-none px-4 py-1  hover:cursor-pointer rounded-full ${
              v.isSelect ? "bg-blue-200" : "bg-gray-200"
            }`}
            onClick={() => {
              oneClick(v);
            }}
            key={`${v.title}_${v.isSelect.toString()}`}
          >
            {v.title}
          </div>
        );
      })}
    </div>
  );
}
