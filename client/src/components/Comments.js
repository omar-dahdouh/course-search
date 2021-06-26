import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Divider,
  Avatar,
  Alert,
  Spin,
  Input,
  Typography,
  Popconfirm,
  Button,
  message,
} from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

import axios from 'axios';

const { Text, Link } = Typography;

const Comments = ({ courseId, userData, loggedIn }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [posting, setPosting] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [postingError, setPostingError] = useState('');

  const postComment = () => {
    if (!posting) {
      setPosting(true);
      axios
        .post(`/api/v1/comment`, {
          content: commentContent,
          course_id: courseId,
        })
        .then(({ data }) => {
          const { id, content, created_at, user_id } = data.comment;
          const newComment = {
            id,
            content,
            created_at,
            user_id,
            user_name: userData.name,
          };
          setComments([...comments, newComment]);
          setCommentContent('');
          setPosting(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          setPostingError(message);
          setPosting(false);
        });
    }
  };
  const deleteComment = (commentId) => {
    axios
      .delete(`/api/v1/comment/${commentId}`)
      .then(() => {
        setComments(comments.filter(({ id }) => id !== commentId));
      })
      .catch(({ response }) => {
        message.error(response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/comments/${courseId}`)
      .then(({ data }) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch(({ message }) => {
        setErrorMessage(message);
        setLoading(false);
      });
  }, [courseId]);

  return (
    <>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          closable
          style={{ marginTop: 8 }}
          onClose={() => {
            setErrorMessage('');
          }}
        />
      )}
      {loading ? (
        <Spin>
          <Alert message="loading comments ..." type="info" />
        </Spin>
      ) : (
        <>
          <Divider orientation="left">{`${comments.length} comment${
            comments.length === 1 ? '' : 's'
          }`}</Divider>
          {comments.map((comment) => (
            <Row wrap={false}>
              <Col flex="54px">
                <Avatar size="large" shape="square" icon={<UserOutlined />} />
              </Col>
              <Col flex="auto">
                <Text strong>
                  <Link>{comment.user_name}</Link>
                </Text>

                <Text style={{ marginLeft: 10 }} type="secondary">
                  {new Date(comment.created_at).toDateString()}
                </Text>
                {loggedIn && userData.id === comment.user_id && (
                  <Popconfirm
                    title="Are you sure you want to delete this comment ?"
                    onConfirm={() => {
                      deleteComment(comment.id);
                    }}
                    okText="Delete"
                    okType="danger"
                  >
                    <Button danger size="small" type="link">
                      <DeleteOutlined />
                      delete
                    </Button>
                  </Popconfirm>
                )}
                <p>{comment.content}</p>
              </Col>
            </Row>
          ))}
        </>
      )}
      <Row wrap={false}>
        <Col flex="54px">
          <Avatar size="large" shape="square" icon={<UserOutlined />} />
        </Col>
        <Col flex="auto">
          <Input.TextArea
            style={{ width: '100%' }}
            placeholder="leave your comment ..."
            onChange={({ target }) => setCommentContent(target.value)}
            autoSize={{ minRows: 3, maxRows: 6 }}
            value={commentContent}
            maxLength={255}
            disabled={posting}
          />

          {postingError && (
            <Alert
              message={postingError}
              type="error"
              showIcon
              closable
              style={{ marginTop: 8 }}
              onClose={() => {
                setPostingError('');
              }}
            />
          )}
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            loading={posting}
            onClick={postComment}
          >
            post
          </Button>
          {loggedIn && (
            <>
              <Text
                type="secondary"
                style={{ float: 'right' }}
              >{`signed in as ${userData.email}`}</Text>
              <br />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Comments;
