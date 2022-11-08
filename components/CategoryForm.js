import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createCategory } from '../api/categoryData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function CategoryForm({ categoryObj, refresh }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (categoryObj.id) {
      setFormInput(categoryObj);
    }
  }, [categoryObj]);

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
    console.warn(payload);
    createCategory(payload).then(() => {
      refresh();
      setFormInput(initialState);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a New Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Create a New Category"
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

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};

export default CategoryForm;
