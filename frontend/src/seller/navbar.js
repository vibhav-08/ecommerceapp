import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/seller/home'>Platform</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/seller/home'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Orders</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
            <MDBBtn type="button" style={{margin: '0 1% 0 0'}} href="/seller/register" color='primary'>Register</MDBBtn>
            <MDBBtn type="button" href="/seller/login" color='primary'>Login</MDBBtn>
          </MDBCollapse>

        </MDBContainer>

      </MDBNavbar>
      <Outlet />
    </div>
  );
}