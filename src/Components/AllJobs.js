import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const AllJobs = ({ setCheck, onChangeStatus, onChangeTabs }) => {
  const navigate = useNavigate();
  const initialvalues = {
    jdId: "",
    jdPosition: "",
    jdMinimumExperience: "",
    jdRequiredSkills: "",
    jdLocation: "",
    jdCity: ""
  };

  const [formValues, setFormValues] = useState([initialvalues]);

  const handleDelete = (jdId) => {

    axiosApiService.coreApi.delete(`job-description/delete/${jdId}`, {headers : authHeader()})
      .then(response => {
        console.log("Data recieved");
        console.log(response.data);
        setFormValues(response.data);
        console.log(formValues);
        window.alert("Information deleted");
        window.location.reload();
        navigate("/organizaton");

      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
    axiosApiService.coreApi.get(`organization/showjobdescription/${user.orgId}`, {headers : authHeader()})
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
    <div className="padding-20 resume-create-container">
      <div
        style={{
          border: "4px solid #1e957d",
          borderRadius: "20px",
          width: "100%",
        }}
      ></div>
      {

        formValues?.map(details => (
          <div className="resume-view padding-20 mt-20">
            <div className="width-100 padding-20">
              <div key={details.jdId}>
                <h3>{details.jdPosition}</h3>
              </div>
            </div>
            <div className='btn1'>
              <Link to= "/onejob" state={{jdId: details.jdId}}><button className="btn button-style-outline me-2 btn-sm" type="submit"> View </button></Link>
              <Link to= "/editonejob" state={{jdId: details.jdId}}><button className="btn button-style-full me-2 btn-sm" type="submit"> Update </button></Link>
              <button className="btn button-style-full btn-clr-brown btn-sm" type="delete" onClick={() => handleDelete(details.jdId)}> Delete </button>

            </div>
          </div>

        ))

      }



      <form className="d-flex mt-20 justifyContent width-100">
        {/* <Link to="/"> */}
        <Link to= "/jobs" ><button className="btn button-style-full me-2 btn-sm" type="submit">
          Create Job
        </button></Link>
        {/* </Link> */}
      </form>
    </div >
  );
};

export default AllJobs;
