import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import SeachBooks from "./SeachBooks";
import { Link } from "react-router-dom";

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  };

  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array,
    none: PropTypes.array
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          currentlyReading: books.filter(books => {
            return books.shelf === "currentlyReading";
          }),
          wantToRead: books.filter(books => {
            return books.shelf === "wantToRead";
          }),
          read: books.filter(books => {
            return books.shelf === "read";
          }),
          none: books.filter(books => {
            return books.shelf === "none";
          })
        });
      }).catch(error => {
        alert(error);
      });
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(book => {
        this.componentDidMount();
      }).catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/seach"
          render={({ history }) => (
            <SeachBooks
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              onCloseSeach={() => {
                history.push("/");
              }}
              onUpdate={(book, shelf) => {
                this.onUpdate(book, shelf);
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <ListBooks
                    bookStatus="Currently Reading"
                    shelf="currentlyReading"
                    books={this.state.currentlyReading}
                    onUpdate={(book, shelf) => {
                      this.onUpdate(book, shelf);
                    }}
                  />
                  <ListBooks
                    bookStatus="Want to Read"
                    shelf="wantToRead"
                    books={this.state.wantToRead}
                    onUpdate={(book, shelf) => {
                      this.onUpdate(book, shelf);
                    }}
                  />
                  <ListBooks
                    bookStatus="Read"
                    shelf="read"
                    books={this.state.read}
                    onUpdate={(book, shelf) => {
                      this.onUpdate(book, shelf);
                    }}
                  />
                </div>
              </div>

              <div className="open-search">
                <Link to="/seach" className="open-search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
