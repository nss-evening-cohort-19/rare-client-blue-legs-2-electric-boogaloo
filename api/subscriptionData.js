import axios from 'axios';

const dbUrl = 'http://localhost:8088/subscriptions';

const getSubscriptionByAuthorId = (authorId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}?author_id=${authorId}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createSubscription = (payload) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}`, payload)
    .then((resolve))
    .catch(reject);
});

const deleteSubscription = (id) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/${id}`)
    .then(resolve)
    .catch(reject);
});

export { getSubscriptionByAuthorId, createSubscription, deleteSubscription };
