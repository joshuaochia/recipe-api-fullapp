import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC, API_URL } from './config.js';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
