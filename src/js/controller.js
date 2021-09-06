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
    throw err;
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
    throw err;
  }
};

const paginationController = function (page) {
  // Render data from model to view
  resultView.render(model.goToPage(page));

  // Make the pagination button
  paginationView.render(model.state.search);
};

const updateServingsController = function (newServings) {
  // Update the servings number in model
  model.updateServings(newServings);

  // Render the recipe with the new servings
  recipeView.render(model.state.recipe);
};

// Init function
const init = function () {
  recipeView.addEventHandler(showRecipeController);
  recipeView.addUpdateServingsHandler(updateServingsController);
  searchView.addEventHandler(searchRecipeController);
  paginationView.addEventHandler(paginationController);
};

init();
