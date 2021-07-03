import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import { Table, Button, Checkbox, Alert, message } from 'antd';
import { LoadingOutlined, DeleteFilled, LockFilled } from '@ant-design/icons';

function userReducer(state, action) {
  switch (action.type) {
    case 'edit':
      return state.map((user) => {
        return user.id === action.id
          ? { ...user, [action.key]: action.value }
          : user;
      });
    case 'delete':
      return state.filter((user) => user.id !== action.id);
    case 'replace':
      return action.data;
    default:
      throw new Error();
  }
}

function adminReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.number];
    case 'delete':
      return state.filter((num) => num !== action.number);
    default:
      throw new Error();
  }
}

function UsersTable({ userData, loggedIn }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [adminLoading, dispatchAdmin] = useReducer(adminReducer, []);
  const [users, dispatchusers] = useReducer(userReducer, []);

  function setAdminRole(userId, status) {
    if (!adminLoading.includes(userId)) {
      dispatchAdmin({
        type: 'add',
        number: userId,
      });

      axios
        .put('/api/v1/setAdminRole', { userId, status })
        .then(() => {
          dispatchusers({
            type: 'edit',
            id: userId,
            key: 'is_admin',
            value: status,
          });

          message.success('role changed succefully');
        })
        .catch((error) => {
          message.error(error.response.data.message);
        })
        .finally(() => {
          dispatchAdmin({
            type: 'delete',
            number: userId,
          });
        });
    }
  }

  function deleteUser(userId) {
    if (!adminLoading.includes(userId)) {
      dispatchAdmin({
        type: 'add',
        number: userId,
      });

      axios
        .delete(`/api/v1/removeUser/${userId}`)
        .then(() => {
          dispatchusers({
            type: 'delete',
            id: userId,
          });

          message.success('user deleted succefully');
        })
        .catch((error) => {
          message.error(error.response.data.message);
        })
        .finally(() => {
          dispatchAdmin({
            type: 'delete',
            number: userId,
          });
        });
    }
  }

  useEffect(() => {
    if (loggedIn && userData.is_admin) {
      setLoading(true);
      axios
        .get('/api/v1/getUsers')
        .then(({ data }) => {
          dispatchusers({
            type: 'replace',
            data: data.users,
          });
        })
        .catch(({ message }) => {
          setErrorMessage(message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loggedIn, userData]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Admin',
      dataIndex: 'is_admin',
      width: '128px',
      render: (isAdmin, row) => (
        <Checkbox
          checked={isAdmin}
          disabled={adminLoading.includes(row.id)}
          onChange={() => {
            setAdminRole(row.id, !row.is_admin);
          }}
        >
          Admin
          {adminLoading.includes(row.id) && (
            <LoadingOutlined style={{ display: 'inline-block' }} spin />
          )}
        </Checkbox>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, row) => (
        <>
          <Button
            type="link"
            danger
            onClick={() => {
              deleteUser(id);
            }}
          >
            <DeleteFilled /> delete
          </Button>
          <Button type="link">
            <LockFilled /> reset password
          </Button>
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

      {errorMessage && <Alert message={errorMessage} type="error" />}
      {loggedIn && userData.is_admin && (
        <Table
          bordered
          dataSource={users}
          columns={columns}
          pagination={{ hideOnSinglePage: true }}
          loading={loading}
        />
      )}
    </>
  );
}

export default UsersTable;
