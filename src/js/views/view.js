import icons from '../../img/icons.svg';

export default class View {
  /**
   *
   * @param {Object | Object[] } data - Data to be render in dom
   * @param {boolean} [render=true] - if false generate a markup only
   * @returns {undefined | string}
   * @this {Object} View instance
   * @author Joshua Ochia
   */
  render(data, render = true) {
    // 1. Check the data exist or (array and length : 0)
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // 2. Set the data to private property
    this._data = data;

    // 3. Clearing the inner html
    this.clearParent();

    // 4. Generate a html code (Generate markup is used in child classes)
    const markup = this._generateMarkup();

    // 5. Check render value
    if (!render) return markup;

    // 6. Insert html
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   *
   * @param {Object | Object[] } data - Data to be updated on existing DOM
   * @returns {undefined}
   * @author Joshua Ochia
   * @description Updating the existing DOM with new data.
   */
  update(data) {
    // 1. Check the data exist or (array and length : 0)
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // 2. Set the data to private property
    this._data = data;

    // 3. Generate a html code (Generate markup is used in child classes)
    const newMarkup = this._generateMarkup();

    // 4. Create a new contextual DOM with generated markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // 5. Select all the elements from new created DOM then transform in array
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // 6. Select current DOM and transform in array
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    // 7. Loop through new elements and check if there's a different el or node
    // if there's a difference - Update the curEl with newEl
    newElements.forEach((El, index) => {
      const curEl = curElement[index];

      if (!El.isEqualNode(curEl) && El.firstChild?.nodeValue?.trim() !== '') {
        curEl.textContent = El.textContent;
      }

      if (!El.isEqualNode(curEl)) {
        Array.from(El.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * @returns {undefined}
   * @author Joshua Ochia
   * @description Insert the spinner markup to the current parent element
   */
  ShowSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * @returns {undefined}
   * @author Joshua Ochia
   * @description Clear the innerhtml of current parentElement
   */
  clearParent() {
    this._parentElement.innerHTML = '';
  }

  /**
   * @returns {undefined}
   * @param {String} [message]
   * @author Joshua Ochia
   * @description Handy method for child class rendering message
   */
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

  /**
   * @returns {undefined}
   * @param {String} [message]
   * @author Joshua Ochia
   * @description Handy method for child class rendering error message to insert in the child class parent el
   */
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
