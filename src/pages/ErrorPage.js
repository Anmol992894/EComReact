import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import Loading from '../components/Loading.Component'

const ErrorPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating an API call to set isLoading to false after 2 seconds
  useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 2000);
  }, []);

  // Render loading component while isLoading is true
  if (isLoading) {
      return <Loading />;
  }

  // Render error page content when isLoading is false
  return (
    <div>
      <Header/>
      <div className='container my-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 my-5 py-3 d-flex text-center flex-column justify-content-end'>
          <h2>404</h2>
          <h2>UH OH! You are Lost.</h2>
          <p>
            The page you are looking for does not exist.
          </p>
          <NavLink to={'/'}  className='align-self-center btn btn-danger w-25' >Go back to HomePage</NavLink>
        </div>
      </div>
      <div className="foot" style={{marginTop:"50px", position:"relative", left:"0", bottom:"0",right:"0"}}>
        <Footer />
      </div>
    </div>
  )
}

export default ErrorPage
