import React from "react";

function SearchInput({ searchQuery, handleSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for photos..."
      value={searchQuery}
      onChange={handleSearch}
    />
  );
}

export default SearchInput;
