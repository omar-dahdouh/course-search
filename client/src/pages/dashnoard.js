import React, { useState } from 'react';

import { Menu } from 'antd';
import { UserOutlined, DatabaseOutlined } from '@ant-design/icons';

import { UsersTable, Providers } from '../components';

function Dashboard({ userData, loggedIn }) {
  const [menuTab, setMenuTab] = useState(['data']);

  return (
    <>
      {loggedIn && userData.is_admin && (
        <Menu
          onClick={({ key }) => {
            setMenuTab([key]);
          }}
          selectedKeys={menuTab}
          mode="horizontal"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Menu.Item key="data" icon={<DatabaseOutlined />}>
            data update
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            users list
          </Menu.Item>
        </Menu>
      )}

      <div style={{ padding: 32 }}>
        {menuTab[0] === 'users' ? (
          <UsersTable loggedIn={loggedIn} userData={userData} />
        ) : (
          <Providers loggedIn={loggedIn} userData={userData} />
        )}
      </div>
    </>
  );
}

export default Dashboard;
