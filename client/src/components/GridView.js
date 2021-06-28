import React from 'react';
import { Row, Col, Rate, Empty } from 'antd';

const Header = ({ courses, onClick }) => {
  return (
    <>
      {courses.length === 0 && <Empty />}
      <Row gutter={16} className="grid-view">
        {courses.map((course) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4} key={course.id}>
            <div className="grid-view-card">
              <div
                className="grid-card-image"
                onClick={() => onClick(course.id)}
                style={{
                  backgroundImage: `url("${course.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="grid-card-rating">
                  <Rate
                    value={Math.round(course.rating * 2) / 2}
                    disabled
                    allowHalf
                  />
                </div>
              </div>

              <p className="grid-card-title">
                <img
                  className="source-icon"
                  src={`/icons/${course.source}.png`}
                  alt={course.source}
                />
                {course.title}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Header;
