import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerLogin from './customer/login.js';
import CustomerRegister from './customer/register.js';
import CustomerNavbar from './customer/navbar.js';
import CustomerHome from './customer/home.js';
import CustomerCart from './customer/cart.js';

import SellerLogin from './seller/login.js';
import SellerRegister from './seller/register.js';
import SellerNavbar from './seller/navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="wrapper">
      <Router>
      
        <Routes>
          <Route path="customer" element={<CustomerNavbar />}>
            <Route path='login' element={<CustomerLogin />}/>
            <Route path='register' element={<CustomerRegister />}/>
            <Route path='home' element={<CustomerHome />}/>
            <Route path='cart' element={<CustomerCart />}/>
          </Route>
          <Route path="seller" element={(<><SellerNavbar /></>)}>
            <Route path='login' element={<SellerLogin />}/>
            <Route path='register' element={<SellerRegister />}/>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
