interface CardSimpleItemProps {
  shape: string;
  number: string;
  isPick: boolean;
  isOriginCard: boolean;
}

const shapes: { [key: string]: string } = {
  s: "♠️",
  d: "♦️",
  c: "♣️",
  h: "♥️",
};

const numbers: { [key: string]: string } = {
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  t: "10",
  j: "J",
  q: "Q",
  k: "K",
  a: "A",
};

const CardSimple: React.FC<CardSimpleItemProps> = ({
  shape,
  number,
  isPick,
  isOriginCard,
}: CardSimpleItemProps) => {
  return isPick ? (
    <div
      className={`relative w-12 h-10 border-2 rounded-md text-lg text-gray-400 ${
        isOriginCard ? "border-2 border-red-500 hover:cursor-pointer" : ""
      }`}
    >
      <div className="absolute left-0 top-0">{shapes[shape]}</div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/4 text-xl font-bold text-gray-400">
        {numbers[number]}
      </div>
    </div>
  ) : (
    <div className="relative w-12 h-10 border-2 rounded-md hover:cursor-pointer text-lg">
      <div className="absolute left-0 top-0">
        {shape === "c" || shape === "s" ? (
          <div className="">{shapes[shape]}</div>
        ) : (
          <div className="text-red-500">{shapes[shape]}</div>
        )}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/4 text-xl font-bold">
        {shape === "c" || shape === "s" ? (
          <div className="">{numbers[number]}</div>
        ) : (
          <div className="text-red-500">{numbers[number]}</div>
        )}
      </div>
    </div>
  );
};

export default CardSimple;
