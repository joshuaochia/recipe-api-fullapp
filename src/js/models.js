// Runtime imports
import { async } from 'regenerator-runtime';

// Helper imports
import * as helper from './helper.js';

// App config imports
import {
  API_URL,
  RESULT_PER_PAGE,
  START_PAGINATION_PAGE,
  API_KEY,
} from './config.js';

///////////////////////////////////////////////////////////////////// Code start here

// Temporary state (Data storing model)
export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    page: START_PAGINATION_PAGE,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * @author Joshua Ochia
 * @param {Object} data
 * @returns {Object}
 * @description return an object from destructured data
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    imageURL: recipe.image_url,
    sourceURL: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * @author Joshua Ochia
 * @param {String} id
 * @returns {undefined}
 * @description fetch data from api and create an recipe object
 */
export const recipeModel = async function (id) {
  try {
    const data = await helper.AJAX(`/${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

/**
 * @author Joshua Ochia
 * @param {String} query
 * @returns {undefined}
 * @description fetch data from api and list of recipe results
 */
export const searchModel = async function (query) {
  try {
    const data = await helper.AJAX(`?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        publisher: rec.publisher,
        imageURL: rec.image_url,
        title: rec.title,
        id: rec.id,
      };
    });
  } catch (err) {
    throw err;
  }
  state.search.page = START_PAGINATION_PAGE;
};

/**
 * @author Joshua Ochia
 * @param {Array} query
 * @returns {undefined}
 * @description Helper function for pagination
 */
export const goToPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;

  return state.search.results.slice(start, end);
};

////////////////////////////////////////
//     Updating Servings function     //
////////////////////////////////////////

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

/////////////////////////////////////////
//         Bookmarks functions         //
//   for adding and deleting a recipe  //
/////////////////////////////////////////

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (recipe) {
  // Push a new recipe to bookmarks arr
  state.bookmarks.push(recipe);

  // Add marked(boolean) property to recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const delBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
clearBookmarks;

////////////////////////////////////////
// Uploading recipe to API server and //
// saving the recipe to our own model.//
////////////////////////////////////////

export const uploadRecipe = async function (newRecipe) {
  try {
    // Return an array of object from form in controller line 101
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3) throw new Error('Wrong ingredient format');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Recreate an object using newRecipe
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Send a post request using the recreated object
    const data = await helper.AJAX(`${API_URL}/?key=${API_KEY}`, recipe);

    // Create new recipe from post request data
    state.recipe = createRecipeObject(data);

    // Add bookmarks
    addBookmarks(state.recipe);
  } catch (err) {
    throw err;
  }
};
