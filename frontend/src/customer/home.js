import React from 'react';
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
    MDBRange,
    MDBBtn
} from "mdb-react-ui-kit";

function Item(props) {
    const [qty, setQty] = useState(0);

    const addToCart = () => {
        const newCart = {
            customer_email: localStorage.getItem('username'),
            seller_email: props.seller_email,
            quantity: qty,
            itemno: props.itemno
        }
        axios.post('/customer/additemtocart', newCart)
        .then((res) => console.log(res.data.msg))
        .catch((err) => console.log(err));
    }
    return (

        <MDBCard className="mb-4">
            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">

                        <div className="ms-3">
                            <MDBTypography tag="h4">
                                {props.item_name}
                            </MDBTypography>
                            {/* <p className="small mb-0">{props.item_type}</p> */}
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "200px" }}>
                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                {props.shop_name}
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
                <div className="d-flex justify-content" style={{ marginTop: '5%' }}>
                    <MDBRange
                        defaultValue={1}
                        min='0'
                        max={props.maxval}
                        step='1'
                        id='customRange3'
                        label='Quantity'
                        style={{ padding: '0 10% 0 10%' }}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </div>
                <MDBBtn style={{ marginTop: '2%' }} onClick={addToCart}>Add to Cart</MDBBtn>
            </MDBCardBody>

        </MDBCard>
    );
}

const Home = () => {
    const [inventory, setInventory] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios.post('/customer/fetchinventory', {})
            .then((res) => {
                console.log(res.data.msg);
                setInventory(res.data.msg);
            })
    }, []);

    const handleQuery = () => {
        axios.post('/customer/fetchsearch', {searchparam: '%'+query+'%'})
            .then((res) => {
                console.log(res.data.msg);
                setInventory(res.data.msg);
            })
    }

    return (
        <>
            <form style={{marginTop:'1%'}} className='d-flex input-group w-auto'>
                <input type='search' onChange={(e) => setQuery(e.target.value)} className='form-control' placeholder='Search items' aria-label='Search' />
                <MDBBtn color='primary' type='button' onClick={handleQuery}>Search</MDBBtn>
            </form>
            <section className="vh-100 gradient-custom-2">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center h-100">
                        <MDBCol md="10" lg="8" xl="6">
                            {inventory.map((order) => <Item seller_email={order.seller_email} maxval={order.quantity} item_name={order.item_name} item_type={order.item_type} shop_name={order.shop_name} price={order.price} itemno={order.itemno} />)}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}

export default Home;

