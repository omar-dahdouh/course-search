import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Input, Typography } from 'antd';

const { Title } = Typography;

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  function onSearchInputChange({ target }) {
    setSearchInput(target.value);
  }

  function onSearch() {
    history.push(`/search?query=${searchInput}`);
  }

  return (
    <>
      <Row
        className="hero-image"
        style={{
          backgroundImage: 'url("/images/distanceLearning.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Col span={12} style={{ padding: '30px 60px' }}>
          <h1 className="hero-title">Find The Best Courses Online</h1>
          <p className="hero-sub-title">
            a search engine for popular educational websites , search for course
            by title and category
          </p>
          <Link to="/search" className="hero-link">
            get started
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: '120px 10%', textAlign: 'center' }}>
          <Title>type something to get started</Title>
          <Input.Search
            value={searchInput}
            onSearch={onSearch}
            onChange={onSearchInputChange}
            size="large"
            className="search-input"
            placeholder="input search text"
            enterButton="Search"
          />
        </Col>
      </Row>
      <Row className="footer">
        <Col span={12}>
          <ul className="footer-link-list">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link">
                About
              </Link>
            </li>
          </ul>
        </Col>
        <Col span={12}>
          <ul className="footer-link-list">
            <li>
              <a className="footer-link" href="https://www.udemy.com/">
                Udemy
              </a>
            </li>
            <li>
              <a className="footer-link" href="https://www.coursera.org/">
                Coursera
              </a>
            </li>
            <li>
              <a className="footer-link" href="https://www.edx.org/">
                Edx
              </a>
            </li>
            <li>
              <a className="footer-link" href="https://alison.com/">
                Alison
              </a>
            </li>
            <li>
              <a className="footer-link" href="https://www.futurelearn.com/">
                Futurelearn
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
