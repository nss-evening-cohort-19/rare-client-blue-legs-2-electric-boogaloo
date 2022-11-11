import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { registerUser } from '../utils/data/AuthManager';
import { updateUser } from '../api/userData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  bio: '',
  username: '',
  password: '',
  password_confirm: '',
  profile_image_url: '',
  created_on: '',
};

function UserForm({ setToken, userObj }) {
  const [input, setInput] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password === input.password_confirm) {
      if (userObj.id) {
        delete (input.password_confirm);
        updateUser(input);
        router.push(`/user/${userObj.id}`);
      } else {
        delete (input.password_confirm);
        registerUser(input).then((res) => {
          if ('valid' in res && res.valid) {
            setToken(res.token);
            router.push('/');
          }
        });
      }
    } else {
      window.confirm('Passwords Do Not Match');
    }
  };

  useEffect(() => {
    if (userObj.id) {
      setInput(userObj);
    }
  }, [userObj, router]);

  return (
    <>
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>

          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" value={input.first_name} onChange={handleChange} placeholder="Enter Your Fisrt Name" />

          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" value={input.last_name} onChange={handleChange} placeholder="Enter Your Last Name" />

          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={input.username} onChange={handleChange} placeholder="Your Rare Alias" />

          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={input.email} onChange={handleChange} />

          <Form.Label>Password</Form.Label>
          <Form.Control name="password" value={input.password} type="password" onChange={handleChange} placeholder="Password" />
          <Form.Control name="password_confirm" value={input.password_confirm} type="password" onChange={handleChange} placeholder="Verify Password" />

          <Form.Label>Profile Image</Form.Label>
          <Form.Control name="profile_image_url" value={input.profile_image_url} onChange={handleChange} type="text" />

          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" name="bio" value={input.bio} as="textarea" rows={3} onChange={handleChange} placeholder="Tell Us About Yourself" />

          <Button variant="success" type="submit">Sumbit</Button>
          <Button variant="danger" onClick={() => router.push('/login')}>Cancel</Button>

        </Form.Group>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    password_confirm: PropTypes.string,
    profile_image_url: PropTypes.string,
  }),
  setToken: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  userObj: initialState,
};

export default UserForm;
