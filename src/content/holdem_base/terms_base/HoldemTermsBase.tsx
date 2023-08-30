import { useEffect, useState } from 'react';
import './HoldemTermsBase.css';
const terms = [
  {
    key: '가',
    item: [
      {
        title: '것 샷 (Gutshot)',
        content:
          '카드 한 장만으로 스트레이트를 만들 수 있는 드로우 상태를 말합니다.\n(예시: Hero: 2, 3 / Board: K, 5, 6)',
      },
      {
        title: '그라인더 (Grinder)',
        content:
          '장기간 플레이를 통해 수익으로 생계를 유지하는 포커 플레이어를 말합니다.',
      },
      {
        title: '기대값 (Expectation value / EV)',
        content:
          '장기적인 수익성을 의미하며, 이번 핸드의 승패와 상관없이 동일한 의사결정을 꾸준히 반복했을 때의 기대값을 표현하기 위해 사용됩니다.',
      },
    ],
  },
  {
    key: '나',
    item: [
      {
        title: '넛 핸드 (Nut hand)',
        content:
          '넛 핸드는 현재 주어진 상황에서 가질 수 있는 최고의 족보를 가진 핸드를 말합니다.',
      },
      {
        title: '노 리밋 (No limit)',
        content:
          '플레이어가 베팅에서 자신의 가진 칩의 범위 내에서 일부 또는 전부를 베팅 할 수 있는 규칙입니다.',
      },
      {
        title: '니트 (Nit)',
        content:
          '매우 좁고 타이트한 레인지의 핸드만을 플레이하는 플레이어들을 지칭하는 용어입니다. 니트 성향을 가진 플레이어는 대부분 승리할 확신이 없는 경우, 콜도 하지 않는 경향이 있습니다.',
      },
    ],
  },
  {
    key: '다',
    item: [
      {
        title: '다운 스윙 (Downswing)',
        content:
          '플레이어가 운, 또한 다른 요소로 인해 계속 지게되는 기간을 말합니다.',
      },
      {
        title: '더블 배럴 (Double barrel)',
        content:
          '플랍에서 나온 배팅을 상대가 콜을 했을 때, 턴에서 한번더 레이즈 하는 경우를 더블 배럴이라고 합니다.',
      },
      {
        title: '더블 업 (Double Up)',
        content:
          '플레이어가 올인을 한 게임에서 승리하여 단 한판으로 칩을 2배로 늘리는 상황을 말합니다.',
      },
      {
        title: '동크 벳 (Donk Bet)',
        content:
          '이전 베팅 라운드에서 주도권이 없었던 플레이어가 초기 포지션에서 베팅 한 것입니다. 이 플레이는 대부분 게임을 못하는 플레이어들이 많이 했기 때문에 이런 이름이 붙여졌습니다.',
      },
      {
        title: '동키 (Donkey)',
        content: '피쉬 또는 동키라고 부르며, 약한 플레이어를 말합니다.',
      },
      {
        title: '듀스 (Deuce)',
        content: '숫자 2 카드. 덕(Duck)이라고도 합니다.',
      },
      {
        title: '드라이 보드 (Dry board)',
        content:
          '커뮤니티 카드의 상태를 질감으로 표현한 것입니다. 스트레이트나 플러시처럼 강한 핸드를 만드는 것이 불가능하거나, 불가능에 가까운 카드가 보드에 깔리면 그 보드는 드라이하다 라고 표현 합니다.',
      },
      {
        title: '드로우, 드로우 핸드 (Draw, Draw hand)',
        content:
          '드로우 핸드는 플랍, 턴 또는 리버에서 필요한 카드(아웃츠)를 통해 자신의 핸드를 훨씬 더 강한 핸드로 향상시킬 수 있는 핸드들을 말합니다.',
      },
      {
        title: '드로잉 데드 (Drawing dead)',
        content: '무슨 카드가 나와도 역전할 수 없는 상황을 말합니다.',
      },
      {
        title: '디펜스 (Defense)',
        content:
          '블러프로 의심되는 플레이어가 베팅 한 경우, 콜 또는 레이즈를 하여 블러프를 방어하는 플레이를 말합니다.',
      },
      {
        title: '딜 (Deal)',
        content:
          '딜러는 게임의 규칙에 따라 플레이어에게 카드를 분배하는 것을 말합니다.',
      },
      {
        title: '딜러 (Dealer)',
        content:
          '베팅 순서, 팟 계산 등 게임 진행을 목적으로 그 역할을 맡은 사람을 말합니다.',
      },
      {
        title: '딥 스택 (Deep stack)',
        content:
          '플레이하는 블라인드에 비해 상대적으로 큰 칩 스택. 빅 스택이라고도 합니다.',
      },
    ],
  },
  {
    key: '라',
    item: [
      {
        title: '락 (Rock)',
        content: '니트보다 더 타이트한 선수.',
      },
      {
        title: '래빗 헌팅 (Rabbit hunting)',
        content:
          '플레이어가 베팅에 폴드를 하여 해당 판이 종료된 경우, 오픈되지 않은 턴, 리버 카드를 볼 수 있는 것을 말합니다. 프리플랍은 제외입니다.',
      },
      {
        title: '러너 러너 (Runner-runner)',
        content:
          '플랍을 제외한 턴과 리버에서 연속적으로 두 장의 카드를 가지고 만든 족보를 말합니다. 백도어라고도 합니다. (러너러너 플러시 등)',
      },
      {
        title: '레벨 (Level)',
        content:
          '꾸준하게 올라가는 블라인드를 표현하기 위해 토너먼트에서 사용하는 용어입니다. 블라인드 레벨이라고도 합니다.',
      },
      {
        title: '레인보우 (Rainbow)',
        content: '플랍에서 서로 다른 무늬의 카드 3~4장이 깔린 것을 말합니다.',
      },
      {
        title: '로얄 카드 (Royal cards)',
        content:
          '로얄 카드는 얼굴 카드 또는 그림 카드라고도합니다. 이 카드는 모든 무늬의 잭, 퀸, 킹으로 구성됩니다.',
      },
      {
        title: '로얄 플러쉬 (Royal flush)',
        content:
          '모든 같은 무늬의 상위 5개 카드로 플러시를 메이드하는 것을 말합니다. 포커에서 가장 높은 핸드입니다. (AKQJT)',
      },
      {
        title: '루즈 (Loose)',
        content:
          '일반적으로 플레이하는 스타일이나, 다른 평균적인 플레이어보다 더 많은 핸드를 플레이하는 것을 말합니다.',
      },
      {
        title: '리 레이즈 (Re-raise)',
        content: '앞선 레이즈에 다시 레이즈하는 것입니다. ',
      },
      {
        title: '리바이 (Rebuy)',
        content:
          '최초 바이인 이후, 최초 바이인할 때의 칩보다 같거나 적은 경우, 또는 탈락 후에 참가비를 다시 내고 자신의 칩을 추가하는 것을 말합니다.  일부 토너먼트에서 플레이어는 토너먼트 시작 후 사전 공지된 특정 레벨 이전에서 리바이할 수 있습니다.',
      },
      {
        title: '리버 (River)',
        content:
          '리버, 리버 카드는 마지막 베팅 라운드, 커뮤니티 카드 중 마지막 카드를 뜻합니다. 리버 이후 2명 이상의 플레이어가 남은 경우 쇼다운으로 이어집니다.',
      },
      {
        title: '림프 (Limp)',
        content:
          '레이즈 대신 빅 블라인드를 콜하여 팟에 참가하는 것을 말합니다.',
      },
      {
        title: '림프 리 레이즈 (limp-re-raise)',
        content:
          '프리플랍에서 림프하고, 레이즈가 나온 경우 리레이즈를 하는 플레이를 말합니다.',
      },
      {
        title: '링 게임 (Ring game)',
        content:
          '토너먼트 플레이와 달리 각 핸드를 게임 재화로 플레이하는 게임을 말합니다.',
      },
    ],
  },
  {
    key: '마',
    item: [
      {
        title: '매니악 (Maniac)',
        content:
          '루즈를 넘어선 아무 핸드나 플레이하는 플레이어를 지칭하는 용어입니다.',
      },
      {
        title: '매이드 핸드 (Made hand)',
        content: '플러쉬나 스트레이트가 완성 됐을 경우를 메이드라고 말합니다.',
      },
      {
        title: '먹 (Muck)',
        content:
          '카드를 보여주지 않고 폴드 또는 패배를 인정하는 것을 말합니다.',
      },
      {
        title: '멀티 웨이 팟 (Multy way pot)',
        content:
          '여러 플레이어들이 참여한 팟입니다. 2명보다 많은 경우를 말합니다.',
      },
    ],
  },

  {
    key: '바',
    item: [
      {
        title: '바운티 (Bounty)',
        content:
          '다른 플레이어를 탈락시킨 플레이어에게 현상금을 보상하는 토너먼트의 한 종류입니다.',
      },
      {
        title: '바이 인 (Buy-in)',
        content:
          '바이 인은 토너먼트 또는 게임에 입장하는 것을 의미합니다. 참가비 금액(바이인 금액)은 총 우승 상금 풀과 밀접한 관계가 있습니다.',
      },
      {
        title: '배드 빗 (Bad beat)',
        content:
          '자신의 핸드가 좋은 핸드였는데도 불구하고 커뮤니티 카드가 상대에게 유리하게 오픈되어 약한 핸드에게지는 것을 말합니다.',
      },
      {
        title: '밸런스 (Balance)',
        content:
          '상대가 자신의 핸드에 대한 정보를 얻는 것을 어렵게 만들기 위해 같은 카드로 다르게 플레이하거나, 다른 카드로 비슷하게 플레이 하여 혼동을 주어 자신의 플레이에 균형을 맞추는 것을 말합니다.',
      },
      {
        title: '밸류 벳 (Value bet)',
        content:
          '상대가 나보다 좋지 않은 핸드로 콜을 하게 만드는 베팅입니다. 상대가 콜할 수 있을 만큼의 베팅을 하여 내 카드의 가치, 밸류를 받아내는 것입니다. (상대를 폴드시키려는 블러프 베팅과는 반대됩니다.)',
      },
      {
        title: '뱅크롤 (Bankroll)',
        content: '플레이어가 포커를 플레이하는 자금을 말합니다.',
      },
      {
        title: '버블 (Bubble)',
        content: '토너먼트에서 상금을 받기 직전의 등수를 말합니다.',
      },
      {
        title: '버튼 (Button)',
        content:
          '가장 일반적으로 테이블에서 딜러 위치를 나타내는 마커입니다. (딜러 = 버튼)',
      },
      {
        title: '번 (Burn)',
        content:
          '각 베팅 라운드 전에 탑 카드를 버리는 것을 말합니다. (카드 뒷면에 혹시 모를 표시가 있을 수 있기에, 사전에 방지하는 의미로 맨 위 한 장을 버립니다.)',
      },
      {
        title: '베팅 (Betting)',
        content: '플레이 중에 베팅한 모든 재화를 말합니다.',
      },
      {
        title: '보드 (Board)',
        content: '커뮤니티 카드를 말합니다. 홀덤에서는 5장입니다.',
      },
      {
        title: '브레이크 (Break)',
        content: '토너먼트 중 휴식시간을 말합니다.',
      },
      {
        title: '블라인드 (Blind)',
        content:
          '빅 블라인드 또는 스몰 블라인드의 총칭으로, 스몰 블라인드는 딜러의 왼쪽에, 빅 블라인드는 한 칸 더 왼쪽에 있습니다. ',
      },
      {
        title: '블라인드 스틸 (Blind steal)',
        content:
          '앞에서 다른 모든 플레이어가 폴드하면 블라인드와 앤티를 뺏을 의도로 레이트 포지션에서 약한 핸드로 레이즈하여 폴드를 받아내려는 행동입니다.',
      },
      {
        title: '블락커 (Blocker)',
        content:
          '일반적으로 보드에 플러시 드로우 또는 스트레이트 드로우 등의 카드가 깔렸을 때, 상대의 아웃츠 중 하나를 본인이 들고 있는 것을 말합니다.',
      },
      {
        title: '블랭크 (Blank)',
        content:
          '명백하게 가치가 없는 카드를 말합니다. (주로 커뮤니티 카드에서 많이 쓰이는 단어입니다.)',
      },
      {
        title: '블러프 (Bluff)',
        content:
          '나의 핸드가 더 세다고 믿게 만들기 위해, 상대방을 폴드시키려는 목적으로 하는 베팅입니다. ',
      },
      {
        title: '빅 블라인드 (Big blind)',
        content: '두 개의 블라인드 베팅 중 더 큰 금액입니다.',
      },
      {
        title: '빅 스택 (Big stack)',
        content:
          '플레이되는 평균 블라인드에 비해 상대적으로 큰 칩 스택. 딥 스택이라고도 합니다. 또한 테이블에서 가장 큰 스택을 지칭하는 단어이기도 합니다.',
      },
    ],
  },
  {
    key: '사',
    item: [
      {
        title: '사이드 팟 (Side pot)',
        content:
          '한 플레이어가 "올인"하는 상황에서 다른 플레이어들이 해당 플레이어보다 칩이 많은 경우를 처리하기 위해 만들어진 별도의 팟을 말합니다.',
      },
      {
        title: '새틀라이트 (Satellite)',
        content:
          '상금이 더 큰 토너먼트에 참가 가능한 티켓을 획득할 수 있는 토너먼트를 말합니다.',
      },
      {
        title: '샤크 (Shark)',
        content:
          '대체적으로 프로 포커 플레이어를 말합니다. 게임을 잘하고, 수익을 내는 플레이어들도 포함됩니다. (피쉬를 잡아 먹기 때문)',
      },
      {
        title: '쇼다운 (Showdown)',
        content:
          '마지막 베팅 라운드 이후에 두 명 이상의 플레이어가 남아있는 경우, 남은 플레이어들의 핸드를 오픈하고 서로 족보를 비교하여 승자를 결정하는 것을 말합니다.',
      },
      {
        title: '숏 스택 (Short stack)',
        content:
          '플레이하는 블라인드에 비해 상대적으로 작은 칩 스택을 말합니다.',
      },
      {
        title: '새틀라이트 (Satellite)',
        content:
          '상금이 더 큰 토너먼트에 참가 가능한 티켓을 획득할 수 있는 토너먼트를 말합니다.',
      },
      {
        title: '수딧 (Suited)',
        content: '2장의 핸드 카드가 같은 무늬인 경우를 말합니다.',
      },
      {
        title: '수딧 커넥터 (Suited connetors)',
        content:
          '2장의 핸드 카드가 같은 무늬이고 연속된 숫자(영문)인 경우를 말합니다.',
      },
      {
        title: '스냅 콜 (Snap call)',
        content: '고민 없이 바로 하는 콜을 스냅콜이라고 합니다.',
      },
      {
        title: '스퀴즈 플레이 (Squeeze play)',
        content:
          '앞의 플레이어가 한 레이즈를 하고 다른 플레이어가 콜을 한 경우, 엄청 큰 레이즈를 해서 폴드를 유도하여 팟을 스틸하는 전략입니다. 앞의 플레이어들이 루즈하다 생각되는 경우 블러프로 많이 쓰여집니다.',
      },
      {
        title: '스타팅 핸드 (Starting hand)',
        content: '플레이어가 시작하는 핸드 카드를 말합니다.',
      },
      {
        title: '스택 (Stack)',
        content:
          '링 게임과 토너먼트의 테이블에 있는 각 플레이어들의 칩의 총 양(개수)을 말합니다.',
      },
      {
        title: '스테이크 (Stake)',
        content:
          '바이인하고 베팅 할 수있는 금액입니다. 빅 블라인드와 같은 맥락으로 사용됩니다.',
      },
      {
        title: '스트럭쳐 (Structured)',
        content:
          '스트럭쳐 시스템은 베팅 및 블라인드의 크기가 레벨마다 바뀔 수 있는 시스템입니다.',
      },
      {
        title: 'Straddle (스트래들)',
        content:
          '베팅 포지션 언더 더 건에서 게임이 시작되기 전에 빅 블라인드 금액의 2배를 내는 것으로 플레이어의 선택적 베팅이다. 게임장에 따라 스트래들을 한번, 두번 더 하는 더블 스트래들, 트리플 스트래들 , 심지어 무한 스트레들 등이 가능한 곳도 있다. 토너먼트에서는 스트레들이 불가능하며 스트레들을 하려고 하면 딜러가 칩을 밖으로 빼 주거나 혹은 안봣다(No-Look) 베팅으로 취급 한다.',
      },
      {
        title: '스트릿 (Street)',
        content: '스트릿은 딜 카드 또는 베팅 라운드의 또 다른 용어입니다.',
      },
      {
        title: '스틸 (Steal)',
        content:
          '프리 플랍에 베팅하여 이겨서 블라인드를 빼앗는 것을 블라인드를 스틸한다고 표현합니다.',
      },
      {
        title: '슬로우 플레이 (Slow play)',
        content:
          '상대를 속이기 위해 약한 핸드처럼 오래 고민을 하지만, 사실 강한 핸드를 가지고서 플레이하는 것을 말합니다. 넛 핸드로 슬로우 플레이를 하는 것은 매너없는 플레이로 인식되기도 합니다.',
      },
      {
        title: '싯 앤 고 (Sit and go)',
        content:
          '토너먼트 타입 중에 하나로, 일정 참가자가 모두 모이면 즉시 시작하여 최후의 1명이 남을 때까지 진행하는 게임방식을 말합니다.',
      },
      {
        title: '썩 아웃 (Suck out)',
        content:
          '모든 카드가 딜링 된 후, 상대보다 좋은 핸드가 좋지 않은 패에게 패배하는 상황을 말합니다. 이것을 빨려 나갔다. 즉, 썩 아웃 됐다고 표현합니다.',
      },
      {
        title: '쓰리 벳 (Three bet)',
        content:
          '3번째의 베팅을 뜻합니다. 프리플랍에서는 빅 블라인드가 1번째 베팅이며, 오픈 레이즈가 2번째 베팅입니다. 그 이후의 베팅이 3번째 베팅이며 쓰리 벳이라고 말합니다.',
      },
    ],
  },
  {
    key: '아',
    item: [
      {
        title: '아웃 오브 포지션 (Out of position / OOP)',
        content:
          '플레이어가 가장 먼저 행동하는 포지션에 있는 것을 말합니다. 프리플랍에선 언더 더 건, 미들 포지션을 아웃 오브 포지션이라고 말합니다.',
      },
      {
        title: '아웃츠 (Outs)',
        content:
          '특정 플레이어가 상대 플레이어를 역전하기 위해 필요한 카드, 그 카드들의 총 개수를 아웃츠라고 합니다. 아웃츠가 없는 경우, 드로잉 데드입니다.',
      },
      {
        title: '아이솔레이션 (Isolation)',
        content:
          '일반적으로 플랍을 보기 전, 헤즈업 플레이를 위해 한 명의 플레이어를 제외하고 폴드시키려는 의도로 이루어진 베팅 또는 레이즈를 말합니다. 보통 림프한 상대에게 레이즈하면서 발생합니다.',
      },
      {
        title: '안 봤다 올인 (No-Look All-in)',
        content: '패를 확인하지 않고 모든 칩을 올인 한다는 뜻',
      },
      {
        title: '익스플로잇 (Exploiting)',
        content:
          '상대 플레이어의 약점을 알아내서 이용하는 것을 익스플로잇이라고 합니다. 상대 플레이어가 약한 플레이를 하는지, 공격적인 플레이를 하는지, 블러핑에 잘 넘어가는지 등을 알면 상대보다 유리한 플레이를 할 수 있습니다. ',
      },
      {
        title: '액션 (Action)',
        content:
          '자신의 시간에 어떠한 플레이(베팅, 콜, 레이즈 또는 폴드)를 하는 것을 말합니다.',
      },
      {
        title: '에어 라인 (Airline)',
        content: '에이스 포켓을 의미하는 은어입니다. ',
      },
      {
        title: '액티브 플레이어 (Active player)',
        content:
          '여전히 팟에 관여하고 있는 플레이어를 말합니다. (폴드 하지 않은)',
      },
      {
        title: '앤티 (Ante)',
        content:
          '핸드가 시작되기 전에 모든 플레이어에게 걷는 참가비(강제 베팅)를 말합니다. (참고 : 일부 게임에서만)',
      },
      {
        title: '어그레시브 (Aggressive)',
        content:
          '플레이어가 콜이나 체크보다 베팅을 하거나 레이즈를하는 공격적인 성향을 말합니다.',
      },
      {
        title: '언더 더 건 (Under The Gun)',
        content:
          '텍사스 홀덤 또는 오마하에서 빅 블라인드 바로 왼쪽 위치를 말합니다. 총구 아래에 있는 언더 더 건 플레이어는 프리플랍 베팅 라운드에서 처음으로 액션을 해야합니다.',
      },
      {
        title: '업스윙 (Upswing)',
        content:
          '다운스윙의 반대되는 말로, 플레이어가 예상보다 더 많이 따거나(또는 덜 잃는) 기간을 말합니다.',
      },
      {
        title: '에이스 하이 (Ace high)',
        content: '에이스가 포함 된 5 장의 카드 핸드를 나타냅니다.',
      },
      {
        title: '에퀴티 (Equity)',
        content:
          '현재 팟에서 자신의 수학적 기대값으로, 팟에 있는 금액에 자신의 이길 확률을 곱하여 계산합니다. 분할이 가능한 경우, 분할에서 이길 확률과 해당 분할 크기를 곱한 값도 포함하여 계산합니다.',
      },
      {
        title: '오버 벳 (Overbet)',
        content: '팟의 금액보다 큰 금액의 베팅을 하는 것을 말합니다.',
      },
      {
        title: '오버 페어 (Overpair)',
        content:
          '가장 높은 커뮤니티 카드의 숫자(영문)보다 높은 포켓 페어를 말합니다.',
      },
      {
        title: '오프 수딧 (Off suited)',
        content: '같은 무늬가 아닌 카드를 말합니다.',
      },
      {
        title: '오픈 (Open)',
        content:
          '일반적으로 오픈 레이즈라고 표현합니다. 프리플랍에서 앞에서 베팅이 없는 경우, 먼저 베팅하는 것을 말합니다.',
      },
      {
        title: '오픈 엔디드 스트레이트 드로우(Open-ended straight draw)',
        content:
          '스트레이트 드로우 중 4개의 숫자가 연속 된 경우, 즉 앞 뒤로 메이드가 될 카드가 있는 스트레이트 드로우를 말합니다.',
      },
      {
        title: '올인 (All-in)',
        content: '플레이어가 자신의 모든 칩을 베팅하는 것을 말합니다.',
      },
      {
        title: '옵션 (Option)',
        content:
          '프리플랍에서 레이즈가없는 경우, 빅 블라인드가 레이즈와 체크를 선택할 수 있는 것을 말합니다.',
      },
      {
        title: '웨트 보드 (Wet board)',
        content:
          '웨트 보드는 테이블에 있는 커뮤니티 카드들이 플레이어들이 메이드를 만들기 쉬운 보드를 말합니다. 플러쉬 드로우, 풀하우스 드로우, 스트레이트 드로우 등을 만들기 쉬운 보드를 말합니다.',
      },
      {
        title: '인 더 머니 (In the money / ITM)',
        content:
          '토너먼트에서 상금을 받을 수 있는 입상권 내에 들어간 것을 말합니다.',
      },
      {
        title: '인 포지션 (In position / IP)',
        content:
          '플랍, 턴 또는 리버 베팅 라운드에서 대략적으로 마지막으로 액션을 할 수 있는 위치를 말합니다. 프리플랍에서는 빅, 스몰블라인드, 딜러를 인 포지션이라고 말합니다.',
      },
      {
        title: '임플라이드 오즈 (Implied odds / 잠재적 배당)',
        content:
          '드로우 핸드를 메이드 시킨다는 가정하에, 기대할 수 있는 수익을 말합니다. 만약 플러시 드로우를 메이드한 경우, 상대 플레이어로부터 많은 수익을 낼 수 있을 때 임플라이드 오즈가 충분한 상황이라고 말합니다.',
      },
    ],
  },
  {
    key: '자',
    item: [
      {
        title: '정크 (Junk)',
        content:
          '기대 값이 거의 또는 전혀 없는 핸드를 말합니다, 블랭크카드와 동일합니다.',
      },
    ],
  },
  {
    key: '차',
    item: [
      {
        title: '체크 (Check)',
        content:
          '앞에서 베팅이 없을 경우, 체크를 통해 다음 플레이어에게 액션을 넘길 수 있습니다.',
      },
      {
        title: '체크 레이즈 (Check-raise)',
        content:
          '일반적으로 좋은 패를 들고 있거나, 블러프를 하기 좋은 패를 가지고 있을 때 다른 플레이어가 베팅을 하길 기다렸다가 상대방이 베팅 했을 때 레이즈를 하는 플레이를 말합니다.',
      },
      {
        title: '체크 백 (Check back)',
        content:
          '앞 포지션 플레이어가 체크했을 때, 그 다음 플레이어도 체크하는 것을 첵백이라고 합니다.',
      },
      {
        title: '칩 (Chip)',
        content: '돈 대신 사용되는 작은 동전 모양의 칩을 말합니다.',
      },
      {
        title: '칩 덤핑 (Chip dumping)',
        content:
          '특정 플레이어가 고의로 칩을 잃어 다른 플레이어에게 전달하는 전략입니다. 짜고치기의 한 형태입니다. 고의가 분명할 경우, 제재대상이 될 수 있습니다.',
      },
      {
        title: '칩 리더 (Chip leader)',
        content: '현재 토너먼트에서 가장 많은 칩을 보유한 플레이어를 말합니다.',
      },
      {
        title: '찹 (Chop)',
        content:
          '2명 이상의 플레이어가 무승부 등의 이유로 팟을 나누어 가져가는 상황을 찹이라고 합니다.',
      },
    ],
  },
  {
    key: '카',
    item: [
      {
        title: '캐쉬 게임 (Cash Game)',
        content:
          '토너먼트 게임은 게임에서 최종 우승자가 나올 때까지 진행하지만, 캐시 게임은 필요에 따라 돈을 추가 할 수도 있으며, 언제든 자신의 돈을 갖고 테이블을 떠날 수 있는 게임을 말합니다.',
      },
      {
        title: '커넥터 (Connector)',
        content: '연속적인 두 장의 카드를 말합니다.',
      },

      {
        title: '커뮤니티 카드 (Community card)',
        content:
          '보드 중간에 5장의 카드를 말합니다. 이 카드는 모든 플레이어가 공통적으로 사용할 수 있습니다.',
      },
      {
        title: '컨티뉴에이션 벳 (Continuation bet)',
        content:
          '플랍 이전에 베팅을 시작한 플레이어가 플랍 이후에도 이어서 하는 베팅을 말합니다.',
      },
      {
        title: '컷오프(Cutoff)',
        content:
          '딜러 버튼 바로 오른쪽에 있는 자리를 말합니다. 홈 게임에서 버튼(딜러) 플레이어는 실제로 카드를 섞고, 컷오프 플레이어는 덱을 컷(기리)하는 것에서 유래되었습니다.',
      },
      {
        title: '코인 플립 (Coin flip)',
        content:
          '서로 올인인 경우, 5:5의 가능성으로 둘 모두 이길 가능성이있는 상황을 말합니다.',
      },
      {
        title: '콜 (Call)',
        content: '앞의 베팅에 따라가는 것을 말합니다.',
      },
      {
        title: '콜드 콜 (Cold call)',
        content: '앞 사람의 레이즈에 대하여 콜을 하는 경우를 말합니다.',
      },
      {
        title: '콜링 스테이션 (Calling station)',
        content:
          '베팅에 콜을 자주 하지만 거의 레이즈를하지 않는 플레이어를 말합니다. 콜링 스테이션은 일반적으로 패시브한 플레이어입니다.',
      },
      {
        title: '쿨러 (Cooler)',
        content:
          '자신의 핸드가 강함에도 불구하고, 자신보다 더 강한 핸드를 만나서 아쉽게 지는 상황을 말합니다.',
      },
      {
        title: '쿼즈 (Quads)',
        content: '포 카드와 같은 용어입니다.',
      },

      {
        title: '크라잉 콜 (Crying call)',
        content:
          '자신이 지고 있는 것을 알면서도 확인을 하기 위해 (울면서) 하는 콜을 말합니다.',
      },
      {
        title: '키커 (Kicker)',
        content:
          '사이드 카드라고도 불리는 키커는 쇼다운에서 동일한 족보를 가졌을 때의 순위를 결정하는 두번째 카드입니다. (예: 44442 보드에서 9를 갖고 있고 상대는 K을 가지고 있을 경우 K를 가지고 있는 사람이 승리합니다.)',
      },
    ],
  },
  {
    key: '타',
    item: [
      {
        title: '타이 (Tie)',
        content:
          '쇼다운에서 족보가 동일한 경우를 말합니다. 팟을 똑같이 나눈다는 뜻입니다. 스플릿(Split)이라고도 표현합니다.',
      },
      {
        title: '타이트 (Tight)',
        content:
          '평균적인 플레이어보다 적은 수의 핸드를 플레이하는 플레이어를 말합니다. 좋은 핸드만으로 플레이하기 때문에 적은 수의 핸드만 플레이하게 됩니다.',
      },
      {
        title: '타이트 어그레시브 (Tight aggressive)',
        content:
          '강한 핸드 위주로 플레이하여 팟에 많이 참가하진 않지만, 팟에 있을 때는 공격적으로 플레이하는 타이트하고 어그레시브(공격적인) 플레이 스타일입니다.',
      },
      {
        title: '탑 키커 (Top kicker)',
        content:
          '커뮤니티 카드 게임에서 탑 키커는 주어진 족보에서 가능한 최고의 키커를 말합니다.',
      },
      {
        title: '탑 투 (Top two)',
        content:
          '가장 높은 숫자(영문)의 커뮤니티 카드 두 장과 일치하는 두 페어를 말합니다. 대부분 플랍에서 사용되는 용어입니다.',
      },
      {
        title: '탑 페어 (Top pair)',
        content:
          '커뮤니티 카드 게임에서 탑 페어는 핸드 카드와 커뮤니티 카드에서 가장 높은 카드로 구성된 페어를 말합니다.',
      },
      {
        title: '터보 (Turbo)',
        content:
          '블라인드 레벨이 일반 플레이보다 빠르게 증가하는 토너먼트의 유형 중 하나입니다.',
      },
      {
        title: '턴 (Turn)',
        content:
          '턴, 턴 카드는 4번째 베팅 라운드, 커뮤니 카드 중 4번째 카드를 뜻합니다. 턴 이후 액션이 종료 된 경우 리버로 이어집니다.',
      },
      {
        title: '텔 (Tell)',
        content:
          '플레이어들의 행동이나 감지 가능한 변화들로 해당 플레이어의 핸드 레인지를 유추할 수 있는 단서를 말합니다.',
      },
      {
        title: '토너먼트 (Tournamemt)',
        content:
          '토너먼트 칩을 모두 잃거나 마지막 한 명의 플레이어가 남을 때까지 계속 경쟁하는, 하나 이상의 테이블로 진행되는 방식의 대회입니다.',
      },
      {
        title: '트리플 (Triple)',
        content: '같은 숫자(영문)의 카드 3장으로 만든 족보를 말합니다.',
      },
      {
        title: '트립스 (Trips)',
        content:
          '트리플과 같은 맥락이지만, 보드에 2장과 핸드의 1장이 만나 트리플을 맞은 경우를 트립스라고 부릅니다.',
      },
      {
        title: '틸트 (Tilt)',
        content:
          '일반적으로 배드 빗, 쿨러, 피곤함 등의 이유로 플레이어가 원래 컨디션으로 플레이하지 못하는 상태를 말합니다. (대체적으로 화가 난 상태를 "틸트 왔다"고 합니다.)',
      },
    ],
  },
  {
    key: '파',
    item: [
      {
        title: '파이널 테이블 (Final table)',
        content:
          '멀티 테이블 포커 토너먼트의 마지막 테이블을 말합니다. 결승 테이블 일반적으로 9명입니다.',
      },
      {
        title: '팟 (Pot)',
        content:
          '한 판에서 모든 플레이어가 베팅한 금액의 총합입니다. 해당 판의 승자는 전체 팟을 차지합니다.',
      },
      {
        title: '팟 오즈 (Pot odds)',
        content:
          '현재 베팅을 콜하는데 필요한 금액에 대한, 팟 금액의 비율을 말합니다. if (현재 팟+콜해야 하는 금액) * (뜰 확률) > (콜해야 하는 금액) than 콜 if (현재 팟+콜해야 하는 금액) * (뜰 확률) < (콜해야 하는 금액) than 폴드',
      },
      {
        title: '팟 커밋 (Pot-committed)',
        content:
          '팟의 크기가 갖고 있는 스택 크기에 비해 너무 커, 더 이상 폴드 할 수없는 상황을 말합니다.',
      },
      {
        title: '패밀리 팟 (Family pot)',
        content:
          '모든 또는 거의 모든 플레이어가 첫 번째 베팅에 콜을 한 경우를 말합니다.',
      },
      {
        title: '패시브 (Passive)',
        content: '레이즈보다, 체크와 콜을 자주하는 플레이 스타일입니다.',
      },
      {
        title: '페어 (Pair)',
        content:
          '같은 등급(숫자,영문)의 카드 2장을 말합니다. 포켓 카드와 같은 뜻입니다.',
      },
      {
        title: '포 카드 (Four of a kind)',
        content:
          '같은 숫자(영문)가 4장이 된 경우를 말합니다. 쿼즈 또는 포 오브 카인드라고도 부릅니다.',
      },
      {
        title: '포 플러시 (Four-flush)',
        content: '같은 무늬의 카드가 4장인 경우를 말합니다.',
      },
      {
        title: '포지션 벳 (Position bet)',
        content:
          '핸드의 강도보다 포지션의 이점을 이용한 베팅입니다. 주로 인 포지션에서 많이 사용됩니다.',
      },
      {
        title: '포커 페이스 (Poker face)',
        content: '카드에 대한 정보를 읽을 수 없는 플레이어의 표정을 말합니다.',
      },
      {
        title: '포켓 카드 (Pocket cards)',
        content:
          '홀 카드, 핸드 카드와 동일합니다. 플레이어가 가진 카드 2장을 말합니다.',
      },
      {
        title: '포켓 페어 (Pocket Pair)',
        content: '플레이어의 핸드 카드 2장이 페어인 경우를 말합니다.',
      },
      {
        title: '폴드 (Fold)',
        content:
          '핸드를 버리고 현재 팟에 있는 금액을 포기하는 것을 말합니다. 다른 플레이어들과 경쟁하기에 핸드의 밸류가 약하다고 느낄 때 폴드를 선택합니다. ',
      },
      {
        title: '폴드 에퀴티 (Fold Equity)',
        content:
          '플레이어의 베팅에 대하여, 상대 플레이어가 승부를 하지 않고 폴드할 가능성을 말합니다.',
      },
      {
        title: '푸시 (Push)',
        content: '올인 베팅하는 것을 말합니다.',
      },
      {
        title: '풀 링 (Full ring)',
        content:
          '풀 링은 6명 이상의 플레이어가 참여한 링게임을 말합니다. 이 용어는 주로 온라인 포커에서 사용됩니다.',
      },
      {
        title: '풀 하우스 (Full house)',
        content:
          '동일한 숫자의 카드 3장(트리플)과 동일한 숫자의 카드 2장이 있는 핸드. 보트 또는 타이트(Tight)라고도합니다.',
      },
      {
        title: '프리 카드 (Free card)',
        content:
          '해당 라운드에 어떤 플레이어도 베팅을 하지 않아, 공짜로 오픈된 카드를 말합니다.',
      },
      {
        title: '프리 플랍 (Pre-flop)',
        content:
          '플레이어가 자신의 핸드 카드를 받았지만 플랍이 없는 상태, 그 상태에서의 베팅 라운드를 말합니다.',
      },
      {
        title: '프리롤 (Freeroll)',
        content:
          '바이인이 없는 이벤트를 말합니다. (대부분 토너먼트에서 사용되는 용어입니다.)',
      },
      {
        title: '프리즈 아웃 (Freezeout)',
        content:
          '토너먼트 형식 중 하나입니다. 리바이, 리엔트리 및 애드온이 없으며, 한번 참가하여 떨어지면 재 참가를 할 수 없습니다. 그리고 1위가 결정될 때까지 계속됩니다.',
      },
      {
        title: '플랍 (Flop)',
        content:
          '프리플랍 이후 보여주는 세 장의 커뮤니티 카드를 말합니다. 그리고 세 장의 카드를 보여준 후 진행하는 베팅 라운드를 말합니다.',
      },
      {
        title: '플랫 콜 (Flat call)',
        content:
          '레이즈를 고려해도 되는 강한 핸드를 가진 상황에서 레이즈를 하지 않고, 콜만 받는 것을 말합니다.',
      },
      {
        title: '플러시 (Flush)',
        content:
          '동일한 무늬의 카드 5 장으로 구성된 핸드를 말합니다. 풀 하우스보다 낮고, 스트레이트보다 높습니다.',
      },
      {
        title: '플로트 (Float)',
        content:
          '이후 베팅 라운드에서 블러핑을 할 목적으로 상대의 베팅에 대한 콜을 말합니다. 대부분 플로팅을 한 후 동크벳을 합니다.',
      },
      {
        title: '피쉬 (Fish)',
        content:
          '약하고, 실력이 없는 플레이어 들을 말합니다. 피쉬가 많은 방을 찾아가는 것도 실력입니다. 태그를 통해 피쉬 마크를 해보세요!',
      },
    ],
  },
  {
    key: '하',
    item: [
      {
        title: '하이 롤러 (High roller)',
        content:
          '하이 롤러는 높은 스테이크의 토너먼트에서 플레이하는 것을 말합니다.',
      },
      {
        title: '하이 카드 (High card)',
        content:
          '원페어도 맞지 않은 상태에서 제일 높은 숫자(영문)의 카드를 말합니다.',
      },
      {
        title: '핸드 (Hand)',
        content: '플레이어가 딜러에게 받는 2장의 카드를 말합니다.',
      },
      {
        title: '핸드 레인지 (Range of hands)',
        content:
          '플레이어가 가지고 있을 수 있다고 생각되는 카드의 범위를 말합니다.',
      },
      {
        title: '핸드 히스토리 (Hand history)',
        content:
          '플레이했던 핸드들을 볼 수 있는 기록 입니다. 이를 통해 자신의 세션을 복기하고, 분석할 수 있습니다.',
      },
      {
        title: '헤즈 업 포커 (Heads up poker)',
        content: '두 명이서만 플레이하는 것을 의미합니다. 즉, 1대1 대결입니다.',
      },
      {
        title: '홀 카드 (Hold cards)',
        content: '핸드 카드와 같은 용어입니다. 포켓 카드라고도 합니다.',
      },
      {
        title: '히어로 (Hero)',
        content: '본인의 핸드를 보통 Hero(히어로)라고 부릅니다.',
      },
      {
        title: '히어로 콜 (Hero call)',
        content:
          '플레이어의 핸드가 상대적으로는 약하지만, 상대방이 블러핑이라고 의심되는 경우 콜을 하는 것을 말합니다.',
      },
    ],
  },
];

