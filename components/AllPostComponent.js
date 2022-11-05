import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes, { string, number } from 'prop-types';
import Link from 'next/link';

export default function AllPostComponent({ obj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{obj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{obj.author}</Card.Subtitle>
        <Card.Text>
          {obj.content}
        </Card.Text>
        <Link href={`/posts/${obj.id}`} passHref>
          Link to Card
        </Link>
      </Card.Body>
    </Card>
  );
}

AllPostComponent.propTypes = {
  obj: PropTypes.shape({
    id: number,
    title: string,
    author: string,
    content: string,
  }).isRequired,
};
