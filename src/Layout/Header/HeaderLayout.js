import { Layout, Menu } from 'antd';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../User/UserContext';

const { Header } = Layout;

const HeaderLayout = () => {
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return(

      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/movies">Movies</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/games">Games</Link></Menu.Item>
            {
              user === null && (
                <Menu.Item key="4"><Link to="/login">Login</Link></Menu.Item>
              )
            }
            {
              user && (
                <Menu.Item key="5">
                  <span onClick={handleLogout}>Logout</span>
                </Menu.Item>
              )
            }
          </Menu>
        </Header>
      </Layout>

    );
}
export default HeaderLayout