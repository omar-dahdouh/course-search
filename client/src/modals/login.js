import React, { useState } from 'react';
import { Modal, Form, Input, Button, Alert, Checkbox } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';

function Login({ visible = false, hideModal, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formSubmit = (values) => {
    if (!loading) {
      setLoading(true);
      axios
        .post(`/api/v1/login`, values)
        .then(({ data }) => {
          onSuccess(data);
          setErrorMessage('');
          hideModal();
          setLoading(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          setErrorMessage(message);
          setLoading(false);
        });
    }
  };

  return (
    <Modal title="Login" visible={visible} onCancel={hideModal} footer={null}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={formSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            size="large"
            placeholder="email"
            prefix={<MailOutlined style={{ opacity: 0.4 }} />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="password"
            prefix={<LockOutlined style={{ opacity: 0.4 }} />}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => {
              setErrorMessage('');
            }}
          />
        )}
      </Form>
    </Modal>
  );
}

export default Login;
