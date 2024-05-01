import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Paypal = () => {
    const [email,setEmail]=useState('')
    const [productinfo,setProductInfo]=useState('')
    const [amount,setAmount]=useState('')
  return (
    <div>
        <Header/>
        <div className='container'>
        <div className='row d-flex flex-column align-items-center'>
        <img style={{width:"200px",height:"200px"}} src={"https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"} alt='pay-pal logo'/>
        <form style={{width:"23",borderRadius:"10px"}} className='p-4 d-flex flex-column border border-dark'>
            <label className='fw-bold'>Email:</label>
            <input required type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='my-2 form-control'/>
            <label className='fw-bold'>Product:</label>
            <input required type='text'  value={productinfo} onChange={(e)=>{setProductInfo(e.target.value)}} className='my-2 form-control'/>
            <label className='fw-bold'>Amount:</label>
            <input required type='text'  value={amount} onChange={(e)=>{setAmount(e.target.value)}} className='my-2 form-control'/>
            <button type='submit' className='align-self-center my-2 btn w-50 btn-primary'>Pay</button>
        </form>
        
      </div>
        </div>
      
      <div className="foot" style={{marginTop:"50px", position:"relative", left:"0", bottom:"0",right:"0"}}>
                <Footer />
            </div>
    </div>
  )
}

export default Paypal
