import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createTag } from '../api/tagData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function TagForm({ tagObj, refresh }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (tagObj.id) {
      setFormInput(tagObj);
    }
  }, [tagObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    createTag(payload).then(() => {
      refresh();
      setFormInput(initialState);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a New Tag</Form.Label>
        <Form.Control
          type="text"
          placeholder="Create a New Tag"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

TagForm.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  tagObj: initialState,
};

export default TagForm;
