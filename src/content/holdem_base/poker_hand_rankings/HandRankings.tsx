import { useRef, useState } from 'react';

type HandRanking = {
  title: string;
  imageUrl: string;
  content: string;

  percentage: string;
};

function HandRankings() {
  const handRankingList: HandRanking[] = [
    {
      title: 'Top 1.로열 스트레이트 플러쉬\n(Royal Straight Flush)',
      imageUrl: '/assets/images/card-ranking/royal-straight-flush.png',
      content:
        '무늬가 같고 A, K, Q, J, 10, 플래쉬이면서 동시에 가장 높은 스트레이트 ',
      percentage: '(약 0.0032%)',
    },
    {
      title: 'Top 2.스트레이트 플러쉬\n(Straight Flush)',
      imageUrl: '/assets/images/card-ranking/straight-flush.png',
      content:
        '국내 포커 용어로 스티플, 세븐 포커의 경우 무늬가 같은 A, 2, 3, 4, 5를\n 백스트플이라고 명칭 하지만 텍사스홀덤에서는 백스티플 족보가 없다.\n그래서 최하위 스트레이트 플레쉬인 것이다. ',
      percentage: '(약 0.0278%)',
    },
    {
      title: 'Top 3.포카드\n(Four of a kind)',
      imageUrl: '/assets/images/card-ranking/four-card.png',
      content:
        '5장의 카드 중 같은 숫자가 4장인 경우. \n동시에 포카드인 경우 마지막 5번째 카드(킥커)로 승부를 정함.',
      percentage: '(약 0.168%)',
    },
    {
      title: 'Top 4.풀하우스\n(Full house)',
      imageUrl: '/assets/images/card-ranking/full-house.png',
      content:
        '5장의 카드 중에 같은 숫자가 3장(Three of a kind) + 같은 숫자 2장(Pair) 조합.\n같은 풀하우스의 경우 트리플 숫자가 높은 플레이어가 이기고\n 트리플이 같은 경우, 페어 숫자가 높은 플레이어가 승자가 된다.\n트리플, 페어가 모두 같은 경우 찹찹이 된다. ',
      percentage: '(약 2.59%)',
    },
    {
      title: 'Top 5.플러쉬\n(Flush)',
      imageUrl: '/assets/images/card-ranking/flush.png',
      content:
        '5장의 카드가 무늬가 같은 경우.\n같은 플러쉬인 경우 가장 높은 숫자가 승자가 되고\n 가장 높은 숫자가 같은 경우 다음 카드 차례로 숫자를 비교하여\n 숫자가 높은 플레이어가 승자가 된다.\n 홀덤의 경우 무늬로 승자를 판별하는 경우는 없다. ',
      percentage: '(약 3.03%)',
    },
    {
      title: 'Top 6.스트레이트\n(Straight)',
      imageUrl: '/assets/images/card-ranking/straight.png',
      content:
        '5장의 카드 숫자가 연속된 경우.\n세븐 포커의 경우 A, K, Q, J, 10을 마운틴, A, 2, 3, 4, 5를 백스트레이라고 명칭\n 하지만 텍사스 홀덤의 경우 마운틴, 백스트레이트를 따로 구분하지 않는다.\n최고는 Ace 스트레이트, 최하는 5 스트레이트이다. ',
      percentage: '(약 4.62%)',
    },
    {
      title: 'Top 7.트리플\n(Three of a kind)',
      imageUrl: '/assets/images/card-ranking/three.png',
      content:
        '5장의 카드 중 같은 숫자의 카드가 3장인 경우.\n국내에서는 트리플, 봉이라고 명칭 하지만 텍사스홀덤에서는 쓰리 오브 어 카인드이다.\n특별히, 프리플랍 핸드에서 원페어로 시작해서 플랍에서 트리플이 된 경우를 셋(Set)이라고 한다 ',
      percentage: '(약 4.83%)',
    },
    {
      title: 'Top 8.투페어\n(Two pair)',
      imageUrl: '/assets/images/card-ranking/two-pair.png',
      content:
        '5장의 카드 중 같은 숫자 2가지 숫자가 페어인 경우.\n투페어의 경우 가장 높은 수자의 페어가 승자가 되고,\n 높은 페어 숫자가 같으면 다음 숫자로 승자를 판별.\n 2가지 페어 숫자가 동일한 경우 마지막 카드(킥커)가 높은 플레이어가 승자가 된다. ',
      percentage: '(약 23.5%)',
    },
    {
      title: 'Top 9.원페어\n(One pair)',
      imageUrl: '/assets/images/card-ranking/one-pair.png',
      content:
        '5장의 카드 중 같은 숫자가 2개인 경우.\n같은 원페어인 경우 높은 숫자의 페어가 승자가 되고,\n 같을 시 나머지 숫자들을 비교해서 판별.',
      percentage: '(약 43.8%)',
    },
    {
      title: 'Top 10.하이카드\n(High card)',
      imageUrl: '/assets/images/card-ranking/high-card.png',
      content:
        '5장의 카드가 숫자,\n무늬 모두 다른 경우.가장 높은 숫자부터 비교하여 승자 판별.',
      percentage: '(약 17.4%)',
    },
  ];
  const splitTitle = (title: string): string => {
    var afterStr = title.split('(');
    return afterStr[0];
  };

  const divRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleClick = (index: number) => {
    divRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <div>
      <div className="max-w-screen-lg mx-auto w-1/5 overflow-y-auto hidden lg:block ">
        <div className="fixed top-14 left-3 m-1 p-2 bg-slate-700 z-50 w-1/6   ">
          <div className="flex flex-col  justify-between">
            {handRankingList.map((hand, index) => (
              <div key={index} className="w-full   my-2 px-2">
                <button
                  className=" bg-slate-950 w-full text-left rounded-lg p-3"
                  onClick={() => handleClick(index)}
                >
                  <h2 className="text-white text-xs font-bold mb-2">
                    {splitTitle(hand.title)}
                  </h2>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col  items-center justify-center text-center">
        {handRankingList.map((v, i) => {
          return (
            <div
              key={i}
              className=" flex flex-col justify-center m-3 items-center text-center text-white whitespace-pre-wrap"
            >
              <div
                ref={(el) => (divRefs.current[i] = el)}
                className="w-full box-border bg-slate-800 border-black rounded-tl-2xl rounded-tr-2xl p-4 mt-1 text-xl font-medium "
              >
                {v.title}
              </div>
              <div className=" w-full ">
                <img
                  className="bg-slate-800 object-contain w-full mt-1"
                  src={v.imageUrl}
                  alt=""
                />
              </div>

              <div className="flex justify-center w-full h-60 box-border bg-slate-800 border-black rounded-bl-2xl rounded-br-2xl p-4 mt-1">
                <div className="flex flex-row w-full  h-full">
                  <div className="flex flex-col  w-3/12 h-full text-center mr-4  items-center justify-center">
                    <div className="bg-red-500 rounded-tl-sm rounded-tr-sm py-2 w-full text-white">
                      확률
                    </div>
                    <div className="bg-slate-600 h-full w-full flex items-center justify-center text-xs md:text-base">
                      <div className="w-full">{v.percentage}</div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1   w-7/12 ml-auto text-center h-full  items-center justify-center">
                    <div className="bg-blue-800 rounded-tl-sm w-full rounded-tr-sm py-2 text-white">
                      설명
                    </div>
                    <div className="bg-slate-600 h-full w-full p-3 flex items-center justify-center text-xs md:text-base">
                      <div className="w-full">{v.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HandRankings;
