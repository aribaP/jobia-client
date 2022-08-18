import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import NavBarComponent2 from "./NavBarComponent2";
import authHeader from '../services/auth-header';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { axiosApiService } from '../services/axiosAPIs';

const ViewOneJob = () => {

  const location = useLocation();
  const initialvalues = {
    jdId: "",
    jdPosition: "",
    jdMinimumExperience: "",
    jdRequiredSkills: "",
    jdLocation: "",
    jdCity: ""
  };

  const [formValues, setFormValues] = useState(initialvalues);
 
  useEffect(() => {
    console.log("JdId: ", location.state.jdId);
    
    axiosApiService.coreApi.get(`job-description/getone/${location.state.jdId}`, {headers : authHeader()})
      .then(response => {
        console.log("Data recieved");
        console.log(response);
        setFormValues(response);
        console.log(formValues);

      }).catch(err => {
        console.log(err);
      })
  }, []);


  return (
    <>
      {/* <Header /> */}
      <NavBarComponent2 />    <div>
        <section className="viewResume">
          <div>
            <h2 className="contactUsHeading">View Job</h2>
          </div>
        </section>
        <div style={{
          margin: 0, display: "flex",
          justifyContent: "center",


        }}>
   
            <div className='view-job-input-container'>


              <div className="mb-3">
                <label className='mb-3 mt-15'>Job Position</label>
                <textarea type="text" name="jdPosition" class="form-control mb-3 input-Fields"
                  id="jdPosition" required placeholder="" 
                  value={formValues?.jdPosition}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className='mb-3 mt-15'>Minimum Years</label>
                <textarea type="number" name="jdMinimumExperience" class="form-control mb-3 input-Fields"
                  id="jdMinimumExperience" placeholder="In years"
                  value={formValues?.jdMinimumExperience}
                  disabled />
              </div>

              <div className="mb-3">
                <label className='mb-3 mt-15'>Requirements</label>
                <textarea
                  class="form-control mb-3 input-Fields"
                  id="jdRequiredSkills"
                  disabled
                  name='jdRequiredSkills'
                  required
                  value={formValues?.jdRequiredSkills} />
              </div>

              <div className="mb-3">
                <label className='mb-3 mt-15'>City</label>
                <textarea type="text" name="jdCity" class="form-control mb-3 input-Fields"
                  id="jdCity" required placeholder="" 
                  value={formValues?.jdCity}
                   disabled />

              </div>


              <div className="mb-3">
                <label className='mb-3 mt-15'>Location</label>
                <textarea type="text" name="jdLocation" class="form-control mb-3 input-Fields"
                  id="jdLocation" required placeholder="" 
                  value={formValues?.jdLocation}
                   disabled />

              </div>
              <form className="d-flex justifyContent width-100" >
                <Link to= "/AllJobs"><button className="btn body-button-style2 padding-l-15 padding-r-15 mx-3 btn-sm" type="submit" >Back</button></Link>
              </form>
            </div>
          
        </div>
      </div>

      <footer>
        <Footer dark={true} />
      </footer>    </>
  )
}

export default ViewOneJob