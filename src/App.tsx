import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { useEffect } from 'react';

function App() {
  const content = useRoutes(router);
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `http://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
  //   script.async = true;

  //   document.head.appendChild(script);
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);
  return <div>{content}</div>;
}
export default App;
