import React, { useEffect, useState } from 'react';
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
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownMenu
} from 'mdb-react-ui-kit';
import axios from 'axios';

function LoginButton(props) {
    return (
        <MDBBtn type="button" style={{ margin: '0 1% 0 0' }} href="/warehouse/login" color='primary'>Login</MDBBtn>
    );
}

function LogoutButton(props) {

    const handleLogout = () => {
        axios.post('/warehouse/login/logout').then(() => {
            window.localStorage.removeItem('warehouse');
            window.location.href = '/warehouse/home';
        }
        );
    }

    return (
        <MDBDropdown>
            <MDBDropdownToggle tag='a' className='btn btn-primary'>
                {props.value}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBBtn onClick={handleLogout}>Logout</MDBBtn>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}

export default function App() {
    const [showNav, setShowNav] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('/warehouse/login').then((res, err) => {
            fetchUserName(res, err);
        })
    }, []);

    const fetchUserName = (res, err) => {
        console.log(res);
        if (err) {
            setUsername('');
        }
        else {
            setUsername(res.data.user);
            window.localStorage.setItem('warehouse', res.data.user);
        }
        console.log(username);
    }

    return (
        <div>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/warehouse/home'>Platform</MDBNavbarBrand>
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
                                <MDBNavbarLink active aria-current='page' href='/warehouse/home'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/warehouse/inventory'>Inventory</MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                        <div>
                            {username === '' || username === null || username === undefined
                                ? <LoginButton />

                                : <LogoutButton value={username} />
                            }
                        </div>
                    </MDBCollapse>

                </MDBContainer>

            </MDBNavbar>
            <Outlet />
        </div>
    );
}