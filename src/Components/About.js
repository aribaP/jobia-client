import React from "react";
import Footer from "../Components/Footer";
import about from "../assets/aboutUs.png"
import NavBarComponent from "./NavBarComponent";

const About = () => {
  return (
    <>
   {/* <Header /> */}
   <NavBarComponent/>
      <section className="aboutUsHeader">
        <div>
          <h2 className="aboutUsHeading">ABOUT US</h2>
        </div>
      </section>
      {/* <div className='aboutUsHeader'>
          <h2 className="aboutUsHeading">ABOUT US</h2>
      </div> */}
      <div className="aboutUsContainer">
        <div class="card text-center p-3 border-0">
          <div class="card-body ">
            <h1 class="card-title">WHY CHOOSE JOBIA?</h1>
            <p class="card-text">Jobia provides the best job solution !</p>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-sm-6">
              <div class="card-body">
                <p class="card-text about-us-page">Jobia provides a platform for both job seekers and organizations to fulfill their needs.
                  The portal provides employment opportunities to the job seekers and reduces the effort of searching job of desired position.
                  It facilitates the organization by filtering all the appropriate resumes according to the job description which eventually minimizes human resource work and screening process.
                </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className='m-3 why-choose-img-cont'>
              <img src={about} alt="" />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer dark={true} />
      </footer>
    </>
  )
}

export default About;