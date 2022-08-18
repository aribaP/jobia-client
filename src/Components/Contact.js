import React from "react";
import Footer from "../Components/Footer";
import Contact from  "../assets/contact.jpg"
import NavBarComponent from "./NavBarComponent";


const ContactUs = () => {
    return (
      <>
       {/* <Header /> */}
       <NavBarComponent/>
       <section className="contactUsHeader">
      <div>
        <h2 className="contactUsHeading">CONTACT US</h2>
      </div>
      </section>
        <div class="container contactUsContainer">
          <div class="row g-2" style={{ marginTop:"20px" }}>
            <div class="col-sm-6" style={{marginTop: "25px"}}  >
              <div class="contact_img">
                <img  src={Contact} alt="" width="85%" />
              </div>
            </div>
            <div class="col-sm-6 "style={{ padding:"10px" , marginTop: "5%"}} >
              <div>
                <h2 className='mb-revert'>Contact Us!</h2>
                <div class="mb-4">
                  <input type="text" class="form-control input-Fields" id="EmailAddress" placeholder="Email Address" />
                </div>
                <div class="mb-4">
                  <textarea
                    className="form-control input-Fields"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    placeholder="Message"
                  />
                </div>
                <button className="btn body-button-style" type="submit">Send</button>
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
  
  export default ContactUs