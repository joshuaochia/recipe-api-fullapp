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
import bookmarkView from './views/bookmarksView.js';
import addrecipeView from './views/addrecipeView';

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
    // Update actions
    resultView.render(model.state.search.results);

    bookmarkView.update(model.state.bookmarks);

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
  recipeView.update(model.state.recipe);
};

const addBookmarkController = function () {
  // Add or remove bookmarked recipe to model

  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.delBookmark(model.state.recipe.id);

  // Update the recipe bookmark icon
  recipeView.update(model.state.recipe);

  // Render the bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const bookmarksController = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controllAddRecipe = function (newRecipe) {
  console.log(newRecipe);

  // Upload the new recipe
};
// Init function
const init = function () {
  bookmarkView.addHandlerRender(bookmarksController);
  recipeView.addEventHandler(showRecipeController);
  recipeView.addUpdateServingsHandler(updateServingsController);
  recipeView.addBookmarkHandler(addBookmarkController);
  searchView.addEventHandler(searchRecipeController);
  paginationView.addEventHandler(paginationController);
  addrecipeView.addHandlerUpload(controllAddRecipe);
};

init();
