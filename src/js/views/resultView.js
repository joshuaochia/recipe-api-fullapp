import View from './view.js';
import previewView from './previewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipe found for your query, please try again - Try Pasta or Pizza!';
  _message = '';

  _generateMarkup() {
    // The behavior of this method is quite different from other markup
    // as it uses a class to render the markup from this._data
    return this._data
      .map(searchResult => previewView.render(searchResult, false))
      .join('');
  }
}

export default new ResultView();
