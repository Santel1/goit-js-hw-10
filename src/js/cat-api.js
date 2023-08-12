import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_WHAhnz5ysNhKVYTG2ZNyRSByETUIxcZv1tQr6y3rQy9beUbIwbAMDyvbcu21qK2Y';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

export function fetchBreeds() {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      refs.breedSelect.innerHTML = createMurkupSelect(resp.data);
      // console.log(createMurkup(resp.data));

      // console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

export function fetchCatByBreed(breedId) {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      refs.catInfo.innerHTML = createMurkupCatsInfo(resp.data);
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function createMurkupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value ="${id}">${name}</option>`)
    .join('');
}

function createMurkupCatsInfo(data) {
  data.url;
  data.breeds[0].name;

  return data
    .map(
      ({ url, temperament, description, name }) =>
        `<img src="${url}" alt="${name}" class="cat-image" width="400">
        <p>${name}</p>
        <p>${description}</p>
        <p>${temperament}</p>`
    )
    .join('');
}

refs.breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  if (breedId) {
    fetchCatByBreed(breedId);
  }
  console.log(breedId);
});
