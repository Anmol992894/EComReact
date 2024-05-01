import Footer from '../components/Footer';
import Header from '../components/Header';
import './CartPage.css'
import { API_BASE_URL } from '../../src/config'
import axios, { all } from 'axios';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Loading from '../components/Loading.Component';

function CartPage() {
    // State variables for managing cart items, subtotal, total, and loading state
    const [allposts, setAllposts] = useState([]);
    const [subtotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Function to delete a product from the cart
    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletemyproduct/${postId}`);
        if (response.status === 200) {
            getAllProducts();
            Total();
        }

    }

    // Configuration object for HTTP headers
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // Function to delete all products from the cart
    const deleteAll = async () => {
        const response = await axios.delete(`${API_BASE_URL}/deletewholeCart`);
        if (response.status === 200) {
            setAllposts([]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    // Function to fetch all products in the cart
    const getAllProducts = async () => {
        const response = await axios.get(`${API_BASE_URL}/myallproducts`);
        if (response.status === 200) {
            console.log(response);
            setAllposts(response.data.product);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    // Function to calculate subtotal and total
    const Total = () => {
        var sum = 0;
        for (let index = 0; index < allposts.length; index++) {
            console.log(index);
            sum += (Number(allposts[index].Price[0]) * Number(allposts[index].Quantity))
            console.log(sum);
        }
        setSubTotal(sum)
        setTotal(sum + 5)
    }

    // Effect hook to fetch all products on component mount
    useEffect(() => {
        getAllProducts();
    }, []);

    // Effect hook to simulate loading
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // Render loading component while data is being fetched
    if (isLoading) {
        return <Loading />;
    }

    // Retrieve user data from local storage
    const a = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <Header />
            <div className='container pt-5 w-75 d-flex flex-column justify-content-start'>
                <img src={a.image} style={{ height: "100px", width: "100px", borderRadius: "100%" }} alt='Profile Image' />
                <h3 className='text-start pt-2'>{a.fullName} Cart Items</h3>
                <div className='table-responsive'>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">SUBTOTAL</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allposts.length !=0 ?"":
                            <h2>Empty Cart</h2>}
                            {allposts.map((products) => {
                                return (
                                    <tr key={products._id}>
                                        <th scope="row">{products.Name}</th>
                                        <td>Rs.{products.Price}</td>
                                        <td><p className='fs-4 px-3'><span></span>{Number(products.Quantity)}
                                        <span></span></p></td>
                                        <td>{Number(products.Quantity) * Number(products.Price)}</td>
                                        <td><i onClick={() => deletePost(products._id)} className="text-danger fa-solid fa-trash"></i></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-between'>
                    <NavLink to={'/AllProductPage'} className='btn btn-danger text-white' style={{ height: "60px" }}>Continue Shopping</NavLink>
                    <button onClick={() => Total()} className='btn btn-success text-light' style={{ height: "60px" }}>Click For Total</button>
                    <button onClick={() => deleteAll()} className='btn btn-danger text-light' style={{ height: "60px" }}>CLEAR CART</button>
                </div>
                <div className='d-flex align-self-md-end align-self-center flex-column Output my-4 px-3' style={{ width: "300px", height: "200px" }}>
                    <div className='d-flex justify-content-between pt-4'><span>SubTotal:</span><span>Rs.{subtotal}</span></div>
                    <div className='d-flex justify-content-between py-4'><span>Shopping Fee:</span><span>Rs. 5.00</span></div>
                    <div className='border border-dark w-100'></div>
                    <div className='d-flex justify-content-betweenpt py-4'><span>Order Total:</span><span>Rs.{total}</span></div>
                </div>
                {allposts.length != 0 ?
                <div className='row d-flex justify-content-end w-100 '>
                <NavLink to={'/shipping'}>
                <button className='border border-dark border-2 float-end btn btn-warning' style={{ width: "200px" }}>Confirm Payment</button>
                </NavLink>
            </div>:""

                }
                

            </div>
            <div className="foot">
                <Footer />
            </div>
        </>
    );
}

export default CartPage;
