import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Input } from 'antd';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');

  const history = useHistory();
  function onSearchInputChange({ target }) {
    // console.log(target.value);
    setSearchInput(target.value);
  }

  function onSearch() {
    // console.log(searchInput);
    history.push(`/search/${searchInput}`);
  }

  return (
    <Layout.Header>
      <Input.Search
        value={searchInput}
        onSearch={onSearch}
        onChange={onSearchInputChange}
        style={{ width: 400, padding: 16 }}
        placeholder="input search text"
        enterButton
      />
      {/* <div className="logo" /> */}
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}
    </Layout.Header>
  );
};

export default Header;
