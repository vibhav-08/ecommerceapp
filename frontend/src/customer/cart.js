import axios from "axios";
import { useRef, useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

function CartItem(props) {

    return (
        <MDBCard className="mb-3">
            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="ms-3">
                            <MDBTypography tag="h5">
                                {props.itemname}
                            </MDBTypography>
                            <p className="small mb-0">{props.sellername}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "50px" }}>
                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                {props.quantity}
                            </MDBTypography>
                        </div>
                        <div style={{ width: "80px" }}>
                            <MDBTypography tag="h5" className="mb-0">
                                {props.price}
                            </MDBTypography>
                        </div>
                        <a href="#!" style={{ color: "#cecece" }}>
                            <MDBIcon fas icon="trash-alt" />
                        </a>
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>);
}

export default function Basic() {
    const initList = [];
    const [cartItems, setCartItems] = useState(initList);
    // const [sellersList, setSellers] = useState(initList);
    // const [itemsList, setItems] = useState(initList);
    // var sellers = []; var items = [];


    useEffect(() => {
        axios.post('/customer/getcart', { customer_email: window.localStorage.getItem('username') })
            .then((res, err) => {
                setCartItemsfunc(res, err);

            })
    }, []);

    const setCartItemsfunc = (res, err) => {
        console.log(res.data.msg);
        if (res.data.msg.length !== 0) {
            setCartItems(res.data.msg);
        }
        console.log(cartItems);
    }


    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        <MDBTypography tag="h5">
                                            <a href="#!" className="text-body">
                                                <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                                                shopping
                                            </a>
                                        </MDBTypography>

                                        <hr />

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                            </div>
                                            <div>
                                                <p>
                                                    <span className="text-muted">Sort by:</span>
                                                    <a href="#!" className="text-body">
                                                        price
                                                        <MDBIcon fas icon="angle-down mt-1" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                cartItems.map((cartItem) => <CartItem quantity={cartItem.cart_quantity} price={cartItem.cart_price} sellername={cartItem.seller_name} itemname={cartItem.item_name} />)
                                            }
                                        </div>

                                    </MDBCol>

                                    <MDBCol lg="5">
                                        <MDBCard className="bg-primary text-white rounded-3">
                                            <MDBCardBody>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        Card details
                                                    </MDBTypography>
                                                </div>

                                                {/* <p className="small">Card type</p>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                </a> */}
                                                {/* Got to include the bank dropdown to chose bank */}

                                                <form className="mt-4">
                                                    <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                                        placeholder="Cardholder's Name" contrast />

                                                    <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                                                        placeholder="Account Number" contrast />


                                                    <MDBInput className="mb-4" label="Cvv" type="text" size="lg" placeholder="&#9679;&#9679;&#9679;&#9679;" contrast />

                                                </form>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">$4798.00</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Shipping</p>
                                                    <p className="mb-2">$20.00</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total(Incl. taxes)</p>
                                                    <p className="mb-2">$4818.00</p>
                                                </div>

                                                <MDBBtn color="info" block size="lg">
                                                    <div className="d-flex justify-content-between">
                                                        <span>$4818.00</span>
                                                        <span>
                                                            Checkout{" "}
                                                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                        </span>
                                                    </div>
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}