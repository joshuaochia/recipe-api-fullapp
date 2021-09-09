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

/**
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for showing recipe on load or hash change
 */
const showRecipeController = async function () {
  try {
    // 1. Get hash id then guard clause if no true
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2. Show spinner
    recipeView.ShowSpinner();

    //3. Fetch data from API and put it on model
    await model.recipeModel(id);

    //4. Render the loaded recipe in model using async
    recipeView.render(model.state.recipe);

    //5. Render the search tab view if theres result
    resultView.render(model.state.search.results);

    //6. Update bookmarks if exist on load or hash change
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    throw err;
  }
};

/**
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for showing search result on submit in search form
 */
const searchRecipeController = async function () {
  try {
    //1. Show snipper
    resultView.ShowSpinner();

    //2.  Get the query from search input
    const query = searchView.getQuery();

    //3. Fetch data from api and save
    await model.searchModel(query);

    //4. Render data from model to view
    resultView.render(model.goToPage());

    //5. Make the pagination
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

/**
 * @param {Number} page
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for updating pagination
 */
const paginationController = function (page) {
  //1. Render data from model to view
  resultView.render(model.goToPage(page));

  //2. Make the pagination button
  paginationView.render(model.state.search);
};

/**
 * @param {Number} newServings
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for updating servings in recipe view
 */
const updateServingsController = function (newServings) {
  // 1. Update the servings number in model
  model.updateServings(newServings);

  // 2. Render the recipe with the new servings
  recipeView.update(model.state.recipe);
};

/**
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for adding a recipe to bookmarks
 */
const addBookmarkController = function () {
  // 1. Add or remove bookmarked recipe to model
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.delBookmark(model.state.recipe.id);

  // 2. Update the recipe bookmark icon
  recipeView.update(model.state.recipe);

  // 3. Render the bookmarks
  bookmarkView.render(model.state.bookmarks);
};

/**
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for adding a recipe to bookmarks
 */
const bookmarksController = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**
 * @author Joshua Ochia
 * @returns {undefined}
 * @description Controller for adding a new recipe
 */
const controllAddRecipe = async function (newRecipe) {
  try {
    // 1. Show spinner
    addrecipeView.ShowSpinner();

    // 2. Upload a new recipe using model
    await model.uploadRecipe(newRecipe);

    // 3. Render the new recipe
    recipeView.render(model.state.recipe);

    // 4. Show success message
    addrecipeView.renderMessage();

    // 5. Hide hidden class after two seconds
    setTimeout(function () {
      addrecipeView.hiddenClassController();
    }, 2000);

    // 6. Render the new recipe to bookmarks
    bookmarkView.render(model.state.bookmarks);

    // 7. Change the hash for new recipe to be render
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addrecipeView.renderError(err.message);
  }
};

/**
 * @author Joshua Ochia
 * @description Initialized all event handler passed in with their specific controller
 */
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
