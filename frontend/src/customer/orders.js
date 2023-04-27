import React from "react";
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
    MDBBtn,
    MDBInputGroup
} from "mdb-react-ui-kit";

function OTPPrompt(props) {
    const [otp, setOtp] = useState('');

    const handleReceive = () => {
        const recotp = props.otp;
        if (otp !== recotp) {
            console.log('Wrong OTP');
            window.alert('Wrong OTP');
        }
        else {
            axios.post('/orders/changeorderstatus', { cart_id: props.cart_id, status: 'received' })
                .then((res) => {
                    console.log(res.data.msg);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <div>
            <MDBInputGroup noWrap textBefore='@'>
                <input className='form-control' type='text' placeholder='Enter OTP to Receive item' onChange={(e) => setOtp(e.target.value)} />
            </MDBInputGroup>

            <MDBBtn onClick={handleReceive}> Receive </MDBBtn>
        </div>
    );
}

function OrderItem(props) {
    const handleReturn = () => {
        axios.post('/orders/changeorderstatus', { cart_id: props.cart_id, status: 'returned' })
            .then((res) => {
                console.log(res.data.msg);
                const modifyPayment = {
                    email: localStorage.getItem('username'),
                    route: 'plus',
                    cartprice: props.customer_amount
                }
                axios.post('/accounts/modifybalance', modifyPayment)
                    .then((res) => {
                        console.log(res)
                        axios.post('/accounts/modifybalance', { email: props.seller_email, route: 'minus', cartprice: props.seller_amount });
                        
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <MDBCard
            className="card-stepper"
            style={{ borderRadius: "16px", marginBottom: "2%" }}
        >
            <MDBCardHeader className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted mb-2">
                            {" "}
                            Cart ID{" "}
                            <span className="fw-bold text-body">{props.cart_id}</span>
                        </p>
                    </div>
                </div>
            </MDBCardHeader>
            <MDBCardBody className="p-4">
                <div className="d-flex flex-row mb-4 pb-2">
                    <div className="flex-fill">
                        <MDBTypography tag="h5" className="bold">
                            {props.item_name} {/* Item name */}
                        </MDBTypography>
                        <p className="small mb-0">{props.seller_name}</p>
                        <p className="text-muted"> Qt: {props.quantity}</p>
                        <MDBTypography tag="h4" className="mb-3">
                            {" "}
                            Customer Amount{" "}  {/*Customer amount */}
                            <span className="small text-muted"> {props.customer_amount} </span>
                        </MDBTypography>
                        <p className="text-muted">
                            Tracking Status :{" "} {/*order_status */}

                            <div>
                                {props.order_status === 'dispatched'
                                    ? <span className="text-body">Dispatched from seller</span>
                                    : (props.order_status === 'warehouse'
                                        ? <span className="text-body">In {props.order_status} {props.warehouse}, {props.addr}, {props.city}</span>
                                        : (props.order_status === 'receive_req'
                                            ? <div>
                                                <MDBTypography tag="h5" className="mb-3">
                                                    {" "}
                                                    OTP for Receival{" "}  {/*Customer amount */}
                                                    <span className="small text-muted"> {props.otp} </span>
                                                </MDBTypography>
                                                <OTPPrompt otp={props.otp} cart_id={props.cart_id} />
                                            </div>

                                            : (props.order_status === 'received'
                                                ? <span className="text-body">Item Received</span>
                                                : (props.order_status === 'returned'
                                                    ?<>Item Returned</>
                                                    :<></>)
                                            )
                                        )
                                    )
                                }
                            </div>
                        </p>

                    </div>

                </div>

            </MDBCardBody>
            <MDBCardFooter className="p-4">
                <div className="d-flex justify-content-between">
                    {props.order_status === 'dispatched' || props.order_status === 'warehouse' || props.order_status === 'received'
                        ? <MDBTypography tag="h5" className="fw-normal mb-0">
                            <MDBBtn onClick={handleReturn}>Return</MDBBtn>
                        </MDBTypography>
                        : <></>
                    }
                    <div className="border-start h-100"></div>

                </div>
            </MDBCardFooter>
        </MDBCard>
    );
}

export default function OrderDetails() {
    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        axios.post('/customer/getorders', { customer_email: window.localStorage.getItem('username') })
            .then((res, err) => {
                setOrderItems(res.data.msg);
                console.log(res.data.msg);
            })
    }, []);

    return (
        <>
            <section className="vh-100 gradient-custom-2">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center h-100">
                        <MDBCol md="10" lg="8" xl="6">
                            {orderItems.map((order) => <OrderItem seller_email={order.seller_email} seller_amount={order.seller_amount} otp={order.otp} cart_id={order.cart_id} item_name={order.item_name} seller_name={order.seller_name} customer_amount={order.customer_amount} order_status={order.status} quantity={order.cart_quantity} warehouse={order.warehouse_id} addr={order.w_addr} city={order.w_city} />)}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}