import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { deleteUserAndContent } from '../api/mergedData';

export default function ProfileCard({ obj }) {
  const router = useRouter();

  const deleteUser = () => {
    if (window.confirm('Are you sure you wan to delete me ?')) {
      deleteUserAndContent(obj.id).then(() => router.push('/'));
    }
  };

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
