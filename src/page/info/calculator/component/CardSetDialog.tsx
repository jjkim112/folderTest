import dialog from "./dialog.module.css";
import basic from "../../utils/basic.json";
import CardSimple from "../../component/CardSimple";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

type CardSetDialogProps = {
  cardSetFunc: (cardValue: string) => void;
  setDialogOpen: (isOpen: boolean) => void;
  selCard: string;
};

const CardSetDialog: React.FC<CardSetDialogProps> = ({
  cardSetFunc,
  setDialogOpen,
  selCard,
}) => {
  const remainCards = useSelector(
    (state: RootState) => state.pokerCal.remainCards
  );

  const closeModal = () => {
    setDialogOpen(false);
  };

  const clickNum = (cardValue: string) => {
    cardSetFunc(cardValue);
    setDialogOpen(false);
  };

  return (
    <div>
      <div className={dialog.back} onClick={closeModal}></div>
      <div className={dialog.content}>
        <button className={dialog.close} onClick={closeModal}>
          X
        </button>
        <div className="flex flex-col justify-center">
          {basic.numList.map((num, index) => {
            return (
              <div className="flex" key={`${index}_${num}`}>
                {basic.shapeList.map((shape, i) => {
                  return (
                    <div
                      key={`${index}_${i}`}
                      onClick={() => {
                        if (remainCards.includes(`${shape}${num}`)) {
                          clickNum(`${shape}${num}`);
                        } else {
                          if (selCard === `${shape}${num}`) {
                            clickNum(`${shape}${num}`);
                          }
                        }
                      }}
                    >
                      <CardSimple
                        isPick={!remainCards.includes(`${shape}${num}`)}
                        shape={shape}
                        number={num}
                        isOriginCard={selCard === `${shape}${num}`}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardSetDialog;
