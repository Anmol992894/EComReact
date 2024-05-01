import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Productpage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { API_BASE_URL } from '../config';
import Loading from '../components/Loading.Component';

function ProductPage() {
    // Implementing states
    const location = useLocation();
    const [allposts, setAllposts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quant, setQuant] = useState(0);
    const [commentBox, setCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [rating,setRating]=useState('');
    const navigate = useNavigate();
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // calling api to get all the comments
    const getAllProducts = async () => {
        const response = await axios.get(`${API_BASE_URL}/commented/${location.state._id}`);
        if (response.status === 200) {
            setAllposts(response.data.result.comments);
            console.log(allposts);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    // Calling api to add comment
    const submitComment = async (postId) => {
        const request = { "postId": postId,"rating":rating, "commentText": comment };
        const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
        setComment('');
        setRating('');
        getAllProducts();

    }
    const incre = () => {
        setQuant(quant + 1)
    }
    const decre = () => {
        setQuant(quant - 1);
    }

    // Handling card to redirect to the product page
    const GotoCart = async () => {

        const request = {
            description: location.state.description,
            Quantity: quant.toString(),
            Name: location.state.Name,
            Brand: location.state.Brand,
            Price: location.state.Price,
            image: location.state.image
        }
        // write api call to create post
        const postResponse = await axios.post(`${API_BASE_URL}/createmyproduct`, request, CONFIG_OBJ)
        if (postResponse.status == 201) {
            navigate("/CartPage")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while creating post'
            })
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[]);

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
        // describing WebPage structure for the ProductPage
        <div className='product-window '>
            <Header />
            <div className='row mt-5'>
                <div className='col-md-5 d-flex justify-content-center'>
                    <img className='pt-5 mt-5' style={{ height: "12rem"}} src={location.state.image} alt="Card image cap" />
                </div>
                <div className='col-md-7'>
                    <div className='px-2 d-flex mt-3 flex-column align-items-start justify-content-start'>
                        <h3>{location.state.Name}</h3>
                        <p><i className="py-2 fa-regular fs-6 fw-bold fa-star"></i>
                            <a style={{ cursor: "pointer" }} data-toggle="modal" data-target="#exampleModal">
                                Customer and Review
                            </a></p>
                        <span className='fw-bold'>MRP: Rs.{location.state.Price[0]}</span>
                        <p className='py-2 fw-bold'>
                            {location.state.description}
                        </p>
                        <div className='border border-dark w-100'></div>
                        <span className='py-2'>Availabel: {location.state.InStock}</span>
                        <span className='py-2'>Product ID: {location.state._id}</span>
                        <span className='py-2'>Brand: {location.state.Brand[0]}</span>
                        <div className='border border-dark w-100'></div>
                        {/* Adding condition for the cart button */}
                        {localStorage.getItem("token") != null ?
                        <div>
                            <p className='fs-4 px-3'><span><i onClick={() => decre()} className="px-2 pt-2 fa-solid fa-minus"></i></span>{quant}<span><i onClick={() => incre()} className="px-2 fa-solid fa-plus"></i></span></p>
                            <button onClick={() => GotoCart(location.state)} className='py-2 btn btn-warning'>Add to cart</button>
                        </div>
                        :""}

                        {/*iterating posts  */}
                        {allposts.map((comment) => {
                        return (<div className='row'>
                            <div className='col-12 w-100'>
                                <p className='ps-5 py-2 d-flex justify-content-between'> {comment.commentText} -------------- <i className="px-2 fa-regular fs-6 fw-bold fa-star"></i>{comment.rating}</p>
                            </div>
                        </div>)
                    })}
                    </div>
                </div>
                {/* <!-- Button trigger modal --> */}



                {/* <!-- Modal --> */}
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
                                    <input type='text' placeholder='Give rating from 1 to 5' value={rating} onChange={(e) => setRating(e.target.value)} className='my-3 form-control'/>
                                    <textarea placeholder='Enter review' onChange={(e) => setComment(e.target.value)} className='my-3 form-control'></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button"  onClick={() => submitComment(location.state._id)} className="btn btn-danger" data-dismiss="modal">Post Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='foot'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;