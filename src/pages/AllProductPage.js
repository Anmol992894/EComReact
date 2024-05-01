import Header from '../components/Header';
import './AllProductPage.css';
import Card from '../components/card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading.Component';
import Footer from '../components/Footer';

const AllProductPage = () => {
    // State variables to manage data and loading state
    const [allposts, setAllposts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Configuration object for API requests
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    };

    // Function to navigate to the search page
    const searchPage = () => {
        navigate('/searchpage');
    };

    // Function to navigate to the product details page
    const ProductMain = (product) => {
        navigate('/Productpage', { state: product });
    };

    // Function to fetch all products from the API
    const getAllProducts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allproducts`);
        if (response.status === 200) {
            setAllposts(response.data.products);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            });
        }
    };

    // Effect hook to fetch products on component mount
    useEffect(() => {
        getAllProducts();
    }, []);

    // Effect hook to simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // Render loading component if data is loading
    if (isLoading) {
        return <Loading />;
    }

    // Render the all product page
    return (
        <>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 d-flex align-items-center justify-content-between py-3 text-center'>
                        <p className='pe-5 fs-3 align-self-center fw-bold'>{allposts.length} Total Products</p>
                        <div className='col-md-3'>
                            <div className="py-3 input-group rounded">
                                <span onClick={searchPage} className="py-3 input-group-text ms-1 mt-1 bg-danger border border-dark" style={{ borderRadius: "circle" }}>
                                    <span className='fw-bold pe-3'>Search</span> <i className="fas fa-search fs-3"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            {allposts.map((products) => {
                                return (
                                    <div key={products._id} className="col-md-4 col-6 pt-3">
                                        <div onClick={() => ProductMain(products)} className="card" style={{ width: "17rem", height: "15rem" }}>
                                            <img className="card-img-top" style={{ height: "12rem" }} src={products.image} alt="Card image cap" />
                                            <div className="card-body">
                                                <h4 className="card-text">{products.Name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot" style={{ marginTop: "50px", position: "relative", left: "0", bottom: "0", right: "0" }}>
                <Footer />
            </div>
        </>
    );
};

export default AllProductPage;

