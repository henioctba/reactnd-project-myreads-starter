# Projeto MyReads

Aplicação de estante de livros que permite selecionar e classificar os livros que você já leu, está lendo ou quer ler. O projeto enfatiza o uso de React para criar a aplicação e fornece um servidor de API e uma biblioteca cliente.

## Instalação

```js
$ git clone https://github.com/henioctba/reactnd-project-myreads-starter.git
$ cd  reactnd-project-myreads-starter
$ npm install
```

## O que você está obtendo
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # A pequena coleção na lista de permissões de termos de pesquisa disponíveis para você usar com seu aplicativo.
├── package.json # Arquivo do gerenciador de pacotes npm. É improvável que você precise modificar isso.
├── public
│   ├── favicon.ico # Reagir Ícone, Você pode mudar se desejar.
│   └── index.html # Não modificar
└── src
    ├── App.css # Estilos para o seu aplicativo. Sinta-se livre para personalizar isso como você deseja.
    ├── App.js # Esta é a raiz do seu aplicativo. Contém HTML estático no momento.
    ├── App.test.js # Usado para teste. Fornecido com o Create React App. O teste é incentivado, mas não é obrigatório.
    ├── BooksAPI.js # Uma API JavaScript para o backend Udacity fornecido. Instruções para os métodos estão abaixo.
    ├── BooksGrid.js # Grid com a lista de livro - Componente funcional
    ├── icons # Imagens úteis para seu aplicativo. Use a seu critério..
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # Estilos globais. Você provavelmente não precisará mudar nada aqui.
    ├── ListBooks.js # Minha estante de livro
    └── SeachBooks.js # Localizar livro

```

```
## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
```