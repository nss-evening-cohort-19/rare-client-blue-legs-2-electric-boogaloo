import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createComment, updateComment } from '../api/commentsData';

const initialState = {
  content: '',
};

// eslint-disable-next-line react/prop-types
function CommentForm({ postId, commentObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [comment, setComment] = useState();
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const theToken = localStorage.getItem('auth_token');
    setToken(parseInt(theToken, 10));
    if (commentObj.id) {
      setComment(commentObj);
      setFormInput(commentObj);
    } else {
      setComment({});
      setFormInput(initialState);
    }
  }, [token, commentObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.id) {
      updateComment(formInput)
        .then(() => {
          setComment({});
          setFormInput(initialState);
          router.push(`/posts/${postId}`);
        });
    } else {
      const payload = {
        ...formInput, post_id: postId, author_id: token,
      };
      createComment(payload).then(() => {
        setFormInput(initialState);
        router.push(`/posts/${postId}`);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="floatingInput3" label="Add a comment.." className="mb-3">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            name="content"
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit">{comment?.id ? 'Update' : ''} Comment</Button>
      </Form>
    </>

  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    postId: PropTypes.number,
  }),
};

CommentForm.defaultProps = {
  commentObj: initialState,
};

export default CommentForm;
