// eslint-disable-next-line import/prefer-default-export
export const getAllTags = () => fetch('http://localhost:8088/tags')
  .then((res) => res.json());
