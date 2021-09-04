import View from './view.js';
import icons from '../../img/icons.svg';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipe found for your query, please try again - Try Pasta or Pizza!';
  _message = '';

  _generateMarkup() {
    // Create a list of html to view in result container
    const id = window.location.hash.slice(1);
    return this._data
      .map(data => {
        return `<li class="preview">
      <a class="preview__link ${
        data.id === id ? 'preview__link--active' : ''
      }" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.imageURL}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
        </div>
      </a>
    </li>`;
      })
      .join('');
  }
}

export default new ResultView();
