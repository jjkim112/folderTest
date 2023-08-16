import { FC } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { GameTemplate } from '../../domain/GameTemplate.model';
interface MetadataProps {
  removeFunc: () => void;
  value: GameTemplate[];
}

const OneMetadataItem: FC<MetadataProps> = ({ removeFunc, value }) => {
  return (
    <div className="relative mx-2 my-1 border-sky-100 w-fit border-[1px] p-4 rounded-xl">
      <AiOutlineMinusCircle
        className="absolute top-[-5px] right-[-5px] bg-white hover:cursor-pointer"
        onClick={() => {
          removeFunc();
        }}
        color="red"
        size={15}
      />
      {value.map((v, i) => (
        <div className="m-2">
          <div>타이틀:{v.title}</div>
          <div>서브타이틀:{v.subTitle}</div>
          <div>인포:{v.info}</div>
        </div>
      ))}
    </div>
  );
};

export default OneMetadataItem;
