import { Accordion, AccordionDetails, AccordionSummary } from '../util/util';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HoldemPubCardRule() {
  return (
    <div className="p-2">
      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography>{'1. 프리플랍(Pre-Flop)'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card1.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">프리플랍</p>
                <span className="second">
                  플레이어 마다 2장씩 받은 상태 입니다. 베팅 후 플랍으로 가게
                  됩니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-CardRule"
          id="panel2d-CardRuleHeader"
        >
          <Typography>{'2. 플랍(Flop)'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card2.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">플랍</p>
                <span className="second">
                  플랍에는 커뮤니티 카드 3장이 깔려있습니다. 베팅 후 턴으로
                  넘어갑니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3d-CardRule"
          id="panel3d-CardRuleHeader"
        >
          <Typography>{'3. 턴(Turn)'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card3.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">턴</p>
                <span className="second">
                  플랍 다음으로 공개되는 커뮤니티 카드. 현재 4장의 커뮤니티
                  카드를 볼 수 있습니다. 베팅후 리버로 가게 됩니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4d-CardRule"
          id="panel4d-CardRuleHeader"
        >
          <Typography>{'4. 리버 (River)'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card4.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">리버</p>
                <span className="second">
                  마지막에 공개되는 커뮤니티 카드. 마지막 베팅 후 카드로 싸우게
                  됩니다. 돌아올 수 없는 강 입니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5d-CardRule"
          id="panel5d-CardRuleHeader"
        >
          <Typography>{'5. 승리 방식'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card5.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">승리조건</p>
                <span className="second">
                  내 손 패의 2장과 커뮤니티 5장의 카드를 조합하여 최종 5장의
                  조합 중 가장 높은 족보를 가진 플레이어가 승리합니다.
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <p className="title">위에 그림(승리 조건)</p>
                <span className="second">
                  4명의 플레이어중 Qs,10d 의 조합이 가장 높은 스레이트 이므로
                  승리했습니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6d-CardRule"
          id="panel6d-CardRuleHeader"
        >
          <Typography>{'6. 비교방식(2등인 경우)'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card6.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">2등인 경우 비교</p>
                <span className="second">
                  2등의 경우 커뮤니티 카드의 Kh,Jd를 빼게 되면 가장 낮은
                  스트레이트가 되어 2등 됩니다.
                </span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7d-CardRule"
          id="panel7d-CardRuleHeader"
        >
          <Typography>{'7. 찹(비기는)경우'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/assets/images/table_card/card7.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">보드 찹</p>
                <span className="second">
                  비기는 경우를 말한다. 위 그림은 보드 스트레이트여서 보드보다
                  높은 족보가 없으므로 보드가 가장 큰 족보가 되어 찹된 상태이다.
                </span>
              </li>
            </ul>
          </div>
          <div className="content">
            <ul>
              <li>
                <p className="title">위 그림 결과</p>
                <span className="second">3명에서 팟을 나눠 가지게 됩니다.</span>
              </li>
            </ul>
          </div>
          <img src="/assets/images/table_card/card8.png" alt="table1" />
          <div className="content">
            <ul>
              <li>
                <p className="title">핸드 찹</p>
                <span className="second">
                  위 그림의 경우 핸드가 같아서 같은 족보가 되어 비기는 경우를
                  보여준다.
                </span>
              </li>
            </ul>
          </div>
          <div className="content">
            <ul>
              <li>
                <p className="title">위 그림 결과</p>
                <span className="second">2명에서 팟을 나눠 가지게 됩니다.</span>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
