import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Home';
import Login from './component/Member/Login';
import Register from './component/Member/Register';
import Demo from './Demo';
import Blog from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import Account from './component/Account/Index';
import Details from './component/Account/Product/Details';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/demo' element={<Demo />} />
            <Route path='/blog/list' element={<Blog />} />
            <Route path='/blog/detail/:id' element={<Detail />} />
            <Route path='/account/*' element={<Account />} />
            <Route path='/detail-product/:id' element={<Details />} />
          </Route>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
