let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = null;
let countFavorites = null;

let totalPopulationList = null;
let totalPopulationFavorites = null;

let numberFormat = null;

function start() {
  initializeVariables();
  fetchCountries();
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const resObj = await res.json();

  allCountries = resObj.map(country => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.br,
      population,
      formattedPopulation: formatNumber(population),
      flag
    };
  });

  render();
}

function initializeVariables() {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');
  
  numberFormat = Intl.NumberFormat('pt-BR');
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHtml = '<div>';

  allCountries.sort((a, b) => a.name.localeCompare(b.name));
  allCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;
    const countryHtml =
    `<div class="country">
      <a id="${id}" class="waves-effect waves-light btn">+</a>
      <img src="${flag}" alt="${name}">
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>`;
    countriesHtml += countryHtml;
  });
  countriesHtml += '</div>';
  tabCountries.innerHTML = countriesHtml;
}

function renderFavorites() {
  let favoritesHtml = '<div>';

  favoriteCountries.sort((a, b) => a.name.localeCompare(b.name));
  favoriteCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;
    const favoriteCountryHtml =
    `<div class="country">
      <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      <img src="${flag}" alt="${name}">
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>`;
    favoritesHtml += favoriteCountryHtml;
  });
  favoritesHtml += '</div>';
  tabFavorites.innerHTML = favoritesHtml;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const addTotalPopulation = (totalPopulation, country) => totalPopulation + country.population;
  const countPopulation = allCountries.reduce(addTotalPopulation, 0);
  const countPopulationFavorites = favoriteCountries.reduce(addTotalPopulation, 0);

  totalPopulationList.textContent = formatNumber(countPopulation);
  totalPopulationFavorites.textContent = formatNumber(countPopulationFavorites);
}

function handleCountryButtons() {
  const addToFavorites = id => {
    selectedCountry = allCountries.find(country => country.id === id);
    allCountries = allCountries.filter(country => country.id !== id);
    favoriteCountries = [ ...favoriteCountries, selectedCountry ];
    render();
  }

  const removeFromFavorites = id => {
    selectedCountry = favoriteCountries.find(country => country.id === id);
    allCountries = [ ...allCountries, selectedCountry ];
    favoriteCountries = favoriteCountries.filter(country => country.id !== id);
    render();
  }

  const countryButtons = [...tabCountries.querySelectorAll('a.btn')];
  const favoriteButtons = [...tabFavorites.querySelectorAll('a.btn')];

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function formatNumber(number) {
  return numberFormat.format(number);
}

start();