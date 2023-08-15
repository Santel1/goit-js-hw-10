import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_WHAhnz5ysNhKVYTG2ZNyRSByETUIxcZv1tQr6y3rQy9beUbIwbAMDyvbcu21qK2Y';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
