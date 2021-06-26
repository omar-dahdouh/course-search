import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Rate,
  Typography,
  Breadcrumb,
  Button,
  Alert,
  Spin,
  message,
} from 'antd';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { Comments } from '../components';

const { Title, Text, Paragraph } = Typography;

function DetailsPage({ userData, loggedIn }) {
  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const { courseId } = useParams();

  useEffect(() => {
    setFavoriteLoading(true);
    axios
      .get(`/api/v1/course/${courseId}`)
      .then(({ data }) => {
        setCourse(data.course);
      })
      .catch(({ message }) => {
        setErrorMessage(message);
      })
      .finally(() => {
        setCourseLoading(false);
      });
  }, [courseId]);

  useEffect(() => {
    if (loggedIn) {
      setFavoriteLoading(true);
      axios
        .head(`/api/v1/favorite/${courseId}`)
        .then(() => {
          setIsFavorite(true);
        })
        .catch(() => {
          setIsFavorite(false);
        })
        .finally(() => {
          setFavoriteLoading(false);
        });
    } else {
      setIsFavorite(false);
    }
  }, [courseId, loggedIn, userData]);

  const addToFavorite = (courseId) => {
    console.log('addToFavorite');
    console.log({ isFavorite, favoriteLoading });
    if (!isFavorite && !favoriteLoading) {
      setFavoriteLoading(true);
      axios
        .post(`/api/v1/favorite/${courseId}`)
        .then(() => {
          message.success('added to favorite');
          setIsFavorite(true);
          setFavoriteLoading(false);
        })
        .catch(() => {
          message.error('failed to add to favorite');
          setFavoriteLoading(false);
        });
    }
  };

  const deleteFromFavorite = (courseId) => {
    console.log('deleteFromFavorite');
    console.log({ isFavorite, favoriteLoading });
    if (isFavorite && !favoriteLoading) {
      setFavoriteLoading(true);
      axios
        .delete(`/api/v1/favorite/${courseId}`)
        .then(() => {
          message.success('removed from favorite');
          setIsFavorite(false);
          setFavoriteLoading(false);
        })
        .catch(() => {
          message.error('failed to remove from favorite');
          setFavoriteLoading(false);
        });
    }
  };

  return (
    <div className="content-padding">
      {courseLoading && (
        <Spin tip="Loading...">
          <Alert
            message="Fetching data"
            description="please wait."
            type="info"
            showIcon
          />
        </Spin>
      )}
      {errorMessage && (
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
        />
      )}
      {course && (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={18}>
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
              <br />

              <Title level={2} style={{ display: 'inline' }}>
                <a href={course.url}>{course.title}</a>
              </Title>
              {course.date && (
                <Text type="secondary" style={{ marginLeft: 16 }}>
                  {new Date(course.date).toLocaleDateString()}
                </Text>
              )}
              <br />
              <br />
              <Rate
                value={Math.round(course.rating * 2) / 2}
                disabled
                allowHalf
              />
              <Text strong> {Math.round(course.rating * 10) / 10}</Text>
              <Text strong> {`(${+course.reviews})`}</Text>
              <br />
              <br />

              <Button
                disabled={!loggedIn || favoriteLoading}
                onClick={() => {
                  if (isFavorite) {
                    deleteFromFavorite(course.id);
                  } else {
                    addToFavorite(course.id);
                  }
                }}
                type="primary"
              >
                {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                {`${isFavorite ? 'remove from' : 'add to'} favorite`}
              </Button>
              <br />
              <br />
            </Col>
            <Col xs={24} sm={24} md={6}>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: `100%` }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: 32 }}>
              <Paragraph>
                <p dangerouslySetInnerHTML={{ __html: course.description }} />
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <Comments
                courseId={courseId}
                userData={userData}
                loggedIn={loggedIn}
              />
            </Col>
            <Col span={6}>{/* <h2>related courses</h2> */}</Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default DetailsPage;
