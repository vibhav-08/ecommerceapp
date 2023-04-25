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
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password === repassword){
            const newUser = {
                'name': name,
                'email': email,
                'gender': gender,
                'occupation': occupation,
                'password': password
            };
            await axios.post("/customer/register", newUser).then((res) => {
                if(res.status !== 200){
                    alert('Try again!!!!');
                }
                else{
                    window.location.href = '/customer/login';
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

                            <h2 style={{marginBottom:"5%"}} classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Customer Sign up : </h2>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Name' id='name' type='text' className='w-100' required onChange={(e) => {setName(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Enter Your Email' id='email' type='email' required onChange={(e) => {setEmail(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Gender' id='gender' type='text' className='w-100' required onChange={(e) => {setGender(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBInput placeholder='Enter Your Occupation' id='occ' type='text' className='w-100' required onChange={(e) => {setOccupation(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Enter Your Password' id='password' type='password' required onChange={(e) => {setPassword(e.target.value);}} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput placeholder='Repeat your password' id='form4' type='password' required onChange={(e) => {setRepassword(e.target.value);}} />
                            </div>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

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