import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC, API_URL } from './config.js';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// const URL = `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`;

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(`${API_URL}${url}`);

    const data = await fetchPro.json();
    if (!fetchPro.ok)
      throw new Error(
        `${data.message}, ${fetchPro.statusText}:(${fetchPro.status})`
      );
    return data;
  } catch (err) {
    throw err;
  }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const res = await fetch(`${url}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(`${data.message}, ${res.statusText}:(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const renderRecipeJSON = async function (id) {
//   try {
//     const res = await fetch(`${API_URL}${id}`);
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(`${data.message}, ${res.statusText}:(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
