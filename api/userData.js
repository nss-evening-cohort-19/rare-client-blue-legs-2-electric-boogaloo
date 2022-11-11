import axios from 'axios';

const dbUrl = 'http://localhost:8088/users';

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/${uid}`)
    .then((userObj) => resolve(userObj.data))
    .catch(reject);
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/${userObj.id}`, userObj)
    .then(resolve)
    .catch(reject);
});

export { getUserByUid, updateUser };
