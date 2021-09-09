class SearchView {
  #searchForm = document.querySelector('.search');

  /**
   * @returns {undefined}
   * @param {Function} handler
   * @author Joshua Ochia
   * @description Add submit event to the search form and execute the handler passed in.
   */
  addEventHandler(handler) {
    this.#searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  /**
   * @returns {undefined}
   * @author Joshua Ochia
   * @description Get the query as a string in search form when submitted
   */
  getQuery() {
    return document.querySelector('.search__field').value;
  }
}

export default new SearchView();
