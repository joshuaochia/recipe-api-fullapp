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

  update(data) {
    // Goal of this method is to use DOM updating algo to update a markup
    // generated first on render

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((El, index) => {
      const curEl = curElement[index];

      if (!El.isEqualNode(curEl) && El.firstChild.nodeValue?.trim() !== '') {
        curEl.textContent = El.textContent;
      }

      if (!El.isEqualNode(curEl)) {
        Array.from(El.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

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
