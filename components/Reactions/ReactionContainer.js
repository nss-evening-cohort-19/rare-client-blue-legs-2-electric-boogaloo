import PropTypes from 'prop-types';
import Reaction from './Reaction';
import ReactionsModal from './ReactionsModal';

export default function ReactionContainer({
  reactions, userToken, postReactions, postId, onUpdate,
}) {
  const reactionsToDisplay = reactions.filter((reaction) => postReactions?.some((postReaction) => reaction.id === postReaction.reaction_id));

  return (
    <div className="reactionContainer">
      <div className="reactionModalContainer">
        <ReactionsModal reactions={reactions} userToken={userToken} postReactions={postReactions} postId={postId} onUpdate={onUpdate} />
      </div>
      {reactionsToDisplay.map((reaction) => {
        const reactionCount = postReactions?.filter((postReaction) => postReaction.reaction_id === reaction.id).length;

        return (
          <div className="reactionCounter">
            <Reaction reaction={reaction} userToken={userToken} postReactions={postReactions} postId={postId} onUpdate={onUpdate} handleClose={() => null} /> <div className="number">{reactionCount}</div>
          </div>
        );
      })}
    </div>
  );
}

ReactionContainer.propTypes = {
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
