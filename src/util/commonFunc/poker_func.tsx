import basic from "../../assets/json/pokerFunc/basic.json";
import { TexasHoldem } from "poker-odds-calc";

const isCard = (value: any) => {
  // c2, dt, ha, s9 : true,  s1, tt, eq : false
  if (
    value.length === 2 &&
    basic.shapeList.includes(value[0]) &&
    basic.numList.includes(value[1])
  ) {
    return true;
  }
  return false;
};

const transToFormValue = (listCards: any) => {
  const numTemp = "23456789tjqka";
  const numForm = "23456789TJQKA";
  var result = [];
  for (let index = 0; index < listCards.length; index++) {
    const value = listCards[index];
    if (isCard(value)) {
      const shape = value[0];
      const num = value[1];

      result.push(`${numForm[numTemp.indexOf(num)]}${shape}`);
    }
  }

  return result;
};
const transToOriginStr = (handStr: any) => {
  const numOrigin = "23456789tjqka";
  const numForm = "23456789TJQKA";
  var result = "";
  for (let index = 0; index < handStr.length; index += 2) {
    const num = handStr[index];
    const shape = handStr[index + 1];

    result += `${shape}${numOrigin[numForm.indexOf(num)]}`;
  }

  return result;
};

const getResult = (hands: any, communityCards: any) => {
  const Table = new TexasHoldem();
  hands.forEach((v: any) => {
    const playerHand: any = transToFormValue(v);
    if (playerHand.length === 2) {
      Table.addPlayer(playerHand);
    }
  });

  const formCommunitCards = transToFormValue(communityCards);
  if (formCommunitCards.length !== 0) {
    Table.setBoard(formCommunitCards);
  }

  const Result = Table.limit(100000).calculate();

  var winList: any = [];

  Result.getPlayers().forEach((player: any) => {
    winList.push({
      hands: transToOriginStr(player.getHand()),
      wins: player.getWinsPercentage(),
      ties: player.getTiesPercentage(),
      ranks: player.data.ranks,
      total: Number(player.table.result.iterations),
    });
  });

  return winList;
};

export { getResult };
