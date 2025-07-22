import { getImagesByQuery } from './js/pixabay-api.js';
import { refs } from './js/refs.js';
import {
  createGallery,
  clearGallery,
  refreshLightbox,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getBoundingClientRect,
} from './js/render-functions.js';
import iziToast from 'izitoast';

let page = 1;
let perPage = 15;
let query = null;

async function onSubmit(e) {
  e.preventDefault();
  showLoader();
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again',
      position: 'topRight',
    });
    return;
  }
  try {
    const { data } = await getImagesByQuery(query, page, perPage);

    console.log(data);

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
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
}
//
async function onClickLoadMore() {
  showLoader();
  try {
    page++;
    const { data } = await getImagesByQuery(query, page, perPage);

    refs.gallery.insertAdjacentHTML('beforeend', createGallery(data.hits));
    refreshLightbox();
    getBoundingClientRect();
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'No more images found',
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
}
//

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', onClickLoadMore);
