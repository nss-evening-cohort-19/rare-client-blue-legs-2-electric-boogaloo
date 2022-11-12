/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { deleteUserAndContent } from '../api/mergedData';
import { getSubscriptionByAuthorId, createSubscription, deleteSubscription } from '../api/subscriptionData';

export default function ProfileCard({ obj }) {
  const [token, setToken] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const router = useRouter();

  const getSubscriptions = () => {
    getSubscriptionByAuthorId(obj.id).then(((subscriptions) => subscriptions.filter((subscriptionObj) => subscriptionObj.follower_id === Number(token)))).then(setSubscription);
  };

  const date = new Date(Date.now()).toLocaleString().split(',')[0];

  const handleClick = () => {
    if (subscription[0]?.follower_id) {
      deleteSubscription(subscription[0].id).then(() => {
        getSubscriptions();
      });
    } else {
      const payload = {
        id: null,
        follower_id: Number(token),
        author_id: obj.id,
        created_on: date,
      };
      createSubscription(payload).then(() => { getSubscriptions(); });
    }
  };
  const deleteUser = () => {
    if (window.confirm('Are you sure you wan to delete me ?')) {
      deleteUserAndContent(obj.id).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
    getSubscriptions();
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
          <Card.Title>{obj.first_name} {obj.last_name}</Card.Title>
          <Link className="" href={`/user/edit/${obj.id}`} passHref>
            <IconButton aria-label="edit" className="edit-btn">
              <EditIcon style={{ color: 'black' }} />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" className="delete-btn " onClick={deleteUser}>
            <DeleteIcon style={{ color: 'black' }} />
          </IconButton>
        </div>
        <div className="user-card-email-date">
          <Card.Text>{obj.email}</Card.Text>
          <Card.Text>Author Since: {obj.created_on}</Card.Text>
        </div>
        <div className="user-bio">
          <Card.Text>{obj.bio}</Card.Text>
        </div>
        {Number(token) === obj.id ? (
          ''
        ) : subscription[0]?.follower_id ? (
          <Button onClick={handleClick} variant="danger">
            <UnsubscribeIcon />
          </Button>
        ) : (
          <Button onClick={handleClick}>
            <PersonAddAltIcon />
          </Button>
        )}
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
