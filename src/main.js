import { getImagesByQuery } from './js/pixabay-api.js';
import { refs } from './js/refs.js';
import {
  createGallery,
  clearGallery,
  refreshLightbox,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';

function onSubmit(e) {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(data => {
      hideLoader();
      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again',
          position: 'topRight',
        });
        return;
      }
      const galleryMarkup = createGallery(data.hits);
      refs.gallery.innerHTML = galleryMarkup;
      refreshLightbox();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again',
        position: 'topRight',
      });
    });
}

refs.form.addEventListener('submit', onSubmit);
