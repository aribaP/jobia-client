import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBarComponent from "./NavBarComponent";

export default function Home() {
  return (
    <>
      <NavBarComponent/>
      <div className="container"></div>
      <section className="home-container">
      <div>
        <h3 className="heading_1">Find The Perfect Job Solution That You <br></br>Deserve With Jobia</h3><br></br>
        <Link to='/registrationOption'><button>JOIN TODAY</button></Link>
      </div>
      </section>

      <section className="good-company-section">
        <div className="container">
        <h3 style={{fontSize: 50}}>Join the trustable community of Jobia</h3>
        <p style={{fontSize: 25}}>
          Jobia is trusted by many organizations and many job seekers with the best results
        </p><br></br>
        <div className="d-flex justify-content-around mt-5">
          <div className="good-company-section-rectangle"></div>
          <div className="good-company-section-rectangle1"></div>
          <div className="good-company-section-rectangle2"></div>
          <div className="good-company-section-rectangle3"></div>
          <div className="good-company-section-rectangle4"></div>
          <div className="good-company-section-rectangle5"></div>
        </div>
        </div>
      </section>
      <br></br>
      {/* <!-- Category Start --> */}
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">WE GOT YOU COVERED !</h1>
                <div class="row g-3">
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-mail-bulk text-primary mb-4"></i>
                            <h6 class="mb-3">Marketing</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-headset text-primary mb-4"></i>
                            <h6 class="mb-3">Customer Service</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-user-tie text-primary mb-4"></i>
                            <h6 class="mb-3">Human Resource</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-tasks text-primary mb-4"></i>
                            <h6 class="mb-3">Project Management</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-chart-line text-primary mb-4"></i>
                            <h6 class="mb-3">Business Development</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                            <h6 class="mb-3">Sales & Communication</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-book-reader text-primary mb-4"></i>
                            <h6 class="mb-3">Teaching & Education</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="cat-item rounded p-4" >
                            <i class="fa fa-3x fa-drafting-compass text-primary mb-4"></i>
                            <h6 class="mb-3">Design & Creative</h6>
                            {/* <p class="mb-0">123 Vacancy</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Category End --> */}
      <section className="good-company-lower-part"> 
      <div className="container">
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="good-company-lower-part-rectangle_1"></div>
          <div>
            <h3>Jobia For Recruiters</h3>
            <p>Jobia provides the best solution to job recruiters by filtering the job applicant resumes according to the job requirements</p>
          </div>
        </div>
        <div className="d-md-flex align-items-center justify-content-center">
          <div>
            <h3>Jobia For Job Seekers</h3>
            <p>Jobia provides the best solution to job seekers by automatically sending their resumes to the perfect job vacancies that matches their protfolio</p>
          </div>
          <div className="good-company-lower-part-rectangle"></div>
        </div>
        </div>
      </section>
      <Footer dark={true} />
    </>
  );
}
