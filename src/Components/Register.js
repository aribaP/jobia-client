//organization registration

import React from 'react'
import '../Styles/style.css'
import { useState, useEffect } from 'react';
import Footer from "../Components/Footer";
import NavBarComponent from "./NavBarComponent";
import { useNavigate } from 'react-router-dom';
import { axiosApiService } from '../services/axiosAPIs';


const Register = () => {
  const navigate = useNavigate();
  const initialvalues = {
    orgName: "",
    orgEmail: "",
    orgPassword: "",
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
  const postData = async (body) => {

    console.log("boduuuu", body);
    const data = { email: formValues.orgEmail, password: formValues.orgPassword };

    try {
      await axiosApiService.coreApi.post(`organization/signupOrg`, body)
        .then((response) => {

          try {
            axiosApiService.coreApi.post(`auth/login`, data)
              .then((response) => {

                console.log("Data recieved");
                console.log(response);
                localStorage.setItem("userToken", JSON.stringify({ accessToken: response[0]?.access_token, role: response[0]?.role, candId: response[0]?.candId, orgId: response[0]?.orgId }))

                navigate('/organization');

              }).catch((err) => {
                console.log(err);
                window.alert('Incorrect credentials');
              })

          } catch (err) {
            console.log("dw", err);
          }
          console.log("Data recieved");
          console.log(response);

        }).catch((err) => {
          console.log(err);
          window.alert("The account with the same email already exist.");
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
    if (!values.orgName) { errors.orgName = "Username is required!"; }

    if (!values.orgEmail) { errors.orgEmail = "Email is required!"; }
    else if (!regex.test(values.orgEmail)) { errors.orgEmail = "This is not a valid email format!"; }

    if (!values.orgPassword) { errors.orgPassword = "Password is required"; }
    else if (values.orgPassword.length < 7) { errors.orgPassword = "Password must be more than 7 characters"; }
    else if (values.orgPassword.length > 15) { errors.orgPassword = "Password cannot exceed more than 15 characters"; }

    // if (!validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //   errors.orgPassword = "Password must be strong";
    // }
    console.log('Errors', errors)
    return errors;
  };

  return (
    <>
      <NavBarComponent />
      <div className='body'>
        <h4 className='white-txt font-28 mb-revert '>Ready to join the best job solution?</h4>
        <div className='body-form'>
          <form onSubmit={handleSubmit}>
            <h5 className='mb-revert text-center'>Sign up for a free account</h5>

            <div class="mb-3">
              <input type="text" name="orgName" class="form-control input-Fields"
                id="orgName" required placeholder="Organization name"
                value={formValues.orgName}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.orgName}</p>
              </div>
            </div>

            <div className="mb-3">
              <input type="email" name="orgEmail" class="form-control input-Fields"
                id="orgEmail" required placeholder="Email address"
                value={formValues.orgEmail}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.orgEmail}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="password" name="orgPassword" class="form-control input-Fields"
                id="orgPassword" required placeholder="Create password"
                value={formValues.orgPassword}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.orgPassword}</p>
              </div>
            </div>


            {/* <Link to='/organization'> */}
            <div>
              <button className="btn body-button-style11" type="submit" onClick={handleSubmit}>Register</button>
            </div>
          </form>
        </div>
      </div><footer>
        <Footer /></footer>
    </>
  )
}

export default Register;