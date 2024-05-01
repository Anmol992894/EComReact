import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import './Homepage.css'
import axios from "axios";
import Swal from 'sweetalert2'

import { API_BASE_URL } from "../config";
import Loading from "../components/Loading.Component";
import { useNavigate } from "react-router-dom";

function HomePage() {
    // Declaring State
    const [isLoading, setIsLoading] = useState(true);
    const [revenuedata, setRevenueData] = useState([]);
    const navigate=useNavigate();

    // Navigating to the Product Page
    const ProductMain = (product) => {
        navigate('/Productpage',{state:product})
    }
    // Calling API to get five Product
    const topfive = async () => {
        // Calling backend API to get the data
        const response = await axios.get(`${API_BASE_URL}/topfour`);
        console.log(response);
        var top6=[]
        if (response.status === 200) {
            for (let index = 0; index < 6; index++) {
                top6.push(response.data.data[index])
            }
            setRevenueData(top6);
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Some error occured"
            })
        }
    }

    // Calling API using useEffect
    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    useEffect(()=>{
        topfive();
    },[]);
    useEffect(() => {
        console.log(revenuedata);
    }, [revenuedata]);
    
    if (isLoading) {
        return <Loading />;
    }
    return (
        
        <>
        {/* Calling Header Component */}
            <Header />
            {/* Describing webpage structure */}
            <div className="product d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#DCC9F7" }}>
                <h1 className="heading p-4">Celebrate Every Moment Of Your Life</h1>
                <h3>Check our Product in Search Bar</h3>
                <div className="w-75">
                    <div className="row">

                        <div className="col-md-2 px-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img px-2" src={"https://images.unsplash.com/photo-1651160670627-2896ddf7822f?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Jwellery</a>
                        </div>
                        <div className="col-md-2 ps-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img-top px-2 card-img" src={"https://images.unsplash.com/photo-1592903297149-37fb25202dfa?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Gifts</a>
                        </div>
                        <div className="col-md-2 px-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img-top px-2 card-img" src={"https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Clothing</a>
                        </div>
                        <div className="col-md-2 px-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img-top px-2 card-img" src={"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Shoes</a>
                        </div>
                        <div className="col-md-2 px-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img-top px-2 card-img" src={"https://media.istockphoto.com/id/1180181642/photo/my-beauty-as-a-bride-is-in-my-henna.jpg?s=1024x1024&w=is&k=20&c=HyiuIxsEOUq5q6zOSeqFcdCDDtClCbJpQnhmZtITFv4="} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Wedding</a>
                        </div>
                        <div className="col-md-2 px-2 col-4 d-flex align-items-center justify-content-center flex-column">
                            <img className="card-img-top px-2 card-img" src={"https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap" />
                            <a href="#" className="text-decoration-none text-dark card-line">Accessories</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gif d-flex flex-column align-items-center justify-content-center ms-3 mt-4">
                <div className="row">
                    <div className="col">
                        <h3 className=" pt-4 fw-bold" style={{textAlign:"left", fontFamily:"sans-serif"}}>Shop our Popular Product.</h3>
                    </div>
                </div>
                <div className="row mt-4" >
                    {/* Printing Six Product */}
                    {revenuedata.map((products)=>{
                        return(
                            <div onClick={() => ProductMain(products)} className="col-md-2 col-4 pt-3">
                        <div className="card" style={{width: "9rem", height:"17rem"}}>
                            <img className="card-img-top" style={{height:"12rem"}} src={products.image} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-text">{products.Name}</h4>
                                </div>
                        </div>
                    </div>
                        )
                        
                    })}
                </div>
            </div>
            <div className="brands d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="row">
                    <div className="col-12" style={{fontFamily:"sans-serif"}}>
                        <h3 className="fw-bold pt-4">Our Brands You can Check in Search Bar</h3>
                    </div>
                </div>
                <div className="row mt-4 " >
                    <div className="col-lg-4 d-flex justify-content-center  align-items-center col-12 col-brand">
                    <div className="card align-self-center card-brand border border-dark" style={{width: "20rem", height:"25rem"}}>
                            <img className="card-img-top border border-dark" style={{height:"20rem"}} src={"https://images.unsplash.com/photo-1617611413968-537a2ba4986d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-text">Nike Products</h4>
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-center  align-items-center  col-brand">
                    <div className="card align-self-center card-brand border border-dark" style={{width: "20rem", height:"25rem"}}>
                            <img className="card-img-top border border-dark" style={{height:"20rem"}} src={"https://images.unsplash.com/photo-1555274175-75f4056dfd05?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-text">Nike Products</h4>
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-center  align-items-center  col-brand">
                    <div className="card align-self-center card-brand border border-dark" style={{width: "20rem", height:"25rem"}}>
                            <img className="card-img-top border border-dark" style={{height:"20rem"}} src={"https://i.pinimg.com/564x/a1/6c/23/a16c2331b5ec90d062c35c865d2461cd.jpg"} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-text">SiyaRam Clothes</h4>
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-center  align-items-center  col-brand">
                    <div className="card align-self-center card-brand border border-dark" style={{width: "20rem", height:"25rem"}}>
                            <img className="card-img-top border border-dark" style={{height:"20rem"}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tanishq_Logo.svg/1024px-Tanishq_Logo.svg.png"} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-text">Tanishq Jwellers</h4>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Implementing footer */}
            <div className="foot">
                <Footer />
            </div>

        </>
    );
}

export default HomePage;