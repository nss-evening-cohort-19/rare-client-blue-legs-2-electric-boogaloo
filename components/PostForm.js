/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { getAllCategories } from '../api/categoryData';
import { getAllTags } from '../api/tagsData';
import { getPostTagsByPostId } from '../api/postTags';

const initialState = {
  id: null,
  user_id: '',
  category_id: null,
  title: '',
  image_url: '',
  content: '',
  publication_date: '',
};

function PostForm({ obj }) {
  const [input, setInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [tags, setTags] = useState([]);

  const getTheContent = () => {
    if (obj.id) {
      setInput(obj);
      getPostTagsByPostId(obj.id).then(setPostTags);
    } else {
      getAllCategories().then((catData) => setCategories(catData));
      getAllTags().then((tagData) => setTags(tagData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(input);
  };

  useEffect(() => {
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
          <Form.Select aria-label="Default select example" name="category" onChange={handleChange}>
            <option value=" ">Select a Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} selected={cat.id === input.category_id} value={cat.label}>{cat.label}</option>
            ))}
          </Form.Select>
          <Form.Label>Tags</Form.Label>
          {tags?.map((tag) => (
            <div name="tag" key={`${tag.id}FormCheck`} className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label={tag.label}
                value={tag.id}
                onChange={handleChange}
                checked={postTags.find((pag) => pag.id === tag.id) !== undefined}
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
  obj: initialState,
};

export default PostForm;
