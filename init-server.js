import http from 'http';
import express from 'express';
import { create } from 'laxar';
import artifacts from 'laxar-loader/artifacts?flow=main&theme=default';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

require('es6-promise').polyfill();


const config = {
   name: 'simple-laxar-app',
   router: {
      query: {
         enabled: true
      },
      navigo: {
         useHash: true
      }
   },
   logging: {
      threshold: 'TRACE'
   },
   theme: 'default'
};

const dom = new JSDOM('<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>simple-laxar-app</title>' +
                      '<link href="init-client.bundle.css" rel="stylesheet" type="text/css"></head><body>' +
                      '<div><p>Info: This is the SSR Version of LaxarJS Application</p></div>' +
                      '<div data-ax-page></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;

const element = document.querySelector( '[data-ax-page]' );

create( [], artifacts, config )
   //.flow( 'main', element )
   .page( 'home', element )
   .bootstrap()
   .then( () => {
      const content = dom.window.document.documentElement.outerHTML;

      const app = express();
      app.get('/', (req, res) => {
         res.send(content)
      });

      app.use(express.static('build')); //Provide directory with CSS file

      const server = http.createServer(app);
      let currentApp = app;

      server.listen(3000);

      if (module.hot) {
         module.hot.accept('./server', () => {
            server.removeListener('request', currentApp);
            server.on('request', app);
            currentApp = app
         })
      }
   } );

