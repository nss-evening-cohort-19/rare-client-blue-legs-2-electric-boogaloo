import PropTypes, { number, string } from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import {
  FaEllipsisV, FaTrashAlt, FaPencilAlt,
} from 'react-icons/fa';
import getCommentsByPost, { deleteComment } from '../api/commentsData';

function CommentCard({ commentObj, onUpdate, setCommentToUpdate }) {
  const [token, setToken] = useState(null);

  const deleteThisComment = () => {
    if (window.confirm('Delete comment?')) {
      getCommentsByPost(commentObj.post_id).then(() => {
        deleteComment(commentObj.id).then(() => onUpdate());
      });
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
  }, []);

  const scroll = () => {
    window.scrollTo(1, 0);
  };

  return (
    <Card.Body className="commentCard">
      <Card.Body>
        <Card.Text>{ commentObj.content }</Card.Text>
      </Card.Body>
      { token === commentObj.author_id ? (
        <div>
          <DropdownButton align="end" className="cardDropdown" title={<FaEllipsisV className="droptoggleicon" />}>
            <Dropdown.Item
              aria-label="edit"
              className="cardDropDownItem"
              onClick={() => {
                setCommentToUpdate(commentObj);
                scroll();
              }}
            ><FaPencilAlt className="dropIcon" /> Edit Comment
            </Dropdown.Item>
            <Dropdown.Item aria-label="delete" className="cardDropDownItem" onClick={deleteThisComment}><FaTrashAlt className="dropIcon" /> Delete Comment</Dropdown.Item>
          </DropdownButton>
        </div>
      ) : '' }
    </Card.Body>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: number,
    author_id: number,
    post_id: number,
    content: string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  setCommentToUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
