import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';

// About component to display information about the developer
const About = () => {
    // Retrieving user data from local storage
    const a = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            {/* Header */}
            <Header />
            <div className="container">
                {/* About Me section */}
                <div className="d-flex justify-content-center mt-4 p-5">
                    <h1>a little bit about me...</h1>
                </div>
                <div className="row">
                    {/* Image and description */}
                    <div className="col-md-5 d-flex justify-content-center">
                        <p className="align-center ms-5 " style={{ fontSize: "30px", fontWeight: "400", fontFamily: "sans-serif" }}>
                            You are reading about Developer. I am a Full Stack Developer (MERN).
                            I completed my post Graduation from Chhatrapati Shahu Ji Maharaj University, Kanpur.
                            I have advanced certifications in Full Stack Development which has helped me work on various projects.
                            I always liked playing around with code and learning new things.
                            On the weekend you can catch me playing cricket, listening to music, and watching Anime.
                        </p>
                    </div>
                    <div className="col-md-7">
                        <img src={'https://wallpapers.com/images/high/dragon-ball-z-pictures-b1631prvj9jgfxi7.webp'} className="rounded-circle ms-5 mt-5 shadow shadow-lg " width="80%" height="60%" />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="foot" style={{ marginTop: "50px", position: "relative", left: "0", bottom: "0", right: "0" }}>
                <Footer />
            </div>
        </div>
    )
}

export default About
