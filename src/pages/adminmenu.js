import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import Loading from '../components/Loading.Component';
import Footer from '../components/Footer';

const Adminmenu = () => {

    const [allposts, setAllposts] = useState([]);
    const [alluser, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllProducts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allproducts`);
        if (response.status === 200) {
            setAllposts(response.data.products);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }

    }
    const createProduct = async () => {
        const request = { description: description, InStock: quantity, Name: productName, Brand: brand, Price: price, image: image };
        const response = await axios.post(`${API_BASE_URL}/createproduct`, request);
        debugger;
        if (response.status === 201) {
            setDescription('');
            setProductName('');
            setBrand('');
            setPrice('');
            setQuantity('');
            getAllProducts();
        }
    }
    const EditProduct = async () => {
        const request = {
            description: description,
            Name: productName,
            Brand: brand,
            Price: price,
            InStock: quantity
        }
        const response = await axios.put(`${API_BASE_URL}/ProductEdit/${id}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            setId('');
            setDescription('');
            setProductName('');
            setBrand('');
            setPrice('');
            setQuantity('');
            getAllProducts();
        }
    }

    const Edituser = async () => {
        const request = {
            fullName: fullName,
            email: email,
            profileImg: image
        }
        const response = await axios.put(`${API_BASE_URL}/userEdit/${id}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            setId('');
            setFullName('');
            setEmail('');
            setImage('');
            getAllUsers();
        }
    }

    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deleteadminproduct/${postId}`);
        // setAllposts(response.data.product);
        if (response.status === 200) {
            getAllProducts();
        }
    }
    const deleteuser = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deleteadminuser/${postId}`);
        // setAllposts(response.data.product);
        if (response.status === 200) {
            getAllUsers();
        }
    }
    const getAllUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/allusers`);
        if (response.status === 200) {
            console.log(response);
            setAllUsers(response.data.users);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }
    useEffect(() => {
        getAllUsers();
    }, []);
    useEffect(() => {
        getAllProducts();
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
        <div>
            <Header />
            <div className='d-flex flex-column align-items-center justify-content-center'>

                <div className='row pt-2 container shadow-lg '>
                    <div className='col-md-6 pt-2 col-12 pt text-danger col-12 d-flex justify-content-between'>
                        <h3 >This is the Admin Page</h3>
                    </div>
                    <div className='col-md-2 col-12 d-flex '>
                        <div className=''>
                            <h3>{alluser.length}</h3>
                            <span>User Count</span>
                        </div>
                    </div>
                    <div className='col-md-2 col-12 d-flex '>
                        <div className=''>
                            <h3>{allposts.length}</h3>
                            <span>Product Count</span>
                        </div>
                    </div>
                    <div className='col-md-2 col-12 d-flex '>
                        <div className=''>
                            <i data-toggle="modal" data-target="#CreateProductModal" class="fs-2 fa-solid fa-square-plus"></i>
                            <p className='pt-1 fw-bold'>Add Product</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mt-5 row'>
                        <h2>Products Availabel</h2>
                    </div>
                </div>
                <div className='row w-100 shadow container border border-dark'>
                    <div className='w-100 table-responsive'>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">item</th>
                                    <th scope='col'>Item ID</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Remove</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allposts.map((products) => {
                                    return (
                                        <tr key={products._id}>
                                            <th scope="row">{products.Name}</th>
                                            <th>{products._id}</th>
                                            <td>Rs.{products.Price}</td>
                                            <td><p className='fs-4 px-3'><span></span>{Number(products.InStock)}<span></span></p></td>
                                            <td>{products.Brand[0]}</td>
                                            <td><i onClick={() => deletePost(products._id)} className="text-danger fa-solid fa-trash"></i></td>
                                            <td><i data-toggle="modal" data-target="#exampleModal" class="fa-regular fa-pen-to-square"></i></td>
                                            <td>{products.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='row w-100 mt-4 container border border-dark'>
                    <div className='w-100 table-responsive'>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th scope='col'>Full Name</th>
                                    <th scope='col'>User Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Remove</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alluser.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <th scope="row">{user.fullName}</th>
                                            <th>{user._id}</th>
                                            <td>{user.email}</td>
                                            <td><i onClick={() => deleteuser(user._id)} className="text-danger fa-solid fa-trash"></i></td>
                                            <td><i data-toggle="modal" data-target="#EditUserModal" class="fa-regular fa-pen-to-square"></i></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product Edit</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='col-12'>
                                <input type='text' placeholder='Enter ID ' value={id} onChange={(e) => setId(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter Description ' value={description} onChange={(e) => setDescription(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Price' value={price} onChange={(e) => setPrice(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Brand' value={brand} onChange={(e) => setBrand(e.target.value)} className='my-3 form-control' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => EditProduct(id)} className="btn btn-secondary" data-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="CreateProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='col-12'>
                                <input type='text' placeholder='Enter Description ' value={description} onChange={(e) => setDescription(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Price' value={price} onChange={(e) => setPrice(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Brand' value={brand} onChange={(e) => setBrand(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter Image URL ' value={image} onChange={(e) => setImage(e.target.value)} className='my-3 form-control' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => createProduct()} className="btn btn-secondary" data-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="EditUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product Edit</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='col-12'>
                                <input type='text' placeholder='Enter ID ' value={id} onChange={(e) => setId(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Full Name ' value={fullName} onChange={(e) => setFullName(e.target.value)} className='my-3 form-control' />
                                <input type='email' placeholder='Enter Email ID ' value={email} onChange={(e) => setEmail(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Image URL' value={image} onChange={(e) => setImage(e.target.value)} className='my-3 form-control' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => Edituser(id)} className="btn btn-secondary" data-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot" style={{ marginTop: "50px", position: "relative", left: "0", bottom: "0", right: "0" }}>
                <Footer />
            </div>
        </div>
    )
}

export default Adminmenu
