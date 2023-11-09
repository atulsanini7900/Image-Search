import React from "react";

function PhotoGrid({ photos, loadMorePhotos }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
        />
      ))}
      <button onClick={loadMorePhotos}>Load More</button>
    </div>
  );
}

export default PhotoGrid;
