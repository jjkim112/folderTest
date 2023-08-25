import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { useEffect } from 'react';
import { DataService } from './data/DataService';
import { refreshWholePub } from './reducer/pubSlice';
import { setUsers } from './reducer/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';

function App() {
  const content = useRoutes(router);

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
  return <div>{content}</div>;
}
export default App;
