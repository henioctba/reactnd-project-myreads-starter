import React, { Component } from "react";
import PropTypes from "prop-types";

class SeachBooks extends Component {
  static propTypes = {
    onSeachQuery: PropTypes.func.isRequired,
    books: PropTypes.array,
    showSearchPage: PropTypes.string,
    onCloseSeach: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  styleDef = book => {
    let style = {
      width: 128,
      height: 193,
      backgroundImage: ""
    };
    if (book.imageLinks) {
      style.backgroundImage = 'url("' + book.imageLinks.thumbnail + ")";
    }
    return style;
  };

  defaultValueDef = book => {
    if (book.shelf){
      return book.shelf
    }else{
      return "none"
    }
  }

  render() {
    const { onSeachQuery, books, onCloseSeach, onUpdate } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => onCloseSeach(false)}>
                  Close
                </a>

                <div>
                  {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={event => onSeachQuery(event.target.value)}
                  />
                  <div>
                    {books.length > 0 && (
                      <ol className="books-grid">
                        {books.map(book => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={this.styleDef(book)}
                                />

                                <div className="book-shelf-changer">
                                    <select
                                        defaultValue={ this.defaultValueDef(book)}
                                        onChange={(event) =>   onUpdate(book, event.target.value)}
                                    >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeachBooks;
