import Render, { FAVORITE_KEY } from './render';

const modalCocktail = document.querySelector('.modal-cocktail');
const backdrop = document.querySelector('.backdrop');
const btnModalClose = document.querySelector('.modal-close');
let render = new Render();

export function openModalCocktail() {
  backdrop.classList.remove('is-hidden');
  btnModalClose.addEventListener('click', closeModalCocktail);
  backdrop.addEventListener('click', onBackDropClick);
  window.addEventListener('keydown', onEscClick);
}

export function closeModalCocktail() {
  backdrop.classList.add('is-hidden');
  btnModalClose.removeEventListener('click', closeModalCocktail);
  backdrop.removeEventListener('click', onBackDropClick);
  window.removeEventListener('keydown', onEscClick);
}

function onBackDropClick(e) {
  if (e.target === e.currentTarget) {
    closeModalCocktail();
  }
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    closeModalCocktail();
  }
}

export function renderModalCocktail(cocktail) {
  const entries = Object.entries(cocktail);
  const ingridients = [];
  entries.map(elem => {
    if (elem[0].includes('strIngredient') && elem[1]) {
      ingridients.push(elem[1]);
    }
  });
  console.log(ingridients);
  const ingidientsMarkup = ingridients
    .map(
      ingridient =>
        `<li class="ingredients__item">
      <a href="" class="ingredients__link">
        ${ingridient}
      </a>
    </li>`
    )
    .join('');

  const { strDrink, strDrinkThumb, idDrink, strInstructions } = cocktail;
  const markup = `<div class="cocktails-info">
              <img class="cocktails-info" src="${strDrinkThumb}" alt="#" width="320" height="320">
              <h2 class="cocktails-info__title">Negroni</h2>
              <div class="ingredients">
                  <h3 class="ingredients__title">Ingredients</h3>
                  <p class="ingredients__text">Per cocktail</p>
                  <ul class="ingredients__list">
                    ${ingidientsMarkup}  
                  </ul>
              </div>
          </div>
          <div class="instruction">
              <h3 class="instruction__title">Instructions:</h3>
              <p class="instruction__text">${strInstructions}</p>
          </div>
          <button class='button-remove' type="button" data-id="${idDrink}"></button>
                `;

  modalCocktail.innerHTML = markup;
  updateButton();
}

function updateButton() {
  const btnModalCocktail = document.querySelector('.button-remove');
  console.log(render.cards);
  btnModalCocktail.addEventListener('click', e => {
    console.log(e.target.dataset.id);
    addToFavorite(e.target.dataset.id);
  });
}

function addToFavorite(id = '') {
  let favorite = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
  //   let favorite = dataLocalStorage ? JSON.parse(dataLocalStorage) : [];
  // const card = this.cards.find(elem => elem.idDrink === id);
  let cocktail =
    favorite.find(elem => elem.idDrink === id) ||
    render.cards.find(elem => elem.idDrink === id);
  console.log(cocktail);
  if (!cocktail) {
    favorite.push(cocktail);
  } else {
    favorite = favorite.filter(elem => elem.idDrink !== id);
  }
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorite));
}
