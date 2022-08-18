import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profilee from '../assets/Profile.png';
import Edit from '../assets/edit.png';
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const Profile2 = () => {

  const navigate = useNavigate();
  const initialvalues = {
    candName: "",
    candEmail: "",
    candContactNumber: "",
    candCity: "",
    candCNIC: "",
    candAddress: "",
    candPassword: "",
    candCPassword: ""
  };
  const initvalues = {
    candName: "",
    candEmail: "",
    candContactNumber: "",
    candCity: "",
    candCNIC: "",
    candAddress: "",
    candPassword: "",
  };

  // const [formValues, setFormValues] = useState(setCand);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [setCand, setCandDetails] = useState(initvalues);
  const [formValues, setFormValues] = useState(initialvalues);

  const [candidateHide, setCandidateShow] = useState(false);
  const [emailHide, setEmailShow] = useState(false);
  const [phoneHide, setPhoneShow] = useState(false);
  const [cityHide, setCityShow] = useState(false);
  const [cnicHide, setCNICShow] = useState(false);
  const [residentialHide, setResidentialShow] = useState(false);
  const [passHide, setPassShow] = useState(false);
  const [confPassHide, setConfPassShow] = useState(false);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormValues({ ...formValues, [name]: value }); //...=>spread operator
    console.log("form values", formValues);

  };


  const handleCancel = (e) => {
		navigate('/organization', { replace: true });
    
	};


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));

    if (formValues.candName === "")
      formValues.candName = setCand.candName;

    if (formValues.candEmail === "")
      formValues.candEmail = setCand.candEmail;

    if (formValues.candContactNumber === "")
      formValues.candContactNumber = setCand.candContactNumber;

    if (formValues.candCity === "")
      formValues.candCity = setCand.candCity;

    if (formValues.candCNIC === "")
      formValues.candCNIC = setCand.candCNIC;

    if (formValues.candAddress === "")
      formValues.candAddress = setCand.candAddress;


    console.log(formValues);
  };


  const postData = async (body) => {
    const data = {
      candName: body.candName,
      candEmail: body.candEmail,
      candContactNumber: body.candContactNumber,
      candCity: body.candCity,
      candCNIC: body.candCNIC,
      candAddress: body.candAddress,
      candPassword: body.candPassword
    };
    try {
      const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
      await axiosApiService.coreApi.patch(`candidate/update/${user.candId}`, data, {headers : authHeader()})
        .then((response) => {
          console.log("Data recieved");
          console.log(response);
          alert("Information saved.");
          window.location.reload();
        })

    } catch (err) {
      console.log(err);
    }

  };

  const getData = async () => {

    try {
      const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
      console.log("Hi",user.accessToken);
      await axiosApiService.coreApi.get(`candidate/${user.candId}`, {headers : authHeader()})
        .then((response) => {
          console.log(response);
          console.log("Data recieved");
          setCandDetails(response);
          console.log("CandSet", setCand);
        })

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getData();
    console.log(formErrors);
    if (isSubmit && Object.keys(formErrors).length === 0) {
      console.log("useeffect", setCand);
      postData(formValues);
      console.log(formValues);
    }

  }, [formErrors]);



  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexphoneno = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    const regexCNIC = /^[0-9]{5}-[0-9]{7}-[0-9]$/gm;

    console.log("I am in validation");

    if (!values?.candName) { }
    else if (!regex.test(values?.candEmail)) { errors.candEmail = "This is not a valid email format!"; }

    if (!values?.candContactNumber) { }
    else if (!regexphoneno.test(values?.candContactNumber)) { errors.candContactNumber = "Invalid phonenumber!"; }

    if (!values?.candCNIC) { }
    else if (!regexCNIC.test(values?.candCNIC)) { errors.candCNIC = "CNIC must follow the XXXXX-XXXXXXX-X format!"; }

    
    if (!values?.candPassword && !values?.candCPassword) {  }
    else if(values?.candCPassword != values?.candPassword) { errors.candCPassword = "Password must be same as above."; }
    else if(!values?.candCPassword && values?.candPassword) { errors.candCPassword = "Please reenter the password for confirmation."; }
    else if(values?.candCPassword && !values?.candPassword) { errors.candPassword = "Enter the password before confirmation."; }
    else if (values?.candPassword.length < 7) { errors.candPassword = "Password must be more than 7 characters"; }
    else if (values?.candPassword.length > 15) { errors.candPassword = "Password cannot exceed more than 15 characters"; }

    // if (!validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //   errors.CandPassword = "Password must be strong";
    // }
    console.log('Errors', errors)
    return errors;
  };


  return (

    <div className="center-item">
    <div className='view-job-input-container my-4'>
        <label className="mb-3"> Candidate Name</label>
            <div className='orgIcon'>
              <input
                type="text"
                class="form-control input-Fields"
                disabled="true"
                id="candName"
                name="candName"
                placeholder="First Name"
                value={setCand?.candName}
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setCandidateShow(!candidateHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>

            </div>

            <div className='mb-3'>
            {candidateHide && 
              <input
                type="text"
                class="form-control input-Fields"
                id="candName"
                name="candName"
                placeholder="Add candidate name"
                value={formValues.candName}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candName}</p>
              </div>
            </div>

            <label className="mb-3"> Email Address</label>
            <div className='orgIcon'>
              <input
                type="email"
                class="form-control input-Fields"
                id="candEmail"
                name="candEmail"
                disabled="true"
                value={setCand?.candEmail}
                placeholder="Email Address"
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setEmailShow(!emailHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>

            <div className='mb-3'>
            {emailHide &&
              <input
                type="email"
                class="form-control input-Fields"
                id="candEmail"
                name="candEmail"
                placeholder="Edit your email here"
                value={formValues.candEmail}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candEmail}</p>
              </div>
            </div>


            <label className="mb-3"> Phone Number</label>
            <div className='orgIcon'>
              <input
                type="text"
                name="candContactNumber"
                class="form-control input-Fields"
                id="candContactNumber"
                disabled="true"
                value={setCand?.candContactNumber}
                placeholder="Phone Number"
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setPhoneShow(!phoneHide)}
              
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div>
            {phoneHide &&
              <input
                type="text"
                class="form-control input-Fields"
                id="candContactNumber"
                name="candContactNumber"
                placeholder="Edit your contact number"
                value={formValues.candContactNumber}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candContactNumber}</p>
              </div>
            </div>

            <label className="mb-3"> City</label>
            <div className='orgIcon'>
              <input
                type="text"
                name="candCity"
                class="form-control input-Fields"
                id="candCity"
                disabled="true"
                value={setCand?.candCity}
                placeholder="Phone Number"
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setCityShow(!cityHide)}
              
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div>
            {cityHide &&
              <input
                type="text"
                class="form-control input-Fields"
                id="candCity"
                name="candCity"
                placeholder="Edit your contact number"
                value={formValues.candCity}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candCity}</p>
              </div>
            </div>

            <label className="mb-3"> CNIC </label>
            <div className='orgIcon'>
              <input
                type="text"
                name="candCNIC"
                class="form-control input-Fields"
                id="candCNIC"
                disabled="true"
                value={setCand?.candCNIC}
                placeholder="CNIC"
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setCNICShow(!cnicHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div>
            {cnicHide &&
              <input
                type="text"
                class="form-control input-Fields"
                id="candCNIC"
                name="candCNIC"
                placeholder="Edit your CNIC"
                value={formValues.candCNIC}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candCNIC}</p>
              </div>
            </div>

            <label className="mb-3"> Residential Address </label>
            <div className='orgIcon'>
              <input
                type="text"
                name="candAddress"
                class="form-control input-Fields"
                id="candAddress"
                disabled="true"
                value={setCand?.candAddress}
                placeholder=" Residential Address "
              />
              <button className='btn btn-small btn-outline-secondary'
                onClick={() => setResidentialShow(!residentialHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div>
            {residentialHide &&
              <input
                type="text"
                class="form-control input-Fields"
                id="candAddress"
                name="candAddress"
                placeholder="Edit your  Residential Address"
                value={formValues.candAddress}
                onChange={handleChange}
              />
            }
              <div className="formErrors text-danger">
                <p>{formErrors.candAddress}</p>
              </div>
            </div>

            <label className="mb-3"> Change Password </label>
            <div className='orgIcon'>
              <input
                type="password"
                class="form-control input-Fields"
                id="candPassword"
                name="candPassword"
                placeholder="Change Password"
                value={formValues.candPassword}
                onChange={handleChange}
              />
              <button className='btn btn-small btn-outline-secondary'>
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div className="formErrors text-danger">
              <p>{formErrors.candPassword}</p>
            </div>

            <label className="mb-3"> Confirm Password </label>
            <div className='orgIcon'>
              <input
                type="password"
                class="form-control input-Fields"
                id="candCPassword"
                name="candCPassword"
                placeholder="Confirm Password"
                value={formValues.candCPassword}
                onChange={handleChange}
              />
              <button className='btn btn-small btn-outline-secondary'>
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div className="formErrors text-danger">
              <p>{formErrors.candCPassword}</p>
            </div>


            <form className="d-flex justifyContent width-100" >
							<button className="btn body-button-style3 padding-l-15 padding-r-15 px-3" type="submit" onClick={handleSubmit}>Save</button>
							<button className="btn body-button-style2 padding-l-15 padding-r-15 mx-3 btn-sm" type="submit" onClick={handleCancel}>Cancel</button>
						</form>

          </div>
        </div>
  
  )
}

export default Profile2