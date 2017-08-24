import http from 'http';
import express from 'express';
import { create } from 'laxar';
import artifacts from 'laxar-loader/artifacts?flow=main&theme=default';


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

const element = ''; //document.querySelector( '[data-ax-page]' )

create( [], artifacts, config )
   .flow( 'main', element )
   .bootstrap();

const app = express();
app.get( '/', (req, res) => {
   res.send( 'hello' + JSON.stringify( artifacts ) )
} );

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
