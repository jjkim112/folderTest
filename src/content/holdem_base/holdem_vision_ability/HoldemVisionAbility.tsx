import './HoldemVisionAbility.css';
import { Accordion, AccordionDetails, AccordionSummary } from '../util/util';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function HoldemVisionAbility() {
  const flushDraw = [
    {
      image: '/assets/images/vision/flushDraw1.png',
      percentage: '34.97%',
      outs: '9개',
      formula: '1 - (38 ÷ 47) × (37 ÷ 46)\n = 0.34967 * 100 = 34.97%',
    },
    {
      image: '/assets/images/vision/flushDraw2.png',
      percentage: '19.56%',
      outs: '9개',
      formula: '9 ÷ 46\n = 0.1956 * 100 = 19.56%',
    },
  ];
  const straight = [
    {
      image: '/assets/images/vision/straight1.png',
      percentage: '31.45%',
      outs: '8개',
      formula: '1 - (39 ÷ 47) × (38 ÷ 46)\n = 0.3145 * 100 = 31.45%',
    },
    {
      image: '/assets/images/vision/straight2.png',
      percentage: '17.39%',
      outs: '8개',
      formula: '8 ÷ 46\n = 0.1739 * 100 = 17.39%',
    },
  ];
  const flushStraightDarw = [
    {
      image: '/assets/images/vision/flushStraightDarw1.png',
      percentage: '31.45%',
      outs: '15개 뽀쁠 9개 양차 8개 양차랑 뽀쁠이 겹치는 부분2장을뺀',
      formula: '1 - (32 ÷ 47) × (31 ÷ 46)\n = 0.5411 * 100 = 54.11%',
    },
    {
      image: '/assets/images/vision/flushStraightDarw2.png',
      percentage: '32.60%',
      outs: '15개',
      formula: '15 ÷ 46\n = 0.3260 * 100 = 32.60%',
    },
  ];
  const thingShot = [
    {
      image: '/assets/images/vision/thingShot1.png',
      percentage: '16.46%',
      outs: '4개',
      formula: '1 - (43 ÷ 47) × (42 ÷ 46)\n = 0.1646 * 100 = 16.46%',
    },
    {
      image: '/assets/images/vision/thingShot2.png',
      percentage: '8.69%',
      outs: '4개',
      formula: '4 ÷ 46\n = 0.0869 * 100 = 8.69%',
    },
  ];

  return (
    <div className="p-2">
      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography>아우츠 계산 방식</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="info-content font-bold text-black text-base mb-3">
            아우츠 내가 기대하는 숫자의 갯수를 의미. 다른 사람의 패는 알 수
            없으므로 신경 쓰지 않음.
          </div>
          <div className="info-ex content text-black text-base mb-3">
            * 여집합으로 고려, '1-(0.81)(0.81) = 0.35 (근사값)'
          </div>
          <div className="info-content text-black text-base mb-3">
            내가 기대하지 않는 것들이 뜰 확률에서 1을 빼주면 내가 기대하는
            숫자의 퍼센트가 나온다.
          </div>
          <div className="info-formula content text-black text-base mb-3">
            1 - ((47-아우츠 갯수)/47) * ((46-아우츠 갯수)/46)
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography>1. 플러시 드로우(뽀쁠) 확률</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {flushDraw.map((v, i) => (
            <div key={i}>
              <img src={v.image} alt="table1" />
              <div className="content">
                <ul>
                  <li>
                    <p className="title">확률 : {v.percentage}</p>
                    <p>아우츠 : {v.outs}</p>
                    <p>계산 식 : {v.formula}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography> 2.오픈 엔드 스트레이트 드로우(양차) 확률</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {straight.map((v, i) => (
            <div key={i}>
              <img src={v.image} alt="table1" />
              <div className="content">
                <ul>
                  <li>
                    <p className="title">확률 : {v.percentage}</p>
                    <p>아우츠 : {v.outs}</p>
                    <p>계산 식 : {v.formula}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography> 3. 뽀쁠에 양차</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {flushStraightDarw.map((v, i) => (
            <div key={i}>
              <img src={v.image} alt="table1" />
              <div className="content">
                <ul>
                  <li>
                    <p className="title">확률 : {v.percentage}</p>
                    <p>아우츠 : {v.outs}</p>
                    <p>계산 식 : {v.formula}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-CardRule"
          id="panel1d-CardRuleHeader"
        >
          <Typography> 4. 것샷 스트레이트 드로우(빵꾸) 확률</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {thingShot.map((v, i) => (
            <div key={i}>
              <img src={v.image} alt="table1" />
              <div className="content">
                <ul>
                  <li>
                    <p className="title">확률 : {v.percentage}</p>
                    <p>아우츠 : {v.outs}</p>
                    <p>계산 식 : {v.formula}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default HoldemVisionAbility;
