import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, DesktopOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import React from 'react';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render(){
    const { collapsed } = this.state;
    return(
          <Sider className="site-layout-background" width={200} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu
              mode="inline"
              // theme="dark"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub2','sub3']}
              style={{ height: '100%' }}>

              {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User"> */}
                
                {/* <Menu.Item key="1">
                  <span>Change Password</span>
                  <Link to="/movie-list-edit" />
                </Menu.Item>
                 */}
              {/* </SubMenu> */}
              
              <SubMenu key="sub2" icon={<DesktopOutlined />} title="Movie Edior">
                
                <Menu.Item key="2">
                  <span>Movie List</span>
                  <Link to="/movie-list-edit" />
                </Menu.Item>
                
                <Menu.Item key="3">
                  <span>Add Movie</span>
                  <Link to="/movie-list-add" />      
                </Menu.Item>

              </SubMenu>

              <SubMenu key="sub3" icon={<LaptopOutlined />} title="Game Editor">
                <Menu.Item key="4">
                  <span>Game List</span>
                  <Link to="/game-list-edit" />
                </Menu.Item>
                <Menu.Item key="5">
                  <span>Add Game</span>
                  <Link to="/game-list-add" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>)
}
}
export default Sidebar