import { useEffect, useState } from 'react';

import { inputPw, useAdmin } from 'src/reducer/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { useNavigate } from 'react-router-dom';
import { DataService } from 'src/data/DataService';
import { refreshWholePub } from 'src/reducer/pubSlice';
import { setUsers } from 'src/reducer/userSlice';

export default function AdminPage() {
  const [text, setText] = useState('');
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const _initFunc = async () => {
    const wholeData = await DataService.fetchWholePub();
    dispatch(refreshWholePub(wholeData));

    // 유저 업데이트. (일단 막 넣기)
    const wholeUser = await DataService.fetchWholeUser();
    dispatch(setUsers(wholeUser));
  };
  useEffect(() => {
    _initFunc();
  }, []);
  return (
    <div className="flex-col justify-center items-center">
      <div className="text-center">패스워드를 입력하세요.</div>
      <div className="text-center">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(inputPw(text));

          navigate('/admin/storeInfo');
        }}
      >
        비번 입력
      </button>
    </div>
  );
}
