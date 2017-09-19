/**
 * Copyright 2017
 */
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

create( [  ], artifacts, config )
// Uncomment to use the LaxarJS developer tools (https://chrome.google.com/webstore/search/LaxarJS):
// .tooling( require( 'laxar-loader/debug-info?flow=main&theme=default' ) )
   .page( 'home', document.querySelector( '[data-ax-page]' ) )
  // .flow( 'main', document.querySelector( '[data-ax-page]' ) )
   .bootstrap();
