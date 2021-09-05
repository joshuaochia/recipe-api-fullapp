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
  } catch (err) {
    throw err;
  }
};

// Search recipes through query from user to API
export const searchModel = async function (query) {
  try {
    const data = await helper.renderRecipeJSON(`?search=${query}`);

    console.log(data);

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
  console.log(newServings);
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  console.log(state.recipe);
};
