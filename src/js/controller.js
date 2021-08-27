import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView';
const recipeContainer = document.querySelector('.recipe');

const URL = `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`;
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    // 1. Getting hash id - if nothing, return
    const id = window.location.hash.slice(1);

    if (!id) return;
    // 3. Fetching data from API and inserting it to index.html
    recipeView.showSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult('pizza');
    searchView.clearInput();
    console.log(model.state.search.results);
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHanderSearch(controlSearchResult);
};
init();
