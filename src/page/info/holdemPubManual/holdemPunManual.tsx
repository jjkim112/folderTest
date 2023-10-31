import "../../../styles/page/holdemPubManual/holdemPubBase.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../component/Accordion/Accordion";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const abilitys = [
  "1. 참가비를 낼수 있는 만큼의 자금",
  "2. 딜러의 말을 잘 듣고 플레이 하자",
  "3. 오래 동안 할 정신력",
  "4. 최소한의 포커 족보 (몰라도 됨)",
  "5. 패 안보여준다고 화내지 않기 ",
  "6. 상대가 기분 나쁠 만한 행동 하지 않기",
];

const references = [
  "1. 바이인 : 게임 참가를 뜻합니다. \n\nex. 매장이용권4장 같은경우 매장 참가비가 1만원 이라면 4만원이 필요함",
  "2. 블라인드 : 홀덤 자리를 기준으로 빅블라인드, 스몰 블라인드가 있다.빅블라인드 혹은 스몰블라인 자리라면  매 판마다 특정(블라인드) 금액의 칩을 내고 게임을 시작한다.",
  "3. 리바이 : 참가 후 게임 중 파산 해서 리바이을 통해 다시 들어올 수 있습니다.\n\n참고: 각 토너먼트마다 블라인드에 따라 참가 여부가 정해지니 각 매장에 물어보고 리바이인 하기 바랍니다.",
  "4. 리엔트리 : 참가 후 게임 중 파산 해서 리엔트리를 통해 다시 들어올 수 있는것은 리바이인과 같지만 현재 내가 있던 테이블 자리를 다시 배정을 받아 다시 참가하는 것 입니다.\n\n참고: 각 토너먼트마다 블라인드에 따라 참가 여부가 정해지니 각 매장에 물어보고 리엔트리 하기 바랍니다. 사람 대기수에 따라 대기 후 들어 갈 수 있습니다.",
  "5. 애드온 : 매장 마다 룰이 다를수 있음, 보통 게임 시작 후\n\n5-1 리엔트리또는 리바이인 한 후 에드온을 받는 방법\n\n5-2 게임 중 내가 돈을 많이 가지고 시작하기 위해 애드온을 하는 방법\n\n5-3 특정 블라인드에 가능 한 경우\n\n참고: 애드온있는 매장이라면 잘 물어보고 할 것 ",
];

const often = [
  "1. 빅 블라인드(Big Blind) : 빅 포지션에 위치한 플레이어가 기본으로 내는 블라인드 머니이다.",
  "2. 스몰 블라인드(Small Blind) : 딜러 버튼 왼쪽에 위치한 플레이어로, 스몰 블라인드 금액을 내야 한다. 보통 빅 블라인드의 절반이다.",
  "3. 앤티(Ante) : 게임 시작 전 모든 참가자들이 의무적으로 내야 하는 금액. 스몰/빅 블라인드 금액과는 다른 개념이며, 테이블마다 앤티가 있는 곳도 있고 없는 곳도 있다.",
  "4. 프리 플랍(Pre-flop) : 커뮤니티 카드 세 장(flop) 이전에 취하는 액션. 비포어 플랍(Before-flop)이라고도 한다. 프리-플랍 레이즈, 프리-플랍 올인 등.",
  "5. 플랍(Flop) : 가장 처음 오픈되는 3장의 커뮤니티 카드.",
  "6. 턴(Turn) : 플랍 다음으로 공개되는 커뮤니티 카드.",
  "7. 리버(River) : 마지막에 공개되는 커뮤니티 카드.",
  "8. 액션(Action) : 자신의 차례가 왔을 때 할 수 있는 행동의 총칭. 즉, 체크, 콜, 벳, 레이즈, 폴드\n\n체크(check) : 자기 차례에 벳을 하지 않고 넘어가겠다는 액션.\n\n벳(Bet) : 자신이 가장 먼저 팟에 돈을 걸 때 벳이라고 한다. cf) 레이즈(raise): 앞에서 다른 사람이 벳을 했을 때 그것보다 베팅 금액을 올리는 일.\n\n콜(call) : 콜은 레이즈한 금액 또는 의무배팅의 빅블라인드 만큼 콜을 해야 게임에 참여\n\n폴드(Fold) : 현재 진행중인 게임을 포기하는 일. 자신의 손패 2장을 테이블 중앙 및 선 안쪽으로 던지면 되며 딜러는 이를 회수한다.",
  "9. 뽀쁠 : 같은 문양의 카드를 4장 가지고 있는 상태.한 장만 더 나오면 플러쉬가 되는 상황.",
  "10. 양차 : 낮은쪽이나 높은쪽 하나의 카드가 채워지면 스트레이트가 완성되는 상황,정식명칭은 오픈 앤디드 스트레이트 드로우 (open-ended straight draw)",
  "11. 것샷(빵꾸) : 중간의 카드가 채워지면 스트레이트가 만들어지는 상황",
  "12. 바텀 페어 : 가장 낮은 페어를 맞은 상태",
  "13. 미들 페어 : 제일 낮은 페어보다는 높지만,탑 페어보다 낮은 상태",
  "14. 탑 페어 : 제일 높은 패어를 맞은 상태",
  "15. 아우츠 : 특정 플레이어가 상대 플레이어를 역전하기 위해 필요한 카드, 그 카드들의 총 개수",
];

export default function HoldemPubBase() {
  return (
    <div className="p-3 text-white whitespace-pre-wrap">
      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>홀덤 펍 갈때 고민일때 이 것만은 알고 가자</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {abilitys.map((ability) => (
            <div key={ability} className="sentence">
              {ability}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>
            추가로 알면 좋은 것들 (카톡 올라온 참여 공지 또는 현장 참가하기 전
            기본 용어 )
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {references.map((reference) => (
            <div key={reference} className="sentence">
              {reference}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>자주 쓰는(들리는) 홀덤 용어</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {often.map((reference) => (
            <div key={reference} className="sentence">
              {reference}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
