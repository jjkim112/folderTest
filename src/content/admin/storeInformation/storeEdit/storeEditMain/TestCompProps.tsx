interface TestCompProps {
  title: string;
  placeholder: string;
  content: string;
  setContent: (v: string) => void;
}

export const TestComp = ({
  title,
  placeholder,
  content,
  setContent,
}: TestCompProps) => {
  return (
    <div className="p-2 flex flex-col">
      <span className="py-2">{title}</span>
      <input
        className="text-black"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};
