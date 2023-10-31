import { useNavigate } from 'react-router-dom';
import { HeaderTap } from '../../utils/header/header_tap';
import { useState } from 'react';

import HandRankPage from 'src/page/hand_rank/HandRankPage';
import PreFlopRangePage from 'src/page/pre_flop_range/PreFlopRangePage';
import HandRankings from '../holdem_base/poker_hand_rankings/HandRankings';
type Section = {
  label: string;
};

function HoldemUtil() {
  const tabs: Section[] = [
    {
      label: '핸드 순위',
    },

    {
      label: '프리플랍 핸드',
    },
    {
      label: '포커(족보) 랭킹',
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
    case '핸드 순위':
      return <HandRankPage></HandRankPage>;

    case '프리플랍 핸드':
      return <PreFlopRangePage></PreFlopRangePage>;

    case '포커(족보) 랭킹':
      return <HandRankings></HandRankings>;

    default:
      return <div>페이지 없습니다</div>;
  }
}

export default HoldemUtil;
