import { useRef, useState, useEffect } from 'react';
import axios from "axios";
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
}
    from 'mdb-react-ui-kit';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        const login_data = {
            email: email,
            password: password,
        }
        e.preventDefault();
        await axios.post("/seller/login", login_data).then((res) => {
            console.log(res.data);
            if (res.data.msg) { console.log("You are not logged in"); }
            else { console.log("Calling from login POST Aprroved"); console.log("Correct combination"); }
        });
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1 style={{marginBottom:"5%"}}>Customer Sign In : </h1>
            <MDBInput wrapperClass='mb-4' placeholder='Enter your Email ID' id='form1' type='email' required onChange={(e) => { setEmail(e.target.value); }} />
            <MDBInput wrapperClass='mb-4' id='form2' placeholder='Enter your Password' type='password' required onChange={(e) => { setPassword(e.target.value); }} />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <a href="#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4" onClick={handleSubmit}>Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a user? <a href="/customer/register">Register</a></p>

            </div>

        </MDBContainer>
    );
}

export default Login;