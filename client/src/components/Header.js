import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Button,
  Layout,
  Menu,
  Avatar,
  Dropdown,
  message,
  notification,
} from 'antd';

import {
  LockOutlined,
  UserOutlined,
  PoweroffOutlined,
  ControlOutlined,
  SmileOutlined,
  HeartFilled,
  HeartOutlined,
  ProfileFilled,
  CloseCircleFilled,
  FundFilled,
} from '@ant-design/icons';

import axios from 'axios';

import { Login, Register } from '../modals';

const Header = ({ userData, loggedIn, setUserData, setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios
      .get('/api/v1/verifyUser')
      .then(({ data }) => {
        setUserData(data.user);
        setLoggedIn(true);
      })
      .catch(() => {
        setUserData({});
        setLoggedIn(false);
      });
  }, [setLoggedIn, setUserData]);

  const userMenu = (
    <Menu>
      {loggedIn && userData.is_admin && (
        <Menu.Item
          key="1"
          icon={<FundFilled />}
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          Dashboard
        </Menu.Item>
      )}
      <Menu.Item
        key="2"
        icon={<HeartFilled />}
        onClick={() => {
          history.push('/favorite');
        }}
      >
        Favorite
      </Menu.Item>
      <Menu.Item key="3" icon={<CloseCircleFilled />} onClick={logOut}>
        Logout
      </Menu.Item>
    </Menu>
  );

  function showLoginModal() {
    setShowLogin(true);
  }
  function hideLoginModal() {
    setShowLogin(false);
  }
  function onLoginSuccess(data) {
    setLoggedIn(true);
    setUserData(data.user);
  }

  function showRegisterModal() {
    setShowRegister(true);
  }
  function hideRegisterModal() {
    setShowRegister(false);
  }
  function onRegisterSuccess(data) {
    if (data.id === 1) {
      notification.open({
        message: 'Registeration',
        description: 'first user to register becomes an admin',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    }
    message.info('successfully registered, you can login now!');
  }

  function logOut() {
    if (!loggingOut) {
      setLoggingOut(true);
      const key = 'logoutMessage';
      message.loading({ content: 'logging out...', key });
      axios
        .post(`/api/v1/logout`)
        .then(() => {
          setLoggedIn(false);
          setUserData({});
          message.success({ content: 'logged out!', key, duration: 1 });
          setLoggingOut(false);
        })
        .catch(() => {
          message.error({ content: 'logout failed', key, duration: 2 });
          setLoggingOut(false);
        });
    }
  }

  return (
    <Layout.Header id="header">
      <Link to="/" className="logo">
        Course Search
      </Link>

      <Login
        visible={showLogin}
        hideModal={hideLoginModal}
        onSuccess={onLoginSuccess}
      />
      <Register
        visible={showRegister}
        hideModal={hideRegisterModal}
        onSuccess={onRegisterSuccess}
      />

      <div style={{ float: 'right' }}>
        {loggedIn ? (
          <Dropdown overlay={userMenu}>
            <Button size="large" type="link">
              <Avatar
                shape="square"
                size="small"
                icon={<UserOutlined />}
                style={{ marginRight: 8 }}
              />
              {userData.name}
            </Button>
          </Dropdown>
        ) : (
          <>
            <Button type="link" size="large" onClick={showLoginModal}>
              <LockOutlined /> login
            </Button>
            <Button type="link" size="large" onClick={showRegisterModal}>
              <UserOutlined /> register
            </Button>
          </>
        )}
      </div>
    </Layout.Header>
  );
};

export default Header;
