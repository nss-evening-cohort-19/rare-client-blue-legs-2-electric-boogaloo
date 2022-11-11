import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { getPostsByCategory } from '../../../api/categoryData';
import PostCard from '../../../components/PostCard';

export default function ViewPostsByCategory() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { categoryId } = router.query;
  const [token, setToken] = useState(null);

  const getPosts = () => {
    getPostsByCategory(categoryId).then(setPosts);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    setToken(userToken);
    getPosts();
  }, [categoryId]);

  return (
    <div>
      {posts?.map((postObj) => (
        <PostCard userToken={token} key={postObj.id} postObject={postObj} onUpdate={getPosts} />
      ))}
    </div>
  );
}
