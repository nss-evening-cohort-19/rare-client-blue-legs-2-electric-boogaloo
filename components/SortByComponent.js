/* eslint-disable react/require-default-props */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function SortByComponent({ posts, setFilteredPosts, onUpdate }) {
  const [sort, setSort] = React.useState('');

  const doFilter = (event) => {
    if (event.target.value === 'title') {
      const titResults = [...posts].sort((post1, post2) => post1.title.localeCompare(post2.title));
      setFilteredPosts(titResults);
    } else if (event.target.value === 'author') {
      const autResults = [...posts].sort((post1, post2) => post1.author.localeCompare(post2.author));
      setFilteredPosts(autResults);
    } else if (event.target.value === 'oldestToNewestDate') {
      const oldDResults = [...posts].sort((post1, post2) => new Date(post1.publication_date) - new Date(post2.publication_date));
      setFilteredPosts(oldDResults);
    } else if (event.target.value === 'newestToOldestDate') {
      const newDResults = [...posts].sort((post1, post2) => new Date(post2.publication_date) - new Date(post1.publication_date));
      setFilteredPosts(newDResults);
    } else {
      onUpdate();
    }
  };

  const handleChange = (event) => {
    setSort(event.target.value);
    doFilter(event);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sort}
          onChange={handleChange}
          autoWidth
          label="Sort"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="oldestToNewestDate">Date (Oldest to Newest)</MenuItem>
          <MenuItem value="newestToOldestDate">Date (Newest to Oldest)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

SortByComponent.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    publication_date: PropTypes.string,
    id: PropTypes.number,
  })),
  setFilteredPosts: PropTypes.func,
  onUpdate: PropTypes.func,
};
