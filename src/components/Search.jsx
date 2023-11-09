import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageResults from './ImageResult';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [apiUrl] = useState('https://pixabay.com/api');
  const [apiKey] = useState('17241914-90da7b93c0ccceb734849dcd1');
  const [images, setImages] = useState([]);

  const onTextChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    if (val === '') {
      setImages([]);
    } else {
      axios
        .get(
          `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&safesearch=true`
        )
        .then((res) => setImages(res.data.hits))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div>
      <input
        type="text"
        style={{
          backgroundColor: 'black',
          color: 'white',
          marginLeft: 570,
          marginTop: 100,
          paddingTop: 20,
          paddingLeft: 70,
          fontSize: 30,
          borderTopStyle: 'hidden',
          borderRightStyle: 'hidden',
          borderLeftStyle: 'hidden',
          outline: 'none',
          borderBottomStyle: 'groove',
        }}
        placeholder="Search for images"
        name="searchText"
        value={searchText}
        onChange={onTextChange}
      />
      <br />
      {images.length > 0 ? <ImageResults images={images} /> : null}
    </div>
  );
};

export default Search;
