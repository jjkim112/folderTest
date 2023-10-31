import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // 검색 기능을 구현하는 로직을 작성합니다.
    console.log("검색어:", searchTerm);
    // 검색 결과를 처리하거나 검색 기능을 실행하는 코드를 작성하세요.
  };

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-[10px] px-4 py-2 ml-1 focus:outline-none"
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
