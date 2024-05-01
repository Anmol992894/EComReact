import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutWizard from '../components/checkoutwizard';
import { NavLink, useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    const [fullName,setFullName]=useState('');
    const [address,setAddress]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [country,setCountry]=useState('');
    const navigate=useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const currentStep=0;

    // Function to handle the 
    const handleSubmit = (e) => {
        e.preventDefault();
        const shipping={
            fullName: fullName,
            address: address,
            city: city,
            postalCode: postalCode,
            country: country
        }
        navigate('/placeorderScreen',{state:shipping})
        // Handle save shipping address action here
        console.log('Shipping address saved:', shipping);
        // You can send the shipping address data to your backend API for further processing
    };

    return (
        <div>
            <Header/>
            <div className='mt-4 container d-flex flex-column justify-content-center align-items-center'>
            <h2>Shipping Address</h2>
            <div className='w-75'>
                {/* Form for Shipping detail */}
            <form className='mt-3 form-control' onSubmit={handleSubmit}>
                <div>
                    <label className='form-control' htmlFor="fullName">Full Name</label>
                    <input className='form-control' type="text" id="fullName" name="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
                </div>
                <div>
                    <label className='form-control' htmlFor="address">Address</label>
                    <input className='form-control' type="text" id="address" name="address" value={address} onChange={(e)=>setAddress(e.target.value)} required />
                </div>
                <div>
                    <label className='form-control' htmlFor="city">City</label>
                    <input className='form-control' type="text" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)} required />
                </div>
                <div>
                    <label className='form-control' htmlFor="postalCode">Postal Code</label>
                    <input className='form-control' type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label className='form-control' htmlFor="country">Country</label>
                    <input className='form-control' type="text" id="country" name="country" value={country} onChange={(e)=>setCountry(e.target.value)} required />
                </div>
                <button type="submit" className='mt-2 btn btn-danger form-control'>Save Shipping Address</button>
            </form>
            </div>
            </div>
            
            {/* Checkout wizard bar */}
            <div className='mt-4 container d-flex flex-column justify-content-center align-items-center'>
            <CheckoutWizard currentStep={currentStep} />
            </div>

            <div className="foot" style={{marginTop:"50px", position:"relative", left:"0", bottom:"0",right:"0"}}>
                <Footer />
            </div>
    </div>
    );
};

export default ShippingScreen;
