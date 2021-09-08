// Runtime imports
import { async } from 'regenerator-runtime';

// Helper imports
import * as helper from './helper.js';

// App config imports
import { API_URL, RESULT_PER_PAGE, START_PAGINATION_PAGE } from './config.js';

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

// Fetching the recipe data from API
export const recipeModel = async function (id) {
  try {
    const data = await helper.renderRecipeJSON(`/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      imageURL: recipe.image_url,
      sourceURL: recipe.source_url,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

// Search recipes through query from user to API
export const searchModel = async function (query) {
  try {
    const data = await helper.renderRecipeJSON(`?search=${query}`);

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

// Helper function for pagination
export const goToPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarks
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
