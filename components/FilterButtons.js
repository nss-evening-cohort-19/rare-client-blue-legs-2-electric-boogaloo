/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Chip, Stack } from '@mui/material';

export default function FilterButtons({ categories, posts, setFilteredPosts }) {
  const handleClick = (event) => {
    const categoryFilter = posts.filter((thaPost) => thaPost.category.label === event.target.innerHTML);
    setFilteredPosts(categoryFilter);
  };

  return (
    <div>
      <Stack direction="row" spacing={1}>
        {categories?.map((category) => (
          <Chip label={category.label} variant="outlined" onClick={handleClick} />
        ))}
      </Stack>
    </div>
  );
}

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
  posts: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  })),
  setFilteredPosts: PropTypes.func,
};
