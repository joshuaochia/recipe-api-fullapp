class SearchView {
  #searchForm = document.querySelector('.search');

  addEventHandler(handler) {
    this.#searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    return document.querySelector('.search__field').value;
  }
}

export default new SearchView();
