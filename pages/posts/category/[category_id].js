import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { getPostsByCategory } from '../../../api/categoryData';
import PostCard from '../../../components/PostCard';

export default function ViewPostsByCategory() {
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPosts = () => {
    getPostsByCategory(id).then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, [router]);
  console.warn(posts);

  return (
    <div>
      {posts?.map((postObj) => (
        <PostCard key={postObj.id} router={router.asPath} postObject={postObj} onUpdate={getPosts} />
      ))}
    </div>
  );
}
