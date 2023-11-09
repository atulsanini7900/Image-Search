import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import PhotoGrid from "./PhotoGrid";

const apiKey = "71adb2d904c5ebb3e9e620d1884b67f0"; // Replace with your actual API key
const apiUrlRecent = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent";
const apiUrlSearch = "https://www.flickr.com/services/rest/?method=flickr.photos.search";

function SearchImage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch recent photos when the component mounts
    fetchRecentPhotos();
    // Load saved search queries from local storage
    loadSearchQueries();
  }, []);

  useEffect(() => {
    // Fetch photos when the search query or page changes
    if (searchQuery) {
      fetchPhotos(searchQuery, page);
    }
  },  [searchQuery, page, fetchPhotos]);

  const fetchRecentPhotos = async () => {
    try {
      const response = await fetch(`${apiUrlRecent}&safe_search=1&api_key=${apiKey}&format=json&nojsoncallback=1`);
      const data = await response.json();
      setPhotos(data.photos.photo);
    } catch (error) {
      console.error("Error fetching recent photos:", error);
    }
  };

  const fetchPhotos = async (query, currentPage) => {
    try {
      const response = await fetch(
        `${apiUrlSearch}&safe_search=1&api_key=${apiKey}&text=${query}&page=${currentPage}&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      if (currentPage === 1) {
        setPhotos(data.photos.photo);
      } else {
        setPhotos([...photos, ...data.photos.photo]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const loadSearchQueries = () => {
    const savedQueries = JSON.parse(localStorage.getItem("searchQueries") || "[]");
    setSuggestions(savedQueries);
  };

  const saveSearchQuery = (query) => {
    if (!suggestions.includes(query)) {
      const updatedQueries = [query, ...suggestions];
      setSuggestions(updatedQueries);
      localStorage.setItem("searchQueries", JSON.stringify(updatedQueries));
    }
  };

  saveSearchQuery();

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const loadMorePhotos = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        handleSearch={handleSearch}
        saveSearchQuery={saveSearchQuery}
      />
      <main>
        <PhotoGrid photos={photos} loadMorePhotos={loadMorePhotos} />
      </main>
    </div>
  );
}

export default SearchImage;
