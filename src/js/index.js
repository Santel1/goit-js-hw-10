import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.error.classList.add('js-loader');

fetchBreeds()
  .then(resp => {
    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      createMurkupSelect(resp.data)
    );
    slim();
  })
  .catch(err => {
    Report.failure(
      'Oops! Something went wrong! Try reloading the page!',
      `${err}`,
      'Okay'
    );
    refs.error.classList.remove('js-loader');
    refs.breedSelect.classList.add('js-loader');
  });

refs.breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  refs.loader.classList.remove('js-loader');
  refs.catInfo.classList.add('js-loader');
  refs.breedSelect.classList.add('js-loader');
  if (breedId) {
    fetchCatByBreed(breedId)
      .then(resp => {
        if (resp.data.length === 0) {
          Notify.failure("Sorry,we haven't information about this breed.");
        }
        refs.loader.classList.add('js-loader');
        refs.catInfo.classList.remove('js-loader');
        refs.breedSelect.classList.remove('js-loader');
        refs.catInfo.innerHTML = createMurkupCatsInfo(resp.data);
      })
      .catch(err => {
        Report.failure(
          'Oops! Something went wrong! Try reloading the page!',
          `${err}`,
          'Okay'
        );
        refs.error.classList.remove('js-loader');
        refs.breedSelect.classList.add('js-loader');
      });
  }
});

function createMurkupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value ="${id}">${name}</option>`)
    .join('');
}

function createMurkupCatsInfo(data) {
  return data
    .map(
      data =>
        `<img src="${data.url}" alt="${data.breeds[0].name}" class="cat-image" width="400">
        <p>${data.breeds[0].name}</p>
        <p>${data.breeds[0].description}</p>
        <p>${data.breeds[0].temperament}</p>`
    )
    .join('');
}

function slim() {
  new SlimSelect({
    select: '#single',
  });
}
