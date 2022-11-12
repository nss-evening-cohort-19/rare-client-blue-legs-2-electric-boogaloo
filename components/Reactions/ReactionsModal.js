/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import PropTypes from 'prop-types';
import Reaction from './Reaction';

function ReactionsModal({
  reactions, userToken, postReactions, postId, onUpdate,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" className="reactions" variant="outline-secondary" onClick={handleShow}>
        <AddReactionOutlinedIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Choose a Reaction!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="tracklist-modal">{reactions.map((reaction) => <Reaction reaction={reaction} userToken={userToken} postReactions={postReactions} postId={postId} onUpdate={onUpdate} />)}
        </Modal.Body>
      </Modal>
    </>
  );
}

ReactionsModal.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  userToken: PropTypes.number.isRequired,
  postReactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    post_id: PropTypes.number,
  })).isRequired,
  postId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionsModal;
