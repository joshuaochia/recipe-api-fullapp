import View from './view.js';
import icons from '../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerRemoveWindow();
  }

  /**
   * @author Joshua Ochia
   * @description Event handler for click open btn
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this.hiddenClassController.bind(this)
    );
  }

  /**
   * @author Joshua Ochia
   * @description Event handler for click close btn and overlay
   */
  _addHandlerRemoveWindow() {
    this._btnClose.addEventListener(
      'click',
      this.hiddenClassController.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this.hiddenClassController.bind(this)
    );
  }

  /**
   * @author Joshua Ochia
   * @description Refactored fanction for removing or adding hidden class
   */
  hiddenClassController() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  /**
   * @author Joshua Ochia
   * @returns {undefined}
   * @param {Function} handler
   * @description set event handler to current parent element
   */
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
