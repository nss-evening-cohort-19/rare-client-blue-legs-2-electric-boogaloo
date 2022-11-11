import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function ProfileCard({ obj }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    setToken(Number(userToken));
  }, [token]);

  return (
    <Card className="user-card">
      <div className="user-card-left">
        <div className="user-card-img-name">
          <Card.Img className="user-profile-card-img" variant="top" src={obj.profile_image_url} />
          <Card.Title>{obj.username}</Card.Title>
        </div>
      </div>
      <div className="user-card-right">
        <div className="user-card-first-last">
          <Card.Title>{obj.first_name} {obj.last_name}</Card.Title>
        </div>
        <div className="user-card-email-date">
          <Card.Text>{obj.email}</Card.Text>
          <Card.Text>Author Since: {obj.created_on}</Card.Text>
        </div>
        <div className="user-bio">
          <Card.Text>{obj.bio}</Card.Text>
        </div>
        { token !== obj.id ? (
          <Button><PersonAddAltIcon /></Button>
        ) : ''}
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    profile_image_url: PropTypes.string,
    created_on: PropTypes.string,
  }).isRequired,
};
