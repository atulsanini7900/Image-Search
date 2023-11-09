import React from "react";
import SearchImage from "./SearchImage";
function SuggestionsList({ suggestions, setSearchQuery }) {
  return (
    <ul className="suggestions">
      {suggestions.map((query, index) => (
        <li key={index} onClick={() => setSearchQuery(query)}>
          {query}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsList;
