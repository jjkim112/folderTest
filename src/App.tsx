import { useRoutes } from 'react-router-dom';
import router from 'src/router';

function App() {
  const content = useRoutes(router);

  return <div>{content}</div>;
}
export default App;
