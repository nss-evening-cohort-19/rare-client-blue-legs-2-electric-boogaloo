import { React } from 'react';
import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

export default function PostCard({
  postObject, router, onUpdate,
}) {
  const deleteThisPost = () => {
    /* if (window.confirm('Delete this post?')) {
      getPostComments(postObject.id).then(() => {
        deletePostComments(postObject.id).then(() => onUpdate());
      });
    } */
    onUpdate();
  };

  // eslint-disable-next-line react/prop-types
  const reactionCount = postObject.post_reactions?.length;

  return (
    <div>
      <Card className="postCard">
        <Card.Body className="postCardBody">
          <Card.Title className="postCardTitle">{postObject.title}</Card.Title>
          <Image className="postCardImage" src={postObject.image_url} />
          <Card.Text className="postPubDate">Publication Date: {postObject.publication_date}</Card.Text>
          <Link href={`/user/${postObject.user_id}`} passHref>
            <Card.Text className="postAuthor">Author: {postObject.author}</Card.Text>
          </Link>
          <Card.Text className="reactionCount">Reaction Count: {reactionCount}</Card.Text>
          <div className="postCardButtons">
            {router === `/posts/${postObject.id}` ? (
              <div className="postCardButtons">
                <Link href={`/posts/edit/${postObject.id}`} passHref>
                  <IconButton aria-label="edit" className="edit-btn">
                    <EditIcon style={{ color: 'black' }} />
                  </IconButton>
                </Link>
                <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisPost}>
                  <DeleteIcon style={{ color: 'black' }} />
                </IconButton>
              </div>
            ) : (<div />)}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  postObject: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    author: PropTypes.string,
    publication_date: PropTypes.string,
    post_reactions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      reaction_id: PropTypes.number,
      post_id: PropTypes.number,
    })),
    user_id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  router: PropTypes.string.isRequired,
};