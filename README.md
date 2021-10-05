# Weather forecast

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction
The web page to display the location weather forecast information of 5 most recent days using [Metaweather API](https://www.metaweather.com/api/).

Using [cors-anywhere](https://github.com/Rob--W/cors-anywhere) to bypass CORS issues of Metaweather API.

## Prequesites

NodeJs v16.0.0
Yarn v1.22.10

## Available Scripts

In the project directory, you can run:
### `yarn start-proxy`

Runs the reversed proxy server in the development mode.\
The proxy server will run on [http://localhost:8080](http://localhost:8080) to forward all frontend requests to the Metaweather API server.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Run and fix any eslint issues.
