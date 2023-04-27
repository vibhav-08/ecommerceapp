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
    MDBBtn
} from "mdb-react-ui-kit";

function OrderItem(props) {
    const handleReturn = () => {

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
                        <p className="small mb-0"> Sold by : {props.seller_email}</p>
                        <p className="small mb-0"> Bought by : {props.customer_email}</p>
                        <p className="text-muted"> Qty : {props.quantity}</p>
                        
                    </div>

                </div>

            </MDBCardBody>
            
        </MDBCard>
    );
}

export default function Inventory() {
    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        axios.post('/warehouse/getinventory', { email: window.localStorage.getItem('warehouse') })
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
                            {orderItems.map((order) => <OrderItem cart_id={order.id} item_name={order.name} quantity={order.quantity} seller_email={order.seller_email} customer_email={order.customer_email} />)}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}