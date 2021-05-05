import './App.css';
import 'antd/dist/antd.css';
import Routes from './Layout/User/Routes';
import { UserProvider } from './Layout/User/UserContext';

function App() {
  return (
    <>
    <UserProvider>
      <Routes />
    </UserProvider>
    </>
  );
}

export default App;
