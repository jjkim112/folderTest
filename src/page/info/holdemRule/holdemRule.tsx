import { useNavigate } from "react-router-dom";
import { HeaderTap } from "../../../component/Tap/header_tap";
import { useState } from "react";

import HoldemPubBase from "../holdemPubManual/holdemPunManual";
import HoldemTermsBase from "../holdemWords/holdemWords";
import HoldemPubBetRule from "../holdemRule/betRule/betRule";
import HoldemPubCardRule from "../holdemRule/playRule/playRule";
import HoldemVisionAbility from "../holdemRule/visionHand/visionHand";
import QuotePage from "../quote/QuotePage";
type Section = {
  label: string;
};

function HoldemBase() {
  const tabs: Section[] = [
    {
      label: "펍 방문시",
    },
    {
      label: "홀덤 베팅 방식",
    },
    {
      label: "홀덤 플레이 방식",
    },
    {
      label: "용어 정리",
    },
    {
      label: "비전 핸드 확률",
    },
    {
      label: "홀덤 좋은 글귀",
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
    case "홀덤 베팅 방식":
      return <HoldemPubBetRule></HoldemPubBetRule>;
    case "홀덤 플레이 방식":
      return <HoldemPubCardRule></HoldemPubCardRule>;
    case "비전 핸드 확률":
      return <HoldemVisionAbility></HoldemVisionAbility>;
    case "펍 방문시":
      return <HoldemPubBase></HoldemPubBase>;
    case "용어 정리":
      return <HoldemTermsBase></HoldemTermsBase>;
    case "홀덤 좋은 글귀":
      return <QuotePage></QuotePage>;

    default:
      return <div>페이지 없습니다</div>;
  }
}

export default HoldemBase;
