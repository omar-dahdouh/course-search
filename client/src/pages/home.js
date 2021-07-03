import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { Row, Col, Input, Typography } from 'antd';
import { GridView } from '../components';

const { Title, Paragraph } = Typography;

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .post(`/api/v1/search`, {
        limit: 12,
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
              course by title and category, ype something to get started
            </Paragraph>

            <Input.Search
              size="large"
              value={searchInput}
              onSearch={onSearch}
              onChange={onSearchInputChange}
              placeholder="input search text"
              enterButton
            />
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
            <Title>popular courses</Title>
            <GridView
              style={{ width: '100%' }}
              courses={courses}
              onClick={onClick}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
