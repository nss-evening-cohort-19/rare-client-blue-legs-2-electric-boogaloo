import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ProfileCard({ obj }) {
  return (
    <Card className="user-card">
      <div className="user-card-left">
        <div className="user-card-img-name">
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Title>{obj.username}</Card.Title>
        </div>
      </div>
      <div className="user-card-right">
        <div className="user-card-first-last">
          <Card.Title>Card Title</Card.Title>
          <Card.Title>Card Title</Card.Title>
        </div>
        <div className="user-card-email-date">
          <Card.Text>Email</Card.Text>
          <Card.Text>Author Since:</Card.Text>
        </div>
        <div className="user-bio">
          <Card.Text>Bio</Card.Text>
        </div>
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {
  obj: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    profile_image_url: PropTypes.string,
    created_on: PropTypes.string,
  }).isRequired,
};
