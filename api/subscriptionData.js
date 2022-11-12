import axios from 'axios';

const dbUrl = 'http://localhost:8088/subscriptions';

const getSubscriptionByAuthorId = (authorId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}?author_id=${authorId}`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

export default getSubscriptionByAuthorId;
