import { Link, useNavigate } from 'react-router-dom';
import './Signin.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2'
import Loading from '../components/Loading.Component';



function SignIn() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { fullName: fullName, email, password , profileImg: image }
        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result) => {
                debugger;
                if (result.status == 201) {
                    debugger;
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFullName('');
                setEmail('');
                setPassword('');
                setImage('');
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })
    }

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <>
            <Header />
            <div className='mt-4 container sign-cont border border-3 shadow-lg'>
                <div className='row'>
                    {/* Loading Spinner */}
                    {loading ? <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                    {/* Form for Signin details */}
                    <form onSubmit={(e) => signup(e)}>
                        <input type="text" value={image} onChange={(ev)=>setImage(ev.target.value)} className="p-2 mt-4 mb-2 form-control input-bg" placeholder='Image URL' />
                        <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)}  className="p-2 mb-2 form-control input-bg" placeholder='Email' />
                        <input type="text" value={fullName} onChange={(ev) => setFullName(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Full Name' />
                        <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Password' />
                        <div className='mt-3 d-grid'>
                            <button className="btn btn-danger text-light" type='submit'>Sign Up</button>
                        </div>
                        <div className='my-4'>
                            <hr className='text-muted' />
                            <h5 className='text-muted text-center'>OR</h5>
                            <hr className='text-muted' />
                        </div>
                        <div className='mt-3 mb-5 d-grid'>
                            <button className="btn">
                                <span className='fw-bold text-danger fs-6'>Already have an account?</span>
                                <Link to="/" className='ms-1 text-info fw-bold'>Log In</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </>

    );
}

export default SignIn;