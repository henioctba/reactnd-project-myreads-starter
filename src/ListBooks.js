import React, { Component } from "react";
import PropTypes from "prop-types";
import BooksGrid from "./BooksGrid";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  changeBackGroundImage(backgroundImage) {
    this.setState({
      backgroundImage
    });
  }

  render() {
    const { books, onUpdate } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookStatus}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={books} onUpdate={onUpdate} />
        </div>
      </div>
    );
  }
}

export default ListBooks;
