import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store'; 
import Root from './routes/root'; 
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Root /> {/* Sử dụng Root component */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
