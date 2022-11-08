/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getAllCategories } from '../api/categoryData';
import { getAllTags } from '../api/tagsData';
import { getPostTagsByPostId } from '../api/postTagsData';
import { createPost, updatePost } from '../api/postData';
import { createPostTags, deletePostTagsByPostId } from '../api/mergedData';

const initialState = {
  user_id: null,
  category_id: null,
  title: '',
  image_url: '',
  content: '',
  publication_date: new Date().toLocaleDateString(),
  approved: true,
};

function PostForm({ obj }) {
  const [input, setInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const getTheContent = () => {
    if (obj.id) {
      setInput(obj);
      getPostTagsByPostId(obj.id).then(setPostTags);
    }
    getAllCategories().then((catData) => setCategories(catData));
    getAllTags().then((tagData) => setTags(tagData));
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
        const returnArr = prevCopy.splice(index, 1);
        return returnArr;
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePost(input).then(() => {
        deletePostTagsByPostId(obj.id).then(() => {
          const tagsArr = postTags.map((tag) => ({ ...tag, post_id: obj.id }));
          createPostTags(tagsArr).then(() => {
          });
        });
      });
    } else {
      const newPost = { ...input, user_id: Number(token) };
      createPost(newPost).then((postObj) => {
        deletePostTagsByPostId(postObj.id).then(() => {
          const tagsArr = postTags.map((tag) => ({ ...tag, post_id: postObj.id }));
          createPostTags(tagsArr).then(() => {
          });
        });
      });
    }
    router.push('/posts/myPosts');
  };

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
    getTheContent();
  }, [obj, router]);

  return (
    <>
      <h3>New Post</h3>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={handleChange} placeholder="Title goes here" name="title" value={input.title} required />

          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" onChange={handleChange} placeholder="Enter your Image URL" name="image_url" value={input.image_url} required />

          <Form.Label>Article</Form.Label>
          <Form.Control as="textarea" onChange={handleChange} placeholder="Main content goes here" rows={3} name="content" value={input.content} required />

          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name="category_id" onChange={handleChange} required>
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
                id="tagCheck"
                label={tag.label}
                name="tag"
                value={tag.id}
                onChange={handleTagChange}
                checked={postTags?.find((postTag) => postTag.tag_id === tag.id) !== undefined}
              />
            </div>
          ))}
        </Form.Group>
        <Button className="submit-btn" type="submit" onClick={handleSubmit} variant="success">{obj.id ? 'Update' : 'Submit'}</Button>
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
  obj: initialState,
};

export default PostForm;
