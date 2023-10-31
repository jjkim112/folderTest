import { useRoutes } from "react-router-dom";
import router from "src/router";
import { useEffect } from "react";
import { DataService } from "./data/dataService";
import { refreshWholePub } from "./redux/slice/pubSlice";
import { setUsers } from "./redux/slice/useSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";

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
