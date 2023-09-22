import QuoteOneItem from './QuoteOneItem';

const qoutesList = [
  {
    pokerQuote: '한판 보다, n판의 평균이 중요하다.',
    lifeQuote: '인생은 n번의 인피니티 게임이다.',
  },
  {
    pokerQuote: '이겼다고 좋아하고, 졌다고 화내는 포커는 리스크가 크다.',
    lifeQuote: '일희일비 하지 않는 자세가 중요하다.',
  },
  {
    pokerQuote: '풀하우스로 포카드에 질 수 있다.',
    lifeQuote: '나의 최선이 꼭 세상에 닿는다는 보장은 없다.',
  },
  {
    pokerQuote: '상대 패를 하나로 예측하는 것이 아닌, 핸드 레인지를 예상하라.',
    lifeQuote: '단편적인 사고가 아닌, 입체적인 사고로 세상을 바라보아라.',
  },
  {
    pokerQuote: '말보다는 상대의 베팅을 보아라.',
    lifeQuote: '인생은 말보다 행동이다.',
  },
];

const QuotePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col w-1/2 items-center  text-center    ">
        <img
          className="w-full h-[300px]"
          alt="Remy Sharp"
          src="/assets/images/changer.png"
          style={{ backgroundSize: '100% 100%' }}
        />
        <div className="flex flex-row bg-blue-500 rounded-b-2xl w-full h-[200px] ">
          <div className="flex flex-col  justify-center   p-2 w-[30%] border-r-2 border-gray-600 text-white">
            <div className="font-extrabold">KIM Kang Hyun</div>
            <div className="font-bold p-2">김강현</div>
            <div className="">changer</div>
          </div>

          <div className="flex flex-col justify-center h-full  p-2 w-[70%]">
            <div className=" font-extrabold text-[2vw] text-center">
              "Dream, the ball, and Goal, the achievement."
            </div>
            <div className="font-bold text-[1vw] text-center text-red-800">
              꿈이 라는 공 골대 라는 성취
            </div>{' '}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center  text-center    ">
        {qoutesList.map((v, i) => {
          return (
            <QuoteOneItem
              key={i}
              pokerQuote={v.pokerQuote}
              lifeQuote={v.lifeQuote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuotePage;
