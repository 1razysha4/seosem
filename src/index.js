/*
 * import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route  } from 'react-router-dom'
import Routes from './routes'
ReactDOM.render(
  <HashRouter>
    <Routes />
  </HashRouter>, document.getElementById('root')
);

*/

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import Seosem from './components/Seosem';
import SeosemDetails from './components/SeosemDetails';
import App from './App';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




