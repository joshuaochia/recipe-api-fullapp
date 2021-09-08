import View from './view.js';
import icons from '../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerRemoveWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this._hiddenClassController.bind(this)
    );
  }

  _addHandlerRemoveWindow() {
    this._btnClose.addEventListener(
      'click',
      this._hiddenClassController.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this._hiddenClassController.bind(this)
    );
  }

  _hiddenClassController() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
