import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { getPostsByCategory } from '../../../api/categoryData';
import PostCard from '../../../components/PostCard';

export default function ViewPostsByCategory() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { categoryId } = router.query;

  const getPosts = () => {
    getPostsByCategory(categoryId).then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, [categoryId]);

  return (
    <div>
      {posts?.map((postObj) => (
        <PostCard key={postObj.id} router={router.asPath} postObject={postObj} onUpdate={getPosts} />
      ))}
    </div>
  );
}