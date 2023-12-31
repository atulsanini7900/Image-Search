import React, { useState, useEffect } from "react";
import "../App.css";

const apiKey = "71adb2d904c5ebb3e9e620d1884b67f0"; 
const apiUrlRecent = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent";
const apiUrlSearch = "https://www.flickr.com/services/rest/?method=flickr.photos.search";

function SearchImage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    
    fetchRecentPhotos();
  
    loadSearchQueries();
  }, []);

  useEffect(() => {
   
    if (searchQuery) {
      fetchPhotos(searchQuery, page);
    }
  }, [searchQuery, page]);

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
      <header className="App-header">
        <h1>Please Search Any Images </h1>
        <input
          type="text"
          placeholder="Search for photos..."
          value={searchQuery}
          onChange={handleSearch}
        />
     
        
        
      </header>
      <main>
        <div className="photo-grid">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              alt={photo.title}
            />
          ))}
        </div>
        <button onClick={loadMorePhotos}>Load More</button>
      </main>
    </div>
  );
}

export default SearchImage;


