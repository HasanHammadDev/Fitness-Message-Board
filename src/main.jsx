import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import TimeAgo from 'javascript-time-ago'
import { BrowserRouter as Router } from 'react-router-dom';

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);