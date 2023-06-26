import React, { useState, useEffect } from 'react';
import Searchbar from '../components/mainComponents/Searchbar';
import ImageGallery from '../components/mainComponents/ImageGallery';
import Button from '../components/mainComponents/Button';
import Modal from '../components/mainComponents/Modal';
import { apiHelper } from '../components/API/ApiHelper';
import Loader from '../components/mainComponents/Loader';
import css from '../components/Modules/ImageFinder.module.css';
import Notiflix from 'notiflix';

const App = () => {
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [perPage] = useState(12);
const [images, setImages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [showModal, setShowModal] = useState(false);
const [selectedImage, setSelectedImage] = useState('');
const [hasMoreImages, setHasMoreImages] = useState(false);

const handleSearch = (query) => {
setQuery(query);
setPage(1);
setImages([]);
setHasMoreImages(false);
};

const handleLoadMore = () => {
setPage((prevPage) => prevPage + 1);
};

useEffect(() => {
const fetchImages = () => {
setIsLoading(true);
 apiHelper
 .searchImages(query, page, perPage)
 .then((response) => {
 const newImages = response.map((image) => ({
  id: image.id,
  webformatURL: image.webformatURL,
  largeImageURL: image.largeImageURL,
  }));
 if (newImages.length === 0 && query.trim() !== '') {
   Notiflix.Notify.failure('Sorry, nothing was found for your search!');
   return;
  }
 const hasMoreImages = newImages.length === perPage;
  setImages((prevImages) => [...prevImages, ...newImages]);
  setHasMoreImages(hasMoreImages);
  })
  .catch((error) => {
  console.error(error);
  })
  .finally(() => {
  setIsLoading(false);
  });
  };
  fetchImages();
}, [query, page, perPage]);


useEffect(() => {
  if (images.length > 12) {
    window.scrollBy({
      top: 2000 * 2,
      behavior: 'smooth',
    });
  }
}, [page, images.length]);



const handleImageClick = (imageUrl) => {
setShowModal(true);
setSelectedImage(imageUrl);
};

const handleCloseModal = () => {
setShowModal(false);
setSelectedImage('');
};

const showLoadMoreButton = images.length > 0 && !isLoading && hasMoreImages;

return (
<div className={css.container}>
<Searchbar onSearch={handleSearch} />
<ImageGallery images={images} onImageClick={handleImageClick} />
{isLoading && <Loader />}
{showLoadMoreButton && <Button onClick={handleLoadMore}>Load More</Button>}
{showModal && <Modal imageUrl={selectedImage} onClose={handleCloseModal} />}
</div>
);
};

export default App;