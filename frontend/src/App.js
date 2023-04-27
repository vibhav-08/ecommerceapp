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
import CustomerOrders from './customer/orders.js'

import SellerLogin from './seller/login.js';
import SellerRegister from './seller/register.js';
import SellerNavbar from './seller/navbar.js';
import SellerHome from './seller/home.js';
import SellerReturnItems from './seller/return.js';
import SellerSentItems from './seller/sent.js';

import WarehouseNavbar from './warehouse/navbar.js';
import WarehouseHome from './warehouse/home.js';
import WarehouseInventory from './warehouse/inventory.js';
import WarehouseLogin from './warehouse/login.js';

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
            <Route path='orders' element={<CustomerOrders/>}/>
          </Route>
          <Route path="seller" element={(<><SellerNavbar /></>)}>
            <Route path='login' element={<SellerLogin />}/>
            <Route path='register' element={<SellerRegister />}/>
            <Route path='home' element={<SellerHome />}/>
            <Route path='sentitems' element={<SellerSentItems />}/>
            <Route path='returnitems' element={<SellerReturnItems />}/>
          </Route>
          <Route path="warehouse" element={(<><WarehouseNavbar /></>)}>
            <Route path='home' element={<WarehouseHome />}/>
            <Route path='inventory' element={<WarehouseInventory />}/>
            <Route path='login' element={<WarehouseLogin />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
