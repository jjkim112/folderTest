export default function HoldemPubCardRule() {
  return (
    <div className="p-2">
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'1. 프리플랍(Pre-Flop)'}</h1>
          <img src="/assets/images/table_card/card1.png" alt="table1" />

          <div className="content">
            <p>프리플랍</p>
            <p className="second">
              플레이어 마다 2장씩 받은 상태 입니다. 베팅 후 플랍으로 가게
              됩니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'2. 플랍(Flop)'}</h1>
          <img src="/assets/images/table_card/card2.png" alt="table1" />

          <div className="content">
            <p>플랍</p>
            <p className="second">
              플랍에는 커뮤니티 카드 3장이 깔려있습니다. 베팅 후 턴으로
              넘어갑니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'3. 턴(Turn)'}</h1>
          <img src="/assets/images/table_card/card3.png" alt="table1" />

          <div className="content">
            <p>턴</p>
            <p className="second">
              플랍 다음으로 공개되는 커뮤니티 카드. 현재 4장의 커뮤니티 카드를
              볼 수 있습니다. 베팅후 리버로 가게 됩니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'4. 리버 (River)'}</h1>
          <img src="/assets/images/table_card/card4.png" alt="table1" />

          <div className="content">
            <p>리버</p>
            <p className="second">
              마지막에 공개되는 커뮤니티 카드. 마지막 베팅 후 카드로 싸우게
              됩니다. 돌아올 수 없는 강 입니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'5. 승리 방식'}</h1>
          <img src="/assets/images/table_card/card5.png" alt="table1" />

          <div className="content">
            <p>승리조건</p>
            <p className="second">
              내 손 패의 2장과 커뮤니티 5장의 카드를 조합하여 최종 5장의 조합 중
              가장 높은 족보를 가진 플레이어가 승리합니다.
            </p>
          </div>

          <div className="content">
            <p>위에 그림(승리 조건)</p>
            <p className="second">
              4명의 플레이어중 Qs,10d 의 조합이 가장 높은 스레이트 이므로
              승리했습니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'6. 비교방식(2등인 경우)'}</h1>
          <img src="/assets/images/table_card/card6.png" alt="table1" />

          <div className="content">
            <p>2등인 경우 비교 </p>
            <p className="second">
              2등의 경우 커뮤니티 카드의 Kh,Jd를 빼게 되면 가장 낮은
              스트레이트가 되어 2등 됩니다.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'7. 찹(비기는)경우'}</h1>
          <img src="/assets/images/table_card/card7.png" alt="table1" />

          <div className="content">
            <p>보드 찹</p>
            <p className="second">
              비기는 경우를 말한다. 위 그림은 보드 스트레이트여서 보드보다 높은
              족보가 없으므로 보드가 가장 큰 족보가 되어 찹된 상태이다.
            </p>
          </div>
          <div className="content">
            <p>위 그림 결과</p>
            <p className="second">3명에서 팟을 나눠 가지게 됩니다.</p>
          </div>

          <img src="/assets/images/table_card/card8.png" alt="table1" />

          <div className="content">
            <p>핸드 찹</p>
            <p className="second">
              위 그림의 경우 핸드가 같아서 같은 족보가 되어 비기는 경우를
              보여준다.
            </p>
          </div>

          <div className="content">
            <p>위 그림 결과</p>
            <p className="second">2명에서 팟을 나눠 가지게 됩니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
