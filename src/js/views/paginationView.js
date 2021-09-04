import View from './view.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipe found for your query, please try again';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    if (this._data.page === 1) {
      return `<button data-go-to-page="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page 3</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return `<button data-go-to-page="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page 1</span>
  </button>`;
  }

  addEventHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      console.log(this._data);
      console.log(btn.dataset.goToPage);
    });
  }
}

export default new PaginationView();
