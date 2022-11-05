import { useEffect, useState } from 'react';
import { getPost } from '../api/commentsData';
import CommentCard from '../components/CommentCard';

function Home() {
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(1).then(setPost);
  }, []);

  useEffect(() => {
    getPost(1).then((thePost) => {
      console.warn(thePost.comments);
    });
  }, []);

  return (
    <div>
      {
        post.comments?.map((comment) => (
          <CommentCard commentObj={comment} key={comment.id} />
        ))
        }
    </div>
  );
}

export default Home;
