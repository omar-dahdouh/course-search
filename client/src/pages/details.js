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
} from 'antd';
const { Title, Text, Paragraph } = Typography;

function DetailsPage() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/course/${id}`)
      .then(({ data }) => {
        setCourse(data.course);
        setIsLoading(false);
      })
      .catch(({ message }) => {
        setErrorMessage(message);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="page-content">
      {isLoading && (
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
              {course.categories.map((cat) => {
                return (
                  <Breadcrumb>
                    {cat.map(({ id, name }) => {
                      return (
                        <Breadcrumb.Item>
                          <Link to={`/category/${id}`}>{name}</Link>
                        </Breadcrumb.Item>
                      );
                    })}
                    <Breadcrumb.Item>
                      <Link to={`/course/${id}`}>{course.id}</Link>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                );
              })}
              <Title level={2} style={{ display: 'inline' }}>
                <a href={course.url}>{course.title}</a>
              </Title>
              {course.date && (
                <Text type="secondary" style={{ marginLeft: 16 }}>
                  {new Date(course.date).toLocaleDateString()}
                </Text>
              )}
              <br />
              {/* <img
                className="source-icon"
                src={`/icons/${course.source}.png`}
                alt={course.source}
              />
              <Text strong>{course.source}</Text>
              {course.date && (
                <Text type="secondary" style={{ marginLeft: 16 }}>
                  {new Date(course.date).toDateString()}
                </Text>
              )} */}

              <br />
              <Rate
                value={Math.round(course.rating * 2) / 2}
                disabled
                allowHalf
              />
              <Text strong> {Math.round(course.rating * 10) / 10}</Text>
              <Text strong> {`(${+course.reviews})`}</Text>
              {console.log({ categories: course.categories })}
              <br />

              <br />
              {/* <Text type="primary">publication date</Text> */}

              <Button type="primary">add to favorite</Button>
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
        </>
      )}
    </div>
  );
}

export default DetailsPage;
