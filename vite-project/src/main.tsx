import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './routes/root'; // Import Root component từ file root.tsx
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root /> {/* Sử dụng Root component */}
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
