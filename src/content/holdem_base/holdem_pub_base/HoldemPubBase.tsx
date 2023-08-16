import { useState } from 'react';
import './holdemPubBase.css';
const abilitys = [
  '1. 참가비를 낼수 있는 만큼의 자금',
  '2. 딜러의 말을 잘 듣고 플레이 하자',
  '3. 오래 동안 할 정신력',
  '4. 최소한의 포커 족보 (몰라도 됨)',
  '5. 패 안보여준다고 화내지 않기 ',
  '6. 상대가 기분 나쁠 만한 행동 하지 않기',
];
const references = [
  '1. 바이인 : 게임 참가를 뜻합니다. \n\nex. 매장이용권4장 같은경우 매장 참가비가 1만원 이라면 4만원이 필요함',
  '2. 블라인드 : 홀덤 자리를 기준으로 빅블라인드, 스몰 블라인드가 있다.빅블라인드 혹은 스몰블라인 자리라면  매 판마다 특정(블라인드) 금액의 칩을 내고 게임을 시작한다.',
  '3. 리바이인 : 참가 후 게임 중 파산 해서 리바이인을 통해 다시 들어올 수 있습니다.\n\n참고: 각 토너먼트마다 블라인드에 따라 참가 여부가 정해지니 각 매장에 물어보고 리바이인 하기 바랍니다.',
  '4. 리엔트리 : 참가 후 게임 중 파산 해서 리엔트리를 통해 다시 들어올 수 있는것은 리바이인과 같지만 현재 내가 있던 테이블 자리를 다시 배정을 받아 다시 참가하는 것 입니다.\n\n참고: 각 토너먼트마다 블라인드에 따라 참가 여부가 정해지니 각 매장에 물어보고 리엔트리 하기 바랍니다. 사람 대기수에 따라 대기 후 들어 갈 수 있습니다.',
  '5. 애드온 : 매장 마다 룰이 다를수 있음, 보통 게임 시작 후\n\n5-1 리엔트리또는 리바이인 한 후 에드온을 받는 방법\n\n5-2 게임 중 내가 돈을 많이 가지고 시작하기 위해 애드온을 하는 방법\n\n5-3 특정 블라인드에 가능 한 경우\n\n참고: 애드온있는 매장이라면 잘 물어보고 할 것 ',
];
export default function HoldemPubBase() {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  return (
    <div className="p-10 text-white whitespace-pre-wrap">
      <div className="container">
        <h2 className="text-2xl">홀덤 펍 갈때 고민일때 이 것만은 알고 가자</h2>
        {abilitys.map((ability) => (
          <div key={ability} className="sentence">
            {ability}
          </div>
        ))}
      </div>
      <br />
      <div className="container">
        <h2 className="text-2xl">추가로 알면 좋은 것들</h2>
        <h2 className="text-xs">
          (카톡 올라온 참여 공지 또는 현장 참가하기 전 기본 용어 )
        </h2>
        {references.map((reference) => (
          <div key={reference} className="sentence">
            {reference}
          </div>
        ))}
      </div>
    </div>
  );
}
