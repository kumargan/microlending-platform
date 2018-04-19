// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

// Although React is not used directly herein, ReactDOM.render
// will raise an error if it's not imported.
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import routes from './routes';

ReactDOM.render(
  <div>
    <Router history={hashHistory}>{routes}</Router>
  </div>,
  document.getElementById('app')
);
