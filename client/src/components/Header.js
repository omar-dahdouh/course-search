import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

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
