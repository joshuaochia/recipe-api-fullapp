import { async } from 'regenerator-runtime';
import * as helper from './helper.js';
import { API_URL, RESULT_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    page: 1,
    resultPerPage: 10,
  },
};

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
};

export const goToPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;

  return state.search.results.slice(start, end);
};
