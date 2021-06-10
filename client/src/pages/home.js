import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Input, Typography, Button } from 'antd';
import { GridView } from '../components';

const { Title, Paragraph } = Typography;

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .post(`/api/v1/search`, {
        query: '',
        limit: 6,
      })
      .then(({ data }) => {
        setCourses(data.results);
      })
      .catch(() => {});
  }, []);

  const history = useHistory();

  function onSearchInputChange({ target }) {
    setSearchInput(target.value);
  }

  function onSearch() {
    history.push(`/search?query=${searchInput}`);
  }

  function getStarted() {
    history.push(`/search`);
  }

  function onClick(id) {
    history.push(`/details/${id}`);
  }

  return (
    <>
      <Row>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <div className="hero-text">
            <Title>Find The Best Courses Online</Title>
            <Paragraph>
              a search engine for popular educational websites , search for
              course by title and category
            </Paragraph>

            <Button type="primary" size="large" onClick={getStarted}>
              get started
            </Button>
          </div>
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
          <img
            className="hero-image"
            src="/images/online-courses.jpg"
            alt="online courses"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="content-padding content-center">
            <br />
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
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="content-padding content-center">
            <GridView
              style={{ width: '100%' }}
              courses={courses}
              onClick={onClick}
            />
          </div>
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
