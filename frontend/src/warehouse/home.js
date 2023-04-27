import React from 'react';
import axios from 'axios';
import {
    MDBBtn
} from "mdb-react-ui-kit";

const Home = () => {
    const handleReceive = () => {
        axios.post('/warehouse/receiveitems', {email: localStorage.getItem('warehouse')})
        .then((res) => {
            console.log(res.data.msg);
        })
        .catch((err) => console.log(err));
    }

    const handleDispatch = () => {
        axios.post('/warehouse/dispatchitems', {email: localStorage.getItem('warehouse')})
        .then((res) => {
            console.log(res.data.msg);
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <MDBBtn style={{marginTop: '20%', marginRight:'2%'}} onClick={handleReceive}>Receive All</MDBBtn>
            <MDBBtn style={{marginTop: '20%', marginRight:'2%'}} onClick={handleDispatch}>Dispatch All</MDBBtn>
        </div>

    );
}

export default Home;
