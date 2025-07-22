import axios from 'axios';

export function getImagesByQuery(query) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '51390030-b864bce351d7615980478c23b';

  return axios
    .get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 9,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
