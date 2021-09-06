import icons from '../../img/icons.svg';

export default class View {
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    // Clearing the inner html
    this.clearParent();

    // Generate a html code
    const markup = this._generateMarkup();

    // Insert html
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {}

  ShowSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clearParent() {
    // Clear the container innher html
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this.clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this.clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
