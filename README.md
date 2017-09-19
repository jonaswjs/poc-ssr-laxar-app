# A PoC for Server Side Rendering with LaxarJS

This is a simple App with modified LaxarJS to experiment with SSR.

The app only has one page and one simple plain widget.
By now the server side rendering is implemented with jsdom and only renders pages and no flow with routing.


## Setup

```
git clone --recursive https://github.com/jonaswjs/poc-ssr-laxar-app.git
cd poc-ssr-laxar-app
npm install
rm -rf node_modules/laxar
```

## Development

To start the server for the ssr version and a webpack development server for the client side rendered version:
```
npm run development
```

Or only the client side rendered version:
```
npm run client:start
```

For the server side rendered version:
```
npm run server:watch
npm run server:start
```




