//candidate registration

import React from 'react'
import '../Styles/style.css'
import { useState, useEffect } from 'react';
import validator from 'validator';
import Footer from "../Components/Footer";
import NavBarComponent from "./NavBarComponent";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';
import { axiosApiService } from '../services/axiosAPIs';

const Register2 = () => {
  const navigate = useNavigate();
  const initialvalues = {
    candName: "",
    candEmail: "",
    candPassword: "",
    candCNIC: "",
    candCity: "",
    candContactNumber: "",
    candAddress: ""
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
    const data = { email: formValues.candEmail, password: formValues.candPassword };

    try {
      await axiosApiService.coreApi.post(`candidate/signupCand`, body, { headers: authHeader() })
        .then((response) => {
          console.log(response);
          try {
            axiosApiService.coreApi.post(`auth/login`, data)
              .then((response) => {

                console.log("Data recieved");
                console.log(response);
                localStorage.setItem("userToken", JSON.stringify({ accessToken: response[0]?.access_token, role: response[0]?.role, candId: response[0]?.candId, orgId: response[0]?.orgId }))
                navigate('/account', { replace: true });


              }).catch((err) => {
                console.log(err);
                window.alert('Incorrect credentials');
              })

          } catch (err) {
            console.log("dw", err);
          }
          console.log("Data recieved");

          navigate('/account', { replace: true });
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
    const regexCNIC = /^[0-9]{5}-[0-9]{7}-[0-9]$/gm;
    const regexphoneno = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

    console.log("I am in validation");
    if (!values.candName) { errors.candName = "Username is required!"; }

    if (!values.candEmail) { errors.candEmail = "Email is required!"; }
    else if (!regex.test(values.candEmail)) { errors.candEmail = "This is not a valid email format!"; }

    if (!values.candCNIC) { errors.candCNIC = "CNIC is required!"; }
    else if (!regexCNIC.test(values.candCNIC)) { errors.candCNIC = "CNIC must follow the XXXXX-XXXXXXX-X format!"; }

    if (!values.candContactNumber) { errors.candContactNumber = "Phone number is required!"; }
    else if (!regexphoneno.test(values.candContactNumber)) { errors.candContactNumber = "Invalid phonenumber!"; }

    if (!values.confirmPassword) { errors.confirmPassword = "Password confirmation is required"; }
    else if (values.candPassword != values.confirmPassword) { errors.confirmPassword = "Password must be same as above"; }

    if (!values.candPassword) { errors.candPassword = "Password is required"; }
    else if (values.candPassword.length < 7) { errors.candPassword = "Password must be more than 7 characters"; }
    else if (values.candPassword.length > 15) { errors.candPassword = "Password cannot exceed more than 15 characters"; }

    if (!values.candCity) { errors.candCity = "City is required"; }


    // if (!validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //   errors.candPassword = "Password must be strong";
    // }
    console.log('Errors', errors)
    return errors;
  };

  return (
    <>
      {/* <Header /> */}
      <NavBarComponent />

      <div className='body_register'>
        <h4 className='white-txt font-28 mb-revert '>READY TO JOIN THE BEST JOB HIRING SOLUTION ?</h4>
        <div className='body-form-register'>
          <form onSubmit={handleSubmit}>
            <h5 className='mb-revert text-center'>Sign up for a free account</h5>

            <div class="mb-3">
              <input type="text" name="candName" class="form-control input-Fields" id="candName" required placeholder="Full name"
                value={formValues.candName}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candName}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="email" name="candEmail" class="form-control input-Fields" id="candEmail" required placeholder="Email address"
                value={formValues.candEmail}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candEmail}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="password" name="candPassword" class="form-control input-Fields"
                id="candPassword" required placeholder="Create password"
                value={formValues.candPassword}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candPassword}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="password" name="confirmPassword" class="form-control input-Fields"
                id="confirmPassword" required placeholder="Confirm password"
                value={formValues.confirmPassword}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.confirmPassword}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="text" name="candCNIC" class="form-control input-Fields"
                id="candCNIC" required placeholder="Enter CNIC"
                value={formValues.candCNIC}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candCNIC}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="text" name="candContactNumber" class="form-control input-Fields"
                id="candContactNumber" required placeholder="Enter your contact number"
                value={formValues.candContactNumber}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candContactNumber}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="text" name="candAddress" class="form-control input-Fields"
                id="candAddress" required placeholder="Enter Address"
                value={formValues.candAddress}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candAddress}</p>
              </div>
            </div>

            <div class="mb-3">
              <input type="text" name="candCity" class="form-control input-Fields"
                id="candCity" required placeholder="Enter your City"
                value={formValues.candCity}
                onChange={handleChange} />
              <div className="formErrors text-danger">
                <p>{formErrors.candCity}</p>
              </div>
            </div>

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

export default Register2;