/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import getSubscriptionByAuthorId from '../api/subscriptionData';

export default function ProfileCard({ obj }) {
  const [token, setToken] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const getSubscriptions = () => {
    getSubscriptionByAuthorId(obj.id).then(setSubscription);
    console.warn('subscription ', subscription);
  };

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
    getSubscriptions();
    console.warn('obj', obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, obj]);

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
          <Card.Title>
            {obj.first_name} {obj.last_name}
          </Card.Title>
        </div>
        <div className="user-card-email-date">
          <Card.Text>{obj.email}</Card.Text>
          <Card.Text>Author Since: {obj.created_on}</Card.Text>
        </div>
        <div className="user-bio">
          <Card.Text>{obj.bio}</Card.Text>
        </div>
        {(() => {
          if (token === obj.id) {
            return '';
          } if (token === subscription.follower_id) {
            return (
              <Button>
                <UnsubscribeIcon />
              </Button>
            );
          } if (token !== subscription.follower_id) {
            return (
              <Button>
                <PersonAddAltIcon />
              </Button>
            );
          }
        })}
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
