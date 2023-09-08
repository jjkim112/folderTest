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
      <span className="py-2 text-yellow-500 font-bold">{title}</span>
      <input
        className="bg-white border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};
