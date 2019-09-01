![Pokedex](https://github.com/yusufff/pokedex/blob/master/art.jpg?raw=true)

# Pokedex
> Pokémon Encyclopedia

## Installing / Getting started

To get started, you need a JavaScript package manager such as [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```shell
git clone git@github.com:yusufff/pokedex.git
cd pokedex/
yarn install
yarn run build
```

This creates a build directory with a production build of your app. Set up your favorite HTTP server to serve this folder so that you can start using production build.

## Developing

### Built With

[React](https://github.com/facebook/react), [Create-React-App](https://github.com/facebook/create-react-app)

### Prerequisites

You need a JavaScript package manager such as [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to start developing.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone git@github.com:yusufff/pokedex.git
cd pokedex/
yarn install
yarn start
```

Then open the localhost url that you see on the terminal to see Pokedex.

### Building

When you’re ready to deploy to production, create a minified bundle with:

```shell
yarn test
yarn run build
```

Builds Pokedex for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Pokedex is ready to be deployed.

### Components

Every component folder contains an `index.js` file that exports by default the component and a `styles` folder that contains `css` files with the same name with component's folder.

### Services

Services folder is the folder that we keep our service files such as API, LocalStorage, History etc.

### Routing

Routing is done by `App.js` file in the `src` folder. We use [react-router v4](https://github.com/ReactTraining/react-router) for routing.