import View from './view.js';
import icons from '../../img/icons.svg';
import previewView from './previewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipe found for your query, please try again - Try Pasta or Pizza!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(searchResult => previewView.render(searchResult, false))
      .join('');
  }
}

export default new ResultView();
