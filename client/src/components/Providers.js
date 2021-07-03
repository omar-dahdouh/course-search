import React, { useReducer } from 'react';
import axios from 'axios';

import { providerReducer } from '../assets/reducers';

import { Table, Button, Alert, message, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

function Providers({ userData, loggedIn }) {
  const [providerLoading, dispatchProvider] = useReducer(providerReducer, []);

  function updateData(key) {
    if (!providerLoading.includes(key)) {
      dispatchProvider({ type: 'add', key });

      axios
        .put(`/api/v1/update/${key}`)
        .then(() => {
          message.success(`${key} updated succefully`);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        })
        .finally(() => {
          dispatchProvider({ type: 'delete', key });
        });
    }
  }

  const columns = [
    {
      title: 'Provider',
      dataIndex: 'key',
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: (key) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              updateData(key);
            }}
            disabled={providerLoading.includes(key)}
          >
            <ReloadOutlined /> update
          </Button>
          {providerLoading.includes(key) && <Spin style={{ marginLeft: 16 }} />}
        </>
      ),
    },
  ];

  return (
    <>
      {!loggedIn && <Alert message="you are not logged in!" type="warning" />}
      {loggedIn && !userData.is_admin && (
        <Alert
          message="you don't have permission to view this page!"
          type="warning"
        />
      )}

      {loggedIn && userData.is_admin && (
        <Table
          bordered
          dataSource={[
            { key: 'udemy' },
            { key: 'coursera' },
            { key: 'edx' },
            { key: 'futurelearn' },
            { key: 'alison' },
          ]}
          columns={columns}
          pagination={false}
        />
      )}
    </>
  );
}

export default Providers;
