// Runtime import
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// Model state import
import * as model from './models.js';

// Helper Imports
import * as helper from './helper.js';

// Config Imports
import { API_URL } from './config.js';

// View import
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultView from './views/resultView.js';

/////////////////////////////////////// Code start here

// Controller for rendering recipe results
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Show spinner
    recipeView.ShowSpinner();

    // Fetch, put data on models, and render the data to view

    await model.recipeModel(id);
    resultView.render(model.state.search.results);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Controller for search results and data
const searchRecipe = async function () {
  try {
    resultView.ShowSpinner();
    const query = searchView.getQuery();
    await model.searchModel(query);

    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// Init function
const init = function () {
  recipeView.addEventHandler(showRecipe);
  searchView.addEventHandler(searchRecipe);
};

init();
