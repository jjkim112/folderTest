import { useNavigate } from 'react-router-dom';
import { HeaderTap } from '../../utils/header/header_tap';
import { useState } from 'react';
import HandRankings from './poker_hand_rankings/HandRankings';
import HoldemPubBase from './holdem_pub_base/HoldemPubBase';
import HoldemTermsBase from './terms_base/HoldemTermsBase';
import HoldemPubBetRule from './holdem_pub_bet_rule/HoldemPubBetRule';
import HoldemPubCardRule from './holdem_pub_card_rule/HoldemPubCardRule';
import HoldemVisionAbility from './holdem_vision_ability/HoldemVisionAbility';
import HandRankPage from 'src/page/hand_rank/HandRankPage';
import PreFlopRangePage from 'src/page/pre_flop_range/PreFlopRangePage';
type Section = {
  label: string;
};

function HoldemBase() {
  const tabs: Section[] = [
    {
      label: '펍 방문시',
    },
    {
      label: '홀덤 베팅 방식',
    },
    {
      label: '홀덤 플레이 방식',
    },
    {
      label: '용어 정리',
    },
    {
      label: '비전 핸드 확률',
    },
  ];
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  return (
    <div className="h-full">
      <HeaderTap content={tabs} activeTab={setActiveHeaderTab} />
      <HoldemBaseSel sel={`${tabs[activeHeaderTab].label}`}></HoldemBaseSel>
    </div>
  );
}
type selProps = {
  sel: string;
};

export function HoldemBaseSel({ sel }: selProps): JSX.Element {
  switch (sel) {
    case '홀덤 베팅 방식':
      return <HoldemPubBetRule></HoldemPubBetRule>;
    case '홀덤 플레이 방식':
      return <HoldemPubCardRule></HoldemPubCardRule>;
    case '비전 핸드 확률':
      return <HoldemVisionAbility></HoldemVisionAbility>;
    case '펍 방문시':
      return <HoldemPubBase></HoldemPubBase>;
    case '용어 정리':
      return <HoldemTermsBase></HoldemTermsBase>;

    default:
      return <div>페이지 없습니다</div>;
  }
}

export default HoldemBase;
