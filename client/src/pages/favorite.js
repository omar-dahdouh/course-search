import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Rate,
  Typography,
  Breadcrumb,
  Button,
  Alert,
  Spin,
  Empty,
  message,
} from 'antd';

import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

const { Title } = Typography;

function FavoritePage({ userData, loggedIn }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      setErrorMessage('');
      axios
        .get(`/api/v1/favorite`)
        .then(({ data }) => {
          console.log(data.courses);
          setCourses(data.courses);
        })
        .catch(({ message }) => {
          setErrorMessage(message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCourses([]);
      setErrorMessage('');
      setLoading(false);
    }
  }, [loggedIn, userData]);

  const deleteFavorite = (courseId) => {
    axios
      .delete(`/api/v1/favorite/${courseId}`)
      .then(() => {
        message.success('removed from favorite!');
        setCourses(courses.filter(({ id }) => id !== courseId));
      })
      .catch(() => {
        message.error('failed to remove from favorite!');
      });
  };

  return (
    <div style={{ padding: 32 }}>
      {!loggedIn && <Alert message="you are not logged in!" type="warning" />}
      {errorMessage && <Alert message={errorMessage} type="error" />}
      {loading && (
        <Spin tip="Loading...">
          <Alert
            message="Fetching data"
            description="please wait."
            type="info"
            showIcon
          />
        </Spin>
      )}
      {loggedIn && !loading && courses.length === 0 && <Empty />}
      {loggedIn &&
        courses.map((course) => (
          <Row gutter={16} className="">
            <Col span={6}>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={18}>
              <img
                className="source-icon"
                src={`/icons/${course.source}.png`}
                alt={course.source}
              />
              <Breadcrumb style={{ display: 'inline' }}>
                {course.category.map(({ id, name }) => {
                  return (
                    <Breadcrumb.Item>
                      <Link to={`/search/?category=${id}`}>{name}</Link>
                    </Breadcrumb.Item>
                  );
                })}
                <Breadcrumb.Item>{course.id}</Breadcrumb.Item>
              </Breadcrumb>

              <Title level={3}>
                <a href={course.url}>{course.title}</a>
              </Title>

              <Rate
                value={Math.round(course.rating * 2) / 2}
                style={{ padding: 0 }}
                disabled
                allowHalf
              />
              <br />
              <Button
                type="primary"
                size="small"
                style={{ margin: '8px 8px 0 0 ' }}
                onClick={() => {
                  history.push(`/details/${course.id}`);
                }}
              >
                details
              </Button>
              <Button
                type="danger"
                size="small"
                style={{ margin: '8px 8px 0 0 ' }}
                onClick={() => {
                  deleteFavorite(course.id);
                }}
              >
                remove
              </Button>
            </Col>
          </Row>
        ))}
    </div>
  );
}

export default FavoritePage;
