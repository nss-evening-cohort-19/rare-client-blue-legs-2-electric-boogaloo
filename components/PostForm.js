import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Async from 'react-select';

const initialState = {
  id: null,
  user_id: '',
  category_id: null,
  title: '',
  image_url: '',
  content: '',
  publication_date: '',
  approved: false,
};

function PostForm({ obj }) {
  const [input, setInput] = useState(initialState);
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();

  const getTheContent = () => {
    if (obj.id) {
      setInput(obj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getTheContent();
  }, []);

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
          <Form.Control as="textarea" onChange={handleChange} rows={3} name="content" value={input.content} />

          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name="category" onChange={handleChange}>
            <option>Select a Category</option>
            {categories.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </Form.Select>
          {tags.map((tag) => (
            <div name="tag" key={`${tag}FormCheck`} className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label={tag}
                onChange={handleChange}
                checked={input.tag === tag}
              />
            </div>
          ))}
        </Form.Group>
        <Button className="submit-btn" type="submit" variant="success">Submit</Button>
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
