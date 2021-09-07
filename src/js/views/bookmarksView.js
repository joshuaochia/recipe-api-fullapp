import View from './view.js';
import previewView from './previewView.js';

class BookMarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  // _generateMarkup() {
  //   // Create a list of html to view in result container
  //   const id = window.location.hash.slice(1);
  //   return this._data
  //     .map(data => {
  //       return `<li class="preview">
  //     <a class="preview__link ${
  //       data.id === id ? 'preview__link--active' : ''
  //     }" href="#${data.id}">
  //       <figure class="preview__fig">
  //         <img src="${data.imageURL}" alt="${data.title}" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${data.title}</h4>
  //         <p class="preview__publisher">${data.publisher}</p>
  //       </div>
  //     </a>
  //   </li>`;
  //     })
  //     .join('');
  // }
}

export default new BookMarkView();
