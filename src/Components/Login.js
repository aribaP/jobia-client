import React, { useEffect } from 'react'
import {useState} from 'react';
import validator from 'validator'
import '../Styles/style.css'
import Footer from "../Components/Footer";
import NavBarComponent from "./NavBarComponent";

import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosApiService } from '../services/axiosAPIs';

const Login = () => {
  const navigate = useNavigate();
    const initialvalues = {
      email:"",
      password:"",    
    };

    const [formValues, setFormValues] = useState(initialvalues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

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
    const postData = async(body)=>{
      console.log("body", body);

      try{
          await axiosApiService.coreApi.post(`auth/login`, body)
          .then((response) => {
              
              console.log("Data recieved");   
              console.log(response);
              localStorage.setItem("userToken", JSON.stringify({accessToken: response[0]?.access_token, role: response[0]?.role, candId: response[0]?.candId, orgId: response[0]?.orgId}))
              if(response[0].role == 'candidate') 
                navigate('/account'); 
              else if(response[0].role == 'organization')
                navigate('/organization');

          }).catch((err) => {
            console.log(err);
            window.alert('Incorrect credentials');
          })

      }catch(err){
          console.log("dw",err);
          
          
      }

  };
    
    useEffect(() => {          
      if (Object.keys(formErrors).length === 0 && isSubmit === true) {
            
            postData(formValues);
            console.log(formValues);  //Rectified values after validation
      }
    },[formErrors]);

    const validate = (values) => {

      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
      console.log("I am in validation");
  
      if (!values.email) { errors.email = "Email is required!"; }
      else if (!regex.test(values.email)) { errors.email = "This is not a valid email format!"; }
  
      if (!values.password) { errors.password = "Password is required"; }
      
      console.log('Errors', errors)
      return errors;
    };

  return (
    <>
       {/* <Header /> */}
       <NavBarComponent/>
      <div className='body-Login'>
        <div className='width-30'>
          <h1 className='white-txt '>Welcome back to the best Job solution!</h1>
        </div>
        <div className='body-form-login'>
          <h5 className='mb-revert'>Sign In To Your Account</h5>
          <div class="mb-3">
            <input type="text" name='email' class="form-control input-Fields" id="email" placeholder="Email address" 
              value={formValues.email}
              onChange ={handleChange}/>
              <div className="formErrors text-danger">
                <p>{formErrors.email}</p>
              </div>
          </div>
          
          <div class="mb-3">
            <input 
              type="password"
              name= "password"
              class="form-control input-Fields"
              id="password" 
              placeholder=" Password" 
              value={formValues.password}
              onChange ={handleChange}/>
            <div className="formErrors text-danger">
                <p>{formErrors.password}</p>
            </div>
          </div>
          <button className="btn body-button-style11" type="submit" onClick={handleSubmit}>Login </button>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Login