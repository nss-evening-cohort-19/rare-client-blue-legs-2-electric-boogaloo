import Card from 'react-bootstrap/Card';
import PropTypes, { string } from 'prop-types';
import { React } from 'react';

export default function TagComponent({ tagObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>{tagObj.label}</Card.Text>
      </Card.Body>
    </Card>
  );
}

TagComponent.propTypes = {
  tagObj: PropTypes.shape({
    label: string,
  }).isRequired,
};
