import React, { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  console.warn(searchInput);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search resources"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}
