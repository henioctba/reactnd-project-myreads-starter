import React, { Component }  from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import SeachBooks from './SeachBooks'
import { Link } from 'react-router-dom'


class BooksApp extends Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
    query: '',
    books: []
  }

  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array,
    none: PropTypes.array
  }


  componentDidMount(){
    BooksAPI.getAll().then( ( books ) => {
      
      this.setState({ currentlyReading: (books.filter((books) => { return  books.shelf === 'currentlyReading' }))} )
      this.setState({ wantToRead: (books.filter((books) => { return  books.shelf === 'wantToRead' }))} )
      this.setState({ read: (books.filter((books) => { return  books.shelf === 'read' }))} )
      this.setState({ none: (books.filter((books) => { return  books.shelf === 'none' }))} )
      
        
    })
  }


  onUpdate = (book, shelf ) => {
      BooksAPI.update(book, shelf).then(book => {
      this.componentDidMount()
    })
  }
 
  updateQuery = ( query ) => {
    this.setState({query: query.trim() });
  }


  seachQuery = ( query ) => {
    query = query.trim()
    let listBooks = []
    
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (!books.error){
          let tListaBookStatus = this.state.read.concat(this.state.currentlyReading.concat(this.state.wantToRead) )
        
          books.map(function (emp) {
            var company = tListaBookStatus.filter(function (comp) {
                return comp.id === emp.id;
            })[0];
            
            if (company){
              listBooks.push(company)
            }else{
              listBooks.push(emp);
            }
            return listBooks
            
        });
        
          
          this.setState({ books: listBooks })
        }else{
          this.setState({ books: [] })   
        }
      })      
    }else{
        this.setState({ books: [], query: query  })
    }
  };

  closeSeach = (seach) => {
    this.setState({ showSearchPage: seach })
  }

  defaultValueShelf =  book => {
    
    return 'read'
  }

  render() {
    return (
      <div className="app">
         
        {this.state.showSearchPage ? (
           <Route path="/seach" render={({ history }) => (
              <SeachBooks 
                  books={this.state.books}
                  onSeachQuery={this.seachQuery}
                  defaultValueShelf={(book) => {this.defaultValueShelf(book)}}
                  onCloseSeach={ (seach) => {
                      this.closeSeach(seach)
                      history.push('/')
                  
                  }}
                  onUpdate={(book, shelf) => {
                    this.onUpdate(book, shelf)  
                  } 
                }

              />
              
           )}/>
        ) : (
          <Route exact path="/" render={() => (
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
                                  this.onUpdate(book, shelf)  
                                } 
                              }
                        />
                      <ListBooks 
                              bookStatus="Want to Read" 
                              shelf="wantToRead"
                              books={this.state.wantToRead}
                              onUpdate={(book, shelf) => {
                                this.onUpdate(book, shelf)  
                                }
                              } 
                        />
                        <ListBooks 
                              bookStatus="Read" 
                              shelf="read"
                              books={this.state.read}
                              onUpdate={(book, shelf) => {
                                this.onUpdate(book, shelf)  
                                } 
                              }
                        />
                    
                  
                  </div>
                </div>
                <div className="open-search">
                  <Link
                            to='/seach'
                            className='open-search'
                            onClick={() => this.setState({ showSearchPage: true })}
                        >Add a book</Link>
                </div>
              </div>
            )}
            />
        )}
        
      </div>
    )
  }
}

export default BooksApp
