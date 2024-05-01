import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading.Component';
import Header from '../components/Header';
import CheckoutWizard from '../components/checkoutwizard';
import Footer from '../components/Footer';

const PlaceOrderScreen = () => {
    // State variables for cart items, payment method, shipping address, and order summary
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [orderSummary, setOrderSummary] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sdkReady, setSdkReady] = useState(false);
    const currentStep=1;
    const location = useLocation();
    // Fetch cart items
    // Example API endpoint: '/api/cart'

    const getAllProducts = async () => {
        const response = await axios.get(`${API_BASE_URL}/myallproducts`);
        if (response.status === 200) {
            setCartItems(response.data.product);
            setShippingAddress(location);
            calculateOrderSummary(response.data.product)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }


    // Function to calculate order summary
    const calculateOrderSummary = async (items) => {
        // Calculate total price, shipping fee, and tax
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += item.Price * item.Quantity;
        });
        const shippingFee = 5; // Example shipping fee
        const totalAmount = totalPrice + shippingFee;

        // Update order summary state
        setOrderSummary({
            totalPrice,
            shippingFee,
            totalAmount
        });
    };
    const placeOrder = async () => {
        setLoading(true);
        try {
            const request = { cartItems: cartItems, shippingAddress: shippingAddress, orderSummary: orderSummary }
            const response = await axios.post(`${API_BASE_URL}/pay`, request);
            console.log(response.data); // This will contain the PayPal approval URL
            window.location.href = response.data.approvalUrl; // Redirect the user to PayPal for payment

        } catch (error) {
            console.error('Error placing order:', error);
            setLoading(false);
            // Handle error
        }
    };

    // Fetch cart items, payment method, and shipping address from backend API
    useEffect(() => {
        getAllProducts();
        // Calculate order summary

    }, []);
    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className='container'>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <div>
                    <h2 className='text-center text-decoration-underline'>Place Order</h2>
                    {/* Display cart items */}
                    <div className='mt-4'>
                        <h3 className='d-flex justify-content-between text-decoration-underline'>Cart Items<i className="mt-1 fa-solid fa-cart-shopping"></i></h3>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item._id}>{item.Name} - ${item.Price}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Display shipping address */}
                    <div className=' mt-4'>
                    <h3 className='d-flex justify-content-between text-decoration-underline'>Shipping Address<i class="mt-1 fa-solid fa-truck-fast"></i></h3>
                        <p>{location.state.address}, {location.state.city}, {location.state.postalCode}, {location.state.country}</p>
                    </div>
                    {/* Display order summary */}
                    <div className='mt-4'>
                    <h3 className='d-flex justify-content-between text-decoration-underline'>Order Summary<i class="mt-1 fa-solid fa-basket-shopping"></i></h3>
                        <p>Total Price: ${orderSummary.totalPrice}</p>
                        <p>Shipping Fee: ${orderSummary.shippingFee}</p>
                        <p>Total Amount: ${orderSummary.totalAmount}</p>
                    </div>
                    {/* Place order button */}
                    <button className='mt-4 btn btn-danger' onClick={() => placeOrder()}>Place Order</button>

                </div>
            </div>
            {/* Checkout wizard bar */}
            <div className='mt-4 container d-flex flex-column justify-content-center align-items-center'>
            <CheckoutWizard currentStep={currentStep} />
            </div>

            <div className="foot" style={{marginTop:"50px", position:"relative", left:"0", bottom:"0",right:"0"}}>
                <Footer />
            </div>
        </>

    );
};

export default PlaceOrderScreen;
