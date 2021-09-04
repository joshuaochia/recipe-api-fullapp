// Runtime import
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// Model state import
import * as model from './models.js';

// View import
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

/////////////////////////////////////// Code start here

// Controller for rendering recipe results
const showRecipeController = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Show spinner
    recipeView.ShowSpinner();

    // Fetch data from API
    await model.recipeModel(id);
    // Re render search result for clicked recipe
    resultView.render(model.state.search.results);

    // render data from model to view
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Controller for search results and data
const searchRecipeController = async function () {
  try {
    // Show snipper
    resultView.ShowSpinner();

    // Get the query from search input
    const query = searchView.getQuery();

    // Fetch data from api and save
    await model.searchModel(query);

    // Render data from model to view
    resultView.render(model.goToPage());

    // Make the pagination
    paginationView.render(model.state.search);
  } catch (err) {
    alert(err);
  }
};

const paginationController = function () {};

// Init function
const init = function () {
  recipeView.addEventHandler(showRecipeController);
  searchView.addEventHandler(searchRecipeController);
  paginationView.addEventHandler(paginationController);
};

init();
