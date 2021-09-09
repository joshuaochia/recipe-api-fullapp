import View from './view.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipe found for your query, please try again';
  _message = '';

  /**
   * @author Joshua Ochia
   * @returns {string}
   * @description - Generate markup but with checking of data page
   */
  _generateMarkup() {
    let pageNum = +this._data.page;
    const lastNum = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // 1. Check if the page is on number 1
    if (pageNum === 1) {
      return `<button data-go-to-page="${
        pageNum + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${pageNum + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // 2. Check if page is >1
    if (pageNum > 1 && pageNum !== lastNum) {
      return `<button data-go-to-page="${
        pageNum - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${pageNum - 1}</span>
    </button>
    <button data-go-to-page="${
      pageNum + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${pageNum + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // 3. Check if last page
    if (pageNum === lastNum) {
      return `<button data-go-to-page="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>`;
    }

    return '';
  }

  /**
   * @author Joshua Ochia
   * @returns {undefined}
   * @param {Function} handler
   * @description set event handler to current parent element
   */
  addEventHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      handler(btn.dataset.goToPage);
    });
  }
}

export default new PaginationView();
