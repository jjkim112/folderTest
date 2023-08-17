import { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";
import { inputPw, useAdmin } from "src/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "src/store/store";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex-col justify-center items-center">
      <div className="text-center">패스워드를 입력하세요.</div>
      <div className="text-center">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            //   console.log(CryptoJS.SHA256(e.target.value).toString());
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(inputPw(text));
          setText("");
        }}
      >
        비번 입력
      </button>
    </div>
  );
}
