/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserByUid } from '../api/userData';
import UserForm from '../components/UserForm';

function Home({ setToken }) {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem('auth_token'));
    if (user) {
      getUserByUid(user).then(setUser);
    } else {
      setUser({});
    }
  }, []);

  return (
    <UserForm setToken={setToken} userObj={user} />
  );
}

Home.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Home;
