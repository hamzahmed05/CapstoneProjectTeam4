import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware} from 'redux' 
import rootReducer from './reducer/rootReducer'
import {Provider} from 'react-redux' // binds redux with our react application
import thunk from 'redux-thunk'  // used for middleware, needed for async functions.objects

// thunk is a store enhancer, this enhances our store functionality
// (can return functions with this that interact with our database)
const store = createStore(rootReducer, applyMiddleware(thunk)); 


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
