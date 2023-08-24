import { useDispatch, useSelector } from 'react-redux';
import { DataService } from 'src/data/DataService';
import { refreshWholePub } from 'src/reducer/pubSlice';
import { setUsers } from 'src/reducer/userSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { useEffect } from 'react';
import { AdminRequireLayout } from '../AdminRequireLayout';
export default function AddGuest() {
  const pubsData = useSelector((state: RootState) => state.pub.pubs);

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
    <AdminRequireLayout>
      <div>dsadsadsaas</div>
    </AdminRequireLayout>
  );
}
