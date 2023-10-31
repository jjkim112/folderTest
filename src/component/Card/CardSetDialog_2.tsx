import styles from "../../styles/component/Card/CardSetDialog.module.css";
import basic from "../../assets/json/pokerFunc/basic.json";
interface Props {
  setCardFunc: (value: string) => void;
  setModalOpen: (value: boolean) => void;
  origin: string;
}
const CardSetDialog: React.FC<Props> = ({
  setCardFunc,
  setModalOpen,
  origin,
}: Props) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };
  const clickNum = (value: string) => {
    if (setCardFunc != null) {
      setCardFunc(value);
    }
    setModalOpen(false);
  };
  return (
    <div>
      <div className={styles.back} onClick={closeModal}></div>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        {basic.numList.map((v: string, i: number) => {
          if (v === origin) {
            return (
              <div className={styles.originItem} key={i}>
                {v}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={styles.numItem}
              onClick={() => {
                clickNum(v);
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardSetDialog;
