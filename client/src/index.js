import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Cities from './Cities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <>
    <Header/>
    <Cities/>
  </>
);
