import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput
}
from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [shopname, setShopname] = useState("");
    const [shoptype, setShoptype] = useState("");
    const [gstinno, setGstinno] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password === repassword){
            const newSeller = {
                'name': name,
                'email': email,
                'shopname': shopname,
                'shoptype': shoptype,
                'gstinno': gstinno,
                'password': password
            };
            await axios.post("/seller/register", newSeller).then((res) => {
                console.log(res.data.msg);
                if(res.data.msg){
                    console.log(res.msg);
                    alert('Try again!!!!');
                }
            });
        }
        else{
            alert('Password and Re-password are not the same');
        }
    }

    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h2 style={{marginBottom:"5%"}} classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Seller Sign up : </h2>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Name' id='name' type='text' className='w-100' required onChange={(e) => {setName(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Enter Your Email' id='email' type='email' required onChange={(e) => {setEmail(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Shop Name' id='shopname' type='text' className='w-100' required onChange={(e) => {setShopname(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Shop Type' id='shoptype' type='text' className='w-100' required onChange={(e) => {setShoptype(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your GSTIN Number' id='gstinno' type='text' className='w-100' required onChange={(e) => {setGstinno(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Enter Your Password' id='password' type='password' required onChange={(e) => {setPassword(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Repeat your password' id='form4' type='password' required onChange={(e) => {setRepassword(e.target.value);}} />
                            </div>

                            <MDBBtn type="submit" className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Register;