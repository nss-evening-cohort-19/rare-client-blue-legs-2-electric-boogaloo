import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Async from 'react-select';

function PostForm() {
  return (
    <>
      <h3>New Post</h3>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange="PLACEHOLDER" placeholder="Title goes here" />
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" onChange="PLACEHOLDER" placeholder="Enter your Image URL" />
          <Form.Label>Article</Form.Label>
          <Form.Control as="textarea" onChange="PLACEHOLDER" value={{ }} rows={3} />
          <Form.Label>Category</Form.Label>
          <Async
            classNamePrefix="select"
            onChange="PLACEHOLDER"
            isClearable
            value={{}}
            loadOptions={' '}
          />
          {['JavaScript', 'Python', 'SQL', 'React'].map((tag) => (
            <div key={`${tag}FormCheck`} className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label={tag}
                onChange="PLACEHOLDER"
                checked="INPUT PLACEHOLDER"
              />
            </div>
          ))}
        </Form.Group>
        <Button className="submit-btn" type="submit" variant="success">Submit</Button>
      </Form>
    </>
  );
}

export default PostForm;
