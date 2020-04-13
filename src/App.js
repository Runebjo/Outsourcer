import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, useLocation } from 'react-router-dom';

import './App.css';
import { Outlines } from './components/outlines.';
import { Templates } from './components/templates';
import { Writers } from './components/writers';

function App() {
  const { Header, Content, Footer } = Layout;
  const { pathname } = useLocation();
  let defaultKey = ['1'];

  switch (pathname) {
    case '/templates':
      defaultKey = ['2']
      break;
    case '/writers':
      defaultKey = ['3']
      break;
    default:
      defaultKey = ['1']
      break;
  }


  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={defaultKey}>
          <Menu.Item key="1">
            <Link to="/">Outlines</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/templates">Templates</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/writers">Writers</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Route path="/" exact component={Outlines} />
          <Route path="/templates" component={Templates} />
          <Route path="/writers" component={Writers} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Bear Solutions ©2020</Footer>
    </Layout>
  );
}

export default App;
