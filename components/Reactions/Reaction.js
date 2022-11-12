/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { deletePostReaction, createPostReaction } from '../../api/postReactionData';

export default function Reaction({
  reaction, userToken, postReactions, postId, onUpdate,
}) {
  const handleClick = () => {
    const reactions = postReactions.filter((postReaction) => postReaction.reaction_id === reaction.id);
    if (reactions.length) {
      deletePostReaction(reactions[0].id).then(() => { onUpdate(); });
    } else {
      const payload = {
        user_id: userToken,
        reaction_id: reaction.id,
        post_id: postId,
      };
      createPostReaction(payload).then(() => { onUpdate(); });
    }
  };

  return (
    <div className="reactions">

      <img
        src={reaction.image_url}
        onClick={handleClick}
        className="emoji"
        aria-label={reaction.label ? reaction.label : ''}
        aria-hidden={reaction.label ? 'false' : 'true'}
      />
    </div>
  );
}

Reaction.propTypes = {
  reaction: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
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
