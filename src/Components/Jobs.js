import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
import NavBarComponent2 from "./NavBarComponent2";
import { useReducer } from 'react';
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';


const Jobs = ({ handleOnSave, onChangeTabs }) => {

  const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
  const navigate = useNavigate();
  const initialvalues = {
    jdPosition: "",
    jdMinimumExperience: "",
    jdLocation: "",
    jdCity: "",
    jdRequiredSkills: "",
    orgFK: user.orgId
  };

  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormValues({ ...formValues, [name]: value }); //...=>spread operator
    console.log("form values", formValues);

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };
  const handleCancel = (e) => {
    navigate('/organization', { replace: true });
  };
  
  const postData = async (body) => {

    try {
      await axiosApiService.coreApi.post(`job-description/addjobdescription`, body, {headers : authHeader()})
        .then((response) => {
          console.log("Data recieved");
          console.log(response);
          navigate('/organization', { replace: true });
        })

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit === true) {

      postData(formValues);
      console.log(formValues);  //Rectified values after validation
    }
  }, [formErrors]);



  const validate = (values) => {

    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    console.log("I am in validation");
    if (!values.jdPosition) { errors.jdPosition = "Job Position is required!"; }

    if (!values.jdLocation) { errors.jdLocation = "Company's Location is required!"; }

    if (!values.jdRequiredSkills) { errors.jdRequiredSkills = "Job requirements are required!"; }

    if (!values.jdCity) { errors.jdCity = "City is required!"; }

    if (!values.jdMinimumExperience) { errors.jdMinimumExperience = "Minimum experience is required!"; }
    else if(values.jdMinimumExperience < 0) { errors.jdMinimumExperience = "Experience can not be negative!"; }
    else if(isNaN(values.jdMinimumExperience)) { errors.jdMinimumExperience = "Must be a number!"; }



    console.log('Errors', errors)
    return errors;
  };

  return (
    <>
   <NavBarComponent2/>      <section className="JobHeader">
        <div>
          <h2 className="contactUsHeading">Job Application</h2>
        </div>
      </section>


      <div  style={{
        margin: 0, display: "flex",
        justifyContent: "center",
      }}>

        <div class=' view-job-input-container ' > 
          <div>
            <div className="mb-3">
              <label className='mb-3 mt-15'>Job Position</label>
              <textarea type="text" name="jdPosition" class="form-control mb-3 input-Fields"
                id="jdPosition" required placeholder="" style={{ width: "100%" }}
                value={formValues.jdPosition}
                rows='1' 
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.jdPosition}</p>
              </div>
            </div>

            <div className="mb-3">
              <label className='mb-3 mt-15'>Minimum Years</label>
              <textarea type="number" name="jdMinimumExperience" class="form-control mb-3 input-Fields"
                id="jdMinimumExperience" placeholder="In years" style={{  width: "100%" }}
                value={formValues.jdMinimumExperience}
                rows='1' 
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.jdMinimumExperience}</p>
              </div>
            </div>

            <div className="mb-3">
              <label className='mb-3 mt-15'>Requirements</label>
              <textarea
                class="form-control mb-3 input-Fields"
                id="jdRequiredSkills" style={{  width: "100%" }}
                placeholder="All the job requirements you demand"
                rows="10"
                name='jdRequiredSkills'
                required
                value={formValues.jdRequiredSkills}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.jdRequiredSkills}</p>
              </div>
            </div>

            <div class="mb-3">
              <label className='mb-3 mt-15'>City</label>
              <div>
                <select className="form-control city" id="jdCity" name="jdCity" style={{  width: "100%" }} required
                  value={formValues.jdCity}
                  onChange={handleChange}>
                  <option>--Select city--</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Quetta</option>
                  <option>Islamabad</option>
                  <option>Peshawar</option>
                  <option>Faisalabad</option>
                  <option>Hyderabad</option>
                  <option>Multan</option>
                </select>
              </div>
              <div className="formErrors text-danger">
                <p>{formErrors.jdCity}</p>
              </div>
            </div>


            <div className="mb-3">
              <label className='mb-3 mt-15'>Location</label>
              <textarea type="text" name="jdLocation" class="form-control mb-3 input-Fields"
                id="jdLocation" required placeholder="" style={{  width: "100%" }}
                value={formValues.jdLocation} 
                rows='1' 
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.jdLocation}</p>
              </div>
            </div>
          </div>



     

          <form className="d-flex justifyContent width-100">
            <button className="btn button-style-outline me-2 btn-sm" type="submit"  onClick={handleCancel}>Cancel</button>
            <Link to='/organization'><button className="btn button-style-full me-2 btn-sm" type="submit" onClick={handleSubmit}>Save</button></Link>
          
            </form>
        </div>
        
      </div>
      <footer>
        <Footer dark={true} />
      </footer>
    </>
  )
}

export default Jobs