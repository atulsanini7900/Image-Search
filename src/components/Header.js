import React from "react";
import SearchInput from "./SearchInput";
import SuggestionsList from "./SuggestionsList";

function Header({ searchQuery, setSearchQuery, suggestions, handleSearch, saveSearchQuery }) {
  return (
    <header className="App-header">
      <h1>Flickr Image Search</h1>
      <SearchInput searchQuery={searchQuery} handleSearch={handleSearch} saveSearchQuery={saveSearchQuery} />
      <SuggestionsList suggestions={suggestions} setSearchQuery={setSearchQuery} />
    </header>
  );
}

export default Header;
