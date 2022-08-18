import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profilee from "../assets/Profile.png";
import Edit from "../assets/edit.png";
import { axiosApiService } from "../services/axiosAPIs";
import authHeader from "../services/auth-header";

const Profile2 = () => {
  // Edit useState
  const [orgHide, setOrgShow] = useState(false);
  const [emailHide, setEmailShow] = useState(false);
  const [phoneHide, setPhoneShow] = useState(false);
  // const [passHide, setPassShow] = useState(false);
  // const [confPassHide, setConfPassShow] = useState(false);

  const navigate = useNavigate();
  const initialvalues = {
    orgName: "",
    orgEmail: "",
    orgContactNumber: "",
    orgPassword: "",
    orgCPassword: "",
  };
  const initValues = {
    orgName: "",
    orgEmail: "",
    orgContactNumber: "",
    orgPassword: "",
  };

  // const [formValues, setFormValues] = useState(setOrg);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [setOrg, setOrgDetails] = useState(initValues);
  const [formValues, setFormValues] = useState(initialvalues);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormValues({ ...formValues, [name]: value }); //...=>spread operator
    console.log("form values", formValues);
  };

  const handleCancel = (e) => {
    navigate("/organization", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));

    if (formValues.orgName === "") formValues.orgName = setOrg.orgName;

    if (formValues.orgEmail === "") formValues.orgEmail = setOrg.orgEmail;

    if (formValues.orgContactNumber === null)
      formValues.orgContactNumber = setOrg.orgContactNumber;

    if (formValues.orgPassword === "")
      formValues.orgPassword = setOrg.orgPassword;

    console.log(formValues);
  };

  const postData = async (body) => {
    const data = {
      orgName: body.orgName,
      orgEmail: body.orgEmail,
      orgContactNumber: body.orgContactNumber,
      orgPassword: body.orgPassword,
    };

    try {
      const user = JSON.parse(localStorage.getItem("userToken") ?? "{}");
      await axiosApiService.coreApi.patch(`organization/update/${user.orgId}`, data, {
          headers: authHeader(),
        })
        .then((response) => {
          console.log("Data recieved");
          console.log(response.data);
          alert("Information saved.");
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
      
    }
  };

  const getData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userToken") ?? "{}");
      await axiosApiService.coreApi
        .get(`organization/getwhole/${user.orgId}`, { headers: authHeader() })
        .then((response) => {
          console.log("Data recieved");
          console.log(response);
          setOrgDetails(response);
          console.log("orgSet", setOrg);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    console.log(formErrors);
    if (isSubmit && Object.keys(formErrors).length === 0) {
      console.log("useeffect", setOrg);
      postData(formValues);
      console.log(formValues); //Rectified values after validation
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexphoneno = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

    console.log("I am in validation");
    // if (!values.orgName) { errors.orgName = "Username is required!"; }
    if (!values.orgName) {
    }

    if (!values.orgEmail) {
    } else if (!regex.test(values.orgEmail)) {
      errors.orgEmail = "This is not a valid email format!";
    }

    if (!values.orgContactNumber) {
    } else if (!regexphoneno.test(values.orgContactNumber)) {
      errors.orgContactNumber = "Invalid phonenumber! Format: 00000000000";
    }

    if (!values.orgPassword && !values.orgCPassword) {
    } else if (values.orgCPassword != values.orgPassword) {
      errors.orgCPassword = "Password must be same as above.";
    } else if (!values.orgCPassword && values.orgPassword) {
      errors.orgCPassword = "Please reenter the password for confirmation.";
    } else if (values.orgCPassword && !values.orgPassword) {
      errors.orgPassword = "Enter the password before confirmation.";
    } else if (values.orgPassword.length < 7) {
      errors.orgPassword = "Password must be more than 7 characters";
    } else if (values.orgPassword.length > 15) {
      errors.orgPassword = "Password cannot exceed more than 15 characters";
    }

    // if (!validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //   errors.orgPassword = "Password must be strong";
    // }
    console.log("Errors", errors);
    return errors;
  };

  return (
    <div className="edit-profile-container">
      <div>
        <div class="profile-body-right">
          <div className="profile-body-input-container">
            <label className="mb-3">Organization Name</label>
            <div className="orgIcon">
              <input
                type="text"
                class="form-control input-Fields"
                disabled="true"
                id="orgName"
                name="orgName"
                placeholder="Organization Name"
                value={setOrg?.orgName}
              />
              {/* Edit Button */}
              <button
                className="btn btn-small btn-outline-secondary"
                onClick={() => setOrgShow(!orgHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>

            <div className="mb-3">
              {/* Edit */}
              {orgHide && (
                <input
                  type="text"
                  class="form-control input-Fields"
                  id="orgName"
                  name="orgName"
                  placeholder="Edit Organization Name here"
                  width="30px"
                  value={formValues.orgName}
                  onChange={handleChange}
                />
              )}
              <div className="formErrors text-danger">
                <p>{formErrors.orgName}</p>
              </div>
            </div>

            <label className="mb-3">Email Address</label>
            <div className="orgIcon">
              <input
                type="text"
                class="form-control input-Fields"
                id="orgEmail"
                name="orgEmail"
                disabled="true"
                value={setOrg?.orgEmail}
                placeholder="Email Address"
              />
              <button
                className="btn btn-small btn-outline-secondary"
                onClick={() => setEmailShow(!emailHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div className="mb-3">
              {emailHide && (
                <input
                  type="email"
                  class="form-control input-Fields"
                  id="orgEmail"
                  name="orgEmail"
                  placeholder="Edit your email here"
                  value={formValues.orgEmail}
                  onChange={handleChange}
                />
              )}

              <div className="formErrors text-danger">
                <p>{formErrors.orgEmail}</p>
              </div>
            </div>

            <label className="mb-3">Phone Number</label>
            <div className="orgIcon">
              <input
                type="text"
                name="orgContactNumber"
                class="form-control input-Fields"
                id="orgContactNumber"
                disabled="true"
                value={setOrg?.orgContactNumber}
                placeholder="Phone Number"
              />
              <button
                className="btn btn-small btn-outline-secondary"
                onClick={() => setPhoneShow(!phoneHide)}
              >
                <img src={Edit} alt="" width="30px" height="30px" />
              </button>
            </div>
            <div>
              {phoneHide && (
                <input
                  type="text"
                  class="form-control input-Fields"
                  id="orgContactNumber"
                  name="orgContactNumber"
                  placeholder="Edit your contact number"
                  value={formValues.orgContactNumber}
                  onChange={handleChange}
                />
              )}

              <div className="formErrors text-danger">
                <p>{formErrors.orgContactNumber}</p>
              </div>
            </div>

            <label className="mb-3"> Change Password </label>
            <div className="orgIcon">
              <input
                type="password"
                class="form-control input-Fields"
                id="orgPassword"
                name="orgPassword"
                placeholder="Change Password"
                value={formValues.orgPassword}
                onChange={handleChange}
              />
            </div>
            <div className="formErrors text-danger">
              <p>{formErrors.orgPassword}</p>
            </div>

            <label className="mb-3"> Confirm Password </label>
            <div className="orgIcon">
              <input
                type="password"
                class="form-control input-Fields"
                id="orgCPassword"
                name="orgCPassword"
                placeholder="Confirm Password"
                value={formValues.orgCPassword}
                onChange={handleChange}
              />
            </div>
            <div className="formErrors text-danger">
              <p>{formErrors.orgCPassword}</p>
            </div>

            <form className="d-flex justifyContent width-100">
             <Link to= "/organization"> <button
                className="btn body-button-style3 padding-l-15 padding-r-15 mx-1 px-4 py-2"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button></Link>
              <Link to= "/organization"><button
                className="btn body-button-style2 padding-l-15 padding-r-15 px-3 mx-2 py-2 btn-sm"
                type="submit"
                onClick={handleCancel}
              >
                Cancel
              </button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
