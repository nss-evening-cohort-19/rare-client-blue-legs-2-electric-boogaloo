/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { getAllCategories } from '../api/categoryData';
import { getAllTags } from '../api/tagsData';
import { getPostTagsByPostId } from '../api/postTags';
import { createPost } from '../api/postData';
import { createPostTags, deletePostTagsByPostId } from '../api/mergedData';

const initialPostState = {
  user_id: '',
  category_id: null,
  title: '',
  image_url: '',
  content: '',
  publication_date: new Date().toLocaleDateString(),
  approved: '',
};

function PostForm({ obj }) {
  const [input, setInput] = useState(initialPostState);
  const [categories, setCategories] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState(null);

  const getTheContent = () => {
    if (obj.id) {
      setInput(obj);
      getPostTagsByPostId(obj.id).then(setPostTags);
    } else {
      getAllCategories().then((catData) => setCategories(catData));
      getAllTags().then((tagData) => setTags(tagData));
    }
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setPostTags((prevState) => ([
        ...prevState,
        { tag_id: Number(value), post_id: null },
      ]));
    } else {
      setPostTags((prevState) => {
        const prevCopy = prevState;
        const index = prevCopy.findIndex((postTag) => postTag.tag_id === Number(value));
        prevCopy.splice(index, 1);
        return prevCopy;
      });
    }
  };

  const handleChange = (e) => {
    // eslint-disable-next-line prefer-const
    let { name, value } = e.target;
    if (name === 'category_id') {
      value = Number(value);
    }
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(postTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...input, user_id: Number(token) };
    createPost(newPost).then((postObj) => {
      deletePostTagsByPostId(postObj.id).then(() => {
        const tagsArr = postTags.map((tag) => ({ ...tag, post_id: postObj.id }));
        createPostTags(tagsArr).then(() => {
        });
      });
    });
  };

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
    getTheContent();
  }, [obj]);

  return (
    <>
      <h3>New Post</h3>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={handleChange} placeholder="Title goes here" name="title" value={input.title} />

          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" onChange={handleChange} placeholder="Enter your Image URL" name="image_url" value={input.image_url} />

          <Form.Label>Article</Form.Label>
          <Form.Control as="textarea" onChange={handleChange} placeholder="Main content goes here" rows={3} name="content" value={input.content} />

          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name="category_id" onChange={handleChange}>
            <option value="">Select a Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} selected={cat.id === input.category_id} value={cat.id}>{cat.label}</option>
            ))}
          </Form.Select>
          <Form.Label>Tags</Form.Label>
          {tags?.map((tag) => (
            <div key={tag.id} className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label={tag.label}
                name="tag"
                value={tag.id}
                onChange={handleTagChange}
                checked={postTags.find((postTag) => postTag.tag_id === tag.id) !== undefined}
              />
            </div>
          ))}
        </Form.Group>
        <Button className="submit-btn" type="submit" onClick={handleSubmit} variant="success">Submit</Button>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.string,
    category_id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.string,
    approved: PropTypes.bool,
  }),
};

PostForm.defaultProps = {
  obj: initialPostState,
};

export default PostForm;
