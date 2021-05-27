import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input } from 'antd';

const Header = () => {
  return (
    <Layout.Header>
      <Link to="/" className="logo">
        Course Search
      </Link>
    </Layout.Header>
  );
};

export default Header;
