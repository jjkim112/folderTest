interface PhotoEditDialogProps {
  onCancel: () => void;
}

export const PhotoEditDialog = ({ onCancel }: PhotoEditDialogProps) => {
  const handleParentClick = (event) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      console.log("parent clicked");
      onCancel();
    }
  };

  return (
    <div
      className="absolute left-0 top-0 w-full h-full"
      onClick={handleParentClick}
    >
      <div
        className="absolute top-[250px] left-[16.6%] w-2/3 h-[800px] bg-slate-300 border-2 border-black rounded-2xl"
        onClick={() => {}}
      >
        ㅁㄴㅇ랴ㅓㅁ냉랴ㅓㅐㅁ냥ㄻㄴㄹ애ㅑ
      </div>
    </div>
  );
};
