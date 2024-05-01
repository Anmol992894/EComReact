import Footer from '../components/Footer'
import Header from '../components/Header'
import Loading from '../components/Loading.Component'
import './Contact.css'


import React, { useEffect, useState } from 'react'

const Contact = () => {
    const [isLoading,setIsLoading]=useState(true);
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
            <div className='mt-4 container login-cont border border-3 shadow-lg'>
                {/* Contact form */}
                <form action='https://formspree.io/f/mvoedylz' method='POST' >
                    {/* Email input */}
                    <input type="email" name='Email' autoComplete='off' className="p-2 mt-4 mb-2 form-control input-bg" placeholder='Phone number, username or email' />
                    {/* Username input */}
                    <input type="text" name='Username' className="p-2 mb-2 form-control input-bg" placeholder='Name' />
                    {/* Message textarea */}
                    <div className="form-floating">
                        <textarea  name='Message' className="form-control" cols={30} rows={30} placeholder="Message" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Message</label>
                    </div>
                    {/* Submit button */}
                    <div className='mt-3 d-grid'>
                        <button type='submit' className="btn btn-danger">Submit</button>
                    </div>
                </form>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </>
    )
}

export default Contact
