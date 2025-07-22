import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page, perPage) {
  const options = {
    params: {
      key: '51390030-b864bce351d7615980478c23b',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  };

  const response = await axios.get('', options);
  return response.data;
}
