import basic from '../utils/basic.json';
type CardItemProps = {
  card: string;
  width?: string | number;
  height?: string | number;
};

const Card = ({ card, width = '100px', height = '100%' }: CardItemProps) => {
  const getCardImgRoute = (value: string): string => {
    try {
      const shape = value.charAt(0);
      const num = value.charAt(1);

      if (basic.shapeList.includes(shape) && basic.numList.includes(num)) {
        return `/assets/images/card/${shape}${num}.png`;
      }
      return '/assets/images/card/empty.png';
    } catch (e) {
      console.log(e);
      return '/assets/images/card/empty.png';
    }
  };

  return (
    <div className="disable-blur  ">
      <img
        className="object-cover "
        src={getCardImgRoute(card)}
        alt="card"
        width={width}
        height={height}
      />
    </div>
  );
};

export default Card;
