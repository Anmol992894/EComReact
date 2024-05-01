import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading.Component';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle login submission
    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status == 200) {
                    setLoading(false);
                    // Store token and user data in local storage
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    // Dispatch login success action
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    // Navigate to the home page after successful login
                    navigate('/HomePage');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                // Display error message if login fails
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // Display loading component while data is being fetched
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className='mt-4 container login-cont border border-3 shadow-lg'>
                {/* Display loading spinner when loading */}
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <form onSubmit={(e) => login(e)}>
                    {/* Input fields for email and password */}
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="p-2 mt-4 mb-2 form-control input-bg" placeholder='Phone number, username or email' />
                    <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Password' />
                    {/* Button to submit login form */}
                    <div className='mt-3 d-grid'>
                        <button type='submit' className="btn btn-danger">Log In</button>
                    </div>
                    <div className='my-4'>
                        <hr className='text-muted' />
                        <h5 className='text-muted text-center'>OR</h5>
                        <hr className='text-muted' />
                    </div>
                    {/* Link to sign up page */}
                    <div className='mt-3 mb-5 d-grid'>
                        <button className="btn">
                            <span className='fw-bold text-danger fs-6'>Don't have an account?</span>
                            <Link to="/Signin" className='ms-1 text-info fw-bold'>Sign In</Link>
                        </button>
                    </div>
                </form>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </>
    );
}

export default Login;
