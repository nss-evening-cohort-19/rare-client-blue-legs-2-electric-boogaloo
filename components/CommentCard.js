import PropTypes, { number, string } from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCommentsByPost, deleteComment } from '../api/commentsData';

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
    const theToken = localStorage.getItem('auth_token');
    setToken(parseInt(theToken, 10));
  }, [token]);

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
          <DropdownButton align="end" className="cardDropdown">
            <Dropdown.Item
              aria-label="edit"
              className="cardDropDownItem"
              onClick={() => {
                setCommentToUpdate(commentObj);
                scroll();
              }}
            ><EditIcon className="dropIcon" /> Edit Comment
            </Dropdown.Item>
            <Dropdown.Item aria-label="delete" className="cardDropDownItem" onClick={deleteThisComment}><DeleteIcon className="dropIcon" /> Delete Comment</Dropdown.Item>
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
