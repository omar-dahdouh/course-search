import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Footer() {
  return (
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
      Copyright © 2021 Course Search. All Rights Reserved
    </Row>
  );
}

export default Footer;
