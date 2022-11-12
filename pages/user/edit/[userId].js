/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import UserForm from '../../../components/UserForm';
import { getUserByUid } from '../../../api/userData';

export default function EditUserPage({ setToken }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { userId } = router.query;

  const getTheContent = () => {
    getUserByUid(userId).then(setUser);
  };
  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <UserForm setToken={setToken} userObj={user} />
    </>
  );
}

EditUserPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
