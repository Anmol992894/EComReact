import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading.Component';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Searchscreen = () => {
    // Describing states
    const [allposts, setAllposts] = useState([]);
    const [productName,setProductName]=useState();
    const [brand,setBrand]=useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    // Navigate to the Product page passing data along with
    const ProductMain = (product) => {
        navigate('/Productpage',{state:product})
    }
    // Get all searched object API
    const getsearchedProducts = async (event) => {
        event.preventDefault();
        console.log(brand);
        console.log(productName);
        const response = await axios.get(`${API_BASE_URL}/searchedproducts/${productName}/${brand}`);
        if (response.status === 200) {
            console.log(response);
            debugger;
            setAllposts(response.data.products);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
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
    return (
        // Ḍescribing Webpage Structure
        <div>
            <Header/>
            <div>
            <div className='row'>
                <div className='col-md-7 col-12 d-flex justify-content-end '>
                    <div className='d-flex flex-column'>
                        <div className="shadow my-3 input-group rounded border border-danger border-2">
                            {/* Product Name input field*/}
                            <input type="text" value={productName}  onChange={(e)=>setProductName(e.target.value)} className=" form-control border border-0 mt-1 border-dark rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <span onClick={(e)=>getsearchedProducts(e)} className="input-group-text ms-1  bg-danger border border-dark" style={{ borderRadius: "circle" }}>
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        {/* Brand Name Field  */}
                        <input type="text" value={brand} onChange={(e)=>setBrand(e.target.value)} className="border border-danger border-2 rounded" placeholder="Enter Brand" aria-label="Search" aria-describedby="search-addon" />
                    </div>
                </div>
            </div>
            <div  className='row'>
                <div className='col-md-12'>
                    <div className='row'>
                        {/* Iterate to the searched post */}
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
            
            <div className="foot" style={{marginTop:"50px", position:"relative", left:"0", bottom:"0",right:"0"}}>
                <Footer />
            </div>
    </div>
    )
}

export default Searchscreen
