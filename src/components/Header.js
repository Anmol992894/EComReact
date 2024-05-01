// Header component for the navigation bar of the application
import { Link, NavLink, json, useNavigate } from 'react-router-dom';
import './Header.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Header() {
    // Retrieving user data from local storage
    const a = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to clear user authentication data from local storage and dispatch a logout action
    const clearstore = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
    }

    // Function to handle user logout
    const logout = () => {
        clearstore();
        navigate("/");
    }

    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-sm sticky-top border border-dark border-3">
                <div className="w-100  d-flex flex-column justify-content-center align-items-center">
                    <div className='row w-100'>
                        {/* Logo and welcome message */}
                        <div className='d-flex col-md-3 col-12 mt-2'>
                            <Link to={'/'} className="navbar-brand ms-2 text-danger" href="#"><h1>Ecom</h1></Link>
                            <div>
                                <span className='nav-link text-dark pt-2 fs-6 px-2 text-decoration-underline'>Welcome  {localStorage.getItem("token") != null ? <span>{a.fullName}</span> : ""}</span>
                            </div>
                        </div>

                        {/* Navigation links */}
                        <div className='col-md-9 col-12 d-flex justify-content-end '>
                            <div className='row'>
                                {/* Home */}
                                <div className='col-md col-4'>
                                    <NavLink to='/HomePage' className='text-dark nav-link fw-bold nav-icon px-3 fs-5 pt-2 text-decoration-none'>Home</NavLink>
                                </div>
                                {/* About */}
                                <div className='col-md col-4'>
                                    <NavLink to='/About' className='text-dark nav-link fw-bold nav-icon px-3 fs-5 pt-2 text-decoration-none'>About</NavLink>
                                </div>
                                {/* Product */}
                                <div className='col-md col-4'>
                                    <NavLink to='/AllProductPage' className='text-dark nav-link fw-bold nav-icon px-3 fs-5 pt-2 text-decoration-none'>Product</NavLink>
                                </div>
                                {/* Contact */}
                                <div className='col-md col-6'>
                                    <NavLink to='/Contact' className='text-dark fw-bold  fs-5 px-3 pt-2 text-decoration-none nav-link'>Contact</NavLink>
                                </div>
                                {/* Profile and Admin links */}
                                <div className='col-md col-6'>
                                    {localStorage.getItem("token") != null ? <> <a className="btn" href="#" role="button" data-bs-toggle="dropdown">
                                        <img style={{ width: "30px", height: "30px", borderRadius: "50%" }} alt="profile pic" src={a.image} />
                                    </a>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink className="dropdown-item mt-0" to="/Profile">My Profile</NavLink>
                                            </li>
                                            <li>
                                                {
                                                    a.email == "admin@gmail.com" ? <div className='col-md col-6'>
                                                        <NavLink to='/adminmenu' className='text-dark px-3 pt-2 text-decoration-none nav-link'>Admin Page</NavLink>
                                                    </div> : ""
                                                }
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="/" onClick={() => logout()}>
                                                    Logout
                                                </a>
                                            </li>
                                            <li>
                                                <NavLink className="dropdown-item mt-0" to="/Profile">My Profile</NavLink>
                                            </li>
                                        </ul> </> : <NavLink to={'/Signin'} className='text-dark fw-bold  fs-5 px-3 pt-2 text-decoration-none nav-link'>SignIn</NavLink>}
                                </div>
                                {/* Cart link */}
                                {localStorage.getItem("token") != null ?
                                    <div className='col-md col-12'>
                                        <NavLink to={'/CartPage'} className=" btn btn-lg headerbutton">
                                            <span className='fs-2 fw-4'><i className="float-start fa-solid fa-cart-shopping"></i></span>
                                        </NavLink>
                                    </div> : ""
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal for navigation links on smaller screens */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog mt-0 ms-0" style={{ height: "50px" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-danger" id="staticBackdropLabel">Ecom</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className='list-group' >
                                <li className="nav-item list-group-item" style={{ width: "100%" }}><NavLink to={'/HomePage'} className=" nav-link text-decoration-none headerbutton" >Home</NavLink></li>
                                <li className="nav-item list-group-item" style={{ width: "100%" }}><NavLink to={'/About'} className="nav-link text-decoration-none headerbutton" >About</NavLink></li>
                                <li className="nav-item dropdown list-group-item">
                                    <NavLink to={'/AllProductPage'} className="nav-link headerbutton">Products</NavLink>
                                </li>
                                <li className="nav-item dropdown list-group-item px-1">
                                    <NavLink to={'/Contact'} className="nav-link dropright headerbutton" >Contact</NavLink>
                                </li>
                                <li className="nav-item list-group-item" style={{ width: "100%" }}><NavLink to={'/CartPage'} className="nav-link text-decoration-none headerbutton" >Cart</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
