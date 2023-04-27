import axios from "axios";
import { useRef, useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownMenu

} from "mdb-react-ui-kit";
import React from "react";

function CartItem(props) {

    const handleRemove = () => {
        const data = {
            itemno: props.itemno,
            seller_email: props.seller_email,
            customer_email: props.customer_email
        }
        axios.post('/customer/deletecartitem', data)
            .then((res) => {
                if (res.data.msg === 'Success') {
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert('Try again!');
            })
    }

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
                        <MDBBtn onClick={handleRemove}>Remove</MDBBtn>
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>);
}

export default function Basic() {
    const initList = [];
    const [cartItems, setCartItems] = useState(initList);
    const [bankDetails, setBankDetails] = useState(initList);
    const [coupons, setCoupons] = useState(initList);
    const [bankRegno, setBankRegno] = useState('');
    const [couponName, setCouponName] = useState('Choose a Coupon');
    const [advertiser, setAdvertiser] = useState('');

    const [chooseBank, setChooseBank] = useState('Choose a Bank');
    // const [sellersList, setSellers] = useState(initList);
    // const [itemsList, setItems] = useState(initList);
    // var sellers = []; var items = [];
    const [accountNumber, setAccountNumber] = useState('');
    const [pin, setPin] = useState('');
    const [shippingPrice, setShippingPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netprice, setNetPrice] = useState(0);


    useEffect(() => {
        axios.post('/customer/getcart', { customer_email: window.localStorage.getItem('username') })
            .then((res, err) => {
                setCartItemsfunc(res, err);
                axios.post('/customer/getbanks', { email: window.localStorage.getItem('username') })
                    .then((res, err) => {
                        setBanksfunc(res, err);
                        axios.get('/getcoupon')
                            .then((res, err) => {
                                setCouponsfunc(res, err);
                            })
                    })
            })
    }, []);

    const setCouponsfunc = (res, err) => {
        console.log(res.data.msg);
        setCoupons(res.data.msg);
    }

    const setBanksfunc = (res, err) => {
        console.log(res.data.msg);
        setBankDetails(res.data.msg);
        console.log(bankDetails);
    }

    const setCartItemsfunc = (res, err) => {
        console.log(res.data.msg);
        if (res.data.msg.length !== 0) {
            setCartItems(res.data.msg);
        }
        const itemDetails = res.data.msg;
        var totPr = 0
        for (let i = 0; i < itemDetails.length; i++) {
            totPr += itemDetails[i].cart_price;
        }
        setTotalPrice(totPr);
        console.log(totPr);
        setShippingPrice(Math.round((0.01 * totPr + Number.EPSILON) * 100) / 100);
        console.log(cartItems);
        setDeliveryPrice((Math.round((1.01 * totPr + Number.EPSILON) * 100) / 100));
        setNetPrice((Math.round((1.01 * totPr + Number.EPSILON) * 100) / 100));
    }

    const handleBankName = (e) => {
        console.log(e.target.text);
        setBankRegno(e.target.text.split("-")[0]);
        setChooseBank(e.target.text.split("-")[1]);
    }

    const handleCoupon = (e) => {
        setCouponName(e.target.text.split(" - ")[0].split("-")[1]);
        setAdvertiser(e.target.text.split(" - ")[0].split("-")[0]);
        setDiscount(parseFloat(e.target.text.split(" - ")[1].split('/')[0]));
        console.log(deliveryPrice, discount);
        var nonround = (deliveryPrice - parseFloat(e.target.text.split(" - ")[1].split('/')[0]));
        setNetPrice((Math.round((nonround + Number.EPSILON) * 100) / 100));
    }

    const handlePayment = () => {
        const buyCartReq = {
            account_number: accountNumber,
            pin: pin,
            bank_regno: bankRegno,
            route: 'minus',
            cartprice: netprice
        }
        axios.post('/customer/buycart', buyCartReq)
            .then((res) => {
                console.log(res);
                const modifyPayment = {
                    email: advertiser,
                    route: 'minus',
                    cartprice: discount
                }
                axios.post('/accounts/modifybalance', modifyPayment)
                    .then((res) => {
                        console.log(res)
                        const requests = cartItems.map((cartItem) => axios.post('/accounts/modifybalance', { email: cartItem.seller_email, route: 'plus', cartprice: cartItem.cart_price }));
                        axios.all(requests).then((responses) => {
                            responses.forEach((resp) => {
                                console.log(resp);
                            });
                            addToOrders();

                        });
                    });
            });
    }

    const addToOrders = () => {
        const reqs = cartItems.map((cartItem) => {
            var amount = netprice * (cartItem.cart_price / totalPrice);
            var otp = Math.floor(1000 + Math.random() * 9000);
            var newOrder = {
                cart_id: cartItem.cart_id,
                customer_amount: amount,
                seller_amount: cartItem.cart_price,
                advertiser_amount: discount,
                warehouse: 1,
                order_status: 'dispatched',
                otp: otp
            };
            axios.post('/orders/addorder', newOrder);
        });
        axios.all(reqs).then((responses) => {
            responses.forEach((resp) => {
                console.log(resp);
            });
            flushCart();
        });
    }

    const flushCart = () => {
        axios.post('/cart/flushcart', { customer_email: localStorage.getItem('username') })
            .then((res) => {
                console.log(res.data.msg);
                const reqs = cartItems.map((cartItem) => {
                    var newPlaced = {
                        id: cartItem.cart_id,
                        customer_email: cartItem.customer_email,
                        seller_email: cartItem.seller_email,
                        itemno: cartItem.itemno,
                        quantity: cartItem.cart_quantity,
                        price: cartItem.cart_price
                    }
                    axios.post('/placed/addtoplaced', newPlaced);
                });
                axios.all(reqs).then((responses) => {
                    responses.forEach((resp) => {
                        console.log(resp);
                    });
                    window.location.href = '/customer/orders';
                })
            })
            .catch((err) => console.log(err));

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
                                            <a href="/customer/home" className="text-body">
                                                Continue shopping
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
                                                cartItems.map((cartItem) => <CartItem itemno={cartItem.itemno} seller_email={cartItem.seller_email} customer_email={cartItem.customer_email} quantity={cartItem.cart_quantity} price={cartItem.cart_price} sellername={cartItem.seller_name} itemname={cartItem.item_name} />)
                                            }
                                        </div>

                                        <MDBDropdown>
                                            <MDBDropdownToggle style={{ margin: '0 0 4% 0' }} tag='a' className='btn btn-primary'>{couponName}</MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <div>
                                                    {coupons.map((coupon) => <MDBDropdownItem link value={coupon.amount} onClick={handleCoupon}>{coupon.advertiser}-{coupon.coupon_name} - {coupon.amount}/-</MDBDropdownItem>)}
                                                </div>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>

                                    </MDBCol>

                                    <MDBCol lg="5">
                                        <MDBCard className="bg-primary text-white rounded-3">
                                            <MDBCardBody>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        Card details
                                                    </MDBTypography>
                                                </div>


                                                {/* Got to include the bank dropdown to chose bank */}

                                                <form className="mt-4">
                                                    <MDBDropdown>
                                                        <MDBDropdownToggle style={{ margin: '0 0 4% 0' }} tag='a' className='btn btn-primary'>{chooseBank}</MDBDropdownToggle>
                                                        <MDBDropdownMenu>
                                                            <div>
                                                                {bankDetails.map((bank) => <MDBDropdownItem link value={bank.bank_regno} onClick={handleBankName}>{bank.bank_regno}-{bank.bank_name}</MDBDropdownItem>)}
                                                            </div>
                                                        </MDBDropdownMenu>
                                                    </MDBDropdown>

                                                    <MDBInput onChange={(e) => { setAccountNumber(e.target.value) }} className="mb-4" type="text" size="lg"
                                                        placeholder="Account Number" contrast />
                                                    <>PIN</>

                                                    <MDBInput onChange={(e) => { setPin(e.target.value) }} className="mb-4" type="text" size="lg" placeholder="&#9679;&#9679;&#9679;&#9679;" contrast />

                                                </form>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">{totalPrice}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Shipping</p>
                                                    <p className="mb-2">{shippingPrice}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total</p>
                                                    <p className="mb-2">{deliveryPrice}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Coupon Discount</p>
                                                    <p className="mb-2">{discount}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Net Price</p>
                                                    <p className="mb-2">{netprice}</p>
                                                </div>

                                                <MDBBtn onClick={handlePayment} color="info" block size="lg">
                                                    <div className="d-flex justify-content-between">
                                                        <span>
                                                            Checkout
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