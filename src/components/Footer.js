// import { Link, NavLink } from "react-router-dom";

// function Footer() {
//     return (
//         <div>
//             <div className="container-fluid text-dark mt-0 text-center" style={{border: "3px solid black", backgroundColor:"red"}}>
//                 <div className="row mb-0">
//                     <div className="col-sm-3 m-0">
//                         <ul className="list-unstyled list-group mt-0">
//                             <li><h3><Link to={'/AllProductPage'} className="text-dark text-decoration-none" > All Product Page</Link></h3></li>
//                             <li><Link to={'/searchpage'} className="text-dark text-decoration-none" >Search Page</Link></li>
//                             <li><Link to={'/Signin'} className="text-dark text-decoration-none" href="womenpants.html">SignIn</Link></li>
//                         </ul>
//                     </div>
//                     <div className="col-sm-3 m-0">
//                         <ul className="list-unstyled mt-0">
//                             <li><h3><Link className="text-dark text-decoration-none">About</Link></h3></li>
//                             <li><Link className="text-dark text-decoration-none " >About Developer</Link></li>
//                         </ul>
//                     </div>
//                     <div className="col-sm-3 m-0">
//                         <h3><Link to={'/Signin'} className="text-dark text-decoration-none" >Sign UP</Link></h3>
//                     </div>
//                     <div className="col-sm-3 m-0">
//                         <ul className="list-unstyled mt-0">
//                             <li><h3>Links</h3></li>
//                             <li><NavLink to={'/'} className="text-dark text-decoration-none" >Login</NavLink></li>
//                             <li><NavLink to={'/Contact'} className="text-dark text-decoration-none">Contact</NavLink></li>
//                             <li><NavLink to={'/OrderHistory'} className="text-dark text-decoration-none">Order History</NavLink></li>
//                             <li><NavLink to={'/HomePage'} className="text-dark text-decoration-none" >Home</NavLink></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <hr className="mt-1"/>
//                     <p className="mt-0" id="copyright">Copyright @Ecommerse Designed By " Anmol Verma "<span className="badge bg-secondary rounded-pill">2024</span></p>
//             </div>
//         </div>
//     );
// }

// export default Footer;



// Footer component for the bottom section of the application
import { Link, NavLink } from "react-router-dom";

function Footer() {
    return (
        <div>
            {/* Footer container */}
            <div className="container-fluid text-dark mt-0 text-center" style={{border: "3px solid black", backgroundColor:"red"}}>
                <div className="row mb-0">
                    {/* Section 1: Product Pages */}
                    <div className="col-sm-3 m-0">
                        <ul className="list-unstyled list-group mt-0">
                            <li><h3><Link to={'/AllProductPage'} className="text-dark text-decoration-none" > All Product Page</Link></h3></li>
                            <li><Link to={'/searchpage'} className="text-dark text-decoration-none" >Search Page</Link></li>
                            <li><Link to={'/Signin'} className="text-dark text-decoration-none" href="womenpants.html">SignIn</Link></li>
                        </ul>
                    </div>
                    {/* Section 2: About */}
                    <div className="col-sm-3 m-0">
                        <ul className="list-unstyled mt-0">
                            <li><h3><Link className="text-dark text-decoration-none">About</Link></h3></li>
                            <li><Link className="text-dark text-decoration-none " >About Developer</Link></li>
                        </ul>
                    </div>
                    {/* Section 3: Sign Up */}
                    <div className="col-sm-3 m-0">
                        <h3><Link to={'/Signin'} className="text-dark text-decoration-none" >Sign UP</Link></h3>
                    </div>
                    {/* Section 4: Useful Links */}
                    <div className="col-sm-3 m-0">
                        <ul className="list-unstyled mt-0">
                            <li><h3>Links</h3></li>
                            <li><NavLink to={'/'} className="text-dark text-decoration-none" >Login</NavLink></li>
                            <li><NavLink to={'/Contact'} className="text-dark text-decoration-none">Contact</NavLink></li>
                            <li><NavLink to={'/OrderHistory'} className="text-dark text-decoration-none">Order History</NavLink></li>
                            <li><NavLink to={'/HomePage'} className="text-dark text-decoration-none" >Home</NavLink></li>
                        </ul>
                    </div>
                </div>
                {/* Divider */}
                <hr className="mt-1"/>
                {/* Copyright */}
                <p className="mt-0" id="copyright">Copyright @Ecommerse Designed By " Anmol Verma "<span className="badge bg-secondary rounded-pill">2024</span></p>
            </div>
        </div>
    );
}

export default Footer;
