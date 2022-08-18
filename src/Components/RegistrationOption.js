import React from 'react'
import '../Styles/style.css'
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom'
import NavBarComponent from "./NavBarComponent";


const RegistrationOption = () => {
	return (
		<>
		   {/* <Header /> */}
       <NavBarComponent/>

      <div className="row align-items-start">

      <div className="col1">
      <h4 className='Heading_5'>Are You Job Seeker?</h4>
      <Link to= '/register2'><button type="button" class="btn center">Join Today</button></Link>
    </div>
    <div className="col2">
      <h4 className='Heading_5'>Are You Recruiter?</h4>
      <Link to= '/register'><button type="button" class="btn center">Join Today</button></Link> 
    </div>

    </div>

  <footer>
    <Footer dark={true} />
  </footer>
  </>
	)
}

export default RegistrationOption;