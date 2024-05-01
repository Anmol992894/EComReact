import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading.Component';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

const Profile = () => {
    // Describing states
    const [isLoading, setIsLoading] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [Profile, setProfile] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // API to edit the user
    const EditDetails = async (Id) => {
        const request = {
            fullName: fullName,
            email: email,
            profileImg: Profile
        }
        const response = await axios.put(`${API_BASE_URL}/userEdit/${Id}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Login Again'
            })
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({ type: "LOGIN_ERROR" });
            navigate("/");
        }
    }

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    const a = JSON.parse(localStorage.getItem("user"));
    console.log(a);
    return (
        // Describing the HTML Structure
        <div>
            <Header />
            <div className='row w-100 '>
                <div className='col mt-4 w-100  d-flex align-items-center justify-content-center '>
                    <img style={{ height: "100px", width: "100px", borderRadius: "100%" }} src={a.image} alt='profile image' />
                </div>
            </div>
            <div className='row'>
                <div className='col w-100 mt-3 fs-3 fw-bold d-flex align-items-center justify-content-center '>{a.fullName}</div>
            </div>
            <div className='row'>
                <div className='col w-100 mt-3 fs-3 fw-bold d-flex align-items-center justify-content-center '>{a.email}</div>
            </div>
            <hr className='fw-bold' />
            <div className='row mt-3'>
                <div className='col '>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <i class="fs-2 py-2 fa-solid fa-cart-shopping"></i>
                        <NavLink className="py-2 text-decoration-none text-dark" to={'/CartPage'}>My Cart</NavLink>
                    </div>
                </div>
                <div className='col '>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <i class="fs-2 py-2 fa-regular fa-pen-to-square"></i>
                        <NavLink className="py-2 text-decoration-none text-dark" data-toggle="modal" data-target="#exampleModal">Edit Details</NavLink>
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <i class="fs-2 py-2 fa-solid fa-list"></i>
                        <NavLink className='py-2 text-decoration-none text-dark' to={'/OrderHistory'}>Order History</NavLink>
                    </div>
                </div>
            </div>
            {/* Modal for adding the comments */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Comment and Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='col-12'>
                                <input type='text' placeholder='Enter New Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Email' value={email} onChange={(e) => setEmail(e.target.value)} className='my-3 form-control' />
                                <input type='text' placeholder='Enter New Profile URL' value={Profile} onChange={(e) => setProfile(e.target.value)} className='my-3 form-control' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => EditDetails(a._id)} className="btn btn-secondary" data-dismiss="modal">Edit</button>
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

export default Profile