type termsType = {
  key: string;
  item: {
    title: string;
    content: string;
  }[];
}[];

export default function HoldemTermsBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<termsType>(terms);
  const [selectedItemKey, setSelectedItemKey] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (selectedItemKey !== '') {
      const newterms: termsType = [
        terms.find((term) => term.key === selectedItemKey),
      ];
      setSelectedItem(
        newterms
          .map((alpahbetTerm) => {
            const item = alpahbetTerm.item.filter((term) => {
              const regex = new RegExp(
                event.target.value.split('').map(pattern).join('.*?'),
                'i'
              );
              return regex.test(term.title) || regex.test(term.content);
            });

            if (item.length) {
              return {
                key: alpahbetTerm.key,
                item,
              };
            }
            return null;
          })
          .filter((i) => i !== null)
      );
    } else {
      setSelectedItem(
        terms
          .map((alpahbetTerm) => {
            const item = alpahbetTerm.item.filter((term) => {
              const regex = new RegExp(
                event.target.value.split('').map(pattern).join('.*?'),
                'i'
              );
              return regex.test(term.title) || regex.test(term.content);
            });
            if (item.length) {
              return {
                key: alpahbetTerm.key,
                item,
              };
            }
            return null;
          })
          .filter((i) => i !== null)
      );
    }
  };

  const reESC = /[\\^$.*+?()[\]{}|]/g;
  const reChar = /[가-힣]/;
  const reJa = /[ㄱ-ㅎ]/;
  const offset = 44032;

  const orderOffest = [
    ['ㄱ', 44032],
    ['ㄲ', 44620],
    ['ㄴ', 45208],
    ['ㄷ', 45796],
    ['ㄸ', 46384],
    ['ㄹ', 46972],
    ['ㅁ', 47560],
    ['ㅂ', 48148],
    ['ㅃ', 48736],
    ['ㅅ', 49324],
  ];

  const con2syl = Object.fromEntries(orderOffest as readonly any[]);
  const pattern = (ch: string) => {
    let r;
    if (reJa.test(ch)) {
      const begin =
        con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ'];
      const end = begin + 587;
      r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    } else if (reChar.test(ch)) {
      const chCode = ch.charCodeAt(0) - offset;
      if (chCode % 28 > 0) return ch;
      const begin = Math.floor(chCode / 28) * 28 + offset;
      const end = begin + 27;
      r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    } else r = ch.replace(reESC, '\\$&');
    return `(${r})`;
  };
  return (
    <div className="common-container holdem-term">
      <div className="page-header">
        <h2 className="title">
          <span className="text-red-500">‼️</span>홀덤 용어
        </h2>
      </div>
      <div className=" text-black ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pr-10 border-2 rounded-md  focus:outline-none focus:border-blue-500"
          placeholder="검색어를 입력하세요"
        />
      </div>
      <div className="grid grid-cols-5 gap-2 my-2 ">
        <button
          className={`rounded-md  ${
            selectedItemKey === '' ? 'bg-black' : 'bg-gray-400'
          }  text-white p-1 mb-5 hover:bg-black mr-2 max-md:text-sm`}
          onClick={() => {
            setSelectedItemKey('');
            setSelectedItem(terms);
          }}
        >
          전체
        </button>
        {terms.map(({ key }) => (
          <button
            className={`rounded-md bg-cyan-700  ${
              selectedItemKey === key ? 'bg-slate-700' : 'bg-cyan-700'
            }  text-white px-3 py-2 mb-5 hover:bg-yel mr-2`}
            key={key}
            onClick={() => {
              setSelectedItemKey(key);
              setSelectedItem([terms.find((term) => term.key === key)]);
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="term-info">
        <div className="">
          {!selectedItem.length ? (
            <div>일치하는 항목이 없습니다.</div>
          ) : (
            selectedItem.map((value, i) => (
              <div key={i} className="category ">
                <p className="title">{value.key}</p>
                <div className="list">
                  {value.item.map((v, i) => (
                    <dl key={i} className="item ">
                      <dd className="side-border-top"></dd>
                      <dd className="side-border-bottom"></dd>
                      <dt className="tit">{v.title}</dt>
                      <dd className="con">{v.content}</dd>
                    </dl>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
