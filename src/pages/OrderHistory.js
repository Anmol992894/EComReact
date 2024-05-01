// Import necessary dependencies and components
import axios from 'axios'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loading from '../components/Loading.Component'
import './Orderhistory.css'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'
import Swal from 'sweetalert2'

// Define the OrderHistory component
const OrderHistory = () => {
    // State variables to manage loading state and order data
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([])

    // Function to fetch order history data from the server
    const getorderhistory = async () => {
        const response = await axios.get(`${API_BASE_URL}/orderHistory`);
        if (response.status === 200) {
            setOrder(response.data.products);
        } else {
            // Display error message if fetching data fails
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    // Effect hook to fetch order history data when the component mounts
    useEffect(() => {
        getorderhistory();
    }, []);

    // Effect hook to simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // Render loading spinner if data is loading
    if (isLoading) {
        return <Loading />;
    }

    // Render order history data
    return (
        <div>
            <Header />
            <div className='container d-flex flex-column align-items-center'>
                <h2 className='text-danger mt-4 align-self-center fw-bold'>ORDER HISTORY</h2>
                <div className='w-100 table-responsive'>
                    <table className="w-100 table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Item ID</th>
                                <th scope="col">Payer Name</th>
                                <th scope="col">Amount Payed</th>
                                <th scope="col">Currency</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through order data and render table rows */}
                            {order.length !== 0 ? order.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <th scope="row">{order._id}</th>
                                        <td>{order.cartItems[0].shipping_address.recipient_name}</td>
                                        <td>{order.orderSummary[0].total}</td>
                                        <td>{order.orderSummary[0].currency}</td>
                                        <td>{order.cartItems[0].shipping_address.line1}, {order.cartItems[0].shipping_address.city}, {order.cartItems[0].shipping_address.state},{order.cartItems[0].shipping_address.postal_code},{order.cartItems[0].shipping_address.country_code}</td>
                                    </tr>
                                )
                            }) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </div>
    )
}

// Export the OrderHistory component
export default OrderHistory
