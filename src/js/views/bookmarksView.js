import View from './view.js';
import previewView from './previewView.js';

class BookMarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';
  _message = '';

  /**
   * @author Joshua Ochia
   * @returns {undefined}
   * @param {Function} handler
   * @description set event handler to current parent element
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // The behavior of this method is quite different from other markup
    // as it uses a class to render the markup from this._data
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookMarkView();
